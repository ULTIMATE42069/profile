const body = document.body;
const header = document.getElementById("siteHeader");
const navToggle = document.getElementById("navToggle");
const navPanel = document.getElementById("navPanel");
const navLinks = document.querySelectorAll(".nav-link");
const themeToggle = document.getElementById("themeToggle");
const backToTop = document.getElementById("backToTop");
const typedText = document.getElementById("typedText");
const revealItems = document.querySelectorAll(".reveal");
const sections = document.querySelectorAll("main section[id]");

const titleText = "B.Tech Computer Science Engineering (Artificial Intelligence & Machine Learning) Student";
const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme === "dark") {
  body.classList.add("dark-mode");
  themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
  themeToggle.setAttribute("aria-label", "Switch to light mode");
}

function updateHeaderState() {
  const isScrolled = window.scrollY > 18;
  header.classList.toggle("scrolled", isScrolled);
  backToTop.classList.toggle("visible", window.scrollY > 420);
}

function closeMobileNav() {
  navPanel.classList.remove("open");
  navToggle.setAttribute("aria-expanded", "false");
  navToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
}

navToggle.addEventListener("click", () => {
  const isOpen = navPanel.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
  navToggle.innerHTML = isOpen
    ? '<i class="fa-solid fa-xmark"></i>'
    : '<i class="fa-solid fa-bars"></i>';
});

navLinks.forEach((link) => {
  link.addEventListener("click", closeMobileNav);
});

themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
  const isDark = body.classList.contains("dark-mode");

  localStorage.setItem("portfolio-theme", isDark ? "dark" : "light");
  themeToggle.innerHTML = isDark
    ? '<i class="fa-solid fa-sun"></i>'
    : '<i class="fa-solid fa-moon"></i>';
  themeToggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Type the hero title once on page load for a polished first impression.
let typeIndex = 0;
function typeHeroTitle() {
  if (typeIndex <= titleText.length) {
    typedText.textContent = titleText.slice(0, typeIndex);
    typeIndex += 1;
    window.setTimeout(typeHeroTitle, 34);
  }
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

revealItems.forEach((item) => revealObserver.observe(item));

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      const currentLink = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
      navLinks.forEach((link) => link.classList.remove("active"));

      if (currentLink) {
        currentLink.classList.add("active");
      }
    });
  },
  {
    rootMargin: "-35% 0px -55% 0px",
    threshold: 0
  }
);

sections.forEach((section) => sectionObserver.observe(section));

document.addEventListener("click", (event) => {
  const clickedInsideNav = navPanel.contains(event.target) || navToggle.contains(event.target);

  if (!clickedInsideNav && navPanel.classList.contains("open")) {
    closeMobileNav();
  }
});

window.addEventListener("scroll", updateHeaderState, { passive: true });
window.addEventListener("load", () => {
  updateHeaderState();
  typeHeroTitle();
});
