import React, { useMemo, useState } from "react";

export interface ItemData {
  name: string;        // nombre interno: bread, bandage, pistol
  label: string;       // nombre visible: Pan, Vendaje, Pistola
  weight: number;      // en gramos, como ox_inventory
  stack: boolean;      // si se puede apilar
  close: boolean;      // si cierra el inventario al usarlo
  consume?: number;    // 0-1 o undefined/0 si no se consume
  description?: string;
  // más adelante podremos añadir: client, server, degrade, etc.
}

// 🔹 Datos mock siguiendo el estilo de ox_inventory por defecto
const mockItems: ItemData[] = [
  {
    name: "bread",
    label: "Pan",
    weight: 100,
    stack: true,
    close: true,
    consume: 0.2,
    description: "Básico pero efectivo, quita un poco de hambre.",
  },
  {
    name: "water",
    label: "Agua",
    weight: 100,
    stack: true,
    close: true,
    consume: 0.2,
    description: "Botella de agua. Fundamental para no palmarla.",
  },
  {
    name: "bandage",
    label: "Vendaje",
    weight: 50,
    stack: true,
    close: true,
    consume: 1,
    description: "Detiene hemorragias ligeras.",
  },
  {
    name: "medikit",
    label: "Botiquín",
    weight: 300,
    stack: false,
    close: true,
    consume: 1,
    description: "Kit médico completo. Ideal si te han dado amor los balazos.",
  },
  {
    name: "weapon_pistol",
    label: "Pistola 9mm",
    weight: 1000,
    stack: false,
    close: true,
    consume: 0,
    description: "Pistola básica, pero mejor que ir con las manos.",
  },
  {
    name: "lockpick",
    label: "Ganzúa",
    weight: 200,
    stack: true,
    close: true,
    consume: 0.1,
    description: "Ideal para abrir lo que no deberías.",
  },
  {
    name: "phone",
    label: "Móvil",
    weight: 250,
    stack: false,
    close: false,
    consume: 0,
    description: "Tu ventana al metagaming. Úsalo con sabiduría.",
  },
];

const ItemsPanel: React.FC = () => {
  const [search, setSearch] = useState("");

  const filteredItems = useMemo(() => {
    return mockItems.filter((item) => {
      if (!search.trim()) return true;
      return (
        item.label.toLowerCase().includes(search.toLowerCase()) ||
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    });
  }, [search]);

  return (
    <div className="space-y-4">
      {/* Barra superior */}
      <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
        <div>
          <h3 className="text-sm font-semibold">Inventario / Ítems</h3>
          <p className="text-xs text-slate-400">
            Vista previa del sistema de items basado en la definición por
            defecto de ox_inventory (name, label, weight, stack, close,
            consume...).
          </p>
        </div>

        <div className="flex flex-wrap gap-2 items-center">
          <input
            type="text"
            placeholder="Buscar por nombre o id..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-3 py-1.5 text-xs rounded-md bg-slate-900 border border-slate-700 focus:outline-none focus:border-sky-500"
          />

          <button className="ml-auto text-xs px-3 py-1.5 rounded-md bg-emerald-700 hover:bg-emerald-600">
            + Nuevo ítem
          </button>
        </div>
      </div>

      {/* Tabla de ítems */}
      <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-left text-slate-400 border-b border-slate-800">
                <th className="py-2">Label</th>
                <th>Nombre</th>
                <th>Peso</th>
                <th>Stack</th>
                <th>Close</th>
                <th>Consume</th>
                <th className="text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => (
                <tr
                  key={item.name}
                  className="border-b border-slate-800/60 hover:bg-slate-800/40"
                >
                  <td className="py-2">
                    <div className="font-medium">{item.label}</div>
                    {item.description && (
                      <div className="text-[0.7rem] text-slate-400 line-clamp-2">
                        {item.description}
                      </div>
                    )}
                  </td>
                  <td className="font-mono text-[0.7rem]">{item.name}</td>
                  <td>{item.weight}</td>
                  <td>{item.stack ? "Sí" : "No"}</td>
                  <td>{item.close ? "Sí" : "No"}</td>
                  <td>
                    {typeof item.consume === "number" && item.consume > 0
                      ? item.consume
                      : "0"}
                  </td>
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

              {filteredItems.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="py-6 text-center text-slate-500 text-xs"
                  >
                    No se han encontrado ítems con esa búsqueda.
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

export default ItemsPanel;
