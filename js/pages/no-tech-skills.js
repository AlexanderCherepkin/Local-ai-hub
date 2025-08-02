// Скрипт для страницы Без технических знаний

document.querySelectorAll(".btn-secondary").forEach(btn => {
  btn.addEventListener("click", e => {
    const rect = btn.getBoundingClientRect();
    const rippleX = e.clientX - rect.left;
    const rippleY = e.clientY - rect.top;
    btn.style.setProperty("--ripple-x", `${rippleX}px`);
    btn.style.setProperty("--ripple-y", `${rippleY}px`);
  });
});

// Инициализация всех .lottie-блоков
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".lottie[data-lottie]").forEach(el => {
    const path = el.getAttribute("data-lottie");
    lottie.loadAnimation({
      container: el,
      renderer: "svg",
      loop: true,
      autoplay: true,
      path
    });
  });
});
