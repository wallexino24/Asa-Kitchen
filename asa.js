// ============================================================
//  ÁṢÀ KITCHEN — script.js
// ============================================================


// ---- NAV: Add .scrolled class after 60px scroll ----
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});


// ---- HAMBURGER: Toggle mobile menu open/close ----
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

// Close mobile menu when any link is tapped
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
  });
});


// ---- MENU TABS ----
const tabBtns   = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.menu-tab-panel');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.tab;

    // Deactivate all
    tabBtns.forEach(b => b.classList.remove('active'));
    tabPanels.forEach(p => p.classList.remove('active'));

    // Activate selected
    btn.classList.add('active');
    document.querySelector(`[data-panel="${target}"]`).classList.add('active');
  });
});


// ---- EMAILJS INIT ----
emailjs.init('h0ekK-33aRgPNd1SX');


// ---- RESERVATION FORM ----
const reserveForm = document.getElementById('reserveForm');
const formSuccess = document.getElementById('formSuccess');

// Set today as the minimum selectable date
const dateInput = document.getElementById('date');
const today = new Date().toISOString().split('T')[0];
dateInput.setAttribute('min', today);

reserveForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const btn = reserveForm.querySelector('.btn-sage');
  btn.textContent = 'Confirming…';
  btn.disabled = true;

  // Keys match the generic template variables exactly.
  // site_name tells us which site sent this email.
  const formData = {
    site_name:     'Áṣà Kitchen',
    client_name:   `${document.getElementById('fname').value} ${document.getElementById('lname').value}`,
    client_contact:`${document.getElementById('email').value} / ${document.getElementById('phone').value}`,
    service:       document.getElementById('occasion').value || 'General Reservation',
    date:          document.getElementById('date').value,
    time:          document.getElementById('time').value,
    guests:        document.getElementById('guests').value,
    notes:         document.getElementById('notes').value || 'None',
  };

  emailjs.send('service_wd8x0u4', 'template_akoauns', formData)
    .then(() => {
      formSuccess.classList.add('show');
      btn.textContent = '✓ Reservation Confirmed';
      btn.style.background = '#2a6a2a';
      reserveForm.querySelectorAll('input, select, textarea').forEach(el => el.value = '');
    })
    .catch((error) => {
      formSuccess.textContent = '✗ Something went wrong. Please call us directly.';
      formSuccess.style.borderColor = '#c0392b';
      formSuccess.style.color = '#c0392b';
      formSuccess.classList.add('show');
      btn.textContent = 'Try Again';
      btn.disabled = false;
      console.error('EmailJS error:', error);
    });
});


// ---- WHATSAPP BOOKING BUTTON ----
// Builds a pre-filled WhatsApp message from the form fields
// and sets the href on the WhatsApp button dynamically.
const whatsappBtn = document.getElementById('whatsappBtn');

whatsappBtn.addEventListener('click', () => {
  const fname    = document.getElementById('fname').value;
  const lname    = document.getElementById('lname').value;
  const email    = document.getElementById('email').value;
  const phone    = document.getElementById('phone').value;
  const date     = document.getElementById('date').value;
  const time     = document.getElementById('time').value;
  const guests   = document.getElementById('guests').value;
  const occasion = document.getElementById('occasion').value || 'None';
  const notes    = document.getElementById('notes').value || 'None';

  // Build the message — this is what arrives pre-filled in WhatsApp
  const message =
`Hello Áṣà Kitchen! I'd like to make a reservation.

Name: ${fname} ${lname}
Email: ${email}
Phone: ${phone}
Date: ${date}
Time: ${time}
Guests: ${guests}
Occasion: ${occasion}
Special Requests: ${notes}

Please confirm my booking. Thank you!`;

  // Encode the message for a URL and open WhatsApp
  const url = `https://wa.me/2349168671007?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
});


// ---- SCROLL FADE-IN ANIMATION ----
// Adds .fade-in to these elements, then uses IntersectionObserver
// to add .visible (which triggers the CSS transition) when they enter view.
const fadeTargets = document.querySelectorAll(
  '.stat, .story-text, .story-visual, .menu-item, ' +
  '.gallery-item, .testimonial-card, .reserve-text, .reserve-form, .footer-col'
);

fadeTargets.forEach(el => el.classList.add('fade-in'));

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target); // Only animate once
    }
  });
}, { threshold: 0.1 });

fadeTargets.forEach(el => fadeObserver.observe(el));


// ---- ACTIVE NAV HIGHLIGHT ON SCROLL ----
// Highlights the matching nav link when its section is in view.
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${entry.target.id}`) {
          link.style.color = 'var(--gold)';
        }
      });
    }
  });
}, { threshold: 0.5 });

sections.forEach(s => sectionObserver.observe(s));
