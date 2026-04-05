# HealthyPlants Privacy Policy

Effective date: April 5, 2026

HealthyPlants is an offline-first crop disease detection app. This Privacy Policy explains how the app handles photos, scan results, permissions, and local device storage.

## 1. What HealthyPlants does

HealthyPlants helps users identify crop type and possible crop diseases from leaf images. The app can analyze photos captured with the camera or selected from the device gallery.

## 2. Information the app uses

The app may use:

- crop photos selected by the user
- crop photos captured with the device camera
- diagnosis results and confidence scores
- scan timestamps
- local language preference
- local scan history records

## 3. How photos and scan results are processed

HealthyPlants is designed to process crop images on-device. The app performs image preprocessing and TensorFlow Lite inference locally on the user’s device during normal operation.

HealthyPlants does not require user account creation to function.

## 4. Data sharing

HealthyPlants does not normally upload scan images or diagnosis history to a backend server as part of its standard app flow.

If the user chooses the Share Result feature, the app generates a result image and passes it to the device’s system share sheet. Any further sharing is controlled by the destination app or service chosen by the user.

## 5. Local storage

HealthyPlants stores recent scan history locally on the device using encrypted app storage so users can review prior results. Language preference is also stored locally.

## 6. Permissions

HealthyPlants requests camera permission to let users capture crop images for analysis.

If the user chooses an image from the gallery, the app uses the system image picker flow to let the user select a photo.

## 7. User choices

Users can clear saved scan history from within the app. Users can also uninstall the app to remove app data stored on the device.

## 8. Policy updates

This Privacy Policy may be updated to reflect app changes, feature changes, or legal requirements. The latest version should be published at the repository URL below.

Repository:

https://github.com/Suryadeepsinh-Jadeja/HealthyPlants
