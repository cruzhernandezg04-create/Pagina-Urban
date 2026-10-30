'use strict';

/*ANIMACIONES*/
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if (window.AOS) {
  AOS.init({
    once: true,
    offset: 80,
    duration: 1000,
    disable: () => prefersReducedMotion.matches
  });
}

/*HEADER*/
const header = document.querySelector('.site-header');
const menuBtn = document.getElementById('menuBtn');
const menu = document.getElementById('menu');
const SCROLL_THRESHOLD = 50; // px de scroll a partir de los cuales el header se vuelve blanco

// Blanco si hay scroll O si el menu del celular esta abierto, se pone en blnco.
const updateHeader = () => {
  const menuOpen = menu && menu.classList.contains('open');
  header.classList.toggle('scrolled', window.scrollY > SCROLL_THRESHOLD || menuOpen);
};

updateHeader(); // por si la página se recarga ya con scroll
window.addEventListener('scroll', updateHeader, { passive: true });

/*MENU DEL CELUALR */
if (menuBtn && menu) {
  const setMenu = (open) => {
    menu.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    updateHeader();
  };

  menuBtn.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
  menu.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });
}

/*SELECTOR DE SUCURSALES */
const branchList = document.querySelector('.branch-list');

if (branchList) {
  const title = document.getElementById('branchTitle');
  const address = document.getElementById('branchAddress');
  const phone = document.getElementById('branchPhone');
  const map = document.getElementById('branchMap');

  branchList.addEventListener('click', (e) => {
    const btn = e.target.closest('.branch-btn');
    if (!btn) return;

    branchList.querySelectorAll('.branch-btn').forEach((b) => {
      const active = b === btn;
      b.classList.toggle('active', active);
      b.setAttribute('aria-pressed', String(active));
    });

    const { title: name, address: addr, phone: tel } = btn.dataset;
    title.textContent = name;
    address.textContent = addr;
    phone.textContent = tel;
    phone.href = 'tel:+52' + tel.replace(/\s/g, '');
    map.src = 'https://maps.google.com/maps?q=' + encodeURIComponent(addr + ', México') + '&output=embed';
  });
}

/*PRODUCTOS*/
const filters = document.getElementById('filters');

if (filters) {
  const products = document.querySelectorAll('.product');

  filters.addEventListener('click', (e) => {
    const chip = e.target.closest('.chip');
    if (!chip) return;

    filters.querySelectorAll('.chip').forEach((c) => {
      const active = c === chip;
      c.classList.toggle('active', active);
      c.setAttribute('aria-pressed', String(active));
    });

    const category = chip.dataset.filter;
    products.forEach((p) => {
      p.hidden = category !== 'Todos' && p.dataset.category !== category;
    });
  });
}

/* FORMULARIO
   SOLO DEMOSTRACION, NO ENVIA DATOS PORQUE NO HAY CORREO*/
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  const response = document.getElementById('formResponse');
  let timer;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    contactForm.reset();
    response.hidden = false;
    clearTimeout(timer);
    timer = setTimeout(() => { response.hidden = true; }, 5000);
  });
}