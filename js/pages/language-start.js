function localizePage(lang) {
  const translations = {
    ru: {
      "start.title": "Добро пожаловать!",
      "start.intro": "Вы готовы начать работу с нашей платформой. Выберите инструмент или услугу в меню выше.",
      "start.step1": "Выберите инструмент из меню",
      "start.step2": "Используйте AI-консультанта",
      "start.step3": "Получите мгновенные результаты"
    },
    en: {
      "start.title": "Welcome!",
      "start.intro": "You are ready to start using our platform. Choose a tool or service from the menu above.",
      "start.step1": "Choose a tool from the menu",
      "start.step2": "Use the AI assistant",
      "start.step3": "Get instant results"
    }
  };

  const dictionary = translations[lang] || translations["ru"];
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (dictionary[key]) {
      el.textContent = dictionary[key];
    }
  });
}
