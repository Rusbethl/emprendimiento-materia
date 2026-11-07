# Nemesis Terminal

Plataforma web de análisis para personas que operan futuros de Bitcoin.

**Estado:** versión 0.1, estructura inicial. Las pestañas existen, pero todavía no tienen contenido.

## Tecnologías

- **Backend:** Python 3.12 con FastAPI y Uvicorn
- **Frontend:** HTML, CSS y JavaScript
- **Contenedores:** Docker y Docker Compose

## Estructura

```
nemesis/
├── backend/
│   ├── app/main.py        # servidor y rutas de la API
│   ├── Dockerfile
│   └── requirements.txt
├── frontend/
│   ├── index.html
│   ├── css/style.css
│   └── js/app.js
└── docker-compose.yml
```

## Cómo correrlo

Con Docker:

```
docker compose up --build
```

Después abre http://localhost:8000

Sin Docker:

```
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

## Próximas etapas

1. Conexión a datos del mercado en tiempo real
2. Gráfico de velas
3. Módulo de noticias
4. Bitácora de operaciones
5. Inicio de sesión de usuarios
"# emprendimiento-materia" 
