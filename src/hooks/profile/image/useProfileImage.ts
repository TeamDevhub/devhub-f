import { useState } from 'react';
import useFileUpload from '@/hooks/_common/useFileUpload';
import useUpdateProfileImage from './useUpdateProfileImage';

export default function useProfileImageUpload(onSuccess?: () => Promise<void>) {
  const { upload } = useFileUpload();
  const { applyUpdateProfileImage } = useUpdateProfileImage(async () => {
    if (onSuccess) await onSuccess();
  });

  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  const handleUpload = async (file: File) => {
    try {
      const res = await upload(undefined, file);

      const fileGuid = res?.data?.fileGuids?.file;
      if (!fileGuid) throw new Error('파일 업로드 실패');

      await applyUpdateProfileImage(fileGuid);
      close();
    } catch (error) {
      console.error('이미지 업로드 실패', error);
    }
  };

  return {
    isOpen,
    open,
    close,
    handleUpload,
  };
}
