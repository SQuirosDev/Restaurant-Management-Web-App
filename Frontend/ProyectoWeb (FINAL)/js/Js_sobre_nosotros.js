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
  //IMG DERECHA
  document.addEventListener("DOMContentLoaded", function () {
    // Seleccionar todas las imágenes con la clase 'chef'
    const chefImages = document.querySelectorAll(".chef");
  
    function checkVisibility() {
      // Recorrer todas las imágenes para comprobar si están visibles
      chefImages.forEach(function(image) {
        const imageTop = image.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
  
        // Si la imagen está en la parte visible de la pantalla
        if (imageTop < windowHeight * 0.8 && imageTop > 0) {
          image.classList.add("visible"); 
        } else {
          image.classList.remove("visible");
        }
      });
    }
  
    window.addEventListener("scroll", checkVisibility);
  
    // Ejecutar la función al cargar la página para ver las imágenes que ya son visibles
    checkVisibility();
  });
  