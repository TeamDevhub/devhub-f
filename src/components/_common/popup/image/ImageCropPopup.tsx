import { useState, useCallback } from 'react';
import type { Area } from 'react-easy-crop';
import WebPopup from '@/components/_common/popup/WebPopup';
import ImageCropper from './ImageCropper';
import { getCroppedImg } from './imageCropUtils';

interface ImageCropPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (file: File) => void;
}

export default function ImageCropPopup({ isOpen, onClose, onSubmit }: ImageCropPopupProps) {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const onCropComplete = useCallback((_: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      setImageSrc(reader.result as string);
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    if (!imageSrc || !croppedAreaPixels) return;

    const file = await getCroppedImg(imageSrc, croppedAreaPixels);

    onSubmit(file);
  };

  return (
    <WebPopup size="medium" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} title="사용자 이미지 변경" submitText="저장">
      {!imageSrc && <input type="file" accept="image/*" onChange={handleFileChange} />}

      {imageSrc && <ImageCropper imageSrc={imageSrc} crop={crop} zoom={zoom} setCrop={setCrop} setZoom={setZoom} onCropComplete={onCropComplete} />}
    </WebPopup>
  );
}
