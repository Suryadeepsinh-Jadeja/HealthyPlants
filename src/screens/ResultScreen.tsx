import React, { useRef, useState, useEffect } from 'react';
import {
  BackHandler, View, Text, StyleSheet, Image, ScrollView,
  TouchableOpacity, Alert, StatusBar, Pressable,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { CommonActions, RouteProp, useFocusEffect, useRoute, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ViewShot from 'react-native-view-shot';
import Share from 'react-native-share';

import { RootStackParamList } from '../navigation/AppNavigator';
import {
  getDiseaseInfo,
  DiseaseInfo,
  getLocalizedList,
  getLocalizedText,
  SupportedLanguage,
} from '../data/diseases';
import { getCropDisplayName, getDiseaseDisplayName } from '../ml/labels';
import { theme } from '../theme';
import ConfidenceBar from '../components/ConfidenceBar';
import { saveScanResult } from '../utils/storageUtils';
import {
  CameraIcon,
  ChemicalIcon,
  LocationPinIcon,
  OrganicIcon,
  RiskDotIcon,
  ShareIcon,
  ShieldIcon,
  WarningIcon,
} from '../components/AppIcons';

type ResultScreenRouteProp = RouteProp<RootStackParamList, 'Result'>;
type ResultScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Result'>;
const BUTTON_HIT_SLOP = { top: 10, right: 10, bottom: 10, left: 10 };

// ─── Main screen ─────────────────────────────────────────────────────────────

const ResultScreen = () => {
  const { t, i18n } = useTranslation();
  const route = useRoute<ResultScreenRouteProp>();
  const navigation = useNavigation<ResultScreenNavigationProp>();
  const viewShotRef = useRef<ViewShot>(null);
  const hasSavedRef = useRef(false);
  const insets = useSafeAreaInsets();

  const { classification, imageUri, saveToHistory = true } = route.params;
  const [activeTab, setActiveTab] = useState<'organic' | 'chemical'>('organic');
  const [preventionExpanded, setPreventionExpanded] = useState(false);

  const lang = (['en', 'hi', 'ta', 'gu'].includes(i18n.language) ? i18n.language : 'en') as SupportedLanguage;
  const diseaseData: DiseaseInfo | undefined = getDiseaseInfo(classification.disease, lang);
  const isHealthy = diseaseData?.id === 'healthy';
  const cropDisplayName = t(`crops.${classification.crop}`, {
    defaultValue: getCropDisplayName(classification.crop),
  });
  const displayDiseaseName = diseaseData
    ? getLocalizedText(diseaseData.name, lang)
    : getDiseaseDisplayName(classification.disease);

  const navigateHome = React.useCallback(() => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      }),
    );
  }, [navigation]);

  const startNewScan = React.useCallback(() => {
    navigation.replace('Camera');
  }, [navigation]);

  const getConfidenceColor = (conf: number) => {
    if (conf >= 0.75) return theme.colors.primary;
    if (conf >= 0.5) return theme.colors.warning;
    return theme.colors.danger;
  };

  const stageKey = (value: string) => value.toLowerCase().trim().replace(/[\s-]+/g, '_');

  const getSeverityLabel = (sev: string) => t(`result.severityLevels.${sev}`, { defaultValue: sev });
  const getRiskLabel = (risk: string) => t(`result.riskLevels.${risk}`, { defaultValue: risk });
  const getStageLabel = (stage: string) =>
    t(`result.affectedStages.${stageKey(stage)}`, { defaultValue: stage });

  useEffect(() => {
    if (!saveToHistory) {
      return;
    }

    if (hasSavedRef.current) {
      return;
    }

    hasSavedRef.current = true;
    saveScanResult(classification, imageUri).catch(error => {
      console.warn('Could not save scan result to history.', error);
    });
  }, [classification, imageUri, saveToHistory]);

  useFocusEffect(
    React.useCallback(() => {
      const handleBack = () => {
        navigateHome();
        return true;
      };

      const backSubscription = BackHandler.addEventListener('hardwareBackPress', handleBack);
      const beforeRemoveSubscription = navigation.addListener('beforeRemove', event => {
        if (event.data.action.type !== 'GO_BACK' && event.data.action.type !== 'POP') {
          return;
        }

        event.preventDefault();
        navigateHome();
      });

      return () => {
        backSubscription.remove();
        beforeRemoveSubscription();
      };
    }, [navigateHome, navigation]),
  );

  const shareScreenshot = async () => {
    try {
      if (viewShotRef.current?.capture) {
        const uri = await viewShotRef.current.capture();
        await Share.open({
          url: uri,
          message: `${t('app.name')} - ${cropDisplayName}: ${displayDiseaseName} (${Math.round(classification.confidence * 100)}%)`,
        });
      }
    } catch (error: any) {
      if (error.message !== 'User did not share') {
        Alert.alert(t('error.title'), t('error.shareFailed'));
      }
    }
  };

  // ── Sections ──────────────────────────────────────────────────────────────

  const renderBadgeAndImage = () => {
    const confidencePct = Math.round(classification.confidence * 100);
    const cropConfidencePct = Math.round(classification.cropConfidence * 100);
    const confColor = getConfidenceColor(classification.confidence);
    const badgeColor = diseaseData?.colorCode || theme.colors.textSecondary;

    return (
      <View style={styles.topSection}>
        {/* FIX: badge moved OUT of position:absolute inside the image.
            It now sits below the image as a full-width pill — never clips
            on long disease names, never overlaps the image content. */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: imageUri }} style={styles.leafImage} />
        </View>

        <View style={[styles.diseaseBadge, { backgroundColor: badgeColor }]}>
          <Text style={styles.diseaseBadgeText} numberOfLines={2}>{displayDiseaseName}</Text>
        </View>

        <View style={styles.metaChipRow}>
          <View style={styles.metaChip}>
            <Text style={styles.metaChipText}>{t('result.crop')}: {cropDisplayName}</Text>
          </View>
          <View style={styles.metaChip}>
            <Text style={styles.metaChipText}>{t('result.cropConfidence')}: {cropConfidencePct}%</Text>
          </View>
        </View>

        <View style={styles.confidenceContainer}>
          <View style={styles.confidenceRow}>
            <Text style={styles.confidenceLabel}>{t('result.confidence')}</Text>
            <Text style={[styles.confidencePct, { color: confColor }]}>{confidencePct}%</Text>
          </View>
          <ConfidenceBar confidence={classification.confidence} color={confColor} />
        </View>

        {!classification.reliable && (
          <View style={styles.warningBanner}>
            <View style={styles.warningContent}>
              <WarningIcon />
              <Text style={styles.warningText}>{t('result.lowConfidence')}</Text>
            </View>
          </View>
        )}
      </View>
    );
  };

  const renderGenericDiseaseState = () => (
    <>
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>{t('result.overview')}</Text>
        <Text style={styles.paragraphText}>
          {t('result.genericOverviewLine1', { crop: cropDisplayName })}
        </Text>
        <Text style={styles.paragraphText}>
          {t('result.genericOverviewLine2', { disease: displayDiseaseName })}
        </Text>
        <Text style={styles.paragraphText}>
          {t('result.genericOverviewBody')}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>{t('result.treatment')}</Text>
        <Text style={styles.paragraphText}>
          {t('result.genericTreatmentBody')}
        </Text>
      </View>

      <View style={[styles.card, styles.cardLast]}>
        <Text style={styles.sectionTitle}>{t('result.prevention')}</Text>
        <Text style={styles.bulletItem}>• {t('result.genericPrevention1')}</Text>
        <Text style={styles.bulletItem}>• {t('result.genericPrevention2')}</Text>
        <Text style={styles.bulletItem}>• {t('result.genericPrevention3')}</Text>
      </View>
    </>
  );

  const renderHealthyState = () => (
    <View style={styles.healthyCard}>
      <Text style={styles.healthyTitle}>{t('result.healthy')}</Text>
      <Text style={styles.healthyDesc}>
        {diseaseData ? getLocalizedText(diseaseData.causes, lang) : t('result.healthyFallback')}
      </Text>
    </View>
  );

  const renderDiseaseInfo = () => {
    if (!diseaseData) return null;

    return (
      <View style={styles.card}>
        {/* Severity + meta chips in one row */}
        <View style={styles.chipRow}>
          <View style={[styles.chip, { backgroundColor: diseaseData.colorCode }]}>
            <Text style={styles.chipText}>{t('result.severity')}: {getSeverityLabel(diseaseData.severity)}</Text>
          </View>
          <View style={styles.chipOutline}>
            <View style={styles.inlineChipContent}>
              <LocationPinIcon />
              <Text style={styles.chipOutlineText}>{getStageLabel(diseaseData.affectedStage)}</Text>
            </View>
          </View>
          <View style={styles.chipOutline}>
            <View style={styles.inlineChipContent}>
              <RiskDotIcon
                color={
                  diseaseData.spreadRisk === 'high'
                    ? '#D32F2F'
                    : diseaseData.spreadRisk === 'medium'
                      ? '#F9A825'
                      : '#2E7D32'
                }
              />
              <Text style={styles.chipOutlineText}>{getRiskLabel(diseaseData.spreadRisk)}</Text>
            </View>
          </View>
        </View>

        <Text style={styles.sectionTitle}>{t('result.symptoms')}</Text>
        {getLocalizedList(diseaseData.symptoms, lang).map((sym, idx) => (
          <Text key={idx} style={styles.bulletItem}>• {sym}</Text>
        ))}

        <Text style={styles.sectionTitle}>{t('result.causes')}</Text>
        <Text style={styles.paragraphText}>{getLocalizedText(diseaseData.causes, lang)}</Text>
      </View>
    );
  };

  const renderTreatment = () => {
    if (!diseaseData) return null;
    const remedies = activeTab === 'organic'
      ? getLocalizedList(diseaseData.organicTreatment, lang)
      : getLocalizedList(diseaseData.chemicalTreatment, lang);

    return (
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>{t('result.treatment')}</Text>

        {/* FIX: tab bar background uses cardBackground instead of background
            so it doesn't look like a floating island on white. */}
        <View style={styles.tabContainer}>
          <Pressable
            style={[styles.tab, activeTab === 'organic' && styles.tabActive]}
            onPress={() => setActiveTab('organic')}
            hitSlop={BUTTON_HIT_SLOP}
            android_ripple={{ color: 'rgba(45, 125, 50, 0.12)', borderless: false }}
          >
            <View style={styles.tabContent} pointerEvents="none">
              <OrganicIcon color={activeTab === 'organic' ? '#FFFFFF' : '#2E7D32'} />
              <Text style={[styles.tabText, activeTab === 'organic' && styles.tabTextActive]}>
                {t('result.organic')}
              </Text>
            </View>
          </Pressable>
          <Pressable
            style={[styles.tab, activeTab === 'chemical' && styles.tabActive]}
            onPress={() => setActiveTab('chemical')}
            hitSlop={BUTTON_HIT_SLOP}
            android_ripple={{ color: 'rgba(45, 125, 50, 0.12)', borderless: false }}
          >
            <View style={styles.tabContent} pointerEvents="none">
              <ChemicalIcon color={activeTab === 'chemical' ? '#FFFFFF' : '#A65A00'} />
              <Text style={[styles.tabText, activeTab === 'chemical' && styles.tabTextActive]}>
                {t('result.chemical')}
              </Text>
            </View>
          </Pressable>
        </View>

        {remedies.length === 0 ? (
          <Text style={styles.paragraphText}>{t('result.noTreatments')}</Text>
        ) : (
          remedies.map((remedy, idx) => (
            <View key={idx} style={styles.remedyCard}>
              <View style={styles.remedyIcon}>
                {activeTab === 'organic' ? <OrganicIcon /> : <ChemicalIcon />}
              </View>
              <Text style={styles.remedyText}>{idx + 1}. {remedy}</Text>
            </View>
          ))
        )}
      </View>
    );
  };

  const renderPrevention = () => {
    if (!diseaseData) return null;

    return (
      <View style={[styles.card, styles.cardLast]}>
        <TouchableOpacity
          style={styles.collapsibleHeader}
          onPress={() => setPreventionExpanded(!preventionExpanded)}
          activeOpacity={0.7}
          hitSlop={BUTTON_HIT_SLOP}
        >
          <Text style={styles.sectionTitle}>{t('result.prevention')}</Text>
          <Text style={styles.chevron}>{preventionExpanded ? '▼' : '▶'}</Text>
        </TouchableOpacity>

        {preventionExpanded && (
          <View style={styles.collapsibleBody}>
            {getLocalizedList(diseaseData.prevention, lang).map((prev, idx) => (
              <View key={idx} style={styles.listItemRow}>
                <ShieldIcon />
                <Text style={styles.bulletItemText}>{prev}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
    );
  };

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.background} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 112 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <ViewShot ref={viewShotRef} options={{ format: 'jpg', quality: 0.9 }}>
          <View style={styles.viewShotContainer}>
            {renderBadgeAndImage()}
            {isHealthy ? renderHealthyState() : diseaseData ? (
              <>
                {renderDiseaseInfo()}
                {renderTreatment()}
                {renderPrevention()}
              </>
            ) : (
              renderGenericDiseaseState()
            )}
          </View>
        </ViewShot>
      </ScrollView>

      {/* FIX: action bar uses paddingBottom based on platform instead of
          hardcoded 30 — prevents buttons being cut off on gesture-nav phones. */}
      <View style={[styles.actionContainer, { paddingBottom: insets.bottom + 8 }]}>
        <TouchableOpacity style={styles.scanAgainButton} onPress={startNewScan} hitSlop={BUTTON_HIT_SLOP}>
          <View style={styles.actionButtonContent}>
            <CameraIcon size={20} color={theme.colors.textPrimary} />
            <Text style={styles.scanAgainText}>{t('result.scanAgain')}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.shareButton} onPress={shareScreenshot} hitSlop={BUTTON_HIT_SLOP}>
          <View style={styles.actionButtonContent}>
            <ShareIcon size={20} color="#FFFFFF" />
            <Text style={styles.shareText}>{t('result.saveResult')}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scroll: { flex: 1 },
  scrollContent: { paddingBottom: 16 },
  viewShotContainer: { backgroundColor: theme.colors.background },

  // ── Top section ─────────────────────────────────────────────────────────
  topSection: { padding: 16 },
  imageContainer: {
    borderRadius: theme.borderRadius.large,
    overflow: 'hidden',           // clips image to rounded corners cleanly
    ...theme.shadows.medium,
  },
  leafImage: {
    width: '100%',
    height: 240,
    resizeMode: 'cover',
  },

  // FIX: badge is now a full-width pill BELOW the image — never clips on
  // long disease names, never covers the leaf photo.
  diseaseBadge: {
    marginTop: 10,
    borderRadius: theme.borderRadius.large,
    paddingHorizontal: 16,
    paddingVertical: 10,
    alignItems: 'center',
  },
  diseaseBadgeText: {
    color: theme.colors.cardBackground,
    fontWeight: '900',
    fontSize: theme.typography.lg,
    textAlign: 'center',
  },
  metaChipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 10,
  },
  metaChip: {
    backgroundColor: theme.colors.cardBackground,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: theme.borderRadius.pill,
    ...theme.shadows.light,
  },
  metaChipText: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.sm,
    fontWeight: '700',
  },

  // Confidence
  confidenceContainer: { marginTop: 14 },
  confidenceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  confidenceLabel: {
    fontSize: theme.typography.md,
    fontWeight: '700',
    color: theme.colors.textPrimary,
  },
  confidencePct: {
    fontSize: theme.typography.lg,
    fontWeight: '800',
  },
  warningBanner: {
    marginTop: 12,
    backgroundColor: '#FFF9C4',
    padding: 10,
    borderRadius: theme.borderRadius.small,
    borderWidth: 1,
    borderColor: '#FBC02D',
  },
  warningContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  warningText: { color: '#F57F17', fontWeight: 'bold', fontSize: theme.typography.md, textAlign: 'center' },

  // ── Healthy state ────────────────────────────────────────────────────────
  healthyCard: {
    margin: 16,
    padding: 20,
    backgroundColor: '#E8F5E9',
    borderRadius: theme.borderRadius.medium,
    borderColor: theme.colors.primary,
    borderWidth: 2,
    alignItems: 'center',
    ...theme.shadows.light,
  },
  healthyTitle: { fontSize: theme.typography.xxl, fontWeight: 'bold', color: theme.colors.primary, marginBottom: 10 },
  healthyDesc: { fontSize: theme.typography.lg, color: '#388E3C', textAlign: 'center', lineHeight: 22 },

  // ── Card (shared by disease info, treatment, prevention) ─────────────────
  card: {
    backgroundColor: theme.colors.cardBackground,
    marginHorizontal: 16,
    borderRadius: theme.borderRadius.medium,
    padding: 16,
    marginBottom: 12,
    ...theme.shadows.light,
  },
  cardLast: { marginBottom: 8 },

  // FIX: chips in a wrapping row instead of a single non-wrapping row —
  // long severity labels won't overflow on small screens.
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 4,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: theme.borderRadius.pill,
  },
  chipText: { color: theme.colors.cardBackground, fontWeight: 'bold', fontSize: theme.typography.sm },
  chipOutline: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: theme.borderRadius.pill,
    borderWidth: 1,
    borderColor: theme.colors.textSecondary,
  },
  chipOutlineText: { color: theme.colors.textSecondary, fontSize: theme.typography.sm, fontWeight: '600' },
  inlineChipContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  // FIX: sectionTitle marginTop reduced — card already has padding:16
  // so the original marginTop:15 created ~31px gap which looked sloppy.
  sectionTitle: {
    fontSize: theme.typography.lg,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginTop: 8,
    marginBottom: 8,
  },
  bulletItem: { fontSize: theme.typography.md, color: theme.colors.textSecondary, lineHeight: 24, paddingLeft: 6, marginBottom: 4 },
  listItemRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    marginBottom: 6,
  },
  bulletItemText: {
    flex: 1,
    fontSize: theme.typography.md,
    color: theme.colors.textSecondary,
    lineHeight: 24,
  },
  paragraphText: { fontSize: theme.typography.md, color: theme.colors.textSecondary, lineHeight: 22 },

  // Treatment tabs
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 14,
    backgroundColor: '#F0F0F0',
    borderRadius: theme.borderRadius.small,
    padding: 3,
  },
  tab: {
    flex: 1,
    minHeight: 54,
    paddingHorizontal: 10,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.borderRadius.small,
  },
  tabActive: { backgroundColor: theme.colors.primary },
  tabContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  tabText: { fontWeight: '600', color: theme.colors.textSecondary, fontSize: theme.typography.sm },
  tabTextActive: { color: theme.colors.cardBackground },

  remedyCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#F9F9F9',
    padding: 12,
    borderRadius: theme.borderRadius.small,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  remedyIcon: { marginRight: 10, marginTop: 1 },
  remedyText: { flex: 1, fontSize: theme.typography.md, color: theme.colors.textPrimary, lineHeight: 22 },

  // Prevention collapsible
  collapsibleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chevron: { fontSize: 13, color: theme.colors.primary, fontWeight: 'bold' },
  collapsibleBody: { marginTop: 10 },

  // ── Action bar ───────────────────────────────────────────────────────────
  // FIX: paddingBottom is dynamic — accounts for gesture nav bar on Android
  // and home indicator on iOS instead of a hardcoded 30.
  actionContainer: {
    flexDirection: 'row',
    padding: 14,
    backgroundColor: theme.colors.cardBackground,
    ...theme.shadows.medium,
    gap: 10,
  },
  scanAgainButton: {
    flex: 1,
    backgroundColor: '#EEEEEE',
    padding: 16,
    borderRadius: theme.borderRadius.medium,
    alignItems: 'center',
  },
  actionButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  scanAgainText: { color: theme.colors.textPrimary, fontWeight: 'bold', fontSize: theme.typography.md },
  shareButton: {
    flex: 1,
    backgroundColor: theme.colors.primary,
    padding: 16,
    borderRadius: theme.borderRadius.medium,
    alignItems: 'center',
  },
  shareText: { color: theme.colors.cardBackground, fontWeight: 'bold', fontSize: theme.typography.md },
});

export default ResultScreen;
