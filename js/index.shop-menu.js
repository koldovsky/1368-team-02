document.querySelectorAll(".bestsellers-carousel__browse-button").forEach(button => {
    button.addEventListener("click", () => {
      document.querySelector(".shop-menu__buy-button").classList.add("visible");
    });
});

const cartButton = document.querySelector(".shop-menu__buy-button");
const shopMenu = document.querySelector(".shop-menu__container");
const cartCounter = document.querySelector(".shop-menu__counter");

const buyButtons = document.querySelectorAll(".bestsellers-carousel__browse-button");

const addBuyButtonListeners = () => {
  buyButtons.forEach(button => {
    button.addEventListener("click", () => {
      cartButton.classList.add("visible");
    });
  });
};

document.addEventListener("DOMContentLoaded", addBuyButtonListeners);

document.addEventListener("htmx:afterSwap", addBuyButtonListeners);

const showShopMenu = () => {
  shopMenu.classList.add("visible");
  cartButton.classList.add("hidden");

  document.body.style.overflow = "hidden";
};

const hideShopMenu = () => {
  shopMenu.classList.remove("visible");
  cartButton.classList.remove("hidden");

  document.body.style.overflow = "";
};

cartButton.addEventListener("click", showShopMenu);

shopMenu.addEventListener("click", (event) => {
  if (!event.target.closest(".shop-menu__content")) {
    hideShopMenu();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    hideShopMenu();
  }
});


let cartCount = 0;
buyButtons.forEach(button => {
  button.addEventListener("click", () => {
    updateCartCounter();
  });
});

// Масив товарів
const products = [
  {
    id: "bestseller-1",
    name: "Basic Lingerie",
    price: "49.99$",
    image: "img/bestsellers-carousel/bestsellers_carousel_basic.png"
  },
  {
    id: "bestseller-2",
    name: "Limited Edition",
    price: "59.99$",
    image: "img/bestsellers-carousel/bestsellers_carousel_limited.png"
  },
  {
    id: "bestseller-3",
    name: "Lingerie Sets",
    price: "69.99$",
    image: "img/bestsellers-carousel/bestsellers_carousel_sets.png"
  },
  {
    id: "bestseller-4",
    name: "Swimwear",
    price: "39.99$",
    image: "img/bestsellers-carousel/bestsellers_carousel_swimwear.png"
  }
];

const shopMenuProducts = document.querySelector(".shop-menu__content__products");

const updateCartCounter = () => {
  cartCounter.textContent = cartCount;
  cartCounter.classList.toggle("visible", cartCount > 0);

  hideCartButtonAfterDelay();
};

const addToCart = (productId) => {
  const product = products.find(item => item.id === productId);

  if (product) {
    // Створюємо новий елемент товару
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

    // Додаємо товар у контейнер
    shopMenuProducts.appendChild(productElement);
    cartCount++;
    updateCartCounter();
    updateTotalAmount(); // Оновлюємо загальну суму

    // Додаємо функціонал для видалення товару
    productElement.querySelector(".shop-menu__remove-button").addEventListener("click", (event) => {
      event.stopPropagation();
      productElement.remove();
      cartCount--;
      updateCartCounter();
      updateTotalAmount(); // Оновлюємо загальну суму
    });
  }
};

// Функція для оновлення загальної суми
const updateTotalAmount = () => {
  let total = 0;

  // Обчислюємо загальну суму
  document.querySelectorAll(".shop-menu__product-price").forEach(priceElement => {
    const price = parseFloat(priceElement.textContent.replace("$", ""));
    total += price;
  });

  // Оновлюємо відображення суми
  const totalAmountElement = document.querySelector(".shop-menu__total-amount");
  totalAmountElement.textContent = `$${total.toFixed(2)}`;
};

// Додаємо обробники подій для кнопок "Buy"
document.querySelectorAll(".bestsellers-carousel__browse-button").forEach(button => {
  button.addEventListener("click", () => {
    addToCart(button.id);
  });
});

let hideButtonTimeout; // Таймер для приховування кнопки

const hideCartButtonAfterDelay = () => {
  // Якщо в кошику немає товарів
  if (cartCount === 0) {
    // Скидаємо попередній таймер, якщо він існує
    clearTimeout(hideButtonTimeout);

    // Запускаємо новий таймер на 7 секунд
    hideButtonTimeout = setTimeout(() => {
      cartButton.classList.remove("visible"); // Приховуємо кнопку
    }, 7000); // 7 секунд
  }
};
