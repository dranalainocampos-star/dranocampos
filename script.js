const menuButton = document.querySelector("[data-menu-toggle]");
const menu = document.querySelector("[data-menu]");

function closeMenu() {
  if (!menuButton || !menu) return;
  menuButton.setAttribute("aria-expanded", "false");
  menu.classList.remove("is-open");
  document.body.classList.remove("menu-open");
}

if (menuButton && menu) {
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    menu.classList.toggle("is-open", !isOpen);
    document.body.classList.toggle("menu-open", !isOpen);
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 980) closeMenu();
  });
}

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const revealItems = document.querySelectorAll(".reveal");

if (reducedMotion || !("IntersectionObserver" in window)) {
  revealItems.forEach((item) => item.classList.add("is-visible"));
} else {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px" },
  );

  revealItems.forEach((item) => revealObserver.observe(item));
}

document.querySelectorAll("[data-year]").forEach((year) => {
  year.textContent = new Date().getFullYear();
});

const designDialog = document.querySelector("[data-design-dialog]");
const dialogImages = document.querySelector("[data-dialog-images]");

if (designDialog && dialogImages) {
  document.querySelectorAll("[data-design-preview]").forEach((button) => {
    button.addEventListener("click", () => {
      const images = button.dataset.images.split(",");
      const title = button.dataset.title;

      dialogImages.replaceChildren(
        ...images.map((source, index) => {
          const image = document.createElement("img");
          image.src = source.trim();
          image.alt = `${title}, variation ${index + 1}`;
          image.loading = "lazy";
          return image;
        }),
      );

      designDialog.showModal();
    });
  });

  designDialog.querySelector("[data-dialog-close]").addEventListener("click", () => {
    designDialog.close();
  });

  designDialog.addEventListener("click", (event) => {
    if (event.target === designDialog) designDialog.close();
  });
}
