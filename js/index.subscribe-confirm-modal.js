// Wait for modal to be loaded
let subscribeModal = null;
let closeSubscribeModalBtn = null;
let submitSubscribeModalBtn = null;

const modalObserver = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.addedNodes.length) {
      subscribeModal = document.querySelector(".subscribe-confirm-modal");
      if (subscribeModal) {
        closeSubscribeModalBtn = document.querySelector(".modal__close");
        submitSubscribeModalBtn = document.querySelector(".modal__button--confirm");
        
        if (closeSubscribeModalBtn && submitSubscribeModalBtn) {
          closeSubscribeModalBtn.addEventListener("click", () => {
            subscribeModal.close();
            document.body.style.overflow = "";
          });

          submitSubscribeModalBtn.addEventListener("click", () => {
            subscribeModal.close();
            document.body.style.overflow = "";
          });

          window.addEventListener("click", (e) => {
            if (e.target === subscribeModal) {
              subscribeModal.close();
              document.body.style.overflow = "";
            }
          });
          
          modalObserver.disconnect();
        }
      }
    }
  });
});

modalObserver.observe(document.body, {
  childList: true,
  subtree: true
});