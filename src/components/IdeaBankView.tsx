import React from "react";
import { 
  Lightbulb, 
  Sparkles, 
  Copy, 
  Check, 
  Layers, 
  ArrowRight,
  TrendingUp,
  Tag
} from "lucide-react";
import { BusinessProfile } from "../types";

export interface ContentIdea {
  title: string;
  hook: string;
  objective: string;
  development: string;
  cta: string;
}

interface IdeaBankViewProps {
  profile: BusinessProfile;
  onGenerateIdeas: (category: string, keyword: string) => Promise<ContentIdea[]>;
  initialIdeas: ContentIdea[];
}

export default function IdeaBankView({ profile, onGenerateIdeas, initialIdeas }: IdeaBankViewProps) {
  const [ideas, setIdeas] = React.useState<ContentIdea[]>(initialIdeas);
  const [loading, setLoading] = React.useState(false);
  const [category, setCategory] = React.useState("Ventas de Alto Valor (High-Ticket)");
  const [keyword, setKeyword] = React.useState("");
  const [copiedIdx, setCopiedIdx] = React.useState<number | null>(null);
  const [errorStatus, setErrorStatus] = React.useState<string | null>(null);

  const categories = [
    "Ventas de Alto Valor (High-Ticket)",
    "Contenido Viral de Educación",
    "Estudios de Caso y Autoridad",
    "historias de marca (Brand Storytelling)",
    "Detrás de Cámaras y Conexión",
    "Ganchos Directos de Conversión (Leads)"
  ];

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile.businessName) {
      setErrorStatus("Configura al menos el nombre de tu marca en la pestaña de Diagnóstico antes de idear.");
      return;
    }
    setErrorStatus(null);
    setLoading(true);
    try {
      const result = await onGenerateIdeas(category, keyword);
      setIdeas(result);
    } catch (err: any) {
      setErrorStatus(err.message || "Error al conectar con la IA.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="border-b border-zinc-800 pb-4">
        <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
          <Lightbulb className="h-5.5 w-5.5 text-emerald-400" /> Banco de Ideas Estratégicas
        </h2>
        <p className="text-xs text-zinc-400 mt-1">Genera fórmulas estructuradas de alto impacto listas para redactar. Optimizado bajo la metodología Hook-Objective-Development-CTA.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Parameters panel */}
        <div className="lg:col-span-4 space-y-5">
          <form onSubmit={handleGenerate} className="bg-zinc-900/95 border border-zinc-800 rounded-2xl p-6 space-y-5 shadow-xl">
            <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-450 mb-2 font-bold select-none">Configurar Angulo</h3>
            
            {/* Category selection dropdown */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-300">Ángulo de Estrategia</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-zinc-950/70 border border-zinc-800 focus:border-emerald-500 rounded-xl px-3.5 py-2.5 text-xs text-zinc-200 outline-none transition-colors cursor-pointer"
                id="select-idea-category"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Keyword or Topic input */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-300">Palabra clave, dolor o tema (Opcional)</label>
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Ej: falta de tiempo, delegar, embudos"
                className="w-full bg-zinc-950/70 border border-zinc-800 focus:border-emerald-500 rounded-xl px-4 py-2.5 text-xs text-zinc-105 placeholder-zinc-650 outline-none transition-colors"
                id="input-idea-keyword"
              />
            </div>

            {errorStatus && (
              <p className="text-xs text-rose-400 font-sans leading-snug">{errorStatus}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`
                w-full py-2.5 px-4 font-display font-semibold rounded-xl text-xs flex justify-center items-center gap-2 transition-all cursor-pointer shadow-md
                ${loading 
                  ? "bg-zinc-850 text-zinc-500 border border-zinc-700 pointer-events-none animate-pulse" 
                  : "bg-emerald-500 hover:bg-emerald-600 text-zinc-950 font-bold"
                }
              `}
              id="btn-generate-ideas"
            >
              {loading ? "Pensando Ganchos Frecuentes..." : <><Sparkles className="h-4 w-4" /> Generar Ideas de Contenido</>}
            </button>
          </form>

          {/* Tips block */}
          <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-2xl p-5 space-y-2.5">
            <h4 className="text-xs font-semibold text-zinc-200 flex items-center gap-1">
              <Tag className="h-3.5 w-3.5 text-emerald-400" /> Método GrowthOS AI
            </h4>
            <p className="text-[11.5px] text-zinc-400 leading-relaxed font-sans">
              No dejes que tu contenido muera sin conversiones. Cada idea se genera bajo un enfoque específico de negocio: un gancho de retención de 3 segundos (<strong className="text-emerald-400">HOOK</strong>), un fin estratégico de marketing (<strong className="text-blue-400">OBJETIVO</strong>), pautas condensadas (<strong className="text-zinc-350">DESARROLLO</strong>) y una conversión de paso inmediato (<strong className="text-amber-400">CTA</strong>).
            </p>
          </div>
        </div>

        {/* Right Side: Ideas cards output */}
        <div className="lg:col-span-8 space-y-6">
          {loading ? (
            <div className="py-24 border border-dashed border-zinc-800 rounded-2xl flex flex-col items-center justify-center space-y-3">
              <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-emerald-400 border-r-2 border-transparent" />
              <p className="text-xs text-zinc-400 animate-pulse">Consultando algoritmos de conversión competitivos de GrowthOS...</p>
            </div>
          ) : ideas.length > 0 ? (
            <div className="space-y-6 animate-fade-in">
              {ideas.map((idea, idx) => {
                const rawText = `TÍTULO: ${idea.title}\nHook: ${idea.hook}\nObjetivo: ${idea.objective}\nDesarrollo: ${idea.development}\nCTA: ${idea.cta}`;
                return (
                  <div key={idx} className="bg-zinc-900/95 border border-zinc-800 rounded-2xl p-5.5 space-y-4 shadow-xl hover:border-zinc-70 transition-colors">
                    
                    {/* Header */}
                    <div className="flex justify-between items-start pb-2 border-b border-zinc-800/60">
                      <div>
                        <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest">Idea #{idx + 1}</span>
                        <h4 className="text-base font-bold text-white mt-0.5 font-display">{idea.title}</h4>
                      </div>
                      <button
                        onClick={() => copyToClipboard(rawText, idx)}
                        className="p-1.5 rounded-lg border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                        title="Copiar Estructura Completa"
                      >
                        {copiedIdx === idx ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                      </button>
                    </div>

                    {/* Breakdown */}
                    <div className="space-y-3">
                      
                      {/* Hook */}
                      <div className="flex items-start gap-2.5">
                        <span className="text-[10px] font-mono font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded text-emerald-400 uppercase tracking-wider shrink-0 mt-0.5">
                          Hook
                        </span>
                        <p className="text-xs font-semibold text-zinc-200 leading-relaxed font-sans">{idea.hook}</p>
                      </div>

                      {/* Objetivo */}
                      <div className="flex items-start gap-2.5">
                        <span className="text-[10px] font-mono font-bold bg-blue-500/10 px-1.5 py-0.5 rounded text-blue-400 uppercase tracking-wider shrink-0 mt-0.5">
                          Objetivo
                        </span>
                        <p className="text-xs text-zinc-300 leading-relaxed font-sans">{idea.objective}</p>
                      </div>

                      {/* Desarrollo */}
                      <div className="flex items-start gap-2.5">
                        <span className="text-[10px] font-mono font-bold bg-zinc-850 px-1.5 py-0.5 rounded text-zinc-400 uppercase tracking-wider shrink-0 mt-0.5">
                          Desarrollo
                        </span>
                        <p className="text-xs text-zinc-300 whitespace-pre-line leading-relaxed font-sans">{idea.development}</p>
                      </div>

                      {/* CTA */}
                      <div className="flex items-start gap-2.5">
                        <span className="text-[10px] font-mono font-bold bg-amber-500/10 px-1.5 py-0.5 rounded text-amber-400 uppercase tracking-wider shrink-0 mt-0.5">
                          CTA
                        </span>
                        <p className="text-xs text-emerald-300 font-mono font-medium leading-relaxed">"{idea.cta}"</p>
                      </div>

                    </div>

                    {/* Trigger Script builder using this idea! */}
                    <div className="flex justify-end pt-2 border-t border-zinc-800/40">
                      <button
                        onClick={() => {
                          const event = new CustomEvent("tab-shortcut", { 
                            detail: { tab: "scripts", data: `${idea.title}: ${idea.hook}` } 
                          });
                          window.dispatchEvent(event);
                        }}
                        className="px-3.5 py-1.5 text-[11px] font-semibold text-emerald-400 hover:text-white hover:bg-emerald-500/15 rounded-lg border border-emerald-500/20 flex items-center gap-1 transition-all cursor-pointer font-mono"
                      >
                        Convertir en un Guión de Video <ArrowRight className="h-3 w-3" />
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>
          ) : (
            <div className="border border-dashed border-zinc-800 rounded-2xl py-24 text-center text-zinc-500">
              <Lightbulb className="h-12 w-12 text-zinc-800 mx-auto mb-3" />
              <h4 className="text-sm font-semibold text-zinc-300 font-display">Banco de Ideas Vacío</h4>
              <p className="text-xs text-zinc-400 max-w-sm mx-auto mt-1 leading-normal">Usa el generador a la izquierda o selecciona una idea clave para ver instantáneamente títulos llamativos desarrollados estratégicamente por la IA.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
