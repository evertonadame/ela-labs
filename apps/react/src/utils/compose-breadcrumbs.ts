import type { AstroGlobal } from "astro";

function toUpperCaseOnFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function composePath(path: string) {
  const splitPath = path.split("-").filter(Boolean);

  const firstPart = toUpperCaseOnFirstLetter(splitPath?.[0] || "");

  const parts = splitPath.slice(1).map((part) => {
    return toUpperCaseOnFirstLetter(part.replace(/-/g, " "));
  });

  return [firstPart, ...parts].join(" ");
}

export function composeBreadcrumbs(astro: AstroGlobal) {
  const path = astro.url.pathname;

  const splitPath = path.split("/").filter(Boolean);

  const breadcrumbs = [
    {
      title: "Home",
      url: "/",
      active: splitPath.length === 0,
    },
    ...(splitPath.map((path, index) => {
      const href = "/" + splitPath.slice(0, index + 1).join("/");
      return {
        title: composePath(path),
        url: href,
        active: index === splitPath.length - 1,
      };
    }) || []),
  ];

  return breadcrumbs;
}
