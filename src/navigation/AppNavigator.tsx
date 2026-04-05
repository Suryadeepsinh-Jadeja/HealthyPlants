import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import HomeScreen from '../screens/HomeScreen';
import CameraScreen from '../screens/CameraScreen';
import ResultScreen from '../screens/ResultScreen';
import HistoryScreen from '../screens/HistoryScreen';
import LanguageSwitcher from '../components/LanguageSwitcher';
import { ClassificationResult } from '../ml/types';
import { theme } from '../theme';

const BUTTON_HIT_SLOP = { top: 10, right: 10, bottom: 10, left: 10 };

export type RootStackParamList = {
  Home: undefined;
  Camera: { openGallery?: boolean } | undefined;
  History: undefined;
  Result: {
    classification: ClassificationResult;
    imageUri: string;
    saveToHistory?: boolean;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  const { t } = useTranslation();

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerTintColor: theme.colors.cardBackground,
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: theme.typography.xl,
        },
      }}
    >
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{
          headerTitle: "HealthyPlants",
          headerBackVisible: false,
          headerRight: () => <LanguageSwitcher />,
        }}
      />
      <Stack.Screen 
        name="Camera" 
        component={CameraScreen} 
        options={{
          headerTitle: t('nav.camera'),
        }}
      />
      <Stack.Screen 
        name="Result" 
        component={ResultScreen} 
        options={({ navigation }) => ({
          headerTitle: t('result.diseaseFound'),
          headerBackVisible: false,
          headerLeft: () => (
            <TouchableOpacity
              style={styles.headerBackButton}
              onPress={() =>
                navigation.dispatch(
                  CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'Home' }],
                  }),
                )
              }
              hitSlop={BUTTON_HIT_SLOP}
            >
              <Text style={styles.headerBackText}>←</Text>
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity 
              style={styles.scanAgainButton}
              onPress={() => navigation.replace('Camera')}
              hitSlop={BUTTON_HIT_SLOP}
            >
              <Text style={styles.scanAgainText}>{t('result.scanAgain')}</Text>
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="History"
        component={HistoryScreen}
        options={{
          headerTitle: t('nav.history'),
        }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  headerBackButton: {
    paddingRight: 10,
    paddingVertical: 4,
  },
  headerBackText: {
    color: theme.colors.cardBackground,
    fontSize: 24,
    fontWeight: '700',
  },
  scanAgainButton: {
    backgroundColor: theme.colors.cardBackground,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: theme.borderRadius.pill,
    ...theme.shadows.light,
  },
  scanAgainText: {
    color: theme.colors.primary,
    fontWeight: 'bold',
    fontSize: theme.typography.md,
  }
});

export default AppNavigator;
