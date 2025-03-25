const modal = document.getElementById("shoppingCartModal");
const openModalBtn = document.querySelector(".open-modal-btn");
const closeModal = document.querySelector(".modal__close");
const promo = document.querySelector(".shopping-cart__promocode");
const inputBlock = document.querySelector(".shopping-cart__promocode__input-block");

openModalBtn.addEventListener("click", () => {
    modal.style.display = "block";
    document.body.style.overflow = "hidden";
});

closeModal.addEventListener("click", () => {
    document.body.style.overflow = "";
    console.log("close");
});

promo.addEventListener("click", () => {
    inputBlock.style.display = inputBlock.style.display === "flex" ? "none" : "flex";
});

window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
        document.body.style.overflow = "";
    }
});

