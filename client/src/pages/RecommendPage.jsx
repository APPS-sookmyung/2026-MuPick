import './RecommendPage.css';

export default function RecommendPage({ user }) {
  // 구글 계정 이름 가져오기 (없을 경우 기본값 '사용자')
  const userName = user?.displayName || '사용자';

  return (
    <div className="recommend-container">
      <h2 className="page-title">맞춤형 추천 결과</h2>
      <div className="recommend-card">
        <p className="recommend-title"><strong>MuPick's Pick: 팬텀</strong></p>
        <p className="recommend-reason">
          비극적 스토리와 심리적 서사를 선호하는 {userName}님을 위해 레베카와 유사한 팬텀을 추천합니다.
        </p>
      </div>
    </div>
  );
}