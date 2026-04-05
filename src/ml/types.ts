import { CropLabel, DiseaseModelKey } from './labels';

export interface ClassificationResult {
  crop: CropLabel | 'unknown';
  cropConfidence: number;
  disease: string;
  confidence: number;
  reliable: boolean;
  labelIndex: number;
  cropLabelIndex: number;
  diseaseLabelIndex: number;
  diseaseModel: DiseaseModelKey | 'unknown';
}
