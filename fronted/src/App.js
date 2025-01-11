import React, { useEffect } from "react";
import Header from "./components/common/Header/Header";
import Footer from "./components/common/Footer/Footer";
import Sidebar from "./components/common/Sidebar/Sidebar";
import AppRouter from "./routers/routes";
import { useAuth } from "./context/AuthContext";
import { AuthProvider } from "./context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./App.css";

function AppLayout() {
  const { isAuthenticated, login, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      return;
    }

    // dependency array로 인해 checkTokenValidity 변경 시만 트리거
  }, [login, navigate]);

  return (
    <div className="app">
      {isAuthenticated ? (
        // 로그인 후 Default Layout
        <>
          <Header />
          <div className="content">
            <Sidebar />
            <main className="main-layout">
              <AppRouter />
            </main>
          </div>
          <Footer />
        </>
      ) : (
        // 로그인 페이지 FullScreen Layout
        <main className="fullscreen-layout">
          <AppRouter />
        </main>
      )}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppLayout />
    </AuthProvider>
  );
}

export default App;
