import React, { useMemo, useState } from "react";

export type DoorType = "single" | "double" | "gate" | "garage";

export interface DoorData {
  id: number;
  name: string;         // nombre interno: mrpd_front, pillbox_main...
  label: string;        // etiqueta visible
  type: DoorType;
  location: string;     // texto amigable (luego podemos meter coords)
  zone?: string;        // distrito / barrio / edificio
  locked: boolean;
  jobs?: string[];      // jobs que pueden abrir
  autorlock?: boolean;
  distance?: number;    // distancia de interacción
}

// Datos mock simulando algo tipo ox_doorlock config
const mockDoors: DoorData[] = [
  {
    id: 1,
    name: "mrpd_front",
    label: "Entrada principal MRPD",
    type: "double",
    location: "Mission Row PD · Entrada frontal",
    zone: "MRPD",
    locked: true,
    jobs: ["police"],
    autorlock: true,
    distance: 2.0,
  },
  {
    id: 2,
    name: "mrpd_cells",
    label: "Celdas MRPD",
    type: "single",
    location: "Mission Row PD · Celdas",
    zone: "MRPD",
    locked: true,
    jobs: ["police"],
    autorlock: true,
    distance: 1.5,
  },
  {
    id: 3,
    name: "pillbox_main",
    label: "Entrada Hospital",
    type: "double",
    location: "Pillbox Hill · Entrada principal",
    zone: "Hospital",
    locked: false,
    jobs: ["ambulance"],
    autorlock: false,
    distance: 2.5,
  },
  {
    id: 4,
    name: "mechanic_garage",
    label: "Puerta Taller",
    type: "garage",
    location: "La Mesa · Taller principal",
    zone: "Taller",
    locked: false,
    jobs: ["mechanic"],
    autorlock: false,
    distance: 8.0,
  },
  {
    id: 5,
    name: "gang_ballas_front",
    label: "Puerta Casa Ballas",
    type: "gate",
    location: "Davis · Casa Ballas",
    zone: "Ballas",
    locked: true,
    jobs: ["ballas"],
    autorlock: false,
    distance: 3.0,
  },
];

const typeLabels: Record<DoorType, string> = {
  single: "Puerta simple",
  double: "Puerta doble",
  gate: "Valla / Portón",
  garage: "Garaje",
};

const typeColors: Record<DoorType, string> = {
  single: "bg-slate-700/60 text-slate-100 border-slate-500/60",
  double: "bg-sky-700/60 text-sky-50 border-sky-500/60",
  gate: "bg-purple-700/60 text-purple-50 border-purple-500/60",
  garage: "bg-amber-700/60 text-amber-50 border-amber-500/60",
};

const DoorsPanel: React.FC = () => {
  const [search, setSearch] = useState("");
  const [filterLocked, setFilterLocked] = useState<"all" | "locked" | "unlocked">("all");

  const filteredDoors = useMemo(() => {
    return mockDoors.filter((door) => {
      const matchesSearch =
        !search.trim() ||
        door.label.toLowerCase().includes(search.toLowerCase()) ||
        door.name.toLowerCase().includes(search.toLowerCase()) ||
        (door.zone && door.zone.toLowerCase().includes(search.toLowerCase()));

      const matchesLock =
        filterLocked === "all"
          ? true
          : filterLocked === "locked"
          ? door.locked
          : !door.locked;

      return matchesSearch && matchesLock;
    });
  }, [search, filterLocked]);

  return (
    <div className="space-y-4">
      {/* Barra superior */}
      <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
        <div>
          <h3 className="text-sm font-semibold">Puertas / Accesos</h3>
          <p className="text-xs text-slate-400">
            Vista previa del sistema de puertas. Más adelante podremos sincronizar
            con ox_doorlock / ox_lib y controlar estados en vivo.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 items-center">
          <input
            type="text"
            placeholder="Buscar por nombre, label o zona..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-3 py-1.5 text-xs rounded-md bg-slate-900 border border-slate-700 focus:outline-none focus:border-sky-500"
          />

          <select
            value={filterLocked}
            onChange={(e) =>
              setFilterLocked(e.target.value as "all" | "locked" | "unlocked")
            }
            className="px-3 py-1.5 text-xs rounded-md bg-slate-900 border border-slate-700 focus:outline-none focus:border-sky-500"
          >
            <option value="all">Todas</option>
            <option value="locked">Bloqueadas</option>
            <option value="unlocked">Desbloqueadas</option>
          </select>

          <button className="ml-auto text-xs px-3 py-1.5 rounded-md bg-emerald-700 hover:bg-emerald-600">
            + Nueva puerta
          </button>
        </div>
      </div>

      {/* Tabla de puertas */}
      <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-left text-slate-400 border-b border-slate-800">
                <th className="py-2">Label</th>
                <th>Nombre</th>
                <th>Tipo</th>
                <th>Zona</th>
                <th>Localización</th>
                <th>Jobs</th>
                <th>Auto-lock</th>
                <th>Distancia</th>
                <th>Estado</th>
                <th className="text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredDoors.map((door) => (
                <tr
                  key={door.id}
                  className="border-b border-slate-800/60 hover:bg-slate-800/40"
                >
                  <td className="py-2">
                    <div className="font-medium">{door.label}</div>
                    <div className="text-[0.7rem] text-slate-400">
                      ID: {door.id}
                    </div>
                  </td>
                  <td className="font-mono text-[0.7rem]">{door.name}</td>
                  <td>
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full border text-[0.65rem] ${
                        typeColors[door.type]
                      }`}
                    >
                      {typeLabels[door.type]}
                    </span>
                  </td>
                  <td>{door.zone ?? "-"}</td>
                  <td className="max-w-[220px]">
                    <div className="text-[0.7rem] text-slate-300">
                      {door.location}
                    </div>
                  </td>
                  <td>
                    {door.jobs && door.jobs.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {door.jobs.map((job) => (
                          <span
                            key={job}
                            className="px-1.5 py-0.5 rounded bg-slate-800 text-[0.65rem]"
                          >
                            {job}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-slate-500 text-[0.7rem]">
                        Libre
                      </span>
                    )}
                  </td>
                  <td>{door.autorlock ? "Sí" : "No"}</td>
                  <td>{door.distance ?? "-"}m</td>
                  <td>
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full border text-[0.65rem] ${
                        door.locked
                          ? "bg-red-700/60 text-red-50 border-red-500/60"
                          : "bg-emerald-700/60 text-emerald-50 border-emerald-500/60"
                      }`}
                    >
                      {door.locked ? "Bloqueada" : "Abierta"}
                    </span>
                  </td>
                  <td className="text-right">
                    <button className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-[0.7rem]">
                      Toggle
                    </button>
                    <button className="ml-1 px-2 py-0.5 rounded bg-sky-700 hover:bg-sky-600 text-[0.7rem]">
                      Editar
                    </button>
                    <button className="ml-1 px-2 py-0.5 rounded bg-red-700 hover:bg-red-600 text-[0.7rem]">
                      Borrar
                    </button>
                  </td>
                </tr>
              ))}

              {filteredDoors.length === 0 && (
                <tr>
                  <td
                    colSpan={10}
                    className="py-6 text-center text-slate-500 text-xs"
                  >
                    No se han encontrado puertas con esos filtros.
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

export default DoorsPanel;
