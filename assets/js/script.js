document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('.navbar');
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!navbar || navLinks.length === 0) {
    console.error('Navbar or nav-links not found!');
    return;
  }

  // 🚀 Fix: Separate animated elements from sections
  const animatedElements = document.querySelectorAll(
    '.animate-fade, .animate-card, .animate-slide'
  );

  let ticking = false; // Prevents multiple executions in a single frame

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        // Sticky Navbar
        navbar.classList.toggle('scrolled', window.scrollY > 50);

        // Animate elements on scroll
        animatedElements.forEach((el) => {
          if (el.getBoundingClientRect().top < window.innerHeight - 100) {
            el.classList.add('show');
          }
        });

        // Update Active Navigation Link
        let current = '';
        sections.forEach((section) => {
          if (window.pageYOffset >= section.offsetTop - 60) {
            current = section.getAttribute('id');
          }
        });

        navLinks.forEach((link) => {
          link.classList.toggle(
            'active',
            link.getAttribute('href').includes(current)
          );
        });

        ticking = false;
      });

      ticking = true;
    }
  });

  // Smooth Scrolling for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetElement = document.querySelector(this.getAttribute('href'));
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Form Validation Logic
  document
    .getElementById('contactForm')
    .addEventListener('submit', function (e) {
      e.preventDefault(); // Prevent default form submission

      // Get form input values
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();

      // Get error message elements
      const nameError = document.getElementById('nameError');
      const emailError = document.getElementById('emailError');
      const messageError = document.getElementById('messageError');

      // Log form submission and validation results
      console.log('Form submitted! Checking validation...');

      // Reset previous error messages
      nameError.textContent = '';
      emailError.textContent = '';
      messageError.textContent = '';

      let isValid = true;

      // Name validation
      if (!name) {
        nameError.textContent = 'Name is required.';
        isValid = false;
      }

      // Email validation with regex
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!email) {
        emailError.textContent = 'Email is required.';
        isValid = false;
      } else if (!emailPattern.test(email)) {
        emailError.textContent = 'Please enter a valid email address.';
        isValid = false;
      }

      // Message validation
      if (!message) {
        messageError.textContent = 'Message is required.';
        isValid = false;
      }

      console.log('Validation result:', isValid); // Log validation result

      // If form is valid, display success message
      if (isValid) {
        console.log('Success! Form is valid.');

        // Remove existing success message if present
        const existingMessage = document.querySelector('.alert-success');
        if (existingMessage) existingMessage.remove();

        const successMessage = document.createElement('div');
        successMessage.innerHTML = `
        <div class="alert alert-success alert-dismissible fade show mt-3" role="alert">
          Thank you! Your message has been sent.
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      `;

        document.getElementById('contactForm').appendChild(successMessage);
        document.getElementById('contactForm').reset();

        // Remove success message after 5 seconds
        setTimeout(() => {
          successMessage.remove();
        }, 5000);
      }
    });

  // Update the current year dynamically
  document.getElementById('current-year').textContent =
    new Date().getFullYear();

  // Dark Mode Light Mode Toggle
  const themeToggle = document.getElementById('theme-toggle');

  // Load stored theme preference
  const savedTheme = localStorage.getItem('theme');

  if (savedTheme === 'light-mode') {
    document.body.classList.add('light-mode');
    themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
  }

  // Toggle Theme
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const icon = themeToggle.querySelector('i');

    if (document.body.classList.contains('light-mode')) {
      icon.classList.replace('fa-moon', 'fa-sun');
      localStorage.setItem('theme', 'light-mode');
    } else {
      icon.classList.replace('fa-sun', 'fa-moon');
      localStorage.setItem('theme', 'dark-mode');
    }
  });

  // ✅ Observer for updating active navigation links (Only for <section> elements)
  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const id = entry.target.getAttribute('id');
        if (!id) return; // Skip elements without an ID

        const navLink = document.querySelector(`a[href="#${id}"]`);
        if (entry.isIntersecting) {
          if (navLink) {
            document
              .querySelectorAll('.nav-link')
              .forEach((link) => link.classList.remove('active'));
            navLink.classList.add('active');
          } else {
            console.warn(`No nav link found for section ID: ${id}`);
          }
        }
      });
    },
    { threshold: 0.5 }
  );

  // ✅ Observer for animations (Only for .animate-fade, .animate-card, .animate-slide)
  const animateObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          animateObserver.unobserve(entry.target); // Stop observing once shown
        }
      });
    },
    { threshold: 0.1 }
  );

  // 🔥 Apply observers to the correct elements
  sections.forEach((section) => navObserver.observe(section)); // Navigation
  animatedElements.forEach((element) => animateObserver.observe(element)); // Animations

  // ✅ Close navbar toggler on link click (Fix for mobile)
  document.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      document.querySelector('.navbar-collapse').classList.remove('show');
    });
  });
});
