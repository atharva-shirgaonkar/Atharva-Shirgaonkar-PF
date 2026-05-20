const body = document.body;
const preloader = document.querySelector(".preloader");
const modal = document.querySelector(".contact-modal");
const openContactButtons = document.querySelectorAll("[data-contact-open]");
const closeContactButtons = document.querySelectorAll("[data-contact-close]");
const activeSection = document.querySelector("[data-active-section]");
const year = document.querySelector("[data-year]");

const systemSteps = document.querySelectorAll("[data-system-step]");
const systemVisual = document.querySelector("[data-system-visual]");
const systemKicker = document.querySelector("[data-system-kicker]");
const systemTitle = document.querySelector("[data-system-title]");
const systemCopy = document.querySelector("[data-system-copy]");

function hidePreloader() {
  if (!preloader) return;
  preloader.classList.add("is-hidden");
}

function openContact() {
  if (!modal) return;
  modal.hidden = false;
  body.classList.add("modal-open");
  modal.querySelector(".modal-close")?.focus();
}

function closeContact() {
  if (!modal) return;
  modal.hidden = true;
  body.classList.remove("modal-open");
}

function setSystemState(step) {
  if (!step) return;

  systemSteps.forEach((item) => {
    item.classList.toggle("is-active", item === step);
  });

  if (systemVisual) {
    systemVisual.dataset.state = step.dataset.state;
  }

  if (systemKicker) {
    systemKicker.textContent = step.dataset.kicker;
  }

  if (systemTitle) {
    systemTitle.textContent = step.dataset.title;
  }

  if (systemCopy) {
    systemCopy.textContent = step.dataset.copy;
  }
}

window.addEventListener("load", () => {
  window.setTimeout(hidePreloader, 450);
});

window.setTimeout(hidePreloader, 1200);

openContactButtons.forEach((button) => {
  button.addEventListener("click", openContact);
});

closeContactButtons.forEach((button) => {
  button.addEventListener("click", closeContact);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal && !modal.hidden) {
    closeContact();
  }
});

if (year) {
  year.textContent = new Date().getFullYear();
}

const sectionObserver = new IntersectionObserver(
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

document.querySelectorAll(".section-marker").forEach((section) => {
  sectionObserver.observe(section);
});

const systemObserver = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (visible) {
      setSystemState(visible.target);
    }
  },
  {
    rootMargin: "-32% 0px -32% 0px",
    threshold: [0.2, 0.42, 0.68],
  },
);

systemSteps.forEach((step) => {
  systemObserver.observe(step);
});
