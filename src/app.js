// Interações e movimento. Tudo é opcional: sem JS o site continua legível e navegável.
(function () {
  var d = document, root = d.documentElement;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  var $ = function (s, c) { return (c || d).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || d).querySelectorAll(s)); };

  /* tema */
  var toggle = $("#theme-toggle");
  if (toggle) toggle.addEventListener("click", function () {
    var cur = root.getAttribute("data-theme") || (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
    var next = cur === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) {}
  });

  /* entrada: dispara as animações de abertura depois que as fontes carregam */
  var go = function () { requestAnimationFrame(function () { d.body.classList.add("ready"); }); };
  if (d.fonts && d.fonts.ready) { d.fonts.ready.then(go); setTimeout(go, 1200); } else go();

  /* barra de progresso e topo que some ao rolar para baixo */
  var bar = $(".progress i"), top = $("#top"), lastY = 0, ticking = false;
  var onScroll = function () {
    var y = window.scrollY, h = root.scrollHeight - window.innerHeight;
    if (bar) bar.style.transform = "scaleX(" + (h > 0 ? Math.min(1, y / h) : 0) + ")";
    if (top && !reduce) {
      if (y > lastY && y > 140) top.classList.add("hide"); else if (y < lastY - 4 || y < 80) top.classList.remove("hide");
    }
    lastY = y; ticking = false;
    parallax();
  };
  window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });

  /* revelar ao rolar + contadores + vídeos */
  // A imagem de abertura (.stage) começa recortada e sem área visível; por isso observamos o contêiner dela.
  var reveals = $$("[data-reveal], [data-stagewrap]");
  var counters = $$("[data-count]");
  var fmt = function (el, n) { el.textContent = n + (el.getAttribute("data-suffix") || ""); };
  if (reduce || !("IntersectionObserver" in window)) {
    reveals.forEach(function (el) { el.classList.add("in"); });
    $$(".stage").forEach(function (el) { el.classList.add("in"); });
  } else {
    counters.forEach(function (el) { fmt(el, 0); });
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add("in");
        if (e.target.hasAttribute("data-stagewrap")) { var st = $(".stage", e.target); if (st) st.classList.add("in"); }
        $$("[data-count]", e.target).forEach(countUp);
        if (e.target.hasAttribute("data-count")) countUp(e.target);
        io.unobserve(e.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    reveals.forEach(function (el) { io.observe(el); });
    // contadores que não estão dentro de um elemento revelado
    var cio = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { countUp(e.target); cio.unobserve(e.target); } });
    }, { threshold: 0.4 });
    counters.forEach(function (el) { cio.observe(el); });
  }
  function countUp(el) {
    if (el._done) return; el._done = true;
    var to = parseInt(el.getAttribute("data-count"), 10), t0 = null, dur = 1400;
    if (reduce) { fmt(el, to); return; }
    (function step(t) {
      if (t0 === null) t0 = t;
      var p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 3);
      fmt(el, Math.round(to * e));
      if (p < 1) requestAnimationFrame(step);
    })(performance.now());
  }

  /* vídeos dos replays: tocam só quando aparecem na tela */
  var clips = $$("video.clip");
  if (clips.length && "IntersectionObserver" in window) {
    var vio = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        var v = e.target;
        if (e.isIntersecting) { var p = v.play(); if (p && p.catch) p.catch(function () {}); } else v.pause();
      });
    }, { threshold: 0.35 });
    clips.forEach(function (v) { vio.observe(v); });
  }

  /* filtro por disciplina */
  var chips = $$("[data-filter]"), items = $$(".works > li, .cat-track > li");
  chips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      var f = chip.getAttribute("data-filter");
      chips.forEach(function (c) { c.setAttribute("aria-pressed", String(c === chip)); });
      items.forEach(function (li) {
        var ok = f === "all" || (" " + li.getAttribute("data-disc") + " ").indexOf(" " + f + " ") > -1;
        li.hidden = !ok;
      });
    });
  });

  /* opção Catálogo: vitrine que gira sozinha (pausa ao passar o mouse) e setas do carrossel */
  var hero = $("[data-cat-hero]");
  if (hero) {
    var slides = $$(".cat-slide", hero), dots = $$(".dot-btn", hero), cur = 0, timer = null;
    var show = function (i) {
      cur = (i + slides.length) % slides.length;
      slides.forEach(function (s, k) { s.classList.toggle("on", k === cur); s.setAttribute("aria-hidden", String(k !== cur)); });
      dots.forEach(function (b, k) { b.classList.toggle("on", k === cur); });
    };
    var stop = function () { if (timer) { clearInterval(timer); timer = null; } };
    var start = function () { stop(); if (!reduce) timer = setInterval(function () { show(cur + 1); }, 6000); };
    dots.forEach(function (b) { b.addEventListener("click", function () { show(parseInt(b.getAttribute("data-go"), 10)); start(); }); });
    hero.addEventListener("mouseenter", stop); hero.addEventListener("mouseleave", start); hero.addEventListener("focusin", stop);
    start();
  }
  $$("[data-car]").forEach(function (b) {
    b.addEventListener("click", function () {
      var t = $(".cat-track");
      if (t) t.scrollBy({ left: parseInt(b.getAttribute("data-car"), 10) * Math.min(t.clientWidth * 0.8, 700), behavior: reduce ? "auto" : "smooth" });
    });
  });

  /* botões magnéticos */
  if (finePointer && !reduce) {
    $$("[data-magnet]").forEach(function (el) {
      el.addEventListener("mousemove", function (e) {
        var r = el.getBoundingClientRect();
        el.style.transform = "translate(" + ((e.clientX - r.left - r.width / 2) * 0.22) + "px," + ((e.clientY - r.top - r.height / 2) * 0.3) + "px)";
      });
      el.addEventListener("mouseleave", function () { el.style.transform = ""; });
    });
  }

  /* índice lateral do caso: destaca a seção atual */
  var spies = $$("[data-spy]");
  if (spies.length && "IntersectionObserver" in window) {
    var sio = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        spies.forEach(function (a) { a.classList.toggle("on", a.getAttribute("data-spy") === e.target.id); });
      });
    }, { rootMargin: "-30% 0px -60% 0px" });
    spies.forEach(function (a) { var s = d.getElementById(a.getAttribute("data-spy")); if (s) sio.observe(s); });
  }

  /* leve paralaxe na imagem de abertura do caso */
  var pimgEl = $(".stage-wide img");
  function parallax() {
    if (!pimgEl || reduce) return;
    var r = pimgEl.parentNode.getBoundingClientRect();
    if (r.bottom < 0 || r.top > window.innerHeight) return;
    var k = (r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight;
    pimgEl.style.transform = "translate3d(0," + (k * -36) + "px,0) scale(1.08)";
  }
  onScroll();
  // Carrossel de telas: setas, contador e rolagem suave (sem JS continua deslizável)
  $$("[data-carousel]").forEach(function (car) {
    var track = $(".car-track", car), slides = $$(".shot", track), nav = $(".car-nav", car), count = $(".car-count", car);
    if (!track || slides.length < 2) return;
    nav.classList.add("on");
    var target = null, timer;
    var idx = function () { return Math.round(track.scrollLeft / track.clientWidth); };
    var show = function () { count.textContent = (idx() + 1) + " / " + slides.length; };
    $$(".car-btn", car).forEach(function (b) {
      b.addEventListener("click", function () {
        var n = Math.max(0, Math.min(slides.length - 1, (target === null ? idx() : target) + Number(b.getAttribute("data-dir"))));
        target = n; clearTimeout(timer); timer = setTimeout(function () { target = null; }, 700);
        track.scrollTo({ left: n * track.clientWidth, behavior: reduce ? "auto" : "smooth" });
      });
    });
    track.addEventListener("scroll", show, { passive: true });
    show();
  });
})();
