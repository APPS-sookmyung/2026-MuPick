// MusicalPage.jsx
import { useParams, useNavigate } from 'react-router-dom';
import musicalsData from '../mock/musical_dummy.json';
import { addFavorite, removeFavorite } from '../services/userService';
import './MusicalPage.css';

export default function MusicalPage({ user, favorites, setFavorites }) {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const musical = musicalsData.find((m) => m.id === Number(id));
  
  // Firestore 객체 구조(f.musicalId)와 기본 json 구조(f.id) 모두 대응
  const isLiked = favorites.some(
    (f) => String(f.musicalId || f.id) === String(musical?.id)
  );

  const toggleFavorite = async () => {
    if (!user) {
      alert("로그인이 필요한 기능입니다.");
      return;
    }

    if (isLiked) {
      // 🎯 1. Firestore DB에서 찜 삭제
      await removeFavorite(user.uid, musical.id);
      // 🎯 2. React 상태 업데이트
      setFavorites(favorites.filter(
        (f) => String(f.musicalId || f.id) !== String(musical.id)
      ));
    } else {
      const selectedTag = "비극적 스토리";
      // 🎯 1. Firestore DB에 찜 추가
      await addFavorite(user.uid, musical, selectedTag);
      // 🎯 2. React 상태 업데이트
      setFavorites([
        ...favorites,
        {
          musicalId: musical.id,
          id: musical.id,
          title: musical.title,
          posterUrl: musical.posterUrl,
          selectedTag: selectedTag
        }
      ]);
    }
  };

  if (!musical) return <div className="musical-detail-container">작품을 찾을 수 없습니다.</div>;

  return (
    <div className="musical-detail-container">
      {/* 상단 뒤로가기 버튼 */}
      <button className="back-btn" onClick={() => navigate(-1)} aria-label="뒤로가기">
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M19 12H5" />
          <path d="M12 19l-7-7 7-7" />
        </svg>
      </button>

      {/* 포스터 */}
      <img 
        src={musical.posterUrl} 
        alt={musical.title} 
        className="detail-poster-img" 
      />
      
      {/* 오른쪽 정보 묶음 */}
      <div className="detail-info-content">
        <h2 className="detail-title">{musical.title}</h2>
        <p className="detail-meta">장르: {musical.genre} | 극장: {musical.venue}</p>
        <p className="detail-desc">{musical.desc}</p>
        <button className="like-btn" onClick={toggleFavorite}>
          {isLiked ? "❤️ 찜 취소" : "🤍 찜하기"}
        </button>
        {isLiked && <p className="tag-info">선택된 이유 태그: #비극적 스토리</p>}
      </div>
    </div>
  );
}