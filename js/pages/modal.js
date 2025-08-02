if (typeof t === "undefined") {
  var t = (key) => (typeof translations !== "undefined" && translations[key]) || key;
}

// ✅ Проверка наличия modalContent
if (typeof modalContent === "undefined") {
  var modalContent = {
    // --- Автоматизируемые процессы ---
    forms: {
      titleKey: "automation.modal.forms_title",
      descKey: "automation.modal.forms_desc",
      ctaUrl: "/pages/solutions.html#forms"
    },
    docs: {
      titleKey: "automation.modal.docs_title",
      descKey: "automation.modal.docs_desc",
      ctaUrl: "/pages/solutions.html#docs"
    },
    images: {
      titleKey: "automation.modal.images_title",
      descKey: "automation.modal.images_desc",
      ctaUrl: "/pages/solutions.html#images"
    },
    email: {
      titleKey: "automation.modal.email_title",
      descKey: "automation.modal.email_desc",
      ctaUrl: "/pages/solutions.html#email"
    },
    hr: {
      titleKey: "automation.modal.hr_title",
      descKey: "automation.modal.hr_desc",
      ctaUrl: "/pages/solutions.html#hr"
    },
    reports: {
      titleKey: "automation.modal.reports_title",
      descKey: "automation.modal.reports_desc",
      ctaUrl: "/pages/solutions.html#finance"
    },

    // --- Преимущества ---
    docs_benefit: {
      titleKey: "automation.modal.docs_benefit_title",
      descKey: "automation.modal.docs_benefit_desc",
      ctaUrl: "/pages/no-tech-skills.html#docs_benefit"
    },
    reports_benefit: {
      titleKey: "automation.modal.reports_benefit_title",
      descKey: "automation.modal.reports_benefit_desc",
      ctaUrl: "/pages/no-tech-skills.html#reports_benefit"
    },
    email_benefit: {
      titleKey: "automation.modal.email_benefit_title",
      descKey: "automation.modal.email_benefit_desc",
      ctaUrl: "/pages/no-tech-skills.html#email_benefit"
    },
    hr_benefit: {
      titleKey: "automation.modal.hr_benefit_title",
      descKey: "automation.modal.hr_benefit_desc",
      ctaUrl: "/pages/no-tech-skills.html#hr_benefit"
    }
  };
}

// ✅ Проверка наличия функции
if (typeof openModal === "undefined") {
  function openModal(id) {
    const data = modalContent[id];
    if (!data) {
      console.warn(`[Modal] Нет данных для ID: "${id}". Проверь modalContent.`);
      return;
    }

    const overlay = document.createElement("div");
    overlay.className = "modal-overlay active";

    overlay.innerHTML = `
      <div class="modal-window">
        <button class="modal-close" aria-label="Закрыть окно">×</button>
        <h3>${t(data.titleKey)}</h3>
        <p>${t(data.descKey)}</p>
        <a href="${data.ctaUrl}" class="modal-cta-btn" target="_blank" rel="noopener">${t("automation.modal.cta_more")}</a>
      </div>
    `;
    document.body.appendChild(overlay);

    const modalWindow = overlay.querySelector(".modal-window");

    gsap.fromTo(modalWindow, { opacity: 0, y: -40, scale: 0.9 }, {
      opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "power2.out"
    });

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

    overlay.querySelector(".modal-close").addEventListener("click", close);
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) close();
    });
    document.addEventListener("keydown", onEsc);
  }
}

console.info("[Modal.js] Загружен успешно.");
document.addEventListener("DOMContentLoaded", () => {
  const testButton = document.querySelector("[onclick^='openModal']");
  if (!testButton) {
    console.warn("[Modal.js] Не найдено ни одного элемента с openModal(). Убедитесь, что файл подключён на нужной странице.");
  }
});
