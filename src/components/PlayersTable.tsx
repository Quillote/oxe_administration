import React from "react";

export interface PlayerData {
  id: number;
  name: string;
  identifier: string;
  job: string;
  grade: string;
  ping: number;
  status: "online" | "offline";
}

interface Props {
  players: PlayerData[];
}

const statusColors: Record<PlayerData["status"], string> = {
  online: "bg-emerald-500",
  offline: "bg-red-500",
};

const PlayersTable: React.FC<Props> = ({ players }) => {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 shadow">
      <h3 className="text-lg font-semibold mb-4">Jugadores conectados</h3>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-400 border-b border-slate-800">
              <th className="py-2">ID</th>
              <th>Nombre</th>
              <th>Identificador</th>
              <th>Job</th>
              <th>Grado</th>
              <th>Ping</th>
              <th>Estado</th>
              <th className="text-right">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {players.map((p) => (
              <tr
                key={p.id}
                className="border-b border-slate-800/50 hover:bg-slate-800/30 transition"
              >
                <td className="py-2">{p.id}</td>
                <td>{p.name}</td>
                <td className="text-slate-400 text-xs">{p.identifier}</td>
                <td>{p.job}</td>
                <td>{p.grade}</td>
                <td>{p.ping}ms</td>
                <td>
                  <span
                    className={`inline-block w-3 h-3 rounded-full ${statusColors[p.status]}`}
                  />
                </td>
                <td className="text-right">
                  <button className="px-2 py-1 text-xs rounded bg-slate-800 hover:bg-slate-700">
                    Ver
                  </button>
                  <button className="ml-2 px-2 py-1 text-xs rounded bg-blue-700 hover:bg-blue-600">
                    Job
                  </button>
                  <button className="ml-2 px-2 py-1 text-xs rounded bg-emerald-700 hover:bg-emerald-600">
                    TP
                  </button>
                  <button className="ml-2 px-2 py-1 text-xs rounded bg-red-700 hover:bg-red-600">
                    Ban
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PlayersTable;
