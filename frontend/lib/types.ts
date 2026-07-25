export interface ResearchOutput {
  market_overview: string;
  industry_trends: string[];
  opportunities: string[];
  risks: string[];
  market_size: string;
}

export interface Competitor {
  name: string;
  type: string;
  strengths: string[];
  weaknesses: string[];
  pricing: string;
  positioning_gap: string;
}

export interface CompetitorOutput {
  direct_competitors: Competitor[];
  indirect_competitors: Competitor[];
  overall_market_gaps: string[];
}

export interface ICPItem {
  title: string;
  demographics: string;
  goals: string[];
  frustrations: string[];
  budget: string;
  buying_behavior: string;
  preferred_channels: string[];
}

export interface ICPOutput {
  primary_icp: ICPItem;
  secondary_icp: ICPItem;
  target_market_summary: string;
}

export interface Persona {
  id: string;
  name: string;
  age: number;
  occupation: string;
  background: string;
  daily_workflow: string;
  goals: string[];
  pain_points: string[];
  existing_tools: string[];
  budget: string;
  buying_behavior: string;
}

export interface PersonaOutput {
  personas: Persona[];
}

export interface InterviewResponse {
  persona_id: string;
  persona_name: string;
  persona_occupation: string;
  would_buy: boolean;
  why_buy_or_not: string;
  concerns: string[];
  most_valued_feature: string;
  willingness_to_pay: string;
  convincing_factors: string[];
  quote: string;
}

export interface InterviewOutput {
  interviews: InterviewResponse[];
  summary: string;
}

export interface InsightTheme {
  theme: string;
  frequency: string;
  description: string;
  impact_level: string;
}

export interface InsightOutput {
  top_pain_points: InsightTheme[];
  common_objections: string[];
  most_requested_features: string[];
  pricing_insights: string;
  buying_signals: string[];
}

export interface MVPPlanOutput {
  must_have: string[];
  should_have: string[];
  future_features: string[];
  technical_roadmap: string[];
  suggested_milestones: string[];
}

export interface FounderReportOutput {
  executive_summary: string;
  market_analysis: string;
  competitor_landscape: string;
  icp_summary: string;
  persona_highlights: string;
  interview_highlights: string;
  key_insights: string;
  pricing_suggestions: string;
  mvp_roadmap: string;
  gtm_suggestions: string[];
  next_steps: string[];
}

export interface KnowledgeSource {
  title: string;
  source: string;
  category: string;
}

export interface AgentStepStatus {
  id: string;
  name: string;
  label: string;
  status: 'idle' | 'running' | 'completed' | 'error';
  message?: string;
}

export interface OrchestratorState {
  sessionId: string | null;
  idea: string;
  isProcessing: boolean;
  currentAgent: string | null;
  progressPercent: number;
  steps: AgentStepStatus[];
  knowledgeSources: KnowledgeSource[];
  research: ResearchOutput | null;
  competitors: CompetitorOutput | null;
  icp: ICPOutput | null;
  personas: PersonaOutput | null;
  interviews: InterviewOutput | null;
  insights: InsightOutput | null;
  mvpPlan: MVPPlanOutput | null;
  report: FounderReportOutput | null;
  error: string | null;
}
