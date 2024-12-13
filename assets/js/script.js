// Sticky Navbar Scroll Animation
window.onscroll = () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
};

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
