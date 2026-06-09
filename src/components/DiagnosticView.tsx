import React from "react";
import { 
  ClipboardCheck, 
  Sparkles, 
  TrendingUp, 
  AlertCircle, 
  HelpCircle, 
  CheckCircle2, 
  AlertTriangle,
  ArrowRight,
  Gauge
} from "lucide-react";
import { BusinessProfile, BusinessDiagnostic } from "../types";

interface DiagnosticViewProps {
  profile: BusinessProfile;
  setProfile: React.Dispatch<React.SetStateAction<BusinessProfile>>;
  diagnostic: BusinessDiagnostic | null;
  onRunDiagnostic: () => Promise<void>;
  loading: boolean;
  onNavigate: (tab: any) => void;
}

export default function DiagnosticView({
  profile,
  setProfile,
  diagnostic,
  onRunDiagnostic,
  loading,
  onNavigate,
}: DiagnosticViewProps) {
  const [errorStatus, setErrorStatus] = React.useState<string | null>(null);

  const socials = ["Instagram", "LinkedIn", "TikTok", "YouTube", "Threads", "Facebook", "X / Twitter", "Newsletter"];

  const handleInputChange = (field: keyof BusinessProfile, value: any) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const toggleSocial = (platform: string) => {
    const current = [...profile.socialPlatforms];
    if (current.includes(platform)) {
      setProfile(prev => ({
        ...prev,
        socialPlatforms: current.filter(p => p !== platform)
      }));
    } else {
      setProfile(prev => ({
        ...prev,
        socialPlatforms: [...current, platform]
      }));
    }
  };

  const handleDiagnose = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorStatus(null);
    if (!profile.businessName || !profile.industry || !profile.primaryProduct) {
      setErrorStatus("Por favor completa los campos mínimos (Nombre, Industria, Producto) para ejecutar el diagnóstico.");
      return;
    }
    try {
      await onRunDiagnostic();
    } catch (err: any) {
      setErrorStatus(err.message || "Error al comunicar con la IA.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Description header */}
      <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
        <div>
          <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
            <ClipboardCheck className="h-5.5 w-5.5 text-emerald-400" /> Diagnóstico del Negocio y Oferta
          </h2>
          <p className="text-xs text-zinc-400 mt-1">Ingresa el contexto de tu marca para que la IA evalúe la madurez de marketing y encuentre oportunidades ocultas.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Form panel (7 columns on desktop) */}
        <form onSubmit={handleDiagnose} className="lg:col-span-6 bg-zinc-900/95 border border-zinc-800/80 rounded-2xl p-6 space-y-5 shadow-xl">
          <h3 className="text-sm font-display font-semibold text-zinc-200 uppercase tracking-wider mb-2 font-mono">1. Datos del Ecosistema</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Business Name */}
            <div className="space-y-1.5 col-span-1 md:col-span-2">
              <label className="text-xs font-semibold text-zinc-300">Nombre del Negocio o Marca Personal *</label>
              <input 
                type="text"
                required
                value={profile.businessName}
                onChange={(e) => handleInputChange("businessName", e.target.value)}
                placeholder="Ej: Growth Agency, Laura Nutrición"
                className="w-full bg-zinc-950/70 border border-zinc-800 focus:border-emerald-500 rounded-xl px-4 py-2.5 text-xs text-zinc-100 placeholder-zinc-650 outline-none transition-colors"
                id="field-business-name"
              />
            </div>

            {/* industry */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-300">Industria o Nicho *</label>
              <input 
                type="text"
                required
                value={profile.industry}
                onChange={(e) => handleInputChange("industry", e.target.value)}
                placeholder="Ej: Fitness, Marketing, Real Estate"
                className="w-full bg-zinc-950/70 border border-zinc-800 focus:border-emerald-500 rounded-xl px-4 py-2.5 text-xs text-zinc-100 placeholder-zinc-650 outline-none transition-colors"
                id="field-industry"
              />
            </div>

            {/* primaryProduct */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-300">Producto o Servicio Principal *</label>
              <input 
                type="text"
                required
                value={profile.primaryProduct}
                onChange={(e) => handleInputChange("primaryProduct", e.target.value)}
                placeholder="Ej: Consultorías 1 a 1, Mentoring"
                className="w-full bg-zinc-950/70 border border-zinc-800 focus:border-emerald-500 rounded-xl px-4 py-2.5 text-xs text-zinc-100 placeholder-zinc-650 outline-none transition-colors"
                id="field-product"
              />
            </div>

            {/* avgPrice */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-300">Precio Promedio de venta *</label>
              <input 
                type="text"
                required
                value={profile.avgPrice}
                onChange={(e) => handleInputChange("avgPrice", e.target.value)}
                placeholder="Ej: $150 USD, $500/mes"
                className="w-full bg-zinc-950/70 border border-zinc-800 focus:border-emerald-500 rounded-xl px-4 py-2.5 text-xs text-zinc-100 placeholder-zinc-650 outline-none transition-colors"
                id="field-avg-price"
              />
            </div>

            {/* monthlyRevenueGoal */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-300">Meta Mensual de Ingresos *</label>
              <input 
                type="text"
                required
                value={profile.monthlyRevenueGoal}
                onChange={(e) => handleInputChange("monthlyRevenueGoal", e.target.value)}
                placeholder="Ej: $5,000 USD"
                className="w-full bg-zinc-950/70 border border-zinc-800 focus:border-emerald-500 rounded-xl px-4 py-2.5 text-xs text-zinc-100 placeholder-zinc-650 outline-none transition-colors"
                id="field-revenue"
              />
            </div>

            {/* idealCustomer */}
            <div className="space-y-1.5 col-span-1 md:col-span-2">
              <label className="text-xs font-semibold text-zinc-300">Cliente Ideal / Avatar principal *</label>
              <textarea 
                rows={3}
                value={profile.idealCustomer}
                onChange={(e) => handleInputChange("idealCustomer", e.target.value)}
                placeholder="Ej: Emprendedores de tecnología con equipos pequeños que luchan por generar leads B2B en Twitter."
                className="w-full bg-zinc-950/70 border border-zinc-800 focus:border-emerald-500 rounded-xl px-4 py-2.5 text-xs text-zinc-100 placeholder-zinc-650 outline-none transition-colors resize-none"
                id="field-avatar"
              />
            </div>

            {/* audienceSize */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-300">Tamaño actual de Audiencia</label>
              <input 
                type="text"
                value={profile.audienceSize}
                onChange={(e) => handleInputChange("audienceSize", e.target.value)}
                placeholder="Ej: 1,200 en IG, 300 en LinkedIn"
                className="w-full bg-zinc-950/70 border border-zinc-800 focus:border-emerald-500 rounded-xl px-4 py-2.5 text-xs text-zinc-100 placeholder-zinc-650 outline-none transition-colors"
                id="field-audience-size"
              />
            </div>

            {/* availableHours */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-300">Horas semanales para contenido</label>
              <input 
                type="text"
                value={profile.availableHours}
                onChange={(e) => handleInputChange("availableHours", e.target.value)}
                placeholder="Ej: 4-6 horas/semana"
                className="w-full bg-zinc-950/70 border border-zinc-800 focus:border-emerald-500 rounded-xl px-4 py-2.5 text-xs text-zinc-100 placeholder-zinc-650 outline-none transition-colors"
                id="field-hours"
              />
            </div>

          </div>

          {/* Social Platforms checklist */}
          <div className="space-y-2 pt-1 border-t border-zinc-800/60">
            <label className="text-xs font-semibold text-zinc-300">Redes sociales utilizadas actuales o deseadas</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {socials.map((plat) => {
                const active = profile.socialPlatforms.includes(plat);
                return (
                  <button
                    type="button"
                    key={plat}
                    onClick={() => toggleSocial(plat)}
                    className={`
                      px-2 py-1.5 rounded-lg border text-[11px] font-medium transition-all text-center cursor-pointer
                      ${active 
                        ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-400 font-bold" 
                        : "bg-zinc-950/50 border-zinc-800/85 text-zinc-400 hover:text-zinc-300 hover:border-zinc-700"
                      }
                    `}
                  >
                    {plat}
                  </button>
                );
              })}
            </div>
          </div>

          {errorStatus && (
            <div className="p-3 bg-red-950/20 border border-red-500/25 rounded-xl flex items-start gap-2.5">
              <AlertCircle className="h-4.5 w-4.5 text-red-500 shrink-0 mt-0.5" />
              <p className="text-[11.5px] text-red-400">{errorStatus}</p>
            </div>
          )}

          {/* Trigger Audit */}
          <button
            type="submit"
            disabled={loading}
            className={`
              w-full py-3 px-4 font-display font-semibold rounded-xl text-xs flex justify-center items-center gap-2 transition-all cursor-pointer shadow-lg
              ${loading 
                ? "bg-zinc-800 text-zinc-500 border border-zinc-700 pointer-events-none" 
                : "bg-emerald-500 hover:bg-emerald-600 text-zinc-950 font-bold shadow-emerald-500/10 hover:shadow-emerald-500/20"
              }
            `}
            id="btn-run-diagnostic"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-4 w-4 text-emerald-400" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Analizando Estructura...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" /> Ejecutar Diagnóstico AI con GrowthOS
              </>
            )}
          </button>
        </form>

        {/* Results output (6 columns) */}
        <div className="lg:col-span-6 space-y-6">
          {loading ? (
            <div className="bg-zinc-900/95 border border-zinc-800 rounded-2xl p-8 flex flex-col items-center justify-center min-h-[480px] space-y-4">
              <div className="relative flex items-center justify-center">
                <span className="absolute inline-flex h-12 w-12 rounded-full bg-emerald-400 opacity-20 animate-ping"></span>
                <div className="bg-emerald-950 border border-emerald-500 p-4 rounded-xl text-emerald-400">
                  <Gauge className="h-6 w-6 animate-pulse" />
                </div>
              </div>
              <div className="text-center space-y-2">
                <h4 className="text-sm font-display font-medium text-zinc-100 animate-pulse">Procesándolo de forma estratégica...</h4>
                <p className="text-xs text-zinc-500 max-w-sm mx-auto leading-relaxed">
                  GrowthOS AI está evaluando fortalezas, posicionamiento y calculando tu puntuación de madurez en marketing. Por favor, espera unos segundos.
                </p>
              </div>
              
              {/* Fake logs simulating progressive thoughts */}
              <div className="w-full bg-zinc-950/70 border border-zinc-800 rounded-xl p-3 text-[10px] font-mono text-zinc-400 space-y-1">
                <p className="text-emerald-500">▶ Cargando contexto del cliente ideal...</p>
                <p className="text-emerald-500/80">▶ Calculando tasa potencial de conversión vs. precio promedio...</p>
                <p className="text-zinc-500 animate-pulse">▶ Formulando cuellos de botella competitivos...</p>
              </div>
            </div>
          ) : diagnostic ? (
            <div className="space-y-6 animate-fade-in">
              {/* Score Bar */}
              <div className="bg-zinc-900/95 border border-emerald-500/20 rounded-2xl p-6 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 -transtype-x-12 translate-y-2 opacity-5 blur-xl w-32 h-32 bg-emerald-500 rounded-full" />
                
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest leading-none block mb-1">Maturity Score</span>
                    <h3 className="text-xl font-display font-bold text-white">Nivel Estratégico General</h3>
                  </div>
                  <div className="text-right">
                    <span className="text-3xl font-display font-extrabold text-white">{diagnostic.marketingScore}</span>
                    <span className="text-zinc-500 text-sm">/100</span>
                  </div>
                </div>

                <div className="w-full bg-zinc-950/70 border border-zinc-800 rounded-full h-3 overflow-hidden p-[2px]">
                  <div 
                    className="bg-emerald-400 h-full rounded-full transition-all duration-1000" 
                    style={{ width: `${diagnostic.marketingScore}%` }}
                  />
                </div>

                <p className="text-[11px] text-zinc-400 mt-3 leading-normal">
                  {diagnostic.marketingScore >= 80 
                    ? "¡Excelente posicionamiento inicial! Tu oferta es atractiva de alto nivel. El foco debe ser escalabilidad y frecuencia de pilares." 
                    : diagnostic.marketingScore >= 50 
                    ? "Nivel intermedio. Tu oferta tiene sustento, pero tu embudo actual tiene pérdidas en la conversión. Sigue la estrategia de posicionamiento recomendada."
                    : "Atención crítica. Detectamos problemas en el mensaje y empaque de producto. La oferta requiere rediseño táctico para generar ventas."
                  }
                </p>
              </div>

              {/* Four quadrant lists */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Strengths */}
                <div className="bg-zinc-900/50 border border-emerald-500/15 rounded-xl p-4.5 space-y-2.5">
                  <div className="flex items-center gap-1.5 text-emerald-400">
                    <CheckCircle2 className="h-4 w-4" />
                    <h4 className="text-xs font-display font-bold uppercase tracking-wider text-zinc-100">Fortalezas</h4>
                  </div>
                  <ul className="space-y-1.5 text-[11.5px] text-zinc-300">
                    {diagnostic.strengths.map((item, idx) => (
                      <li key={idx} className="flex gap-1.5"><span className="text-emerald-500">•</span> {item}</li>
                    ))}
                  </ul>
                </div>

                {/* Weaknesses */}
                <div className="bg-zinc-900/50 border border-zinc-800/70 rounded-xl p-4.5 space-y-2.5">
                  <div className="flex items-center gap-1.5 text-zinc-400">
                    <AlertCircle className="h-4 w-4 text-amber-500" />
                    <h4 className="text-xs font-display font-bold uppercase tracking-wider text-zinc-100">Debilidades</h4>
                  </div>
                  <ul className="space-y-1.5 text-[11.5px] text-zinc-300">
                    {diagnostic.weaknesses.map((item, idx) => (
                      <li key={idx} className="flex gap-1.5"><span className="text-amber-500">•</span> {item}</li>
                    ))}
                  </ul>
                </div>

                {/* Opportunities */}
                <div className="bg-zinc-900/50 border border-zinc-800/70 rounded-xl p-4.5 space-y-2.5">
                  <div className="flex items-center gap-1.5 text-emerald-400">
                    <TrendingUp className="h-4 w-4" />
                    <h4 className="text-xs font-display font-bold uppercase tracking-wider text-zinc-100">Oportunidades</h4>
                  </div>
                  <ul className="space-y-1.5 text-[11.5px] text-zinc-300">
                    {diagnostic.opportunities.map((item, idx) => (
                      <li key={idx} className="flex gap-1.5"><span className="text-emerald-400">•</span> {item}</li>
                    ))}
                  </ul>
                </div>

                {/* Bottlenecks */}
                <div className="bg-zinc-900/50 border border-rose-500/15 rounded-xl p-4.5 space-y-2.5">
                  <div className="flex items-center gap-1.5 text-rose-400">
                    <AlertTriangle className="h-4 w-4 text-rose-500" />
                    <h4 className="text-xs font-display font-bold uppercase tracking-wider text-zinc-100">Cuellos de Botella</h4>
                  </div>
                  <ul className="space-y-1.5 text-[11.5px] text-zinc-300">
                    {diagnostic.bottlenecks.map((item, idx) => (
                      <li key={idx} className="flex gap-1.5"><span className="text-rose-500">•</span> {item}</li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* Direct Strategy Trigger Link */}
              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={() => onNavigate("strategy")}
                  className="px-5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-xs font-medium text-zinc-200 transition-all cursor-pointer flex items-center gap-1.5"
                >
                  Continuar a Configurar Estrategia <ArrowRight className="h-4 w-4 text-emerald-400" />
                </button>
              </div>

            </div>
          ) : (
            <div className="bg-zinc-900/95 border border-zinc-800 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center min-h-[480px] text-center space-y-4">
              <ClipboardCheck className="h-12 w-12 text-zinc-700" />
              <div className="space-y-1">
                <h4 className="text-sm font-display font-medium text-zinc-300">Informe de Diagnóstico en Espera</h4>
                <p className="text-xs text-zinc-500 max-w-sm mx-auto leading-relaxed">
                  Rellena el formulario de la izquierda con los datos reales de tu marca personal o negocio para ver el análisis estratégico de fortalezas, debilidades e ingresos.
                </p>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
