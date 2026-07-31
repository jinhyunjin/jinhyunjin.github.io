const isEnglish = document.documentElement.lang.startsWith("en");
const artworkPath = isEnglish ? "../assets/artworks/" : "assets/artworks/";
const copy = {
  artist: isEnglish ? "Jin, Hyun-jin" : "진현진",
  view: isEnglish ? "View artwork in detail" : "작품 크게 보기",
  worksError: isEnglish
    ? "The artwork list could not be loaded. Please refresh the page."
    : "작품 목록을 불러오지 못했습니다. 페이지를 새로고침해 주세요."
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

const INITIAL_WORKS = 6;
const artworkDataPath = isEnglish ? "../data/artworks.json" : "data/artworks.json";
let works = [];

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
const showMore = document.querySelector("#show-more");
const showMoreAction = showMore.closest(".section-action");
let activeIndex = 0;

function localizedArtworkField(work, field) {
  return work[field][isEnglish ? "en" : "ko"];
}

function artworkMeta(work) {
  return `${localizedArtworkField(work, "medium")} · ${work.size}`;
}

function createWorkCard(work, index) {
  const title = localizedArtworkField(work, "title");
  const meta = artworkMeta(work);
  const card = document.createElement("figure");
  card.className = `work-card reveal${index >= INITIAL_WORKS ? " hidden" : ""}`;
  card.tabIndex = 0;
  card.dataset.index = index;
  card.setAttribute("role", "button");
  card.setAttribute("aria-label", `${title}: ${copy.view}`);

  const imageContainer = document.createElement("div");
  imageContainer.className = "work-image";
  const image = document.createElement("img");
  image.src = `${artworkPath}${work.image}`;
  image.alt = `${copy.artist}, ${title}, ${work.year}`;
  image.loading = index < 3 ? "eager" : "lazy";
  image.decoding = "async";
  imageContainer.append(image);

  const caption = document.createElement("figcaption");
  const titleText = document.createElement("span");
  titleText.className = "work-title";
  titleText.textContent = title;
  const year = document.createElement("span");
  year.className = "work-year";
  year.textContent = work.year;
  const metadata = document.createElement("span");
  metadata.className = "work-meta";
  metadata.textContent = meta;
  caption.append(titleText, year, metadata);
  card.append(imageContainer, caption);

  card.addEventListener("click", () => openDialog(index));
  card.addEventListener("keydown", event => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openDialog(index);
    }
  });
  return card;
}

function renderWorks() {
  grid.replaceChildren(...works.map(createWorkCard));
  grid.setAttribute("aria-busy", "false");

  const hiddenCount = Math.max(works.length - INITIAL_WORKS, 0);
  if (hiddenCount > 0) {
    showMore.querySelector("span").textContent = `+${hiddenCount}`;
    showMoreAction.hidden = false;
  }

  const hero = works.find(work => work.hero === true) ?? works[0];
  const heroTitle = localizedArtworkField(hero, "title");
  document.querySelector("[data-hero-image]").src = `${artworkPath}${hero.image}`;
  document.querySelector("[data-hero-caption]").textContent = `${heroTitle}, ${hero.year}`;
  observeReveals();
}

async function loadWorks() {
  try {
    const response = await fetch(artworkDataPath, { cache: "no-cache" });
    if (!response.ok) throw new Error(`Artwork request failed: ${response.status}`);
    const data = await response.json();
    if (!Array.isArray(data) || !data.length) throw new Error("Artwork data is empty");
    works = data;
    renderWorks();
  } catch (error) {
    console.error(error);
    const message = document.createElement("p");
    message.className = "cv-loading cv-error";
    message.textContent = copy.worksError;
    grid.replaceChildren(message);
    grid.setAttribute("aria-busy", "false");
    showMoreAction.hidden = true;
  }
}

function openDialog(index) {
  activeIndex = index;
  const work = works[index];
  const title = localizedArtworkField(work, "title");
  const meta = artworkMeta(work);
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

showMore.addEventListener("click", () => {
  document.querySelectorAll(".work-card.hidden").forEach(card => card.classList.remove("hidden"));
  showMoreAction.remove();
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
loadWorks();
loadCv();
