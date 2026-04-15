import { useSearchParams } from 'react-router-dom';
import UserInfoPage from '@/components/signup/UserInfoPage';
import VerificationPage from '@/components/signup/VerificationPage';
import { useState } from 'react';

export default function Signup() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [emailAddress, setEmailAddress] = useState<string | null>(null);

  const handleVerified = (verifiedEmailAddress: string) => {
    setEmailAddress(verifiedEmailAddress);
  };

  if (token) {
    return <UserInfoPage tempToken={token} />;
  }

  return (
    <div className="auth-page flex-center">
      <div className="flex-col" style={{ gap: '0.8rem' }}>
        {!emailAddress && <VerificationPage onVerified={handleVerified} />}
        {emailAddress && <UserInfoPage email={emailAddress} />}
      </div>
    </div>
  );
}
