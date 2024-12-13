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
  locale,
  fallbackLocale: locale,
  messages
});

function lang(text) {
  return i18n.global.t(text);
}

export {
  i18n,
  lang
};