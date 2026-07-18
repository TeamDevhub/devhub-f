import type { ApiResponse } from '@/types/type.api';
import { useMutation } from '@/hooks/_common/api.hook';
import { updateProfileImage } from '@/api/web/api.profile';
import type { UpdateProfileImageRequest } from '@/types/type.user';
import { useModal } from '@/hooks/_common/useModal';

export default function useUpdateProfileImage(onSuccessCallback?: () => void) {
  const { alert } = useModal();
  const handleSuccessUpdateProfileImage = () => {
    alert('프로필 이미지가 변경되었습니다.');
    onSuccessCallback?.();
  };

  const handleFailUpdateProfileImage = (res: ApiResponse<void>) => {
    alert(res.error?.message || '프로필 이미지 변경에 실패했습니다.');
  };

  const { mutate: requestUpdateProfileImage } = useMutation<UpdateProfileImageRequest, void>(
    updateProfileImage,
    handleSuccessUpdateProfileImage,
    handleFailUpdateProfileImage,
  );

  const applyUpdateProfileImage = async (fileGuid: string) => {
    const payload: UpdateProfileImageRequest = {
      fileGuid,
    };

    await requestUpdateProfileImage(payload);
  };

  return {
    applyUpdateProfileImage,
  };
}
