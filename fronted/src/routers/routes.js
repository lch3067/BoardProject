import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Initail/Login";
import Forbidden from "../pages/Initail/Forbidden";
import Main from "../pages/Main";
import ProtectedRoute from "../components/admin/ProtectedRoute"; // 새롭게 만든 컴포넌트

// Lazy Loading
const WriteManagement = lazy(() => import("../pages/settlement/WriteManagement"));
const DailyUsage = lazy(() => import("../pages/settlement/DailyUsage"));

const TransactionManagement = lazy(() => import("../pages/finance/TransactionManagement"));
const InterestCalculator = lazy(() => import("../pages/finance/Interestcalculator"));

const RequestForm = lazy(() => import("../pages/deployment/RequestForm"));
const ReferenceInfo = lazy(() => import("../pages/deployment/ReferenceInfo"));
const JobManagement = lazy(() => import("../pages/deployment/JobManagement"));
const SvnManagement = lazy(() => import("../pages/deployment/SvnManagement"));
const ExecutionStatus = lazy(() => import("../pages/deployment/ExecutionStatus"));
const Execute = lazy(() => import("../pages/deployment/Execute"));

const AccountManagement = lazy(() => import("../pages/admin/AccountManagement"));
const MenuManagement = lazy(() => import("../pages/admin/MenuManagement"));
const PermissionManagement = lazy(() => import("../pages/admin/PermissionManagement"));

const AppRouter = () => {
  return (
    <Suspense fallback={<div className="loading-spinner">Loading...</div>}>
      <Routes>
        {/* 기본 진입점: 로그인 */}
        <Route path="/" element={<Navigate to="/Login" />} />
        <Route path="/Login" element={<Login />} />

        {/* 토큰 만료시 진입점 : 로그아웃 */}

        {/* 메인 페이지 */}
        <Route path="/main" element={<ProtectedRoute element={<Main />} />} />

        {/* Settlement Group */}
        <Route path="/settlement">
          <Route path="write-management" element={<ProtectedRoute element={<WriteManagement />} />} />
          <Route path="daily-usage" element={<ProtectedRoute element={<DailyUsage />} />} />
        </Route>

        {/* Finance Group */}
        <Route path="/finance">
          <Route path="transaction-management" element={<ProtectedRoute element={<TransactionManagement />} />} />
          <Route path="interest-calculator" element={<ProtectedRoute element={<InterestCalculator />} />} />
        </Route>

        {/* Deployment Group */}
        <Route path="/deployment">
          <Route path="request-form" element={<ProtectedRoute element={<RequestForm />} />} />
          <Route path="reference-info" element={<ProtectedRoute element={<ReferenceInfo />} />} />
          <Route path="job-management" element={<ProtectedRoute element={<JobManagement />} />} />
          <Route path="svn-management" element={<ProtectedRoute element={<SvnManagement />} />} />
          <Route path="execution-status" element={<ProtectedRoute element={<ExecutionStatus />} />} />
          <Route path="execute" element={<ProtectedRoute element={<Execute />} />} />
        </Route>

        {/* Admin Group */}
        <Route path="/admin">
          <Route path="user-list" element={<ProtectedRoute element={<AccountManagement />} />} />
          <Route path="menu" element={<ProtectedRoute element={<MenuManagement />} />} />
          <Route path="permission" element={<ProtectedRoute element={<PermissionManagement />} />} />
        </Route>

        {/* Forbidden Page */}
        <Route path="/forbidden" element={<Forbidden />} />
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
