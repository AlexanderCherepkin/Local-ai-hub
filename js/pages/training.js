// Скрипт для страницы Обучение и адаптация

// js/animation.js

gsap.registerPlugin(ScrollTrigger);

const fadeUp = (selector, delay = 0) => {
  gsap.from(selector, {
    scrollTrigger: {
      trigger: selector,
      start: "top 90%",
      toggleActions: "play none none none",
    },
    y: 40,
    opacity: 0,
    duration: 0.8,
    delay: delay,
    ease: "power2.out"
  });
};

// Apply animations
fadeUp("#courses");
fadeUp("#categories", 0.2);
fadeUp("#cta", 0.4);

// Дополнительно — анимация для карточек внутри секций
gsap.utils.toArray(".course-card, .category-box").forEach((card, index) => {
  gsap.from(card, {
    scrollTrigger: {
      trigger: card,
      start: "top 95%",
      toggleActions: "play none none none",
    },
    y: 30,
    opacity: 0,
    duration: 0.6,
    delay: index * 0.1,
    ease: "power2.out"
  });
});

document.querySelectorAll('.lottie[data-lottie]').forEach(el => {
  const path = el.dataset.lottie;
  lottie.loadAnimation({
    container: el,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path
  });
});
