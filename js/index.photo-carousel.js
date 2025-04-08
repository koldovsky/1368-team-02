const slides = [
  '<div class="photo-carousel__slide"><img class="photo-carousel__image" src="img/photo-carousel/photo-carousel-black-lace-bra-closeup.webp" alt="Close-up of a black lace bra"></div>',
  '<div class="photo-carousel__slide"><img class="photo-carousel__image" src="img/photo-carousel/photo-carousel-black-lace-bra.webp" alt="Black lace bra"></div>',
  '<div class="photo-carousel__slide"><img class="photo-carousel__image" src="img/photo-carousel/photo-carousel-black-lingerie-set.webp" alt="Black lingerie set"></div>',
  '<div class="photo-carousel__slide"><img class="photo-carousel__image" src="img/photo-carousel/photo-carousel-white-bra-blazer.webp" alt="White bra under blazer"></div>',
  '<div class="photo-carousel__slide"><img class="photo-carousel__image" src="img/photo-carousel/photo-carousel-white-combo.webp" alt="White lingerie combination"></div>',
  '<div class="photo-carousel__slide"><img class="photo-carousel__image" src="img/photo-carousel/photo-carousel-white-combo-balcony.webp" alt="White lingerie set with a balcony bra"></div>',
];

let currentSlideIdx = 0;
let isTransitioning = false;
let slideWidth = 0;
let visibleSlides = 1;
let cloneCount = 0;

function initCarousel() {
  const slideContainer = document.querySelector(".photo-carousel__images");
  slideContainer.innerHTML = "";

  slides.forEach((slide, index) => {
    const slideElement = document.createElement("div");
    slideElement.innerHTML = slide;
    slideElement.firstChild.classList.add(`photo-carousel__slide--${index}`);
    slideElement.firstChild.dataset.index = index;
    slideContainer.appendChild(slideElement.firstChild);
  });

  addClones();
  updateVisibleSlides();
  scrollToSlide(currentSlideIdx, false);
}

const slideContainer = document.querySelector(".photo-carousel__images");
function addClones() {
  cloneCount = Math.max(5, visibleSlides * 2);

  for (let i = 0; i < cloneCount; i++) {
    const index = i % slides.length;
    const original = slideContainer.querySelector(`[data-index="${index}"]`);
    if (original) {
      const clone = original.cloneNode(true);
      clone.classList.add("clone");
      clone.classList.remove("original");
      slideContainer.appendChild(clone);
    }
  }

  for (
    let i = slides.length - 1;
    i >= Math.max(0, slides.length - cloneCount);
    i--
  ) {
    const original = slideContainer.querySelector(`[data-index="${i}"]`);
    if (original) {
      const clone = original.cloneNode(true);
      clone.classList.add("clone");
      clone.classList.remove("original");
      slideContainer.prepend(clone);
    }
  }

  currentSlideIdx = cloneCount;
  scrollToSlide(currentSlideIdx, false);
}

function updateVisibleSlides() {
  if (window.matchMedia("(min-width: 991px)").matches) {
    visibleSlides = 5;
  } else if (window.matchMedia("(min-width: 768px)").matches) {
    visibleSlides = 3;
  } else if (window.matchMedia("(min-width: 479px)").matches) {
    visibleSlides = 2;
  } else {
    visibleSlides = 1;
  }

  const slideElements = document.querySelectorAll(".photo-carousel__slide");
  const containerWidth = document.querySelector(
    ".photo-carousel__wrapper"
  ).offsetWidth;
  slideWidth = containerWidth / visibleSlides;

  slideElements.forEach((slide) => {
    slide.style.minWidth = `${slideWidth}px`;
  });
}

function handleTransitionEnd() {
  const totalOriginalSlides = slides.length;

  if (currentSlideIdx < cloneCount) {
    const newPosition = totalOriginalSlides + currentSlideIdx;
    scrollToSlide(newPosition, false);
  } else if (currentSlideIdx >= cloneCount + totalOriginalSlides) {
    const offset = currentSlideIdx - cloneCount - totalOriginalSlides;
    scrollToSlide(cloneCount + (offset % totalOriginalSlides), false);
  }
}

function setupInfiniteScroll() {
  const slideContainer = document.querySelector(".photo-carousel__images");
  const totalSlides = slideContainer.children.length;

  if (currentSlideIdx >= totalSlides - visibleSlides) {
    currentSlideIdx = 0;
    scrollToSlide(currentSlideIdx, false);
  }
}

function scrollToSlide(index, animate = true) {
  if (isTransitioning && animate) return;

  currentSlideIdx = index;
  const position = -currentSlideIdx * slideWidth;

  if (!animate) {
    slideContainer.style.transition = "none";
    slideContainer.style.transform = `translateX(${position}px)`;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        slideContainer.style.transition =
          "transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)";
      });
    });

    return;
  }

  isTransitioning = true;
  slideContainer.style.transform = `translateX(${position}px)`;

  setTimeout(() => {
    isTransitioning = false;
  }, 800);
}

function nextSlide() {
  if (isTransitioning) return;
  currentSlideIdx++;
  scrollToSlide(currentSlideIdx);
}

function prevSlide() {
  if (isTransitioning) return;
  currentSlideIdx--;
  scrollToSlide(currentSlideIdx);
}

initCarousel();

const prevButton = document.querySelector(".photo-carousel__button--prev");
const nextButton = document.querySelector(".photo-carousel__button--next");
prevButton.addEventListener("click", prevSlide);
nextButton.addEventListener("click", nextSlide);

window.addEventListener("resize", () => {
  updateVisibleSlides();
  setupInfiniteScroll();
});

let autoplayInterval = setInterval(nextSlide, 3000);

const carousel = document.querySelector(".photo-carousel");
carousel.addEventListener("mouseenter", () => {
  clearInterval(autoplayInterval);
});

carousel.addEventListener("mouseleave", () => {
  autoplayInterval = setInterval(nextSlide, 3000);
});

slideContainer.addEventListener("transitionend", handleTransitionEnd);
