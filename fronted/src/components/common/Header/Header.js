import React from "react";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <img
          src="/img/logo.png" // 로고 이미지 URL
          alt="Logo"
          className="header-logo"
        />
        <h1 className="header-title">독수리 이충사이트</h1>
      </div>
    </header>
  )
}

export default Header;
