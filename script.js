// ========================
// CHISPAS DECORATIVAS
// ========================
function crearChispas() {
  const contenedor = document.getElementById('sparks');
  const colores = ['#FF6B1A', '#FFAB2E', '#FF3D2E', '#FFF3DC', '#C94A1E'];

  for (let i = 0; i < 30; i++) {
    const chispa = document.createElement('div');
    chispa.classList.add('spark');

    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const duracion = 3 + Math.random() * 4;
    const delay = Math.random() * 5;
    const color = colores[Math.floor(Math.random() * colores.length)];
    const tamaño = 4 + Math.random() * 6;

    chispa.style.cssText = `
      left: ${x}%;
      top: ${y}%;
      --dur: ${duracion}s;
      --delay: ${delay}s;
      background: ${color};
      width: ${tamaño}px;
      height: ${tamaño}px;
    `;

    contenedor.appendChild(chispa);
  }
}

// ========================
// ANIMACIÓN DE ENTRADA
// ========================
function iniciarAnimacion() {
  const intro  = document.getElementById('intro');
  const main   = document.getElementById('main');
  const btn    = document.getElementById('btnEmpezar');

  btn.addEventListener('click', () => {
    // Deshabilitar el botón para evitar doble clic
    btn.disabled = true;

    // Agregar clase de zoom a la pantalla de entrada
    intro.classList.add('intro-zoom-out');

    // Cuando termine la animación de zoom, mostrar el main
    intro.addEventListener('animationend', () => {
      intro.style.display = 'none';
      main.classList.add('main-visible');

      // Animar la entrada del hero
      document.querySelectorAll('.hero-content > *').forEach((el, i) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `opacity 0.5s ${i * 0.1 + 0.1}s ease, transform 0.5s ${i * 0.1 + 0.1}s ease`;
        setTimeout(() => {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }, 50);
      });
    }, { once: true });
  });
}

// ========================
// SCROLL SUAVE
// ========================
function scrollSuave() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const destino = document.querySelector(link.getAttribute('href'));
      if (destino) {
        destino.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

// ========================
// REVELAR CARDS AL SCROLL
// ========================
function revelarAlScroll() {
  const observador = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.project-card, .stat-card').forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `opacity 0.5s ${i * 0.1}s ease, transform 0.5s ${i * 0.1}s ease`;
    observador.observe(el);
  });
}

// ========================
// INIT
// ========================
document.addEventListener('DOMContentLoaded', () => {
  crearChispas();
  iniciarAnimacion();
  scrollSuave();
  revelarAlScroll();
});
