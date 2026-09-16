// MyPage.jsx
import { logout } from '../firebase';
import { deleteUserData } from '../services/userService';
import './MyPage.css';

export default function MyPage({ favorites = [], user }) {
  const userName = user?.displayName || '사용자';

  // 로그아웃 처리 함수
  const handleLogout = async () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      try {
        if (user && user.isAnonymous) {
          await deleteUserData(user.uid);
        }
        await logout();
        alert("로그아웃 되었습니다.");
      } catch (error) {
        alert("로그아웃 중 오류가 발생했습니다.");
      }
    }
  };

  return (
    <div className="mypage-container">
      <div className="mypage-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0px' }}>
        <h2 className="page-title">마이페이지</h2>
        <button className="logout-btn" onClick={handleLogout}>
          로그아웃
        </button>
      </div>

      <h3 className="section-title">취향 차트</h3>
      <div className="chart-placeholder">[ Radar Chart Component ]</div>
      
      <h3 className="section-title">{userName}님이 찜한 작품 ({favorites.length})</h3>
      <ul className="fav-list">
        {favorites.length > 0 ? (
          favorites.map((f) => (
            <li key={f.musicalId || f.id} className="fav-item">
              {f.title} - <span className="tag-badge">#{f.selectedTag}</span>
            </li>
          ))
        ) : (
          <li className="fav-item" style={{ color: '#888' }}>찜한 뮤지컬이 없습니다.</li>
        )}
      </ul>
    </div>
  );
}