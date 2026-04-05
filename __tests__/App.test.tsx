/**
 * @format
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';

jest.mock('../src/data/translations', () => ({}));
jest.mock('../src/navigation/AppNavigator', () => 'AppNavigator');
jest.mock('@react-navigation/native', () => ({
  NavigationContainer: ({ children }: { children: React.ReactNode }) => children,
}));
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { language: 'en', changeLanguage: jest.fn() },
  }),
}));
jest.mock('react-native-vision-camera', () => ({
  Camera: { getCameraPermissionStatus: jest.fn().mockResolvedValue('granted') },
}));
jest.mock('react-native-permissions', () => ({
  check: jest.fn().mockResolvedValue('granted'),
  request: jest.fn().mockResolvedValue('granted'),
  PERMISSIONS: { ANDROID: { READ_EXTERNAL_STORAGE: 'READ_EXTERNAL_STORAGE' } },
  RESULTS: { GRANTED: 'granted' },
}));
jest.mock('../src/ml/modelLoader', () => ({
  loadModel: jest.fn().mockResolvedValue(undefined),
}));

import App from '../App';

test('renders correctly', async () => {
  await ReactTestRenderer.act(async () => {
    ReactTestRenderer.create(<App />);
    await Promise.resolve();
  });
});
