import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { getDiseaseInfo, getLocalizedText, SupportedLanguage } from '../data/diseases';
import { getCropDisplayName, getDiseaseDisplayName } from '../ml/labels';
import { theme } from '../theme';
import { ScanHistoryItem } from '../utils/storageUtils';
import ConfidenceBar from './ConfidenceBar';

interface DiseaseCardProps {
  item: ScanHistoryItem;
  onPress?: () => void;
}

const BUTTON_HIT_SLOP = { top: 8, right: 8, bottom: 8, left: 8 };

const DiseaseCard = ({ item, onPress }: DiseaseCardProps) => {
  const { i18n, t } = useTranslation();
  const lang = (['en', 'hi', 'ta', 'gu'].includes(i18n.language) ? i18n.language : 'en') as SupportedLanguage;
  const disease = getDiseaseInfo(item.classification.disease, lang);
  const displayName = disease
    ? getLocalizedText(disease.name, lang)
    : getDiseaseDisplayName(item.classification.disease);
  const cropName = t(`crops.${item.classification.crop}`, {
    defaultValue: getCropDisplayName(item.classification.crop),
  });
  const confidenceColor =
    item.classification.confidence >= 0.75
      ? theme.colors.primary
      : item.classification.confidence >= 0.5
        ? theme.colors.warning
        : theme.colors.danger;

  const content = (
    <View style={styles.card}>
      <Image source={{ uri: item.imageUri }} style={styles.image} />
      <View style={styles.content}>
        <View style={styles.headerRow}>
          <Text style={styles.title} numberOfLines={2}>
            {displayName}
          </Text>
          {!item.classification.reliable && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{t('history.reviewBadge')}</Text>
            </View>
          )}
        </View>
        <Text style={styles.cropLabel}>{cropName}</Text>
        <Text style={styles.timestamp}>{new Date(item.savedAt).toLocaleString()}</Text>
        <View style={styles.confidenceRow}>
          <Text style={styles.confidenceLabel}>
            {t('result.confidence')}: {Math.round(item.classification.confidence * 100)}%
          </Text>
        </View>
        <ConfidenceBar confidence={item.classification.confidence} color={confidenceColor} height={8} />
      </View>
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity activeOpacity={0.85} onPress={onPress} hitSlop={BUTTON_HIT_SLOP}>
        {content}
      </TouchableOpacity>
    );
  }

  return content;
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: theme.colors.cardBackground,
    borderRadius: theme.borderRadius.medium,
    padding: 12,
    gap: 12,
    ...theme.shadows.light,
  },
  image: {
    width: 72,
    height: 72,
    borderRadius: theme.borderRadius.medium,
    backgroundColor: '#DDE7D2',
  },
  content: {
    flex: 1,
    gap: 6,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 8,
  },
  title: {
    flex: 1,
    color: theme.colors.textPrimary,
    fontSize: theme.typography.lg,
    fontWeight: '700',
  },
  timestamp: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.sm,
  },
  cropLabel: {
    color: theme.colors.primary,
    fontSize: theme.typography.sm,
    fontWeight: '700',
  },
  confidenceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  confidenceLabel: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.sm,
    fontWeight: '600',
  },
  badge: {
    backgroundColor: '#FFF3CD',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.pill,
  },
  badgeText: {
    color: '#8A6D3B',
    fontSize: theme.typography.xs,
    fontWeight: '700',
  },
});

export default DiseaseCard;
