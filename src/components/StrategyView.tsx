import React from "react";
import { 
  Target, 
  Sparkles, 
  CheckCircle2, 
  Compass, 
  Crown, 
  Layers, 
  Flag,
  RotateCcw
} from "lucide-react";
import { BusinessProfile, BusinessDiagnostic, ContentStrategy } from "../types";

interface StrategyViewProps {
  profile: BusinessProfile;
  diagnostic: BusinessDiagnostic | null;
  strategy: ContentStrategy | null;
  onRunStrategy: () => Promise<void>;
  loading: boolean;
  onNavigate: (tab: any) => void;
}

export default function StrategyView({
  profile,
  diagnostic,
  strategy,
  onRunStrategy,
  loading,
  onNavigate,
}: StrategyViewProps) {
  const [errorStatus, setErrorStatus] = React.useState<string | null>(null);

  const handleGenerateStrategy = async () => {
    setErrorStatus(null);
    if (!profile.businessName) {
      setErrorStatus("Registra al menos el nombre de tu negocio en la pestaña de Diagnóstico antes de estructurar la estrategia.");
      return;
    }
    try {
      await onRunStrategy();
    } catch (err: any) {
      setErrorStatus(err.message || "Error al comunicar con la IA.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
        <div>
          <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
            <Target className="h-5.5 w-5.5 text-emerald-400" /> Estrategia de Contenido y Mensaje
          </h2>
          <p className="text-xs text-zinc-400 mt-1">Define tu mensaje magnético, propuesta de valor inigualable y los diferenciadores recomendados por GrowthOS AI.</p>
        </div>
        {strategy && (
          <button
            onClick={handleGenerateStrategy}
            disabled={loading}
            className="px-3.5 py-1.5 rounded-lg border border-zinc-800 hover:border-emerald-500/30 text-[11px] font-mono hover:text-emerald-400 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" /> Re-generar Estrategia
          </button>
        )}
      </div>

      {errorStatus && (
        <div className="p-3.5 bg-rose-950/20 border border-rose-500/20 rounded-xl text-xs text-rose-400">
          {errorStatus}
        </div>
      )}

      {loading ? (
        <div className="py-24 flex flex-col items-center justify-center space-y-4">
          <div className="relative">
            <span className="absolute inset-0 rounded-full bg-emerald-400 opacity-20 blur-lg animate-pulse" />
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-emerald-400 border-r-2 border-transparent" />
          </div>
          <p className="text-sm font-display text-zinc-300 animate-pulse"> GrowthOS AI está formulando los pilares de posicionamiento...</p>
          <p className="text-xs text-zinc-500 max-w-sm text-center">Analizando perfil a nivel competitivo para idear una propuesta de valor de alto impacto comercial.</p>
        </div>
      ) : strategy ? (
        <div className="space-y-6 animate-fade-in">
          
          {/* Main positioning Block with neon accent */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Value Proposition & Recommended Positioning */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Proposed Positioning */}
              <div className="bg-zinc-900/95 border border-zinc-800/80 rounded-2xl p-6 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5 text-emerald-400">
                  <Compass className="h-16 w-16" />
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <Compass className="h-4.5 w-4.5 text-emerald-400" />
                  <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">Posicionamiento Recomendado</span>
                </div>
                <p className="text-sm text-zinc-100 font-medium leading-relaxed font-sans">
                  {strategy.recommendedPositioning}
                </p>
              </div>

              {/* Value Proposition */}
              <div className="bg-zinc-900/95 border border-zinc-800/80 rounded-2xl p-6 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5 text-emerald-400">
                  <Crown className="h-16 w-16" />
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <Crown className="h-4.5 w-4.5 text-emerald-400" />
                  <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">Propuesta de Valor de Marca</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2 leading-tight">
                  ¿Por qué comprarte a ti frente a cualquier opción?
                </h3>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  {strategy.valueProposition}
                </p>
              </div>

              {/* Primary Message */}
              <div className="bg-zinc-900/95 border border-zinc-800/80 rounded-2xl p-6 shadow-xl relative overflow-hidden">
                <div className="flex items-center gap-2 mb-3">
                  <Layers className="h-4.5 w-4.5 text-emerald-400" />
                  <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">Mensaje Central de Conversión</span>
                </div>
                <div className="p-4 bg-zinc-950/70 border-l-4 border-emerald-400 rounded-r-xl">
                  <p className="text-sm font-sans font-semibold text-white leading-relaxed italic">
                    "{strategy.primaryMessage}"
                  </p>
                </div>
                <p className="text-[11px] text-zinc-400 mt-2">
                  Usa este mensaje principal en tu bio de redes sociales, tus primeros 3 segundos de video (hook) y tu página de ventas.
                </p>
              </div>

            </div>

            {/* Differentiators & 30 Days goals */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Differentiators */}
              <div className="bg-zinc-900/95 border border-zinc-800/80 rounded-2xl p-6 shadow-xl">
                <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-4 flex items-center gap-1.5">
                  <Crown className="h-3.5 w-3.5 text-emerald-400" /> Ventajas Competitivas
                </h4>
                <div className="space-y-3.5">
                  {strategy.differentiators.map((diff, idx) => (
                    <div key={idx} className="flex gap-2.5 items-start">
                      <div className="bg-emerald-500/10 p-1 rounded-lg border border-emerald-500/20 text-emerald-400 shrink-0 mt-0.5">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                      </div>
                      <p className="text-xs text-zinc-300 font-sans leading-relaxed">{diff}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Objectives */}
              <div className="bg-zinc-900/95 border border-zinc-800/80 rounded-2xl p-6 shadow-xl">
                <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-4 flex items-center gap-1.5">
                  <Flag className="h-3.5 w-3.5 text-emerald-400" /> Objetivos para 30 Días
                </h4>
                <div className="space-y-3.5">
                  {strategy.objectives30Days.map((goal, idx) => (
                    <div key={idx} className="flex gap-2.5 items-start">
                      <span className="text-emerald-400 font-mono font-bold text-xs mt-0.5">{idx + 1}.</span>
                      <p className="text-xs text-zinc-300 font-sans leading-relaxed">{goal}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

          {/* Quick-link to calendars structure */}
          <div className="p-5 rounded-2xl elegant-panel-accent flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h4 className="text-sm font-semibold text-emerald-400">¿Estrategia lista? Es momento de bajarla a tierra</h4>
              <p className="text-xs text-zinc-300 mt-1">GrowthOS AI puede convertir tus metas de 30 días en un calendario editorial de publicaciones optimizado para tus pilares.</p>
            </div>
            <button
              onClick={() => onNavigate("calendar")}
              className="px-4 py-2 text-xs font-medium bg-emerald-500 hover:bg-emerald-600 text-slate-900 rounded-xl whitespace-nowrap cursor-pointer transition-colors"
            >
              Ir a Crear Calendario
            </button>
          </div>

        </div>
      ) : (
        <div className="bg-zinc-900/95 border border-zinc-800 border-dashed rounded-2xl p-12 text-center max-w-2xl mx-auto space-y-4">
          <Target className="h-12 w-12 text-zinc-700 mx-auto" />
          <div className="space-y-1">
            <h4 className="text-sm font-display font-medium text-zinc-300">Estrategia en Espera de Generación</h4>
            <p className="text-xs text-zinc-500 max-w-md mx-auto leading-relaxed">
              Basándonos en tu diagnóstico y el perfil de negocio cargado, GrowthOS AI estructurará una propuesta de valor de alta conversión, diferenciadores específicos y objetivos de crecimiento.
            </p>
          </div>
          <button
            onClick={handleGenerateStrategy}
            disabled={loading}
            className="px-5 py-2.5 text-xs font-semibold bg-emerald-500 hover:bg-emerald-600 text-slate-900 rounded-xl shadow-lg transition-colors cursor-pointer inline-flex items-center gap-1.5"
          >
            <Sparkles className="h-4 w-4" /> Estructurar Estrategia con IA
          </button>
        </div>
      )}
    </div>
  );
}
