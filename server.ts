import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;

// Lazy instantiation of GoogleGenAI to prevent startup crashes when key is missing.
let aiClient: GoogleGenAI | null = null;

function getAIClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("La clave GEMINI_API_KEY no está configurada en la sección de Secretos de AI Studio.");
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Global middleware to handle errors gracefully
const asyncHandler = (fn: Function) => (req: express.Request, res: express.Response, next: express.NextFunction) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Error handling payload structure
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (res.headersSent) {
    return next(err);
  }
  console.error("Error en el servidor:", err);
  res.status(500).json({
    success: false,
    error: err.message || "Un error inesperado ocurrió en el servidor.",
  });
});

// SYSTEM PROMPT / BASIC CONTEXT FOR GROWTHOS AI
const SYSTEM_INSTRUCTION = `Eres GrowthOS AI, un Director de Marketing, Estratega de Contenido y Consultor de Crecimiento para emprendedores, marcas personales y negocios.
Tu objetivo principal es ayudar al usuario a generar más clientes, más autoridad y más ventas mediante una estrategia de contenido inteligente.

PRINCIPIOS:
1. Piensa siempre como un estratega antes que como un creador de contenido.
2. Nunca generes publicaciones aleatorias. Todo contenido debe estar conectado a un objetivo de negocio.
3. Prioriza ventas y generación de oportunidades sobre métricas de vanidad.
4. Si detectas problemas en la oferta, posicionamiento o mensaje del usuario, señálalos de forma estratégica y constructiva.
5. Tono claro, estratégico, profesional, accionable, orientado a resultados en español de negocios. No uses relleno innecesario.`;

/**
 * 1. Diagnóstico del negocio
 */
app.post("/api/diagnose", asyncHandler(async (req: express.Request, res: express.Response) => {
  const { profile } = req.body;
  if (!profile) {
    return res.status(400).json({ success: false, error: "Faltan los datos del perfil del negocio." });
  }

  const ai = getAIClient();
  const prompt = `Analiza detalladamente este negocio y genera un diagnóstico estratégico que identifique:
  - Fortalezas (strengths)
  - Debilidades (weaknesses)
  - Oportunidades de crecimiento (opportunities)
  - Cuellos de botella y problemas en la oferta o posicionamiento (bottlenecks)
  - Un puntaje general de marketing del 1 al 100 (marketingScore)

  Datos del negocio:
  Nombre: ${profile.businessName}
  Industria: ${profile.industry}
  Producto principal: ${profile.primaryProduct}
  Precio promedio: ${profile.avgPrice}
  Cliente ideal: ${profile.idealCustomer}
  Ingreso mensual deseado: ${profile.monthlyRevenueGoal}
  Plataformas sociales: ${profile.socialPlatforms?.join(", ")}
  Audiencia actual: ${profile.audienceSize}
  Horas disponibles para crear contenido: ${profile.availableHours}`;

  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash",
    contents: prompt,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          strengths: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Lista de fortalezas tácticas o de posicionamiento del negocio." },
          weaknesses: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Lista de debilidades de marketing u operativas." },
          opportunities: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Oportunidades clave de crecimiento orgánico y pago." },
          bottlenecks: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Cuellos de botella, problemas en la oferta o el mensaje actual." },
          marketingScore: { type: Type.INTEGER, description: "Puntaje del 1 al 100 de madurez de marketing." }
        },
        required: ["strengths", "weaknesses", "opportunities", "bottlenecks", "marketingScore"]
      }
    }
  });

  const text = response.text;
  if (!text) throw new Error("No se pudo obtener una respuesta del modelo.");
  res.json({ success: true, data: JSON.parse(text) });
}));

/**
 * 2. Estrategia de contenido
 */
app.post("/api/strategy", asyncHandler(async (req: express.Request, res: express.Response) => {
  const { profile, diagnostic } = req.body;
  if (!profile) {
    return res.status(400).json({ success: false, error: "Se requiere el perfil del negocio para generar la estrategia." });
  }

  const ai = getAIClient();
  const prompt = `Con base en el perfil del negocio y su diagnóstico de marketing, formula una estrategia de contenido de alta conversión y posicionamiento optimizado.

  Perfil:
  Nombre del negocio: ${profile.businessName}
  Industria: ${profile.industry}
  Producto principal: ${profile.primaryProduct}
  Precio promedio: ${profile.avgPrice}
  Cliente ideal: ${profile.idealCustomer}
  
  Diagnóstico previo (Marketing Score: ${diagnostic?.marketingScore || "No calculado"}):
  Fortalezas: ${diagnostic?.strengths?.join(", ") || "No dadas"}
  Oportunidades: ${diagnostic?.opportunities?.join(", ") || "No dadas"}`;

  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash",
    contents: prompt,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          recommendedPositioning: { type: Type.STRING, description: "Posicionamiento recomendado en el mercado." },
          valueProposition: { type: Type.STRING, description: "Propuesta de valor clara y convincente." },
          primaryMessage: { type: Type.STRING, description: "Mensaje principal que debe resonar en el cliente." },
          differentiators: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Diferenciadores clave con respecto a competidores." },
          objectives30Days: { type: Type.ARRAY, items: { type: Type.STRING }, description: "30-day business and content objectives." }
        },
        required: ["recommendedPositioning", "valueProposition", "primaryMessage", "differentiators", "objectives30Days"]
      }
    }
  });

  const text = response.text;
  if (!text) throw new Error("No se pudo obtener la respuesta estratégica del modelo.");
  res.json({ success: true, data: JSON.parse(text) });
}));

/**
 * 3. Calendario de publicaciones (30 días)
 */
app.post("/api/calendar", asyncHandler(async (req: express.Request, res: express.Response) => {
  const { profile, strategy } = req.body;
  if (!profile) {
    return res.status(400).json({ success: false, error: "Se requiere el perfil para estructurar el calendario." });
  }

  const ai = getAIClient();
  const prompt = `Genera un calendario de publicaciones mensual estratégico de 30 días organizados de forma equilibrada en los cuatro pilares:
  1. Autoridad: Demuestra conocimiento y estatus (casos de estudio, métricas, logros, certificaciones).
  2. Educación: Resuelven problemas específicos y eliminan objeciones de compra.
  3. Comunidad: Genera engagement y cercanía (historias, detrás de escena, opiniones controversiales).
  4. Conversión: Ventas directas, CTAs agresivos y promocionales.

  Parámetros del negocio:
  Nombre: ${profile.businessName}
  Nicho: ${profile.industry}
  Producto principal: ${profile.primaryProduct}
  Cliente Ideal: ${profile.idealCustomer}
  Mensaje estratégico: ${strategy?.primaryMessage || "Estrategia general de crecimiento"}
  Propuesta de Valor: ${strategy?.valueProposition || "Servicios premium"}

  El calendario debe incluir exactamente 15 o hasta 30 días de publicaciones estratégicas. Genera 15 publicaciones consecutivas de alto valor que cubran un período de 30 días (ej: Día 1, Día 3, Día 5 ... etc, o consecutivas de Día 1 a Día 15). Describe perfectamente el pilar, tema, objetivo, formato de publicación (ej. Carrusel, Reel, Video corto, Post, Newsletter, etc.) y una llamada a la acción (CTA) orientada a resultados empresariales.`;

  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash",
    contents: prompt,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          publications: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                day: { type: Type.INTEGER, description: "Número del día en el plan." },
                theme: { type: Type.STRING, description: "Título o tema estratégico de la publicación." },
                objective: { type: Type.STRING, description: "El objetivo de negocio detrás (Pilar: Autoridad, Educación, Comunidad o Conversión)." },
                format: { type: Type.STRING, description: "Formato recomendado (Reel, Carrusel, Historia, Hilo, Video Corto, Imagen, etc.)." },
                cta: { type: Type.STRING, description: "Llamada a la Acción (CTA) específica basada en ventas o captación de leads." }
              },
              required: ["day", "theme", "objective", "format", "cta"]
            }
          }
        },
        required: ["publications"]
      }
    }
  });

  const text = response.text;
  if (!text) throw new Error("No se pudo obtener el calendario.");
  res.json({ success: true, data: JSON.parse(text).publications });
}));

/**
 * 4. Banco de ideas
 */
app.post("/api/ideas", asyncHandler(async (req: express.Request, res: express.Response) => {
  const { profile, category, keyword } = req.body;
  if (!profile) {
    return res.status(400).json({ success: false, error: "Datos del perfil faltantes." });
  }

  const ai = getAIClient();
  const prompt = `Genera 4 ideas completas de publicaciones estratégicas basadas en el nicho del producto.
  Categoría deseada: ${category || "General de ventas o autoridad"}
  Palabra clave: ${keyword || "Estrategia clave"}

  Datos del negocio:
  Nicho: ${profile.industry}
  Producto: ${profile.primaryProduct}
  Cliente Ideal: ${profile.idealCustomer}

  Establece la siguiente estructura exacta para cada idea:
  - title (un título o categoría atractiva de la idea)
  - hook (un gancho llamativo e irresistible)
  - objective (objetivo estratégico de la publicación)
  - development (desarrollo, puntos clave, guías paso a paso o historia corta)
  - cta (llamado a la acción que invite a interactuar, enviar DM o agendar llamada)`;

  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash",
    contents: prompt,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          ideas: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                hook: { type: Type.STRING, description: "Gancho irresistible de la publicación" },
                objective: { type: Type.STRING, description: "Objetivo táctico (ej. autoridad, conversión)" },
                development: { type: Type.STRING, description: "Desarrollo estratégico resumido o guías paso a paso" },
                cta: { type: Type.STRING, description: "CTA contundente y enfocado en negocio" }
              },
              required: ["title", "hook", "objective", "development", "cta"]
            }
          }
        },
        required: ["ideas"]
      }
    }
  });

  const text = response.text;
  if (!text) throw new Error("No se pudieron generar ideas.");
  res.json({ success: true, data: JSON.parse(text).ideas });
}));

/**
 * 5. Generador de guiones estructurados
 */
app.post("/api/script", asyncHandler(async (req: express.Request, res: express.Response) => {
  const { profile, topic, desiredFormat } = req.body;
  if (!profile || !topic) {
    return res.status(400).json({ success: false, error: "Datos insuficientes para generar el guión." });
  }

  const ai = getAIClient();
  const prompt = `Genera un guión estructurado de video de alto impacto (formato: ${desiredFormat || "Reel / TikTok de 60 segundos"}) sobre el tema: "${topic}".
  Nicho del negocio: ${profile.industry}
  Producto representativo: ${profile.primaryProduct}
  Cliente ideal: ${profile.idealCustomer}

  Estructura obligatoria del guión:
  - hook: Un gancho irresistible en los primeros 3 segundos.
  - problem: Presentación del problema que agita los dolores del cliente ideal.
  - development: Desarrollo breve, interactivo y fácil de digerir.
  - solution: Presentación de tu solución/producto como el siguiente paso lógico.
  - cta: Un llamado a la acción enfocado a la conversión (ir al link, enviar DM con palabra clave, comentar para recibir material).`;

  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash",
    contents: prompt,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING, description: "Título que defina el guión." },
          hook: { type: Type.STRING },
          problem: { type: Type.STRING },
          development: { type: Type.STRING },
          solution: { type: Type.STRING },
          cta: { type: Type.STRING }
        },
        required: ["title", "hook", "problem", "development", "solution", "cta"]
      }
    }
  });

  const text = response.text;
  if (!text) throw new Error("No se pudo estructurar el guión.");
  res.json({ success: true, data: JSON.parse(text) });
}));

/**
 * 6. Auditoría de Instagram
 */
app.post("/api/audit", asyncHandler(async (req: express.Request, res: express.Response) => {
  const { profile, instagramBio, topPostsSummary, mainProblem } = req.body;
  if (!profile) {
    return res.status(400).json({ success: false, error: "Datos del perfil faltantes." });
  }

  const ai = getAIClient();
  const prompt = `Realiza una auditoría avanzada de Instagram centrada en negocios y conversión con base en los siguientes datos de la cuenta:
  Bio de Instagram: "${instagramBio || "No especificada"}"
  Resumen de publicaciones principales: "${topPostsSummary || "No especificado"}"
  Obstáculo principal: "${mainProblem || "Ninguno en específico"}"

  Perfil de negocio general:
  Nombre: ${profile.businessName}
  Industria: ${profile.industry}
  Cliente ideal del negocio: ${profile.idealCustomer}
  Producto estrella: ${profile.primaryProduct}

  Calcula tres puntajes específicos (de 1 a 100):
  - bioScore: Claridad, gancho, CTA en la bio y enlaces de conversión.
  - contentScore: Calidad, variedad de pilares, ganchos visuales.
  - conversionScore: Capacidad para vender por DM o redirigir al enlace de ventas.
  
  Determina un puntaje general (overallScore).
  
  Escribe comentarios accionables en español:
  - bioFeedback: Retroalimentación y opciones para optimizar la bio y el link de forma inmediata.
  - contentFeedback: Cuáles publicaciones cambiar o mejorar estructuralmente para capturar la atención de su nicho.
  - actionPlan: Plan de acción de 3 pasos numerados e inmediatos de aplicar. No incluyas relleno.`;

  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash",
    contents: prompt,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          bioScore: { type: Type.INTEGER },
          contentScore: { type: Type.INTEGER },
          conversionScore: { type: Type.INTEGER },
          overallScore: { type: Type.INTEGER },
          bioFeedback: { type: Type.STRING },
          contentFeedback: { type: Type.STRING },
          actionPlan: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        required: ["bioScore", "contentScore", "conversionScore", "overallScore", "bioFeedback", "contentFeedback", "actionPlan"]
      }
    }
  });

  const text = response.text;
  if (!text) throw new Error("No se pudo procesar la auditoría.");
  res.json({ success: true, data: JSON.parse(text) });
}));

/**
 * 7. Asistente diario / Chat
 */
app.post("/api/chat", asyncHandler(async (req: express.Request, res: express.Response) => {
  const { profile, strategy, message, history } = req.body;
  if (!message) {
    return res.status(400).json({ success: false, error: "El mensaje del usuario está vacío." });
  }

  const ai = getAIClient();

  // Reconstruct chat history and context
  const context = `Contexto del negocio actual:
  Nombre: ${profile?.businessName || "Sin registrar"}
  Industria: ${profile?.industry || "Sin registrar"}
  Producto o Servicio: ${profile?.primaryProduct || "Sin registrar"}
  Cliente Ideal: ${profile?.idealCustomer || "Sin registrar"}
  Mensaje de Marca principal: ${strategy?.primaryMessage || "Por definir"}
  Propuesta de Valor de Marca: ${strategy?.valueProposition || "Por definir"}
  
  Responde con un tono directo, accionable, profesional y altamente estratégico. Al responder preguntas o proponer ideas, usa estructuras concisas con HOOK, OBJETIVO, DESARROLLO, CTA cuando te pida ideas, y HOOK, PROBLEMA, DESARROLLO, SOLUCIÓN, CTA cuando te pida guiones.`;

  // Use the ai.models.generateContent containing the conversation context
  const fullPrompt = `${context}\n\nHistorial Reciente:\n${(history || []).map((h: any) => `${h.sender === "user" ? "Usuario" : "GrowthOS AI"}: ${h.content}`).join("\n")}\n\nUsuario: ${message}\n\nGrowthOS AI:`;

  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash",
    contents: fullPrompt,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
    }
  });

  const reply = response.text || "No logré estructurar una respuesta en este momento.";
  res.json({ success: true, content: reply });
}));


// Vite integration for dev vs production build
if (process.env.NODE_ENV !== "production") {
  createViteServer({
    server: { middlewareMode: true },
    appType: "spa",
  }).then((vite) => {
    app.use(vite.middlewares);
    
    // Fallback index.html serving
    app.use("*", (req, res, next) => {
      res.sendFile(path.join(process.cwd(), "index.html"));
    });

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server dev running on http://0.0.0.0:${PORT}`);
    });
  });
} else {
  const distPath = path.join(process.cwd(), "dist");
  app.use(express.static(distPath));
  app.get("*", (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server production running on port ${PORT}`);
  });
}
