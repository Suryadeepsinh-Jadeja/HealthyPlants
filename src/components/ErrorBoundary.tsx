import React, { Component, ErrorInfo, ReactNode } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import i18n from '../data/translations';
import { theme } from '../theme';
import { WarningIcon } from './AppIcons';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error originating from Application UI or ML Engine:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <SafeAreaView style={styles.container}>
          <View style={styles.card}>
            <View style={styles.icon}>
              <WarningIcon size={44} color={theme.colors.danger} />
            </View>
            <Text style={styles.title}>{i18n.t('boundary.title')}</Text>
            <Text style={styles.desc}>
              {i18n.t('boundary.description')}
            </Text>
            <Text style={styles.errorText} numberOfLines={3}>
              {this.state.error?.message || i18n.t('boundary.unknown')}
            </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.setState({ hasError: false, error: null })}
            >
              <Text style={styles.buttonText}>{i18n.t('boundary.retry')}</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: theme.colors.cardBackground,
    padding: 30,
    borderRadius: theme.borderRadius.large,
    alignItems: 'center',
    ...theme.shadows.medium,
  },
  icon: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#FFF4F4',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: theme.typography.xl,
    fontWeight: 'bold',
    color: theme.colors.danger,
    marginBottom: 10,
    textAlign: 'center',
  },
  desc: {
    fontSize: theme.typography.md,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },
  errorText: {
    fontSize: theme.typography.sm,
    color: theme.colors.textSecondary,
    backgroundColor: '#F5F5F5',
    padding: 10,
    borderRadius: theme.borderRadius.small,
    marginBottom: 30,
    width: '100%',
    fontFamily: 'monospace',
  },
  button: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: theme.borderRadius.pill,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: theme.colors.cardBackground,
    fontWeight: 'bold',
    fontSize: theme.typography.lg,
  }
});

export default ErrorBoundary;
