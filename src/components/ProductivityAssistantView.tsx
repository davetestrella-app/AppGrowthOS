import React from "react";
import { 
  Sparkles, 
  Send, 
  CheckSquare, 
  UserCheck, 
  Zap, 
  MessageCircle, 
  Bot,
  RefreshCw,
  Clock,
  Trash2
} from "lucide-react";
import { BusinessProfile, ContentStrategy, ChatMessage } from "../types";

interface ProductivityAssistantViewProps {
  profile: BusinessProfile;
  strategy: ContentStrategy | null;
  onSendChatMessage: (message: string, history: ChatMessage[]) => Promise<string>;
}

export default function ProductivityAssistantView({
  profile,
  strategy,
  onSendChatMessage,
}: ProductivityAssistantViewProps) {
  const [messages, setMessages] = React.useState<ChatMessage[]>([
    {
      id: "welcome",
      sender: "assistant",
      content: "¡Hola! Soy tu Consultor de Crecimiento y Estrategia de Contenidos. Estoy completamente contextualizado con los datos de tu negocio en GrowthOS.\n\n¿Tienes alguna duda sobre qué publicar hoy, cómo mejorar una oferta de alto valor, o quieres idear un gancho irresistible para captar leads?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputValue, setInputValue] = React.useState("");
  const [sending, setSending] = React.useState(false);
  const [errorStatus, setErrorStatus] = React.useState<string | null>(null);

  // Todo-list items for active content production
  const [todos, setTodos] = React.useState([
    { id: "1", text: "Escribir el gancho (Hook) del próximo Reel / TikTok", done: false, priority: "Crítica" },
    { id: "2", text: "Optimizar el enlace de conversión de la biografía", done: true, priority: "Media" },
    { id: "3", text: "Responder y auditar biografías de los prospectos en los DMs", done: false, priority: "Ventas" },
    { id: "4", text: "Redactar un post de educación resolviendo dudas principales", done: false, priority: "Media" },
    { id: "5", text: "Revisar si falta el pilar de Autoridad en tus posts de la semana", done: false, priority: "Estratégica" },
  ]);

  const toggleTodo = (id: string) => {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || sending) return;
    setErrorStatus(null);

    const userMsg: ChatMessage = {
      id: Math.random().toString(),
      sender: "user",
      content: inputValue,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    const inputCopy = inputValue;
    setInputValue("");
    setSending(true);

    try {
      const responseText = await onSendChatMessage(inputCopy, messages);
      const aiMsg: ChatMessage = {
        id: Math.random().toString(),
        sender: "assistant",
        content: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (err: any) {
      setErrorStatus(err.message || "No se pudo comunicar con el consultor AI.");
    } finally {
      setSending(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: "welcome",
        sender: "assistant",
        content: "Ecosistema de GrowthOS reiniciado. Escríbeme y diseñemos un mensaje de marca magnético.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }
    ]);
  };

  const chatContainerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, sending]);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="border-b border-zinc-800 pb-4 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
            <Sparkles className="h-5.5 w-5.5 text-emerald-400 animate-pulse" /> Asistente de Productividad y Consultor AI
          </h2>
          <p className="text-xs text-zinc-400 mt-1">Tu planificador táctico diario y chat en tiempo real con GrowthOS AI para rebotar ideas, corregir copys y evaluar ganchos de venta.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Daily Planner Checklist (5 columns) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-zinc-900/95 border border-zinc-800 rounded-2xl p-6 shadow-xl space-y-5">
            <div className="flex justify-between items-center pb-2.5 border-b border-zinc-800/65">
              <h3 className="text-sm font-display font-bold text-white flex items-center gap-1.5">
                <CheckSquare className="h-4.5 w-4.5 text-emerald-400" /> Plan del Creador de Hoy
              </h3>
              <span className="text-[10px] bg-zinc-800 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded font-mono font-bold flex items-center gap-1">
                <Clock className="h-3 w-3" /> Diario
              </span>
            </div>

            <div className="space-y-3.5">
              {todos.map((todo) => (
                <div key={todo.id} className="flex items-start gap-3 select-none">
                  <input
                    type="checkbox"
                    checked={todo.done}
                    onChange={() => toggleTodo(todo.id)}
                    className="w-4.5 h-4.5 text-emerald-500 rounded border-zinc-850 mt-0.5 cursor-pointer outline-none ring-0 accent-emerald-500"
                    id={`todo-check-${todo.id}`}
                  />
                  <div className="space-y-0.5">
                    <p className={`text-xs ${todo.done ? "text-zinc-500 line-through font-normal" : "text-zinc-200 font-medium font-sans leading-tight"}`}>
                      {todo.text}
                    </p>
                    <span className={`text-[9px] font-mono border px-1.5 rounded-full py-0.2 uppercase leading-none block w-max
                      ${todo.priority === "Crítica" ? "border-rose-500/30 text-rose-400 bg-rose-500/5" :
                        todo.priority === "Ventas" ? "border-emerald-500/30 text-emerald-400 bg-emerald-500/5" :
                        todo.priority === "Estratégica" ? "border-purple-500/30 text-purple-400 bg-purple-500/5" :
                        "border-zinc-800 text-zinc-550"
                      }
                    `}>
                      {todo.priority}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-zinc-800 text-center">
              <span className="text-[10.5px] text-zinc-400 leading-normal font-sans block">
                Completa tus tareas prioritarias de contenido. No realices ganchos repetitivos, mantén equilibrados tus pilares hoy.
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: AI Consultant Chatbot (8 columns) */}
        <div className="lg:col-span-8">
          <div className="bg-zinc-900/95 border border-zinc-800 rounded-2xl flex flex-col h-[520px] shadow-xl relative overflow-hidden">
            
            {/* Top Chat Bar */}
            <div className="p-4 border-b border-zinc-800/80 bg-zinc-950/60 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="bg-emerald-500/10 p-2 rounded-xl text-emerald-400 border border-emerald-500/15">
                  <Bot className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-xs font-display font-semibold text-white">Consultor de Crecimiento AI</h4>
                  <p className="text-[10px] text-emerald-400 leading-none">Contexto de {profile.businessName || "Negocio"} activo</p>
                </div>
              </div>
              <button
                onClick={clearChat}
                className="p-1.5 rounded-lg hover:bg-zinc-855 text-zinc-400 hover:text-zinc-300 transition-colors cursor-pointer"
                title="Limpiar Conversación"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>

            {/* Chat Body messages list */}
            <div 
              ref={chatContainerRef}
              className="flex-1 p-4.5 overflow-y-auto space-y-4.5 text-[12.5px] font-sans"
              id="chat-box-body"
            >
              {messages.map((msg) => {
                const isAI = msg.sender === "assistant";
                return (
                  <div key={msg.id} className={`flex items-start gap-2.5 ${isAI ? "" : "flex-row-reverse"}`}>
                    
                    {/* Icon */}
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold leading-none select-none shrink-0
                      ${isAI ? "bg-zinc-950 text-emerald-400 border border-zinc-850" : "bg-emerald-500 text-zinc-950"}
                    `}>
                      {isAI ? "AI" : "Yo"}
                    </div>

                    {/* Balloon message */}
                    <div className={`p-4 rounded-2xl max-w-[85%] leading-relaxed whitespace-pre-line shadow-sm
                      ${isAI 
                        ? "bg-zinc-950 text-zinc-100 border border-zinc-850 rounded-tl-none" 
                        : "bg-emerald-950/20 text-emerald-250 border border-emerald-500/20 rounded-tr-none"
                      }
                    `}>
                      <p className="font-sans leading-relaxed text-zinc-200">{msg.content}</p>
                      <span className="text-[9px] text-zinc-500 font-mono block mt-1 text-right leading-none select-none">
                        {msg.timestamp}
                      </span>
                    </div>

                  </div>
                );
              })}

              {sending && (
                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold bg-zinc-950 text-emerald-400 border border-zinc-850 select-none">
                    AI
                  </div>
                  <div className="p-3 rounded-2xl bg-zinc-950 text-slate-300 rounded-tl-none border border-zinc-850 flex items-center gap-2">
                    <span className="animate-bounce inline-block w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span className="animate-bounce inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 delay-100" />
                    <span className="animate-bounce inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 delay-200" />
                    <span className="text-[11px] text-zinc-500 font-mono ml-1">Escribiendo...</span>
                  </div>
                </div>
              )}

              {errorStatus && (
                <p className="text-xs text-rose-500 font-mono text-center bg-rose-500/10 py-2 rounded-xl">Error: {errorStatus}</p>
              )}
            </div>

            {/* Input Form Footer */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-zinc-850 bg-zinc-900/40 flex items-center gap-2.5">
              <input
                type="text"
                required
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Escribe tu consulta aquí (ej: 'Escríbeme un gancho de conversión para nutrición')"
                className="flex-1 bg-zinc-950 border border-zinc-800 focus:border-emerald-500 rounded-xl px-4 py-2.5 text-xs text-zinc-100 placeholder-zinc-600 outline-none transition-all"
                id="input-chat-query"
              />
              <button
                type="submit"
                disabled={sending || !inputValue.trim()}
                className={`
                  p-2.5 rounded-xl transition-all font-bold shrink-0 cursor-pointer
                  ${sending || !inputValue.trim()
                    ? "bg-zinc-850 text-zinc-500 border border-zinc-800 cursor-not-allowed"
                    : "bg-emerald-500 text-zinc-950 hover:bg-emerald-600 shadow-[0_0_10px_rgba(16,185,129,0.2)]"
                  }
                `}
                id="btn-chat-send"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>

          </div>
        </div>

      </div>
    </div>
  );
}
