import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { getUserFavorites } from './services/userService';

import Header from './components/Header';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import MusicalPage from './pages/MusicalPage';
import RecommendPage from './pages/RecommendPage';
import MyPage from './pages/MyPage';

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);

  // 파이어베이스 로그인 상태 지속성 확인
  // App.jsx 내부 useEffect 부분
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        const userFavs = await getUserFavorites(currentUser.uid);
        setFavorites(userFavs);
      } else {
        // 로그아웃되었거나 유저가 없는 경우 찜 목록 초기화
        setFavorites([]);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return null;

  /* 라우팅 및 접근 제어 */
  return (
    <Router>
      <div style={{
          padding: user ? '0px 30px 60px 30px' : '0px',
          height: '100%',
          boxSizing: 'border-box'
        }}
      >
        {user && <Header />}
        <Routes>
          {/* 로그인 안 되어 있으면 로그인 페이지, 되어 있으면 /home으로 이동 */}
          <Route 
            path="/" 
            element={user ? <Navigate to="/home" /> : <LoginPage setUser={setUser} />} 
          />

          {/* 로그인된 사용자만 접근 가능하도록 접근 제어 및 경로 설정 */}
          <Route 
            path="/home" 
            element={user ? <HomePage user={user} /> : <Navigate to="/" />} 
          />
          <Route 
            path="/musical/:id" 
            element={
              user ? (
                <MusicalPage 
                  user={user} 
                  favorites={favorites} 
                  setFavorites={setFavorites} 
                />
              ) : (
                <Navigate to="/" />
              )
            } 
          />
          <Route 
            path="/recommend" 
            element={user ? <RecommendPage user={user} /> : <Navigate to="/" />} 
          />
          <Route 
            path="/mypage" 
            element={
              user ? <MyPage favorites={favorites} user={user} />
              : <Navigate to="/" />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}