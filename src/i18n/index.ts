import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { resources } from './locale';
// don't want to use this?
// have a look at the Quick start guide
// for passing in lng and translations on init

const kafkai18n = i18n.createInstance();

kafkai18n
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  .use(LanguageDetector)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    detection: {
      order: ['htmlTag', 'navigator'],
      caches: [],
    },
    fallbackLng: 'en',
    debug: true,

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources,
  });

export default kafkai18n;
