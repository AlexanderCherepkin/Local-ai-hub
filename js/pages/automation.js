// Скрипт для страницы Автоматизация процессов

// Web Audio — создаётся только при пользовательском взаимодействии
let audioCtx = null;

function playHoverSound(type = "default") {
  if (!audioCtx) {
    try {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {
      console.warn("AudioContext не поддерживается:", e);
      return;
    }
  }

  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.connect(gain);
  gain.connect(audioCtx.destination);

  const settings = {
    click: { type: "square", freq: 800, gain: 0.1, dur: 0.05 },
    soft: { type: "sine", freq: 440, gain: 0.03, dur: 0.3 },
    default: { type: "triangle", freq: 620, gain: 0.07, dur: 0.1 }
  };

  const { type: wave, freq, gain: volume, dur } = settings[type] || settings.default;
  osc.type = wave;
  osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
  gain.gain.setValueAtTime(volume, audioCtx.currentTime);
  osc.start();
  osc.stop(audioCtx.currentTime + dur);
}

function createRippleEffect(e) {
  const target = e.currentTarget;
  const circle = document.createElement("span");
  const diameter = Math.max(target.clientWidth, target.clientHeight);
  const radius = diameter / 2;
  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${e.clientX - target.getBoundingClientRect().left - radius}px`;
  circle.style.top = `${e.clientY - target.getBoundingClientRect().top - radius}px`;
  circle.classList.add("ripple-effect");
  const existing = target.querySelector(".ripple-effect");
  if (existing) existing.remove();
  target.appendChild(circle);
}

function changeLanguage(lang) {
  const url = new URL(window.location.href);
  url.searchParams.set("lang", lang);
  window.location.href = url.toString();
}

// ==== Hero Canvas ====
const canvas = document.getElementById("hero-canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 7.5;
    this.speedX = Math.random() * 5 - 0.5;
    this.speedY = Math.random() * 5 - 0.5;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
  }

  draw() {
    ctx.fillStyle = "rgba(0, 255, 255, 0.5)";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

let particlesArray = [];
function initParticles() {
  particlesArray = Array.from({ length: 100 }, () => new Particle());
}
function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particlesArray.forEach((p) => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animateParticles);
}
initParticles();
animateParticles();

// ==== GSAP Animations ====
document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  const fadeUp = (selector, delayStep = 0.1) => {
    gsap.utils.toArray(selector).forEach((el, i) => {
      gsap.from(el, {
        scrollTrigger: { trigger: el, start: "top 90%" },
        opacity: 0,
        y: 60,
        duration: 0.6,
        delay: i * delayStep,
        ease: "power2.out"
      });
    });
  };

  fadeUp(".pain-card, .gain-card");
  fadeUp(".card, .benefit-item");

  gsap.from(".gallery-item", {
    scrollTrigger: { trigger: ".gallery-grid", start: "top 80%" },
    opacity: 0,
    scale: 0.8,
    duration: 1,
    stagger: 0.2,
    ease: "back.out(1.7)"
  });

  gsap.to(".cta-section h2", {
    repeat: -1,
    yoyo: true,
    opacity: 0.85,
    duration: 0.07,
    ease: "rough({strength: 1, points: 20, taper: 'none', randomize: true})"
  });

  document.querySelectorAll(".card, .benefit-item").forEach((el, i) => {
    const emoji = el.querySelector(".emoji");

    if (emoji) {
      gsap.from(emoji, {
        scrollTrigger: { trigger: el, start: "top 90%" },
        scale: 0,
        opacity: 0,
        duration: 0.4,
        delay: i * 0.15,
        ease: "back.out(1.7)"
      });
    }

    el.addEventListener("mousemove", (e) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      el.style.transform = `rotateX(${y * -10}deg) rotateY(${x * 10}deg) scale(1.03)`;
    });

    el.addEventListener("mouseleave", () => {
      el.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
    });

    el.addEventListener("mouseenter", () => {
      if (audioCtx?.state === "suspended") {
        audioCtx.resume().then(() => playHoverSound());
      } else {
        playHoverSound();
      }
    });

    el.addEventListener("click", createRippleEffect);
  });

  // Lottie
  document.querySelectorAll(".emoji.lottie").forEach((container) => {
    const path = container.dataset.lottie;
    lottie.loadAnimation({
      container,
      renderer: "svg",
      loop: true,
      autoplay: true,
      path
    });
  });
});

// Mascot follow
const mascot = document.getElementById("mascot-container");
document.addEventListener("mousemove", (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 40;
  const y = (e.clientY / window.innerHeight - 0.5) * 40;
  mascot.style.transform = `translate(${x}px, ${y}px)`;
});

// 🔇 Отключаем воспроизведение звука полностью
function playHoverSound(type = "default") {}
