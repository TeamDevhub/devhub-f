import { useState } from 'react';
import UserInfoPage from './UserInfoPage';
import VerificationPage from './VerificationPage';

export default function SignupPage() {
  const [step, setStep] = useState(1);

  const handleNext = () => setStep(2);
  const handleBack = () => setStep(1);

  return (
    <div className='auth-page flex-center'>
      <div className="flex-col" style={{ gap: '0.8rem' }}>
        {step === 1 && <VerificationPage onNext={handleNext} />}
        {step === 2 && <UserInfoPage onBack={handleBack} />}
      </div>
    </div>
  )
}