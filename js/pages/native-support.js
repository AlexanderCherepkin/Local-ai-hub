// Скрипт для страницы Поддержка на родном языке

function changeLanguage(lang) {
    const url = new URL(window.location.href);
    url.searchParams.set("lang", lang);
    window.location.href = url.toString();
  }
  
function openSupportModal(type) {
  const modalContainer = document.getElementById("support-modal-container");
  if (!modalContainer) return;

  const modalContent = {
    faq: `
      <div class="modal active" role="dialog" aria-modal="true">
        <div class="modal-overlay" onclick="closeSupportModal()"></div>
        <div class="modal-box">
          <h2 data-i18n="native-support.modal.faq">Частые вопросы</h2>
          <ul class="modal-list">
            <li><strong data-i18n="native-support.modal.q1">Как подключить AI-модуль?</strong><br data-i18n="native-support.modal.a1">Перейдите в раздел “Автоматизация” и выберите нужную опцию.</li>
            <li><strong data-i18n="native-support.modal.q2">Где изменить язык интерфейса?</strong><br data-i18n="native-support.modal.a2">Нажмите на значок 🌐 в правом верхнем углу.</li>
          </ul>
          <button class="modal-close" onclick="closeSupportModal()" data-i18n="native-support.modal.close">Закрыть</button>
        </div>
      </div>
    `,
    form: `
      <div class="modal active" role="dialog" aria-modal="true">
        <div class="modal-overlay" onclick="closeSupportModal()"></div>
        <div class="modal-box">
          <h2 data-i18n="native-support.modal.feedback">Форма обратной связи</h2>
          <form id="support-form">
            <input type="text" name="name" placeholder="Ваше имя" required data-i18n-placeholder="native-support.modal.name" />
            <input type="email" name="email" placeholder="Email" required data-i18n-placeholder="native-support.modal.email" />
            <textarea name="message" placeholder="Ваш вопрос или комментарий" required data-i18n-placeholder="native-support.modal.message"></textarea>
            <button type="submit" data-i18n="native-support.modal.send">Отправить</button>
          </form>
          <button class="modal-close" onclick="closeSupportModal()" data-i18n="native-support.modal.close">Закрыть</button>
        </div>
      </div>
    `,
   chat: `
  <div class="modal active" role="dialog" aria-modal="true">
    <div class="modal-overlay" onclick="closeSupportModal()"></div>
    <div class="modal-box">
      <h2 data-i18n="native-support.modal.chat">Чат с AI</h2>
      <p data-i18n="native-support.modal.chat-desc">Задайте свой вопрос — AI ответит в реальном времени.</p>

      <label style="display: flex; align-items: center; gap: 0.4rem; margin: 1rem 0;">
        <input type="checkbox" checked />
        <span data-i18n="native-support.modal.autoformat">Автоформатировать</span>
      </label>

      <div class="chat-error">
        <pre class="chat-log" style="font-size: 0.9rem; background: #eee; padding: 1rem; border-radius: 0.5rem;">
{
  "error": {
    "message": "Сообщение не получено."
  }
}
        </pre>
      </div>

      <!-- Место под iframe -->
      <!-- <iframe src="/chat" title="AI чат" style="width:100%; height:300px; border:none; border-radius:10px;"></iframe> -->

      <button class="modal-close" onclick="closeSupportModal()" data-i18n="native-support.modal.close">Закрыть</button>
    </div>
  </div>
`
,
  };

  modalContainer.innerHTML = modalContent[type] || "";
  localizePage(getCurrentLang());
}

function closeSupportModal() {
  const modalContainer = document.getElementById("support-modal-container");
  if (modalContainer) modalContainer.innerHTML = "";
}

// Используется в других скриптах
function getCurrentLang() {
  return new URLSearchParams(window.location.search).get("lang") || "ru";
}

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

