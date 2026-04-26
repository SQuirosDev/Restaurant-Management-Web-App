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

//Animacion para carousel
// Espera a que el documento esté listo
document.addEventListener('DOMContentLoaded', function () {
  // Seleccionamos el carrusel
  const carousel = document.getElementById('carouselExampleCaptions');
  
  // Añadimos el evento 'slide.bs.carousel' para cuando la imagen cambia
  $(carousel).on('slide.bs.carousel', function (event) {
    // Seleccionamos la imagen activa actual
    const currentImage = $(event.relatedTarget).find('img');
    
    // Reestablecemos la opacidad y la escala de las imágenes antes de la animación
    currentImage.css('opacity', '0').css('transform', 'scale(0.9)');
    
    // Animamos la imagen entrante (la nueva imagen que aparece)
    setTimeout(() => {
      $(event.relatedTarget).find('img').css({
        'opacity': '1',
        'transform': 'scale(1)',
        'transition': 'opacity 0.5s ease, transform 0.5s ease'
      });
    }, 10); // Le damos un pequeño retraso para asegurar que se ejecute después de que el slide cambie
  });

  // Inicializamos el carrusel
  var carouselInstance = new bootstrap.Carousel(carousel, {
    interval: 850, // Intervalo entre cambios de imagen
    ride: 'carousel'
  });
});
//Animation SVG
// JavaScript para ocultar el preloader con una animación suave
window.addEventListener("load", function () {
  const preloader = document.querySelector(".preloader");
  const content = document.querySelector(".content");

  // Simular un retraso para permitir que se visualice la animación del preloader
  setTimeout(() => {
    preloader.style.opacity = "0"; // Inicia la transición para desvanecer el preloader
    setTimeout(() => {
      preloader.style.display = "none"; // Oculta completamente después de la transición
      content.style.display = "block"; // Muestra el contenido principal
    }, 1000); // Tiempo que coincide con la duración de la transición en CSS
  }, 875); // Tiempo de visualización del preloader antes de comenzar a desaparecer
});
//Menu Principal Animacion 
function checkVisibility() {
  const titles = document.querySelectorAll('.menu-title'); // Selecciona todos los títulos con la clase "menu-title"

  titles.forEach((title) => {
    const rect = title.getBoundingClientRect();

    // Verifica si cada título está visible en la ventana
    if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
      title.classList.add('show'); // Agrega la clase para mostrar el título
    } else {
      title.classList.remove('show'); // Quita la clase para ocultarlo
    }
  });
}

// Ejecuta la función cada vez que se haga scroll
window.addEventListener('scroll', checkVisibility);

// Llama a la función cuando se carga la página
document.addEventListener('DOMContentLoaded', checkVisibility);

//MODAL

// Función para abrir el modal
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  const overlay = document.getElementById('overlay');
  
  // Mostrar el modal y el overlay
  modal.classList.add('show');
  overlay.classList.add('show');
}

// Función para cerrar el modal
function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  const overlay = document.getElementById('overlay');
  
  // Cerrar el modal y el overlay con animación
  modal.classList.remove('show');
  overlay.classList.remove('show');
}

// Evento de clic en overlay para cerrar el modal
document.getElementById('overlay').addEventListener('click', () => {
  const modals = document.querySelectorAll('.modal.show');
  modals.forEach(modal => {
    closeModal(modal.id);
  });
});
