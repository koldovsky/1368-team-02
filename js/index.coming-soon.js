document.addEventListener("DOMContentLoaded", function () {
  setTimeout(initTyped, 1000);
});

document.addEventListener("htmx:afterOnLoad", function (event) {
  if (
    event.detail.elt.id === "comingsoon" ||
    event.detail.elt.classList.contains("coming-soon")
  ) {
    setTimeout(initTyped, 500);
  }
});

function initTyped() {
  const element = document.querySelector(".coming-soon__text");

  if (!element) {
    return;
  }

  try {
    element.innerHTML = "";

    new Typed(element, {
      strings: ["Experience", "Adventure", "Coming soon"],
      typeSpeed: 80,
      backSpeed: 50,
      backDelay: 1500,
      startDelay: 300,
      loop: true,
      cursorChar: "|",
    });
  } catch (error) {
    element.textContent = "Experience";
  }
}
