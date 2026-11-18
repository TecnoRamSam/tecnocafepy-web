(function () {
  var WA = "595986217368";
  // Access Key pública de Web3Forms (marv@tecnocafepy.com): cada consulta llega por correo a Julio.
  var W3F_KEY = "6d358c96-195b-49ab-817f-64cf9b0b71a8";
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
    if (W3F_KEY && !d.get("botcheck")) {
      try {
        fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json", "Accept": "application/json" },
          body: JSON.stringify({
            access_key: W3F_KEY,
            subject: "Consulta web TecnoCafe: " + interes,
            from_name: "Web TecnoCafe",
            "Consulta sobre": interes,
            Nombre: nombre, "Teléfono": tel, Ciudad: ciudad,
            "¿Vende café hoy?": vende, "Cafés por día": cafes || "no sé / no aplica"
          }),
          keepalive: true
        });
      } catch (x) {}
    }
    var url = "https://wa.me/" + WA + "?text=" + encodeURIComponent(lines.join("\n"));
    window.open(url, "_blank", "noopener");
    form.reset();
    close();
  });

  // Calculadora orientativa
  var cp=document.getElementById("c-precio"), cc=document.getElementById("c-costo"), cd=document.getElementById("c-dia"), co=document.getElementById("c-out");
  function num(el){return parseFloat((el.value||"").replace(/\./g,"").replace(",","."))||0;}
  function calc(){
    var p=num(cp), c=num(cc), d=num(cd);
    if(!p||!d){co.textContent="Completá los tres datos y te mostramos el margen aproximado del mes.";return;}
    var m=(p-c)*d*30;
    co.textContent=(m>0?"Margen aproximado por mes: Gs ":"Con esos números no hay margen: Gs ")+Math.round(m).toLocaleString("es-PY")+" (30 días, antes de gastos).";
  }
  [cp,cc,cd].forEach(function(el){el.addEventListener("input",calc);});
})();
