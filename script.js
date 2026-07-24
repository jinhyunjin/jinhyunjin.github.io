const works = [
  { image: "raw-000.jpg", title: "To Freely Bloom 14", year: "2024", meta: "한지에 신암채 · 72.7 × 53 cm" },
  { image: "raw-001.jpg", title: "To Freely Bloom 7", year: "2024", meta: "한지에 신암채 · 41 × 32 cm" },
  { image: "raw-002.jpg", title: "無盡之境 01", year: "2025", meta: "한지에 신암채, 은분 · 65.1 × 50 cm" },
  { image: "raw-003.jpg", title: "無盡之境 02", year: "2025", meta: "한지에 신암채, 은분, 금분, 스와로브스키 · 72.7 × 60.6 cm" },
  { image: "raw-004.jpg", title: "To Freely Bloom 6", year: "2024", meta: "한지에 신암채 · 41 × 32 cm" },
  { image: "raw-007.jpg", title: "심향(心向)", year: "2025", meta: "한지에 신암채, 금박, 스와로브스키 · 40 × 80 cm" },
  { image: "raw-011.jpg", title: "無盡寶塔", year: "2025", meta: "삼베에 신암채, 스와로브스키 · 121.9 × 61 cm" },
  { image: "raw-012.jpg", title: "To Freely Bloom 24", year: "2025", meta: "한지에 신암채, 자개, 스와로브스키 · 50 × 20 cm" },
  { image: "raw-013.jpg", title: "To Freely Bloom 25", year: "2025", meta: "한지에 신암채, 자개, 스와로브스키 · 50 × 20 cm" },
  { image: "raw-014.jpg", title: "To Freely Bloom 26", year: "2025", meta: "한지에 신암채, 은분, 스와로브스키 · 50 × 20 cm" },
  { image: "raw-015.jpg", title: "To Freely Bloom 18", year: "2024", meta: "한지에 혼합재료 · 72.7 × 53 cm" },
  { image: "raw-016.jpg", title: "To Freely Bloom 15", year: "2024", meta: "한지에 혼합재료 · 72.7 × 53 cm" },
  { image: "raw-017.jpg", title: "탑, 꽃 피우다 21", year: "2024", meta: "한지에 신암채 · 41 × 32 cm" },
  { image: "raw-018.jpg", title: "To Freely Bloom 4", year: "2024", meta: "한지에 혼합재료 · 63 × 46 cm" },
  { image: "raw-019.jpg", title: "To Freely Bloom 5", year: "2024", meta: "한지에 신암채 · 65 × 35 cm" },
  { image: "raw-020.jpg", title: "To Freely Bloom 16", year: "2024", meta: "한지에 혼합재료 · 72.7 × 53 cm" },
  { image: "raw-021.jpg", title: "To Freely Bloom 17", year: "2024", meta: "한지에 신암채, 자개 · 72.7 × 53 cm" },
  { image: "raw-022.jpg", title: "회접요사제탑", year: "2025", meta: "춘포에 신암채, 금박, 스와로브스키 · 100 × 30.1 cm" },
  { image: "raw-023.jpg", title: "Pagoda of Longevity and Blessing", year: "2025", meta: "삼베에 신암채, 금박 · 121.9 × 61 cm" },
  { image: "raw-024.jpg", title: "탑, 꽃 피우다 5", year: "2024", meta: "한지에 신암채 · 41 × 27.5 cm" },
  { image: "raw-025.jpg", title: "탑, 꽃 피우다 16", year: "2024", meta: "옻지에 신암채 · 41 × 24.5 cm" },
  { image: "raw-026.jpg", title: "탑, 꽃 피우다 19", year: "2024", meta: "한지에 신암채 · 41 × 32 cm" }
];

const grid = document.querySelector("#work-grid");
const dialog = document.querySelector("#art-dialog");
let activeIndex = 0;

works.forEach((work, index) => {
  const card = document.createElement("figure");
  card.className = `work-card reveal${index >= 7 ? " hidden" : ""}`;
  card.tabIndex = 0;
  card.dataset.index = index;
  card.setAttribute("role", "button");
  card.setAttribute("aria-label", `${work.title} 작품 크게 보기`);
  card.innerHTML = `
    <div class="work-image">
      <img src="assets/artworks/${work.image}" alt="진현진, ${work.title}, ${work.year}" loading="${index < 3 ? "eager" : "lazy"}" decoding="async">
    </div>
    <figcaption>
      <span class="work-title">${work.title}</span>
      <span class="work-year">${work.year}</span>
      <span class="work-meta">${work.meta}</span>
    </figcaption>`;
  card.addEventListener("click", () => openDialog(index));
  card.addEventListener("keydown", event => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openDialog(index);
    }
  });
  grid.append(card);
});

function openDialog(index) {
  activeIndex = index;
  const work = works[index];
  dialog.querySelector("img").src = `assets/artworks/${work.image}`;
  dialog.querySelector("img").alt = `진현진, ${work.title}, ${work.year}`;
  dialog.querySelector("figcaption").textContent = `${work.title}, ${work.meta}, ${work.year}`;
  if (!dialog.open) dialog.showModal();
  document.body.classList.add("dialog-open");
}

function moveDialog(direction) {
  openDialog((activeIndex + direction + works.length) % works.length);
}

dialog.querySelector(".dialog-close").addEventListener("click", () => dialog.close());
dialog.querySelector(".prev").addEventListener("click", () => moveDialog(-1));
dialog.querySelector(".next").addEventListener("click", () => moveDialog(1));
dialog.addEventListener("close", () => document.body.classList.remove("dialog-open"));
dialog.addEventListener("click", event => { if (event.target === dialog) dialog.close(); });
document.addEventListener("keydown", event => {
  if (!dialog.open) return;
  if (event.key === "ArrowLeft") moveDialog(-1);
  if (event.key === "ArrowRight") moveDialog(1);
});

const showMore = document.querySelector("#show-more");
showMore.addEventListener("click", () => {
  document.querySelectorAll(".work-card.hidden").forEach(card => card.classList.remove("hidden"));
  showMore.closest(".section-action").remove();
  observeReveals();
});

const menuButton = document.querySelector(".menu-button");
menuButton.addEventListener("click", () => {
  const open = document.body.classList.toggle("menu-open");
  menuButton.setAttribute("aria-expanded", String(open));
});
document.querySelectorAll("nav a").forEach(link => link.addEventListener("click", () => {
  document.body.classList.remove("menu-open");
  menuButton.setAttribute("aria-expanded", "false");
}));

const header = document.querySelector("[data-header]");
const updateHeader = () => header.classList.toggle("scrolled", window.scrollY > 30);
addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

let observer;
function observeReveals() {
  if (!("IntersectionObserver" in window)) {
    document.querySelectorAll(".reveal").forEach(el => el.classList.add("visible"));
    return;
  }
  observer ??= new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .08 });
  document.querySelectorAll(".reveal:not(.hidden):not(.visible)").forEach(el => observer.observe(el));
}
observeReveals();
document.querySelector("#year").textContent = new Date().getFullYear();
