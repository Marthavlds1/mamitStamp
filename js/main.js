gsap.registerPlugin(ScrollTrigger);

// ===== TIMELINE DE LA HERO SECTION =====
const tl = gsap.timeline({ paused: true, defaults: { ease: "power3.out" } });

tl.from(".hero__title", { scale: 1.4, opacity: 0, duration: 0.8 })
  .from(".hero__tagline", { y: 20, opacity: 0, duration: 0.5 }, "-=0.2")
  .from(".hero__scroll", { opacity: 0, duration: 0.5 }, "-=0.1");

// Splash Screen
const splash = document.getElementById("splash");

window.addEventListener("load", () => {
  gsap.to(splash, {
    opacity: 0,
    duration: 0.8,
    delay: 2,
    ease: "power2.inOut",
    onComplete: () => {
      splash.style.display = "none";
      tl.play();
      ScrollTrigger.refresh(); // Recalcula posiciones exactas de cada sección
    },
  });
});

// Loop del indicador de scroll
gsap.to(".hero__scroll", {
  y: 10,
  duration: 1,
  repeat: -1,
  yoyo: true,
  ease: "sine.inOut",
});

// Menú de navegación
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".navbar__link");

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => navMenu.classList.toggle("is-open"));
  navLinks.forEach((link) =>
    link.addEventListener("click", () => navMenu.classList.remove("is-open"))
  );
}

// ===== ANIMACIONES INDEPENDIENTES POR SECCIÓN =====
const sections = [
  {
    selector: ".about",
    elements: ".about__text, .about__grid, .about__cta"
  },
  {
    selector: ".designer",
    elements: ".designer__photo, .designer__name, .designer__role, .designer__bio"
  },
  {
    selector: ".portfolio",
    elements: ".portfolio__title, .portfolio__grid img" // Anima cada imagen individualmente
  },
  {
    selector: ".footer",
    elements: ".footer__cta, .footer__social, .footer__copy"
  }
];

sections.forEach(({ selector, elements }) => {
  const container = document.querySelector(selector);
  if (!container) return;

  const targets = container.querySelectorAll(elements);
  if (!targets.length) return;

  gsap.from(targets, {
    y: 40,
    opacity: 0,
    duration: 0.8,
    stagger: 0.12,
    ease: "power3.out",
    scrollTrigger: {
      trigger: container,
      start: "top 80%", // Se activa únicamente cuando esta sección específica entra al viewport
      toggleActions: "play none none none"
    }
  });
});

// LÓGICA DE ENVÍO A WHATSAPP
const orderForm = document.getElementById("orderForm");

if (orderForm) {
  orderForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const phoneNumber = "525550677316"; // Reemplaza con tu número de WhatsApp
    const itemSource = document.querySelector('input[name="itemSource"]:checked').value;
    const designIdea = document.getElementById("designIdea").value;

    const message = `¡Hola! Quisiera cotizar un pedido en mami't stamp:%0A%0A` +
      `*1. Prenda/Objeto:* ${itemSource}%0A` +
      `*2. Idea del diseño:* ${designIdea}`;

    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  });
}