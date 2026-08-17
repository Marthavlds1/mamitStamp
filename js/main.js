// Carga segura de ScrollTrigger
if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// 1. MENÚ DE NAVEGACIÓN (Prioritario)
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    navToggle.classList.toggle("is-open");
    navMenu.classList.toggle("is-open");
  });

  const navLinks = navMenu.querySelectorAll(".navbar__link");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navToggle.classList.remove("is-open");
      navMenu.classList.remove("is-open");
    });
  });
}

// 2. HERO ANIMATION (Solo si existe .hero__title)
const heroTitle = document.querySelector(".hero__title");
let tl = null;

if (heroTitle && typeof gsap !== "undefined") {
  tl = gsap.timeline({ paused: true, defaults: { ease: "power3.out" } });
  tl.from(".hero__title", { scale: 1.4, opacity: 0, duration: 0.8 })
    .from(".hero__tagline", { y: 20, opacity: 0, duration: 0.5 }, "-=0.2")
    .from(".hero__scroll", { opacity: 0, duration: 0.5 }, "-=0.1");

  gsap.to(".hero__scroll", {
    y: 10,
    duration: 1,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });
}

// 3. SPLASH SCREEN (Solo en index.html)
const splash = document.getElementById("splash");
if (splash && typeof gsap !== "undefined") {
  window.addEventListener("load", () => {
    gsap.to(splash, {
      opacity: 0,
      duration: 0.8,
      delay: 1.5,
      ease: "power2.inOut",
      onComplete: () => {
        splash.style.display = "none";
        if (tl) tl.play();
        if (typeof ScrollTrigger !== "undefined") ScrollTrigger.refresh();
      },
    });
  });
}

// 4. ANIMACIONES POR SECCIÓN CON SCROLLTRIGGER
if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
  const sections = [
    { selector: ".about", elements: ".about__text, .about__grid, .about__cta" },
    { selector: ".designer", elements: ".designer__photo, .designer__name, .designer__role, .designer__bio" },
    { selector: ".portfolio", elements: ".portfolio__title, .portfolio__grid img" },
    { selector: ".order", elements: ".order__title, .order__subtitle, .order__form" },
    { selector: ".footer", elements: ".footer__social, .footer__copy" }
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
        start: "top 80%",
        toggleActions: "play none none none"
      }
    });
  });
}

// 5. ENVÍO DE FORMULARIO A WHATSAPP
const orderForm = document.getElementById("orderForm");
if (orderForm) {
  orderForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const phoneNumber = "525550677316";
    const clientName = document.getElementById("clientName").value.trim();
    const itemSource = document.querySelector('input[name="itemSource"]:checked').value;
    const itemType = document.getElementById("itemType").value;
    const itemSize = document.getElementById("itemSize").value;
    const itemColor = document.getElementById("itemColor").value.trim();
    const designIdea = document.getElementById("designIdea").value.trim();

    const message = `Hola Consu, soy ${clientName} y quisiera cotizar un pedido en mami't stamp:%0A%0A` +
      `*1. Prenda/Objeto:* ${itemSource}%0A` +
      `*2. Producto:* ${itemType}%0A` +
      `*3. Talla:* ${itemSize}%0A` +
      `*4. Color:* ${itemColor}%0A` +
      `*5. Idea del diseño:* ${designIdea}`;

    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  });
}