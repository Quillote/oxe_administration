import React, { useState } from "react";

export type GroupType = "job" | "gang" | "other";

export interface GroupGrade {
  id: number;
  name: string;
  label: string;
  isBoss?: boolean;
}

export interface GroupData {
  name: string;        // nombre interno: police, ambulance, etc.
  label: string;       // etiqueta visible: Policía, EMS...
  type: GroupType;     // job, gang, other
  primary: boolean;    // si puede ser job principal
  color?: string;      // color representativo
  account?: string;    // nombre de cuenta (society)
  grades: GroupGrade[];
}

// 🔹 Datos mock (luego saldrán de ox_core / servidor)
const mockGroups: GroupData[] = [
  {
    name: "police",
    label: "Policía",
    type: "job",
    primary: true,
    color: "#3b82f6",
    account: "society_police",
    grades: [
      { id: 0, name: "recruit", label: "Recluta" },
      { id: 1, name: "officer", label: "Oficial" },
      { id: 2, name: "sergeant", label: "Sargento" },
      { id: 3, name: "boss", label: "Jefe", isBoss: true },
    ],
  },
  {
    name: "ambulance",
    label: "EMS",
    type: "job",
    primary: true,
    color: "#22c55e",
    account: "society_ambulance",
    grades: [
      { id: 0, name: "intern", label: "Prácticas" },
      { id: 1, name: "doctor", label: "Doctor" },
      { id: 2, name: "chief", label: "Jefe de EMS", isBoss: true },
    ],
  },
  {
    name: "mechanic",
    label: "Mecánico",
    type: "job",
    primary: true,
    color: "#eab308",
    account: "society_mechanic",
    grades: [
      { id: 0, name: "apprentice", label: "Aprendiz" },
      { id: 1, name: "worker", label: "Oficial" },
      { id: 2, name: "boss", label: "Dueño", isBoss: true },
    ],
  },
  {
    name: "ballas",
    label: "Ballas",
    type: "gang",
    primary: false,
    color: "#a855f7",
    grades: [
      { id: 0, name: "member", label: "Miembro" },
      { id: 1, name: "og", label: "OG", isBoss: true },
    ],
  },
];

const typeBadges: Record<GroupType, string> = {
  job: "bg-sky-700/60 text-sky-100 border-sky-500/50",
  gang: "bg-purple-700/60 text-purple-100 border-purple-500/50",
  other: "bg-slate-700/60 text-slate-100 border-slate-500/50",
};

const JobsPanel: React.FC = () => {
  const [selected, setSelected] = useState<GroupData | null>(
    mockGroups[0] ?? null
  );

  return (
    <div className="grid gap-4 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
      {/* LISTA DE GRUPOS */}
      <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold">Trabajos / Grupos</h3>
          <button className="text-xs px-2 py-1 rounded bg-emerald-700 hover:bg-emerald-600">
            + Nuevo grupo
          </button>
        </div>

        <div className="space-y-1 max-h-[420px] overflow-y-auto">
          {mockGroups.map((group) => {
            const active = selected?.name === group.name;
            return (
              <button
                key={group.name}
                onClick={() => setSelected(group)}
                className={`w-full text-left px-3 py-2 rounded-lg border text-xs md:text-sm flex items-center justify-between gap-2 transition
                  ${
                    active
                      ? "bg-slate-800 border-slate-500 text-slate-50"
                      : "bg-slate-900/40 border-slate-800 text-slate-200 hover:bg-slate-800/60"
                  }
                `}
              >
                <div>
                  <div className="font-medium">{group.label}</div>
                  <div className="text-[0.7rem] text-slate-400">
                    {group.name} · {group.grades.length} rangos
                  </div>
                </div>
                <span
                  className={`px-2 py-0.5 rounded-full border text-[0.65rem] uppercase tracking-wide ${typeBadges[group.type]}`}
                >
                  {group.type}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* DETALLE DEL GRUPO SELECCIONADO */}
      <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4">
        {selected ? (
          <>
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <h3 className="text-sm font-semibold">
                  {selected.label}{" "}
                  <span className="text-xs text-slate-400">
                    ({selected.name})
                  </span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Tipo:{" "}
                  <span className="font-medium text-slate-200">
                    {selected.type}
                  </span>{" "}
                  · Job principal:{" "}
                  <span className="font-medium text-slate-200">
                    {selected.primary ? "Sí" : "No"}
                  </span>
                </p>
                {selected.account && (
                  <p className="text-xs text-slate-400">
                    Cuenta asociada:{" "}
                    <span className="font-mono text-slate-200">
                      {selected.account}
                    </span>
                  </p>
                )}
              </div>
              {selected.color && (
                <div className="flex flex-col items-end gap-1">
                  <span className="text-[0.65rem] text-slate-400">
                    Color
                  </span>
                  <div
                    className="w-8 h-8 rounded-md border border-slate-700"
                    style={{ backgroundColor: selected.color }}
                  />
                </div>
              )}
            </div>

            {/* Tabla de grades */}
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wide">
                Rangos
              </h4>
              <button className="text-xs px-2 py-1 rounded bg-slate-800 hover:bg-slate-700">
                + Añadir rango
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-left text-slate-400 border-b border-slate-800">
                    <th className="py-1">ID</th>
                    <th>Nombre interno</th>
                    <th>Etiqueta</th>
                    <th>Jefe</th>
                    <th className="text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {selected.grades.map((g) => (
                    <tr
                      key={g.id}
                      className="border-b border-slate-800/60 hover:bg-slate-800/40"
                    >
                      <td className="py-1">{g.id}</td>
                      <td className="font-mono text-[0.7rem]">{g.name}</td>
                      <td>{g.label}</td>
                      <td>{g.isBoss ? "Sí" : "No"}</td>
                      <td className="text-right">
                        <button className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-[0.7rem]">
                          Editar
                        </button>
                        <button className="ml-2 px-2 py-0.5 rounded bg-red-700 hover:bg-red-600 text-[0.7rem]">
                          Borrar
                        </button>
                      </td>
                    </tr>
                  ))}
                  {selected.grades.length === 0 && (
                    <tr>
                      <td
                        colSpan={5}
                        className="py-3 text-center text-slate-500"
                      >
                        No hay rangos configurados todavía.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <p className="text-sm text-slate-400">
            Selecciona un trabajo/grupo en la lista de la izquierda para ver sus
            detalles.
          </p>
        )}
      </div>
    </div>
  );
};

export default JobsPanel;
