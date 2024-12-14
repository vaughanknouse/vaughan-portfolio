document.addEventListener('DOMContentLoaded', () => {
  // Sticky Navbar Scroll Animation
  window.onscroll = () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  // About Section Fade-In on Scroll
  window.addEventListener('scroll', () => {
    const elements = document.querySelectorAll('.animate-fade');
    elements.forEach((el) => {
      const elTop = el.getBoundingClientRect().top;
      if (elTop < window.innerHeight - 100) {
        el.classList.add('show');
      }
    });
  });

  // Reveal project cards on scroll
  window.addEventListener('scroll', () => {
    const cards = document.querySelectorAll('.animate-card');
    cards.forEach((card) => {
      const cardTop = card.getBoundingClientRect().top;
      if (cardTop < window.innerHeight - 100) {
        card.classList.add('show');
      }
    });
  });

  // Resume Section Animation on Scroll
  window.addEventListener('scroll', () => {
    const elements = document.querySelectorAll('.animate-slide');
    elements.forEach((el) => {
      const elTop = el.getBoundingClientRect().top;
      if (elTop < window.innerHeight - 100) {
        el.classList.add('show');
      }
    });
  });

  // Form Validation Logic
  document
    .getElementById('contactForm')
    .addEventListener('submit', function (e) {
      e.preventDefault();

      // Fields
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();

      // Error Fields
      const nameError = document.getElementById('nameError');
      const emailError = document.getElementById('emailError');
      const messageError = document.getElementById('messageError');

      // Reset Errors
      nameError.textContent = '';
      emailError.textContent = '';
      messageError.textContent = '';

      let isValid = true;

      // Name Validation
      if (!name) {
        nameError.textContent = 'Name is required.';
        isValid = false;
      }

      // Email Validation
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!email) {
        emailError.textContent = 'Email is required.';
        isValid = false;
      } else if (!emailPattern.test(email)) {
        emailError.textContent = 'Please enter a valid email address.';
        isValid = false;
      }

      // Message Validation
      if (!message) {
        messageError.textContent = 'Message is required.';
        isValid = false;
      }

      // Submit Form if Valid
      if (isValid) {
        alert('Thank you! Your message has been sent.');
        document.getElementById('contactForm').reset();
      }
    });

  // Update the current year dynamically
  document.getElementById('current-year').textContent =
    new Date().getFullYear();
});
