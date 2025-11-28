import React, { useState } from 'react'
import OverviewPanel from "./components/OverviewPanel";
import PlayersTable from "./components/PlayersTable";
import JobsPanel from "./components/JobsPanel";
import ItemsPanel from "./components/ItemsPanel";
import VehiclesPanel from "./components/VehiclesPanel";
import DoorsPanel from "./components/DoorsPanel";
import LogsPanel from "./components/LogsPanel";

type Section =
  | 'overview'
  | 'players'
  | 'jobs'
  | 'inventory'
  | 'vehicles'
  | 'doors'
  | 'logs'

const App: React.FC = () => {
  const [section, setSection] = useState<Section>('overview')

  return (
    <div className="h-screen w-screen bg-slate-900 text-slate-100 flex">
      {/* SIDEBAR */}
      <aside className="w-64 bg-slate-950 border-r border-slate-800 flex flex-col">
        <div className="px-4 py-5 border-b border-slate-800">
          <h1 className="text-lg font-bold tracking-tight">
            oxe_administration
          </h1>
          <p className="text-xs text-slate-400">
            Panel de administración · ox_core
          </p>
        </div>

        <nav className="flex-1 px-2 py-4 space-y-1 text-sm">
          <SidebarButton
            label="Overview"
            active={section === 'overview'}
            onClick={() => setSection('overview')}
          />
          <SidebarButton
            label="Jugadores"
            active={section === 'players'}
            onClick={() => setSection('players')}
          />
          <SidebarButton
            label="Trabajos / Grupos"
            active={section === 'jobs'}
            onClick={() => setSection('jobs')}
          />
          <SidebarButton
            label="Inventario / Ítems"
            active={section === 'inventory'}
            onClick={() => setSection('inventory')}
          />
          <SidebarButton
            label="Vehículos"
            active={section === 'vehicles'}
            onClick={() => setSection('vehicles')}
          />
          <SidebarButton
            label="Puertas"
            active={section === 'doors'}
            onClick={() => setSection('doors')}
          />
          <SidebarButton
            label="Logs / Eventos"
            active={section === 'logs'}
            onClick={() => setSection('logs')}
          />
        </nav>

        <div className="px-4 py-3 border-t border-slate-800 text-xs text-slate-500">
          Conectado como{' '}
          <span className="font-medium text-slate-300">Admin</span>
        </div>
      </aside>

      {/* CONTENIDO */}
      <main className="flex-1 flex flex-col">
        {/* HEADER SUPERIOR */}
        <header className="h-14 border-b border-slate-800 flex items-center justify-between px-6">
          <div>
            <h2 className="text-base font-semibold">
              {getSectionTitle(section)}
            </h2>
            <p className="text-xs text-slate-400">
              Vista previa del panel de administración
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs text-slate-400">
            <span className="h-2 w-2 rounded-full bg-emerald-400 inline-block" />
            Live preview (modo web)
          </div>
        </header>

        {/* CONTENIDO PRINCIPAL */}
        <section className="flex-1 overflow-auto p-6 bg-slate-900">
          {section === 'overview' && <OverviewPanel />}
          {section === "players" && <PlayersSection />}
          {section === "jobs" && <JobsPanel />}
          {section === "inventory" && <ItemsPanel />}
          {section === "vehicles" && <VehiclesPanel />}
          {section === "doors" && <DoorsPanel />}
          {section === 'logs' && <LogsPanel />}
        </section>
      </main>
    </div>
  )
}

interface SidebarButtonProps {
  label: string
  active?: boolean
  onClick?: () => void
}

const SidebarButton: React.FC<SidebarButtonProps> = ({
  label,
  active,
  onClick,
}) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center px-3 py-2 rounded-md text-left text-xs md:text-sm transition
      ${active ? 'bg-slate-800 text-slate-50' : 'text-slate-300 hover:bg-slate-800/60'}
    `}
  >
    <span className="truncate">{label}</span>
  </button>
)

const Card: React.FC<React.PropsWithChildren<{ title: string; value?: string }>> = ({
  title,
  value,
  children,
}) => (
  <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 shadow-sm">
    <p className="text-[0.65rem] uppercase tracking-wide text-slate-400 mb-1">
      {title}
    </p>
    {value && <p className="text-xl font-semibold mb-2">{value}</p>}
    {children}
  </div>
)

/* MOCKS DE CONTENIDO - luego los remplazamos por datos reales */

const OverviewMock = () => (
  <div className="grid gap-4 md:grid-cols-3">
    <Card title="Jugadores conectados" value="18" />
    <Card title="Trabajos activos" value="7" />
    <Card title="Vehículos en mundo" value="52" />
    <div className="md:col-span-3">
      <Card title="Resumen rápido">
        <p className="text-sm text-slate-300">
          Aquí mostraremos gráficos, estadísticas rápidas y alertas del servidor
          (bans recientes, cambios de jobs, movimientos de dinero, etc.).
        </p>
      </Card>
    </div>
  </div>
)

const PlayersMock = () => (
  <Card title="Gestión de jugadores">
    <p className="text-sm text-slate-300 mb-2">
      Aquí veremos una tabla con los jugadores conectados, steam/rockstar, job,
      ping, etc., y acciones rápidas (inventario, teleport, job, bans).
    </p>
    <div className="mt-3 border border-dashed border-slate-700 rounded-md p-3 text-xs text-slate-400">
      Tabla dummy (próximo paso): ID · Nombre · Job · Grado · Acciones
    </div>
  </Card>
)

const JobsMock = () => (
  <Card title="Trabajos / Grupos">
    <p className="text-sm text-slate-300 mb-2">
      Aquí gestionaremos grupos de ox_core: crear trabajos, editar grades,
      permisos, cuentas de trabajo, etc.
    </p>
  </Card>
)

const InventoryMock = () => (
  <Card title="Inventario / Ítems">
    <p className="text-sm text-slate-300 mb-2">
      Listado de ítems, categorías, rareza y opciones para añadir/quitar ítems a
      jugadores o stashes.
    </p>
  </Card>
)

const VehiclesMock = () => (
  <Card title="Vehículos">
    <p className="text-sm text-slate-300 mb-2">
      Gestión de vehículos: buscar por placa, dueño, job, estado (garaje, fuera),
      combustible, etc.
    </p>
  </Card>
)

const DoorsMock = () => (
  <Card title="Puertas">
    <p className="text-sm text-slate-300 mb-2">
      Configuración de ox_doorlock: permisos de acceso, estado, autolock, etc.
    </p>
  </Card>
)

const LogsMock = () => (
  <Card title="Logs / Eventos">
    <p className="text-sm text-slate-300 mb-2">
      Aquí veremos logs de acciones admin, cambios de dinero, uso de ítems, etc.
    </p>
  </Card>
)

function getSectionTitle(section: Section): string {
  switch (section) {
    case 'overview':
      return 'Overview del servidor'
    case 'players':
      return 'Gestión de jugadores'
    case 'jobs':
      return 'Gestión de trabajos / grupos'
    case 'inventory':
      return 'Inventario e ítems'
    case 'vehicles':
      return 'Gestión de vehículos'
    case 'doors':
      return 'Puertas y accesos'
    case 'logs':
      return 'Logs y auditoría'
    default:
      return ''
  }
}

// --- PLAYERS SECTION ---

const PlayersSection = () => {
  const mockPlayers = [
    {
      id: 1,
      name: "Adrian",
      identifier: "steam:110000112345678",
      job: "police",
      grade: "chief",
      ping: 38,
      status: "online",
    },
    {
      id: 2,
      name: "Sara",
      identifier: "steam:110000109876543",
      job: "ambulance",
      grade: "doctor",
      ping: 58,
      status: "online",
    },
    {
      id: 3,
      name: "Leo",
      identifier: "rockstar:987654321",
      job: "unemployed",
      grade: "none",
      ping: 44,
      status: "offline",
    },
  ];

  return <PlayersTable players={mockPlayers} />;
};


export default App
