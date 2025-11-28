import React, { useMemo, useState } from "react";

export type LogType =
  | "admin"
  | "job"
  | "money"
  | "item"
  | "vehicle"
  | "door"
  | "system";

export type LogLevel = "info" | "warning" | "error";

export interface LogEntry {
  id: number;
  time: string; // por ahora string legible, luego podemos usar timestamp
  type: LogType;
  level: LogLevel;
  source?: string; // quién hizo la acción (nombre jugador / sistema)
  steamId?: string;
  action: string; // título corto: "SetJob", "GiveItem", etc.
  message: string; // descripción
}

// 🔹 Logs mock para vista previa
const mockLogs: LogEntry[] = [
  {
    id: 1,
    time: "2025-11-28 22:15:30",
    type: "admin",
    level: "info",
    source: "Adrian",
    steamId: "steam:110000112345678",
    action: "SetJob",
    message: "Adrian ha cambiado el job de Leo a police (officer).",
  },
  {
    id: 2,
    time: "2025-11-28 22:17:05",
    type: "item",
    level: "warning",
    source: "Sara",
    steamId: "steam:110000109876543",
    action: "GiveItem",
    message: "Sara ha dado 5x weapon_pistol a jugador ID 12.",
  },
  {
    id: 3,
    time: "2025-11-28 22:20:11",
    type: "money",
    level: "info",
    source: "Sistema",
    action: "AddMoney",
    message: "Se han dado 2000$ a job society_police (pago de facturas).",
  },
  {
    id: 4,
    time: "2025-11-28 22:25:42",
    type: "vehicle",
    level: "info",
    source: "Adrian",
    steamId: "steam:110000112345678",
    action: "ImpoundVehicle",
    message: "Vehículo BEAST69 ha sido enviado a depósito.",
  },
  {
    id: 5,
    time: "2025-11-28 22:27:10",
    type: "door",
    level: "info",
    source: "Leo",
    steamId: "steam:110000108888888",
    action: "ToggleDoor",
    message: "Puerta mrpd_cells ha sido bloqueada.",
  },
  {
    id: 6,
    time: "2025-11-28 22:30:00",
    type: "system",
    level: "error",
    source: "Sistema",
    action: "ResourceError",
    message:
      "oxe_administration ha intentado ejecutar una acción sin permisos válidos.",
  },
];

const typeLabels: Record<LogType, string> = {
  admin: "Admin",
  job: "Job / Grupo",
  money: "Dinero",
  item: "Ítems",
  vehicle: "Vehículos",
  door: "Puertas",
  system: "Sistema",
};

const levelColors: Record<LogLevel, string> = {
  info: "bg-slate-700/60 text-slate-100 border-slate-500/60",
  warning: "bg-amber-700/60 text-amber-50 border-amber-500/60",
  error: "bg-red-700/70 text-red-50 border-red-500/70",
};

const LogsPanel: React.FC = () => {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<LogType | "all">("all");
  const [filterLevel, setFilterLevel] = useState<LogLevel | "all">("all");

  const filtered = useMemo(() => {
    return mockLogs.filter((log) => {
      const matchSearch =
        !search.trim() ||
        log.message.toLowerCase().includes(search.toLowerCase()) ||
        log.action.toLowerCase().includes(search.toLowerCase()) ||
        (log.source &&
          log.source.toLowerCase().includes(search.toLowerCase())) ||
        (log.steamId &&
          log.steamId.toLowerCase().includes(search.toLowerCase()));

      const matchType =
        filterType === "all" ? true : log.type === filterType;

      const matchLevel =
        filterLevel === "all" ? true : log.level === filterLevel;

      return matchSearch && matchType && matchLevel;
    });
  }, [search, filterType, filterLevel]);

  return (
    <div className="space-y-4">
      {/* Barra superior */}
      <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
        <div>
          <h3 className="text-sm font-semibold">Logs / Auditoría</h3>
          <p className="text-xs text-slate-400">
            Registro de acciones administrativas, cambios de trabajo, dinero,
            ítems, vehículos, puertas y eventos del sistema. Más adelante esto
            estará alimentado directamente por el servidor.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 items-center">
          <input
            type="text"
            placeholder="Buscar por jugador, steam, acción o mensaje..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-3 py-1.5 text-xs rounded-md bg-slate-900 border border-slate-700 focus:outline-none focus:border-sky-500"
          />

          <select
            value={filterType}
            onChange={(e) =>
              setFilterType(e.target.value as LogType | "all")
            }
            className="px-3 py-1.5 text-xs rounded-md bg-slate-900 border border-slate-700 focus:outline-none focus:border-sky-500"
          >
            <option value="all">Todos los tipos</option>
            <option value="admin">Admin</option>
            <option value="job">Job / Grupo</option>
            <option value="money">Dinero</option>
            <option value="item">Ítems</option>
            <option value="vehicle">Vehículos</option>
            <option value="door">Puertas</option>
            <option value="system">Sistema</option>
          </select>

          <select
            value={filterLevel}
            onChange={(e) =>
              setFilterLevel(e.target.value as LogLevel | "all")
            }
            className="px-3 py-1.5 text-xs rounded-md bg-slate-900 border border-slate-700 focus:outline-none focus:border-sky-500"
          >
            <option value="all">Todos los niveles</option>
            <option value="info">Info</option>
            <option value="warning">Avisos</option>
            <option value="error">Errores</option>
          </select>

          <button className="ml-auto text-xs px-3 py-1.5 rounded-md bg-slate-800 hover:bg-slate-700">
            Exportar
          </button>
        </div>
      </div>

      {/* Tabla de logs */}
      <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-left text-slate-400 border-b border-slate-800">
                <th className="py-2">Hora</th>
                <th>Tipo</th>
                <th>Nivel</th>
                <th>Source</th>
                <th>Acción</th>
                <th>Mensaje</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((log) => (
                <tr
                  key={log.id}
                  className="border-b border-slate-800/60 hover:bg-slate-800/40"
                >
                  <td className="py-2 text-[0.7rem] text-slate-300">
                    {log.time}
                  </td>
                  <td>
                    <span className="text-[0.7rem] px-1.5 py-0.5 rounded bg-slate-800">
                      {typeLabels[log.type]}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full border text-[0.65rem] ${
                        levelColors[log.level]
                      }`}
                    >
                      {log.level.toUpperCase()}
                    </span>
                  </td>
                  <td>
                    <div>{log.source ?? "-"}</div>
                    {log.steamId && (
                      <div className="text-[0.7rem] text-slate-400 font-mono">
                        {log.steamId}
                      </div>
                    )}
                  </td>
                  <td className="font-mono text-[0.7rem]">{log.action}</td>
                  <td className="max-w-[360px]">
                    <div className="text-[0.75rem] text-slate-200">
                      {log.message}
                    </div>
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="py-6 text-center text-slate-500 text-xs"
                  >
                    No hay logs que coincidan con estos filtros.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LogsPanel;
