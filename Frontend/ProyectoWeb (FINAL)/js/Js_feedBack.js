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