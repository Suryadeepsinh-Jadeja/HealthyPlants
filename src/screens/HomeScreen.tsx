import React, { useState, useEffect, useCallback } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useTranslation } from 'react-i18next';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { launchImageLibrary } from 'react-native-image-picker';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RootStackParamList } from '../navigation/AppNavigator';
import DiseaseCard from '../components/DiseaseCard';
import { CameraIcon, GalleryIcon } from '../components/AppIcons';
import LoadingOverlay from '../components/LoadingOverlay';
import { preprocessImage } from '../ml/preprocessor';
import { classifyImage } from '../ml/classifier';
import { getInferenceMode, getModelStatus, isModelReady } from '../ml/modelLoader';
import { theme } from '../theme';
import { getRecentScanHistory, ScanHistoryItem } from '../utils/storageUtils';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const SUPPORTED_CROPS = ['rice', 'cotton', 'potato', 'corn'] as const;
const APP_LOGO = require('../../logo_transparent_white.png');
const BUTTON_HIT_SLOP = { top: 10, right: 10, bottom: 10, left: 10 };

const HomeScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [modelReady, setModelReady] = useState(isModelReady());
  const [modelMode, setModelMode] = useState(getInferenceMode());
  const [recentScans, setRecentScans] = useState<ScanHistoryItem[]>([]);
  const [galleryProcessing, setGalleryProcessing] = useState(false);
  const isFocused = useIsFocused();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    const modelInterval = setInterval(() => {
      const status = getModelStatus();
      setModelReady(status.ready);
      setModelMode(status.mode);
    }, 1000);

    return () => {
      clearInterval(modelInterval);
    };
  }, []);

  useEffect(() => {
    if (!isFocused) {
      return;
    }

    let active = true;

    const loadRecentScans = async () => {
      const scans = await getRecentScanHistory(3);
      if (active) {
        setRecentScans(scans);
      }
    };

    loadRecentScans();

    return () => {
      active = false;
    };
  }, [isFocused]);

  const modelStatusText =
    modelMode === 'tflite'
      ? t('home.modelReady')
      : modelReady
        ? t('home.demoMode')
        : t('home.modelLoading');

  const actionDisabled = !modelReady;

  const handleGalleryUpload = useCallback(async () => {
    if (!modelReady || galleryProcessing) {
      return;
    }

    const response = await launchImageLibrary({ mediaType: 'photo', quality: 1 });
    if (response.didCancel || !response.assets || response.assets.length === 0) {
      return;
    }

    const asset = response.assets[0];
    if (!asset.uri) {
      Alert.alert(t('error.title'), t('error.openSelectedImage'));
      return;
    }

    setGalleryProcessing(true);
    try {
      const tensor = await preprocessImage(asset.uri);
      const classification = await classifyImage(tensor);
      setGalleryProcessing(false);
      navigation.navigate('Result', {
        classification,
        imageUri: asset.uri,
        saveToHistory: true,
      });
    } catch (error) {
      console.error(error);
      setGalleryProcessing(false);
      Alert.alert(t('error.title'), t('error.analysisFailed'));
    }
  }, [galleryProcessing, modelReady, navigation, t]);

  return (
    <View style={styles.screen}>
      <LinearGradient
        colors={['#F6F2E7', '#EEF5E3', '#E7F0D0']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
        pointerEvents="none"
      />
      <View style={styles.backgroundOrbOne} pointerEvents="none" />
      <View style={styles.backgroundOrbTwo} pointerEvents="none" />
      <View style={styles.backgroundOrbThree} pointerEvents="none" />

      <ScrollView
        style={styles.container}
        contentContainerStyle={[
          styles.contentContainer,
          { paddingBottom: insets.bottom + 8 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <LinearGradient
          colors={['#1E5631', '#2E7D32', '#4D8C44']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.heroCard}
        >
          <View style={styles.heroGlow} pointerEvents="none" />

          <View style={styles.heroTopRow}>
            <View style={styles.brandBadge}>
              <Image source={APP_LOGO} style={styles.brandLogo} resizeMode="contain" />
            </View>

            <View style={styles.cropChipRow}>
              {SUPPORTED_CROPS.map(crop => (
                <View key={crop} style={styles.cropChip}>
                  <Text style={styles.cropChipText}>{t(`crops.${crop}`)}</Text>
                </View>
              ))}
            </View>
          </View>

          <Text style={styles.title}>{t('app.name')}</Text>
          <Text style={styles.tagline}>{t('app.tagline')}</Text>

          <View style={styles.statusPill}>
            <View
              style={[
                styles.statusIndicator,
                modelMode === 'tflite' ? styles.statusIndicatorReady : styles.statusIndicatorDemo,
              ]}
            />
            <Text style={styles.statusText}>{modelStatusText}</Text>
          </View>
        </LinearGradient>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.actionButton, actionDisabled && styles.buttonDisabled]}
            onPress={() => modelReady && navigation.navigate('Camera')}
            activeOpacity={actionDisabled ? 1 : 0.86}
            hitSlop={BUTTON_HIT_SLOP}
          >
            <LinearGradient
              colors={['#1B5E20', '#2F7D32']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.actionButtonGradient}
            >
              <View style={styles.actionIconBadge}>
                <CameraIcon size={28} color="#FFFFFF" />
              </View>
              <View style={styles.actionCopy}>
                <Text style={styles.actionEyebrow}>{t('home.cameraEyebrow')}</Text>
                <Text style={styles.actionButtonText}>{t('home.scanButton')}</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, actionDisabled && styles.buttonDisabled]}
            onPress={handleGalleryUpload}
            activeOpacity={actionDisabled ? 1 : 0.86}
            hitSlop={BUTTON_HIT_SLOP}
          >
            <LinearGradient
              colors={['#A65A00', '#F59E0B']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.actionButtonGradient}
            >
              <View style={styles.actionIconBadgeWarm}>
                <GalleryIcon size={28} color="#FFFFFF" />
              </View>
              <View style={styles.actionCopy}>
                <Text style={styles.actionEyebrow}>{t('home.galleryEyebrow')}</Text>
                <Text style={styles.actionButtonText}>{t('home.galleryButton')}</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.historyButton}
          onPress={() => navigation.navigate('History')}
          hitSlop={BUTTON_HIT_SLOP}
        >
          <Text style={styles.historyButtonText}>{t('home.historyButton')}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.privacyButton}
          onPress={() => navigation.navigate('Privacy')}
          hitSlop={BUTTON_HIT_SLOP}
        >
          <Text style={styles.privacyButtonText}>
            {t('privacy.openScreen', { defaultValue: 'Privacy Policy' })}
          </Text>
        </TouchableOpacity>

        <LinearGradient
          colors={['#FFFFFF', '#F8FBF2']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.tipContainer}
        >
          <Text style={styles.tipLabel}>{t('home.tipLabel')}</Text>
          <Text style={styles.tipText}>{t('home.tip')}</Text>
        </LinearGradient>

        <View style={styles.recentScansSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.recentScansTitle}>{t('home.recentScans')}</Text>
            <View style={styles.sectionAccent} />
          </View>

          {recentScans.length === 0 ? (
            <LinearGradient
              colors={['#FFFFFF', '#F8FBF2']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.emptyStateCard}
            >
              <Text style={styles.emptyStateText}>{t('home.noScansYet')}</Text>
            </LinearGradient>
          ) : (
            recentScans.map(item => (
              <View key={item.id} style={styles.recentCard}>
                <DiseaseCard
                  item={item}
                  onPress={() =>
                    navigation.navigate('Result', {
                      classification: item.classification,
                      imageUri: item.imageUri,
                      saveToHistory: false,
                    })
                  }
                />
              </View>
            ))
          )}
        </View>
      </ScrollView>

      {galleryProcessing ? <LoadingOverlay message={t('home.galleryAnalyzing')} /> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#EEF5E3',
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  backgroundOrbOne: {
    position: 'absolute',
    top: 88,
    right: -40,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(110, 168, 79, 0.16)',
  },
  backgroundOrbTwo: {
    position: 'absolute',
    top: 300,
    left: -55,
    width: 170,
    height: 170,
    borderRadius: 85,
    backgroundColor: 'rgba(226, 179, 58, 0.13)',
  },
  backgroundOrbThree: {
    position: 'absolute',
    bottom: 140,
    right: -30,
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: 'rgba(33, 95, 47, 0.10)',
  },
  heroCard: {
    borderRadius: 28,
    padding: 22,
    overflow: 'hidden',
    marginBottom: 22,
    ...theme.shadows.heavy,
  },
  heroGlow: {
    position: 'absolute',
    top: -30,
    right: -10,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(201, 242, 123, 0.16)',
  },
  heroTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },
  brandBadge: {
    width: 72,
    height: 72,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.10)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandLogo: {
    width: 58,
    height: 58,
  },
  cropChipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
    gap: 8,
    maxWidth: '72%',
  },
  cropChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: theme.borderRadius.pill,
    backgroundColor: 'rgba(255,255,255,0.14)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
  },
  cropChipText: {
    color: '#F8FFF2',
    fontSize: theme.typography.sm,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  title: {
    fontSize: 34,
    fontWeight: '900',
    color: '#F9FFF5',
    lineHeight: 40,
    marginBottom: 8,
  },
  tagline: {
    fontSize: theme.typography.lg,
    color: 'rgba(249,255,245,0.86)',
    lineHeight: 25,
    maxWidth: '92%',
  },
  statusPill: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 18,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: theme.borderRadius.pill,
    backgroundColor: 'rgba(18, 44, 22, 0.26)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  statusIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  statusIndicatorReady: {
    backgroundColor: '#C9F27B',
  },
  statusIndicatorDemo: {
    backgroundColor: '#FFD166',
  },
  statusText: {
    fontSize: theme.typography.md,
    color: '#F8FFF2',
    fontWeight: '700',
  },
  buttonContainer: {
    gap: 14,
    marginBottom: 16,
  },
  actionButton: {
    width: '100%',
    borderRadius: 28,
    overflow: 'hidden',
    ...theme.shadows.medium,
  },
  actionButtonGradient: {
    minHeight: 100,
    paddingHorizontal: 18,
    paddingVertical: 18,
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionIconBadge: {
    width: 54,
    height: 54,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.16)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  actionIconBadgeWarm: {
    width: 54,
    height: 54,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  actionButtonIcon: {
    fontSize: 28,
  },
  actionCopy: {
    flex: 1,
    gap: 4,
  },
  actionEyebrow: {
    color: 'rgba(255,255,255,0.72)',
    fontSize: theme.typography.sm,
    fontWeight: '600',
  },
  actionButtonText: {
    fontSize: 24,
    fontWeight: '900',
    color: '#FFFFFF',
    lineHeight: 30,
  },
  buttonDisabled: {
    opacity: 0.45,
  },
  historyButton: {
    alignSelf: 'center',
    paddingHorizontal: 22,
    paddingVertical: 14,
    borderRadius: theme.borderRadius.pill,
    backgroundColor: 'rgba(255,255,255,0.78)',
    borderWidth: 1,
    borderColor: 'rgba(29, 86, 49, 0.10)',
    marginBottom: 20,
    ...theme.shadows.light,
  },
  historyButtonText: {
    color: '#1E5631',
    fontSize: theme.typography.md,
    fontWeight: '800',
  },
  privacyButton: {
    alignSelf: 'center',
    marginTop: -4,
    marginBottom: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  privacyButtonText: {
    color: '#2D7D32',
    fontSize: theme.typography.sm,
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
  tipContainer: {
    padding: 20,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(30, 86, 49, 0.08)',
    marginBottom: 22,
    ...theme.shadows.light,
  },
  tipLabel: {
    fontWeight: '800',
    fontSize: theme.typography.lg,
    color: '#1E5631',
    marginBottom: 8,
  },
  tipText: {
    fontSize: theme.typography.md,
    color: '#4D5F4F',
    lineHeight: 23,
  },
  recentScansSection: {
    gap: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  recentScansTitle: {
    fontSize: theme.typography.xl,
    fontWeight: '800',
    color: '#203124',
  },
  sectionAccent: {
    width: 56,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#D8E7B7',
  },
  emptyStateCard: {
    borderRadius: 22,
    padding: 18,
    borderWidth: 1,
    borderColor: 'rgba(30, 86, 49, 0.08)',
    ...theme.shadows.light,
  },
  emptyStateText: {
    color: '#5B665D',
    fontSize: theme.typography.md,
    lineHeight: 22,
  },
  recentCard: {
    marginBottom: 2,
  },
});

export default HomeScreen;
