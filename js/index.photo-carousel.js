const slides = [
  '<div><img class="photo-carousel__image" src="img/photo-carousel/photo-carousel-black-lace-bra-closeup.webp" alt="Close-up of a black lace bra"></div>',
  '<div><img class="photo-carousel__image" src="img/photo-carousel/photo-carousel-black-lace-bra.webp" alt="Black lace bra"></div>',
  '<div><img class="photo-carousel__image" src="img/photo-carousel/photo-carousel-black-lingerie-set.webp" alt="Black lingerie set"></div>',
  '<div><img class="photo-carousel__image" src="img/photo-carousel/photo-carousel-white-bra-blazer.webp" alt="White bra under blazer"></div>',
  '<div><img class="photo-carousel__image" src="img/photo-carousel/photo-carousel-white-combo.webp" alt="White lingerie combination"></div>',
  '<div><img class="photo-carousel__image" src="img/photo-carousel/photo-carousel-white-combo-balcony.webp" alt="White lingerie set with a balcony bra"></div>',
];

let currentSlideIdx = 0;
let isTransitioning = false;

function showSlide() {
  if (isTransitioning) return;
  isTransitioning = true;
  
  console.log('Showing slide:', currentSlideIdx);
  const slideContainer = document.querySelector(".photo-carousel__images");
  const slidesContainer = document.createElement('div');
  slidesContainer.style.display = 'flex';
  slidesContainer.style.width = '100%';
  
  // Add current slide
  slidesContainer.innerHTML = slides[currentSlideIdx];
  
  // Add responsive slides
  if (window.matchMedia("(min-width: 479px)").matches) {
    const secondSlideIdx = (currentSlideIdx + 1) % slides.length;
    slidesContainer.innerHTML += slides[secondSlideIdx];
    
    if (window.matchMedia("(min-width: 768px)").matches) {
      const thirdSlideIdx = (secondSlideIdx + 1) % slides.length;
      slidesContainer.innerHTML += slides[thirdSlideIdx];
      
      if (window.matchMedia("(min-width: 991px)").matches) {
        const fourthSlideIdx = (thirdSlideIdx + 1) % slides.length;
        slidesContainer.innerHTML += slides[fourthSlideIdx];
        const fifthSlideIdx = (fourthSlideIdx + 1) % slides.length;
        slidesContainer.innerHTML += slides[fifthSlideIdx];
      }
    }
  }

  // Preload images
  const images = slidesContainer.getElementsByTagName('img');
  const imagePromises = Array.from(images).map(img => {
    return new Promise((resolve) => {
      if (img.complete) resolve();
      img.onload = resolve;
    });
  });

  Promise.all(imagePromises).then(() => {
    slideContainer.innerHTML = slidesContainer.innerHTML;
    isTransitioning = false;
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

showSlide();

const nextButton = document.querySelector(".photo-carousel__button--prev");
const prevButton = document.querySelector(".photo-carousel__button--next");
nextButton.addEventListener("click", nextSlide);
prevButton.addEventListener("click", prevSlide);

window.addEventListener("resize", showSlide);
