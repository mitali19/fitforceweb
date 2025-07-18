const marqueeTrack = document.querySelector(".marquee-track");
let currentX = 0;

// Keep repeating content
function duplicateContent() {
  const content = marqueeTrack.innerHTML;
  marqueeTrack.innerHTML = content + content + content;
}

duplicateContent();

let lastScrollY = window.scrollY;

window.addEventListener("scroll", () => {
  const currentScrollY = window.scrollY;
  const delta = currentScrollY - lastScrollY;

  // Adjust speed multiplier here
  const speed = delta * 2;

  currentX -= speed;
  marqueeTrack.style.transform = `translateX(${currentX}px)`;

  // Reset position to loop seamlessly
  if (currentX < -marqueeTrack.offsetWidth / 2) {
    currentX = 0;
  } else if (currentX > 0) {
    currentX = -marqueeTrack.offsetWidth / 2;
  }

  lastScrollY = currentScrollY;
});

const track = document.querySelector(".slider-track");
const slides = document.querySelectorAll(".testimonial-slide");
const prevBtn = document.querySelector(".slider-btn.prev");
const nextBtn = document.querySelector(".slider-btn.next");

let currentIndex = 0;

function updateSliderPosition() {
  track.style.transform = `translateX(-${currentIndex * 100}%)`;
}

prevBtn.addEventListener("click", () => {
  currentIndex = currentIndex === 0 ? slides.length - 1 : currentIndex - 1;
  updateSliderPosition();
});

nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % slides.length;
  updateSliderPosition();
});

const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});
document.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target;

          if (target.classList.contains("hero-shape")) {
            target.classList.add("slide-in-left");

            setTimeout(() => {
              const heroImage = document.querySelector(".hero-image img");
              if (heroImage) {
                heroImage.classList.add("slide-in-top");
              }
            }, 1000);

            observer.unobserve(target);
          }

          if (target.classList.contains("zoom-in")) {
            target.classList.add("zoomed-in");
            observer.unobserve(target);
          }
        }
      });
    },
    { threshold: 0.1 }
  );

  const heroShape = document.querySelector(".hero-shape");
  const zoomElements = document.querySelectorAll(".zoom-in");

  if (heroShape) observer.observe(heroShape);
  // Do NOT observe hero-image here to prevent simultaneous animation
  zoomElements.forEach((el) => observer.observe(el));
});
