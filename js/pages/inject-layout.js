
window.addEventListener("DOMContentLoaded", () => {
  const loadFragment = (url, targetSelector) => {
    return fetch(url)
      .then(res => {
        if (!res.ok) throw new Error(`Ошибка загрузки ${url}`);
        return res.text();
      })
      .then(html => {
        const target = document.querySelector(targetSelector);
        if (target) {
          // CLS-фикс: вставка через requestAnimationFrame
          requestAnimationFrame(() => {
            target.innerHTML = html;
          });
        }
      })
      .catch(err => console.error(`[inject-layout] ${err.message}`));
  };

  const lang = new URLSearchParams(window.location.search).get("lang") || "ru";

  Promise.all([
    loadFragment("../header.html", "#header-container"),
    loadFragment("../footer.html", "#footer-container")
  ]).then(() => {
    // CLS-фикс: откладываем перевод до момента простоя
    requestIdleCallback(() => {
      if (typeof localizePage === "function") {
        localizePage(lang);
      }
    });
  });
});
