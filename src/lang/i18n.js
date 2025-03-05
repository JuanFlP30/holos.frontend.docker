import { createI18n } from 'vue-i18n';
import en from './en.js';
import es from './es.js';

/**
 * Idioma local
 */
const locale = document.documentElement.lang;

const messages = {
  en,
  es
}

const i18n = createI18n({
  legacy: false,
  locale,
  fallbackLocale: locale,
  messages
});

function lang(text, params = {}) {
  return i18n.global.t(text, params);
}

export {
  i18n,
  lang
};