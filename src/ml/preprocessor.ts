import RNFS from 'react-native-fs';
import ImageResizer from '@bam.tech/react-native-image-resizer';
import * as jpeg from 'jpeg-js';
import { Buffer } from 'buffer';

const INPUT_SIZE = 224;
const CHANNEL_MEAN = [0.485, 0.456, 0.406] as const;
const CHANNEL_STD = [0.229, 0.224, 0.225] as const;

export const preprocessImage = async (uri: string): Promise<Float32Array> => {
  try {
    // 1. Resize image to 224x224 pixels using the resizer module
    const resizedImage = await ImageResizer.createResizedImage(
      uri,
      INPUT_SIZE,
      INPUT_SIZE,
      'JPEG',
      100,
      0,
      undefined,
      false,
      { mode: 'stretch' }
    );

    // 2. Read the resized image file as Base64 string
    const base64Data = await RNFS.readFile(resizedImage.path, 'base64');
    
    // 3. Convert Base64 into a raw Buffer
    const rawData = Buffer.from(base64Data, 'base64');

    // 4. Decode JPEG to get raw pixel values
    // rawImageData.data is a Uint8Array containing RGBA format pixels (4 channels)
    const rawImageData = jpeg.decode(rawData, { useTArray: true });

    if (rawImageData.width !== INPUT_SIZE || rawImageData.height !== INPUT_SIZE) {
      throw new Error(
        `Unexpected resized image dimensions: ${rawImageData.width}x${rawImageData.height}. Expected ${INPUT_SIZE}x${INPUT_SIZE}.`
      );
    }

    // 5. Normalize pixels with the ImageNet mean/std contract used by the PyTorch model.
    const numPixels = INPUT_SIZE * INPUT_SIZE;
    const float32Data = new Float32Array(numPixels * 3);

    let offset = 0;
    for (let i = 0; i < numPixels; i++) {
        // Extract RGB channels, ignoring Alpha
        const r = rawImageData.data[i * 4];
        const g = rawImageData.data[i * 4 + 1];
        const b = rawImageData.data[i * 4 + 2];

        float32Data[offset++] = (r / 255 - CHANNEL_MEAN[0]) / CHANNEL_STD[0];
        float32Data[offset++] = (g / 255 - CHANNEL_MEAN[1]) / CHANNEL_STD[1];
        float32Data[offset++] = (b / 255 - CHANNEL_MEAN[2]) / CHANNEL_STD[2];
    }

    for (let i = 0; i < float32Data.length; i++) {
      if (!Number.isFinite(float32Data[i])) {
        throw new Error(`Preprocessed tensor contains a non-finite value at index ${i}.`);
      }
    }

    // Clean up temporary resized image file asynchronously
    RNFS.unlink(resizedImage.path).catch(() => {});

    return float32Data;
  } catch (error) {
    console.error('Error preprocessing image:', error);
    throw error;
  }
};
