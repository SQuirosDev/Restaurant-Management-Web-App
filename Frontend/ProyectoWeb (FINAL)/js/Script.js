//Animation Pre-Loader
window.addEventListener("load", function () {
  const preloader = document.querySelector(".preloader");
  const content = document.querySelector(".content");

  setTimeout(() => {
    preloader.style.opacity = "0";
    setTimeout(() => {
      preloader.style.display = "none";
      content.style.display = "block";
    }, 1000);
  }, 875);
});
//NavBar Scroll
const navbar = document.querySelector('.navbar');

let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;

  if (currentScrollY > lastScrollY) {

    navbar.classList.add('hidden');
  } else {

    navbar.classList.remove('hidden');
  }
  lastScrollY = currentScrollY;
});
//Cards
document.addEventListener("DOMContentLoaded", function () {
  const cards = document.querySelectorAll(".card");

  function animateCards() {
    const triggerPoint = window.innerHeight / 1.2;

    cards.forEach((card, index) => {
      const cardTop = card.getBoundingClientRect().top;

      if (cardTop < triggerPoint) {
        setTimeout(() => {
          card.classList.add("show");
        }, index * 200);
      } else {
        setTimeout(() => {
          card.classList.remove("show");
        }, (cards.length - index - 1) * 200);
      }
    });
  }
  window.addEventListener("scroll", animateCards);
  animateCards();
});
// Chef IMG
document.addEventListener("DOMContentLoaded", function () {
  const chefImage = document.querySelector(".chef");

  function checkVisibility() {
    const imageTop = chefImage.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (imageTop < windowHeight * 0.8 && imageTop > 0) {
      chefImage.classList.add("visible");
    } else {
      chefImage.classList.remove("visible");
    }
  }
  window.addEventListener("scroll", checkVisibility);

  checkVisibility();
});
//Sala R
document.addEventListener("DOMContentLoaded", function () {
  const chefImage = document.querySelector(".salaR");

  function checkVisibility() {
    const imageTop = chefImage.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (imageTop < windowHeight && imageTop > 0) {
      chefImage.classList.add("visible");
    } else {
      chefImage.classList.remove("visible");
    }
  }

  window.addEventListener("scroll", checkVisibility);

  checkVisibility();
});
//MAP
document.addEventListener("DOMContentLoaded", () => {

  const map = L.map("map").setView([9.934739, -84.087502], 13);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  L.marker([9.934739, -84.087502])
    .addTo(map)
    .bindPopup("Nos ubicamos aquí")
    .openPopup();
});
document.addEventListener("DOMContentLoaded", function () {
  const mapElement = document.querySelector("#map");

  function checkMapVisibility() {
    const mapTop = mapElement.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (mapTop < windowHeight && mapTop > 0) {
      mapElement.classList.add("visible");
    } else {
      mapElement.classList.remove("visible");
    }
  }
  window.addEventListener("scroll", checkMapVisibility);

  checkMapVisibility();
});
//UltimaParte
document.addEventListener("DOMContentLoaded", function () {
  const cards = document.querySelectorAll('.card2');

  function checkVisibility() {
    const windowHeight = window.innerHeight;
    const scrollTop = window.scrollY;

    cards.forEach((card, index) => {
      const cardTop = card.getBoundingClientRect().top + scrollTop;

      if (cardTop < (windowHeight + scrollTop) - 100) {

        card.classList.add('visible');

        card.style.transitionDelay = `${index * 0.2}s`;
      }
    });
  }
  window.addEventListener('scroll', checkVisibility);

  checkVisibility();
});