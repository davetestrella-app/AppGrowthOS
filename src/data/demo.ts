import { BusinessProfile, BusinessDiagnostic, ContentStrategy, Publication, ContentIdea, VideoScript, InstagramAudit } from "../types";

export const demoProfile: BusinessProfile = {
  businessName: "SaaSify Scale",
  industry: "Consultoría de Marketing B2B",
  primaryProduct: "Growth Sprint: Consultoría 1-on-1",
  avgPrice: "$990 USD",
  idealCustomer: "Programadores y fundadores técnicos que lanzaron un SaaS pero sufren para conseguir leads calificados de forma orgánica.",
  monthlyRevenueGoal: "$15,000 USD",
  socialPlatforms: ["LinkedIn", "Instagram", "X / Twitter"],
  audienceSize: "1,200 seguidores",
  availableHours: "6 horas/semana"
};

export const demoDiagnostic: BusinessDiagnostic = {
  strengths: [
    "Producto de alto valor (High-ticket) con márgenes excepcionales.",
    "Nicho claro y bien segmentado (fundadores técnicos).",
    "Mensaje enfocado en resolver un dolor principal: Conseguir leads orgánicos."
  ],
  weaknesses: [
    "Improvisación en los canales de redes actuales (contenido aleatorio sin CTAs vendedoras).",
    "Escaso tiempo disponible (6 hrs semanales) para diseñar embudos de valor.",
    "Falta de pilar de Autoridad sólido (casos de estudio) en sus perfiles públicos."
  ],
  opportunities: [
    "Optimizar biografía de conversión rápida con disparador de DM directo en Reels.",
    "Estructurar un 'Lead Magnet' de alto nivel educativo para captar correos/leads.",
    "Utilizar ganchos (Hooks) enfocados en código vs. negocio para llamar la atención del fundador."
  ],
  bottlenecks: [
    "Mucho contenido educativo vacío sin llamadas a la acción que generen DMs directos.",
    "No hay posicionamiento diferenciado claro: compite contra agencias genéricas."
  ],
  marketingScore: 68
};

export const demoStrategy: ContentStrategy = {
  recommendedPositioning: "El estratega táctico de 'Cero Contenido de Relleno' que enseña a fundadores técnicos a codificar embudos que venden de forma autónoma.",
  valueProposition: "Ayudamos a programadores B2B a conseguir sus primeros 10 clientes de pago sin gastar $1 en pauta publicitaria ni publicar todos los días.",
  primaryMessage: "Basta de crear contenido para otros programadores. Es momento de estructurar una pauta de conversión que traduzca tu código en MRR recurrente.",
  differentiators: [
    "Metodología diseñada específicamente para mentes lógicas / estructuradas (sin marketing humo).",
    "Garantía basada en agendamiento directo de leads en el primer mes.",
    "Estructura paso a paso documentada en formato 'no-code funnel'."
  ],
  objectives30Days: [
    "Alcanzar las primeras 10 llamadas agendadas orgánicamente por mensaje directo.",
    "Estandarizar el pilar de Autoridad publicando 2 mini casos de estudio de éxito.",
    "Automatizar las respuestas por DM para entregar el imán de leads."
  ]
};

export const demoCalendar: Publication[] = [
  {
    day: 1,
    theme: "El dolor de construir sin saber comunicar el beneficio comercial",
    objective: "Pilar: Educación. Ataca el error número uno de lanzar un SaaS sin pauta de contenido orgánica.",
    format: "Reel / Video corto de 45 segundos",
    cta: "Comenta 'AUDITORÍA' y evaluaré tu cuenta de forma personal sin costo."
  },
  {
    day: 3,
    theme: "Caso de Estudio: Cómo un micro-SaaS superó los $5k MRR con 2 publicaciones semanales",
    objective: "Pilar: Autoridad. Muestra resultados reales y credibilidad técnica en el ecosistema.",
    format: "Carrusel de Alto Contraste en Instagram/LinkedIn",
    cta: "Haz clic en mi link de Bio para agendar tu consulta de Sprint gratuita."
  },
  {
    day: 5,
    theme: "Filosofía: Odio el marketing tradicional de vendehúmos. He aquí mi metodología basada en código.",
    objective: "Pilar: Comunidad. Crea conexión por compartir valores de transparencia y honestidad.",
    format: "Post de Texto de Imagen única",
    cta: "Comenta qué opinas: ¿Vale más un buen código o un buen gancho comercial?"
  },
  {
    day: 7,
    theme: "Paso a paso para configurar tu primer automatizador de leads por chat",
    objective: "Pilar: Educación. Entrega valor táctico para mitigar falta de horas de creación.",
    format: "Carrusel didáctico con código y lógica",
    cta: "Comenta 'LEAD' para enviarte la plantilla lista para importar en tu CRM."
  },
  {
    day: 10,
    theme: "Tasa de conversión de tus posts: El único KPI que un programador fundador debería medir",
    objective: "Pilar: Conversión. Venta indirecta mediante la importancia de los objetivos de negocio.",
    format: "Reel rápido de 30 segundos",
    cta: "Escríbeme 'CONVERSIÓN' al DM para auditar tu embudo corporativo."
  }
];

export const demoIdeas: ContentIdea[] = [
  {
    title: "El error de los fundadores técnicos",
    hook: "Tu código no va a venderse solo por ser hermoso. He aquí el motivo real de tus cero clics.",
    objective: "Educación de Alta Conversión. Ataca el sesgo del fundador de enfocarse sólo en pulir el software.",
    development: "1. Explica que la usabilidad técnica no importa si tus clientes no entienden qué problema solucionas.\n2. Contrasta un software horrible que factura $10k MRR vs un código premium con $0.\n3. Comparte el método 'Mensaje de Valor' en 1 minuto.",
    cta: "Comenta 'MENSAJE' y te mandaré un checklist exprés para re-estructurar tu propuesta de valor."
  },
  {
    title: "Caso de Estudio: De $0 a $3k MRR",
    hook: "Consiguió sus primeros 5 clientes B2B usando sólo un documento de Google y un hilo de Twitter.",
    objective: "Estudios de Caso y Autoridad. Elimina objeciones de costo o necesidad de contratar agencias de publicidad.",
    development: "1. Describe el problema del fundador que no tenía presupuesto para anuncios.\n2. Muestra cómo usó la educación táctica resolviendo un dolor crítico en un hilo lógico.\n3. Presenta los pantallazos del agendamiento directo de llamadas por mensaje.",
    cta: "Mira mi historia destacada 'SaaSify Sprint' para copiar este proceso exacto."
  },
  {
    title: "Script para Conversión Directa de Leads",
    hook: "La táctica secreta que uso para agendar llamadas de fundadores calificados en menos de 10 minutos al día.",
    objective: "Ganchos Directos de Conversión. Genera un disparador directo al DM de forma no invasiva.",
    development: "1. No envíes mensajes no deseados.\n2. Simplemente sube un video corto mostrando un resultado inmediato.\n3. Dile a la audiencia que te comente una palabra clave si quiere un video explicativo de 5 minutos.",
    cta: "Comenta la palabra 'SPRINT' y mi bot de GrowthOS te enviará el link a tu bandeja."
  }
];

export const demoAudit: InstagramAudit = {
  bioScore: 75,
  contentScore: 60,
  conversionScore: 50,
  overallScore: 61,
  bioFeedback: "Tu bio es informativa pero carece de un disparador inmediato. La frase 'Te ayudo a escalar tu SaaS' es muy genérica. Cámbiala por: 'Llevo tu SaaS B2B a $10k MRR sin anuncios. Comenta SPRINT y te audito gratis 👇'. Tu enlace directo debe guiar a agendar o a un material sin fricciones.",
  contentFeedback: "Tus publicaciones muestran que sabes programar, pero no le hablan al dolor del cliente ideal B2B. Los posts actuales de 'detrás de cámara de código' interesan a otros programadores, no a tomadores de decisiones. Introduce el pilar de Autoridad publicando tus casos de estudio y el pilar de Conversión comentando la solución a sus dolores de captación.",
  actionPlan: [
    "Optimizar el título en negrita a: 'SaaSify Scale | Content Marketing B2B'.",
    "Publicar un carrusel mostrando el sprint de 30 días aplicando educación de conversión.",
    "Crear una publicación anclada (Pin Post) con un testimonio o caso de estudio claro."
  ]
};
