import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function OauthCallback() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    const provider = params.get('provider');

    // ✅ 유효성 검사
    if (!code || !provider) {
      alert('잘못된 접근입니다.');
      navigate('/');
      return;
    }

    const processOauth = async () => {
      try {
        const response = await fetch(`http://localhost:8080/auth/oauth/${provider}/process?code=${code}`, {
          method: 'GET',
          credentials: 'include', // 🔥 쿠키 포함
        });

        if (!response.ok) {
          throw new Error('OAuth 처리 실패');
        }

        const result = await response.json();

        // ✅ 응답 구조 체크
        if (!result.success) {
          throw new Error(result.error?.message || '로그인 실패');
        }

        const data = result.data;

        // 🔥 1. 회원가입 필요
        if (data?.tempToken) {
          localStorage.setItem('tempToken', data.tempToken);

          // 👉 회원가입 페이지로 이동
          navigate('/auth/signup');
          return;
        }

        // 🔥 2. 로그인 완료
        if (data?.accessToken) {
          // 👉 accessToken을 사용할 경우 저장 (선택)
          localStorage.setItem('accessToken', data.accessToken);

          navigate('/');
          return;
        }

        // ❗ 예상 못한 경우
        throw new Error('알 수 없는 인증 상태');
      } catch (error) {
        console.error('OAuth Error:', error);
        alert('로그인 처리 중 오류가 발생했습니다.');

        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    processOauth();
  }, [navigate]);

  // ✅ 로딩 UI
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
