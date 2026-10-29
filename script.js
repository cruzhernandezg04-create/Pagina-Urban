const btn = document.getElementById('menuBtn');
const menu = document.getElementById('menu');
btn.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  btn.setAttribute('aria-expanded', open);
});

// Filtro de productos
const filters = document.getElementById('filters');
if (filters) {
  filters.addEventListener('click', e => {
    const chip = e.target.closest('.chip');
    if (!chip) return;
    filters.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    const f = chip.dataset.filter;
    document.querySelectorAll('.product').forEach(p => {
      p.hidden = !(f === 'Todos' || p.dataset.category === f);
    });
  });
}

// Formulario de contacto (solo demostración, no envía datos)
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    document.getElementById('msg').textContent = 'Mensaje enviado. Te contactaremos pronto.';
    form.reset();
  });
}