// Скрипт для страницы AI‑решения для бизнеса

 function changeLanguage(lang) {
    const url = new URL(window.location.href);
    url.searchParams.set("lang", lang);
    window.location.href = url.toString();
  }

 