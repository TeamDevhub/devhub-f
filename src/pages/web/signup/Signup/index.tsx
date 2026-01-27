import UserInfoPage from "@/components/signup/UserInfoPage";
import VerificationPage from "@/components/signup/VerificationPage";
import { useState } from "react";

export default function Signup() {
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
