import type { ApiResponse } from '@/types/type.api';
import { useMutation } from '@/hooks/_common/api.hook';
import { updateProfileImage } from '@/api/web/api.profile';
import type { UpdateProfileImageRequest } from '@/types/type.user';
import { useModal } from '@/hooks/_common/useModal';

export default function useUpdateProfileImage(onSuccessCallback?: () => void) {
  const { alert } = useModal();
  const handleSuccessUpdateProfileImage = (res: ApiResponse<void>) => {
    alert(res.code);
    onSuccessCallback?.();
  };

  const handleFailUpdateProfileImage = (res: ApiResponse<void>) => {
    alert(res.code);
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
