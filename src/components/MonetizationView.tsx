import React from "react";
import { 
  DollarSign, 
  Sparkles, 
  Link, 
  Copy, 
  Check, 
  AlertCircle, 
  UserPlus, 
  ShieldCheck, 
  CreditCard, 
  Percent, 
  RefreshCw, 
  Users, 
  Lock, 
  Unlock, 
  Info,
  ExternalLink,
  Smartphone,
  ChevronRight,
  Gift
} from "lucide-react";

interface MonetizationViewProps {
  businessName: string;
  simulatedRole: "creator" | "trial_active" | "trial_expired" | "premium_active";
  setSimulatedRole: (role: "creator" | "trial_active" | "trial_expired" | "premium_active") => void;
  monthlyPrice: string;
  setMonthlyPrice: (price: string) => void;
  trialDays: number;
  setTrialDays: (days: number) => void;
  paymentLink: string;
  setPaymentLink: (link: string) => void;
}

export default function MonetizationView({
  businessName,
  simulatedRole,
  setSimulatedRole,
  monthlyPrice,
  setMonthlyPrice,
  trialDays,
  setTrialDays,
  paymentLink,
  setPaymentLink,
}: MonetizationViewProps) {
  const [copiedLink, setCopiedLink] = React.useState<string | null>(null);
  const [checkoutService, setCheckoutService] = React.useState<"stripe" | "whatsapp" | "paypal" | "hotmart">("hotmart");
  const [generatedScript, setGeneratedScript] = React.useState("");

  React.useEffect(() => {
    // Generate script/guideline text based on configuration
    const priceText = monthlyPrice || "$29.00 USD";
    const daysText = trialDays || "7";
    const userCompany = businessName || "Mundo Fitness";

    let text = "";
    if (checkoutService === "stripe") {
      text = `🛒 ESTRATEGIA STRIPE SAAS:\n1. Crea una cuenta en Stripe.com\n2. Ve a 'Product Catalog' y crea un Producto llamado "GrowthOS - ${userCompany} Platinum"\n3. Define Pago Recurrente mensual de ${priceText}\n4. Activa la casilla de 'Trial Gratuito' y coloca ${daysText} días.\n5. Copia el 'Payment Link' generado por Stripe y pégalo abajo. ¡Los clientes que se registren tendrán retención de tarjeta automática después de ${daysText} días!`;
    } else if (checkoutService === "whatsapp") {
      text = `💬 ESTRATEGIA CIERRE MANUAL POR WHATSAPP:\n¡Excelente para iniciar rápido sin configurar pasarelas! Usa este mensaje de venta:\n"¡Hola! Vi que te interesó el plan GrowthOS para potenciar tu marca. Te activo una prueba gratuita de ${daysText} días para que veas el plan de publicaciones de 30 días. Si te encanta, la suscripción mensual es de solo ${priceText} vía PayPal/Transferencia. ¿Te parece bien que te mande tu acceso?"`;
    } else if (checkoutService === "paypal") {
      text = `🅿️ ESTRATEGIA PAYPAL SUBSCRIPTION:\n1. Ve a PayPal Developer o tu cuenta Business.\n2. Crea un Producto "Suscripción GrowthOS ${userCompany}" de ${priceText}/mes.\n3. Añade un periodo de prueba de ${daysText} días a $0.00.\n4. Genera el botón inteligente e inserta el enlace de suscripción directo en el campo inferior. ¡Automatizado y global!`;
    } else {
      text = `🔥 ESTRATEGIA DE SUSCRIPCIÓN EN HOTMART:\n1. Regístrate o inicia sesión en hotmart.com como Creador.\n2. Crea un Producto Digital y selecciona el formato de tipo "Suscripción" llamado "GrowthOS - ${userCompany} Active Access".\n3. En la configuración del plan, define la recurrencia mensual a ${priceText}.\n4. Activa la casilla de de "Período de prueba" (Free Trial) colocando exactamente ${daysText} días de prueba.\n5. Ve a "Hotlinks" de tu producto, copia el "Enlace a la Página de Pago Directa" (Checkout de Hotmart) y pégalo en el campo inferior de esta sección.\n\n¡Listo! Hotmart se encargará del cobro recurrente automático, ofrecerá más de 12 métodos de pago locales latinoamericanos (efectivo, PSE, Pix, etc.) y asegurará la entrega tras culminar tu prueba de ${daysText} días.`;
    }
    setGeneratedScript(text);
  }, [monthlyPrice, trialDays, businessName, checkoutService]);

  const copyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedLink(label);
    setTimeout(() => setCopiedLink(null), 2000);
  };

  const getTrialShareLink = () => {
    // Generates a mock onboarding URL for potential clients
    const base = window.location.href.split("?")[0];
    return `${base}?sim_role=trial_active&ref_name=${encodeURIComponent(businessName || "Creator")}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
        <div>
          <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
            <DollarSign className="h-5.5 w-5.5 text-emerald-400" /> Sistema de Monetización y Pruebas Gratuitas
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Convierte esta herramienta en tu propio negocio SaaS. Configura precios, genera enlaces de pago y simula cómo tus clientes verán el muro de pago (Paywall).
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side (SaaS Controller Configuration) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* STEP 1: Plan Configurator */}
          <div className="bg-zinc-900/95 border border-zinc-800 rounded-2xl p-6 space-y-4 shadow-xl">
            <h3 className="text-sm font-display font-bold text-white flex items-center gap-2 uppercase tracking-wide font-mono">
              <Percent className="h-4 w-4 text-emerald-400" /> 1. Configuración de tu Oferta SaaS
            </h3>
            <p className="text-xs text-zinc-400">
              Personaliza el precio de suscripción y los días de acceso gratuito que darás a tus prospectos o clientes para validar tu servicio de Growth Marketing.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
              {/* Subscription Price */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-300">Precio Suscripción Mensual</label>
                <input 
                  type="text"
                  value={monthlyPrice}
                  onChange={(e) => setMonthlyPrice(e.target.value)}
                  placeholder="Ej: $29 USD / mes"
                  className="w-full bg-zinc-950/70 border border-zinc-800 focus:border-emerald-500 rounded-xl px-4 py-2.5 text-xs text-zinc-100 placeholder-zinc-650 outline-none transition-colors"
                />
              </div>

              {/* Free Trial Days */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-300">Duración de Prueba Gratuita (Días)</label>
                <select
                  value={trialDays}
                  onChange={(e) => setTrialDays(Number(e.target.value))}
                  className="w-full bg-zinc-950/70 border border-zinc-800 focus:border-emerald-500 rounded-xl px-3.5 py-2.5 text-xs text-zinc-200 outline-none transition-colors cursor-pointer"
                >
                  <option value={3}>3 Días (Acción Ultra Rápida)</option>
                  <option value={7}>7 Días (Recomendado - Estándar)</option>
                  <option value={14}>14 Días (Ideal para B2B Complejos)</option>
                  <option value={30}>30 Días (Socio de Crecimiento de confianza)</option>
                </select>
              </div>

              {/* Payment Link Custom URL */}
              <div className="space-y-1.5 col-span-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-semibold text-zinc-300">Enlace de Pago Activación (Hotmart, Stripe, PayPal, o WhatsApp)</label>
                  <span className="text-[10px] text-emerald-400 font-mono">Para rellenar en el botón SaaS del Paywall</span>
                </div>
                <input 
                  type="text"
                  value={paymentLink}
                  onChange={(e) => setPaymentLink(e.target.value)}
                  placeholder="Ej: https://buy.stripe.com/abcDeFGhI123"
                  className="w-full bg-zinc-950/70 border border-zinc-800 focus:border-emerald-500 rounded-xl px-4 py-2.5 text-xs text-zinc-100 placeholder-zinc-650 outline-none transition-colors font-mono"
                />
              </div>
            </div>
          </div>

          {/* STEP 2: Payment Provider Setup Strategies (Tabbed) */}
          <div className="bg-zinc-900/95 border border-zinc-800 rounded-2xl p-6 space-y-4 shadow-xl">
            <div className="flex justify-between items-center pb-2 border-b border-zinc-800/60">
              <h3 className="text-sm font-display font-bold text-white flex items-center gap-2 uppercase tracking-wide font-mono">
                <CreditCard className="h-4 w-4 text-emerald-400" /> 2. Proveedor de Cobro Recomendado
              </h3>
            </div>

            {/* Provider Selector Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: "stripe", label: "Stripe Subscriptions" },
                { id: "whatsapp", label: "Cierre Manual" },
                { id: "paypal", label: "PayPal Business" },
                { id: "hotmart", label: "Hotmart Suscripción" }
              ].map((prov) => (
                <button
                  type="button"
                  key={prov.id}
                  onClick={() => setCheckoutService(prov.id as any)}
                  className={`px-2 py-2 rounded-xl text-xs font-semibold text-center transition-all cursor-pointer
                    ${checkoutService === prov.id 
                      ? "bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 font-bold" 
                      : "bg-zinc-950 border border-zinc-800/80 text-zinc-400 hover:text-white"
                    }
                  `}
                >
                  {prov.label}
                </button>
              ))}
            </div>

            <div className="bg-zinc-950/80 border border-zinc-850 p-4 rounded-xl space-y-3">
              <p className="text-xs text-zinc-300 font-mono whitespace-pre-line leading-relaxed">
                {generatedScript}
              </p>
              
              {checkoutService === "stripe" && (
                <div className="flex justify-end">
                  <a 
                    href="https://stripe.com" 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-[11px] font-mono font-bold text-emerald-400 flex items-center gap-1 hover:underline"
                  >
                    Abrir Stripe Dashboard <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              )}
              {checkoutService === "hotmart" && (
                <div className="flex justify-end">
                  <a 
                    href="https://hotmart.com" 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-[11px] font-mono font-bold text-orange-400 flex items-center gap-1 hover:underline"
                  >
                    Abrir Hotmart <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              )}
              {checkoutService === "paypal" && (
                <div className="flex justify-end">
                  <a 
                    href="https://paypal.com" 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-[11px] font-mono font-bold text-blue-400 flex items-center gap-1 hover:underline"
                  >
                    Abrir PayPal Business <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* STEP 3: Share links Onboarding */}
          <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-2xl p-6 space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-300 font-bold">
              🚀 ¿Cómo hacer para que otros comiencen hoy? (Link de Onboarding)
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Puedes enviar un enlace especial de tu aplicación que pondrá a tus clientes automáticamente en el **Modo de Prueba Gratuita** configurado. Cuando intenten usar herramientas premium (como redactar Guiones o Auditar su Instagram), el sistema les pedirá subscribirse usando tu Enlace de Pago.
            </p>

            <div className="bg-zinc-950/70 border border-zinc-850 p-3 rounded-xl flex items-center justify-between gap-3 font-mono text-[11px]">
              <span className="text-emerald-400 truncate max-w-[80%]">{getTrialShareLink()}</span>
              <button
                onClick={() => copyText(getTrialShareLink(), "share_link")}
                className="px-2 py-1 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs shrink-0 flex items-center gap-1 cursor-pointer transition-colors"
              >
                {copiedLink === "share_link" ? "¡Copiado!" : <><Copy className="h-3 w-3" /> Copiar Link</>}
              </button>
            </div>
            
            <div className="text-[11.5px] text-zinc-400 flex items-start gap-2.5 bg-emerald-500/5 border border-emerald-500/10 p-3.5 rounded-xl">
              <Info className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-emerald-305">Flujo Perfecto de Adquisición de Clientes:</p>
                <div className="space-y-1.5 mt-1">
                  <p>1. Envías este link a un prospecto o lo pones en tu biografía de redes sociales como un gancho consultivo.</p>
                  <p>2. El prospecto usa la prueba de <strong className="text-zinc-200">{trialDays} días</strong> para hacer su diagnóstico de negocio gratuitos en tu consola.</p>
                  <p>3. Al querer bajar sus guiones tácticos o cronograma diario, se suscribe con tu link de <strong className="text-zinc-200">{monthlyPrice || "$29/mes"}</strong>.</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Side (SaaS Simulator Sandbox) */}
        <div className="lg:col-span-5 space-y-5">
          
          {/* SANDBOX CONTROLLER */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl space-y-4">
            <h3 className="text-sm font-display font-semibold text-white flex items-center gap-2">
              <Sparkles className="h-4.5 w-4.5 text-emerald-400 animate-pulse" /> Caja de Arena de Simulación SaaS
            </h3>
            <p className="text-xs text-zinc-450 leading-relaxed font-sans">
              Cambia el rol del usuario actual para comprobar cómo se comporta la aplicación ante tus clientes reales.
            </p>

            <div className="space-y-2.5">
              {[
                { 
                  id: "creator", 
                  title: "Modo Administrador (Tú)", 
                  desc: "Ves todas las pestañas y configuras la monetización." 
                },
                { 
                  id: "trial_active", 
                  title: `Prueba Gratuita (${trialDays} días)`, 
                  desc: "Un banner muestra el estado de la prueba y se restringe a accesos básicos con opción de subscripción." 
                },
                { 
                  id: "trial_expired", 
                  title: "Prueba Gratuita Expirada", 
                  desc: "El Dashboard y el resto del ecosistema muestran el Paywall inmediatamente." 
                },
                { 
                  id: "premium_active", 
                  title: "Cliente Premium de Pago (Pro)", 
                  desc: "Muestra tu marca pero desbloquea todo sin banners con mensaje de agradecimiento." 
                },
              ].map((role) => (
                <button
                  type="button"
                  key={role.id}
                  onClick={() => setSimulatedRole(role.id as any)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer flex justify-between items-center
                    ${simulatedRole === role.id 
                      ? "bg-emerald-500/10 border-emerald-500/40 shadow-md shadow-emerald-500/5 text-emerald-400" 
                      : "bg-zinc-950/60 border-zinc-850 text-zinc-350 hover:border-zinc-805 hover:bg-zinc-900/60"
                    }
                  `}
                >
                  <div>
                    <h4 className="text-xs font-bold leading-tight flex items-center gap-1.5 font-display">
                      {simulatedRole === role.id ? <Unlock className="h-3.5 w-3.5" /> : <Lock className="h-3.5 w-3.5 text-zinc-650" />} 
                      {role.title}
                    </h4>
                    <p className="text-[10px] text-zinc-450 mt-1 font-sans">{role.desc}</p>
                  </div>
                  <ChevronRight className={`h-4 w-4 ${simulatedRole === role.id ? "text-emerald-400" : "text-zinc-650"}`} />
                </button>
              ))}
            </div>
          </div>

          {/* PREVIEW CONTAINER OF PAYWALL EXAMPLES */}
          <div className="bg-zinc-950/95 border border-zinc-800 rounded-2xl p-5.5 space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400">Vista de ejemplo del Muro de Pago (Paywall)</h4>
            
            <div className="bg-zinc-90 w-full rounded-xl border border-zinc-850 p-4.5 space-y-4 shadow-inner relative overflow-hidden bg-zinc-900/60">
              <div className="text-center space-y-2">
                <div className="bg-emerald-400/10 p-2.5 rounded-xl text-emerald-400 border border-emerald-500/15 w-max mx-auto">
                  <Gift className="h-5 w-5" />
                </div>
                <h4 className="text-sm font-bold text-white font-display">Prueba Gratuita Expirada ⏳</h4>
                <p className="text-[11px] text-zinc-400 leading-normal max-w-xs mx-auto">
                  Tu periodo de evaluación de {trialDays} días para la marca <strong>{businessName || "Creator Studio"}</strong> ha culminado de forma segura.
                </p>
              </div>

              <div className="bg-zinc-950/70 border border-zinc-850 p-3 rounded-xl space-y-1.5 text-center font-sans">
                <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-semibold block">Suscripción Acceso Premium</span>
                <p className="text-base font-extrabold text-white">{monthlyPrice || "$29.00 USD"} <span className="text-xs text-zinc-550 font-normal">/ mes</span></p>
              </div>

              <a
                href={paymentLink || "#"}
                onClick={(e) => {
                  if (!paymentLink) e.preventDefault();
                }}
                target="_blank" 
                rel="noreferrer"
                className="w-full py-2.5 font-display font-bold rounded-xl text-xs flex justify-center items-center gap-1.5 bg-emerald-500 hover:bg-emerald-600 text-zinc-950 transition-all font-sans cursor-pointer text-center"
              >
                Suscribirse con {paymentLink ? "Stripe Link" : "WhatsApp Pro"} &rarr;
              </a>
              <p className="text-[9px] text-zinc-550 text-center">Cancela seguro en cualquier momento desde tu panel de Stripe.</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
