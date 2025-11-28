import React, { useMemo, useState } from "react";

export type VehicleState = "stored" | "out" | "impound";

export interface VehicleData {
  plate: string;
  label: string;
  model: string;
  ownerName: string;
  ownerIdentifier: string;
  job?: string;
  garage?: string;
  state: VehicleState;
  fuel: number;          // 0-100
  engineHealth: number;  // 0-1000 (luego podremos mapearlo)
  bodyHealth: number;    // 0-1000
}

// Datos mock para ir viendo el panel
const mockVehicles: VehicleData[] = [
  {
    plate: "POLI123",
    label: "Coche Patrulla",
    model: "police2",
    ownerName: "Estado",
    ownerIdentifier: "job:police",
    job: "police",
    garage: "MRPD",
    state: "stored",
    fuel: 100,
    engineHealth: 1000,
    bodyHealth: 900,
  },
  {
    plate: "EMS001",
    label: "Ambulancia",
    model: "ambulance",
    ownerName: "Estado",
    ownerIdentifier: "job:ambulance",
    job: "ambulance",
    garage: "Hospital",
    state: "out",
    fuel: 72,
    engineHealth: 850,
    bodyHealth: 800,
  },
  {
    plate: "BEAST69",
    label: "Coupé Beast",
    model: "elegy",
    ownerName: "Adrian",
    ownerIdentifier: "steam:110000112345678",
    job: "unemployed",
    garage: "Pillbox",
    state: "out",
    fuel: 54,
    engineHealth: 700,
    bodyHealth: 600,
  },
  {
    plate: "CHATGPT",
    label: "Sedán Misterioso",
    model: "tailgater",
    ownerName: "Sara",
    ownerIdentifier: "rockstar:9988776655",
    job: "mechanic",
    garage: "Taller Central",
    state: "stored",
    fuel: 80,
    engineHealth: 950,
    bodyHealth: 950,
  },
  {
    plate: "IMPND01",
    label: "Sultan Incautado",
    model: "sultan",
    ownerName: "Leo",
    ownerIdentifier: "steam:110000109876543",
    job: "unemployed",
    garage: "Depósito",
    state: "impound",
    fuel: 30,
    engineHealth: 500,
    bodyHealth: 400,
  },
];

const stateLabels: Record<VehicleState, string> = {
  stored: "En garaje",
  out: "En mundo",
  impound: "Impound",
};

const stateColors: Record<VehicleState, string> = {
  stored: "bg-emerald-700/60 text-emerald-50 border-emerald-500/60",
  out: "bg-sky-700/60 text-sky-50 border-sky-500/60",
  impound: "bg-amber-700/60 text-amber-50 border-amber-500/60",
};

const VehiclesPanel: React.FC = () => {
  const [search, setSearch] = useState("");
  const [filterState, setFilterState] = useState<VehicleState | "all">("all");

  const filtered = useMemo(() => {
    return mockVehicles.filter((veh) => {
      const matchesSearch =
        !search.trim() ||
        veh.plate.toLowerCase().includes(search.toLowerCase()) ||
        veh.ownerName.toLowerCase().includes(search.toLowerCase()) ||
        veh.ownerIdentifier.toLowerCase().includes(search.toLowerCase());

      const matchesState =
        filterState === "all" ? true : veh.state === filterState;

      return matchesSearch && matchesState;
    });
  }, [search, filterState]);

  return (
    <div className="space-y-4">
      {/* Barra superior */}
      <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
        <div>
          <h3 className="text-sm font-semibold">Vehículos</h3>
          <p className="text-xs text-slate-400">
            Vista previa del gestor de vehículos. Más adelante podremos buscar
            en base de datos / garajes y hacer acciones administrativas
            (impound, TP, respawn...).
          </p>
        </div>

        <div className="flex flex-wrap gap-2 items-center">
          <input
            type="text"
            placeholder="Buscar por matrícula, dueño o id..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-3 py-1.5 text-xs rounded-md bg-slate-900 border border-slate-700 focus:outline-none focus:border-sky-500"
          />

          <select
            value={filterState}
            onChange={(e) =>
              setFilterState(e.target.value as VehicleState | "all")
            }
            className="px-3 py-1.5 text-xs rounded-md bg-slate-900 border border-slate-700 focus:outline-none focus:border-sky-500"
          >
            <option value="all">Todos los estados</option>
            <option value="stored">En garaje</option>
            <option value="out">En mundo</option>
            <option value="impound">Impound</option>
          </select>

          <button className="ml-auto text-xs px-3 py-1.5 rounded-md bg-emerald-700 hover:bg-emerald-600">
            + Registrar vehículo
          </button>
        </div>
      </div>

      {/* Tabla */}
      <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-left text-slate-400 border-b border-slate-800">
                <th className="py-2">Matrícula</th>
                <th>Label / Modelo</th>
                <th>Dueño</th>
                <th>Job</th>
                <th>Garaje</th>
                <th>Estado</th>
                <th>Fuel</th>
                <th>Motor</th>
                <th>Carrocería</th>
                <th className="text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((veh) => (
                <tr
                  key={veh.plate}
                  className="border-b border-slate-800/60 hover:bg-slate-800/40"
                >
                  <td className="py-2 font-mono">{veh.plate}</td>
                  <td>
                    <div className="font-medium">{veh.label}</div>
                    <div className="text-[0.7rem] text-slate-400 font-mono">
                      {veh.model}
                    </div>
                  </td>
                  <td>
                    <div>{veh.ownerName}</div>
                    <div className="text-[0.7rem] text-slate-400 font-mono">
                      {veh.ownerIdentifier}
                    </div>
                  </td>
                  <td>{veh.job ?? "-"}</td>
                  <td>{veh.garage ?? "-"}</td>
                  <td>
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full border text-[0.65rem] ${
                        stateColors[veh.state]
                      }`}
                    >
                      {stateLabels[veh.state]}
                    </span>
                  </td>
                  <td>{veh.fuel}%</td>
                  <td>{Math.round((veh.engineHealth / 1000) * 100)}%</td>
                  <td>{Math.round((veh.bodyHealth / 1000) * 100)}%</td>
                  <td className="text-right">
                    <button className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-[0.7rem]">
                      Ver
                    </button>
                    <button className="ml-1 px-2 py-0.5 rounded bg-sky-700 hover:bg-sky-600 text-[0.7rem]">
                      TP
                    </button>
                    <button className="ml-1 px-2 py-0.5 rounded bg-amber-700 hover:bg-amber-600 text-[0.7rem]">
                      Impound
                    </button>
                    <button className="ml-1 px-2 py-0.5 rounded bg-red-700 hover:bg-red-600 text-[0.7rem]">
                      Borrar
                    </button>
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={10}
                    className="py-6 text-center text-slate-500 text-xs"
                  >
                    No se han encontrado vehículos con esos filtros.
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

export default VehiclesPanel;
