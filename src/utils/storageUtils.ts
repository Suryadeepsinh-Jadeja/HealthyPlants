import AsyncStorage from '@react-native-async-storage/async-storage';
import EncryptedStorage from 'react-native-encrypted-storage';
import { ClassificationResult } from '../ml/types';

const HISTORY_STORAGE_KEY = '@scan_history_v1';
const MAX_HISTORY_ITEMS = 50;

export interface ScanHistoryItem {
  id: string;
  imageUri: string;
  classification: ClassificationResult;
  savedAt: string;
}

const isFiniteNumber = (value: unknown): value is number => {
  return typeof value === 'number' && Number.isFinite(value);
};

const normalizeClassification = (classification: any): ClassificationResult | null => {
  if (
    !classification ||
    typeof classification.disease !== 'string' ||
    !isFiniteNumber(classification.confidence) ||
    typeof classification.reliable !== 'boolean' ||
    !isFiniteNumber(classification.labelIndex)
  ) {
    return null;
  }

  const crop = classification.crop === 'cotton' || classification.crop === 'rice'
    ? classification.crop
    : classification.crop === 'corn' || classification.crop === 'potato'
      ? classification.crop
      : 'rice';
  const cropLabelIndex = isFiniteNumber(classification.cropLabelIndex)
    ? classification.cropLabelIndex
    : crop === 'corn'
      ? 0
      : crop === 'cotton'
        ? 1
        : crop === 'potato'
          ? 2
          : 3;
  const diseaseLabelIndex = isFiniteNumber(classification.diseaseLabelIndex)
    ? classification.diseaseLabelIndex
    : classification.labelIndex;

  return {
    crop,
    cropConfidence: isFiniteNumber(classification.cropConfidence) ? classification.cropConfidence : 1,
    disease: classification.disease,
    confidence: classification.confidence,
    reliable: classification.reliable,
    labelIndex: classification.labelIndex,
    cropLabelIndex,
    diseaseLabelIndex,
    diseaseModel:
      classification.diseaseModel === 'cottonDisease' ||
      classification.diseaseModel === 'riceDisease' ||
      classification.diseaseModel === 'potatoDisease' ||
      classification.diseaseModel === 'cornDisease'
        ? classification.diseaseModel
        : crop === 'cotton'
          ? 'cottonDisease'
          : crop === 'potato'
            ? 'potatoDisease'
            : crop === 'corn'
              ? 'cornDisease'
              : 'riceDisease',
  };
};

const isValidHistoryItem = (item: Partial<ScanHistoryItem>): item is ScanHistoryItem => {
  return Boolean(
    item.id &&
    item.imageUri &&
    item.savedAt &&
    normalizeClassification(item.classification),
  );
};

const normalizeHistory = (raw: string | null): ScanHistoryItem[] => {
  if (!raw) {
    return [];
  }

  const parsed = JSON.parse(raw);
  if (!Array.isArray(parsed)) {
    return [];
  }

  return parsed
    .filter(isValidHistoryItem)
    .map(item => ({
      ...item,
      classification: normalizeClassification(item.classification)!,
    }));
};

const loadEncryptedHistory = async (): Promise<ScanHistoryItem[]> => {
  const raw = await EncryptedStorage.getItem(HISTORY_STORAGE_KEY);
  return normalizeHistory(raw);
};

const migrateLegacyHistoryIfNeeded = async (): Promise<ScanHistoryItem[]> => {
  const encryptedHistory = await loadEncryptedHistory();
  if (encryptedHistory.length > 0) {
    return encryptedHistory;
  }

  const legacyRaw = await AsyncStorage.getItem(HISTORY_STORAGE_KEY);
  const legacyHistory = normalizeHistory(legacyRaw);

  if (legacyHistory.length > 0) {
    await EncryptedStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(legacyHistory));
  }

  if (legacyRaw !== null) {
    await AsyncStorage.removeItem(HISTORY_STORAGE_KEY);
  }

  return legacyHistory;
};

export const getScanHistory = async (): Promise<ScanHistoryItem[]> => {
  try {
    return await migrateLegacyHistoryIfNeeded();
  } catch (error) {
    console.warn('Failed to read scan history.', error);
    return [];
  }
};

export const getRecentScanHistory = async (limit = 3): Promise<ScanHistoryItem[]> => {
  const history = await getScanHistory();
  return history.slice(0, limit);
};

export const saveScanResult = async (
  classification: ClassificationResult,
  imageUri: string,
): Promise<ScanHistoryItem> => {
  const entry: ScanHistoryItem = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    imageUri,
    classification,
    savedAt: new Date().toISOString(),
  };

  const history = await getScanHistory();
  const dedupedHistory = history.filter(item => {
    const sameImage = item.imageUri === imageUri;
    const sameCrop = item.classification.crop === classification.crop;
    const sameDisease = item.classification.disease === classification.disease;
    const savedRecently = Date.now() - new Date(item.savedAt).getTime() < 5000;
    return !(sameImage && sameCrop && sameDisease && savedRecently);
  });

  const nextHistory = [entry, ...dedupedHistory].slice(0, MAX_HISTORY_ITEMS);
  await EncryptedStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(nextHistory));
  await AsyncStorage.removeItem(HISTORY_STORAGE_KEY);
  return entry;
};

export const clearScanHistory = async (): Promise<void> => {
  await Promise.all([
    EncryptedStorage.removeItem(HISTORY_STORAGE_KEY),
    AsyncStorage.removeItem(HISTORY_STORAGE_KEY),
  ]);
};
