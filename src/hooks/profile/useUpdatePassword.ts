import type { ApiResponse } from '@/types/type.api';
import { Validators } from '@/utils/util._common';
import { useMutation } from '@/hooks/_common/api.hook';
import useFormState from '@/hooks/_common/useFormState';

import type { UpdatePasswordRequest } from '@/types/type.user';
import { updatePassword } from '@/api/profile/profile.api';

interface PasswordForm extends UpdatePasswordRequest {
  confirmPassword: string;
}

export default function useUpdatePassword(onClose?: () => void) {
  const initData: PasswordForm = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  };

  const validations = {
    currentPassword: [Validators.required()],
    newPassword: [Validators.required()],
    confirmPassword: [Validators.required()],
  };

  const { state: passwordInfo, handleChange, checkError, reset } = useFormState(initData, { validations });

  const handleSuccessUpdatePassword = (res: ApiResponse<void>) => {
    alert(res.code);
    reset();
    onClose?.();
  };

  const handleFailUpdatePassword = (res: ApiResponse<void>) => {
    alert(res.code);
  };

  const { mutate: requestUpdatePassword } = useMutation<UpdatePasswordRequest, void>(
    updatePassword,
    handleSuccessUpdatePassword,
    handleFailUpdatePassword,
  );

  const applyUpdatePassword = async () => {
    if (checkError()) return;

    if (passwordInfo.newPassword !== passwordInfo.confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    const payload: UpdatePasswordRequest = {
      currentPassword: passwordInfo.currentPassword,
      newPassword: passwordInfo.newPassword,
    };

    await requestUpdatePassword(payload);
  };

  const resetPasswordState = () => {
    reset();
    onClose?.();
  };

  return {
    passwordInfo,
    handleChange,
    applyUpdatePassword,
    resetPasswordState,
  };
}
