export function initShoppingCart() {
    const modal = document.getElementById("shoppingCartModal");
    const openModalBtn = document.querySelector(".open-modal-btn");
    const closeModal = document.querySelector(".modal__close");

    openModalBtn.addEventListener("click", () => {
        modal.style.display = "block";
    });

    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
    });

    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });
};
