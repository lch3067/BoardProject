import React, { createContext, useContext, useState } from "react";
import { loginApi, logoutApi, fetchUserInfo } from "../api/auth";
import ApiError from "../exceptions/ApiError";
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // 로그인 함수
  const login = async (credentials) => {
    try {
      const { token, expires_in } = await loginApi(credentials);

      // 토큰 저장 (예: 로컬 스토리지)
      localStorage.setItem("token", token);
      localStorage.setItem("token_expiration", Date.now() + expires_in * 1000);

      // 사용자 정보 업데이트
      setUser({ id: credentials.id });
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      if (error instanceof ApiError) {
        console.error(`Login failed: ${error.message}`, error.details);
        alert(`Login Error: ${error.message}`);
      } else {
        console.error("Unexpected error during login:", error);
        alert("Unexpected error occurred.");
      }
      return false;
    }
  };

  // 로그아웃 함수
  const logout = async () => {
    try {
      await logoutApi();

      // 상태 초기화
      localStorage.removeItem("token");
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      if (error instanceof ApiError) {
        console.error(`Logout failed: ${error.message}`, error.details);
      } else {
        console.error("Unexpected error during logout:", error);
        setIsAuthenticated(false);
      }
    }
  };

  // 사용자 정보 가져오기
  const fetchUser = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      return;
    }

    try {
      const userInfo = await fetchUserInfo(token);
      setUser(userInfo);
      setIsAuthenticated(true);
    } catch (error) {
      if (error instanceof ApiError) {
        console.error(`Failed to fetch user info: ${error.message}`, error.details);
      } else {
        console.error("Unexpected error while fetching user info:", error);
      }
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};