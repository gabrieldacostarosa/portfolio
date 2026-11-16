// Roda antes da primeira pintura: aplica o tema salvo e marca que há JS (os efeitos de entrada dependem disso).
(function () {
  var r = document.documentElement;
  r.classList.add("js");
  try {
    var t = localStorage.getItem("theme");
    if (t === "light" || t === "dark") r.setAttribute("data-theme", t);
  } catch (e) {}
})();
