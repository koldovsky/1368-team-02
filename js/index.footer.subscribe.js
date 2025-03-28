document.addEventListener("DOMContentLoaded", function () {
  setTimeout(function () {
    const form = document.querySelector(".footer__form");
    const modal = document.querySelector(".subscribe-confirm-modal");

    if (!form || !modal) {
      return;
    }

    if (typeof modal.close === "function") {
      modal.close();
    }

    const closeBtn = modal.querySelector(".modal__close");
    const confirmBtn = modal.querySelector(".modal__button--confirm");

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const emailInput = form.querySelector('input[type="email"]');
      const email = emailInput.value.trim();

      if (email) {
        modal.showModal();
        form.reset();
      }
    });

    function closeModal() {
      if (typeof modal.close === "function") {
        modal.close();
      }
    }

    if (closeBtn) {
      closeBtn.addEventListener("click", closeModal);
    }

    if (confirmBtn) {
      confirmBtn.addEventListener("click", closeModal);
    }

    modal.addEventListener("click", function (e) {
      const dialogDimensions = modal.getBoundingClientRect();
      if (
        e.clientX < dialogDimensions.left ||
        e.clientX > dialogDimensions.right ||
        e.clientY < dialogDimensions.top ||
        e.clientY > dialogDimensions.bottom
      ) {
        closeModal();
      }
    });
  }, 500);
});
