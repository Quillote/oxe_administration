import React from "react";

const OverviewPanel: React.FC = () => {
  // Datos mock – luego podremos rellenarlos desde el servidor
  const playersOnline = 18;
  const resourcesRunning = 142;
  const avgPing = 48;
  const txTick = 96;

  const recentActivity = [
    "Adrian ha cambiado el job de Leo a police (officer).",
    "Sara ha dado 5x weapon_pistol a jugador ID 12.",
    "Vehículo BEAST69 ha sido enviado a depósito.",
    "Puerta mrpd_cells ha sido bloqueada.",
  ];

  const services = [
    { name: "ox_core", status: "online" as const },
    { name: "ox_inventory", status: "online" as const },
    { name: "ox_lib", status: "online" as const },
    { name: "ox_target", status: "online" as const },
    { name: "qbx_core", status: "warning" as const },
  ];

  return (
    <div className="space-y-4">
      {/* GRID SUPERIOR */}
      <div className="grid gap-4 md:grid-cols-4">
        <OverviewCard
          title="Jugadores conectados"
          value={playersOnline.toString()}
          subtitle="Slots ocupados ahora mismo"
        />
        <OverviewCard
          title="Recursos activos"
          value={resourcesRunning.toString()}
          subtitle="Scripts cargados en el servidor"
        />
        <OverviewCard
          title="Tickrate aprox."
          value={txTick + " Hz"}
          subtitle="Estabilidad general del servidor"
        />
        <OverviewCard
          title="Ping medio"
          value={avgPing + " ms"}
          subtitle="Ping promedio jugadores conectados"
        />
      </div>

      {/* SEGUNDA FILA: ACTIVIDAD + SERVICIOS */}
      <div className="grid gap-4 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        {/* Actividad reciente */}
        <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4">
          <h3 className="text-sm font-semibold mb-2">Actividad reciente</h3>
          <p className="text-xs text-slate-400 mb-3">
            Últimas acciones relevantes registradas en el servidor.
          </p>
          <ul className="space-y-1.5">
            {recentActivity.map((item, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2 text-[0.8rem] text-slate-200"
              >
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Estado de servicios */}
        <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4">
          <h3 className="text-sm font-semibold mb-2">Estado de servicios</h3>
          <p className="text-xs text-slate-400 mb-3">
            Estado de módulos clave de Overextended / framework.
          </p>
          <div className="space-y-1.5">
            {services.map((svc) => (
              <ServiceStatusRow key={svc.name} name={svc.name} status={svc.status} />
            ))}
          </div>
        </div>
      </div>

      {/* TERCERA FILA: LOGS RÁPIDOS */}
      <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold">Resumen de logs</h3>
          <span className="text-[0.7rem] text-slate-400">
            Vista rápida · Para detalle ve a “Logs / Auditoría”
          </span>
        </div>
        <div className="grid gap-2 md:grid-cols-3 text-[0.8rem]">
          <QuickLogCard
            title="Acciones admin"
            description="Cambios de job, TP, bans, giveitem..."
          />
          <QuickLogCard
            title="Economía"
            description="Movimientos de dinero, jobs, sociedades..."
          />
          <QuickLogCard
            title="Seguridad / Errores"
            description="Errores de recursos, intents fallidos, etc."
          />
        </div>
      </div>
    </div>
  );
};

interface OverviewCardProps {
  title: string;
  value: string;
  subtitle?: string;
}

const OverviewCard: React.FC<OverviewCardProps> = ({
  title,
  value,
  subtitle,
}) => {
  return (
    <div className="relative overflow-hidden rounded-xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-4 shadow">
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(circle_at_top,_#22c55e_0,_transparent_45%),_radial-gradient(circle_at_bottom,_#0ea5e9_0,_transparent_45%)]" />
      <div className="relative">
        <p className="text-[0.65rem] uppercase tracking-wide text-slate-400 mb-1">
          {title}
        </p>
        <p className="text-2xl font-semibold mb-1">{value}</p>
        {subtitle && (
          <p className="text-[0.7rem] text-slate-400">{subtitle}</p>
        )}
      </div>
    </div>
  );
};

const ServiceStatusRow: React.FC<{ name: string; status: "online" | "warning" | "offline" }> = ({
  name,
  status,
}) => {
  const label =
    status === "online" ? "Online" : status === "warning" ? "Aviso" : "Offline";
  const color =
    status === "online"
      ? "bg-emerald-500"
      : status === "warning"
      ? "bg-amber-400"
      : "bg-red-500";

  return (
    <div className="flex items-center justify-between text-[0.8rem]">
      <span className="font-mono text-slate-200">{name}</span>
      <span className="inline-flex items-center gap-1">
        <span className={`h-2 w-2 rounded-full ${color}`} />
        <span className="text-slate-300">{label}</span>
      </span>
    </div>
  );
};

const QuickLogCard: React.FC<{ title: string; description: string }> = ({
  title,
  description,
}) => (
  <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-3">
    <p className="text-[0.75rem] font-semibold text-slate-100 mb-1">{title}</p>
    <p className="text-[0.7rem] text-slate-400">{description}</p>
  </div>
);

export default OverviewPanel;
