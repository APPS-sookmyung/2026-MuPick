import { useState } from 'react';
import musicalsData from '../mock/musical_dummy.json';
import MusicalCard from '../components/MusicalCard';
import './HomePage.css';

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12; // 6개씩 표시

  // 1. 검색 필터링
  const filteredMusicals = musicalsData.filter((m) => {
    const term = searchTerm.toLowerCase().trim();
    return (
      m.title.toLowerCase().includes(term) ||
      m.genre.toLowerCase().includes(term) ||
      m.venue.toLowerCase().includes(term)
    );
  });

  // 2. 페이지 계산 (최소 1페이지 보장)
  // 2️⃣ 총 페이지 수 계산
  const totalPages = Math.max(1, Math.ceil(filteredMusicals.length / itemsPerPage));

  // 3️⃣ 🎯 현재 페이지의 12개 데이터만 정확하게 자르기 (Slice)
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  
  // filteredMusicals를 slice하므로 원본이 변형되지 않고 항상 12개 이하만 잘려나옵니다.
  const currentMusicals = filteredMusicals.slice(startIndex, endIndex);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="home-container">
      <h2 className="page-title">뮤지컬 데이터 조회</h2>
      
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="제목, 장르, 극장 검색"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      {currentMusicals.length > 0 ? (
        <div className="musical-grid">
          {currentMusicals.map((m) => (
            <MusicalCard key={m.id} musical={m} />
          ))}
        </div>
      ) : (
        <div className="no-result">검색 결과가 없습니다.</div>
      )}

      {/* 페이지네이션 (항상 표시되도록 수정) */}
      <div className="pagination">
        <button 
          disabled={currentPage === 1} 
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          &lt;
        </button>
        
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={currentPage === index + 1 ? 'active' : ''}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}

        <button 
          disabled={currentPage === totalPages} 
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          &gt;
        </button>
      </div>
    </div>
  );
}