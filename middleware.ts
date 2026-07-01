import { NextResponse } from "next/server";

const maintenanceHtml = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Lokantara</title>
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
    margin-bottom: 20px;
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
  .email {
    display: inline-block;
    color: var(--muted);
    font-size: clamp(16px, 2vw, 18px);
    line-height: 1.4;
    text-decoration: none;
  }
  .email:hover { color: var(--ink); }
</style>
</head>
<body>
<main>
  <div class="brand"><span class="mark" aria-hidden="true"></span>LOKANTARA</div>
  <a class="email" href="mailto:intel@lokantaraspace.com">intel@lokantaraspace.com</a>
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
