const slides = [
  `<div class="bestsellers-carousel__item">
    <div class="bestsellers-carousel__image-wrapper">
      <img class="bestsellers-carousel__image" src="img/bestsellers-carousel/bestsellers_carousel_basic.png" alt="Basic" />
      <div class="bestsellers-carousel__hover">
        <button class="bestsellers-carousel__browse-button" id="bestseller-1">Buy</button>
      </div>
    </div>
    <p class="bestsellers-carousel__label">Basic</p>
  </div>`,

  `<div class="bestsellers-carousel__item">
    <div class="bestsellers-carousel__image-wrapper">
      <img class="bestsellers-carousel__image" src="img/bestsellers-carousel/bestsellers_carousel_limited.png" alt="Limited" />
      <div class="bestsellers-carousel__hover">
        <button class="bestsellers-carousel__browse-button" id="bestseller-2">Buy</button>
      </div>
    </div>
    <p class="bestsellers-carousel__label">Limited</p>
  </div>`,

  `<div class="bestsellers-carousel__item">
    <div class="bestsellers-carousel__image-wrapper">
      <img class="bestsellers-carousel__image" src="img/bestsellers-carousel/bestsellers_carousel_sets.png" alt="Sets" />
      <div class="bestsellers-carousel__hover">
        <button class="bestsellers-carousel__browse-button" id="bestseller-3">Buy</button>
      </div>
    </div>
    <p class="bestsellers-carousel__label">Sets</p>
  </div>`,

  `<div class="bestsellers-carousel__item">
    <div class="bestsellers-carousel__image-wrapper">
      <img class="bestsellers-carousel__image" src="img/bestsellers-carousel/bestsellers_carousel_swimwear.png" alt="Swimwear" />
      <div class="bestsellers-carousel__hover">
        <button class="bestsellers-carousel__browse-button" id="bestseller-4">Buy</button>
      </div>
    </div>
    <p class="bestsellers-carousel__label">Swimwear</p>
  </div>`
];




const products = [
  { id: "bestseller-1", name: "Basic Lingerie", price: "49.99$", image: "img/bestsellers-carousel/bestsellers_carousel_basic.png" },
  { id: "bestseller-2", name: "Limited Edition", price: "59.99$", image: "img/bestsellers-carousel/bestsellers_carousel_limited.png" },
  { id: "bestseller-3", name: "Lingerie Sets", price: "69.99$", image: "img/bestsellers-carousel/bestsellers_carousel_sets.png" },
  { id: "bestseller-4", name: "Swimwear", price: "39.99$", image: "img/bestsellers-carousel/bestsellers_carousel_swimwear.png" }
];

let currentSlideIdx = 0;
let cartCount = 0;
let hideButtonTimeout;

const slideContainer = document.querySelector(".bestsellers-carousel__wrapper");
const cartButton = document.querySelector(".shop-menu__buy-button");
const cartCounter = document.querySelector(".shop-menu__counter");
const shopMenu = document.querySelector(".shop-menu__container");
const shopMenuProducts = document.querySelector(".shop-menu__content__products");
const totalAmountElement = document.querySelector(".shop-menu__total-amount");

// Рендер слайдів та прив'язка обробників
function showSlide() {
  slideContainer.innerHTML = slides[currentSlideIdx];

  if (window.matchMedia("(min-width: 768px)").matches) {
    slideContainer.innerHTML += slides[(currentSlideIdx + 1) % slides.length];
  }

  if (window.matchMedia("(min-width: 1024px)").matches) {
    slideContainer.innerHTML += slides[(currentSlideIdx + 2) % slides.length];
  }

  // Прив'язка кнопок "Buy" після рендера
  document.querySelectorAll(".bestsellers-carousel__browse-button").forEach(button => {
    button.addEventListener("click", () => {
      addToCart(button.id);
      cartButton.classList.add("visible");
    });
  });
}

function nextSlide() {
  currentSlideIdx = (currentSlideIdx + 1) % slides.length;
  showSlide();
}

function prevSlide() {
  currentSlideIdx = (currentSlideIdx - 1 + slides.length) % slides.length;
  showSlide();
}

document.querySelector(".bestsellers-carousel__button--next").addEventListener("click", nextSlide);
document.querySelector(".bestsellers-carousel__button--prev").addEventListener("click", prevSlide);
window.addEventListener("resize", showSlide);

// Додавання товару в кошик
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const productElement = document.createElement("div");
  productElement.classList.add("shop-menu__product");
  productElement.innerHTML = `
    <img class="shop-menu__product-image" src="${product.image}" alt="${product.name}">
    <div class="shop-menu__product-info">
      <p class="shop-menu__product-name">${product.name}</p>
      <p class="shop-menu__product-price">${product.price}</p>
    </div>
    <button class="shop-menu__remove-button">Remove</button>
  `;

  shopMenuProducts.appendChild(productElement);
  cartCount++;
  updateCartCounter();
  updateTotalAmount();

  productElement.querySelector(".shop-menu__remove-button").addEventListener("click", event => {
    event.stopPropagation();
    productElement.remove();
    cartCount--;
    updateCartCounter();
    updateTotalAmount();
  });
}

function updateCartCounter() {
  cartCounter.textContent = cartCount;
  cartCounter.classList.toggle("visible", cartCount > 0);
  hideCartButtonAfterDelay();
}

function updateTotalAmount() {
  let total = 0;
  document.querySelectorAll(".shop-menu__product-price").forEach(priceElement => {
    const price = parseFloat(priceElement.textContent.replace("$", ""));
    total += price;
  });
  totalAmountElement.textContent = `$${total.toFixed(2)}`;
}

function hideCartButtonAfterDelay() {
  if (cartCount > 0) return;

  clearTimeout(hideButtonTimeout);
  hideButtonTimeout = setTimeout(() => {
    cartButton.classList.remove("visible");
  }, 7000);
}

// Показ і приховування shop-menu
cartButton.addEventListener("click", () => {
  shopMenu.classList.add("visible");
  cartButton.classList.add("hidden");
  document.body.style.overflow = "hidden";
});

shopMenu.addEventListener("click", event => {
  if (!event.target.closest(".shop-menu__content")) {
    hideShopMenu();
  }
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    hideShopMenu();
  }
});

function hideShopMenu() {
  shopMenu.classList.remove("visible");
  cartButton.classList.remove("hidden");
  document.body.style.overflow = "";
}

// Стартова ініціалізація
showSlide();
