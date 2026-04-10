import useOauthCallback from '@/hooks/auth/useOauthCallback';

export default function OauthCallback() {
  const { loading } = useOauthCallback();

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '1.2rem',
      }}
    >
      {loading ? '🔐 로그인 처리 중입니다...' : '이동 중...'}
    </div>
  );
}
