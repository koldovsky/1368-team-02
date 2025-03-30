const slides = [
  `<div class="bestsellers-carousel-image__wrapper">
    <img class="bestsellers-carousel__image" src="img/bestsellers-carousel/bestsellers_carousel_basic.png">
    <p class="bestsellers-carousel__label">Basic</p>
    <button class="bestsellers-carousel__browse-button" id="bestseller-1">Buy</button>
  </div>`,
  `<div class="bestsellers-carousel-image__wrapper">
    <img class="bestsellers-carousel__image" src="img/bestsellers-carousel/bestsellers_carousel_limited.png">
    <p class="bestsellers-carousel__label">Limited</p>
    <button class="bestsellers-carousel__browse-button" id="bestseller-2">Buy</button>
  </div>`,
  `<div class="bestsellers-carousel-image__wrapper">
    <img class="bestsellers-carousel__image" src="img/bestsellers-carousel/bestsellers_carousel_sets.png">
    <p class="bestsellers-carousel__label">Sets</p>
    <button class="bestsellers-carousel__browse-button" id="bestseller-3">Buy</button>
  </div>`,
 `<div class="bestsellers-carousel-image__wrapper">
    <img class="bestsellers-carousel__image" src="img/bestsellers-carousel/bestsellers_carousel_swimwear.png">
    <p class="bestsellers-carousel__label">Swimwear</p>
    <button class="bestsellers-carousel__browse-button" id="bestseller-4">Buy</button>
  </div>`,
];

let currentSlideIdx = 0;
function showSlide() {
  const slideContainer = document.querySelector(
    ".bestsellers-carousel__wrapper"
  );
  slideContainer.innerHTML = slides[currentSlideIdx];
  if (window.matchMedia("(min-width: 768px)").matches) {
    const secondSlideIdx = slides[(currentSlideIdx + 1) % slides.length];
    slideContainer.innerHTML += secondSlideIdx;
  }
  if (window.matchMedia("(min-width: 1024px)").matches) {
    const thirdSlideIdx = slides[(currentSlideIdx + 2) % slides.length];
    slideContainer.innerHTML += thirdSlideIdx;
  }
}

function nextSlide() {
  currentSlideIdx = (currentSlideIdx + 1) % slides.length;
  showSlide();
}

function prevSlide() {
  currentSlideIdx = (currentSlideIdx - 1 + slides.length) % slides.length;
  showSlide();
}

showSlide();

const nextButton = document.querySelector(
  ".bestsellers-carousel__button--next"
);
const prevButton = document.querySelector(
  ".bestsellers-carousel__button--prev"
);
nextButton.addEventListener("click", nextSlide);
prevButton.addEventListener("click", prevSlide);

window.addEventListener("resize", showSlide);
