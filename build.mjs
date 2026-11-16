// Gerador estático do portfólio. Uso: node build.mjs  → cria a pasta dist/
// Sem dependências. Páginas: /pt/, /en/, /pt/projetos/<slug>/, /en/projects/<slug>/
import { mkdirSync, writeFileSync, readFileSync, cpSync, rmSync, existsSync } from "node:fs";
import { createHash } from "node:crypto";
import { SITE_URL, person, ui } from "./content/site.mjs";
import { projects as rawProjects } from "./content/projects.mjs";
import { order } from "./content/order.mjs";
import { meta, disciplineLabels } from "./content/meta.mjs";
import { profile } from "./content/profile.mjs";
import { headlines } from "./content/headlines.mjs";

// Opções de visual: SKIN=studio (padrão) | manual | cinema.  OUT=pasta de saída.  `node tools/build-all.cjs` gera as três.
const SKIN = process.env.SKIN || "studio"; // visual principal: Studio
const OUT = process.env.OUT || "dist";
// ordem de exibição: content/order.mjs; projetos fora da lista vão para o final, na ordem em que foram escritos
const rank = (p) => { const i = order.indexOf(p.slug); return i < 0 ? order.length + rawProjects.indexOf(p) : i; };
const projects = [...rawProjects].sort((a, b) => rank(a) - rank(b));
for (const p of projects) if (p.caseStudy && !meta[p.slug]) throw new Error(`falta a entrada em content/meta.mjs para "${p.slug}"`);
for (const p of projects) if (p.caseStudy && !headlines[p.slug]) throw new Error(`falta a entrada em content/headlines.mjs para "${p.slug}"`);
rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });

const manifest = existsSync("assets/img/manifest.json") ? JSON.parse(readFileSync("assets/img/manifest.json", "utf8")) : {};
const skinFile = `src/skins/${SKIN}.css`;
const CSS = readFileSync("src/style.css", "utf8") + (existsSync(skinFile) ? "\n" + readFileSync(skinFile, "utf8") : "");
const sha = (s) => createHash("sha1").update(s).digest("hex").slice(0, 8);
const hashOf = (f) => sha(readFileSync(f));
const V = { css: sha(CSS), js: hashOf("src/app.js"), theme: hashOf("src/theme.js") };

const esc = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const rich = (s) => esc(s).replace(/`([^`]+)`/g, "<code>$1</code>");
const abs = (p) => (SITE_URL ? SITE_URL + p : null);
const pad = (n) => String(n).padStart(2, "0");

const langs = ["pt", "en"];
const caseDir = { pt: "projetos", en: "projects" };
const homePath = (l) => `/${l}/`;
const casePath = (l, slug) => `/${l}/${caseDir[l]}/${slug}/`;
const other = (l) => (l === "pt" ? "en" : "pt");
const byslug = Object.fromEntries(projects.map((p) => [p.slug, p]));

function img(key, alt, { cls = "", eager = false } = {}) {
  const m = manifest[key] || {};
  const dims = m.w ? ` width="${m.w}" height="${m.h}"` : "";
  return `<img class="${cls}" src="/assets/img/${key}.webp" alt="${esc(alt)}"${dims} loading="${eager ? "eager" : "lazy"}" decoding="async">`;
}

const ICON = {
  arrow: '<path d="M5 12h14m0 0-6-6m6 6-6 6"/>',
  up: '<path d="M7 17 17 7M9 7h8v8"/>',
  back: '<path d="M19 12H5m0 0 6-6m-6 6 6 6"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
};
const icon = (n) => `<svg class="ic" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICON[n]}</svg>`;

/* ------------------------------ layout ------------------------------ */
function page({ l, title, description, path, altPath, body, bodyClass = "", jsonLd = null }) {
  const t = ui[l];
  const alt = other(l);
  const canon = abs(path);
  const head = [
    canon ? `<link rel="canonical" href="${canon}">` : "",
    SITE_URL ? `<link rel="alternate" hreflang="${t.htmlLang}" href="${abs(path)}">` : "",
    SITE_URL ? `<link rel="alternate" hreflang="${ui[alt].htmlLang}" href="${abs(altPath)}">` : "",
    SITE_URL ? `<link rel="alternate" hreflang="x-default" href="${abs(homePath("pt"))}">` : "",
    `<meta property="og:type" content="website">`,
    `<meta property="og:title" content="${esc(title)}">`,
    `<meta property="og:description" content="${esc(description)}">`,
    `<meta property="og:locale" content="${t.htmlLang.replace("-", "_")}">`,
    SITE_URL ? `<meta property="og:url" content="${canon}">` : "",
    SITE_URL ? `<meta property="og:image" content="${SITE_URL}/assets/og.png">` : "",
    `<meta name="twitter:card" content="summary_large_image">`,
  ].filter(Boolean).join("\n");
  const H = homePath(l);
  return `<!doctype html>
<html lang="${t.htmlLang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<meta name="color-scheme" content="dark light">
${head}
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="preload" href="/assets/fonts/inter-tight-latin-700-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/fonts/inter-tight-latin-400-normal.woff2" as="font" type="font/woff2" crossorigin>
<script src="/assets/theme.js?v=${V.theme}"></script>
<link rel="stylesheet" href="/assets/style.css?v=${V.css}">
${jsonLd ? `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>` : ""}
</head>
<body class="${bodyClass} skin-${SKIN}">
<a class="skip" href="#main">${esc(t.skip)}</a>
<div class="progress" aria-hidden="true"><i></i></div>
<header class="top" id="top">
  <div class="top-in">
    <a class="brand" href="${H}" aria-label="${esc(person.name)}"><span class="mark">GC</span><span class="bname">${esc(person.name)}</span></a>
    <nav class="nav" aria-label="Principal">
      <a href="${H}#fazer">${esc(t.nav.do)}</a>
      <a href="${H}#trabalhos">${esc(t.nav.work)}</a>
      <a href="${H}#escrita">${esc(t.nav.writing)}</a>
      <a href="${H}#trajetoria">${esc(t.nav.path)}</a>
      <a href="${H}#contato">${esc(t.nav.contact)}</a>
    </nav>
    <div class="tools">
      <a class="pill" href="${altPath}" hreflang="${ui[alt].htmlLang}" lang="${ui[alt].htmlLang}" title="${esc(t.switchLabel)}">${esc(t.switchTo)}</a>
      <button class="pill ico" type="button" id="theme-toggle" aria-label="${esc(t.theme)}">${icon("sun")}</button>
    </div>
  </div>
</header>
<main id="main">
${body}
</main>
<footer class="foot">
  <div class="wrap foot-in">
    <p>${esc(t.footer)}</p>
    <p class="foot-links"><a href="mailto:${esc(person.email)}">${esc(person.email)}</a><a href="${esc(person.linkedin)}" target="_blank" rel="me noopener">LinkedIn</a><a href="${esc(person.github)}" target="_blank" rel="me noopener">GitHub</a></p>
  </div>
</footer>
<script src="/assets/app.js?v=${V.js}" defer></script>
</body>
</html>`;
}

/* ------------------------------ pieces ------------------------------ */
const discLabel = (l, ks) => ks.map((k) => disciplineLabels[l][k]).join(" · ");
const countAttr = (v) => {
  const m = /^(\d+)(\D*)$/.exec(String(v));
  return m ? ` data-count="${m[1]}" data-suffix="${esc(m[2])}"` : "";
};

function stage(p, l) {
  const c = p.cover;
  const title = p[l].title;
  if (c.type === "phones") {
    return `<div class="stage stage-phones">${c.imgs.map((k, i) => `<span class="ph p${i}">${img(k, title, { cls: "ph-img", eager: i === 0 })}</span>`).join("")}</div>`;
  }
  return `<div class="stage stage-wide">${img(c.imgs[0], title, { eager: true })}</div>`;
}

// Capa usada nos cards da lista de trabalhos (as três opções de visual reaproveitam o mesmo HTML).
function cardCover(p, l) {
  const c = p.cover;
  const title = p[l].title;
  if (c.type === "phones") return `<span class="cov cov-phones">${c.imgs.map((k, i) => `<span class="ph p${i}">${img(k, "", { cls: "ph-img" })}</span>`).join("")}</span>`;
  return `<span class="cov cov-wide">${img(c.imgs[0], "")}</span>`;
}

/* Opção "Catálogo" (inspirada em vitrines de produto): vitrine que gira, blocos numerados e carrossel por categoria. */
function catalogWork(l, h) {
  const list = projects.filter((p) => p.caseStudy);
  const total = list.length;
  const usedDisc = ["writing", "product", "ai", "eng"];
  const slides = list.map((p, i) => {
    const m = meta[p.slug];
    const specs = p.facts.slice(0, 3).map((f) => `<li><b>${esc(f.v)}</b> ${esc(f.k[l])}</li>`).join("");
    return `<article class="cat-slide${i === 0 ? " on" : ""}" data-i="${i}" aria-hidden="${i === 0 ? "false" : "true"}">
      <a class="cat-img" href="${casePath(l, p.slug)}" tabindex="-1">${cardCover(p, l)}</a>
      <div class="cat-spec">
        <p class="cat-kick">${pad(i + 1)} / ${pad(total)} · ${esc(discLabel(l, m.disciplines))}</p>
        <h3>${esc(p[l].title)}</h3>
        <ul>${specs}</ul>
        <a class="btn solid" href="${casePath(l, p.slug)}">${esc(h.openCase)} ${icon("arrow")}</a>
      </div>
    </article>`;
  }).join("");
  const dots = list.map((p, i) => `<button type="button" class="dot-btn${i === 0 ? " on" : ""}" data-go="${i}" aria-label="${esc(p[l].title)}"><span>${pad(i + 1)}</span></button>`).join("");
  const feats = list.slice(0, 3).map((p, i) => {
    const m = meta[p.slug];
    const hl = headlines[p.slug][l];
    const f = p.facts[0];
    return `<article class="feat" data-reveal>
      <div class="feat-text">
        <span class="n">${pad(i + 1)} · ${esc(h.featuredLabel)}</span>
        <h3>${esc(hl[0])}<br><em>${esc(hl[1])}</em></h3>
        ${f ? `<div class="feat-stat"><b${countAttr(f.v)}>${esc(f.v)}</b><span>${esc(f.k[l])}</span></div>` : ""}
        <p>${esc(m.brief[l].problem)}</p>
        <a class="dis-link" href="${casePath(l, p.slug)}">${esc(p[l].title)} · ${esc(h.openCase)} ${icon("arrow")}</a>
      </div>
      <a class="feat-img" href="${casePath(l, p.slug)}" tabindex="-1">${cardCover(p, l)}</a>
    </article>`;
  }).join("");
  const cards = list.map((p, i) => {
    const m = meta[p.slug];
    const f = p.facts[0];
    return `<li data-disc="${m.disciplines.join(" ")}"><a class="pcard" href="${casePath(l, p.slug)}">
      ${cardCover(p, l)}
      <span class="pc-body">
        <span class="pc-kind">${esc(ui[l].kinds[p.kind])} · ${esc(discLabel(l, m.disciplines))}</span>
        <span class="pc-name">${esc(p[l].title)}</span>
        <span class="pc-spec">${esc(m.short[l])}</span>
        ${f ? `<span class="pc-stat"><b>${esc(f.v)}</b> ${esc(f.k[l])}</span>` : ""}
        <span class="pc-go">${esc(h.openCase)} ${icon("arrow")}</span>
      </span>
    </a></li>`;
  }).join("");
  return `
<section class="sec cat" id="trabalhos">
  <div class="wrap">
    <header class="sec-head" data-reveal><span class="num">02</span><h2>${esc(h.workTitle)}</h2><p>${esc(h.workLead)}</p></header>
    <div class="cat-hero" data-cat-hero>
      <div class="cat-slides">${slides}</div>
      <div class="cat-dots" role="group" aria-label="${esc(h.workTitle)}">${dots}</div>
    </div>
    <div class="feats">${feats}</div>
    <div class="cat-browse">
      <div class="cat-browse-head" data-reveal>
        <h3>${esc(h.explore)}</h3>
        <div class="arrows"><button type="button" class="pill ico" data-car="-1" aria-label="${esc(h.prevLabel)}">${icon("back")}</button><button type="button" class="pill ico" data-car="1" aria-label="${esc(h.nextLabel)}">${icon("arrow")}</button></div>
      </div>
      <div class="filters" role="group" aria-label="${esc(h.explore)}">
        <button type="button" class="chip" data-filter="all" aria-pressed="true">${esc(h.filterAll)}</button>
        ${usedDisc.map((k) => `<button type="button" class="chip" data-filter="${k}" aria-pressed="false">${esc(disciplineLabels[l][k])}</button>`).join("")}
      </div>
      <ul class="cat-track" tabindex="0" aria-label="${esc(h.explore)}">${cards}</ul>
    </div>
  </div>
</section>`;
}

/* ------------------------------ pages ------------------------------ */
function homePage(l) {
  const t = ui[l];
  const h = t.home;
  const H = homePath(l);

  const hero = `
<section class="hero">
  <div class="wrap">
    <p class="kicker"><span>${esc(h.kicker)}</span><span class="dot"></span><span>${esc(profile.location[l])}</span></p>
    <h1 class="display">${h.h1.map((x) => `<span class="ln"><span class="li">${x}</span></span>`).join("")}</h1>
    <p class="proof"><span class="dot"></span>${esc(profile.proof[l])}</p>
    <div class="hero-foot">
      <p class="lead">${esc(h.lead)}</p>
      <a class="scroll" href="#fazer" data-magnet>${esc(h.scroll)} ${icon("arrow")}</a>
    </div>
  </div>
  <div class="marquee" aria-hidden="true"><div class="track">${[0, 1].map(() => h.marquee.map((x) => `<span>${esc(x)}</span>`).join("")).join("")}</div></div>
</section>`;

  const dis = `
<section class="sec" id="fazer">
  <div class="wrap">
    <header class="sec-head" data-reveal><span class="num">01</span><h2>${esc(h.doTitle)}</h2><p>${esc(h.doLead)}</p></header>
    <div class="dis-grid">${h.disciplines.map((d, i) => `
      <article class="dis" data-reveal>
        <span class="n">${pad(i + 1)}</span>
        <h3>${esc(d.t)}</h3>
        <p>${esc(d.d)}</p>
        <div class="stat">${(() => { const v = d.k === "product" ? String(projects.filter((p) => p.caseStudy).length) : d.stat.v; return `<b${countAttr(v)}>${esc(v)}</b>`; })()}<span>${esc(d.stat.l)}</span></div>
        ${d.links.length ? `<p class="dis-links">${d.links.map((s) => `<a href="${casePath(l, s)}">${esc(byslug[s][l].title)} ${icon("arrow")}</a>`).join("")}</p>` : ""}
      </article>`).join("")}
    </div>
  </div>
</section>`;

  const usedDisc = ["writing", "product", "ai", "eng"];
  const work = `
<section class="sec" id="trabalhos">
  <div class="wrap">
    <header class="sec-head" data-reveal><span class="num">02</span><h2>${esc(h.workTitle)}</h2><p>${esc(h.workLead)}</p></header>
    <div class="filters" role="group" aria-label="${esc(h.workTitle)}">
      <button type="button" class="chip" data-filter="all" aria-pressed="true">${esc(h.filterAll)}</button>
      ${usedDisc.map((k) => `<button type="button" class="chip" data-filter="${k}" aria-pressed="false">${esc(disciplineLabels[l][k])}</button>`).join("")}
    </div>
    <ul class="works">${projects.filter((p) => p.caseStudy).map((p, i) => {
      const m = meta[p.slug];
      return `<li data-disc="${m.disciplines.join(" ")}"><a class="row" href="${casePath(l, p.slug)}">
        ${cardCover(p, l)}
        <span class="meta">
          <span class="idx">${pad(i + 1)}</span>
          <span class="nm">${esc(p[l].title)}</span>
          <span class="sh">${esc(m.short[l])}</span>
          <span class="dc">${esc(discLabel(l, m.disciplines))}</span>
          <span class="go">${esc(h.openCase)} ${icon("arrow")}</span>
        </span>
      </a></li>`;
    }).join("")}</ul>
  </div>
</section>`;

  const writing = `
<section class="sec" id="escrita">
  <div class="wrap">
    <header class="sec-head" data-reveal><span class="num">03</span><h2>${esc(h.writingTitle)}</h2><p>${esc(h.writingLead)}</p></header>
    <div class="samples">${h.samples.map((s) => s.kind === "doc" ? `
      <figure class="sample doc" data-reveal>
        <figcaption class="where">${esc(s.where)}</figcaption>
        <h3>${esc(s.title)}</h3>
        <ul class="bullets">${s.points.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>
      </figure>` : `
      <figure class="sample" data-reveal>
        <figcaption class="where">${esc(s.where)}</figcaption>
        <blockquote>“${esc(s.text)}”</blockquote>
        <p class="why">${esc(s.why)}</p>
      </figure>`).join("")}
    </div>
  </div>
</section>`;

  const path = `
<section class="sec" id="trajetoria">
  <div class="wrap">
    <header class="sec-head" data-reveal><span class="num">04</span><h2>${esc(h.pathTitle)}</h2><p>${esc(h.pathLead)}</p></header>
    <blockquote class="pull" data-reveal>“${esc(profile.quote[l])}”</blockquote>
    <div class="caps-head" data-reveal><h3 class="mini">${esc(h.capTitle)}</h3><p>${esc(h.capLead)}</p></div>
    <ul class="caps">${profile.capabilities.map((c, i) => `<li data-reveal><span class="n">${pad(i + 1)}</span><h4>${esc(c.t[l])}</h4><p>${esc(c.d[l])}</p></li>`).join("")}</ul>
    <ol class="tl">${profile.experience.map((e) => `
      <li data-reveal>
        <span class="when">${esc(e.when[l])}</span>
        <div><h3>${esc(e.role[l])}</h3><p class="org">${esc(e.org[l])}</p>${e.points[l].length ? `<ul>${e.points[l].map((x) => `<li>${esc(x)}</li>`).join("")}</ul>` : ""}</div>
      </li>`).join("")}
    </ol>
    <div class="cols2">
      <div data-reveal><h3 class="mini">${esc(h.eduTitle)}</h3><ul class="plain">${profile.education.map((e) => `<li>${esc(e[l])}</li>`).join("")}</ul></div>
      <div data-reveal><h3 class="mini">${esc(h.certTitle)}</h3><ul class="plain">${profile.certificates.map((c) => `<li>${esc(c)}</li>`).join("")}</ul></div>
    </div>
  </div>
</section>`;

  const principles = `
<section class="sec slim">
  <div class="wrap">
    <h3 class="mini" data-reveal>${esc(h.principlesTitle)}</h3>
    <div class="pr-grid">${h.principles.map((x, i) => `<article data-reveal><span class="n">${pad(i + 1)}</span><h4>${esc(x.t)}</h4><p>${esc(x.d)}</p></article>`).join("")}</div>
  </div>
</section>`;

  const contact = `
<section class="sec contact" id="contato">
  <div class="wrap">
    <h2 class="big" data-reveal>${esc(h.contactTitle)}</h2>
    <p class="lead" data-reveal>${esc(h.contactLead)}</p>
    <a class="mail" href="mailto:${esc(person.email)}" data-magnet>${esc(person.email)}</a>
    <p class="ext"><a href="${esc(person.linkedin)}" target="_blank" rel="me noopener">LinkedIn ${icon("up")}</a><a href="${esc(person.github)}" target="_blank" rel="me noopener">GitHub ${icon("up")}</a></p>
  </div>
</section>`;

  const jsonLd = SITE_URL
    ? { "@context": "https://schema.org", "@type": "Person", name: person.name, url: abs(H), sameAs: [person.github, person.linkedin].filter(Boolean) }
    : null;
  return page({ l, title: h.title, description: h.description, path: H, altPath: homePath(other(l)), body: hero + dis + (SKIN === "catalog" ? catalogWork(l, h) : work) + writing + path + principles + contact, bodyClass: "home", jsonLd });
}

function casePage(l, p, i, list) {
  const t = ui[l];
  const c = t.caseUi;
  const d = p[l];
  const m = meta[p.slug];
  const b = m.brief[l];
  const prev = list[(i - 1 + list.length) % list.length];
  const next = list[(i + 1) % list.length];
  const actions = [
    p.links.docs ? `<a class="btn solid" href="${esc(p.links.docs)}" target="_blank" rel="noopener" data-magnet>${esc(c.docs)} ${icon("up")}</a>` : "",
    p.links.live ? `<a class="btn solid" href="${esc(p.links.live)}" target="_blank" rel="noopener" data-magnet>${esc(c.live)} ${icon("up")}</a>` : "",
    p.links.repo ? `<a class="btn line" href="${esc(p.links.repo)}" target="_blank" rel="noopener" data-magnet>${esc(p.kind === "docs" ? c.docsRepo : c.repo)} ${icon("up")}</a>` : "",
  ].join("");

  const stills = p.gallery.length
    ? p.gallery.map((g) => `<figure class="shot ${g.shape}" data-reveal>${img(g.img, g.alt[l])}<figcaption>${esc(g.alt[l])}</figcaption></figure>`).join("")
    : "";
  const clips = (m.media || []).map((v) => {
    const pm = manifest[v.poster] || {};
    return `<figure class="shot wide clip-wrap" data-reveal>
      <video class="clip" muted loop playsinline preload="none" poster="/assets/img/${v.poster}.webp"${pm.w ? ` width="${pm.w}" height="${pm.h}"` : ""}>
        <source src="/assets/gif/${v.video}.webm" type="video/webm"><source src="/assets/gif/${v.video}.mp4" type="video/mp4">
      </video>
      <figcaption>${esc(v.cap[l])} <a href="/assets/gif/${v.gif}.gif" download>${esc(c.download)}</a></figcaption>
    </figure>`;
  }).join("");
  const gallery = stills || clips
    ? `<section class="blk" id="telas"><h2 data-reveal>${esc(clips ? c.replays : c.gallery)}</h2><div class="gallery">${clips}${stills}</div>${m.mediaNote ? `<p class="note" data-reveal>${esc(m.mediaNote[l])}</p>` : ""}</section>`
    : "";

  const layers = p.layers.length
    ? `<div class="layers">${p.layers.map((ly, k) => `${k ? `<div class="down" aria-hidden="true">${icon("arrow")}</div>` : ""}<section class="layer" data-reveal><h4>${esc(ly.label[l])}</h4><ul>${ly.nodes.map((n) => `<li><strong>${esc(n.t)}</strong>${n.s ? `<span>${esc(n.s)}</span>` : ""}</li>`).join("")}</ul></section>`).join("")}</div>`
    : "";
  const pipeline = p.pipeline
    ? `<h3 class="mini">${esc(c.pipeline)}</h3><ol class="pipeline">${p.pipeline[l].map((s) => `<li data-reveal>${esc(s)}</li>`).join("")}</ol>`
    : "";

  const toc = [["contexto", c.context], ["construido", c.built], ["arquitetura", c.arch], ["decisoes", c.decisions], ["qualidade", c.quality], ...(gallery ? [["telas", clips ? c.replays : c.gallery]] : [])];

  const body = `
<article class="case">
  <header class="case-head">
    <div class="wrap">
      <a class="back" href="${H_(l)}#trabalhos">${icon("back")} ${esc(c.back)}</a>
      <p class="tagrow"><span class="tg">${esc(t.kinds[p.kind])}</span><span class="tg st-${p.status}">${esc(c.statusLabels[p.status])}</span><span class="tg dim">${esc(discLabel(l, m.disciplines))}</span></p>
      <h1 class="display sm"><span class="ln"><span class="li">${esc(d.title)}</span></span></h1>
      <p class="lead">${esc(d.tagline)}</p>
      ${actions ? `<div class="cta">${actions}</div>` : ""}
      <dl class="brief">
        <div><dt>${esc(c.problem)}</dt><dd>${esc(b.problem)}</dd></div>
        <div><dt>${esc(c.role)}</dt><dd>${esc(b.role)}</dd></div>
        <div><dt>${esc(c.result)}</dt><dd>${esc(b.result)}</dd></div>
      </dl>
    </div>
  </header>
  <div class="wrap" data-stagewrap>${stage(p, l)}</div>
  ${p.facts.length ? `<div class="wrap"><ul class="facts">${p.facts.map((f) => `<li data-reveal><b${countAttr(f.v)}>${esc(f.v)}</b><span>${esc(f.k[l])}</span></li>`).join("")}</ul></div>` : ""}
  <div class="wrap case-grid">
    <aside class="toc" aria-label="${esc(c.toc)}"><p class="mini">${esc(c.toc)}</p><ol>${toc.map(([id, label], k) => `<li><a href="#${id}" data-spy="${id}"><span>${pad(k + 1)}</span>${esc(label)}</a></li>`).join("")}</ol>
      <p class="stack">${p.tags.map((x) => `<span>${esc(x)}</span>`).join("")}</p></aside>
    <div class="case-main">
      <section class="blk" id="contexto"><h2 data-reveal>${esc(d.contextTitle || c.context)}</h2><p class="prose" data-reveal>${esc(d.context)}</p></section>
      <section class="blk" id="construido"><h2 data-reveal>${esc(c.built)}</h2><ul class="bullets">${d.built.map((x) => `<li data-reveal>${rich(x)}</li>`).join("")}</ul></section>
      <section class="blk" id="arquitetura"><h2 data-reveal>${esc(c.arch)}</h2>${layers}<p class="note" data-reveal>${esc(d.archNote)}</p>${pipeline}</section>
      <section class="blk" id="decisoes"><h2 data-reveal>${esc(c.decisions)}</h2><div class="decisions">${d.decisions.map((x, k) => `<article class="decision" data-reveal><span class="n">${pad(k + 1)}</span><div><h3>${rich(x.d)}</h3><p><b>${esc(c.why)}</b>${rich(x.w)}</p><p class="cost"><b>${esc(c.cost)}</b>${rich(x.c)}</p></div></article>`).join("")}</div></section>
      <section class="blk" id="qualidade"><div class="two"><div><h2 data-reveal>${esc(c.quality)}</h2><ul class="bullets">${d.quality.map((x) => `<li data-reveal>${rich(x)}</li>`).join("")}</ul></div><div><h2 data-reveal>${esc(c.next)}</h2><ul class="bullets">${d.next.map((x) => `<li data-reveal>${rich(x)}</li>`).join("")}</ul></div></div></section>
      ${gallery}
      ${d.note ? `<p class="disclaimer" data-reveal>${esc(d.note)}</p>` : ""}
    </div>
  </div>
  <nav class="pager wrap" aria-label="Projetos">
    <a href="${casePath(l, prev.slug)}"><small>${esc(c.prev)}</small><span>${esc(prev[l].title)}</span></a>
    <a class="r" href="${casePath(l, next.slug)}"><small>${esc(c.nextCase)}</small><span>${esc(next[l].title)}</span></a>
  </nav>
</article>`;
  return page({ l, title: `${d.title} — ${person.name}`, description: d.tagline, path: casePath(l, p.slug), altPath: casePath(other(l), p.slug), body, bodyClass: "case-page" });
}
function H_(l) { return homePath(l); }

/* ------------------------------ write ------------------------------ */
const write = (rel, content) => {
  const f = `${OUT}/${rel}`;
  mkdirSync(f.substring(0, f.lastIndexOf("/")), { recursive: true });
  writeFileSync(f, content);
};

const cases = projects.filter((p) => p.caseStudy);
for (const l of langs) {
  write(`${l}/index.html`, homePage(l));
  cases.forEach((p, i) => write(`${l}/${caseDir[l]}/${p.slug}/index.html`, casePage(l, p, i, cases)));
}

write(
  "index.html",
  `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${esc(person.name)}</title><meta name="robots" content="noindex"><link rel="stylesheet" href="/assets/style.css?v=${V.css}"><script src="/assets/theme.js?v=${V.theme}"></script><script src="/assets/lang.js"></script></head><body><main class="nf wrap"><p class="cta"><a class="btn solid" href="/pt/">Português</a> <a class="btn line" href="/en/">English</a></p></main></body></html>`
);
write("assets/lang.js", `try{var l=(navigator.language||"pt").toLowerCase().indexOf("pt")===0?"pt":"en";location.replace("/"+l+"/")}catch(e){location.replace("/pt/")}`);
write(
  "404.html",
  `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>404</title><meta name="robots" content="noindex"><link rel="stylesheet" href="/assets/style.css?v=${V.css}"><script src="/assets/theme.js?v=${V.theme}"></script></head><body><main class="nf wrap"><h1 class="display">404</h1><p class="lead">${esc(ui.pt.notFound.text)} / ${esc(ui.en.notFound.text)}</p><p class="cta"><a class="btn solid" href="/pt/">Início</a> <a class="btn line" href="/en/">Home</a></p></main></body></html>`
);
write("favicon.svg", `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" fill="#06090b"/><rect x="3" y="3" width="58" height="58" fill="none" stroke="#5eead4" stroke-width="3"/><text x="32" y="41" text-anchor="middle" font-family="Consolas,monospace" font-size="24" font-weight="700" fill="#5eead4">GC</text></svg>`);

writeFileSync(`${OUT}/assets/style.css`, CSS);
cpSync("src/app.js", `${OUT}/assets/app.js`);
cpSync("src/theme.js", `${OUT}/assets/theme.js`);
for (const d of ["img", "fonts", "gif"]) if (existsSync(`assets/${d}`)) cpSync(`assets/${d}`, `${OUT}/assets/${d}`, { recursive: true });
if (existsSync("assets/og.png")) cpSync("assets/og.png", `${OUT}/assets/og.png`);

// Para deploy manual (arrastar a pasta no Netlify): _headers e _redirects dentro da pasta publicada têm o mesmo efeito do netlify.toml.
write("_redirects", `/  /en/  302  Language=en\n/  /pt/  302\n`);
write("_headers", `/*\n  X-Content-Type-Options: nosniff\n  X-Frame-Options: DENY\n  Referrer-Policy: strict-origin-when-cross-origin\n  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()\n  Content-Security-Policy: default-src 'self'; img-src 'self' data:; style-src 'self'; script-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'\n\n/assets/img/*\n  Cache-Control: public, max-age=86400\n`);

if (SITE_URL) {
  const urls = [];
  for (const l of langs) { urls.push(homePath(l)); cases.forEach((p) => urls.push(casePath(l, p.slug))); }
  write("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `<url><loc>${SITE_URL}${u}</loc></url>`).join("\n")}\n</urlset>\n`);
  write("robots.txt", `User-agent: *\nAllow: /\nSitemap: ${SITE_URL}/sitemap.xml\n`);
} else {
  write("robots.txt", `User-agent: *\nAllow: /\n`);
}
console.log(`OK: ${langs.length} idiomas, ${cases.length} casos → ${OUT}/`);
