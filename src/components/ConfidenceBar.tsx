import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { theme } from '../theme';

interface ConfidenceBarProps {
  confidence: number;
  color: string;
  height?: number;
}

const ConfidenceBar = ({ confidence, color, height = 10 }: ConfidenceBarProps) => {
  const animatedWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedWidth, {
      toValue: Math.max(0, Math.min(100, Math.round(confidence * 100))),
      duration: 800,
      useNativeDriver: false,
    }).start();
  }, [animatedWidth, confidence]);

  const widthInterpolated = animatedWidth.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={[styles.wrapper, { height }]}>
      <Animated.View style={[styles.fill, { width: widthInterpolated, backgroundColor: color }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    backgroundColor: '#E0E0E0',
    borderRadius: theme.borderRadius.pill,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: theme.borderRadius.pill,
  },
});

export default ConfidenceBar;
