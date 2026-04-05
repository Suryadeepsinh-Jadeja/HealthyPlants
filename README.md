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

Release builds require a real signing configuration.

### 1. Create an Android upload keystore

Run this from the `android` folder:

```bash
cd android
keytool -genkeypair -v \
  -storetype PKCS12 \
  -keystore upload-keystore.jks \
  -alias upload \
  -keyalg RSA \
  -keysize 2048 \
  -validity 10000
```

That creates `android/upload-keystore.jks`.

### 2. Add local signing properties

Copy the example file and fill in your real values:

```bash
cd android
cp keystore.properties.example keystore.properties
```

Set these values in `android/keystore.properties`:

- `MYAPP_UPLOAD_STORE_FILE`
- `MYAPP_UPLOAD_STORE_PASSWORD`
- `MYAPP_UPLOAD_KEY_ALIAS`
- `MYAPP_UPLOAD_KEY_PASSWORD`

Example:

```properties
MYAPP_UPLOAD_STORE_FILE=upload-keystore.jks
MYAPP_UPLOAD_STORE_PASSWORD=your-store-password
MYAPP_UPLOAD_KEY_ALIAS=upload
MYAPP_UPLOAD_KEY_PASSWORD=your-key-password
```

`android/keystore.properties` and `*.jks` are ignored by git, so they will stay local.

You can also provide the same values through environment variables if you prefer CI-based signing.

### 3. Build a release APK

```bash
cd android
./gradlew assembleRelease
```

The APK will be generated here:

```bash
android/app/build/outputs/apk/release/app-release.apk
```

### 4. Build an Android App Bundle for Play Store

For Google Play, prefer building an Android App Bundle:

```bash
cd android
./gradlew bundleRelease
```

The AAB will be generated here:

```bash
android/app/build/outputs/bundle/release/app-release.aab
```

## Release Versioning

This project uses `package.json` as the marketing version source of truth.

- `package.json` version maps to Android `versionName`
- `package.json` version maps to iOS `MARKETING_VERSION`
- Android `versionCode` and iOS `CURRENT_PROJECT_VERSION` are derived from semantic version numbers

Sync native versions after changing `package.json`:

```bash
npm run version:sync
```

Current scheme:

- `1.0.0` -> build number `10000`
- `1.2.3` -> build number `10203`

Recommended release flow:

1. Update `package.json` version.
2. Run `npm run version:sync`.
3. Commit the version bump.
4. Build the release artifact.

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
- The Android package name is `com.healthyplants`.
- The app currently requests camera permission only.
