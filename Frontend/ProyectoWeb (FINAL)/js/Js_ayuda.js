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