import type { Area } from 'react-easy-crop';

export const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.src = url;
    image.onload = () => resolve(image);
    image.onerror = reject;
  });

export const getCroppedImg = async (imageSrc: string, crop: Area): Promise<File> => {
  const image = await createImage(imageSrc);

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;

  canvas.width = crop.width;
  canvas.height = crop.height;

  ctx.drawImage(image, crop.x, crop.y, crop.width, crop.height, 0, 0, crop.width, crop.height);

  return new Promise<File>((resolve) => {
    canvas.toBlob(
      (blob) => {
        resolve(
          new File([blob!], 'profile.jpg', {
            type: 'image/jpeg',
          }),
        );
      },
      'image/jpeg',
      0.8,
    );
  });
};
