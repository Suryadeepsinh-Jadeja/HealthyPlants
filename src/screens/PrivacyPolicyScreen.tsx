import React from 'react';
import {
  Alert,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { PRIVACY_POLICY_EFFECTIVE_DATE, PRIVACY_POLICY_URL } from '../config/privacy';
import { theme } from '../theme';

const POLICY_SECTIONS = [
  {
    title: 'What HealthyPlants does',
    body:
      'HealthyPlants analyzes crop leaf images on your device to help identify crop type and possible plant diseases. The app also stores recent scan history on the device so you can review past results.',
  },
  {
    title: 'Data we use',
    body:
      'The app may use photos you capture with the camera or select from your gallery. It also stores diagnosis results, confidence values, timestamps, and image references for local history inside the app.',
  },
  {
    title: 'How your data is processed',
    body:
      'Image preprocessing and machine-learning inference are designed to run on-device. HealthyPlants does not require an account, and the app does not send scan images or diagnosis history to a backend server as part of its normal flow.',
  },
  {
    title: 'Local storage',
    body:
      'Recent scan history is stored locally on the device using encrypted app storage. Language preference is also stored locally so the app can remember your selected language.',
  },
  {
    title: 'Permissions',
    body:
      'HealthyPlants requests camera permission so you can capture crop images for analysis. If you choose images from the gallery, the system image picker is used to let you select a photo.',
  },
  {
    title: 'Sharing',
    body:
      'If you use the Share Result feature, the app creates a shareable result image and hands it to the system share sheet. Any sharing after that is controlled by the app or service you choose.',
  },
  {
    title: 'Your choices',
    body:
      'You can clear saved scan history from inside the app. You can also uninstall the app to remove its locally stored data from the device.',
  },
];

const PrivacyPolicyScreen = () => {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();

  const openPolicyUrl = async () => {
    try {
      await Linking.openURL(PRIVACY_POLICY_URL);
    } catch (error) {
      console.error('Failed to open privacy policy URL.', error);
      Alert.alert(
        t('error.title'),
        t('privacy.openLinkFailed', { defaultValue: 'Could not open the privacy policy link.' }),
      );
    }
  };

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={[styles.contentContainer, { paddingBottom: insets.bottom + 24 }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.heroCard}>
        <Text style={styles.heroTitle}>
          {t('privacy.title', { defaultValue: 'Privacy Policy' })}
        </Text>
        <Text style={styles.heroSubtitle}>
          {t('privacy.subtitle', {
            defaultValue: 'How HealthyPlants handles photos, scan history, and permissions.',
          })}
        </Text>
        <Text style={styles.effectiveDate}>
          {t('privacy.effectiveDate', {
            defaultValue: `Effective date: ${PRIVACY_POLICY_EFFECTIVE_DATE}`,
          })}
        </Text>
      </View>

      {POLICY_SECTIONS.map(section => (
        <View key={section.title} style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          <Text style={styles.sectionBody}>{section.body}</Text>
        </View>
      ))}

      <View style={styles.linkCard}>
        <Text style={styles.linkTitle}>
          {t('privacy.fullPolicyTitle', { defaultValue: 'Full hosted policy' })}
        </Text>
        <Text style={styles.linkBody}>
          {t('privacy.fullPolicyBody', {
            defaultValue: 'Open the published privacy policy URL that you can use for app-store listings.',
          })}
        </Text>
        <TouchableOpacity style={styles.linkButton} onPress={openPolicyUrl}>
          <Text style={styles.linkButtonText}>
            {t('privacy.openLink', { defaultValue: 'Open Privacy Policy URL' })}
          </Text>
        </TouchableOpacity>
        <Text style={styles.urlText}>{PRIVACY_POLICY_URL}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  contentContainer: {
    padding: 16,
    gap: 14,
  },
  heroCard: {
    backgroundColor: '#EAF5E7',
    borderRadius: theme.borderRadius.large,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(45, 125, 50, 0.12)',
  },
  heroTitle: {
    fontSize: theme.typography.xxl,
    fontWeight: '800',
    color: theme.colors.primary,
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: theme.typography.md,
    lineHeight: 22,
    color: theme.colors.textSecondary,
    marginBottom: 10,
  },
  effectiveDate: {
    fontSize: theme.typography.sm,
    color: theme.colors.textSecondary,
    fontWeight: '600',
  },
  sectionCard: {
    backgroundColor: theme.colors.cardBackground,
    borderRadius: theme.borderRadius.medium,
    padding: 16,
    ...theme.shadows.light,
  },
  sectionTitle: {
    fontSize: theme.typography.lg,
    fontWeight: '800',
    color: theme.colors.primary,
    marginBottom: 8,
  },
  sectionBody: {
    fontSize: theme.typography.md,
    color: theme.colors.textSecondary,
    lineHeight: 22,
  },
  linkCard: {
    backgroundColor: '#FFF9EE',
    borderRadius: theme.borderRadius.medium,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(249, 168, 37, 0.18)',
    ...theme.shadows.light,
  },
  linkTitle: {
    fontSize: theme.typography.lg,
    fontWeight: '800',
    color: '#A65A00',
    marginBottom: 8,
  },
  linkBody: {
    fontSize: theme.typography.md,
    color: theme.colors.textSecondary,
    lineHeight: 22,
    marginBottom: 14,
  },
  linkButton: {
    alignSelf: 'flex-start',
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: theme.borderRadius.pill,
    marginBottom: 12,
  },
  linkButtonText: {
    color: theme.colors.cardBackground,
    fontWeight: '800',
    fontSize: theme.typography.md,
  },
  urlText: {
    fontSize: theme.typography.sm,
    lineHeight: 18,
    color: theme.colors.textSecondary,
  },
});

export default PrivacyPolicyScreen;
