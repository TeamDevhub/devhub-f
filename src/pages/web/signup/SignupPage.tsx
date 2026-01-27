import { useState } from "react";
import UserInfoPage from "./UserInfoPage";
import VerificationPage from "./VerificationPage";

export default function SignupPage() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");

  const handleNextFromVerification = (verifiedEmail: string) => {
    setEmail(verifiedEmail);
    setStep(2);
  };

  const handleBack = () => setStep(1);

  return (
    <div className="auth-page flex-center">
      <div className="flex-col" style={{ gap: "0.8rem" }}>
        {step === 1 && <VerificationPage onNext={handleNextFromVerification} />}
        {step === 2 && <UserInfoPage email={email} onBack={handleBack} />}
      </div>
    </div>
  );
}
