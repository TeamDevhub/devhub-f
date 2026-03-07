import { useState, useCallback, useRef } from 'react';
import type { Area } from 'react-easy-crop';
import { Button, Box, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import RefreshIcon from '@mui/icons-material/Refresh';
import VisibilityIcon from '@mui/icons-material/Visibility';
import WebPopup from '@/components/_common/popup/WebPopup';
import ImageCropper from './ImageCropper';
import { getCroppedImg } from './imageCropUtils';

interface ImageCropPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (file: File) => void;
}

export default function ImageCropPopup({ isOpen, onClose, onSubmit }: ImageCropPopupProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const onCropComplete = useCallback((_: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const resetState = () => {
    setImageSrc(null);
    setPreview(null);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCroppedAreaPixels(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClose = () => {
    resetState();
    onClose();
  };

  const handleFileChange = (file: File) => {
    const reader = new FileReader();

    reader.onload = () => {
      setImageSrc(reader.result as string);
      setPreview(null);
    };

    reader.readAsDataURL(file);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    handleFileChange(file);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    const file = event.dataTransfer.files?.[0];
    if (!file) return;

    handleFileChange(file);
  };

  const handlePreview = async () => {
    if (!imageSrc || !croppedAreaPixels) return;

    const file = await getCroppedImg(imageSrc, croppedAreaPixels);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    if (!imageSrc || !croppedAreaPixels) return;

    const file = await getCroppedImg(imageSrc, croppedAreaPixels);
    onSubmit(file);
    resetState();
  };

  return (
    <WebPopup size="medium" isOpen={isOpen} onClose={handleClose} onSubmit={handleSubmit} title="사용자 이미지 변경" submitText="저장">
      {!imageSrc && (
        <Box
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          sx={{
            border: '2px dashed #ddd',
            borderRadius: '12px',
            padding: '40px',
            textAlign: 'center',
            cursor: 'pointer',
            transition: '0.2s',
            '&:hover': {
              borderColor: '#42a5f5',
              backgroundColor: '#f8fbff',
            },
          }}
          onClick={() => fileInputRef.current?.click()}
        >
          <CloudUploadIcon sx={{ fontSize: 48, color: '#42a5f5' }} />

          <Typography sx={{ mt: 2, fontWeight: 600 }}>이미지를 드래그하거나 클릭하여 업로드</Typography>

          <Typography sx={{ fontSize: 14, color: '#777', mt: 1 }}>PNG, JPG, JPEG 파일 지원</Typography>

          <Button
            variant="contained"
            sx={{ mt: 3 }}
            onClick={(e) => {
              e.stopPropagation();
              fileInputRef.current?.click();
            }}
          >
            파일 선택
          </Button>

          <input ref={fileInputRef} hidden type="file" accept="image/*" onChange={handleInputChange} />
        </Box>
      )}

      {imageSrc && (
        <Box sx={{ mt: 2 }}>
          <ImageCropper imageSrc={imageSrc} crop={crop} zoom={zoom} setCrop={setCrop} setZoom={setZoom} onCropComplete={onCropComplete} />

          {preview && (
            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
              <img
                src={preview}
                alt="preview"
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '1px solid #ddd',
                }}
              />
            </Box>
          )}

          <Box display="flex" justifyContent="center" mt={3} gap={2}>
            <Button
              variant="outlined"
              startIcon={<RefreshIcon />}
              sx={{
                borderColor: '#9e9e9e',
                color: '#555',
                '&:hover': {
                  borderColor: '#616161',
                  backgroundColor: '#f5f5f5',
                },
              }}
              onClick={() => fileInputRef.current?.click()}
            >
              변경
            </Button>

            <Button
              variant="contained"
              startIcon={<VisibilityIcon />}
              sx={{
                backgroundColor: '#42a5f5',
                '&:hover': {
                  backgroundColor: '#1e88e5',
                },
              }}
              onClick={handlePreview}
            >
              미리보기
            </Button>
          </Box>

          <input ref={fileInputRef} hidden type="file" accept="image/*" onChange={handleInputChange} />
        </Box>
      )}
    </WebPopup>
  );
}
