export interface BusinessProfile {
  businessName: string;
  industry: string;
  primaryProduct: string;
  avgPrice: string;
  idealCustomer: string;
  monthlyRevenueGoal: string;
  socialPlatforms: string[];
  audienceSize: string;
  availableHours: string;
}

export interface BusinessDiagnostic {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  bottlenecks: string[];
  marketingScore: number;
}

export interface ContentStrategy {
  recommendedPositioning: string;
  valueProposition: string;
  primaryMessage: string;
  differentiators: string[];
  objectives30Days: string[];
}

export interface Publication {
  day: number;
  theme: string;
  objective: string;
  format: string;
  cta: string;
}

export interface ContentIdea {
  hook: string;
  objective: string;
  development: string;
  cta: string;
  title: string;
}

export interface VideoScript {
  hook: string;
  problem: string;
  development: string;
  solution: string;
  cta: string;
  title: string;
}

export interface InstagramAudit {
  bioScore: number;
  contentScore: number;
  conversionScore: number;
  overallScore: number;
  bioFeedback: string;
  contentFeedback: string;
  actionPlan: string[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  timestamp: string;
}
