import CustomTextfield from '../customMUI/CustomTextfield';
import WebPopup from './WebPopup';
import useUpdatePassword from '@/hooks/web/profile/user/useUpdatePassword';

export interface PasswordPopupProps {
  isOpen: boolean;
  onClose?: () => void;
}

export default function PasswordPopup({ isOpen, onClose }: PasswordPopupProps) {
  const { passwordInfo, handleChange, applyUpdatePassword, resetPasswordState } = useUpdatePassword(onClose);

  return (
    <WebPopup
      isOpen={isOpen}
      onClose={resetPasswordState}
      onSubmit={applyUpdatePassword}
      title="비밀번호 변경"
      submitText="저장"
      closeOnSubmit
      size="small"
    >
      <div className="flex-col gap-8" style={{ padding: '0 20px' }}>
        <p className="label mt-24">기존 비밀번호</p>
        <CustomTextfield
          name="currentPassword"
          type="password"
          value={passwordInfo.currentPassword}
          onChange={(e) => handleChange('currentPassword', e.target.value)}
          placeholder="현재 비밀번호 입력"
        />

        <p className="label mt-16">새 비밀번호</p>
        <CustomTextfield
          name="newPassword"
          type="password"
          value={passwordInfo.newPassword}
          onChange={(e) => handleChange('newPassword', e.target.value)}
          placeholder="특수문자, 숫자 포함 10자 이상"
        />

        <p className="label mt-16">새 비밀번호 확인</p>
        <CustomTextfield
          name="confirmPassword"
          type="password"
          value={passwordInfo.confirmPassword}
          onChange={(e) => handleChange('confirmPassword', e.target.value)}
          placeholder="비밀번호 확인"
        />
      </div>
    </WebPopup>
  );
}
