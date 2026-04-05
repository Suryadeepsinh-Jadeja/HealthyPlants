import { Image } from 'react-native';
import { getDiseaseInfo } from '../data/diseases';
import {
  CORN_DISEASE_LABELS,
  COTTON_DISEASE_LABELS,
  CROP_LABELS,
  POTATO_DISEASE_LABELS,
  RICE_DISEASE_LABELS,
  getCropDisplayName,
  getDiseaseDisplayName,
  getDiseaseLabelsForCrop,
  getDiseaseModelKey,
} from '../ml/labels';
import { ClassificationResult } from '../ml/types';

export interface DemoScanCase {
  id: string;
  title: string;
  classification: ClassificationResult;
  imageUri: string;
}

const demoImageUri = Image.resolveAssetSource(require('../../assets/images/leaf_placeholder.png')).uri;

const buildCasesForCrop = (
  crop: (typeof CROP_LABELS)[number],
  baseConfidence: number,
): DemoScanCase[] => {
  return getDiseaseLabelsForCrop(crop).map((label, index) => ({
    id: `${crop}-${label}`,
    title: `${getCropDisplayName(crop)} - ${getDiseaseDisplayName(label)}`,
    classification: {
      crop,
      cropConfidence: Number((0.78 + index * 0.02).toFixed(2)),
      disease: label,
      confidence: Number((baseConfidence + index * 0.03).toFixed(2)),
      reliable: index < 4,
      labelIndex: index,
      cropLabelIndex: CROP_LABELS.indexOf(crop),
      diseaseLabelIndex: index,
      diseaseModel: getDiseaseModelKey(crop),
    },
    imageUri: demoImageUri,
  }));
};

export const DEMO_SCAN_CASES: DemoScanCase[] = [
  ...buildCasesForCrop('rice', 0.64),
  ...buildCasesForCrop('cotton', 0.61),
  ...buildCasesForCrop('potato', 0.68),
  ...buildCasesForCrop('corn', 0.66),
];

export const getRandomDemoScan = (): DemoScanCase => {
  const randomIndex = Math.floor(Math.random() * DEMO_SCAN_CASES.length);
  return DEMO_SCAN_CASES[randomIndex];
};

export const runAutomatedTests = async (): Promise<{ passed: number; failed: number }> => {
  console.log('=== STARTING LOCAL CONTRACT TEST SUITE ===');

  let passed = 0;
  let failed = 0;

  DEMO_SCAN_CASES.forEach(testCase => {
    const diseaseInfo = getDiseaseInfo(testCase.classification.disease);
    const hasKnownDisplayName = Boolean(
      diseaseInfo ||
      COTTON_DISEASE_LABELS.includes(testCase.classification.disease as (typeof COTTON_DISEASE_LABELS)[number]) ||
      RICE_DISEASE_LABELS.includes(testCase.classification.disease as (typeof RICE_DISEASE_LABELS)[number]) ||
      POTATO_DISEASE_LABELS.includes(testCase.classification.disease as (typeof POTATO_DISEASE_LABELS)[number]) ||
      CORN_DISEASE_LABELS.includes(testCase.classification.disease as (typeof CORN_DISEASE_LABELS)[number]),
    );

    if (
      hasKnownDisplayName &&
      testCase.classification.crop !== 'unknown' &&
      testCase.classification.cropConfidence > 0 &&
      testCase.classification.confidence > 0 &&
      testCase.classification.confidence <= 1
    ) {
      passed += 1;
      console.log(`[PASS] ${testCase.id} resolved to ${getDiseaseDisplayName(testCase.classification.disease)}`);
    } else {
      failed += 1;
      console.warn(`[FAIL] ${testCase.id} did not resolve correctly`);
    }
  });

  console.log('=== LOCAL CONTRACT TEST SUITE FINISHED ===');
  return { passed, failed };
};
