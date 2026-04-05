import React, { useEffect, useRef } from 'react';
import { ActivityIndicator, Animated, StyleSheet, Text, View } from 'react-native';
import { theme } from '../theme';

interface LoadingOverlayProps {
  message: string;
  showGuide?: boolean;
}

const LoadingOverlay = ({ message, showGuide = false }: LoadingOverlayProps) => {
  const pulseAnim = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 0.4, duration: 800, useNativeDriver: true }),
      ]),
    ).start();
  }, [pulseAnim]);

  return (
    <View style={styles.overlay}>
      {showGuide ? (
        <Animated.View style={[styles.guideBox, { opacity: pulseAnim }]} />
      ) : (
        <ActivityIndicator size="large" color={theme.colors.cardBackground} />
      )}
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(27, 27, 27, 0.92)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 20,
  },
  guideBox: {
    width: 250,
    height: 250,
    borderRadius: theme.borderRadius.large,
    backgroundColor: theme.colors.primary,
  },
  message: {
    marginTop: 24,
    color: theme.colors.cardBackground,
    fontSize: theme.typography.lg,
    fontWeight: '600',
  },
});

export default LoadingOverlay;
