import { getInferenceMode, getModel, isModelReady, ModelKey } from './modelLoader';
import {
  CROP_LABELS,
  CropLabel,
  DiseaseLabel,
  getDiseaseLabelsForCrop,
  getDiseaseModelKey,
} from './labels';
import { runMockInference } from './mockClassifier';
import { ClassificationResult } from './types';

export type { ClassificationResult } from './types';
export {
  CROP_LABELS,
  getDiseaseLabelsForCrop,
  getDiseaseModelKey,
  getCropDisplayName,
  getDiseaseDisplayName,
} from './labels';

type SupportedPredictions =
  | Float32Array
  | Float64Array
  | Int8Array
  | Int16Array
  | Int32Array
  | Uint8Array
  | Uint16Array
  | Uint32Array
  | number[];

const isTypedPredictionArray = (value: unknown): value is Exclude<SupportedPredictions, number[]> => {
  return ArrayBuffer.isView(value) && 'length' in value;
};

const isNumberArray = (value: unknown): value is number[] => {
  return Array.isArray(value) && value.every(item => typeof item === 'number' && Number.isFinite(item));
};

const describeTensorValue = (value: unknown): string => {
  if (Array.isArray(value)) {
    return `Array(len=${value.length}, first=${describeTensorValue(value[0])})`;
  }

  if (ArrayBuffer.isView(value)) {
    const constructorName = value.constructor?.name ?? 'TypedArray';
    const typedValue = value as unknown as { length?: number };
    return `${constructorName}(len=${typedValue.length ?? 'unknown'})`;
  }

  return typeof value;
};

const getPredictionTensor = (rawOutput: unknown): SupportedPredictions => {
  if (isTypedPredictionArray(rawOutput) || isNumberArray(rawOutput)) {
    return rawOutput;
  }

  if (Array.isArray(rawOutput)) {
    if (rawOutput.length === 1) {
      return getPredictionTensor(rawOutput[0]);
    }

    for (const item of rawOutput) {
      try {
        return getPredictionTensor(item);
      } catch {
        continue;
      }
    }
  }

  throw new Error(`Received unsupported output tensor format from model: ${describeTensorValue(rawOutput)}.`);
};

const softmax = (scores: number[]): number[] => {
  const maxScore = Math.max(...scores);
  const exps = scores.map(score => Math.exp(score - maxScore));
  const sum = exps.reduce((total, value) => total + value, 0);
  return exps.map(value => value / sum);
};

const normalizeScores = (predictions: SupportedPredictions): number[] => {
  const rawScores = Array.from(predictions, value => Number(value)).filter(Number.isFinite);
  if (rawScores.length === 0) {
    return [];
  }

  const sum = rawScores.reduce((total, value) => total + value, 0);
  const looksLikeProbabilities =
    rawScores.every(value => value >= 0 && value <= 1) &&
    Math.abs(sum - 1) < 0.05;

  return looksLikeProbabilities ? rawScores : softmax(rawScores);
};

const runPrediction = <TLabel extends string>(
  modelKey: ModelKey,
  tensor: Float32Array,
  labels: readonly TLabel[],
): { label: TLabel; confidence: number; labelIndex: number } => {
  const model = getModel(modelKey);
  if (!model) {
    throw new Error(`Model "${modelKey}" is null despite being marked ready.`);
  }

  const rawOutputs = model.runSync([tensor]);
  console.log(`TFLite raw output summary (${modelKey})`, {
    outputCount: rawOutputs.length,
    outputs: rawOutputs.map(describeTensorValue),
  });

  const predictions = getPredictionTensor(
    Array.isArray(rawOutputs) && rawOutputs.length === 1 ? rawOutputs[0] : rawOutputs,
  );

  if (!predictions || predictions.length === 0) {
    throw new Error(`Received empty output from model "${modelKey}".`);
  }

  const normalizedScores = normalizeScores(predictions);
  if (normalizedScores.length === 0) {
    throw new Error(
      `Could not determine a valid top prediction from model output. Tensor=${describeTensorValue(predictions)}`,
    );
  }

  let maxConfidence = -1;
  let maxIndex = -1;

  for (let i = 0; i < normalizedScores.length; i++) {
    const score = normalizedScores[i];
    if (score > maxConfidence) {
      maxConfidence = score;
      maxIndex = i;
    }
  }

  const label = labels[maxIndex];
  if (maxIndex < 0 || !label) {
    throw new Error(
      `Could not determine a valid top prediction from model output. Tensor=${describeTensorValue(predictions)}`,
    );
  }

  return {
    label,
    confidence: Math.max(0, Math.min(1, maxConfidence)),
    labelIndex: maxIndex,
  };
};

export const classifyImage = async (tensor: Float32Array): Promise<ClassificationResult> => {
  if (getInferenceMode() === 'mock') {
    return await runMockInference();
  }

  if (!isModelReady() || getInferenceMode() !== 'tflite') {
    throw new Error('Model is not ready for inference');
  }

  try {
    const cropPrediction = runPrediction('crop', tensor, CROP_LABELS);
    const crop = cropPrediction.label as CropLabel;
    const diseaseModel = getDiseaseModelKey(crop);
    const diseaseLabels = getDiseaseLabelsForCrop(crop) as readonly DiseaseLabel[];
    const diseasePrediction = runPrediction(diseaseModel, tensor, diseaseLabels);

    const reliable = cropPrediction.confidence >= 0.7 && diseasePrediction.confidence >= 0.6;

    return {
      crop,
      cropConfidence: cropPrediction.confidence,
      disease: diseasePrediction.label,
      confidence: diseasePrediction.confidence,
      reliable,
      labelIndex: diseasePrediction.labelIndex,
      cropLabelIndex: cropPrediction.labelIndex,
      diseaseLabelIndex: diseasePrediction.labelIndex,
      diseaseModel,
    };
  } catch (error) {
    console.error('Classification inference error:', error);
    throw error;
  }
};
