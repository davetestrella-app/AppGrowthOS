import React from "react";
import Sidebar, { ActiveTab } from "./components/Sidebar";
import DashboardView from "./components/DashboardView";
import DiagnosticView from "./components/DiagnosticView";
import StrategyView from "./components/StrategyView";
import CalendarView from "./components/CalendarView";
import IdeaBankView from "./components/IdeaBankView";
import ScriptGeneratorView from "./components/ScriptGeneratorView";
import InstagramAuditView, { AuditParams } from "./components/InstagramAuditView";
import ProductivityAssistantView from "./components/ProductivityAssistantView";
import MonetizationView from "./components/MonetizationView";
import { Lock, Clock, ShieldCheck, CreditCard } from "lucide-react";

import { 
  BusinessProfile, 
  BusinessDiagnostic, 
  ContentStrategy, 
  Publication, 
  ContentIdea, 
  VideoScript, 
  InstagramAudit,
  ChatMessage
} from "./types";

import { 
  demoProfile, 
  demoDiagnostic, 
  demoStrategy, 
  demoCalendar, 
  demoIdeas, 
  demoAudit 
} from "./data/demo";

export default function App() {
  // Navigation
  const [activeTab, setActiveTab] = React.useState<ActiveTab>("dashboard");

  // Core Persistent States
  const [profile, setProfile] = React.useState<BusinessProfile>(() => {
    const saved = localStorage.getItem("growthos_profile");
    return saved ? JSON.parse(saved) : {
      businessName: "",
      industry: "",
      primaryProduct: "",
      avgPrice: "",
      idealCustomer: "",
      monthlyRevenueGoal: "",
      socialPlatforms: [],
      audienceSize: "",
      availableHours: ""
    };
  });

  const [diagnostic, setDiagnostic] = React.useState<BusinessDiagnostic | null>(() => {
    const saved = localStorage.getItem("growthos_diagnostic");
    return saved ? JSON.parse(saved) : null;
  });

  const [strategy, setStrategy] = React.useState<ContentStrategy | null>(() => {
    const saved = localStorage.getItem("growthos_strategy");
    return saved ? JSON.parse(saved) : null;
  });

  const [calendar, setCalendar] = React.useState<Publication[]>(() => {
    const saved = localStorage.getItem("growthos_calendar");
    return saved ? JSON.parse(saved) : [];
  });

  // Client states during API loads
  const [loadingDiagnostic, setLoadingDiagnostic] = React.useState(false);
  const [loadingStrategy, setLoadingStrategy] = React.useState(false);
  const [loadingCalendar, setLoadingCalendar] = React.useState(false);

  // SaaS Monetization States
  const [simulatedRole, setSimulatedRole] = React.useState<"creator" | "trial_active" | "trial_expired" | "premium_active">(() => {
    const params = new URLSearchParams(window.location.search);
    const paramRole = params.get("sim_role");
    if (paramRole === "trial_active" || paramRole === "trial_expired" || paramRole === "premium_active" || paramRole === "creator") {
      return paramRole;
    }
    const saved = localStorage.getItem("growthos_simulated_role");
    return (saved as any) || "creator";
  });

  const [monthlyPrice, setMonthlyPrice] = React.useState(() => {
    return localStorage.getItem("growthos_monthly_price") || "$29.00 USD";
  });

  const [trialDays, setTrialDays] = React.useState(() => {
    const saved = localStorage.getItem("growthos_trial_days");
    return saved ? Number(saved) : 7;
  });

  const [paymentLink, setPaymentLink] = React.useState(() => {
    return localStorage.getItem("growthos_payment_link") || "";
  });

  // Sync to outer localStorage whenever core states modify
  React.useEffect(() => {
    localStorage.setItem("growthos_profile", JSON.stringify(profile));
  }, [profile]);

  React.useEffect(() => {
    if (diagnostic) {
      localStorage.setItem("growthos_diagnostic", JSON.stringify(diagnostic));
    } else {
      localStorage.removeItem("growthos_diagnostic");
    }
  }, [diagnostic]);

  React.useEffect(() => {
    if (strategy) {
      localStorage.setItem("growthos_strategy", JSON.stringify(strategy));
    } else {
      localStorage.removeItem("growthos_strategy");
    }
  }, [strategy]);

  React.useEffect(() => {
    if (calendar.length > 0) {
      localStorage.setItem("growthos_calendar", JSON.stringify(calendar));
    } else {
      localStorage.removeItem("growthos_calendar");
    }
  }, [calendar]);

  React.useEffect(() => {
    localStorage.setItem("growthos_simulated_role", simulatedRole);
  }, [simulatedRole]);

  React.useEffect(() => {
    localStorage.setItem("growthos_monthly_price", monthlyPrice);
  }, [monthlyPrice]);

  React.useEffect(() => {
    localStorage.setItem("growthos_trial_days", String(trialDays));
  }, [trialDays]);

  React.useEffect(() => {
    localStorage.setItem("growthos_payment_link", paymentLink);
  }, [paymentLink]);

  // Handle cross-tab navigation events from deep shortcut components
  React.useEffect(() => {
    const handleShortcut = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail && customEvent.detail.tab) {
        setActiveTab(customEvent.detail.tab);
      }
    };
    window.addEventListener("tab-shortcut", handleShortcut);
    return () => {
      window.removeEventListener("tab-shortcut", handleShortcut);
    };
  }, []);

  // Quick action: Cargar Datos demo
  const handleLoadDemoData = () => {
    setProfile(demoProfile);
    setDiagnostic(demoDiagnostic);
    setStrategy(demoStrategy);
    setCalendar(demoCalendar);
    setActiveTab("dashboard");
  };

  // Reset core states to blank
  const handleReset = () => {
    setProfile({
      businessName: "",
      industry: "",
      primaryProduct: "",
      avgPrice: "",
      idealCustomer: "",
      monthlyRevenueGoal: "",
      socialPlatforms: [],
      audienceSize: "",
      availableHours: ""
    });
    setDiagnostic(null);
    setStrategy(null);
    setCalendar([]);
    localStorage.removeItem("growthos_profile");
    localStorage.removeItem("growthos_diagnostic");
    localStorage.removeItem("growthos_strategy");
    localStorage.removeItem("growthos_calendar");
    setActiveTab("diagnostic");
  };

  // API Call: Diagnosticar Negocio
  const handleRunDiagnostic = async () => {
    setLoadingDiagnostic(true);
    try {
      const res = await fetch("/api/diagnose", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profile }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "No se pudo calcular el diagnóstico.");
      }
      setDiagnostic(data.data);
    } catch (err: any) {
      console.error(err);
      throw err;
    } finally {
      setLoadingDiagnostic(false);
    }
  };

  // API Call: Modelar Posicionamiento y Estrategia
  const handleRunStrategy = async () => {
    setLoadingStrategy(true);
    try {
      const res = await fetch("/api/strategy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profile, diagnostic }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Error al generar propuesta estratégica.");
      }
      setStrategy(data.data);
    } catch (err: any) {
      console.error(err);
      throw err;
    } finally {
      setLoadingStrategy(false);
    }
  };

  // API Call: Generar Calendario 30 días
  const handleGenerateCalendar = async () => {
    setLoadingCalendar(true);
    try {
      const res = await fetch("/api/calendar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profile, strategy }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Error al formular calendario.");
      }
      setCalendar(data.data);
    } catch (err: any) {
      console.error(err);
      throw err;
    } finally {
      setLoadingCalendar(false);
    }
  };

  // API Call: Banco de ideas
  const handleRunIdeas = async (category: string, keyword: string): Promise<ContentIdea[]> => {
    try {
      const res = await fetch("/api/ideas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profile, category, keyword }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Error al generar ideas.");
      }
      return data.data;
    } catch (err: any) {
      console.error(err);
      throw err;
    }
  };

  // API Call: Redactar Guión de Conversión
  const handleRunScript = async (topic: string, format: string): Promise<VideoScript> => {
    try {
      const res = await fetch("/api/script", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profile, topic, desiredFormat: format }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Error al construir guión.");
      }
      return data.data;
    } catch (err: any) {
      console.error(err);
      throw err;
    }
  };

  // API Call: Auditoría de Instagram
  const handleRunAudit = async (params: AuditParams): Promise<InstagramAudit> => {
    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          profile, 
          instagramBio: params.instagramBio, 
          topPostsSummary: params.topPostsSummary, 
          mainProblem: params.mainProblem 
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Error al auditar cuenta.");
      }
      return data.data;
    } catch (err: any) {
      console.error(err);
      throw err;
    }
  };

  // API Call: Consultor Chatbot
  const handleSendChatMessage = async (message: string, history: ChatMessage[]): Promise<string> => {
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profile, strategy, message, history }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Error al hablar con el consultor AI.");
      }
      return data.content;
    } catch (err: any) {
      console.error(err);
      throw err;
    }
  };

  // Check if a given tab is locked under the current simulated customer tier
  const isTabLocked = (tab: string) => {
    if (simulatedRole === "creator" || simulatedRole === "premium_active" || tab === "monetization") {
      return false;
    }
    if (simulatedRole === "trial_expired") {
      return true;
    }
    if (simulatedRole === "trial_active") {
      const lockedTabs = ["calendar", "ideas", "scripts", "audit", "assistant"];
      return lockedTabs.includes(tab);
    }
    return false;
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#09090b] text-zinc-105 font-sans">
      
      {/* Sidebar Rail */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        marketingScore={diagnostic?.marketingScore || 0}
        businessName={profile.businessName}
        simulatedRole={simulatedRole}
      />

      {/* Main viewport Container */}
      <main className="flex-1 overflow-y-auto px-4 py-6 md:p-8 lg:p-10 grid-bg" id="main-content-flow">
        
        {/* Top universal action header bar */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-sm font-mono tracking-wider text-zinc-500 uppercase">GrowthOS AI &bull; Consola SaaS</h1>
          </div>
          <div className="flex items-center gap-2.5">
            {profile.businessName ? (
              <button 
                onClick={handleReset}
                className="px-3 py-1.5 rounded-lg border border-red-500/10 text-red-400 hover:text-white hover:bg-red-500/15 transition-all text-xs cursor-pointer font-medium"
              >
                Limpiar Datos
              </button>
            ) : (
              <button 
                onClick={handleLoadDemoData}
                className="px-3.5 py-1.5 rounded-lg border border-emerald-500/20 text-emerald-400 bg-emerald-500/5 hover:bg-emerald-500/15 transition-all text-xs cursor-pointer font-bold font-mono"
              >
                Cargar Demo B2B
              </button>
            )}
            <span className="h-5 w-px bg-zinc-800" />
            <div className="flex items-center gap-1.5 py-1.5 px-3 rounded-full bg-zinc-900 border border-zinc-800 text-[10.5px] text-zinc-300 font-mono font-bold">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
              </span>
              Conexión Gemini 3.5 Active
            </div>
          </div>
        </div>

        {/* Top simulated alert banners if active */}
        {simulatedRole === "trial_active" && (
          <div className="max-w-7xl mx-auto mb-6 bg-gradient-to-r from-emerald-500/10 via-zinc-900 to-zinc-950 border border-emerald-500/30 rounded-2xl p-4.5 flex flex-col md:flex-row justify-between items-center gap-3 shadow-lg shadow-emerald-500/5 animate-fade-in">
            <div className="flex items-center gap-3">
              <div className="bg-emerald-500/10 p-2.5 rounded-xl text-emerald-400 border border-emerald-500/25 shrink-0">
                <Clock className="h-5 w-5 animate-pulse" />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-white font-display flex items-center gap-1.5 leading-tight">
                  Modo Prueba Activo <span className="text-[9px] font-mono font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 px-1.5 py-0.2 rounded uppercase">SaaS Trial</span>
                </p>
                <p className="text-[10px] text-zinc-400 mt-0.5 leading-normal font-sans">
                  Prueba de cliente potencial para <strong className="text-zinc-200">{profile.businessName || "tu marca"}</strong> habilitada. Tienes acceso libre a Diagnóstico y Plan Estratégico.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3.5 shrink-0 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 border-zinc-800/80 pt-2.5 md:pt-0">
              <span className="text-xs font-mono text-zinc-400">Expira en {trialDays} días</span>
              <a 
                href={paymentLink || "#"}
                onClick={(e) => {
                  if (!paymentLink) {
                    e.preventDefault();
                    setSimulatedRole("premium_active");
                  }
                }}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-zinc-950 font-bold rounded-xl text-[10.5px] font-mono transition-all shrink-0 cursor-pointer text-center"
              >
                Activar Premium
              </a>
            </div>
          </div>
        )}

        {simulatedRole === "premium_active" && (
          <div className="max-w-7xl mx-auto mb-6 bg-gradient-to-r from-blue-500/10 via-zinc-900 to-zinc-950 border border-blue-500/30 rounded-2xl p-4.5 flex flex-col sm:flex-row justify-between items-center gap-3 shadow-lg animate-fade-in">
            <div className="flex items-center gap-3">
              <div className="bg-blue-500/15 p-2.5 rounded-xl text-blue-400 border border-blue-500/25 shrink-0">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-white font-display flex items-center gap-1.5 leading-tight">
                  Suscripción Premium Activa <span className="text-[9px] font-mono bg-blue-500/10 text-blue-400 border border-blue-500/20 px-1.5 py-0.2 rounded font-bold uppercase">PRO Access</span>
                </p>
                <p className="text-[10.5px] text-zinc-400 mt-0.5 font-sans leading-normal">
                  Todas las funciones del sistema, guiones y entrenamientos conversacionales de IA se encuentran totalmente liberados.
                </p>
              </div>
            </div>
            <button 
              onClick={() => setSimulatedRole("creator")}
              className="px-4 py-2 border border-zinc-800 hover:border-zinc-700 bg-zinc-950 text-zinc-400 hover:text-white font-mono text-[10px] rounded-xl transition-colors cursor-pointer shrink-0"
            >
              Volver a Administrador
            </button>
          </div>
        )}

        {/* View Switch */}
        <div className="max-w-7xl mx-auto pb-12">
          {isTabLocked(activeTab) ? (
            <div className="bg-zinc-900 border border-zinc-850 rounded-3xl p-8 max-w-2xl mx-auto my-12 text-center space-y-6 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-60 h-60 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="mx-auto w-16 h-16 bg-zinc-950 border border-zinc-800 rounded-2xl flex items-center justify-center text-emerald-400 shadow-md">
                <Lock className="h-6 w-6 stroke-2" />
              </div>
              
              <div className="space-y-2">
                <span className="text-[10px] font-mono tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full uppercase font-bold">
                  {simulatedRole === "trial_expired" ? "Prueba Gratuita Expirada ⏳" : "Herramienta Premium 🔒"}
                </span>
                <h3 className="text-2xl font-bold font-display text-white mt-1">Desbloquea el Acceso Completo</h3>
                <p className="text-xs text-zinc-400 max-w-md mx-auto leading-relaxed">
                  {simulatedRole === "trial_expired" 
                    ? `Tu periodo de prueba de ${trialDays} días en ${profile.businessName || "esta herramienta"} ha expirado. Activa tu suscripción para seguir usando los automatizadores de conversión de IA.`
                    : `El acceso a la sección de ${activeTab === 'calendar' ? 'Calendario de Posts' : activeTab === 'ideas' ? 'Banco de Ideas' : activeTab === 'scripts' ? 'Guiones de Video' : activeTab === 'audit' ? 'Auditoría de Instagram' : 'Asistente AI'} está reservado para clientes en el Plan de Crecimiento de Pago.`
                  }
                </p>
              </div>

              <div className="bg-zinc-950/85 border border-zinc-850 p-6 rounded-2xl space-y-2 max-w-sm mx-auto">
                <span className="text-[10px] font-mono text-zinc-550 uppercase tracking-widest block font-bold leading-none">Suscripción Acceso Premium</span>
                <div className="flex items-baseline justify-center gap-1.5 mt-1">
                  <span className="text-3xl font-extrabold text-white font-display leading-none">{monthlyPrice || "$29.00 USD"}</span>
                  <span className="text-xs text-zinc-550">/ mes</span>
                </div>
                <p className="text-[10px] text-zinc-450 leading-relaxed font-sans font-medium">Acceso inmediato para optimizar tus publicaciones en segundos sin salir de la consola.</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center items-center max-w-md mx-auto pt-2">
                <a 
                  href={paymentLink || "#"}
                  onClick={(e) => {
                    if (!paymentLink) {
                      e.preventDefault();
                      setSimulatedRole("premium_active");
                    }
                  }}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto px-8 py-3.5 bg-emerald-500 hover:bg-emerald-600 text-zinc-950 font-bold font-display rounded-xl text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-emerald-500/10"
                >
                  <CreditCard className="h-4 w-4" /> Activar Acceso Premium
                </a>
                
                {simulatedRole === "trial_active" && (
                  <button
                    onClick={() => setActiveTab("monetization")}
                    className="w-full sm:w-auto px-5 py-3.5 text-xs font-semibold text-zinc-300 hover:text-white rounded-xl hover:bg-zinc-800/50 border border-zinc-800 transition-colors cursor-pointer"
                  >
                    Ver detalles del plan
                  </button>
                )}
              </div>
              
              <div className="pt-2 border-t border-zinc-800/40 text-zinc-550 text-[10px] font-mono">
                SaaS impulsado de forma autónoma por GrowthOS AI
              </div>
            </div>
          ) : (
            <>
              {activeTab === "dashboard" && (
                <DashboardView 
                  profile={profile}
                  diagnostic={diagnostic}
                  strategy={strategy}
                  onNavigate={(tab) => setActiveTab(tab)}
                  onResetDemo={handleLoadDemoData}
                />
              )}

              {activeTab === "diagnostic" && (
                <DiagnosticView 
                  profile={profile}
                  setProfile={setProfile}
                  diagnostic={diagnostic}
                  onRunDiagnostic={handleRunDiagnostic}
                  loading={loadingDiagnostic}
                  onNavigate={(tab) => setActiveTab(tab)}
                />
              )}

              {activeTab === "strategy" && (
                <StrategyView 
                  profile={profile}
                  diagnostic={diagnostic}
                  strategy={strategy}
                  onRunStrategy={handleRunStrategy}
                  loading={loadingStrategy}
                  onNavigate={(tab) => setActiveTab(tab)}
                />
              )}

              {activeTab === "calendar" && (
                <CalendarView 
                  profile={profile}
                  strategy={strategy}
                  calendar={calendar}
                  onGenerateCalendar={handleGenerateCalendar}
                  loading={loadingCalendar}
                />
              )}

              {activeTab === "ideas" && (
                <IdeaBankView 
                  profile={profile}
                  onGenerateIdeas={handleRunIdeas}
                  initialIdeas={demoIdeas}
                />
              )}

              {activeTab === "scripts" && (
                <ScriptGeneratorView 
                  profile={profile}
                  initialScript={null}
                  onGenerateScript={handleRunScript}
                />
              )}

              {activeTab === "audit" && (
                <InstagramAuditView 
                  profile={profile}
                  onRunAudit={handleRunAudit}
                  initialAudit={demoAudit}
                />
              )}

              {activeTab === "assistant" && (
                <ProductivityAssistantView 
                  profile={profile}
                  strategy={strategy}
                  onSendChatMessage={handleSendChatMessage}
                />
              )}

              {activeTab === "monetization" && (
                <MonetizationView 
                  businessName={profile.businessName}
                  simulatedRole={simulatedRole}
                  setSimulatedRole={setSimulatedRole}
                  monthlyPrice={monthlyPrice}
                  setMonthlyPrice={setMonthlyPrice}
                  trialDays={trialDays}
                  setTrialDays={setTrialDays}
                  paymentLink={paymentLink}
                  setPaymentLink={setPaymentLink}
                />
              )}
            </>
          )}
        </div>

      </main>

    </div>
  );
}
