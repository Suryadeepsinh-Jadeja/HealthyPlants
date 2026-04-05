import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Linking, Modal, Button } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Camera, useCameraDevice, useCameraPermission } from 'react-native-vision-camera';
import { launchImageLibrary } from 'react-native-image-picker';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { RootStackParamList } from '../navigation/AppNavigator';
import { preprocessImage } from '../ml/preprocessor';
import { classifyImage } from '../ml/classifier';
import { getInferenceMode } from '../ml/modelLoader';
import { theme } from '../theme';
import { clearScanHistory } from '../utils/storageUtils';
import LoadingOverlay from '../components/LoadingOverlay';
import { getRandomDemoScan, runAutomatedTests } from '../utils/testUtils';
import { BackIcon, DevToolsIcon, FlashlightIcon, GalleryIcon } from '../components/AppIcons';

type CameraScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Camera'>;
type CameraScreenRouteProp = RouteProp<RootStackParamList, 'Camera'>;
const BUTTON_HIT_SLOP = { top: 10, right: 10, bottom: 10, left: 10 };
const DEV_MENU_ENABLED = __DEV__;

const CameraScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<CameraScreenNavigationProp>();
  const route = useRoute<CameraScreenRouteProp>();
  const launchedViaGalleryShortcut = route?.params?.openGallery === true;
  const device = useCameraDevice('back');
  const { hasPermission, requestPermission } = useCameraPermission();
  const cameraRef = useRef<Camera>(null);

  const [torchOn, setTorchOn] = useState(false);
  const [autoMode, setAutoMode] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [flashOnCapture, setFlashOnCapture] = useState(false);
  const [devMenuVisible, setDevMenuVisible] = useState(false);
  const [galleryBootstrapPending, setGalleryBootstrapPending] = useState(launchedViaGalleryShortcut);

  const shakeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tapCount = useRef(0);

  useEffect(() => {
    if (!hasPermission) requestPermission();
  }, [hasPermission, requestPermission]);

  const processImageUri = useCallback(async (uri: string) => {
    if (analyzing) return;
    setAnalyzing(true);
    setDevMenuVisible(false);
    try {
      const tensor = await preprocessImage(uri);
      const result = await classifyImage(tensor);

      setAnalyzing(false);
      if (autoMode) setAutoMode(false);

      navigation.navigate('Result', {
        classification: result,
        imageUri: uri,
        saveToHistory: true,
      });
    } catch (error) {
      console.error(error);
      Alert.alert(t('error.title'), t('error.analysisFailed'));
      setAnalyzing(false);
    }
  }, [analyzing, autoMode, navigation, t]);

  const handleCapture = useCallback(async () => {
    if (!cameraRef.current || analyzing) return;
    setFlashOnCapture(true);
    setTimeout(() => setFlashOnCapture(false), 100);
    try {
      const photo = await cameraRef.current.takePhoto({ flash: torchOn ? 'on' : 'off' });
      await processImageUri(`file://${photo.path}`);
    } catch (e) {
      console.error('Failed to take photo', e);
    }
  }, [analyzing, processImageUri, torchOn]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (autoMode && device && hasPermission && !analyzing) {
      interval = setInterval(() => { handleCapture(); }, 2000);
    }
    return () => { if (interval) clearInterval(interval); };
  }, [autoMode, analyzing, device, handleCapture, hasPermission]);

  const openGallery = useCallback(async (fromShortcut = false) => {
    if (autoMode) setAutoMode(false);
    setGalleryBootstrapPending(fromShortcut);
    const response = await launchImageLibrary({ mediaType: 'photo', quality: 1 });
    if (response.didCancel || !response.assets || response.assets.length === 0) {
      setGalleryBootstrapPending(false);
      if (fromShortcut) {
        navigation.goBack();
      }
      return;
    }
    const asset = response.assets[0];
    setGalleryBootstrapPending(false);
    if (asset.uri) await processImageUri(asset.uri);
  }, [autoMode, navigation, processImageUri]);

  const handleSecretTap = () => {
    if (!DEV_MENU_ENABLED) {
      return;
    }

    tapCount.current += 1;
    if (tapCount.current >= 5) { setDevMenuVisible(true); tapCount.current = 0; }
    if (shakeTimeout.current) clearTimeout(shakeTimeout.current);
    shakeTimeout.current = setTimeout(() => { tapCount.current = 0; }, 2000);
  };

  // If navigated with { openGallery: true }, open the gallery immediately once
  const openedFromGalleryRef = useRef(false);
  useEffect(() => {
    try {
      const shouldOpen = launchedViaGalleryShortcut;
      if (shouldOpen && !openedFromGalleryRef.current) {
        openedFromGalleryRef.current = true;
        openGallery(true);
      }
    } catch {
      // ignore if route not defined or no params
    }
  }, [launchedViaGalleryShortcut, openGallery]);

  const renderDevMenu = () => {
    if (!DEV_MENU_ENABLED) {
      return null;
    }

    return (
      <Modal visible={devMenuVisible} animationType="slide" transparent={true}>
        <View style={styles.devMenuOverlay}>
          <View style={styles.devMenuContainer}>
            <View style={styles.devMenuHeader}>
              <DevToolsIcon />
              <Text style={styles.devMenuTitle}>{t('dev.title')}</Text>
            </View>
            <Text style={styles.devMenuText}>{t('dev.version', { value: '1.0.0' })}</Text>
            <Text style={styles.devMenuText}>{t('dev.inferenceMode', { value: getInferenceMode().toUpperCase() })}</Text>
            <TouchableOpacity
              style={styles.devButton}
              onPress={async () => {
                const summary = await runAutomatedTests();
                Alert.alert(
                  t('dev.runTests'),
                  t('dev.testsResult', { passed: summary.passed, failed: summary.failed }),
                );
              }}
            >
              <Text style={styles.devButtonText}>{t('dev.runTests')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.devButton}
              onPress={() => {
                const demoScan = getRandomDemoScan();
                setDevMenuVisible(false);
                navigation.navigate('Result', {
                  classification: demoScan.classification,
                  imageUri: demoScan.imageUri,
                  saveToHistory: false,
                });
              }}
            >
              <Text style={styles.devButtonText}>{t('dev.openDemo')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.devButton}
              onPress={async () => {
                await clearScanHistory();
                Alert.alert(t('dev.clearHistoryDoneTitle'), t('dev.clearHistoryDoneBody'));
              }}
            >
              <Text style={styles.devButtonText}>{t('history.clearAction')}</Text>
            </TouchableOpacity>
            <Button title={t('dev.closeMenu')} color="red" onPress={() => setDevMenuVisible(false)} />
          </View>
        </View>
      </Modal>
    );
  };

  if (!hasPermission) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>{t('error.cameraPermission')}</Text>
        <TouchableOpacity style={styles.permissionButton} onPress={() => Linking.openSettings()}>
          <Text style={styles.permissionButtonText}>{t('error.openSettings')}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!device) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.loadingText}>{t('camera.initializing')}</Text>
      </View>
    );
  }

  if (galleryBootstrapPending && launchedViaGalleryShortcut) {
    return (
      <View style={styles.centerContainer}>
        <LoadingOverlay message={t('camera.openingGallery')} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Camera feed */}
      <Camera
        ref={cameraRef}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={!analyzing}
        photo={true}
        torch={torchOn ? 'on' : 'off'}
      />

      {flashOnCapture && <View style={styles.flashOverlay} />}

      {/* ── TOP BAR ─────────────────────────────────────────────────────────
          FIX: torch icon + AUTO pill live here in ONE dedicated row.
          Previously topControls was at top:90 and instructionText was
          position:absolute top:'15%' — they landed on the same pixel.
          Now they are in separate, non-overlapping zones.
      ──────────────────────────────────────────────────────────────────── */}
      <View style={styles.topBar}>
        {/* Back button */}
        <TouchableOpacity
          style={styles.topBarButton}
          onPress={() => navigation.goBack()}
          hitSlop={BUTTON_HIT_SLOP}
        >
          <BackIcon />
        </TouchableOpacity>

        {/* Title */}
        <Text style={styles.topBarTitle}>{t('camera.title')}</Text>

        {/* Torch + Auto — right side, never overlapping */}
        <View style={styles.topBarRight}>
          <TouchableOpacity
            style={styles.topBarButton}
            onPress={() => setTorchOn(!torchOn)}
            hitSlop={BUTTON_HIT_SLOP}
          >
            <FlashlightIcon color={torchOn ? '#C9F27B' : '#FFFFFF'} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.autoModePill, autoMode && styles.autoModeActive]}
            onPress={() => setAutoMode(!autoMode)}
            hitSlop={BUTTON_HIT_SLOP}
          >
            <Text style={[styles.autoModeText, autoMode && styles.autoModeTextActive]}>
              {autoMode ? t('camera.autoOn') : t('camera.autoOff')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* ── SCAN GUIDE — centred in remaining space between top/bottom bars ──
          FIX: guideBox is now in normal flow inside a flex container,
          not position:absolute. Instruction text sits BELOW the box,
          never floating over controls.
      ──────────────────────────────────────────────────────────────────── */}
      <View style={styles.scanZone} pointerEvents="none">
        <View style={styles.guideBox} />
        <Text style={styles.instructionText}>{t('camera.instruction')}</Text>
      </View>

      {/* ── BOTTOM BAR ──────────────────────────────────────────────────────
          Gallery | Shutter | (spacer for symmetry)
          All controls in one dedicated row — no overlap possible.
      ──────────────────────────────────────────────────────────────────── */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.sideButton}
          onPress={() => openGallery()}
          hitSlop={BUTTON_HIT_SLOP}
        >
          <View style={styles.sideIconShell}>
            <GalleryIcon size={26} />
          </View>
          <Text style={styles.sideButtonLabel}>{t('camera.galleryShort')}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.captureButton, (autoMode || analyzing) && styles.captureButtonDisabled]}
          onPress={handleCapture}
          disabled={autoMode || analyzing}
          hitSlop={BUTTON_HIT_SLOP}
        >
          <View style={styles.captureButtonInner} />
        </TouchableOpacity>

        {/* Spacer to keep shutter centred */}
        <View style={styles.sideButton} />
      </View>

      {/* Secret dev tap zone */}
      {DEV_MENU_ENABLED ? (
        <TouchableOpacity style={styles.secretButton} onPress={handleSecretTap} activeOpacity={1} />
      ) : null}

      {analyzing && <LoadingOverlay message={t('camera.analyzing')} showGuide={true} />}
      {renderDevMenu()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'black' },

  // Flash
  flashOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'white', zIndex: 10 },

  // ── Top bar ─────────────────────────────────────────────────────────────────
  // FIX: single dedicated row — torch and AUTO pill can never reach instruction text
  topBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingTop: 48,          // safe area
    paddingBottom: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0,0,0,0.50)',
    zIndex: 5,
  },
  topBarButton: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topBarTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  topBarRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  autoModePill: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: theme.borderRadius.large,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.35)',
  },
  autoModeActive: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  autoModeText: { color: '#ccc', fontWeight: 'bold', fontSize: 12 },
  autoModeTextActive: { color: 'white' },

  // ── Scan zone ────────────────────────────────────────────────────────────────
  // FIX: normal flex column — guide box centred, instruction text below it.
  // No position:absolute on children means nothing can float into topBar.
  scanZone: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  guideBox: {
    width: 250,
    height: 250,
    borderWidth: 3,
    borderColor: theme.colors.primary,
    borderStyle: 'dashed',
    borderRadius: theme.borderRadius.large,
    backgroundColor: 'rgba(45, 125, 50, 0.08)',
  },
  // FIX: instruction text is now below the guide box (marginTop), not
  // position:absolute top:'15%' which collided with topControls at top:90.
  instructionText: {
    marginTop: 18,
    color: 'rgba(255,255,255,0.92)',
    fontSize: theme.typography.md,
    fontWeight: '600',
    backgroundColor: 'rgba(0,0,0,0.55)',
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: theme.borderRadius.small,
    overflow: 'hidden',
    textAlign: 'center',
  },

  // ── Bottom bar ───────────────────────────────────────────────────────────────
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: 40,
    paddingTop: 20,
    paddingHorizontal: 32,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.50)',
    zIndex: 5,
  },
  sideButton: {
    width: 64,
    alignItems: 'center',
    gap: 4,
  },
  sideIconShell: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: 'rgba(255,255,255,0.14)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sideButtonLabel: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 11,
    fontWeight: '500',
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButtonDisabled: { opacity: 0.45 },
  captureButtonInner: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'white',
  },

  // ── Dev menu ─────────────────────────────────────────────────────────────────
  secretButton: { position: 'absolute', top: 34, right: 10, width: 26, height: 26, zIndex: 100, opacity: 0.02 },
  devMenuOverlay: { flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.8)', padding: 20 },
  devMenuContainer: { backgroundColor: 'white', padding: 20, borderRadius: 10 },
  devMenuHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  devMenuTitle: { fontSize: 22, fontWeight: 'bold', color: 'black' },
  devMenuText: { fontSize: 14, color: 'gray', marginBottom: 5 },
  devButton: { backgroundColor: '#333', padding: 15, borderRadius: 8, marginVertical: 8 },
  devButtonText: { color: 'white', fontWeight: 'bold', textAlign: 'center' },

  // ── Permission / loading states ───────────────────────────────────────────────
  permissionContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: theme.colors.background },
  permissionText: { fontSize: theme.typography.lg, color: theme.colors.danger, textAlign: 'center', marginBottom: 20 },
  permissionButton: { backgroundColor: theme.colors.primary, padding: 15, borderRadius: theme.borderRadius.medium, ...theme.shadows.light },
  permissionButtonText: { color: theme.colors.cardBackground, fontWeight: 'bold' },
  centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.colors.background },
  loadingText: { marginTop: 10, color: theme.colors.textSecondary },
});

export default CameraScreen;
