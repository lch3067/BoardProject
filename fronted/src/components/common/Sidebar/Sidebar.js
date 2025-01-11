import React, { useState, useEffect  } from "react";
import UserInfo from "./component/UserInfo";
import TreeMenu from "./component/TreeMenu";
import useFetchMenus from "../../../hooks/useFetchMenus";
import "./Sidebar.css";

function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isAnimationDone, setIsAnimationDone] = useState(true);

  // Custom Hook으로 메뉴 데이터 가져오기
  const { menus, loading, error } = useFetchMenus();

  const rootNode = {
    menuId: "ROOT",
    menuDesc: "전체 목록",
    menuUrl: null,
    children: menus, // 기존 메뉴 리스트를 children으로 연결
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
    setIsAnimationDone(false);
  };

  useEffect(() => {
    // 사이드바가 확장된 후에 데이터를 가져오기
    if (!isCollapsed) {
      const timer = setTimeout(() => {
        setIsAnimationDone(true);
      }, 1500); // 애니메이션 시간 후에 실행

      return () => clearTimeout(timer); // 클린업
    }
  }, [isCollapsed]);

  

  if (error) {
    return <p className="error-message">Error loading menus: {error.message}</p>;
  }

  return (
    <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <button className="toggle-btn" onClick={toggleSidebar}>
        {isCollapsed ? ">" : "<"}
      </button>

      {/* 사용자 정보 */}
      <UserInfo isCollapsed={isCollapsed} isAnimationDone={isAnimationDone} />

      {/* 트리 메뉴 */}
      {!isCollapsed && isAnimationDone && (
        <div className="menu">
          {loading ? (
            <p>Loading menus...</p>
          ) : (
            <ul>
              {/* ROOT 노드를 최상단으로 렌더링 */}
              <TreeMenu key={rootNode.menuId} item={rootNode} />
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default Sidebar;
