import { useNavigate } from 'react-router-dom';
import { signInWithGoogle, signInAsGuest } from '../firebase';
import './LoginPage.css';

export default function LoginPage({ setUser }) {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const user = await signInWithGoogle();
      
      // 상위 컴포넌트로 유저 정보 전달 (필요 시)
      if (setUser) setUser(user);

      alert(`${user.displayName}님, 환영합니다!`);
      navigate('/home'); // 로그인 완료 후 홈 화면으로 이동
    } catch (error) {
      console.error(error);
      alert("구글 로그인에 실패했습니다. 다시 시도해 주세요.");
    }
  };

  const handleGuestLogin = async () => {
    try {
      const user = await signInAsGuest();
      if (setUser) setUser(user);

      alert("게스트로 접속합니다.");
      navigate('/home');
    } catch (error) {
      console.error(error);
      alert("비회원 접속에 실패했습니다. 다시 시도해 주세요.");
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">MuPick</h2>
      <p className="login-subtitle">취향 기반 뮤지컬 추천 서비스</p>
      
      <button className="login-btn" onClick={handleGoogleLogin}>
        Google 계정으로 로그인
      </button>

      <button className="login-btn guest-btn" onClick={handleGuestLogin}>
        비회원으로 시작하기
      </button>
    </div>
  );
}