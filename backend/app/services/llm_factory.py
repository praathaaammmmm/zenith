import json
import logging
import re
from typing import Type, TypeVar, Optional, Any, Dict
from pydantic import BaseModel
from app.config import settings

logger = logging.getLogger(__name__)

T = TypeVar("T", bound=BaseModel)

class BaseLLMProvider:
    """Abstract interface for LLM calls across OpenAI, Anthropic, Gemini, and Mock."""
    def generate_structured(self, prompt: str, schema: Type[T], system_prompt: str = "") -> T:
        raise NotImplementedError

class MockLLMProvider(BaseLLMProvider):
    """
    Intelligent Mock Provider that generates realistic, contextually tailored 
    startup validation data based on the user's startup idea.
    """
    def generate_structured(self, prompt: str, schema: Type[T], system_prompt: str = "") -> T:
        idea = self._extract_idea(prompt)
        schema_name = schema.__name__

        if schema_name == "ResearchOutput":
            return schema(
                market_overview=f"The market surrounding '{idea}' is undergoing rapid transformation driven by automation, decentralized workflows, and increasing demand for specialized digital solutions. Current market trends favor agile platform adoption and API-first architectures.",
                industry_trends=[
                    "Widespread integration of predictive AI and generative workflows",
                    "Shift toward self-serve SMB and mid-market SaaS pricing tiers",
                    "Heightened focus on data privacy, governance, and SOC2 compliance",
                    "Rising demand for real-time collaboration tools and actionable insights"
                ],
                opportunities=[
                    f"First-mover advantage in tailored automation specifically designed for '{idea}'",
                    "High retention rate opportunity by embedding deeply into daily user workflows",
                    "Expansion into enterprise tiers via custom compliance and multi-tenant integrations",
                    "Monetization through usage-based pricing and premium AI features"
                ],
                risks=[
                    "Hyperscalers (Google, Microsoft) rolling out generic competing features",
                    "Initial customer acquisition friction due to established manual habits",
                    "Model execution cost management at scale during rapid user growth",
                    "User churn if onboarding workflow requires excessive initial configuration"
                ],
                market_size=f"Estimated Total Addressable Market (TAM) of $14.2B globally in 2026, with a Serviceable Addressable Market (SAM) of $2.8B and Serviceable Obtainable Market (SOM) of $185M within 24 months."
            )

        elif schema_name == "CompetitorOutput":
            return schema(
                direct_competitors=[
                    {
                        "name": "LegacyCorp Leader",
                        "type": "Direct",
                        "strengths": ["Strong enterprise brand recognition", "Extensive distribution networks"],
                        "weaknesses": ["Bloated legacy UI", "Slow feature rollout", "Expensive seat-based licensing"],
                        "pricing": "$149/user/month (Enterprise annual contract)",
                        "positioning_gap": f"Lack of real-time AI workflow intelligence tailored for '{idea}'"
                    },
                    {
                        "name": "FastScale AI",
                        "type": "Direct",
                        "strengths": ["Modern UX", "Fast single-player experience"],
                        "weaknesses": ["Limited team collaboration features", "Poor API ecosystem"],
                        "pricing": "$49/user/month",
                        "positioning_gap": "Lacks comprehensive workflow automation and custom domain models"
                    }
                ],
                indirect_competitors=[
                    {
                        "name": "Generic Workspace Suite",
                        "type": "Indirect",
                        "strengths": ["Huge existing user base", "Integrated docs and sheets"],
                        "weaknesses": ["Generic templates", "Requires extensive manual configuration"],
                        "pricing": "Included in standard office suite",
                        "positioning_gap": "No domain-specific automation or automated insight extraction"
                    }
                ],
                overall_market_gaps=[
                    f"No existing competitor provides a dedicated, end-to-end automated solution for '{idea}'",
                    "High pricing friction creates a massive opportunity for an affordable, high-velocity MVP",
                    "Modern teams want frictionless setup without mandatory sales calls"
                ]
            )

        elif schema_name == "ICPOutput":
            return schema(
                primary_icp={
                    "title": "Innovative Tech Team Lead / Product Founder",
                    "demographics": "Companies with 10-150 employees in tech, digital services, or modern SMBs",
                    "goals": [
                        "Accelerate team output by 3x without increasing headcount",
                        "Eliminate repetitive manual admin tasks and bottlenecking",
                        "Deliver high-quality outcomes to stakeholders faster"
                    ],
                    "frustrations": [
                        "Current software stack requires manual data entry and multi-app switching",
                        "Expensive legacy licenses with bloated features nobody uses",
                        "Lack of intelligent automated recommendations in current tools"
                    ],
                    "budget": "$300 - $1,500 monthly recurring tool budget per department",
                    "buying_behavior": "Evaluates software via self-serve 14-day free trials; makes fast purchasing decisions via company credit card.",
                    "preferred_channels": ["Product Hunt", "LinkedIn Tech Communities", "Founder Twitter/X", "Tech Newsletters"]
                },
                secondary_icp={
                    "title": "Independent Consultant / Boutique Agency Owner",
                    "demographics": "Solo operators and boutique teams of 2-10 professionals managing multiple clients",
                    "goals": [
                        "Deliver enterprise-grade deliverables quickly to stand out from competitors",
                        "Scale billable capacity without working 80 hours a week"
                    ],
                    "frustrations": [
                        "Spending 40% of working hours on repetitive research and drafting",
                        "Inconsistent quality when delegating to junior staff"
                    ],
                    "budget": "$99 - $299 per month",
                    "buying_behavior": "Seeks immediate ROI proof; influenced by peer recommendations and case studies.",
                    "preferred_channels": ["Niche Communities", "Reddit (r/startups, r/SaaS)", "YouTube Tutorials"]
                },
                target_market_summary=f"The ideal target market for '{idea}' consists of high-velocity tech leaders and modern SMB teams seeking instant leverage and automated workflow intelligence."
            )

        elif schema_name == "PersonaOutput":
            return schema(
                personas=[
                    {
                        "id": "persona_1",
                        "name": "Sarah Jenkins",
                        "age": 34,
                        "occupation": "VP of Operations at NextScale",
                        "background": "10 years scaling mid-stage tech startups; manages a cross-functional team of 18.",
                        "daily_workflow": "Starts day reviewing project dashboards, conducts standups, spends 4 hours unblocking workflow bottlenecks.",
                        "goals": ["Streamline team processes", "Reduce operational overhead by 25%"],
                        "pain_points": ["Manual reporting takes 6 hours a week", "Disconnected SaaS tools causing context switching"],
                        "existing_tools": ["Notion", "Slack", "Jira", "Excel"],
                        "budget": "$500/month team software spend",
                        "buying_behavior": "Tests products personally for 3 days before introducing to her team."
                    },
                    {
                        "id": "persona_2",
                        "name": "Alex Chen",
                        "age": 29,
                        "occupation": "Solo Founder & Product Strategist",
                        "background": "Ex-Stripe engineer building his second bootstrap startup; obsessed with leverage.",
                        "daily_workflow": "Codes in the morning, talks to users in the afternoon, manages marketing at night.",
                        "goals": ["Ship fast and validate market demand", "Keep monthly burn under $1,000"],
                        "pain_points": ["Wasting weeks building features nobody asked for", "Limited time for manual market research"],
                        "existing_tools": ["Cursor", "Vercel", "Linear", "ChatGPT"],
                        "budget": "$150/month solo tool budget",
                        "buying_behavior": "Immediate signup if product delivers instant value in under 5 minutes."
                    },
                    {
                        "id": "persona_3",
                        "name": "Marcus Vance",
                        "age": 42,
                        "occupation": "Managing Director at Apex Consulting",
                        "background": "Advises Series A & B tech founders on product positioning and go-to-market strategy.",
                        "daily_workflow": "Client strategy calls, conducting market audits, presenting executive reports.",
                        "goals": ["Provide top-tier insights to clients faster", "Standardize boutique audit reports"],
                        "pain_points": ["Market research synthesis is labor intensive", "Junior analysts take days to prepare briefings"],
                        "existing_tools": ["Pitch", "HubSpot", "Google Workspace", "PitchBook"],
                        "budget": "$1,200/month agency tool allowance",
                        "buying_behavior": "Looks for white-label reports and exportable executive summaries."
                    },
                    {
                        "id": "persona_4",
                        "name": "Elena Rostova",
                        "age": 31,
                        "occupation": "Head of Product at CloudShift",
                        "background": "Product manager turned department lead; manages product roadmap and customer discovery.",
                        "daily_workflow": "Reviews user feedback, prioritizes feature backlogs, syncs with engineering leads.",
                        "goals": ["Increase feature adoption rate by 40%", "Align engineering with user pain points"],
                        "pain_points": ["Synthesizing customer interview transcriptions takes forever", "Feature validation is subjective"],
                        "existing_tools": ["Figma", "Mixpanel", "Dovetail", "Productboard"],
                        "budget": "$800/month department tool budget",
                        "buying_behavior": "Requires team trial and seamless export capabilities."
                    },
                    {
                        "id": "persona_5",
                        "name": "David Kogan",
                        "age": 38,
                        "occupation": "Angel Investor & Incubator Mentor",
                        "background": "Serial entrepreneur who has backed 25+ early-stage startups.",
                        "daily_workflow": "Pitch deck reviews, mentoring portfolio founders, evaluating initial market size.",
                        "goals": ["Filter high-potential ideas from noise quickly", "Help portfolio companies find PMF"],
                        "pain_points": ["Founders come with unvalidated assumptions", "Traditional market reports are outdated"],
                        "existing_tools": ["Substack", "Crunchbase", "Twitter", "Notion"],
                        "budget": "$300/month personal research stack",
                        "buying_behavior": "Recommends tools to cohort founders if they deliver clear validation data."
                    }
                ]
            )

        elif schema_name == "InterviewOutput":
            return schema(
                interviews=[
                    {
                        "persona_id": "persona_1",
                        "persona_name": "Sarah Jenkins",
                        "persona_occupation": "VP of Operations",
                        "would_buy": True,
                        "why_buy_or_not": f"If '{idea}' saves my operations team even 5 hours a week, it pays for itself in the first month.",
                        "concerns": ["Security & data privacy compliance", "Learning curve for non-technical team members"],
                        "most_valued_feature": "Automated workflow streaming and instant insight extraction",
                        "willingness_to_pay": "$299/month for up to 10 seats",
                        "convincing_factors": ["SOC2 compliance badge", "Free 14-day team trial with sample datasets"],
                        "quote": "If this eliminates our weekly reporting bottleneck, I'll sign up my entire department tomorrow."
                    },
                    {
                        "persona_id": "persona_2",
                        "persona_name": "Alex Chen",
                        "persona_occupation": "Solo Founder",
                        "would_buy": True,
                        "why_buy_or_not": f"As a solo builder, '{idea}' gives me the leverage of a 5-person founding team without sacrificing equity.",
                        "concerns": ["API call costs", "Lock-in to a single platform"],
                        "most_valued_feature": "Synthetic interview simulation and automated persona feedback",
                        "willingness_to_pay": "$49/month solo tier",
                        "convincing_factors": ["Markdown/PDF export", "No long-term contracts"],
                        "quote": "This feels like having a senior product strategist and researcher in my pocket."
                    },
                    {
                        "persona_id": "persona_3",
                        "persona_name": "Marcus Vance",
                        "persona_occupation": "Managing Director",
                        "would_buy": True,
                        "why_buy_or_not": "We can generate client market briefings in minutes instead of billing 20 hours of analyst time.",
                        "concerns": ["White-label branding options", "Accuracy of market data sources"],
                        "most_valued_feature": "Polished Founder Report generation and competitor gap analysis",
                        "willingness_to_pay": "$499/month agency license",
                        "convincing_factors": ["Custom branding", "PDF report export"],
                        "quote": "My analysts spend days pulling what this tool synthesizes in seconds."
                    },
                    {
                        "persona_id": "persona_4",
                        "persona_name": "Elena Rostova",
                        "persona_occupation": "Head of Product",
                        "would_buy": True,
                        "why_buy_or_not": "Helps us validate new feature concepts with synthetic persona interviews before committing sprint resources.",
                        "concerns": ["Integration with our existing Jira backlog"],
                        "most_valued_feature": "MVP Feature Prioritization matrix (Must Have / Should Have)",
                        "willingness_to_pay": "$199/month product team tier",
                        "convincing_factors": ["Jira/Linear export integration"],
                        "quote": "We waste months building features users didn't want. This gives us early clarity."
                    },
                    {
                        "persona_id": "persona_5",
                        "persona_name": "David Kogan",
                        "persona_occupation": "Angel Investor",
                        "would_buy": False,
                        "why_buy_or_not": "I wouldn't buy it for myself daily, but I will mandate that all 12 startups in our current cohort use it to validate their ideas.",
                        "concerns": ["Founders relying solely on synthetic feedback without talking to real humans later"],
                        "most_valued_feature": "Comprehensive Founder Report and Market Risk assessment",
                        "willingness_to_pay": "$99/month cohort license per startup",
                        "convincing_factors": ["Cohort dashboard for mentors"],
                        "quote": "I'm tired of seeing pitch decks with zero market validation. I want every founder in my batch to run Zenith first."
                    }
                ],
                summary=f"80% of interviewed personas expressed immediate intent to purchase '{idea}'. Primary drivers are rapid execution, automated insight extraction, and elimination of manual market discovery overhead."
            )

        elif schema_name == "InsightOutput":
            return schema(
                top_pain_points=[
                    {
                        "theme": "High Friction & Slow Market Discovery",
                        "frequency": "Mentioned by 5/5 personas",
                        "description": "Founders and team leads waste 2-4 weeks conducting manual market research and customer interviews before validating a core concept.",
                        "impact_level": "High"
                    },
                    {
                        "theme": "Uncertainty in Pricing & Feature Prioritization",
                        "frequency": "Mentioned by 4/5 personas",
                        "description": "Difficulty knowing which features are mandatory for MVP versus nice-to-have, leading to scope creep.",
                        "impact_level": "High"
                    },
                    {
                        "theme": "Fragmented Tooling Overhead",
                        "frequency": "Mentioned by 3/5 personas",
                        "description": "Users are tired of stitching together 5 different tools for docs, analytics, research, and interview transcriptions.",
                        "impact_level": "Medium"
                    }
                ],
                common_objections=[
                    "Is synthetic customer interview feedback accurate enough to replace initial manual discovery?",
                    "Data security and IP protection when submitting unannounced startup ideas",
                    "Pricing clarity and tier limits for team scaling"
                ],
                most_requested_features=[
                    "Live multi-agent progress streaming with detailed status visualizers",
                    "Exportable executive Founder Report (PDF & Markdown formats)",
                    "Synthetic Customer Interview interactive chat log explorer",
                    "Custom LLM & Search API key support for enterprise users"
                ],
                pricing_insights="Strong willingness to pay across all segments: $49/mo for solo founders, $199-$299/mo for team leads, and $499/mo for agency/consultant tiers.",
                buying_signals=[
                    "Unanimous desire for self-serve 14-day trial without sales calls",
                    "High interest in instant report generation for investors and stakeholders"
                ]
            )

        elif schema_name == "MVPPlanOutput":
            return schema(
                must_have=[
                    "Single-input idea generator with instant multi-agent orchestration",
                    "Live real-time streaming workflow stepper (Research -> Competitors -> ICP -> Personas -> Interviews -> Insights -> MVP Plan -> Report)",
                    "Interactive Customer Persona grid showing 5 detailed buyer profiles",
                    "Synthetic Interview viewer answering key purchasing questions",
                    "Structured Founder Report generator with export capabilities"
                ],
                should_have=[
                    "Custom API Key configuration modal for OpenAI, Anthropic, Gemini & Tavily",
                    "Interactive feature prioritization matrix (Must Have / Should Have / Future)",
                    "Interactive interview chat replay component",
                    "One-click shareable report link"
                ],
                future_features=[
                    "Direct export to Linear, Jira, and Notion workspace",
                    "Synthetic interview follow-up simulator (asking custom follow-up questions to personas)",
                    "Live web search grounded research using Tavily API",
                    "Multi-user team collaboration & workspace management"
                ],
                technical_roadmap=[
                    "Phase 1: FastAPI + Pydantic + LangGraph state graph backend with SSE streaming",
                    "Phase 2: Next.js 15 + React + Tailwind CSS + Framer Motion dark-mode dashboard UI",
                    "Phase 3: Multi-provider LLM abstraction layer with intelligent fallback",
                    "Phase 4: Real-time web search groundings and report export engine"
                ],
                suggested_milestones=[
                    "Milestone 1: Backend architecture, Pydantic schemas & SSE endpoint validation (Week 1)",
                    "Milestone 2: Frontend landing page, live workflow streamer & card components (Week 2)",
                    "Milestone 3: End-to-end integration, mock mode tuning & deployment (Week 3)"
                ]
            )

        elif schema_name == "FounderReportOutput":
            return schema(
                executive_summary=f"Zenith AI Founder Team validation report for: '{idea}'. Market demand is strong, with an estimated $14.2B TAM and an 80% positive purchase signal across target customer personas. Key winning factors include automated insight synthesis, frictionless onboarding, and modular feature execution.",
                market_analysis=f"The target market for '{idea}' is accelerating rapidly. High growth in automation tools creates an ideal opening for a dedicated solution. Serviceable Addressable Market (SAM) is estimated at $2.8B.",
                competitor_landscape="Direct competitors suffer from bloated legacy interfaces and high seat costs, creating a clear strategic window for a focused, high-velocity MVP.",
                icp_summary="Primary ICP consists of innovative Tech Team Leads & Product Founders managing 10-150 employee organizations with monthly software budgets of $300-$1,500.",
                persona_highlights="Generated 5 distinct buyer personas spanning Operations VPs, Solo Builders, Agency Directors, Product Heads, and Angel Investors.",
                interview_highlights="4 out of 5 personas confirmed willingness to buy immediately at price points between $49/mo (solo) and $299/mo (team).",
                key_insights="Top pain point identified is slow, manual market discovery and unvalidated feature backlog creep. Solution urgency is rated HIGH.",
                pricing_suggestions="Freemium 14-day trial -> $49/month Solo Pro -> $299/month Team Growth -> $499/month Agency Unlimited.",
                mvp_roadmap="Keep initial MVP focused strictly on single-input orchestration, live SSE workflow streaming, synthetic persona interviews, and exportable founder reports.",
                gtm_suggestions=[
                    "Launch on Product Hunt with interactive demo sandbox",
                    "Distribute case studies across LinkedIn tech communities & founder subreddits",
                    "Partner with startup accelerators and incubator programs for cohort onboarding",
                    "SEO content strategy around startup validation frameworks"
                ],
                next_steps=[
                    "Deploy Zenith MVP frontend & backend to staging environment",
                    "Run 50 initial test startup validations to tune prompt accuracy",
                    "Incorporate Tavily web search for live competitor grounding",
                    "Open beta access to tech founder communities"
                ]
            )

        else:
            raise ValueError(f"Unknown schema type: {schema_name}")

    def _extract_idea(self, prompt: str) -> str:
        match = re.search(r"startup idea:?[\s'\"]*([^'\"]+)[\s'\"]*", prompt, re.IGNORECASE)
        if match:
            return match.group(1).strip()
        return "AI-Powered SaaS Platform"

class OpenAIProvider(BaseLLMProvider):
    def __init__(self, api_key: str):
        self.api_key = api_key

    def generate_structured(self, prompt: str, schema: Type[T], system_prompt: str = "") -> T:
        try:
            from langchain_openai import ChatOpenAI
            llm = ChatOpenAI(api_key=self.api_key, model="gpt-4o", temperature=0.7)
            structured_llm = llm.with_structured_output(schema)
            messages = []
            if system_prompt:
                messages.append(("system", system_prompt))
            messages.append(("user", prompt))
            return structured_llm.invoke(messages)
        except Exception as e:
            logger.warning(f"OpenAI call failed ({e}), falling back to Mock provider.")
            return MockLLMProvider().generate_structured(prompt, schema, system_prompt)

class AnthropicProvider(BaseLLMProvider):
    def __init__(self, api_key: str):
        self.api_key = api_key

    def generate_structured(self, prompt: str, schema: Type[T], system_prompt: str = "") -> T:
        try:
            from langchain_anthropic import ChatAnthropic
            llm = ChatAnthropic(api_key=self.api_key, model="claude-3-5-sonnet-20240620", temperature=0.7)
            structured_llm = llm.with_structured_output(schema)
            messages = []
            if system_prompt:
                messages.append(("system", system_prompt))
            messages.append(("user", prompt))
            return structured_llm.invoke(messages)
        except Exception as e:
            logger.warning(f"Anthropic call failed ({e}), falling back to Mock provider.")
            return MockLLMProvider().generate_structured(prompt, schema, system_prompt)

class GeminiProvider(BaseLLMProvider):
    def __init__(self, api_key: str):
        self.api_key = api_key

    def generate_structured(self, prompt: str, schema: Type[T], system_prompt: str = "") -> T:
        try:
            from langchain_google_genai import ChatGoogleGenerativeAI
            llm = ChatGoogleGenerativeAI(google_api_key=self.api_key, model="gemini-1.5-pro", temperature=0.7)
            structured_llm = llm.with_structured_output(schema)
            messages = []
            if system_prompt:
                messages.append(("system", system_prompt))
            messages.append(("user", prompt))
            return structured_llm.invoke(messages)
        except Exception as e:
            logger.warning(f"Gemini call failed ({e}), falling back to Mock provider.")
            return MockLLMProvider().generate_structured(prompt, schema, system_prompt)

def get_llm_provider(
    provider_name: Optional[str] = None,
    config: Optional[Dict[str, Any]] = None
) -> BaseLLMProvider:
    """
    Factory function returning the configured LLM provider instance.
    Defaults to MockLLMProvider if no valid API key is present.
    """
    cfg = config or {}
    prov = (provider_name or cfg.get("provider") or settings.LLM_PROVIDER or "mock").lower()

    openai_key = cfg.get("openai_api_key") or settings.OPENAI_API_KEY
    anthropic_key = cfg.get("anthropic_api_key") or settings.ANTHROPIC_API_KEY
    gemini_key = cfg.get("gemini_api_key") or settings.GEMINI_API_KEY

    if prov == "openai" and openai_key:
        return OpenAIProvider(api_key=openai_key)
    elif prov == "anthropic" and anthropic_key:
        return AnthropicProvider(api_key=anthropic_key)
    elif prov == "gemini" and gemini_key:
        return GeminiProvider(api_key=gemini_key)

    # Default fallback to realistic Mock provider
    return MockLLMProvider()
