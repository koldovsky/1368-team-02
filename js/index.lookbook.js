const images = document.querySelectorAll(".lookbook__image");
const modal = document.querySelector(".lookbook__modal");
const modalImg = document.querySelector(".lookbook__modal__content");
const closeBtn = document.querySelector(".lookbook__modal__close");
const prevBtn = document.querySelector(".lookbook__modal__prev");
const nextBtn = document.querySelector(".lookbook__modal__next");

let currentIndex = 0;
const imageArray = Array.from(images).map((img) => img.src);

function openModal(index) {
  currentIndex = index;
  modalImg.src = imageArray[currentIndex];
  modal.style.display = "flex";
  modal.style.justifyContent = "center";
  modal.style.alignItems = "center";
  // Disable background scrolling
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.style.display = "none";
  // Restore background scrolling
  document.body.style.overflow = "";
}

// Add click events for all images
images.forEach((image, index) => {
  image.addEventListener("click", () => {
    openModal(index);
  });
});

// Close modal when close button is clicked
closeBtn.addEventListener("click", closeModal);

// Navigate to previous image
prevBtn.addEventListener("click", (event) => {
  event.stopPropagation(); // Prevent modal click event from firing
  currentIndex = (currentIndex - 1 + imageArray.length) % imageArray.length;
  modalImg.src = imageArray[currentIndex];
});

// Navigate to next image
nextBtn.addEventListener("click", (event) => {
  event.stopPropagation();
  currentIndex = (currentIndex + 1) % imageArray.length;
  modalImg.src = imageArray[currentIndex];
});

// Close modal if clicking outside the image and arrows
modal.addEventListener("click", event => {
  if (event.target === modal) {
    closeModal();
  }
});

// Keyboard event listener for arrow keys and Escape key
document.addEventListener("keydown", (event) => {
  // Only run these if the modal is visible
  if (modal.style.display === "flex") {
    if (event.key === "ArrowLeft") {
      currentIndex = (currentIndex - 1 + imageArray.length) % imageArray.length;
      modalImg.src = imageArray[currentIndex];
    } else if (event.key === "ArrowRight") {
      currentIndex = (currentIndex + 1) % imageArray.length;
      modalImg.src = imageArray[currentIndex];
    } else if (event.key === "Escape") {
      closeModal();
    }
  }
});