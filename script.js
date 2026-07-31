const isEnglish = document.documentElement.lang.startsWith("en");
const artworkPath = isEnglish ? "../assets/artworks/" : "assets/artworks/";
const copy = {
  artist: isEnglish ? "Jin, Hyun-jin" : "진현진",
  view: isEnglish ? "View artwork in detail" : "작품 크게 보기"
};
const cvCopy = isEnglish ? {
  path: "../ARTIST_CV_EN.md",
  sections: [
    ["Education & Qualifications", "Education & Qualifications"],
    ["Awards", "Awards"],
    ["Collections", "Collections"],
    ["Selections & Residencies", "Selections & Residencies"]
  ],
  exhibitions: "Exhibitions & Activities",
  more: count => `+ View more (${count})`,
  less: "− Show less",
  moreExhibitions: count => `View all exhibitions +${count}`,
  lessExhibitions: "Show fewer exhibitions",
  scheduled: "Scheduled",
  error: "The CV could not be loaded. Please refresh the page."
} : {
  path: "ARTIST_CV.md",
  sections: [
    ["학력 및 자격", "학력 및 자격"],
    ["수상", "수상"],
    ["소장처", "소장처"],
    ["선정 및 레지던시", "선정 및 레지던시"]
  ],
  exhibitions: "전시 및 활동",
  more: count => `+ 더 보기 (${count})`,
  less: "− 접기",
  moreExhibitions: count => `전체 전시 보기 +${count}`,
  lessExhibitions: "전시 이력 접기",
  scheduled: "예정",
  error: "이력을 불러오지 못했습니다. 페이지를 새로고침해 주세요."
};

const ABOUT_INITIAL_ITEMS = 4;
const EXHIBITION_INITIAL_ITEMS = 7;

const works = [
  { image: "raw-000.jpg", title: "To Freely Bloom 14", year: "2024", meta: "한지에 신암채 · 72.7 × 53 cm", metaEn: "New mineral pigments on hanji · 72.7 × 53 cm" },
  { image: "raw-001.jpg", title: "To Freely Bloom 7", year: "2024", meta: "한지에 신암채 · 41 × 32 cm", metaEn: "New mineral pigments on hanji · 41 × 32 cm" },
  { image: "raw-002.jpg", title: "無盡之境 01", titleEn: "Boundless Realm 01", year: "2025", meta: "한지에 신암채, 은분 · 65.1 × 50 cm", metaEn: "New mineral pigments and silver powder on hanji · 65.1 × 50 cm" },
  { image: "raw-003.jpg", title: "無盡之境 02", titleEn: "Boundless Realm 02", year: "2025", meta: "한지에 신암채, 은분, 금분, 스와로브스키 · 72.7 × 60.6 cm", metaEn: "New mineral pigments, silver and gold powder, Swarovski crystals on hanji · 72.7 × 60.6 cm" },
  { image: "raw-004.jpg", title: "To Freely Bloom 6", year: "2024", meta: "한지에 신암채 · 41 × 32 cm", metaEn: "New mineral pigments on hanji · 41 × 32 cm" },
  { image: "raw-007.jpg", title: "심향(心向)", titleEn: "Direction of the Heart", year: "2025", meta: "한지에 신암채, 금박, 스와로브스키 · 40 × 80 cm", metaEn: "New mineral pigments, gold leaf, Swarovski crystals on hanji · 40 × 80 cm" },
  { image: "raw-011.jpg", title: "無盡寶塔", titleEn: "Infinite Treasure Pagoda", year: "2025", meta: "삼베에 신암채, 스와로브스키 · 121.9 × 61 cm", metaEn: "New mineral pigments and Swarovski crystals on hemp · 121.9 × 61 cm" },
  { image: "raw-012.jpg", title: "To Freely Bloom 24", year: "2025", meta: "한지에 신암채, 자개, 스와로브스키 · 50 × 20 cm", metaEn: "New mineral pigments, mother-of-pearl, Swarovski crystals on hanji · 50 × 20 cm" },
  { image: "raw-013.jpg", title: "To Freely Bloom 25", year: "2025", meta: "한지에 신암채, 자개, 스와로브스키 · 50 × 20 cm", metaEn: "New mineral pigments, mother-of-pearl, Swarovski crystals on hanji · 50 × 20 cm" },
  { image: "raw-014.jpg", title: "To Freely Bloom 26", year: "2025", meta: "한지에 신암채, 은분, 스와로브스키 · 50 × 20 cm", metaEn: "New mineral pigments, silver powder, Swarovski crystals on hanji · 50 × 20 cm" },
  { image: "raw-015.jpg", title: "To Freely Bloom 18", year: "2024", meta: "한지에 혼합재료 · 72.7 × 53 cm", metaEn: "Mixed media on hanji · 72.7 × 53 cm" },
  { image: "raw-016.jpg", title: "To Freely Bloom 15", year: "2024", meta: "한지에 혼합재료 · 72.7 × 53 cm", metaEn: "Mixed media on hanji · 72.7 × 53 cm" },
  { image: "raw-017.jpg", title: "탑, 꽃 피우다 21", titleEn: "Pagoda in Bloom 21", year: "2024", meta: "한지에 신암채 · 41 × 32 cm", metaEn: "New mineral pigments on hanji · 41 × 32 cm" },
  { image: "raw-018.jpg", title: "To Freely Bloom 4", year: "2024", meta: "한지에 혼합재료 · 63 × 46 cm", metaEn: "Mixed media on hanji · 63 × 46 cm" },
  { image: "raw-019.jpg", title: "To Freely Bloom 5", year: "2024", meta: "한지에 신암채 · 65 × 35 cm", metaEn: "New mineral pigments on hanji · 65 × 35 cm" },
  { image: "raw-020.jpg", title: "To Freely Bloom 16", year: "2024", meta: "한지에 혼합재료 · 72.7 × 53 cm", metaEn: "Mixed media on hanji · 72.7 × 53 cm" },
  { image: "raw-021.jpg", title: "To Freely Bloom 17", year: "2024", meta: "한지에 신암채, 자개 · 72.7 × 53 cm", metaEn: "New mineral pigments and mother-of-pearl on hanji · 72.7 × 53 cm" },
  { image: "raw-022.jpg", title: "회접요사제탑", titleEn: "Pagoda of Assembly and Continuity", year: "2025", meta: "춘포에 신암채, 금박, 스와로브스키 · 100 × 30.1 cm", metaEn: "New mineral pigments, gold leaf, Swarovski crystals on ramie · 100 × 30.1 cm" },
  { image: "raw-023.jpg", title: "Pagoda of Longevity and Blessing", year: "2025", meta: "삼베에 신암채, 금박 · 121.9 × 61 cm", metaEn: "New mineral pigments and gold leaf on hemp · 121.9 × 61 cm" },
  { image: "raw-024.jpg", title: "탑, 꽃 피우다 5", titleEn: "Pagoda in Bloom 5", year: "2024", meta: "한지에 신암채 · 41 × 27.5 cm", metaEn: "New mineral pigments on hanji · 41 × 27.5 cm" },
  { image: "raw-025.jpg", title: "탑, 꽃 피우다 16", titleEn: "Pagoda in Bloom 16", year: "2024", meta: "옻지에 신암채 · 41 × 24.5 cm", metaEn: "New mineral pigments on lacquered paper · 41 × 24.5 cm" },
  { image: "raw-026.jpg", title: "탑, 꽃 피우다 19", titleEn: "Pagoda in Bloom 19", year: "2024", meta: "한지에 신암채 · 41 × 32 cm", metaEn: "New mineral pigments on hanji · 41 × 32 cm" }
];

function parseCvMarkdown(markdown) {
  const sections = new Map();
  let currentSection = null;

  markdown.split(/\r?\n/).forEach(line => {
    const heading = line.match(/^##\s+(.+?)\s*$/);
    if (heading) {
      currentSection = heading[1];
      sections.set(currentSection, []);
      return;
    }

    const item = line.match(/^-\s+(.+?)\s*$/);
    if (item && currentSection) sections.get(currentSection).push(item[1]);
  });

  return sections;
}

function createCvToggle(items, initialCount, labels, controlsId, className = "cv-toggle") {
  const hiddenCount = items.length - initialCount;
  if (hiddenCount <= 0) return null;

  const button = document.createElement("button");
  button.type = "button";
  button.className = className;
  button.setAttribute("aria-controls", controlsId);
  button.setAttribute("aria-expanded", "false");
  button.textContent = labels.more(hiddenCount);

  button.addEventListener("click", () => {
    const expanded = button.getAttribute("aria-expanded") === "true";
    items.slice(initialCount).forEach(item => {
      item.hidden = expanded;
    });
    button.setAttribute("aria-expanded", String(!expanded));
    button.textContent = expanded ? labels.more(hiddenCount) : labels.less;
  });

  return button;
}

function renderAbout(sections) {
  const container = document.querySelector("[data-cv-sections]");
  container.replaceChildren();

  cvCopy.sections.forEach(([sourceTitle, displayTitle], sectionIndex) => {
    const entries = sections.get(sourceTitle) ?? [];
    if (!entries.length) return;

    const section = document.createElement("section");
    section.className = "cv-section";

    const title = document.createElement("h3");
    title.textContent = displayTitle;

    const list = document.createElement("ul");
    list.id = `cv-list-${sectionIndex}`;
    const items = entries.map((entry, itemIndex) => {
      const item = document.createElement("li");
      item.textContent = entry;
      item.hidden = itemIndex >= ABOUT_INITIAL_ITEMS;
      list.append(item);
      return item;
    });

    section.append(title, list);
    const toggle = createCvToggle(items, ABOUT_INITIAL_ITEMS, {
      more: cvCopy.more,
      less: cvCopy.less
    }, list.id);
    if (toggle) section.append(toggle);
    container.append(section);
  });
  container.setAttribute("aria-busy", "false");
}

function parseExhibition(entry) {
  let text = entry.trim();
  let scheduled = false;
  const scheduledPrefix = isEnglish ? "(Scheduled)" : "(예정)";

  if (text.startsWith(scheduledPrefix)) {
    scheduled = true;
    text = text.slice(scheduledPrefix.length).trim();
  }

  const firstSpace = text.indexOf(" ");
  const date = firstSpace === -1 ? "" : text.slice(0, firstSpace);
  const description = firstSpace === -1 ? text : text.slice(firstSpace + 1);
  const titleMatch = description.match(/^《(.+?)》(?:,\s*)?(.*)$/);

  return {
    date,
    title: titleMatch ? titleMatch[1] : description,
    details: titleMatch ? titleMatch[2] : "",
    scheduled
  };
}

function renderExhibitions(sections) {
  const container = document.querySelector("[data-exhibition-list]");
  const action = document.querySelector("[data-exhibition-action]");
  const entries = sections.get(cvCopy.exhibitions) ?? [];
  container.replaceChildren();
  action.replaceChildren();
  action.hidden = true;

  const articles = entries.map((entry, index) => {
    const exhibition = parseExhibition(entry);
    const article = document.createElement("article");
    article.hidden = index >= EXHIBITION_INITIAL_ITEMS;

    const date = document.createElement("time");
    date.textContent = exhibition.date;

    const title = document.createElement("h3");
    title.textContent = exhibition.title;
    if (exhibition.scheduled) {
      const status = document.createElement("span");
      status.className = "exhibition-status";
      status.textContent = cvCopy.scheduled;
      title.append(" ", status);
    }

    const details = document.createElement("p");
    details.textContent = exhibition.details;
    article.append(date, title, details);
    container.append(article);
    return article;
  });

  const toggle = createCvToggle(articles, EXHIBITION_INITIAL_ITEMS, {
    more: cvCopy.moreExhibitions,
    less: cvCopy.lessExhibitions
  }, "exhibition-history", "outline-button");

  if (toggle) {
    container.id = "exhibition-history";
    action.hidden = false;
    action.append(toggle);
  }
  container.setAttribute("aria-busy", "false");
}

async function loadCv() {
  try {
    const response = await fetch(cvCopy.path, { cache: "no-cache" });
    if (!response.ok) throw new Error(`CV request failed: ${response.status}`);
    const sections = parseCvMarkdown(await response.text());
    renderAbout(sections);
    renderExhibitions(sections);
  } catch (error) {
    console.error(error);
    document.querySelectorAll(".cv-loading").forEach(message => {
      message.classList.add("cv-error");
      message.textContent = cvCopy.error;
    });
    document.querySelectorAll("[aria-busy='true']").forEach(container => {
      container.setAttribute("aria-busy", "false");
    });
  }
}

const grid = document.querySelector("#work-grid");
const dialog = document.querySelector("#art-dialog");
let activeIndex = 0;

works.forEach((work, index) => {
  const title = isEnglish && work.titleEn ? work.titleEn : work.title;
  const meta = isEnglish ? work.metaEn : work.meta;
  const card = document.createElement("figure");
  card.className = `work-card reveal${index >= 6 ? " hidden" : ""}`;
  card.tabIndex = 0;
  card.dataset.index = index;
  card.setAttribute("role", "button");
  card.setAttribute("aria-label", `${title}: ${copy.view}`);
  card.innerHTML = `
    <div class="work-image">
      <img src="${artworkPath}${work.image}" alt="${copy.artist}, ${title}, ${work.year}" loading="${index < 3 ? "eager" : "lazy"}" decoding="async">
    </div>
    <figcaption>
      <span class="work-title">${title}</span>
      <span class="work-year">${work.year}</span>
      <span class="work-meta">${meta}</span>
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
  const title = isEnglish && work.titleEn ? work.titleEn : work.title;
  const meta = isEnglish ? work.metaEn : work.meta;
  dialog.querySelector("img").src = `${artworkPath}${work.image}`;
  dialog.querySelector("img").alt = `${copy.artist}, ${title}, ${work.year}`;
  dialog.querySelector("figcaption").textContent = `${title}, ${meta}, ${work.year}`;
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
loadCv();
