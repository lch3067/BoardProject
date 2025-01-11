import apiConfig from "../config/apiConfig";
import { handleApiResponse } from "../exceptions/handleApiResponse";

// 로그인 API
export const loginApi = async (credentials) => {

  const response = await fetch(`${apiConfig.baseUrl}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  return await handleApiResponse(response);
};

// 로그아웃 API
export const logoutApi = async () => {
const token = localStorage.getItem("token");

  const response = await fetch(`${apiConfig.baseUrl}/api/auth/logout`, {
    method: "POST", // 로그아웃은 POST 방식이 일반적
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return await handleApiResponse(response);
};

// 사용자 정보 가져오기 API
export const fetchUserInfo = async (token) => {
  const response = await fetch(`${apiConfig.baseUrl}/userInfo`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return await handleApiResponse(response);
};
