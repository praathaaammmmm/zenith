from typing import List, Dict, Any, Optional
from pydantic import BaseModel, Field

class ResearchOutput(BaseModel):
    market_overview: str = Field(..., description="High-level overview of the market domain")
    industry_trends: List[str] = Field(default_factory=list, description="Key industry trends driving this space")
    opportunities: List[str] = Field(default_factory=list, description="High-potential market opportunities")
    risks: List[str] = Field(default_factory=list, description="Key market and regulatory risks")
    market_size: str = Field(..., description="TAM / SAM / SOM estimation and market size commentary")

class Competitor(BaseModel):
    name: str = Field(..., description="Competitor name")
    type: str = Field(..., description="Direct or Indirect competitor")
    strengths: List[str] = Field(default_factory=list, description="Key strengths of competitor")
    weaknesses: List[str] = Field(default_factory=list, description="Key weaknesses or gaps")
    pricing: str = Field(..., description="Pricing model or cost structure")
    positioning_gap: str = Field(..., description="Strategic gap Zenith can exploit")

class CompetitorOutput(BaseModel):
    direct_competitors: List[Competitor] = Field(default_factory=list)
    indirect_competitors: List[Competitor] = Field(default_factory=list)
    overall_market_gaps: List[str] = Field(default_factory=list)

class ICPItem(BaseModel):
    title: str = Field(..., description="Name of profile e.g., Mid-Market CTO")
    demographics: str = Field(..., description="Target audience size, industry, company stage")
    goals: List[str] = Field(default_factory=list)
    frustrations: List[str] = Field(default_factory=list)
    budget: str = Field(..., description="Annual or monthly budget allocation")
    buying_behavior: str = Field(..., description="Decision making workflow & cycle length")
    preferred_channels: List[str] = Field(default_factory=list)

class ICPOutput(BaseModel):
    primary_icp: ICPItem
    secondary_icp: ICPItem
    target_market_summary: str

class Persona(BaseModel):
    id: str = Field(..., description="Unique persona identifier e.g., persona_1")
    name: str = Field(..., description="Realistic full name")
    age: int = Field(..., description="Age")
    occupation: str = Field(..., description="Job title and role")
    background: str = Field(..., description="Brief professional background")
    daily_workflow: str = Field(..., description="A day in their professional life")
    goals: List[str] = Field(default_factory=list)
    pain_points: List[str] = Field(default_factory=list)
    existing_tools: List[str] = Field(default_factory=list)
    budget: str = Field(..., description="Budget for software/solutions")
    buying_behavior: str = Field(..., description="How they make buying decisions")

class PersonaOutput(BaseModel):
    personas: List[Persona] = Field(default_factory=list)

class InterviewResponse(BaseModel):
    persona_id: str
    persona_name: str
    persona_occupation: str
    would_buy: bool
    why_buy_or_not: str
    concerns: List[str] = Field(default_factory=list)
    most_valued_feature: str
    willingness_to_pay: str
    convincing_factors: List[str] = Field(default_factory=list)
    quote: str = Field(..., description="Direct quote from the customer persona")

class InterviewOutput(BaseModel):
    interviews: List[InterviewResponse] = Field(default_factory=list)
    summary: str = Field(..., description="Overall takeaway across all customer interviews")

class InsightTheme(BaseModel):
    theme: str
    frequency: str
    description: str
    impact_level: str  # High / Medium / Low

class InsightOutput(BaseModel):
    top_pain_points: List[InsightTheme] = Field(default_factory=list)
    common_objections: List[str] = Field(default_factory=list)
    most_requested_features: List[str] = Field(default_factory=list)
    pricing_insights: str
    buying_signals: List[str] = Field(default_factory=list)

class MVPPlanOutput(BaseModel):
    must_have: List[str] = Field(default_factory=list, description="P0 core features required for MVP launch")
    should_have: List[str] = Field(default_factory=list, description="P1 important features for v1.1")
    future_features: List[str] = Field(default_factory=list, description="P2 post-validation expansion features")
    technical_roadmap: List[str] = Field(default_factory=list, description="Tech stack & backend/frontend milestones")
    suggested_milestones: List[str] = Field(default_factory=list, description="Timeline & key launch check-ins")

class FounderReportOutput(BaseModel):
    executive_summary: str
    market_analysis: str
    competitor_landscape: str
    icp_summary: str
    persona_highlights: str
    interview_highlights: str
    key_insights: str
    pricing_suggestions: str
    mvp_roadmap: str
    gtm_suggestions: List[str] = Field(default_factory=list)
    next_steps: List[str] = Field(default_factory=list)
