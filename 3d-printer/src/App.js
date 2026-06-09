import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import LoginPage from './page/loginPage';
import RegisterPage from './page/registerPage';
import MainPage from './page/mainPage';
import ReservationPage from './page/reservationPage';
import MyPage from './page/myPage';
import Setting from './page/setting';
import EmailChange from './page/EmailChange';
import PasswordChange from './page/PasswordChange';
import Notification from './page/Notification';
import FindPassword from './page/FindPassword';
import VerifyEmail from './page/VerifyEmail';
import ResetPassword from './page/ResetPassword';
import './App.css';

function AppContent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // 'available', 'reserved', 'in_use' 세 가지 상태
  const [printerStates, setPrinterStates] = useState(['available', 'available', 'available', 'available']);
  const location = useLocation();

  // 💡 1. 헤더와 푸터를 완전히 숨겨야 하는 "독립 페이지" 주소 정의
  const isAuthPage = ['/Login', '/Register', '/login', '/register', '/find-password', '/verify-email','/reset-password'].includes(location.pathname);
  // 푸터를 숨길 설정 페이지들
  const hideFooterOnly = ['/settings', '/email-change', '/password-change', '/notification']
    .includes(location.pathname);

  return (
    <div className="App">
      {/* 💡 2. 로그인 및 회원가입 페이지가 아닐 때만 헤더를 보여줌 */}
      {!isAuthPage && (
        <header className="global-header">
          <div className="header-container">
            <div className="header-left-group">
              <Link to="/Home" className="logo-link menu-item">홈</Link>
              <Link to="/Reservation" className="menu-item">예약</Link>
              <Link to="/mypage" className="menu-item text-nowrap mypage-item">마이페이지</Link>
            </div>
            <div className="header-center-group">
              <img src="/spam.svg" alt="spam" className="spam-img" />
              <img src="/srh.svg" alt="srh" className="srh-img" />
            </div>
            <div className="header-right-group">
              <Link to="/logout" className="menu-item logout-item">로그아웃</Link>
            </div>
          </div>
        </header>
      )}

      {/* 💡 3. 로그인 페이지일 때는 main-content 클래스의 간섭을 받지 않도록 분기 처리 */}
      <main className={isAuthPage ? "auth-content" : "main-content"}>
        <Routes>
          <Route path="/" element={isLoggedIn ? <Navigate to="/Home" replace /> : <Navigate to="/Login" replace />} />
          <Route path="/Home" element={<MainPage printerStates={printerStates} setPrinterStates={setPrinterStates} />} />
          <Route path="/Reservation" element={<ReservationPage printerStates={printerStates} setPrinterStates={setPrinterStates} />} />
          <Route path="/mypage" element={<MyPage printerStates={printerStates} setPrinterStates={setPrinterStates} />} />
          <Route path="/Login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/Register" element={<RegisterPage />} />
          <Route path="/settings" element={<Setting />} />
          <Route path="/logout" element={<Navigate to="/Login" replace />} />
          <Route path="/email-change" element={<EmailChange />} />
          <Route path="/password-change" element={<PasswordChange />} />
          <Route path="/notification" element={<Notification />} />
          <Route path="/find-password" element={<FindPassword />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </main>

      {/* 💡 4. 로그인/회원가입 페이지와 설정 페이지가 아닐 때만 푸터를 보여줌 */}
      {!isAuthPage && !hideFooterOnly && (
        <div className="footer">
          <p>서울로봇고등학교 3D 프린터 관리 시스템</p>
          <p>SPAM 동아리에서 제작</p>
          <div className="footer-content">
            <span>Frontend: react</span>
            <span>Backend: DRF</span>
            <span>Design: figma</span>
          </div>
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;