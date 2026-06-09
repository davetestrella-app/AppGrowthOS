import React from "react";
import { 
  TrendingUp, 
  Target, 
  CalendarDays, 
  FileCheck, 
  Zap, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  BookOpen,
  Users2,
  BadgeDollarSign
} from "lucide-react";
import { BusinessProfile, BusinessDiagnostic, ContentStrategy } from "../types";

interface DashboardViewProps {
  profile: BusinessProfile;
  diagnostic: BusinessDiagnostic | null;
  strategy: ContentStrategy | null;
  onNavigate: (tab: any) => void;
  onResetDemo: () => void;
}

export default function DashboardView({ profile, diagnostic, strategy, onNavigate, onResetDemo }: DashboardViewProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-400 border-emerald-500/30 bg-emerald-500/5";
    if (score >= 50) return "text-amber-400 border-amber-500/30 bg-amber-500/5";
    return "text-rose-400 border-rose-500/30 bg-rose-500/5";
  };

  const currentScore = diagnostic?.marketingScore || 0;

  // Checklist items based on workflow completion
  const checklist = [
    { label: "Registrar perfil de negocio", done: !!profile.businessName, tab: "diagnostic" },
    { label: "Ejecutar Diagnóstico AI completo", done: !!diagnostic, tab: "diagnostic" },
    { label: "Configurar Posicionamiento Estratégico", done: !!strategy, tab: "strategy" },
    { label: "Planificar Calendario de 30 días", done: !!strategy, tab: "calendar" },
    { label: "Generar banco de ideas iniciales", done: false, tab: "ideas" },
    { label: "Estructurar primer Guión para Reels / TikTok", done: false, tab: "scripts" },
    { label: "Comprobar conversión de Bio en Auditoría IG", done: false, tab: "audit" },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-zinc-900 to-zinc-950 p-6 border border-zinc-800 shadow-[0_4px_30px_rgba(0,0,0,0.4)]">
        <div className="absolute top-0 right-0 -transtype-x-12 translate-y-2 opacity-10 blur-2xl w-72 h-72 bg-emerald-500 rounded-full" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[11px] font-mono tracking-widest text-emerald-400 uppercase bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">Consultor GrowthOS Activo</span>
            </div>
            <h2 className="text-2xl font-display font-bold text-white tracking-tight">
              Estrategia y Plan de Crecimiento para <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200 font-extrabold">{profile.businessName || "tu Marca"}</span>
            </h2>
            <p className="text-zinc-400 text-sm mt-1 max-w-2xl font-sans">
              Combina investigación de mercado, ganchos de conversión y planificación acelerada por Inteligencia Artificial para ganar autoridad competitiva.
            </p>
          </div>
          <button 
            onClick={onResetDemo}
            className="shrink-0 text-xs text-zinc-500 hover:text-zinc-300 font-mono underline cursor-pointer"
          >
            Cargar Datos de Demostración
          </button>
        </div>
      </div>

      {/* Grid: Indicators to show Growth Data */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Core Marketing Score */}
        <div className="bg-zinc-900/95 border border-zinc-800/80 rounded-xl p-5 flex items-center justify-between shadow-md">
          <div>
            <p className="text-xs text-zinc-400 font-mono uppercase tracking-wider">Marketing Score</p>
            <h3 className="text-3xl font-display font-extrabold text-white mt-1">
              {currentScore > 0 ? `${currentScore}/100` : "PENDIENT"}
            </h3>
            <p className="text-[11px] text-zinc-500 mt-1">
              {currentScore >= 80 ? "Nivel Profesional Alto" : currentScore >= 50 ? "Requiere Ajuste de Oferta" : "Completo el Diagnóstico"}
            </p>
          </div>
          <div className={`w-14 h-14 rounded-full flex items-center justify-center font-mono font-bold text-lg border-2 ${getScoreColor(currentScore)}`}>
            {currentScore || "?"}
          </div>
        </div>

        {/* Industry Card */}
        <div className="bg-zinc-900/95 border border-zinc-800/80 rounded-xl p-5 shadow-md">
          <p className="text-xs text-zinc-400 font-mono uppercase tracking-wider">Nicho / Industria</p>
          <h3 className="text-lg font-bold text-emerald-400 mt-1 truncate">{profile.industry || "Sin registrar"}</h3>
          <p className="text-[11px] text-zinc-400 mt-2 truncate">Producto: {profile.primaryProduct || "No definido"}</p>
        </div>

        {/* Revenue Target */}
        <div className="bg-zinc-900/95 border border-zinc-800/80 rounded-xl p-5 shadow-md">
          <p className="text-xs text-zinc-400 font-mono uppercase tracking-wider">Meta Ingresos / Mes</p>
          <h3 className="text-2xl font-display font-bold text-white mt-1">{profile.monthlyRevenueGoal || "$0.00"}</h3>
          <p className="text-[11px] text-zinc-400 mt-2">Precio Promedio: {profile.avgPrice || "N/A"}</p>
        </div>

        {/* Current Audience & Time */}
        <div className="bg-zinc-900/95 border border-zinc-800/80 rounded-xl p-5 shadow-md">
          <p className="text-xs text-zinc-400 font-mono uppercase tracking-wider">Audiencia & Tiempo</p>
          <h3 className="text-lg font-bold text-white mt-1">{profile.audienceSize || "0 seguidores"}</h3>
          <p className="text-[11px] text-zinc-400 mt-2">Horas semanales disponibles: {profile.availableHours || "0 hrs"}</p>
        </div>
      </div>

      {/* Main Core Content: Quick summary and Strategic Pillars (Explaining Purpose) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (Pillars & Strategy Map) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Detailed Content Pillars explained */}
          <div className="bg-zinc-900/95 border border-zinc-800/80 rounded-2xl p-6 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-lg font-display font-bold text-white flex items-center gap-2">
                  <Target className="h-5 w-5 text-emerald-400" /> Pilares Estratégicos de Contenido
                </h3>
                <p className="text-xs text-zinc-400 font-sans mt-0.5">La estructura de GrowthOS AI de 4 dimensiones para evitar contenido aleatorio y maximizar el embudo.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
              
              {/* Pilar: Autoridad */}
              <div className="bg-zinc-950/50 p-4 border border-zinc-800/80 rounded-xl hover:border-emerald-500/10 transition-all">
                <div className="flex items-center gap-2 text-emerald-400 font-medium mb-1.5">
                  <ShieldCheck className="h-4.5 w-4.5" />
                  <span className="text-sm font-display font-semibold text-zinc-200">1. Autoridad (Estatus)</span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  <strong className="text-emerald-400">Propósito:</strong> Posicionarte como el experto definitivo. Demuestra pruebas, resultados tangibles del negocio, casos de estudio, métricas, reconocimientos y elimina la desconfianza del cliente ideal.
                </p>
              </div>

              {/* Pilar: Educación */}
              <div className="bg-zinc-950/50 p-4 border border-zinc-800/80 rounded-xl hover:border-emerald-500/10 transition-all">
                <div className="flex items-center gap-2 text-blue-400 font-medium mb-1.5">
                  <BookOpen className="h-4.5 w-4.5" />
                  <span className="text-sm font-display font-semibold text-zinc-200">2. Educación (Crecimiento)</span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  <strong className="text-blue-400">Propósito:</strong> Resolver ganchos de dolor o dudas de forma didáctica. Nutre al cliente potencial antes de que esté listo para pagar, mostrando soluciones a fallos comunes de la competencia.
                </p>
              </div>

              {/* Pilar: Comunidad */}
              <div className="bg-zinc-950/50 p-4 border border-zinc-800/80 rounded-xl hover:border-emerald-500/10 transition-all">
                <div className="flex items-center gap-2 text-purple-400 font-medium mb-1.5">
                  <Users2 className="h-4.5 w-4.5" />
                  <span className="text-sm font-display font-semibold text-zinc-200">3. Comunidad (Conexión)</span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  <strong className="text-purple-400">Propósito:</strong> Crear apego, empatía y compromiso emocional. Comparte tu detrás de cámara, errores superados, tu filosofía de marca y responde de manera directa para entablar relación humana.
                </p>
              </div>

              {/* Pilar: Conversión */}
              <div className="bg-zinc-950/50 p-4 border border-zinc-800/80 rounded-xl hover:border-emerald-500/10 transition-all">
                <div className="flex items-center gap-2 text-amber-400 font-medium mb-1.5">
                  <BadgeDollarSign className="h-4.5 w-4.5" />
                  <span className="text-sm font-display font-semibold text-zinc-200">4. Conversión (Ventas)</span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  <strong className="text-amber-400">Propósito:</strong> Generación directa de oportunidades de negocio y leads calificados. CTAs comerciales directos (ej: Comenta "Estrategia" para auditar tu perfil en DM y vender directo por chat).
                </p>
              </div>

            </div>
          </div>

          {/* Diagnostic overview quick-peek */}
          <div className="bg-zinc-900/95 border border-zinc-800/80 rounded-2xl p-6 shadow-xl space-y-4">
            <h3 className="text-lg font-display font-bold text-white flex items-center gap-2">
              <Zap className="h-5 w-5 text-emerald-400" /> Resumen de Enfoque Estratégico
            </h3>

            {diagnostic ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-emerald-950/20 p-3.5 border border-emerald-500/10 rounded-xl space-y-1">
                    <p className="text-xs font-semibold text-emerald-400 uppercase tracking-widest font-mono">Puntos Fuertes</p>
                    <ul className="text-xs text-zinc-300 list-disc list-inside space-y-1">
                      {diagnostic.strengths.slice(0, 2).map((item, idx) => (
                        <li key={idx} className="truncate">{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-rose-950/20 p-3.5 border border-rose-500/10 rounded-xl space-y-1">
                    <p className="text-xs font-semibold text-rose-400 uppercase tracking-widest font-mono">Cuellos de Botella</p>
                    <ul className="text-xs text-zinc-300 list-disc list-inside space-y-1">
                      {diagnostic.bottlenecks.slice(0, 2).map((item, idx) => (
                        <li key={idx} className="truncate">{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="flex justify-end">
                  <button 
                    onClick={() => onNavigate("strategy")}
                    className="text-xs text-emerald-400 hover:text-emerald-300 font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    Ver Posicionamiento de Marca Completo <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-6 text-center border border-dashed border-zinc-800 rounded-xl">
                <Sparkles className="h-8 w-8 text-zinc-600 mx-auto mb-2" />
                <p className="text-sm text-zinc-100 font-medium">Diagnóstico AI Pendiente de Ejecución</p>
                <p className="text-xs text-zinc-400 mt-1 max-w-sm mx-auto">Te recomendamos completar el diagnóstico de marketing inicial para activar todo el ecosistema.</p>
                <button 
                  onClick={() => onNavigate("diagnostic")}
                  className="mt-4 px-4 py-1.5 text-xs font-medium bg-emerald-500 hover:bg-emerald-600 text-zinc-900 rounded-lg inline-flex items-center gap-1 transition-colors cursor-pointer"
                >
                  Ir a Diagnosticar <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            )}
          </div>

        </div>

        {/* Right Column (Growth Workflow / Plan checklist) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* AI Growth Path Roadmap */}
          <div className="bg-zinc-900/95 border border-zinc-800/80 rounded-2xl p-6 shadow-xl">
            <h3 className="text-base font-display font-bold text-white mb-4">Roadmap de Ejecución</h3>
            <div className="space-y-4">
              {checklist.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  {item.done ? (
                    <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <div className="h-5 w-5 rounded-full border-2 border-zinc-700 hover:border-emerald-500 shrink-0 mt-0.5 cursor-pointer flex items-center justify-center text-[10px] text-zinc-500" onClick={() => onNavigate(item.tab)}>
                      •
                    </div>
                  )}
                  <div className="space-y-0.5">
                    <p className={`text-xs ${item.done ? "text-zinc-300 line-through font-normal" : "text-white font-medium hover:text-emerald-400"}`} onClick={() => onNavigate(item.tab)} style={{cursor: 'pointer'}}>{item.label}</p>
                    <span onClick={() => onNavigate(item.tab)} className="text-[9px] font-mono text-emerald-500 hover:underline tracking-tight cursor-pointer">Configurar</span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t border-zinc-800 mt-6 pt-4 text-center">
              <p className="text-xs text-zinc-400 leading-normal">
                Completando este Roadmap estratégico optimizarás tu oferta y acelerarás la captación de leads cualificados en menos de 30 días.
              </p>
            </div>
          </div>

          {/* Quick Stats Block with modern progress indicators */}
          <div className="bg-zinc-900/95 border border-zinc-800/80 rounded-2xl p-6 shadow-xl">
            <h3 className="text-base font-display font-bold text-white mb-3">Retorno de Contenido Estimado</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between items-center text-xs mb-1">
                  <span className="text-zinc-400">Tasa de Conversión Promedio</span>
                  <span className="text-white font-mono font-semibold">+3.8%</span>
                </div>
                <div className="w-full bg-zinc-800 rounded-full h-1.5">
                  <div className="bg-emerald-400 h-1.5 rounded-full" style={{ width: "65%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center text-xs mb-1">
                  <span className="text-zinc-400">Eficiencia en Tiempos</span>
                  <span className="text-white font-mono font-semibold">90%</span>
                </div>
                <div className="w-full bg-zinc-800 rounded-full h-1.5">
                  <div className="bg-emerald-400 h-1.5 rounded-full" style={{ width: "90%" }}></div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
