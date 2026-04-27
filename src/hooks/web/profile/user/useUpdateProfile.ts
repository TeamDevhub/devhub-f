import type { ApiResponse } from '@/types/type.api';
import { Validators } from '@/utils/util._common';
import { useMutation } from '@/hooks/_common/api.hook';
import useFormState from '@/hooks/_common/useFormState.ts';
import { useModal } from '@/hooks/_common/useModal';
import { useAuth } from '@/contexts/AuthContext';

import type { UpdateProfileRequest, UserDetailResponse } from '@/types/type.user';
import { updateProfile } from '@/api/web/profile.api';

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
    username: [Validators.required()],
    skillList: [Validators.minArrayLength(1)],
    positionList: [Validators.minArrayLength(1)],
  };

  const { state: userInfo, handleChange, createHandler, createToggle, checkError } = useFormState(initData, { validations });

  const handleSuccessUpdateProfile = async (res: ApiResponse<void>) => {
    await refreshUser();
    alert(res.code);
  };

  const handleFailUpdateProfile = (res: ApiResponse<void>) => {
    alert(res.code);
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
    handleChange,
    createHandler,
    createToggle,
    applyUpdateProfile,
    loading,
  };
}
