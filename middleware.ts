import { NextResponse } from "next/server";

const maintenanceHtml = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Lokantara — Maintenance</title>
<style>
  :root {
    color-scheme: dark;
    --bg: #171914;
    --panel: #20231b;
    --ink: #f2eee3;
    --muted: #b9b2a1;
    --line: rgba(242, 238, 227, 0.16);
    --accent: #c9a85f;
  }
  * { box-sizing: border-box; }
  body {
    margin: 0;
    min-height: 100vh;
    display: grid;
    place-items: center;
    padding: 32px;
    background:
      radial-gradient(circle at 20% 20%, rgba(201, 168, 95, 0.13), transparent 34%),
      linear-gradient(135deg, #11130f 0%, var(--bg) 52%, #20231b 100%);
    color: var(--ink);
    font-family: Archivo, Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  }
  main {
    width: min(680px, 100%);
    border: 1px solid var(--line);
    background: color-mix(in srgb, var(--panel) 84%, transparent);
    padding: clamp(28px, 6vw, 56px);
    border-radius: 8px;
    box-shadow: 0 24px 80px rgba(0, 0, 0, 0.22);
  }
  .brand {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 44px;
    font: 600 14px/1.1 ui-monospace, SFMono-Regular, Menlo, monospace;
    letter-spacing: 0.24em;
  }
  .mark {
    position: relative;
    width: 22px;
    height: 22px;
    border: 1.5px solid var(--accent);
    border-radius: 50%;
  }
  .mark::after {
    content: "";
    position: absolute;
    inset: 5px;
    border-radius: 50%;
    background: var(--accent);
  }
  .eyebrow {
    display: block;
    margin-bottom: 16px;
    color: var(--accent);
    font: 600 12px/1.3 ui-monospace, SFMono-Regular, Menlo, monospace;
    letter-spacing: 0.18em;
    text-transform: uppercase;
  }
  h1 {
    margin: 0;
    font-size: clamp(38px, 8vw, 76px);
    line-height: 0.95;
    letter-spacing: 0;
  }
  p {
    max-width: 560px;
    margin: 24px 0 0;
    color: var(--muted);
    font-size: clamp(17px, 2.2vw, 20px);
    line-height: 1.6;
  }
  a { color: var(--ink); text-underline-offset: 4px; }
</style>
</head>
<body>
<main>
  <div class="brand"><span class="mark" aria-hidden="true"></span>LOKANTARA</div>
  <span class="eyebrow">Maintenance</span>
  <h1>We will be back shortly.</h1>
  <p>
    Lokantara is temporarily offline while we make a few updates. For anything urgent,
    contact <a href="mailto:intel@lokantaraspace.com">intel@lokantaraspace.com</a>.
  </p>
</main>
</body>
</html>`;

export function middleware() {
  return new NextResponse(maintenanceHtml, {
    status: 200,
    headers: {
      "cache-control": "public, max-age=0, must-revalidate",
      "content-type": "text/html; charset=utf-8",
    },
  });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|icon.svg|.*\\..*).*)"],
};
