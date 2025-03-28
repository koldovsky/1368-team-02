document.addEventListener("DOMContentLoaded", () => {
  const heroVideo = document.getElementById("heroVideo");

  heroVideo.play().catch(() => {});

  heroVideo.addEventListener("error", () => {
    const videoContainer = document.querySelector(".hero__video-container");
    if (videoContainer) {
      videoContainer.classList.add("video-error");
    }
  });

  document.querySelector(".hero__content").addEventListener("click", () => {
    if (heroVideo.paused) {
      heroVideo.play().catch(() => {});
    }
  });
});
