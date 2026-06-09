import React from "react";
import { 
  Instagram, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Compass, 
  Gauge, 
  Star,
  Activity,
  ArrowRight,
  TrendingUp,
  RefreshCw
} from "lucide-react";
import { BusinessProfile, InstagramAudit } from "../types";

export interface AuditParams {
  instagramBio: string;
  topPostsSummary: string;
  mainProblem: string;
}

interface InstagramAuditViewProps {
  profile: BusinessProfile;
  onRunAudit: (params: AuditParams) => Promise<InstagramAudit>;
  initialAudit: InstagramAudit | null;
}

export default function InstagramAuditView({ profile, onRunAudit, initialAudit }: InstagramAuditViewProps) {
  const [copiedBio, setCopiedBio] = React.useState(false);
  const [instagramBio, setInstagramBio] = React.useState("");
  const [topPostsSummary, setTopPostsSummary] = React.useState("");
  const [mainProblem, setMainProblem] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [auditResult, setAuditResult] = React.useState<InstagramAudit | null>(initialAudit);
  const [errorStatus, setErrorStatus] = React.useState<string | null>(null);

  const handleAuditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile.businessName) {
      setErrorStatus("Configura al menos el nombre de tu marca en la pestaña de Diagnóstico antes de iniciar la auditoría.");
      return;
    }
    setErrorStatus(null);
    setLoading(true);
    try {
      const result = await onRunAudit({ instagramBio, topPostsSummary, mainProblem });
      setAuditResult(result);
    } catch (err: any) {
      setErrorStatus(err.message || "Error al realizar la auditoría con la IA de GrowthOS.");
    } finally {
      setLoading(false);
    }
  };

  const scoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-400";
    if (score >= 50) return "text-amber-400";
    return "text-rose-400";
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="border-b border-zinc-800 pb-4">
        <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
          <Instagram className="h-5.5 w-5.5 text-emerald-400" /> Auditoría de Conversión en Instagram
        </h2>
        <p className="text-xs text-zinc-400 mt-1">Estructura tu biografía e hilos de publicaciones de modo que cada visita fría sepa exactamente qué ofreces y cómo contactarte.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input panel (5 columns on desktop) */}
        <div className="lg:col-span-5">
          <form onSubmit={handleAuditSubmit} className="bg-zinc-900/95 border border-zinc-800 rounded-2xl p-6 space-y-4 shadow-xl">
            <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-450 mb-2 font-bold select-none">Analizar Perfil</h3>

            {/* Instagram Bio Text area */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-300">Biografía de Instagram Actual</label>
              <textarea
                value={instagramBio}
                onChange={(e) => setInstagramBio(e.target.value)}
                rows={3}
                placeholder="Ej: Consultor Financiero 📈 | Te ayudo a duplicar tu capital de forma segura | Mandame DM para agendar llamada | Curso link👇"
                className="w-full bg-zinc-950/70 border border-zinc-800 focus:border-emerald-500 rounded-xl px-4 py-2.5 text-xs text-zinc-100 placeholder-zinc-650 outline-none transition-colors resize-none"
                id="input-ig-bio"
              />
            </div>

            {/* Posts description */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-300">Resumen o tipo de Posts principales</label>
              <textarea
                value={topPostsSummary}
                onChange={(e) => setTopPostsSummary(e.target.value)}
                rows={3}
                placeholder="Ej: La mayoría son fotos mías en eventos compartiendo frases motivacionales o capturas de pantalla de gráficos de bolsa sin mucho texto explicativo."
                className="w-full bg-zinc-950/70 border border-zinc-800 focus:border-emerald-500 rounded-xl px-4 py-2.5 text-xs text-zinc-100 placeholder-zinc-650 outline-none transition-colors resize-none"
                id="input-ig-posts"
              />
            </div>

            {/* Obstacle area */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-300">Obstáculo o dolor principal de tu Instagram</label>
              <input
                type="text"
                value={mainProblem}
                onChange={(e) => setMainProblem(e.target.value)}
                placeholder="Ej: Tengo visitas pero nadie hace clic en mi link o manda DMs"
                className="w-full bg-zinc-950/70 border border-zinc-800 focus:border-emerald-500 rounded-xl px-4 py-2.5 text-xs text-zinc-100 placeholder-zinc-650 outline-none transition-colors"
                id="input-ig-problem"
              />
            </div>

            {errorStatus && (
              <p className="text-xs text-rose-500 font-sans leading-snug">{errorStatus}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`
                w-full py-2.5 px-4 font-display font-semibold rounded-xl text-xs flex justify-center items-center gap-2 transition-all cursor-pointer shadow-md
                ${loading 
                  ? "bg-zinc-850 text-zinc-500 border border-zinc-700 pointer-events-none animate-pulse" 
                  : "bg-emerald-500 hover:bg-emerald-600 text-zinc-955 font-bold"
                }
              `}
              id="btn-run-audit"
            >
              {loading ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin font-mono" /> Auditando Perfil...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 animate-mono" /> Lanzar Auditoría de Conversión
                </>
              )}
            </button>
          </form>

          {/* Guidelines notes */}
          <div className="bg-zinc-900/50 p-5 border border-zinc-800/80 rounded-2xl mt-4">
            <h4 className="text-xs font-bold text-zinc-250 uppercase font-mono">Reglas Clave de Instagram:</h4>
            <ul className="text-xs text-zinc-400 mt-2 space-y-2 font-sans">
              <li>• <span className="text-zinc-100 font-medium">Búsqueda de Nombre:</span> Tu título en negrita debe contener palabras clave de tu nicho (ej: " Laura | Fitness Coach " en lugar de sólo tu nombre).</li>
              <li>• <span className="text-zinc-100 font-medium">Propuesta en Bio:</span> Define claramente qué problema solucionas, para quién y qué credencial de autoridad te respalda.</li>
              <li>• <span className="text-zinc-105 font-medium">Lanzador DM (Conversión):</span> Siempre da un incentivo gratuito (Lead Magnet) que los impulse a interactuar de inmediato comentando una palabra clave.</li>
            </ul>
          </div>
        </div>

        {/* Audit Results outputs */}
        <div className="lg:col-span-7">
          {loading ? (
            <div className="py-36 border border-dashed border-zinc-800 rounded-2xl flex flex-col items-center justify-center space-y-4">
              <div className="h-8 w-8 animate-spin rounded-full border-t-2 border-emerald-400 border-r-2 border-transparent" />
              <div className="text-center space-y-1">
                <p className="text-xs text-zinc-300">Analizando copy de la biografía...</p>
                <p className="text-[11px] text-zinc-500 font-mono">Buscando ganchos de conversión y llamadas de DM directas...</p>
              </div>
            </div>
          ) : auditResult ? (
            <div className="space-y-6 animate-fade-in bg-zinc-900/95 border border-zinc-800 rounded-2xl p-6 shadow-xl">
              
              {/* Header result */}
              <div className="flex justify-between items-center pb-4 border-b border-zinc-800/60">
                <div>
                  <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest leading-none block mb-1">Informe de Auditoría</span>
                  <h3 className="text-base font-bold text-white font-display">Resumen General de Rendimiento</h3>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-display font-extrabold text-emerald-400">{auditResult.overallScore}</span>
                  <span className="text-zinc-550 text-xs">/100</span>
                </div>
              </div>

              {/* Core sub-metrics progress blocks */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-zinc-950/60 border border-zinc-850 p-3 rounded-xl text-center space-y-1">
                  <span className="text-[10px] uppercase font-mono text-zinc-500">Copy de Bio</span>
                  <h4 className={`text-base font-bold ${scoreColor(auditResult.bioScore)}`}>{auditResult.bioScore}%</h4>
                </div>
                <div className="bg-zinc-950/60 border border-zinc-850 p-3 rounded-xl text-center space-y-1">
                  <span className="text-[10px] uppercase font-mono text-zinc-500">Contenidos</span>
                  <h4 className={`text-base font-bold ${scoreColor(auditResult.contentScore)}`}>{auditResult.contentScore}%</h4>
                </div>
                <div className="bg-zinc-950/60 border border-zinc-850 p-3 rounded-xl text-center space-y-1">
                  <span className="text-[10px] uppercase font-mono text-zinc-500">Conversión</span>
                  <h4 className={`text-base font-bold ${scoreColor(auditResult.conversionScore)}`}>{auditResult.conversionScore}%</h4>
                </div>
              </div>

              {/* Feedbacks breakdown */}
              <div className="space-y-4 font-sans font-medium">
                
                {/* 1. Bio feedback */}
                <div className="space-y-1.5">
                  <h4 className="text-xs font-semibold text-zinc-200 uppercase tracking-wider font-mono flex items-center gap-1.5">
                    <Compass className="h-3.5 w-3.5 text-emerald-400" /> Optimización de Biografía y Links
                  </h4>
                  <p className="text-xs text-zinc-300 leading-relaxed bg-zinc-950/70 p-3.5 rounded-xl border-l-2 border-emerald-400 font-sans">
                    {auditResult.bioFeedback}
                  </p>
                </div>

                {/* 2. Content quality */}
                <div className="space-y-1.5">
                  <h4 className="text-xs font-semibold text-zinc-200 uppercase tracking-wider font-mono flex items-center gap-1.5">
                    <Activity className="h-3.5 w-3.5 text-blue-400" /> Optimización del Feed y Formatos
                  </h4>
                  <p className="text-xs text-zinc-300 leading-relaxed bg-zinc-950/70 p-3.5 rounded-xl border-l-2 border-blue-400 font-sans">
                    {auditResult.contentFeedback}
                  </p>
                </div>

                {/* 3. Operational Action Plan */}
                <div className="space-y-2 pt-2 border-t border-zinc-800/60">
                  <h4 className="text-xs font-semibold text-zinc-200 uppercase tracking-wider font-mono flex items-center gap-1.5 format-mono">
                    <Star className="h-3.5 w-3.5 text-amber-500" /> Plan de Acción Inmediato (3 Pasos)
                  </h4>
                  <div className="space-y-2">
                    {auditResult.actionPlan.map((step, idx) => (
                      <div key={idx} className="flex gap-2.5 items-start bg-zinc-950/40 p-2.5 rounded-xl border border-zinc-850">
                        <span className="text-xs font-mono font-bold text-emerald-400 mt-0.5">{idx + 1}.</span>
                        <p className="text-xs text-zinc-300 leading-relaxed">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          ) : (
            <div className="border border-dashed border-zinc-800 rounded-2xl py-24 text-center text-zinc-500">
              <Instagram className="h-12 w-12 text-zinc-850 mx-auto mb-3" />
              <h4 className="text-sm font-semibold text-zinc-300 font-display">Auditoría Pendiente</h4>
              <p className="text-xs text-zinc-400 max-w-sm mx-auto mt-1 leading-normal">
                Escribe tu biografía de Instagram y el tipo de posts que subes actualmente para recibir una retroalimentación accionable basada en embudos y conversión inmediata.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
