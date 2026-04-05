import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, Animated, StatusBar, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { Camera } from 'react-native-vision-camera';

import './src/data/translations';
import { loadModel } from './src/ml/modelLoader';
import AppNavigator from './src/navigation/AppNavigator';
import { theme } from './src/theme';
import ErrorBoundary from './src/components/ErrorBoundary';

const SPLASH_LOGO = require('./logo_transparent_green.png');

const SplashScreen = ({ title, subtitle }: { title: string; subtitle: string }) => {
  const scale = useRef(new Animated.Value(0.5)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scale, {
        toValue: 1,
        tension: 10,
        friction: 4,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      })
    ]).start();
  }, [opacity, scale]);

  return (
    <View style={styles.splashContainer}>
      <StatusBar backgroundColor={theme.colors.primary} barStyle="light-content" />
      <Animated.View style={[styles.splashIconContainer, { transform: [{ scale }] }]}>
        <Image source={SPLASH_LOGO} style={styles.splashLogo} resizeMode="contain" />
      </Animated.View>
      <Animated.Text style={[styles.splashTitle, { opacity }]}>{title}</Animated.Text>
      <Animated.Text style={[styles.splashSubtitle, { opacity }]}>{subtitle}</Animated.Text>
    </View>
  );
};

const App = () => {
  const { t } = useTranslation();
  const [modelLoading, setModelLoading] = useState(true);
  const [permissionsGranted, setPermissionsGranted] = useState(false);

  useEffect(() => {
    const initModel = async () => {
      try {
        await loadModel();
      } catch (e) {
        console.error('Initial model load failed', e);
      } finally {
        setModelLoading(false);
      }
    };

    const checkPermissions = async () => {
      let cameraStatus = await Camera.getCameraPermissionStatus();
      if (cameraStatus !== 'granted') {
        cameraStatus = await Camera.requestCameraPermission();
      }

      setPermissionsGranted(cameraStatus === 'granted');
    };

    Promise.all([initModel(), checkPermissions()]);
  }, []);

  if (modelLoading) {
    return <SplashScreen title={t('app.name')} subtitle={t('app.tagline')} />;
  }

  if (!permissionsGranted) {
    return (
      <View style={styles.centerContainer}>
        <StatusBar backgroundColor={theme.colors.background} barStyle="dark-content" />
        <Text style={styles.errorText}>{t('error.cameraPermission')}</Text>
      </View>
    );
  }

  return (
    <ErrorBoundary>
      <NavigationContainer>
        <StatusBar backgroundColor={theme.colors.primary} barStyle="light-content" />
        <AppNavigator />
      </NavigationContainer>
    </ErrorBoundary>
  );
};

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  splashTitle: {
    fontSize: theme.typography.hero,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginTop: 20,
    width: '100%',
    paddingHorizontal: 24,
    textAlign: 'center',
  },
  splashSubtitle: {
    fontSize: theme.typography.xl,
    color: theme.colors.secondary,
    fontWeight: '600',
    marginTop: 5,
    width: '100%',
    paddingHorizontal: 28,
    textAlign: 'center',
    lineHeight: 30,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  splashIconContainer: {
    alignItems: 'center',
  },
  splashLogo: {
    width: 180,
    height: 180,
  },
  errorText: {
    padding: 20,
    fontSize: theme.typography.lg,
    textAlign: 'center',
    color: theme.colors.danger,
  },
});

export default App;
