import React from "react";
import { 
  FileText, 
  Sparkles, 
  Copy, 
  Check, 
  Video, 
  Clapperboard, 
  Send,
  RefreshCw
} from "lucide-react";
import { BusinessProfile } from "../types";

export interface VideoScript {
  title: string;
  hook: string;
  problem: string;
  development: string;
  solution: string;
  cta: string;
}

interface ScriptGeneratorViewProps {
  profile: BusinessProfile;
  initialScript: VideoScript | null;
  onGenerateScript: (topic: string, format: string) => Promise<VideoScript>;
}

export default function ScriptGeneratorView({ profile, initialScript, onGenerateScript }: ScriptGeneratorViewProps) {
  const [script, setScript] = React.useState<VideoScript | null>(initialScript);
  const [topic, setTopic] = React.useState("");
  const [format, setFormat] = React.useState("Reel / TikTok (60 segundos)");
  const [loading, setLoading] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const [errorStatus, setErrorStatus] = React.useState<string | null>(null);

  // Read customized events like "tab-shortcut" so that users can auto-fill topics from ideas/calendars
  React.useEffect(() => {
    const handleShortcut = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail && customEvent.detail.tab === "scripts" && customEvent.detail.data) {
        setTopic(customEvent.detail.data);
      }
    };
    window.addEventListener("tab-shortcut", handleShortcut);
    return () => {
      window.removeEventListener("tab-shortcut", handleShortcut);
    };
  }, []);

  const formats = [
    "Reel / TikTok (30 segundos) - Ultra rápido",
    "Reel / TikTok (60 segundos) - Educacional de Valor",
    "Video Largo (90 segundos) - Historia + Conversión",
    "YouTube Shorts de Tensión",
    "Post de Audio / Video en Carrousel de Instagram"
  ];

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic) {
      setErrorStatus("Escribe un tema o dolor de tu cliente para poder estructurar el guión.");
      return;
    }
    if (!profile.businessName) {
      setErrorStatus("Configura al menos el nombre de tu marca en la pestaña de Diagnóstico.");
      return;
    }
    setErrorStatus(null);
    setLoading(true);
    try {
      const result = await onGenerateScript(topic, format);
      setScript(result);
    } catch (err: any) {
      setErrorStatus(err.message || "Error al construir el guión con la IA.");
    } finally {
      setLoading(false);
    }
  };

  const copyScriptToClipboard = () => {
    if (!script) return;
    const fullText = `TÍTULO: ${script.title}\nFormat: ${format}\n\n1. HOOK (Gancho - Primeros 3 segs):\n${script.hook}\n\n2. PROBLEMA (Agitar dolor):\n${script.problem}\n\n3. DESARROLLO (Resolución paso a paso):\n${script.development}\n\n4. SOLUCIÓN (Tu producto/oferta):\n${script.solution}\n\n5. CTA (Llamado a la acción):\n${script.cta}`;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="border-b border-zinc-800 pb-4">
        <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
          <FileText className="h-5.5 w-5.5 text-emerald-400" /> Generador de Guiones de Conversión
        </h2>
        <p className="text-xs text-zinc-400 mt-1">Convierte vistas en clientes mediante guiones validados para videos cortos que agitan dolores reales y proponen tu solución directa.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input panel (5 columns on desktop) */}
        <div className="lg:col-span-4 space-y-5">
          <form onSubmit={handleGenerate} className="bg-zinc-900/95 border border-zinc-800 rounded-2xl p-6 space-y-4 shadow-xl">
            <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-450 mb-2 font-bold flex items-center gap-1 select-none">
              <Clapperboard className="h-3.5 w-3.5 text-emerald-400" /> Configurar Video
            </h3>

            {/* Topic Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-300">Tema, dolor o gancho del video</label>
              <textarea
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                rows={4}
                required
                placeholder="Ej: Por qué delegar tus ventas es el peor error táctico que cometen los fundadores en fases iniciales."
                className="w-full bg-zinc-950/70 border border-zinc-800 focus:border-emerald-500 rounded-xl px-4 py-2.5 text-xs text-zinc-100 placeholder-zinc-650 outline-none transition-colors resize-none"
                id="input-script-topic"
              />
            </div>

            {/* Format Dropdown */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-300">Estructura del Formato</label>
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value)}
                className="w-full bg-zinc-950/70 border border-zinc-800 focus:border-emerald-500 rounded-xl px-3.5 py-2.5 text-xs text-zinc-200 outline-none transition-colors cursor-pointer"
                id="select-script-format"
              >
                {formats.map((f) => (
                  <option key={f} value={f}>{f}</option>
                ))}
              </select>
            </div>

            {errorStatus && (
              <p className="text-xs text-rose-450 font-sans">{errorStatus}</p>
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
              id="btn-generate-script"
            >
              {loading ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" /> Estructurando Guión...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" /> Estructurar Guión de Video
                </>
              )}
            </button>
          </form>

          {/* Tips structure */}
          <div className="bg-zinc-900/50 p-5 border border-zinc-800/80 rounded-2xl">
            <h4 className="text-xs font-bold text-zinc-200 uppercase tracking-wider font-mono">Estructura GrowthOS:</h4>
            <ul className="text-xs text-zinc-400 mt-2 space-y-2 font-sans">
              <li><strong className="text-emerald-400">HOOK:</strong> Detiene el scroll con provocaciones o datos chocantes.</li>
              <li><strong className="text-zinc-300">PROBLEMA:</strong> Empatiza hondamente con el dolor actual del cliente.</li>
              <li><strong className="text-emerald-400">DESARROLLO:</strong> Muestra el paso a paso claro para mitigarlo.</li>
              <li><strong className="text-emerald-450">SOLUCIÓN:</strong> Conecta el producto como la única de vía rápida.</li>
              <li><strong className="text-amber-400">CTA:</strong> Consigue registros, mensajes de interés o ventas.</li>
            </ul>
          </div>
        </div>

        {/* Output pane (7 columns on desktop) */}
        <div className="lg:col-span-8">
          {loading ? (
            <div className="py-36 border border-dashed border-zinc-800 rounded-2xl flex flex-col items-center justify-center space-y-4">
              <svg className="animate-spin h-8 w-8 text-emerald-400 animate-pulse" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <div className="text-center space-y-1">
                <p className="text-xs text-zinc-200 font-display font-medium">GrowthOS AI está redactando el guión de conversión...</p>
                <p className="text-[11px] text-zinc-500">Optimizando tiempos de gancho visual para retener a tu audiencia de nicho.</p>
              </div>
            </div>
          ) : script ? (
            <div className="bg-zinc-900/95 border border-zinc-800 rounded-2xl p-6 space-y-6 shadow-xl animate-fade-in font-sans">
              
              {/* Header script */}
              <div className="flex justify-between items-center pb-4 border-b border-zinc-800/60 font-sans">
                <div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 px-2 py-0.5 rounded uppercase tracking-wider">
                    Estructura validada de ventas
                  </span>
                  <h3 className="text-base font-bold text-white mt-1.5 font-display">{script.title || "Guión de Contenido"}</h3>
                </div>
                <button
                  onClick={copyScriptToClipboard}
                  className="px-3.5 py-1.5 rounded-lg border border-zinc-800 hover:border-zinc-700 bg-zinc-950 text-zinc-300 hover:text-white text-xs flex items-center gap-1.5 transition-all cursor-pointer font-mono"
                >
                  {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                  {copied ? "¡Copiado!" : "Copiar Guión"}
                </button>
              </div>

              {/* Steps breakdown lists */}
              <div className="space-y-5 font-sans divide-y divide-zinc-850">
                
                {/* 1. HOOK */}
                <div className="pt-0 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20 font-bold uppercase">
                      1. Gancho (Hook)
                    </span>
                    <span className="text-[10px] font-mono text-zinc-500">Primeros 3 segundos de alto impacto</span>
                  </div>
                  <p className="text-sm font-semibold text-zinc-100 pl-1 leading-relaxed bg-zinc-950/40 p-3 border-l-2 border-emerald-400 rounded-r-xl">
                    "{script.hook}"
                  </p>
                </div>

                {/* 2. PROBLEMA */}
                <div className="pt-4.5 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded border border-indigo-500/20 font-bold uppercase">
                      2. Problema (Agitar)
                    </span>
                    <span className="text-[10px] font-mono text-zinc-500">Muestra los fallos reales y genera empatía</span>
                  </div>
                  <p className="text-xs text-zinc-300 pl-1 leading-relaxed bg-zinc-950/40 p-3 rounded-xl">
                    {script.problem}
                  </p>
                </div>

                {/* 3. DESARROLLO */}
                <div className="pt-4.5 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded border border-blue-500/20 font-bold uppercase">
                      3. Desarrollo (Metodología)
                    </span>
                    <span className="text-[10px] font-mono text-zinc-500">Muestra el paso a paso resolutivo</span>
                  </div>
                  <p className="text-xs text-zinc-350 pl-1 leading-relaxed bg-zinc-950/40 p-3 rounded-xl whitespace-pre-line font-medium leading-relaxed font-sans">
                    {script.development}
                  </p>
                </div>

                {/* 4. SOLUCIÓN */}
                <div className="pt-4.5 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono bg-purple-500/10 text-purple-400 px-2 py-0.5 rounded border border-purple-500/20 font-bold uppercase">
                      4. Solución (Oferta)
                    </span>
                    <span className="text-[10px] font-mono text-zinc-500">Introduce tu producto o servicio sutilmente</span>
                  </div>
                  <p className="text-xs text-zinc-300 pl-1 leading-relaxed bg-zinc-950/40 p-3 rounded-xl font-sans">
                    {script.solution}
                  </p>
                </div>

                {/* 5. CTA */}
                <div className="pt-4.5 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded border border-amber-500/20 font-bold uppercase">
                      5. Llamado a la Acción (CTA)
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400">Enfoque de captación acelerado</span>
                  </div>
                  <p className="text-xs text-emerald-300 font-bold leading-relaxed bg-emerald-950/20 border-l-2 border-emerald-500 p-3 rounded-r-xl font-mono">
                    "{script.cta}"
                  </p>
                </div>

              </div>

            </div>
          ) : (
            <div className="border border-dashed border-zinc-800 rounded-2xl py-24 text-center text-zinc-500">
              <Video className="h-12 w-12 text-zinc-800 mx-auto mb-3" />
              <h4 className="text-sm font-semibold text-zinc-300 font-display">Guión sin Estructurar</h4>
              <p className="text-xs text-zinc-450 mt-1 max-w-sm mx-auto leading-normal">
                Indica un tema clave a la izquierda para que GrowthOS AI redacte los diálogos del gancho inicial, problemas, desarrollo técnico, oferta de cierre y llamadas de conversión de forma interactiva.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
