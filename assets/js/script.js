const body = document.body;
const preloader = document.querySelector(".preloader");
const modal = document.querySelector(".contact-modal");
const openContactButtons = document.querySelectorAll("[data-contact-open]");
const closeContactButtons = document.querySelectorAll("[data-contact-close]");
const activeSection = document.querySelector("[data-active-section]");
const year = document.querySelector("[data-year]");
const scrollSteps = document.querySelectorAll("[data-scroll-step]");
const scrollScreen = document.querySelector("[data-scroll-screen]");
const scrollKicker = document.querySelector("[data-scroll-kicker]");
const scrollTitle = document.querySelector("[data-scroll-title]");
const scrollCopy = document.querySelector("[data-scroll-copy]");

const capabilities = {
  interfaces: {
    kicker: "PREMIUM WEBSITES",
    title: "Build a web presence that feels sharp, current, and credible.",
    copy: "High-impact landing sections, focused layouts, responsive behavior, accessibility checks, and interaction details that make the brand easier to trust.",
    tags: ["Visual system", "Responsive UI", "Contact flow"],
  },
  data: {
    kicker: "DATA DASHBOARDS",
    title: "Turn scattered information into a clear operating signal.",
    copy: "Useful metrics, data shaping, filters, charts, and calm summaries that help people see the next decision instead of hunting for it.",
    tags: ["KPI views", "Charts", "Decision support"],
  },
  platforms: {
    kicker: "WEB APPS",
    title: "Give the product a stable technical base.",
    copy: "Routing, forms, validation, API-ready structure, and maintainable code that keep the application understandable as it grows.",
    tags: ["App flows", "Validation", "Clean code"],
  },
  automation: {
    kicker: "AUTOMATION",
    title: "Reduce manual work with small systems that keep moving.",
    copy: "Internal tools, notifications, checklists, scripts, and workflow surfaces designed to remove repeated effort from daily operations.",
    tags: ["Workflows", "Tooling", "Integrations"],
  },
};

function hidePreloader() {
  if (!preloader) return;
  preloader.classList.add("is-hidden");
}

function openContact() {
  modal.hidden = false;
  body.classList.add("modal-open");
  const closeButton = modal.querySelector(".modal-close");
  closeButton?.focus();
}

function closeContact() {
  modal.hidden = true;
  body.classList.remove("modal-open");
}

function setCapability(key) {
  const data = capabilities[key];
  if (!data) return;

  document.querySelectorAll(".capability-row").forEach((row) => {
    row.classList.toggle("is-active", row.dataset.capability === key);
  });

  document.querySelector("[data-panel-kicker]").textContent = data.kicker;
  document.querySelector("[data-panel-title]").textContent = data.title;
  document.querySelector("[data-panel-copy]").textContent = data.copy;
  document.querySelector("[data-panel-a]").textContent = data.tags[0];
  document.querySelector("[data-panel-b]").textContent = data.tags[1];
  document.querySelector("[data-panel-c]").textContent = data.tags[2];
}

function setScrollState(step) {
  if (!step) return;

  scrollSteps.forEach((item) => {
    item.classList.toggle("is-active", item === step);
  });

  if (scrollScreen) {
    scrollScreen.dataset.state = step.dataset.state;
  }

  if (scrollKicker) {
    scrollKicker.textContent = step.dataset.kicker;
  }

  if (scrollTitle) {
    scrollTitle.textContent = step.dataset.title;
  }

  if (scrollCopy) {
    scrollCopy.textContent = step.dataset.copy;
  }
}

window.addEventListener("load", () => {
  window.setTimeout(hidePreloader, 650);
});

window.setTimeout(hidePreloader, 1600);

openContactButtons.forEach((button) => {
  button.addEventListener("click", openContact);
});

closeContactButtons.forEach((button) => {
  button.addEventListener("click", closeContact);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !modal.hidden) {
    closeContact();
  }
});

document.querySelectorAll(".capability-row").forEach((button) => {
  button.addEventListener("click", () => setCapability(button.dataset.capability));
  button.addEventListener("mouseenter", () => setCapability(button.dataset.capability));
});

if (year) {
  year.textContent = new Date().getFullYear();
}

const observer = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (visible && activeSection) {
      activeSection.textContent = visible.target.dataset.sectionLabel;
    }
  },
  {
    threshold: [0.28, 0.48, 0.68],
  },
);

document.querySelectorAll(".section-marker").forEach((section) => observer.observe(section));

const scrollObserver = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (visible) {
      setScrollState(visible.target);
    }
  },
  {
    rootMargin: "-32% 0px -32% 0px",
    threshold: [0.2, 0.42, 0.68],
  },
);

scrollSteps.forEach((step) => scrollObserver.observe(step));
