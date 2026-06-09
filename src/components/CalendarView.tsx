import React from "react";
import { 
  CalendarDays, 
  Sparkles, 
  RotateCcw, 
  Filter, 
  Megaphone, 
  CheckSquare, 
  BookOpen, 
  ShieldAlert, 
  TrendingUp,
  UserCheck
} from "lucide-react";
import { BusinessProfile, Publication, ContentStrategy } from "../types";

interface CalendarViewProps {
  profile: BusinessProfile;
  strategy: ContentStrategy | null;
  calendar: Publication[];
  onGenerateCalendar: () => Promise<void>;
  loading: boolean;
}

export default function CalendarView({
  profile,
  strategy,
  calendar,
  onGenerateCalendar,
  loading,
}: CalendarViewProps) {
  const [filterObjective, setFilterObjective] = React.useState<string>("all");
  const [selectedPub, setSelectedPub] = React.useState<Publication | null>(null);
  const [errorStatus, setErrorStatus] = React.useState<string | null>(null);

  const handleGenerate = async () => {
    setErrorStatus(null);
    try {
      await onGenerateCalendar();
    } catch (err: any) {
      setErrorStatus(err.message || "Error al formular el calendario de 30 días.");
    }
  };

  // Filter strategy
  const filteredPubs = calendar.filter((pub) => {
    if (filterObjective === "all") return true;
    
    const objLower = pub.objective.toLowerCase();
    
    if (filterObjective === "autoridad") return objLower.includes("autoridad") || objLower.includes("authority") || objLower.includes("estatus");
    if (filterObjective === "educacion") return objLower.includes("educacion") || objLower.includes("education") || objLower.includes("educación");
    if (filterObjective === "comunidad") return objLower.includes("comunidad") || objLower.includes("community") || objLower.includes("engagement");
    if (filterObjective === "conversion") return objLower.includes("conversion") || objLower.includes("conversión") || objLower.includes("venta") || objLower.includes("lead");
    
    return true;
  });

  const getObjectiveIcon = (objective: string) => {
    const text = objective.toLowerCase();
    if (text.includes("autoridad") || text.includes("authority") || text.includes("estatus")) {
      return { icon: UserCheck, color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20", label: "Autoridad" };
    }
    if (text.includes("educacion") || text.includes("education") || text.includes("educación")) {
      return { icon: BookOpen, color: "text-blue-400 bg-blue-500/10 border-blue-500/20", label: "Educación" };
    }
    if (text.includes("comunidad") || text.includes("community")) {
      return { icon: Megaphone, color: "text-purple-400 bg-purple-500/10 border-purple-500/20", label: "Comunidad" };
    }
    return { icon: TrendingUp, color: "text-amber-400 bg-amber-500/10 border-amber-500/20", label: "Conversión" };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
        <div>
          <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
            <CalendarDays className="h-5.5 w-5.5 text-emerald-400" /> Calendario de Publicaciones (30 Días)
          </h2>
          <p className="text-xs text-zinc-400 mt-1">Sigue una pauta diaria de aportación de valor sin improvisar, con objetivos claros y llamadas a la acción vendedoras.</p>
        </div>
        {calendar.length > 0 && (
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="px-3 py-1.5 rounded-lg border border-zinc-800 hover:border-emerald-500/30 text-[11px] font-mono hover:text-emerald-400 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" /> Re-generar Editorial
          </button>
        )}
      </div>

      {errorStatus && (
        <div className="p-3 bg-rose-950/20 border border-rose-500/25 rounded-xl text-xs text-rose-400">
          {errorStatus}
        </div>
      )}

      {loading ? (
        <div className="py-24 flex flex-col items-center justify-center space-y-4">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-400 border-r-2 border-transparent" />
          <h4 className="text-sm font-display text-zinc-300 animate-pulse">Tejiendo el plan editorial estratégico...</h4>
          <p className="text-xs text-zinc-500 text-center max-w-sm">GrowthOS AI está balanceando los pilares de Autoridad, Educación, Comunidad y Ventas Directas para maximizar fidelidad.</p>
        </div>
      ) : calendar.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fade-in">
          
          {/* Main Grid left */}
          <div className="lg:col-span-8 space-y-4">
            
            {/* Filter controls */}
            <div className="bg-zinc-900/95 border border-zinc-800/85 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs text-zinc-400 font-medium">
                <Filter className="h-4 w-4 text-emerald-400" /> Filtrar por Pilar Estratégico:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { id: "all", label: "Todos los días" },
                  { id: "autoridad", label: "Autoridad" },
                  { id: "educacion", label: "Educación" },
                  { id: "comunidad", label: "Comunidad" },
                  { id: "conversion", label: "Conversión" },
                ].map((btn) => (
                  <button
                    key={btn.id}
                    onClick={() => setFilterObjective(btn.id)}
                    className={`
                      px-2.5 py-1 rounded-lg text-xs transition-colors cursor-pointer
                      ${filterObjective === btn.id 
                        ? "bg-zinc-800 border border-emerald-400/30 text-emerald-400 font-bold" 
                        : "bg-zinc-950/50 border border-transparent text-zinc-400 hover:text-zinc-350 hover:bg-zinc-900"
                      }
                    `}
                  >
                    {btn.label}
                  </button>
                ))}
              </div>
            </div>

            {/* List entries */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredPubs.map((pub) => {
                const badge = getObjectiveIcon(pub.objective);
                const BadgeIcon = badge.icon;
                return (
                  <div
                    key={pub.day}
                    onClick={() => setSelectedPub(pub)}
                    className="bg-zinc-900/95 border border-zinc-800/80 hover:border-emerald-500/25 rounded-xl p-4.5 space-y-3 shadow-md hover:shadow-emerald-500/5 transition-all text-left group cursor-pointer"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        DÍA {pub.day}
                      </span>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${badge.color} flex items-center gap-1`}>
                        <BadgeIcon className="h-2.5 w-2.5" /> {badge.label}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-white group-hover:text-emerald-400 transition-colors line-clamp-1">{pub.theme}</h4>
                      <p className="text-[11px] text-zinc-400 mt-1 line-clamp-2 leading-relaxed"><strong>Objetivo:</strong> {pub.objective}</p>
                    </div>

                    <div className="border-t border-zinc-800/60 pt-2.5 flex items-center justify-between text-[11px]">
                      <span className="text-zinc-500">Formato: <strong className="text-zinc-300 font-medium">{pub.format}</strong></span>
                      <span className="text-emerald-500 hover:underline cursor-pointer font-bold flex items-center gap-0.5 font-mono">Generar Detalle &rarr;</span>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

          {/* Right sidebar: selection details panel */}
          <div className="lg:col-span-4">
            <div className="bg-zinc-900/95 border border-zinc-800 rounded-2xl p-6 shadow-xl space-y-5 sticky top-6">
              
              {selectedPub ? (
                <div className="space-y-4 animate-fade-in">
                  <div className="flex justify-between items-center pb-2.5 border-b border-zinc-800/60">
                    <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded border border-emerald-500/25">
                      Día {selectedPub.day}
                    </span>
                    <span className="text-xs text-zinc-400 font-mono">Plan de 30 Días</span>
                  </div>

                  {/* Title theme */}
                  <div>
                    <label className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 leading-none">Tema de Publicación</label>
                    <h3 className="text-base font-bold text-white mt-1 leading-snug">{selectedPub.theme}</h3>
                  </div>

                  {/* Objective */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">¿Cuál es el fin estratégico?</label>
                    <div className="bg-zinc-950/70 border border-zinc-850 p-3 rounded-xl">
                      <p className="text-xs text-zinc-300 leading-relaxed font-sans">{selectedPub.objective}</p>
                    </div>
                  </div>

                  {/* Format */}
                  <div>
                    <label className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">Formato Recomendado</label>
                    <p className="text-xs text-emerald-400 font-semibold mt-0.5">{selectedPub.format}</p>
                  </div>

                  {/* CTA */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">Llamada a la Acción (CTA)</label>
                    <div className="bg-emerald-950/20 border border-emerald-500/15 p-3 rounded-xl">
                      <p className="text-xs text-emerald-300 leading-relaxed font-mono">"{selectedPub.cta}"</p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-zinc-800/60 flex flex-col gap-2">
                    <p className="text-[10px] text-zinc-500 text-center font-sans mt-1">¿Quieres escribir un guión de video o refinar esta idea detalladamente?</p>
                    {/* Action shortcut to script helper */}
                    <button
                      onClick={() => {
                        // Trick to communicate tab transitions to parent app shell
                        const event = new CustomEvent("tab-shortcut", { detail: { tab: "scripts", data: selectedPub.theme } });
                        window.dispatchEvent(event);
                      }}
                      className="w-full py-2.5 rounded-xl bg-zinc-950/70 border border-zinc-800 hover:border-emerald-500/20 text-zinc-300 hover:text-emerald-400 font-medium text-xs transition-all cursor-pointer flex justify-center items-center gap-1.5 font-mono"
                    >
                      Bajar a Guión de Conversión &rarr;
                    </button>
                  </div>

                </div>
              ) : (
                <div className="py-12 text-center text-zinc-550 space-y-3">
                  <CheckSquare className="h-10 w-10 text-zinc-800 mx-auto" />
                  <div>
                    <h4 className="text-xs font-semibold text-zinc-300 uppercase font-mono tracking-wider">No se ha seleccionado fecha</h4>
                    <p className="text-xs text-zinc-400 mt-1 max-w-[200px] mx-auto leading-normal">Haz clic en cualquier publicación de la lista para desglosar el objetivo táctico y CTA de venta.</p>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>
      ) : (
        <div className="bg-zinc-900/95 border border-zinc-800 border-dashed rounded-2xl p-12 text-center max-w-2xl mx-auto space-y-4">
          <CalendarDays className="h-12 w-12 text-zinc-800 mx-auto" />
          <div className="space-y-1">
            <h4 className="text-sm font-display font-medium text-zinc-300">Plan de Publicaciones Vacío</h4>
            <p className="text-xs text-zinc-550 max-w-md mx-auto leading-relaxed">
              Traduce tu posicionamiento estratégico de marca en un cronograma equilibrado de 15 publicaciones consecutivas de alto valor que cubren un período de 30 días, diseñadas para capturar leads estructurados.
            </p>
          </div>
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="px-5 py-2.5 text-xs font-semibold bg-emerald-500 hover:bg-emerald-600 text-zinc-955 rounded-xl shadow-lg transition-colors cursor-pointer inline-flex items-center gap-1.5"
          >
            <Sparkles className="h-4 w-4" /> Generar Plan de 30 Días con IA
          </button>
        </div>
      )}
    </div>
  );
}
