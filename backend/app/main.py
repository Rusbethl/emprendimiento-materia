"""Nemesis Terminal - servidor principal (versión inicial).

Por ahora solo sirve la interfaz y un par de rutas de prueba.
Los módulos de cada pestaña se irán agregando en las siguientes etapas.
"""
import os
from pathlib import Path

from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

# En Docker la interfaz se monta en /app/frontend; fuera de Docker está en la raíz del proyecto
_BASE = Path(__file__).resolve().parent.parent
FRONTEND = Path(os.getenv("NEMESIS_FRONTEND", _BASE / "frontend"))
if not FRONTEND.exists():
    FRONTEND = _BASE.parent / "frontend"

app = FastAPI(title="Nemesis Terminal", version="0.1.0")

# Pestañas planeadas para la plataforma (todavía sin contenido)
PESTANAS = [
    {"id": "inicio", "nombre": "Inicio", "grupo": "principal"},
    {"id": "noticias", "nombre": "Noticias y rumores", "grupo": "principal"},
    {"id": "ondas", "nombre": "Ondas de Elliott", "grupo": "principal"},
    {"id": "niveles", "nombre": "Niveles S/R + liquidez", "grupo": "principal"},
    {"id": "bitacora", "nombre": "Bitácora de operaciones", "grupo": "principal"},
    {"id": "macro", "nombre": "Macro y derivados", "grupo": "principal"},
    {"id": "grafico", "nombre": "Gráfico", "grupo": "herramientas"},
    {"id": "mapa", "nombre": "Mapa de liquidez", "grupo": "herramientas"},
    {"id": "semaforo", "nombre": "Semáforo", "grupo": "herramientas"},
    {"id": "radar", "nombre": "Radar de noticias", "grupo": "herramientas"},
    {"id": "agentes", "nombre": "Agentes", "grupo": "herramientas"},
    {"id": "guia", "nombre": "Guía", "grupo": "ayuda"},
    {"id": "admin", "nombre": "Administración", "grupo": "ayuda"},
]


@app.get("/api/salud")
def salud():
    return {"estado": "ok", "version": app.version}


@app.get("/api/pestanas")
def pestanas():
    return PESTANAS


@app.get("/")
def inicio():
    return FileResponse(FRONTEND / "index.html")


app.mount("/static", StaticFiles(directory=FRONTEND), name="static")
