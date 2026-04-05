# HealthyPlants

HealthyPlants is an offline-first React Native mobile app for crop disease detection. It runs image preprocessing and TensorFlow Lite inference fully on-device, shows treatment guidance in multiple languages, and stores scan history locally.

## Features

- On-device crop and disease detection
- Supports `corn`, `cotton`, `potato`, and `rice`
- Camera scan and gallery upload flows
- Local encrypted scan history
- Multilingual UI and disease guidance
- Offline demo fallback if TFLite models fail to load

## How It Works

The app uses a hierarchical inference pipeline:

1. A crop classifier predicts the crop type.
2. The app routes the image to the matching crop-specific disease model.
3. The result screen shows the diagnosis, confidence, severity, symptoms, causes, and treatment guidance.
4. The scan is saved locally on the device.

Bundled model files:

- `assets/models/crop_classifier.tflite`
- `assets/models/rice_disease_model.tflite`
- `assets/models/cotton_disease_model.tflite`
- `assets/models/potato_disease_model.tflite`
- `assets/models/corn_disease_model.tflite`

If a required model cannot be loaded, the app falls back to local mock inference so the UI remains usable for testing and demos.

## Model Contract

The runtime currently expects TFLite models with this input format:

- Input shape: `[1, 224, 224, 3]`
- Input type: `float32`
- Layout: `NHWC`
- Preprocessing: ImageNet mean/std normalization

Supported labels:

- Crop labels: `corn`, `cotton`, `potato`, `rice`
- Rice disease labels: `bacterial_blight`, `rice_blast`, `brown_spot`, `tungro`
- Cotton disease labels: `cotton_bacterial_blight`, `curl_virus`, `healthy`, `herbicide_growth_damage`, `leaf_hopper_jassids`, `leaf_redding`, `leaf_variegation`
- Potato disease labels: `early_blight`, `healthy`, `late_blight`
- Corn disease labels: `corn_blight`, `common_rust`, `gray_leaf_spot`, `healthy`

## Tech Stack

- React Native 0.84
- TypeScript
- React Navigation
- Vision Camera
- TensorFlow Lite via `react-native-fast-tflite`
- i18next for translations
- Encrypted local storage for scan history

## Getting Started

### Prerequisites

- Node.js `22.11.0` or newer
- npm
- Android Studio and Android SDK
- Java 17
- Xcode and CocoaPods if you want to run iOS

### Install Dependencies

```bash
npm install
```

For iOS:

```bash
cd ios
pod install
cd ..
```

### Run in Development

Start Metro:

```bash
npm start
```

Run Android:

```bash
npm run android
```

Run iOS:

```bash
npm run ios
```

## Android Release Build

Release builds require a real signing configuration. Set these Gradle properties before building:

- `MYAPP_UPLOAD_STORE_FILE`
- `MYAPP_UPLOAD_STORE_PASSWORD`
- `MYAPP_UPLOAD_KEY_ALIAS`
- `MYAPP_UPLOAD_KEY_PASSWORD`

Then build a release artifact:

```bash
cd android
./gradlew assembleRelease
```

For Google Play, prefer building an Android App Bundle:

```bash
cd android
./gradlew bundleRelease
```

## Project Structure

```text
src/
  components/    Reusable UI components
  data/          Disease metadata and translations
  ml/            Model loading, labels, preprocessing, inference
  navigation/    Navigation setup
  screens/       Home, Camera, Result, History
  utils/         Local storage and helper utilities
assets/
  images/        App images
  models/        Bundled TFLite models
android/         Android native project
ios/             iOS native project
```

## Notes

- Android is configured to keep `.tflite` files uncompressed during builds.
- The Android package name is still `com.fasalrakshak`.
- The app currently requests camera permission only.
