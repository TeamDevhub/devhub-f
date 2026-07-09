import { useEffect, useState, useCallback } from 'react';
import type { Area } from 'react-easy-crop';
import { Button, Box } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useModal } from '@/hooks/_common/useModal';

import WebPopup from '@/components/_common/popup/WebPopup';
import ImageCropper from './ImageCropper';
import { getCroppedImg } from './imageCropUtils';
import DragAndDropForm from '@/components/_common/DragAndDropForm';

interface ImageCropPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (file: File) => void;
}

export default function ImageCropPopup({ isOpen, onClose, onSubmit }: ImageCropPopupProps) {
  const { alert } = useModal();

  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);

  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  useEffect(() => {
    if (!imageSrc || !croppedAreaPixels) return;

    let previewUrl: string;

    const updatePreview = async () => {
      const file = await getCroppedImg(imageSrc, croppedAreaPixels, rotation);
      previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
    };

    updatePreview();

    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [imageSrc, croppedAreaPixels, rotation]);

  const onCropComplete = useCallback((_: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const resetState = () => {
    setImageSrc(null);
    setPreview(null);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setRotation(0);
    setCroppedAreaPixels(null);
  };

  const handleClose = () => {
    resetState();
    onClose();
  };

  const handleFileChange = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('이미지 파일만 업로드 가능합니다.');
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setImageSrc(reader.result as string);
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    if (!imageSrc || !croppedAreaPixels) return;

    const file = await getCroppedImg(imageSrc, croppedAreaPixels, rotation);
    onSubmit(file);
    resetState();
  };

  return (
    <WebPopup size="medium" isOpen={isOpen} onClose={handleClose} onSubmit={handleSubmit} title="사용자 이미지 변경" submitText="저장">
      {!imageSrc && (
        <Box sx={{ mt: 2 }}>
          <DragAndDropForm
            name="profileImage"
            placeHolder="이미지를 드래그하거나 클릭하여 업로드"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              handleFileChange(file);
            }}
          />
        </Box>
      )}

      {imageSrc && (
        <Box sx={{ mt: 2 }}>
          <ImageCropper
            imageSrc={imageSrc}
            crop={crop}
            zoom={zoom}
            rotation={rotation}
            setCrop={setCrop}
            setZoom={setZoom}
            setRotation={setRotation}
            onCropComplete={onCropComplete}
          />

          {preview && (
            <Box
              sx={{
                mt: 3,
                textAlign: 'center',
              }}
            >
              <Box
                component="img"
                src={preview}
                sx={{
                  width: 110,
                  height: 110,
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '2px solid #e2e8f0',
                }}
              />
            </Box>
          )}

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mt: 3,
            }}
          >
            <Button variant="outlined" startIcon={<RefreshIcon />} onClick={resetState}>
              다시 선택
            </Button>
          </Box>
        </Box>
      )}
    </WebPopup>
  );
}
