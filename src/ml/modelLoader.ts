import { loadTensorflowModel, TensorflowModel } from 'react-native-fast-tflite';

export type ModelKey = 'crop' | 'riceDisease' | 'cottonDisease' | 'potatoDisease' | 'cornDisease';

type ModelAssetSource = number;

const MODEL_ASSETS: Record<ModelKey, ModelAssetSource> = {
  crop: require('../../assets/models/crop_classifier.tflite'),
  riceDisease: require('../../assets/models/rice_disease_model.tflite'),
  cottonDisease: require('../../assets/models/cotton_disease_model.tflite'),
  potatoDisease: require('../../assets/models/potato_disease_model.tflite'),
  cornDisease: require('../../assets/models/corn_disease_model.tflite'),
};

const modelInstances: Partial<Record<ModelKey, TensorflowModel>> = {};
let ready = false;
let loadPromise: Promise<void> | null = null;
let inferenceMode: 'loading' | 'tflite' | 'mock' = 'loading';
let modelLoadError: string | null = null;

export const loadModel = async (): Promise<void> => {
  if (ready) {
    return;
  }

  if (loadPromise) {
    return loadPromise;
  }

  loadPromise = (async () => {
    try {
      for (const [key, asset] of Object.entries(MODEL_ASSETS) as [ModelKey, ModelAssetSource][]) {
        modelInstances[key] = await loadTensorflowModel(asset);
        console.log(`TFLite model loaded successfully: ${key}`, {
          inputs: modelInstances[key]?.inputs,
          outputs: modelInstances[key]?.outputs,
        });
      }

      ready = true;
      inferenceMode = 'tflite';
      modelLoadError = null;
    } catch (error) {
      console.warn(
        'Falling back to local demo inference because one or more TFLite models could not be loaded.',
        error,
      );
      for (const key of Object.keys(modelInstances) as ModelKey[]) {
        delete modelInstances[key];
      }
      ready = true;
      inferenceMode = 'mock';
      modelLoadError = error instanceof Error ? error.message : 'Unknown model load error';
    } finally {
      loadPromise = null;
    }
  })();

  return loadPromise;
};

export const getModel = (key: ModelKey): TensorflowModel | null => {
  return modelInstances[key] ?? null;
};

export const isModelReady = (): boolean => {
  return ready;
};

export const getInferenceMode = (): 'loading' | 'tflite' | 'mock' => {
  return inferenceMode;
};

export const getModelLoadError = (): string | null => {
  return modelLoadError;
};

export const getModelStatus = () => ({
  ready,
  mode: inferenceMode,
  error: modelLoadError,
  loadedModels: Object.keys(modelInstances),
});
