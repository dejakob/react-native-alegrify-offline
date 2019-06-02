import { NativeModules, Platform } from 'react-native';
import i18next from 'i18next';
import en from '../data/en.json';
import nl from '../data/nl.json';

let locale = '';

// Use locale of platform
if (Platform.OS === 'ios') {
    locale = (NativeModules.SettingsManager.settings.AppleLocale || '').split('_')[0];
}
else if (Platform.OS === 'android') {
    locale = (NativeModules.I18nManager.localeIdentifier || '').split('_')[0];
}

// Available languages
const resources = {
    en: { translation: en },
    nl: { translation: nl }
};
const supportedLanguages = Object.keys(resources);
const fallbackLanguage = 'en';

// Configure i18next
i18next.init({
    lng: locale,
    fallbackLng: fallbackLanguage,
    debug: false,
    resources
});

/**
 * Parse translation
 * @param {String} key [translation key]
 * @param {Object} [options] [e.g. params for translation]
 * @returns {String}
 */
function translate(key, options) {
    return i18next.t(key, options);
}
translate.supportedLanguages = supportedLanguages;
translate.fallbackLanguage = fallbackLanguage;

/**
 * Update language
 * @param {String} language
 */
function setLanguage(language) {
    i18next.changeLanguage(language);
}

export {
    translate,
    setLanguage
};
