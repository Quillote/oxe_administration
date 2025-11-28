🛠️ oxe_administration_ui
Dashboard de Administración para Servidor FiveM (ox_core + Overextended)

Este proyecto es la interfaz web/NUI oficial del panel oxe_administration, un sistema avanzado para administrar servidores de FiveM que utilizan:

ox_core

ox_inventory

ox_lib

ox_target

(Compatible también con Qbox/QBX Core en el backend)

El objetivo del proyecto es ofrecer un dashboard moderno, profesional y modular, inspirado en paneles realistas de administración tipo txAdmin, pero enfocado a la gestión profunda de frameworks como Overextended.

🚀 Características actuales (UI Mock)

La UI incluye los siguientes módulos completamente diseñados en React + Tailwind 4:

✔ Overview (Panel General)

Tarjetas estadísticas

Actividad reciente

Estado de servicios Overextended

Resumen rápido de logs

✔ Jugadores

Lista de jugadores conectados

Información de job, ping, identifier

Acciones: Ver / SetJob / TP / Ban (mock)

✔ Trabajos / Grupos

Vista completa de grupos (jobs, gangs…)

Rangos, permisos y estructura

UI de edición (mock)

✔ Inventario / Ítems

Lista estilo ox_inventory default

Name, label, weight, stack, close, consume

Buscador y filtros

✔ Vehículos

Vehículos en mundo / garaje / impound

Info de motor, carrocería, fuel

Acciones administrativas (mock)

✔ Puertas

Puertas estilo ox_doorlock

Estado, zona, tipo, permisos

Lock/Unlock, edición (mock)

✔ Logs / Auditoría

Acciones admin, jobs, dinero, items, vehículos, sistema

Filtros por tipo y nivel

Vista compacta estilo dashboard

🧩 Tecnologías usadas

React 19 + TypeScript

Vite 7

TailwindCSS v4

ESLint moderno

Arquitectura modular por paneles en /components

📁 Estructura del proyecto
oxe_administration_ui/
│
├── src/
│   ├── components/
│   │   ├── OverviewPanel.tsx
│   │   ├── PlayersTable.tsx
│   │   ├── JobsPanel.tsx
│   │   ├── ItemsPanel.tsx
│   │   ├── VehiclesPanel.tsx
│   │   ├── DoorsPanel.tsx
│   │   └── LogsPanel.tsx
│   │
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
│
├── index.html
├── package.json
├── tailwind.config.cjs (opcional)
└── README.md

⚙️ Cómo ejecutar en tu PC
npm install
npm run dev


Se abrirá en:

http://localhost:5173

🧱 Build de producción (para NUI en FiveM)
npm run build


Esto generará una carpeta dist/ lista para usar en el recurso de FiveM:

resources/[admin]/oxe_administration/ui/dist

🔮 Próximos pasos (Roadmap)

Integración real con ox_core vía NUI callbacks

Autenticación por roles (admin, superadmin, police boss…)

Edición real de ítems, jobs, puertas

Log completo con servidor (webhooks, sqlite, mysql)

Live-data del servidor (jugadores, recursos, memory usage)

Control avanzado: Freeze, revive, jail, espectador, warn

Soporte para Qbox / QBX en backend

API REST opcional para dashboards externos

🤝 Contribuciones

El proyecto es actualmente privado y en desarrollo activo.
Más adelante se abrirán pull requests para módulos externos.

🧑‍💻 Autor

Adrian (Beast Dev)
Desarrollo avanzado para FiveM, Overextended & Qbox.

🎉 Listo, tienes un README de nivel PRO

Si quieres:

Que añada capturas

Que ponga badges (npm, vite, react)

Que meta instrucciones para colaboradores

Que prepare README en inglés también
