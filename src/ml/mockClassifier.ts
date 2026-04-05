import {
  CROP_LABELS,
  getDiseaseLabelsForCrop,
  getDiseaseModelKey,
} from './labels';
import { ClassificationResult } from './types';

const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

export const runMockInference = async (): Promise<ClassificationResult> => {
  await sleep(800);

  const cropLabelIndex = Math.floor(Math.random() * CROP_LABELS.length);
  const crop = CROP_LABELS[cropLabelIndex];
  const diseaseLabels = getDiseaseLabelsForCrop(crop);
  const diseaseLabelIndex = Math.floor(Math.random() * diseaseLabels.length);
  const disease = diseaseLabels[diseaseLabelIndex];

  const cropConfidence = 0.75 + Math.random() * 0.2;
  const diseaseConfidence = 0.65 + Math.random() * 0.3;

  return {
    crop,
    cropConfidence: Number(cropConfidence.toFixed(2)),
    disease,
    confidence: Number(diseaseConfidence.toFixed(2)),
    reliable: cropConfidence >= 0.7 && diseaseConfidence >= 0.7,
    labelIndex: diseaseLabelIndex,
    cropLabelIndex,
    diseaseLabelIndex,
    diseaseModel: getDiseaseModelKey(crop),
  };
};
