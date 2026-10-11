import { readFileSync, writeFileSync, rmSync } from "node:fs";
import { renderApp } from "../dist-ssr/entry-server.js";

const appHtml = renderApp();
const template = readFileSync("dist/index.html", "utf-8");
const result = template.replace(
  '<div id="root"></div>',
  `<div id="root">${appHtml}</div>`,
);
writeFileSync("dist/index.html", result);

// Clean up the SSR bundle — it's not needed at runtime
try { rmSync("dist-ssr", { recursive: true }); } catch {}

console.log("Prerendered dist/index.html");
