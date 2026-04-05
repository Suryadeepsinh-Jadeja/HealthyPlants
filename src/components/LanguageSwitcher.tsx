import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Pressable } from 'react-native';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिन्दी' },
  { code: 'ta', label: 'தமிழ்' },
  { code: 'gu', label: 'ગુજરાતી' }
];

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();
  const [modalVisible, setModalVisible] = React.useState(false);

  const changeLanguage = async (code: string) => {
    await i18n.changeLanguage(code);
    await AsyncStorage.setItem('@app_language', code);
    setModalVisible(false);
  };

  const currentLang = LANGUAGES.find(l => l.code === i18n.language) || LANGUAGES[0];

  return (
    <View>
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => setModalVisible(true)}
        hitSlop={{ top: 12, right: 12, bottom: 12, left: 12 }}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>{currentLang.label} 🌐</Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setModalVisible(false)}>
          <Pressable style={styles.modalContent} onPress={() => {}}>
            <Text style={styles.modalTitle}>{t('language.select')}</Text>
            {LANGUAGES.map((lang) => (
              <TouchableOpacity
                key={lang.code}
                style={[
                  styles.langOption,
                  i18n.language === lang.code && styles.langOptionSelected
                ]}
                onPress={() => changeLanguage(lang.code)}
                activeOpacity={0.8}
              >
                <Text style={[
                  styles.langText,
                  i18n.language === lang.code && styles.langTextSelected
                ]}>
                  {lang.label}
                </Text>
              </TouchableOpacity>
            ))}
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    minHeight: 40,
    minWidth: 96,
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: '#388E3C', // darker shade of header green
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    width: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#333',
  },
  langOption: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  langOptionSelected: {
    backgroundColor: '#E8F5E9',
  },
  langText: {
    fontSize: 16,
    color: '#444',
  },
  langTextSelected: {
    color: '#4CAF50',
    fontWeight: 'bold',
  }
});

export default LanguageSwitcher;
