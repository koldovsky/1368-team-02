function init() {
    import('./index.photo-carousel.js');
    import('./index.footer.subscribe.js')
    import('./index.coming-soon.js');
    import('./index.subscribe-confirm-modal.js');
    import('./index.shop-menu.js');
    import('./index.bestsellers-carousel.js');
}

const totalPartials = document.querySelectorAll(
  '[hx-trigger="load"], [data-hx-trigger="load"]'
).length;
let loadedPartialsCount = 0;

document.body.addEventListener("htmx:afterOnLoad", () => {
  loadedPartialsCount++;
  if (loadedPartialsCount === totalPartials) init();
});
