export const analyzeLighting = (tensor: Float32Array): 'too_dark' | 'too_bright' | 'ok' => {
  let sum = 0;
  for (let i = 0; i < tensor.length; i++) {
    sum += tensor[i];
  }

  let average = sum / tensor.length;

  // Support both 0..1 and 0..255 tensors.
  if (average > 1) {
    average /= 255;
  }

  if (average < 0.15) {
    return 'too_dark';
  } else if (average > 0.85) {
    return 'too_bright';
  }

  return 'ok';
};
