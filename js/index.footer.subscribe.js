const form = document.querySelector('.footer__form');
const result = document.querySelector('.footer__form-result');
const emailInput = form.querySelector('input[type="email"]');

// Wait for modal to be loaded
let subscribeModal = null;
const modalObserver = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.addedNodes.length) {
      subscribeModal = document.querySelector(".subscribe-confirm-modal");
      if (subscribeModal) {
        modalObserver.disconnect();
      }
    }
  });
});

modalObserver.observe(document.body, {
  childList: true,
  subtree: true
});

form.addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Validate email field
  if (!emailInput.value) {
    result.innerHTML = "Please enter your email";
    result.style.display = "block";
    emailInput.focus();
    return;
  }

  if (!emailInput.value.includes('@')) {
    result.innerHTML = "Please enter a valid email address";
    result.style.display = "block";
    emailInput.focus();
    return;
  }

  result.innerHTML = "Please wait...";
  result.style.display = "block";

  const formData = new FormData(form);
  const object = Object.fromEntries(formData);
  const json = JSON.stringify(object);

  fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: json
  })
  .then(async (response) => {
    let json = await response.json();
    if (response.status == 200) {
      result.innerHTML = "Form submitted successfully";
      form.reset();
      if (subscribeModal) {
        subscribeModal.showModal();
        document.body.style.overflow = "hidden";
      }
    } else {
      console.log(response);
      result.innerHTML = json.message || "Something went wrong!";
    }
  })
  .catch(error => {
    console.log(error);
    result.innerHTML = "Something went wrong!";
  })
  .then(function() {
    setTimeout(() => {
      result.style.display = "none";
    }, 3000);
  });
});
