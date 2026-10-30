const btn = document.getElementById('menuBtn');
const menu = document.getElementById('menu');
if (btn && menu) {
  btn.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    btn.setAttribute('aria-expanded', open);
  });
}

// Filtro de productos
const filters = document.getElementById('filters');
if (filters) {
  filters.addEventListener('click', e => {
    const chip = e.target.closest('.chip');
    if (!chip) return;
    
    // Cambia la clase activa en los botones
    filters.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    
    const f = chip.dataset.filter;
    
    // Muestra o esconde productos con flex/none
    document.querySelectorAll('.product').forEach(p => {
      const match = (f === 'Todos' || p.dataset.category === f);
      if (match) {
        p.style.display = 'flex';
      } else {
        p.style.display = 'none';
      }
    });
  });
}

// Formulario de contacto (SOLO ES DEMOSTRACION, NO ENVIA DATOS PORQUE NO SE TENIA EL CORREO)
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const msgElement = document.getElementById('msg');
    if (msgElement) {
      msgElement.textContent = 'Mensaje enviado. Te contactaremos pronto.';
    }
    form.reset();
  });
}