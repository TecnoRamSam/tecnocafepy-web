(function () {
  var WA = "595986217368";
  var modal = document.getElementById("modal");
  var form = document.getElementById("f");
  var err = document.getElementById("err");
  var interesEl = document.getElementById("interes");
  var interes = "";

  document.getElementById("y").textContent = new Date().getFullYear();

  function open(text) {
    interes = text || "Consulta general";
    interesEl.textContent = "Consulta sobre: " + interes;
    err.hidden = true;
    modal.hidden = false;
    var first = form.querySelector("input");
    if (first) first.focus();
  }
  function close() { modal.hidden = true; }

  document.addEventListener("click", function (e) {
    var t = e.target.closest("[data-consulta]");
    if (t) { e.preventDefault(); open(t.getAttribute("data-consulta")); }
  });
  document.getElementById("close").addEventListener("click", close);
  modal.addEventListener("click", function (e) { if (e.target === modal) close(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var d = new FormData(form);
    var nombre = (d.get("nombre") || "").trim();
    var tel = (d.get("telefono") || "").trim();
    var ciudad = (d.get("ciudad") || "").trim();
    var vende = d.get("vende");
    var cafes = (d.get("cafes") || "").trim();
    if (!nombre || !tel || !ciudad || !vende) { err.hidden = false; return; }
    var lines = [
      "Hola TecnoCafe, quiero consultar: " + interes,
      "Nombre: " + nombre,
      "Teléfono: " + tel,
      "Ciudad: " + ciudad,
      "¿Vende café hoy?: " + vende,
      "Cafés por día: " + (cafes || "no sé / no aplica")
    ];
    var url = "https://wa.me/" + WA + "?text=" + encodeURIComponent(lines.join("\n"));
    window.open(url, "_blank", "noopener");
    form.reset();
    close();
  });
})();
