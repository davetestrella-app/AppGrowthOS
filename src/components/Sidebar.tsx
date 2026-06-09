import React from "react";
import { 
  LayoutDashboard, 
  ClipboardCheck, 
  Target, 
  CalendarDays, 
  Lightbulb, 
  FileText, 
  Instagram, 
  Sparkles,
  Zap,
  TrendingUp,
  X,
  Menu,
  DollarSign,
  CreditCard
} from "lucide-react";

export type ActiveTab = 
  | "dashboard" 
  | "diagnostic" 
  | "strategy" 
  | "calendar" 
  | "ideas" 
  | "scripts" 
  | "audit" 
  | "assistant"
  | "monetization";

interface SidebarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  marketingScore: number;
  businessName: string;
  simulatedRole?: "creator" | "trial_active" | "trial_expired" | "premium_active";
}

export default function Sidebar({ 
  activeTab, 
  setActiveTab, 
  marketingScore, 
  businessName,
  simulatedRole = "creator" 
}: SidebarProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, desc: "Métricas y resumen" },
    { id: "diagnostic", label: "Diagnóstico", icon: ClipboardCheck, desc: "Análisis del negocio" },
    { id: "strategy", label: "Estrategia", icon: Target, desc: "Posicionamiento e hitos" },
    { id: "calendar", label: "Calendario", icon: CalendarDays, desc: "Plan mensual de posts" },
    { id: "ideas", label: "Banco de Ideas", icon: Lightbulb, desc: "Estructuras Hook-CTA" },
    { id: "scripts", label: "Guiones de Video", icon: FileText, desc: "Estructura de conversión" },
    { id: "audit", label: "Auditoría IG", icon: Instagram, desc: "Análisis de conversión" },
    { id: "assistant", label: "Asistente Diario", icon: Sparkles, desc: "Consultor de crecimiento" },
  ] as const;


  return (
    <>
      {/* Mobile Header */}
      <header className="lg:hidden w-full bg-zinc-950/90 border-b border-zinc-800 p-4 flex justify-between items-center sticky top-0 z-50 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="bg-emerald-500/15 p-1.5 rounded-lg border border-emerald-500/30">
            <Zap className="h-5 w-5 text-emerald-400" />
          </div>
          <span className="font-display font-bold text-lg tracking-tight bg-gradient-to-r from-white via-zinc-200 to-emerald-400 bg-clip-text text-transparent">
            GrowthOS <span className="text-emerald-400 font-mono text-xs ml-1 border border-emerald-500/30 px-1 rounded bg-emerald-500/10">AI</span>
          </span>
        </div>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors"
          id="mobile-menu-burger"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </header>

      {/* Sidebar container */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-zinc-950 border-r border-zinc-800 p-5 flex flex-col justify-between transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:h-screen
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <div className="flex flex-col gap-6">
          {/* Logo */}
          <div className="hidden lg:flex items-center gap-3 py-2 border-b border-zinc-800/65">
            <div className="bg-emerald-500 p-2 rounded-xl text-zinc-950 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
              <Zap className="h-5 w-5 fill-current" />
            </div>
            <div>
              <h1 className="font-display font-bold text-lg leading-tight text-white flex items-center gap-1.5">
                GrowthOS <span className="text-emerald-400 font-mono text-[9px] border border-emerald-500/30 px-1 py-0.2 rounded bg-emerald-500/10 tracking-widest uppercase">AI</span>
              </h1>
              <p className="text-[10px] text-zinc-400 uppercase tracking-wider font-mono">Growth Assistant</p>
            </div>
          </div>

          {/* Current Project Info */}
          <div className="bg-zinc-900/70 rounded-xl p-3 border border-zinc-800/80">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-mono">Negocio</span>
              <span className="flex items-center gap-1 text-[10px] py-0.5 px-2 bg-emerald-500/10 border border-emerald-500/25 rounded-full text-emerald-400 font-mono">
                <TrendingUp className="h-2.5 w-2.5" /> Score: {marketingScore}
              </span>
            </div>
            <p className="text-sm font-medium text-zinc-150 truncate">{businessName || "Sin registrar"}</p>
          </div>

          {/* Navigation Items */}
          <nav className="flex flex-col gap-1.5" id="sidebar-nav">
            <span className="px-3 text-[10px] text-zinc-500 font-mono tracking-widest uppercase mb-1">Estrategias</span>
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-tab-${item.id}`}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsOpen(false);
                  }}
                  className={`
                    w-full flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-200 group text-left
                    ${isActive 
                      ? "bg-emerald-500/10 border-l-4 border-emerald-500 text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]" 
                      : "text-zinc-400 hover:text-white hover:bg-zinc-800/40 border-l-4 border-transparent"
                    }
                  `}
                >
                  <Icon className={`h-4.5 w-4.5 shrink-0 ${isActive ? "text-emerald-400" : "text-zinc-500 group-hover:text-zinc-300"}`} />
                  <div>
                    <p className="text-sm font-medium leading-none">{item.label}</p>
                    <p className="text-[10px] text-zinc-500 mt-0.5 font-normal group-hover:text-zinc-400 leading-none">{item.desc}</p>
                  </div>
                </button>
              );
            })}

            {simulatedRole === "creator" ? (
              <>
                <span className="px-3 text-[10px] text-zinc-550 font-mono tracking-widest uppercase mt-3 mb-1 block">Configurar SaaS</span>
                <button
                  id="nav-tab-monetization"
                  onClick={() => {
                    setActiveTab("monetization");
                    setIsOpen(false);
                  }}
                  className={`
                    w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group text-left border border-dashed
                    ${activeTab === "monetization" 
                      ? "bg-emerald-500/10 border-emerald-500/50 text-white shadow-[0_0_15px_rgba(16,185,129,0.1)] font-medium" 
                      : "text-zinc-400 hover:text-white hover:bg-[#18181b]/60 border-zinc-800"
                    }
                  `}
                >
                  <DollarSign className={`h-4.5 w-4.5 shrink-0 ${activeTab === "monetization" ? "text-emerald-400" : "text-zinc-500"}`} />
                  <div>
                    <p className="text-sm font-bold leading-none text-emerald-400">Monetizar SaaS</p>
                    <p className="text-[10px] text-zinc-500 mt-1 font-normal group-hover:text-zinc-400 leading-none">Pruebas y Planes</p>
                  </div>
                </button>
              </>
            ) : (
              <>
                <span className="px-3 text-[10px] text-zinc-550 font-mono tracking-widest uppercase mt-3 mb-1 block">Suscripción</span>
                <button
                  id="nav-tab-monetization"
                  onClick={() => {
                    setActiveTab("monetization");
                    setIsOpen(false);
                  }}
                  className={`
                    w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group text-left border border-dashed
                    ${activeTab === "monetization" 
                      ? "bg-emerald-500/10 border-emerald-500/50 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.1)] font-medium" 
                      : "text-zinc-400 hover:text-white hover:bg-[#18181b]/60 border-zinc-800"
                    }
                  `}
                >
                  <CreditCard className={`h-4.5 w-4.5 shrink-0 ${activeTab === "monetization" ? "text-emerald-400" : "text-zinc-500"}`} />
                  <div>
                    <p className="text-sm font-bold leading-none text-emerald-400">Detalles del Plan</p>
                    <p className="text-[10px] text-zinc-500 mt-1 font-normal group-hover:text-zinc-400 leading-none">Plan Premium</p>
                  </div>
                </button>
              </>
            )}
          </nav>
        </div>

        {/* Footer info */}
        <div className="pt-4 border-t border-zinc-800/80">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-zinc-900 flex items-center justify-center text-xs font-mono font-bold text-zinc-300 border border-zinc-800">
              GO
            </div>
            <div>
              <p className="text-xs font-medium text-zinc-200">SaaS Consultant</p>
              <p className="text-[10px] text-emerald-400/90 flex items-center gap-1">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                </span>
                Pro Engine Activo
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile background overlay */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-30 lg:hidden"
        />
      )}
    </>
  );
}
