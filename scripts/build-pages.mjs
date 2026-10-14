import { access, copyFile, cp, mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";

const site = JSON.parse(await readFile("src/data/site.json", "utf8"));
const history = JSON.parse(await readFile("src/data/team-history.json", "utf8"));
const legacyAssets = JSON.parse(await readFile("src/data/legacy-assets.json", "utf8"));
const html = await readFile("dist/index.html", "utf8");

async function writeEntry(path) {
  const target = join("dist", path);
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, html);
}

// Real HTML entry points let GitHub Pages serve bookmarked routes with HTTP 200.
const routes = new Set([...site.nav.map((item) => item.to), "/imprint", "/research"]);
for (const route of routes) {
  if (route !== "/") await writeEntry(`${route.slice(1)}/index.html`);
}
for (const season of history.seasons) {
  await writeEntry(`team/team${season.year.slice(0, 4)}.html`);
}
await writeEntry("404.html");
await writeFile("dist/.nojekyll", "");

// Keep published download URLs, including filenames predating the new design.
for (const [legacy, current] of Object.entries(legacyAssets)) {
  const target = join("dist", legacy.slice(1));
  await mkdir(dirname(target), { recursive: true });
  await copyFile(join("dist", current.slice(1)), target);
}

// The canonical repository retains legacy photos and assets for existing links.
for (const folder of ["_photos", "_style", "_fonts", "_js"]) {
  if (existsSync(folder)) await cp(folder, join("dist", folder), { recursive: true });
}

// Fail the build if any content refers to a missing local image or document.
async function checkAssets(value, source) {
  if (typeof value === "string" && /^\/.*\.(pdf|png|jpe?g|svg|gif|webp|glb)$/i.test(value)) {
    try {
      await access(join("dist", value.slice(1)));
    } catch {
      throw new Error(`${source} references a missing asset: ${value}`);
    }
  } else if (value && typeof value === "object") {
    for (const child of Object.values(value)) await checkAssets(child, source);
  }
}
for (const file of await readdir("src/data")) {
  if (file.endsWith(".json")) {
    await checkAssets(JSON.parse(await readFile(join("src/data", file), "utf8")), file);
  }
}

console.log(`Prepared ${routes.size} page routes, ${history.seasons.length} team seasons, and ${Object.keys(legacyAssets).length} legacy downloads for GitHub Pages.`);
