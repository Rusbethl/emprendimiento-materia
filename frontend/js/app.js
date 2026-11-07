// Nemesis Terminal - navegación base entre pestañas (sin contenido todavía)

const GRUPOS = { principal: "Análisis", herramientas: "Herramientas", ayuda: "Ayuda" };
const TECLAS = {
  inicio: "1", noticias: "2", ondas: "3", niveles: "4", bitacora: "5", macro: "6",
  grafico: "C", mapa: "M", semaforo: "S", radar: "R", agentes: "E", guia: "G", admin: "A",
};

let pestanas = [];

async function cargarPestanas() {
  try {
    const r = await fetch("/api/pestanas");
    pestanas = await r.json();
  } catch (e) {
    pestanas = [{ id: "inicio", nombre: "Inicio", grupo: "principal" }];
  }
  pintarMenu();
  mostrar(location.hash.slice(1) || "inicio");
}

function pintarMenu() {
  const menu = document.getElementById("menu");
  menu.innerHTML = "";
  let grupo = null;
  for (const p of pestanas) {
    if (p.grupo !== grupo) {
      grupo = p.grupo;
      const g = document.createElement("div");
      g.className = "menu-grupo";
      g.textContent = GRUPOS[grupo] || grupo;
      menu.appendChild(g);
    }
    const a = document.createElement("a");
    a.href = "#" + p.id;
    a.dataset.id = p.id;
    a.innerHTML = `<span>${p.nombre}</span><span class="tecla">${TECLAS[p.id] || ""}</span>`;
    menu.appendChild(a);
  }
}

function mostrar(id) {
  const p = pestanas.find((x) => x.id === id) || pestanas[0];
  document.getElementById("titulo").textContent = p.nombre;
  document.querySelectorAll(".menu a").forEach((a) => a.classList.toggle("activa", a.dataset.id === p.id));
  document.getElementById("vista").innerHTML =
    `<div class="vacia"><div><h2>${p.nombre}</h2><p>Módulo en construcción</p></div></div>`;
}

async function revisarServidor() {
  const punto = document.getElementById("punto");
  const txt = document.getElementById("estado-txt");
  try {
    const r = await fetch("/api/salud");
    const d = await r.json();
    punto.className = "punto ok";
    txt.textContent = "Servidor en línea · v" + d.version;
  } catch (e) {
    punto.className = "punto error";
    txt.textContent = "Sin conexión con el servidor";
  }
}

window.addEventListener("hashchange", () => mostrar(location.hash.slice(1)));

// Atajos de teclado para cambiar de pestaña
document.addEventListener("keydown", (e) => {
  if (e.ctrlKey || e.altKey || e.metaKey || e.target.tagName === "INPUT") return;
  const id = Object.keys(TECLAS).find((k) => TECLAS[k].toLowerCase() === e.key.toLowerCase());
  if (id) location.hash = id;
});

cargarPestanas();
revisarServidor();
setInterval(revisarServidor, 15000);
