import type { ApiResponse } from '@/types/type.api';
import { Validators, AUTH_PATTERNS } from '@/utils/util._common';
import { useMutation } from '@/hooks/_common/api.hook';
import useFormState from '@/hooks/_common/useFormState.ts';
import { useModal } from '@/hooks/_common/useModal';
import { useAuth } from '@/contexts/AuthContext';
import { ERROR_MESSAGES } from '@/constants/errorMessages';

import type { UpdateProfileRequest, UserDetailResponse } from '@/types/type.user';
import { updateProfile } from '@/api/web/api.profile';

export default function useUpdateProfile(profile: UserDetailResponse) {
  const { alert } = useModal();
  const { refreshUser } = useAuth();
  const initData: UpdateProfileRequest = {
    username: profile.user.username,
    introduction: profile.user.introduction,
    positionList: profile.positionList,
    skillList: profile.skillList,
  };

  const validations = {
    username: [Validators.required(), Validators.pattern(AUTH_PATTERNS.USERNAME, ERROR_MESSAGES.VALIDATE_USERNAME_PATTERN)],
    skillList: [Validators.minArrayLength(1)],
    positionList: [Validators.minArrayLength(1)],
  };

  const { state: userInfo, errors, handleChange, createHandler, createToggle, checkError } = useFormState(initData, { validations, mode: 'manual' });

  const handleSuccessUpdateProfile = async () => {
    await refreshUser();
    alert('프로필이 수정되었습니다.');
  };

  const handleFailUpdateProfile = (res: ApiResponse<void>) => {
    alert(res.error?.message || '프로필 수정에 실패했습니다.');
  };

  const applyUpdateProfile = async () => {
    if (checkError()) return;

    const payload: UpdateProfileRequest = {
      username: userInfo.username,
      introduction: userInfo.introduction,
      positionList: userInfo.positionList,
      skillList: userInfo.skillList,
    };

    await requestUpdateProfile(payload);
  };

  const { mutate: requestUpdateProfile, loading } = useMutation<UpdateProfileRequest, void>(
    updateProfile,
    handleSuccessUpdateProfile,
    handleFailUpdateProfile,
  );

  return {
    userInfo,
    errors,
    handleChange,
    createHandler,
    createToggle,
    applyUpdateProfile,
    loading,
  };
}
