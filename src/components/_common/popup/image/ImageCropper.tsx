import Cropper from 'react-easy-crop';
import type { Area } from 'react-easy-crop';

import { Box, Slider, Typography, IconButton } from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import RotateRightIcon from '@mui/icons-material/RotateRight';

interface ImageCropperProps {
  imageSrc: string;
  crop: { x: number; y: number };
  zoom: number;
  rotation: number;
  setCrop: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>;
  setZoom: React.Dispatch<React.SetStateAction<number>>;
  setRotation: React.Dispatch<React.SetStateAction<number>>;
  onCropComplete: (croppedArea: Area, croppedAreaPixels: Area) => void;
}

export default function ImageCropper({ imageSrc, crop, zoom, rotation, setCrop, setZoom, setRotation, onCropComplete }: ImageCropperProps) {
  const zoomOut = () => setZoom((z) => Math.max(1, z - 0.1));
  const zoomIn = () => setZoom((z) => Math.min(3, z + 0.1));

  const rotateLeft = () => setRotation((r) => r - 90);
  const rotateRight = () => setRotation((r) => r + 90);

  return (
    <Box>
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: 360,
          borderRadius: 3,
          overflow: 'hidden',
          background: '#f6f7f9',
        }}
      >
        <Cropper
          image={imageSrc}
          crop={crop}
          zoom={zoom}
          rotation={rotation}
          aspect={1}
          cropShape="round"
          showGrid={false}
          zoomWithScroll
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropComplete}
        />
      </Box>

      <Box sx={{ mt: 3, px: 2 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <IconButton
            size="small"
            onClick={zoomOut}
            sx={{
              bgcolor: '#f3f4f6',
              '&:hover': { bgcolor: '#e5e7eb' },
            }}
          >
            <RemoveIcon fontSize="small" />
          </IconButton>

          <Slider
            value={zoom}
            min={1}
            max={3}
            step={0.1}
            onChange={(_, v) => setZoom(v as number)}
            sx={{
              flex: 1,
              '& .MuiSlider-thumb': {
                width: 16,
                height: 16,
              },
              '& .MuiSlider-track': {
                height: 6,
              },
              '& .MuiSlider-rail': {
                height: 6,
                opacity: 0.3,
              },
            }}
          />

          <IconButton
            size="small"
            onClick={zoomIn}
            sx={{
              bgcolor: '#f3f4f6',
              '&:hover': { bgcolor: '#e5e7eb' },
            }}
          >
            <AddIcon fontSize="small" />
          </IconButton>
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mt: 1,
          }}
        >
          <Typography
            sx={{
              fontSize: 12,
              px: 1.5,
              py: 0.3,
              borderRadius: 10,
              bgcolor: '#f1f5f9',
              color: '#475569',
              fontWeight: 500,
            }}
          >
            {zoom.toFixed(1)}x
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 3,
          mt: 2,
        }}
      >
        <IconButton
          onClick={rotateLeft}
          sx={{
            bgcolor: '#f3f4f6',
            '&:hover': { bgcolor: '#e5e7eb' },
          }}
        >
          <RotateLeftIcon />
        </IconButton>

        <Typography
          sx={{
            fontSize: 13,
            color: '#64748b',
            fontWeight: 500,
          }}
        >
          회전
        </Typography>

        <IconButton
          onClick={rotateRight}
          sx={{
            bgcolor: '#f3f4f6',
            '&:hover': { bgcolor: '#e5e7eb' },
          }}
        >
          <RotateRightIcon />
        </IconButton>
      </Box>
    </Box>
  );
}
