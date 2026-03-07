import Cropper from 'react-easy-crop';
import type { Area } from 'react-easy-crop';

interface ImageCropperProps {
  imageSrc: string;
  crop: { x: number; y: number };
  zoom: number;
  setCrop: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>;
  setZoom: React.Dispatch<React.SetStateAction<number>>;
  onCropComplete: (croppedArea: Area, croppedAreaPixels: Area) => void;
}

export default function ImageCropper({ imageSrc, crop, zoom, setCrop, setZoom, onCropComplete }: ImageCropperProps) {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: 340,
        borderRadius: 12,
        overflow: 'hidden',
        background: '#f6f7f9',
      }}
    >
      <Cropper
        image={imageSrc}
        crop={crop}
        zoom={zoom}
        aspect={1}
        cropShape="round"
        showGrid={false}
        zoomWithScroll
        onCropChange={setCrop}
        onZoomChange={setZoom}
        onCropComplete={onCropComplete}
        style={{
          containerStyle: {
            background: '#f6f7f9',
          },
          cropAreaStyle: {
            border: '2px solid white',
            boxShadow: '0 0 0 9999px rgba(0,0,0,0.35)',
          },
        }}
      />

      <div
        style={{
          position: 'absolute',
          bottom: 12,
          left: 20,
          right: 20,
        }}
      >
        <input type="range" min={1} max={3} step={0.1} value={zoom} onChange={(e) => setZoom(Number(e.target.value))} style={{ width: '100%' }} />
      </div>
    </div>
  );
}
