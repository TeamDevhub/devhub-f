import type { ApiResponse } from '@/types/type.api';
import { Validators, AUTH_PATTERNS } from '@/utils/util._common';
import { useMutation } from '@/hooks/_common/api.hook';
import useFormState from '@/hooks/_common/useFormState';
import { useModal } from '@/hooks/_common/useModal';
import { ERROR_MESSAGES } from '@/constants/errorMessages';

import type { UpdatePasswordRequest } from '@/types/type.user';
import { updatePassword } from '@/api/web/api.profile';

interface PasswordForm extends UpdatePasswordRequest {
  confirmPassword: string;
}

export default function useUpdatePassword(onClose?: () => void) {
  const { alert } = useModal();
  const initData: PasswordForm = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  };

  const validations = {
    currentPassword: [Validators.required()],
    newPassword: [Validators.required(), Validators.pattern(AUTH_PATTERNS.PASSWORD, ERROR_MESSAGES.VALIDATE_PASSWORD_PATTERN)],
    confirmPassword: [Validators.required(), Validators.match<PasswordForm>('newPassword', ERROR_MESSAGES.PASSWORD_MISMATCH)],
  };

  const { state: passwordInfo, errors, handleChange, checkError, reset } = useFormState(initData, { validations, mode: 'manual' });

  const handleSuccessUpdatePassword = () => {
    alert('비밀번호가 변경되었습니다.');
    reset();
    onClose?.();
  };

  const handleFailUpdatePassword = (res: ApiResponse<void>) => {
    alert(res.error?.message || '비밀번호 변경에 실패했습니다.');
  };

  const { mutate: requestUpdatePassword } = useMutation<UpdatePasswordRequest, void>(
    updatePassword,
    handleSuccessUpdatePassword,
    handleFailUpdatePassword,
  );

  const applyUpdatePassword = async () => {
    // WebPopup은 onSubmit이 false를 반환할 때만 팝업을 열어둔 채 유지한다.
    // 검증 실패/서버 실패 시에도 false를 반환하지 않으면 팝업이 그냥 닫혀버려
    // 사용자가 입력값을 고칠 기회 없이 "저장은 안 됐는데 창은 닫힘" 상태가 된다.
    if (checkError()) return false;

    const payload: UpdatePasswordRequest = {
      currentPassword: passwordInfo.currentPassword,
      newPassword: passwordInfo.newPassword,
    };

    const res = await requestUpdatePassword(payload);
    return res.success;
  };

  const resetPasswordState = () => {
    reset();
    onClose?.();
  };

  return {
    passwordInfo,
    errors,
    handleChange,
    applyUpdatePassword,
    resetPasswordState,
  };
}
