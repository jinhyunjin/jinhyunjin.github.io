import { readFile } from "node:fs/promises";
import { access } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dataPath = resolve(projectRoot, "data/artworks.json");
const artworkDirectory = resolve(projectRoot, "assets/artworks");

const fail = message => {
  console.error(`Artwork validation failed: ${message}`);
  process.exitCode = 1;
};

let artworks;
try {
  artworks = JSON.parse(await readFile(dataPath, "utf8"));
} catch (error) {
  fail(`data/artworks.json could not be parsed (${error.message})`);
  process.exit();
}

if (!Array.isArray(artworks) || artworks.length === 0) {
  fail("data/artworks.json must contain a non-empty array");
  process.exit();
}

const requiredText = ["image", "year", "size"];
const seenImages = new Set();

for (const [index, artwork] of artworks.entries()) {
  const label = `item ${index + 1}`;
  if (!artwork || typeof artwork !== "object" || Array.isArray(artwork)) {
    fail(`${label} must be an object`);
    continue;
  }

  for (const field of requiredText) {
    if (typeof artwork[field] !== "string" || !artwork[field].trim()) {
      fail(`${label} is missing a valid ${field}`);
    }
  }

  for (const field of ["title", "medium"]) {
    for (const language of ["ko", "en"]) {
      if (typeof artwork[field]?.[language] !== "string" || !artwork[field][language].trim()) {
        fail(`${label} is missing ${field}.${language}`);
      }
    }
  }

  if (typeof artwork.image === "string" && artwork.image.trim()) {
    if (seenImages.has(artwork.image)) fail(`${label} repeats image ${artwork.image}`);
    seenImages.add(artwork.image);

    try {
      await access(resolve(artworkDirectory, artwork.image));
    } catch {
      fail(`${label} references missing image assets/artworks/${artwork.image}`);
    }
  }
}

const heroCount = artworks.filter(artwork => artwork.hero === true).length;
if (heroCount !== 1) fail(`exactly one artwork must have hero: true (found ${heroCount})`);

if (!process.exitCode) {
  console.log(`Validated ${artworks.length} artworks and ${heroCount} hero artwork.`);
}
