document.addEventListener("DOMContentLoaded", function () {
  const nav = document.querySelector(".header__nav");
  if (!nav) return;

  const navHeight = nav.offsetHeight;
  let lastScrollTop = 0;
  let isSticky = false;

  function debounce(func, wait = 10, immediate = false) {
    let timeout;
    return function () {
      const context = this,
        args = arguments;
      const later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }

  const handleScroll = () => {
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

    if (scrollTop > lastScrollTop && scrollTop > navHeight * 2) {
    } else {
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  };

  window.addEventListener("scroll", debounce(handleScroll, 15));

  handleScroll();

  const menuItems = document.querySelectorAll(".header__menu-item");

  menuItems.forEach((item) => {
    item.addEventListener("click", function (event) {
      event.preventDefault();

      menuItems.forEach((i) => i.classList.remove("active"));
      this.classList.add("active");
    });
  });
});
