//NavBar
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
// Seleccionar el campo de fecha
// Seleccionar el campo de fecha
const dateInput = document.getElementById('date');
const peopleInput = document.getElementById('people');
const terraceButton = document.getElementById('terrace');
const salonButton = document.getElementById('salon');

// Función para actualizar el rango de fechas
function updateDateRange() {
  const today = new Date();
  const minDate = new Date(today);
  minDate.setDate(today.getDate() + 1); // Mínimo: un día después de hoy
  const maxDate = new Date(today);
  maxDate.setDate(today.getDate() + 4); // Máximo: cuatro días después de hoy

  // Establecer valores mínimos y máximos para el input de fecha
  dateInput.min = minDate.toISOString().split('T')[0];
  dateInput.max = maxDate.toISOString().split('T')[0];
}

// Actualizar rango al cargar la página
updateDateRange();

// Volver a calcular el rango si el usuario enfoca el campo de fecha
dateInput.addEventListener('focus', updateDateRange);

// Validar el campo de cantidad de personas
peopleInput.addEventListener('input', () => {
  const value = parseInt(peopleInput.value, 10);

  // Si el valor es mayor que 15 o menor que 1, ajustarlo automáticamente
  if (value > 15) {
    peopleInput.value = 15;
    alert("El número máximo de personas permitido es 15.");
  } else if (value < 1) {
    peopleInput.value = 1;
    alert("El número mínimo de personas permitido es 1.");
  }
});

// Agregar efecto de selección para los botones
function selectOption(selectedButton, otherButton) {
  selectedButton.classList.add('active');
  otherButton.classList.remove('active');
}

terraceButton.addEventListener('click', () => {
  selectOption(terraceButton, salonButton);
});

salonButton.addEventListener('click', () => {
  selectOption(salonButton, terraceButton);
});

// Escuchar el envío del formulario

const form = document.getElementById('reservation-form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const date = document.getElementById('date').value;
  const people = document.getElementById('people').value;
  //const selectedOption = document.querySelector('.option-btn.active').textContent;

  alert(`Reserva confirmada:\nNombre: ${name}\nFecha: ${date}\nPersonas: ${people}`);
});

//Aniamacion SVG
window.addEventListener("load", function () {
    const preloader = document.querySelector(".preloader");
    const content = document.querySelector(".content");
  
    setTimeout(() => {
      preloader.style.opacity = 0;
      setTimeout(() => {
        preloader.style.display = "none"; 
        //content.style.display = "block"; 
      }, 1000);
    }, 875);
  });
  