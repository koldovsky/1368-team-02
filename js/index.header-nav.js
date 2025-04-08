document.addEventListener("DOMContentLoaded", function () {
  initializeBurgerMenu();
});

document.addEventListener("htmx:afterSwap", function (event) {
  if (
    event.detail.target.matches("nav") ||
    event.detail.target.querySelector(".header__nav")
  ) {
    initializeBurgerMenu();
  }
});

setTimeout(function () {
  initializeBurgerMenu();
}, 500);

window.toggleMobileMenu = function () {
  const nav = document.querySelector(".header__nav");
  const burgerMenu = document.querySelector(".header__burger-menu");

  if (!nav || !burgerMenu) {
    return;
  }

  burgerMenu.classList.toggle("active");
  nav.classList.toggle("mobile-open");

  if (nav.classList.contains("mobile-open")) {
    document.body.classList.add("menu-open");
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
    setTimeout(() => {
      document.body.classList.remove("menu-open");
    }, 300);
  }
};

function initializeBurgerMenu() {
  const nav = document.querySelector(".header__nav");
  if (!nav) {
    return;
  }

  const burgerMenu = document.querySelector(".header__burger-menu");
  const menuLinks = document.querySelectorAll(".header__menu-link");

  if (burgerMenu) {
    burgerMenu.removeEventListener("click", window.toggleMobileMenu);

    burgerMenu.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      window.toggleMobileMenu();
    });

    burgerMenu.setAttribute("onclick", "window.toggleMobileMenu()");
  }

  menuLinks.forEach((link) => {
    link.addEventListener("click", function () {
      if (window.innerWidth <= 768 && nav.classList.contains("mobile-open")) {
        window.toggleMobileMenu();
      }
    });
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 768 && nav.classList.contains("mobile-open")) {
      window.toggleMobileMenu();
    }
  });

  const navHeight = nav.offsetHeight;
  let lastScrollTop = 0;
  let isSticky = false;

  function handleStickyNav() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;

    if (scrollTop > navHeight) {
      if (!isSticky) {
        nav.classList.add("sticky");
        isSticky = true;
      }
    } else {
      if (isSticky) {
        nav.classList.remove("sticky");
        isSticky = false;
      }
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  }

  window.addEventListener("scroll", handleStickyNav);
  handleStickyNav();
}
