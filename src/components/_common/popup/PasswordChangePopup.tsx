import { useState } from 'react';
import CustomTextfield from '../customMUI/CustomTextfield';
import WebPopup from './WebPopup';

export interface PasswordPopupProps {
  isOpen: boolean;
  onClose?: () => void;
  onSubmit?: (payload: { currentPassword: string; newPassword: string }) => void;
}

export default function PasswordPopup({ isOpen, onClose, onSubmit }: PasswordPopupProps) {
  const [isVerified, setIsVerified] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const resetState = () => {
    setIsVerified(false);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleClose = () => {
    resetState();
    onClose?.();
  };

  const handleSubmit = () => {
    if (!isVerified) {
      if (!currentPassword.trim()) {
        alert('현재 비밀번호를 입력해주세요.');
        return;
      }

      setIsVerified(true);
      return;
    }

    if (!newPassword.trim() || !confirmPassword.trim()) {
      alert('새 비밀번호를 모두 입력해주세요.');
      return;
    }

    if (newPassword !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    onSubmit?.({
      currentPassword,
      newPassword,
    });

    resetState();
  };

  return (
    <WebPopup
      isOpen={isOpen}
      onClose={handleClose}
      onSubmit={handleSubmit}
      title="비밀번호 변경"
      submitText={!isVerified ? '확인' : '저장'}
      closeOnSubmit={isVerified}
      size="small"
    >
      <div className="flex-col gap-8" style={{ padding: '0 20px' }}>
        {!isVerified && (
          <>
            <p className="label mt-24">현재 비밀번호 재입력</p>
            <CustomTextfield
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="특수문자, 숫자 포함 10자 이상"
            />
          </>
        )}

        {isVerified && (
          <>
            <p className="label mt-24">새 비밀번호</p>
            <CustomTextfield
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="특수문자, 숫자 포함 10자 이상"
            />

            <p className="label mt-16">비밀번호 확인</p>
            <CustomTextfield
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="비밀번호 확인"
            />
          </>
        )}
      </div>
    </WebPopup>
  );
}
