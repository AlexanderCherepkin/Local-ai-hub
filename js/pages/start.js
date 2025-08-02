let flipInterval = null; // 🔁 глобальная переменная для интервала

function changeLanguage(lang) {
  localStorage.setItem("selectedLang", lang);
  localizePage(lang).then(() => {
    updateFlipContent(lang); // Перезапуск с новым языком
  });

  document.querySelectorAll(".lang-switch button").forEach(btn => {
    btn.classList.remove("active");
    if (btn.getAttribute("onclick").includes(`'${lang}'`)) {
      btn.classList.add("active");
    }
  });
}

// Обновление контента с анимацией переворота
function updateFlipContent(lang) {
  const titles = [
    i18n("start.flip_titles.0"),
    i18n("start.flip_titles.1"),
    i18n("start.flip_titles.2"),
    i18n("start.flip_titles.3"),
    i18n("start.flip_titles.4")
  ];

  const texts = [
    i18n("start.flip_texts.0"),
    i18n("start.flip_texts.1"),
    i18n("start.flip_texts.2"),
    i18n("start.flip_texts.3"),
    i18n("start.flip_texts.4")
  ];

  let index = 0;
  const flipBlock = document.getElementById("flipBlock");
  const flipTitle = document.getElementById("flipTitle");
  const flipText = document.getElementById("flipText");

  // ❌ Очищаем предыдущий интервал, если был
  if (flipInterval) {
    clearInterval(flipInterval);
  }

  // ✅ Запускаем новый
  flipInterval = setInterval(() => {
    flipBlock.style.animation = "flipPage 1.8s ease";

    setTimeout(() => {
      index = (index + 1) % titles.length;
      flipTitle.textContent = titles[index];
      flipText.textContent = texts[index];
    }, 1000);

    setTimeout(() => {
      flipBlock.style.animation = "";
    }, 2000);
  }, 8000);

  // 🟢 Показываем первую пару сразу, не дожидаясь 8 сек
  flipTitle.textContent = titles[0];
  flipText.textContent = texts[0];
}

// Основной запуск
const lang = new URLSearchParams(window.location.search).get("lang") || localStorage.getItem("selectedLang") || "ru";
localizePage(lang).then(() => {
  updateFlipContent(lang);
});
