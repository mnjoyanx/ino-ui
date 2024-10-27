// export const compressImage = (
//     file: File,
//     quality: number = 0.5,
//     maxWidth: number = 1024,
//     maxHeight: number = 1024,
// ) => {
//     return new Promise((resolve, reject) => {
//         const reader = new FileReader();
//         reader.readAsDataURL(file);
//         reader.onload = () => {
//             const img = new Image();
//             img.src = reader.result as string;

//             img.onload = () => {
//                 const canvas = document.createElement('canvas');
//                 const ctx = canvas.getContext('2d');

//                 const width = img.width;
//                 const height = img.height;

//                 let newWidth = width;
//                 let newHeight = height;

//                 if (width > maxWidth || height > maxHeight) {
//                     if (width > height) {
//                         newWidth = maxWidth;
//                         newHeight = (height / width) * maxWidth;
//                     } else {
//                         newHeight = maxHeight;
//                         newWidth = (width / height) * maxHeight;
//                     }
//                 }

//                 canvas.width = newWidth;
//                 canvas.height = newHeight;

//                 ctx?.drawImage(img, 0, 0, newWidth, newHeight);

//                 const compressedImage = canvas.toDataURL('image/jpeg', quality);
//                 resolve(compressedImage);

//                 canvas.remove();
//             };

//             img.onerror = reject;
//         };

//         reader.onerror = reject;
//     });
// };


export async function compressImageFromUrl(
  imageUrl: string,
  quality: number = 0.7,
  maxWidth: number = 1000,
  maxHeight: number = 1000
): Promise<Blob> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const img = new Image();

      img.src = URL.createObjectURL(blob);
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        if (!ctx) {
          reject(new Error("Canvas context is not available"));
          return;
        }

        // Resize logic to maintain aspect ratio
        let { width, height } = img;
        if (width > maxWidth || height > maxHeight) {
          if (width / height > maxWidth / maxHeight) {
            width = maxWidth;
            height = Math.round((img.height * maxWidth) / img.width);
          } else {
            height = maxHeight;
            width = Math.round((img.width * maxHeight) / img.height);
          }
        }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);

        // Compress the image and resolve the blob
        canvas.toBlob(
          (compressedBlob) => {
            if (compressedBlob) resolve(compressedBlob);
            else reject(new Error("Image compression failed"));
          },
          "image/jpeg",
          quality
        );
      };

      img.onerror = (err) => reject(err);
    } catch (error) {
      reject(error);
    }
  });
}
