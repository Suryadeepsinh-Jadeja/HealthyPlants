export const CROP_LABELS = ['corn', 'cotton', 'potato', 'rice'] as const;

export const RICE_DISEASE_LABELS = [
  'bacterial_blight',
  'rice_blast',
  'brown_spot',
  'tungro',
] as const;

export const COTTON_DISEASE_LABELS = [
  'cotton_bacterial_blight',
  'curl_virus',
  'healthy',
  'herbicide_growth_damage',
  'leaf_hopper_jassids',
  'leaf_redding',
  'leaf_variegation',
] as const;

export const POTATO_DISEASE_LABELS = [
  'early_blight',
  'healthy',
  'late_blight',
] as const;

export const CORN_DISEASE_LABELS = [
  'corn_blight',
  'common_rust',
  'gray_leaf_spot',
  'healthy',
] as const;

export type CropLabel = (typeof CROP_LABELS)[number];
export type RiceDiseaseLabel = (typeof RICE_DISEASE_LABELS)[number];
export type CottonDiseaseLabel = (typeof COTTON_DISEASE_LABELS)[number];
export type PotatoDiseaseLabel = (typeof POTATO_DISEASE_LABELS)[number];
export type CornDiseaseLabel = (typeof CORN_DISEASE_LABELS)[number];
export type DiseaseLabel =
  | RiceDiseaseLabel
  | CottonDiseaseLabel
  | PotatoDiseaseLabel
  | CornDiseaseLabel;
export type DiseaseModelKey = 'riceDisease' | 'cottonDisease' | 'potatoDisease' | 'cornDisease';

const DISEASE_DISPLAY_NAMES: Record<DiseaseLabel, string> = {
  bacterial_blight: 'Bacterial Blight',
  rice_blast: 'Rice Blast',
  brown_spot: 'Brown Spot',
  tungro: 'Tungro',
  cotton_bacterial_blight: 'Cotton Bacterial Blight',
  curl_virus: 'Curl Virus',
  healthy: 'Healthy Leaf',
  herbicide_growth_damage: 'Herbicide Growth Damage',
  leaf_hopper_jassids: 'Leaf Hopper Jassids',
  leaf_redding: 'Leaf Redding',
  leaf_variegation: 'Leaf Variegation',
  early_blight: 'Early Blight',
  late_blight: 'Late Blight',
  corn_blight: 'Corn Blight',
  common_rust: 'Common Rust',
  gray_leaf_spot: 'Gray Leaf Spot',
};

const normalizeKey = (value: string): string => {
  return value.toLowerCase().trim().replace(/[\s-]+/g, '_');
};

export const getDiseaseModelKey = (crop: CropLabel): DiseaseModelKey => {
  if (crop === 'cotton') {
    return 'cottonDisease';
  }
  if (crop === 'potato') {
    return 'potatoDisease';
  }
  if (crop === 'corn') {
    return 'cornDisease';
  }
  return 'riceDisease';
};

export const getDiseaseLabelsForCrop = (
  crop: CropLabel,
): readonly DiseaseLabel[] => {
  if (crop === 'cotton') {
    return COTTON_DISEASE_LABELS;
  }
  if (crop === 'potato') {
    return POTATO_DISEASE_LABELS;
  }
  if (crop === 'corn') {
    return CORN_DISEASE_LABELS;
  }
  return RICE_DISEASE_LABELS;
};

export const getCropDisplayName = (crop: string): string => {
  const normalized = normalizeKey(crop);
  if (normalized === 'corn') {
    return 'Corn';
  }
  if (normalized === 'cotton') {
    return 'Cotton';
  }
  if (normalized === 'potato') {
    return 'Potato';
  }
  if (normalized === 'rice') {
    return 'Rice';
  }
  return 'Unknown Crop';
};

export const getDiseaseDisplayName = (disease: string): string => {
  const normalized = normalizeKey(disease) as DiseaseLabel;
  return DISEASE_DISPLAY_NAMES[normalized] ?? disease.replace(/_/g, ' ');
};
