import type { AstroGlobal } from "astro";

export function composeTitle(astro: AstroGlobal) {
  const path = astro.url.pathname;

  const splitPath = path.split("/").filter(Boolean);

  const title = splitPath
    .map((path) => path.charAt(0).toUpperCase() + path.slice(1))
    .join(" | ");

  const pageTitle = `ELA LABS - ${title || "Home"}`;

  return pageTitle;
}
