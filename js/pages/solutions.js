// Скрипт для страницы Готовые решения (Под ключ)

// Модальный контент
const modalContent = {
  forms: {
    titleKey: "automation.modal.forms_title",
    descKey: "automation.modal.forms_desc",
    ctaUrl: "https://otio.ai/blog/ai-budgeting-tools"
  },
  docs: {
    titleKey: "automation.modal.docs_title",
    descKey: "automation.modal.docs_desc",
    ctaUrl: "https://www.aidocmaker.com/"
  },
  images: {
    titleKey: "automation.modal.images_title",
    descKey: "automation.modal.images_desc",
    ctaUrl: "https://fritz.ai/best-ai-image-recognition-software/"
  },
  email: {
    titleKey: "automation.modal.email_title",
    descKey: "automation.modal.email_desc",
    ctaUrl: "https://customers.ai/blog/email-marketing-tools"
  },
  hr: {
    titleKey: "automation.modal.hr_title",
    descKey: "automation.modal.hr_desc",
    ctaUrl: "https://factorialhr.com/"
  },
  reports: {
    titleKey: "automation.modal.reports_title",
    descKey: "automation.modal.reports_desc",
    ctaUrl: "https://blog.coupler.io/"
  }
};

// Функция локализации
const t = (key) => translations?.[key] || key;

// Открытие модального окна
function openModal(id) {
  const data = modalContent[id];
  if (!data) return;

  const overlay = document.createElement("div");
  overlay.className = "modal-overlay active";

  // Создаём вручную элемент, чтобы обработчики точно навесились
  const modalWindow = document.createElement("div");
  modalWindow.className = "modal-window";
  modalWindow.innerHTML = `
    <button class="modal-close" aria-label="Закрыть окно">×</button>
    <h3>${t(data.titleKey)}</h3>
    <p>${t(data.descKey)}</p>
    <a href="${data.ctaUrl}" class="modal-cta-btn" target="_blank" rel="noopener">${t("automation.modal.cta_more")}</a>
  `;
  overlay.appendChild(modalWindow);
  document.body.appendChild(overlay);

  // GSAP появление
  gsap.fromTo(modalWindow, { opacity: 0, y: -40, scale: 0.9 }, {
    opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "power2.out"
  });

  // Закрытие
  function close() {
    gsap.to(modalWindow, {
      opacity: 0, y: -30, scale: 0.95, duration: 0.3, ease: "power2.in",
      onComplete: () => overlay.remove()
    });
    document.removeEventListener("keydown", onEsc);
  }

  function onEsc(e) {
    if (e.key === "Escape") close();
  }

  // Навешиваем обработчики
  modalWindow.querySelector(".modal-close").addEventListener("click", close);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) close();
  });
  document.addEventListener("keydown", onEsc);
}


document.addEventListener('DOMContentLoaded', () => {
  // GSAP hover
  document.querySelectorAll('.solution-block').forEach(block => {
    block.addEventListener('mouseenter', () => {
      gsap.to(block, { scale: 1.02, boxShadow: '0 8px 24px rgba(0,0,0,0.1)', duration: 0.3 });
    });
    block.addEventListener('mouseleave', () => {
      gsap.to(block, { scale: 1, boxShadow: '0 0 0 rgba(0,0,0,0)', duration: 0.3 });
    });
  });

  // Ripple
  document.querySelectorAll('.cta-btn').forEach(button => {
    button.addEventListener('click', function (e) {
      const ripple = document.createElement('span');
      ripple.classList.add('ripple');
      this.appendChild(ripple);

      const maxDim = Math.max(this.offsetWidth, this.offsetHeight);
      ripple.style.width = ripple.style.height = maxDim + 'px';

      ripple.style.left = e.offsetX - maxDim / 2 + 'px';
      ripple.style.top = e.offsetY - maxDim / 2 + 'px';

      setTimeout(() => ripple.remove(), 600);
    });
  });
});

