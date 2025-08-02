// /lang/language.js

// Определяем язык из URL или браузера
// Определяем язык из URL или браузера
function getLangFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  const langParam = urlParams.get('lang');
  const supportedLangs = ['en', 'ru', 'it', 'fr', 'de', 'es', 'pt', 'uk', 'pl', 'ja', 'ko', 'zh', 'tr', 'ar'];
  if (supportedLangs.includes(langParam)) return langParam;

  const browserLang = navigator.language.slice(0, 2).toLowerCase();
  return supportedLangs.includes(browserLang) ? browserLang : 'en';
}

window.currentLang = window.currentLang || getLangFromURL();
window.fallbackLang = window.fallbackLang || 'en';

// Загружаем JSON-файл переводов
function loadTranslations(lang) {
  // ❗ путь с учетом того, что training.html находится в /pages/
  return fetch(`../lang/${lang}.json`).then(res => {
    if (!res.ok) throw new Error(`Language file ${lang}.json not found`);
    return res.json();
  });
}

// Применяем переводы
function localizeText(langData) {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (key in langData) {
      el.innerHTML = langData[key];
    } else {
      el.innerHTML = `[${key}]`;
      console.warn(`⚠️ Missing translation for: ${key}`);
    }
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (langData[key]) el.placeholder = langData[key];
  });

  document.querySelectorAll('[data-i18n-aria]').forEach(el => {
    const key = el.getAttribute('data-i18n-aria');
    if (langData[key]) el.setAttribute('aria-label', langData[key]);
  });
}

// Основная функция, вызываемая страницей
function localizePage(lang) {
  loadTranslations(lang)
    .then(translations => {
      window.translations = translations;
      localizeText(translations);
      
      if (typeof updateFlipContent === 'function') updateFlipContent(lang);

      if (typeof window.demoInit === 'function') window.demoInit();
      if (typeof window.initChat === 'function') window.initChat();
    })
    .catch(() => {
      console.warn(`⚠️ Не удалось загрузить ${lang}.json. Используем fallback: ${window.fallbackLang}`);
      const fallbackNotice = document.getElementById('fallback-notice');
      if (fallbackNotice) fallbackNotice.style.display = 'block';

      return loadTranslations(window.fallbackLang).then(fallbackTranslations => {
        window.translations = fallbackTranslations;
        localizeText(fallbackTranslations);
      });
    })
    .catch(err => console.error('❌ Ошибка загрузки переводов:', err));
}

// Универсальная функция смены языка
function changeLanguage(lang) {
  const url = new URL(window.location.href);
  url.searchParams.set('lang', lang);
  window.location.href = url.toString();
}

// Позволяет обращаться к переводам вручную (например, в массивы, модалки, интерактивные блоки)
function i18n(key) {
  return window.translations?.[key] || `[${key}]`;
}

