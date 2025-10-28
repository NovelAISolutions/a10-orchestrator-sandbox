window.addEventListener('DOMContentLoaded', () => {
  initAnimations();
  initCounters();
  initCarousel();
  initForm();
});

function initAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
      }
    });
  }, { threshold: 0.2 });
  document.querySelectorAll('section').forEach(sec => observer.observe(sec));
}

function initCounters() {
  const counters = document.querySelectorAll('.counter');
  const options = { threshold: 0.5 };
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = +counter.getAttribute('data-target');
        let current = 0;
        const step = Math.ceil(target / 100);
        const update = () => {
          current += step;
          counter.textContent = current.toLocaleString();
          if (current < target) requestAnimationFrame(update);
        };
        update();
        observer.unobserve(counter);
      }
    });
  }, options);
  counters.forEach(c => observer.observe(c));
}

function initCarousel() {
  const slides = document.querySelectorAll('.testimonial');
  let idx = 0;
  setInterval(() => {
    slides.forEach(s => s.classList.remove('active'));
    slides[idx].classList.add('active');
    idx = (idx + 1) % slides.length;
  }, 6000);
}

function initForm() {
  const form = document.querySelector('form');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you! We will get in touch soon.');
    form.reset();
  });
}