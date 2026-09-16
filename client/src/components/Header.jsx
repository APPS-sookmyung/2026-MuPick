import { Link, useLocation } from 'react-router-dom';
import './Header.css';

export default function Header() {
  const location = useLocation();

  return (
    <header className="app-header">
      <Link to="/home" className="header-logo">
        MuPick
      </Link>

      <nav className="header-nav">
        <Link 
          to="/home" 
          className={`nav-link ${location.pathname === '/home' ? 'active' : ''}`}
        >
          홈
        </Link>
        <Link 
          to="/recommend" 
          className={`nav-link ${location.pathname === '/recommend' ? 'active' : ''}`}
        >
          추천
        </Link>
        <Link 
          to="/mypage" 
          className={`nav-link ${location.pathname === '/mypage' ? 'active' : ''}`}
        >
          마이페이지
        </Link>
      </nav>
    </header>
  );
}