function init() {
    import("./shopping-cart.js").then(module => {
        module.initShoppingCart(); 
    }).catch(err => console.error("Помилка імпорту:", err));
}

const totalPartials = document.querySelectorAll(
    '[hx-trigger="load"], [data-hx-trigger="load"]'
).length;
let loadedPartialsCount = 0;

document.body.addEventListener("htmx:afterOnLoad", () => {
    loadedPartialsCount++;
    if (loadedPartialsCount === totalPartials) init();
});
