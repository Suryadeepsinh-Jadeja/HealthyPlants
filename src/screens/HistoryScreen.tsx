import React, { useEffect, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import DiseaseCard from '../components/DiseaseCard';
import { RootStackParamList } from '../navigation/AppNavigator';
import { theme } from '../theme';
import { clearScanHistory, getScanHistory, ScanHistoryItem } from '../utils/storageUtils';

type HistoryScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'History'>;
const BUTTON_HIT_SLOP = { top: 10, right: 10, bottom: 10, left: 10 };

const HistorySeparator = () => <View style={styles.separator} />;

const HistoryScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<HistoryScreenNavigationProp>();
  const isFocused = useIsFocused();
  const insets = useSafeAreaInsets();
  const [history, setHistory] = useState<ScanHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isFocused) {
      return;
    }

    let active = true;

    const loadHistory = async () => {
      setLoading(true);
      const items = await getScanHistory();
      if (active) {
        setHistory(items);
        setLoading(false);
      }
    };

    loadHistory();

    return () => {
      active = false;
    };
  }, [isFocused]);

  const handleClearHistory = () => {
    Alert.alert(
      t('history.clearConfirmTitle'),
      t('history.clearConfirmMessage'),
      [
        { text: t('common.cancel'), style: 'cancel' },
        {
          text: t('history.clearAction'),
          style: 'destructive',
          onPress: async () => {
            await clearScanHistory();
            setHistory([]);
          },
        },
      ],
    );
  };

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom + 8 }]}>
      <View style={styles.header}>
        <View style={styles.headerCopy}>
          <Text style={styles.title}>{t('history.title')}</Text>
          <Text style={styles.subtitle}>{t('history.subtitle')}</Text>
        </View>
        <TouchableOpacity
          style={styles.clearButton}
          onPress={handleClearHistory}
          disabled={history.length === 0}
          hitSlop={BUTTON_HIT_SLOP}
        >
          <Text style={[styles.clearButtonText, history.length === 0 && styles.clearButtonTextDisabled]}>
            {t('history.clearAction')}
          </Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <Text style={styles.loadingText}>{t('history.loading')}</Text>
      ) : history.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>{t('history.emptyTitle')}</Text>
          <Text style={styles.emptyBody}>{t('history.emptyBody')}</Text>
          <TouchableOpacity
            style={styles.scanButton}
            onPress={() => navigation.navigate('Camera')}
            hitSlop={BUTTON_HIT_SLOP}
          >
            <Text style={styles.scanButtonText}>{t('home.scanButton')}</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={history}
          keyExtractor={item => item.id}
          contentContainerStyle={[
            styles.listContent,
            { paddingBottom: insets.bottom + 8 },
          ]}
          renderItem={({ item }) => (
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
          )}
          ItemSeparatorComponent={HistorySeparator}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 16,
  },
  headerCopy: {
    flex: 1,
    gap: 4,
  },
  title: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.xxl,
    fontWeight: '700',
  },
  subtitle: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.md,
    lineHeight: 22,
  },
  clearButton: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: theme.borderRadius.pill,
    backgroundColor: theme.colors.cardBackground,
    ...theme.shadows.light,
  },
  clearButtonText: {
    color: theme.colors.danger,
    fontWeight: '700',
    fontSize: theme.typography.sm,
  },
  clearButtonTextDisabled: {
    color: '#C7C7C7',
  },
  loadingText: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.md,
    textAlign: 'center',
    marginTop: 40,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  emptyTitle: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.xl,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 10,
  },
  emptyBody: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.md,
    lineHeight: 22,
    textAlign: 'center',
    marginBottom: 20,
  },
  scanButton: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: theme.borderRadius.pill,
  },
  scanButtonText: {
    color: theme.colors.cardBackground,
    fontSize: theme.typography.md,
    fontWeight: '700',
  },
  listContent: {
    flexGrow: 1,
  },
  separator: {
    height: 12,
  },
});

export default HistoryScreen;
