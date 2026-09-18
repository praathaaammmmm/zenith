type DemoEvent = {
  agent: string;
  status: "running" | "completed" | "workflow_completed";
  output?: Record<string, unknown>;
  knowledge_sources?: { title: string; source: string; category: string }[];
};

export function createDemoWorkflow(idea: string): DemoEvent[] {
  const concept = idea.trim() || "your startup idea";

  return [
    { agent: "Market Research Agent", status: "running" },
    { agent: "Market Research Agent", status: "completed", knowledge_sources: [
      { title: "Lean Startup Methodology", source: "Zenith knowledge base", category: "Framework" },
      { title: "SaaS Benchmarks 2026", source: "Zenith knowledge base", category: "Market report" },
    ], output: {
      market_overview: `${concept} sits in a growing market where teams are actively replacing fragmented, manual workflows with focused software and AI assistance. The best opening is a narrow first use case with a visible, repeatable outcome.`,
      industry_trends: ["AI-assisted workflows are becoming an expected product feature", "Buyers prefer focused tools that fit into their current stack", "Self-serve products win when value is visible in the first session"],
      opportunities: ["Own a specific painful workflow before expanding", "Turn repeat usage into a clear retention loop", "Package a premium tier around team collaboration and reporting"],
      risks: ["A vague audience weakens positioning", "Generic AI features are easy to copy", "Early acquisition can be costly without a focused channel"],
      market_size: "Start with a reachable niche rather than a broad TAM: the first goal is to prove repeated demand among a tightly defined buyer group.",
    } },
    { agent: "Competitor Agent", status: "running" },
    { agent: "Competitor Agent", status: "completed", output: {
      direct_competitors: [
        { name: "General AI assistants", type: "Direct", strengths: ["Familiar", "Low friction"], weaknesses: ["Generic outputs", "No workflow depth"], pricing: "Freemium", positioning_gap: `They do not provide a purpose-built workflow for ${concept}.` },
        { name: "Legacy specialist tools", type: "Direct", strengths: ["Established audience", "Deep feature sets"], weaknesses: ["Slow setup", "Complex interfaces"], pricing: "$50–$200 per user/month", positioning_gap: "A simpler, faster first-run experience is a meaningful opening." },
      ],
      indirect_competitors: [{ name: "Spreadsheets and manual research", type: "Indirect", strengths: ["Flexible", "Trusted"], weaknesses: ["Time intensive", "Hard to standardize"], pricing: "Internal time", positioning_gap: "Automate the repetitive synthesis without removing human judgment." }],
      overall_market_gaps: ["Faster time-to-value", "Opinionated workflows for one audience", "Clear evidence and exportable recommendations"],
    } },
    { agent: "ICP Agent", status: "running" },
    { agent: "ICP Agent", status: "completed", output: {
      primary_icp: { title: "Founder or product lead at an early-stage team", demographics: "Teams of 2–30 people building and validating new products", goals: ["Reduce research time", "Make better product bets"], frustrations: ["Too many disconnected sources", "Limited time to validate assumptions"], budget: "$50–$300/month", buying_behavior: "Will try a self-serve product when the result is immediate and shareable.", preferred_channels: ["Founder communities", "LinkedIn", "Product Hunt"] },
      secondary_icp: { title: "Independent strategist or small agency", demographics: "Consultants serving multiple startup clients", goals: ["Deliver stronger recommendations", "Standardize client work"], frustrations: ["Manual research is slow", "Reports are difficult to repeat"], budget: "$200–$700/month", buying_behavior: "Buys after seeing a credible sample output and export path.", preferred_channels: ["Referrals", "Niche newsletters", "Communities"] },
      target_market_summary: `Start with founders who need confidence around ${concept} before committing engineering time.`,
    } },
    { agent: "Persona Agent", status: "running" },
    { agent: "Persona Agent", status: "completed", output: { personas: [
      { id: "p1", name: "Maya", age: 31, occupation: "Solo founder", background: "Building her first B2B product after working in operations.", daily_workflow: "Interviews users, writes product specs, and ships small experiments.", goals: ["Validate demand quickly", "Avoid building the wrong thing"], pain_points: ["Research is scattered", "Limited time"], existing_tools: ["Notion", "ChatGPT", "Google Sheets"], budget: "$150/month", buying_behavior: "Tries products that show an answer within minutes." },
      { id: "p2", name: "Arjun", age: 38, occupation: "Product lead", background: "Leads a lean product team at a growing SaaS company.", daily_workflow: "Prioritizes roadmap decisions and turns research into alignment.", goals: ["Increase decision quality", "Keep the team focused"], pain_points: ["Slow synthesis", "Unclear evidence"], existing_tools: ["Linear", "Slack", "Figma"], budget: "$500/month", buying_behavior: "Needs a clear workflow and a result he can share with stakeholders." },
    ] } },
    { agent: "Interview Agent", status: "running" },
    { agent: "Interview Agent", status: "completed", output: { interviews: [
      { persona_id: "p1", persona_name: "Maya", persona_occupation: "Solo founder", would_buy: true, why_buy_or_not: "It would remove the blank-page problem when evaluating a new idea.", concerns: ["Accuracy", "Cost"], most_valued_feature: "A concise action plan", willingness_to_pay: "$49/month", convincing_factors: ["Free sample", "Exportable report"], quote: "If it gives me a useful starting point in ten minutes, I would use it every week." },
      { persona_id: "p2", persona_name: "Arjun", persona_occupation: "Product lead", would_buy: true, why_buy_or_not: "A shared evidence trail would make roadmap discussions faster.", concerns: ["Team adoption", "Integrations"], most_valued_feature: "Structured market and competitor view", willingness_to_pay: "$199/month", convincing_factors: ["Collaboration", "Source transparency"], quote: "I need outputs that help the team decide, not another generic summary." },
    ], summary: "The strongest signal is demand for fast, credible synthesis that turns uncertainty into an actionable next step." } },
    { agent: "Insight Agent", status: "running" },
    { agent: "Insight Agent", status: "completed", output: { top_pain_points: [{ theme: "Slow validation", frequency: "High", description: "Teams lose momentum while collecting and synthesizing evidence.", impact_level: "High" }, { theme: "Generic advice", frequency: "High", description: "Users want recommendations connected to their specific context.", impact_level: "High" }], common_objections: ["Can I trust the output?", "How is this different from a general AI tool?"], most_requested_features: ["Source-backed recommendations", "Report export", "Repeatable project workspaces"], pricing_insights: "A low-friction solo plan paired with a collaboration-focused team plan is a credible starting point.", buying_signals: ["Users ask for a shareable output", "Users value speed over exhaustive research"] } },
    { agent: "MVP Planner Agent", status: "running" },
    { agent: "MVP Planner Agent", status: "completed", output: { must_have: ["Guided idea input", "Structured validation report", "Source and assumption visibility"], should_have: ["Saved workspaces", "Export", "Competitor comparison"], future_features: ["Collaboration", "Live data integrations", "Custom frameworks"], technical_roadmap: ["Ship a focused workflow", "Measure completion and repeat usage", "Add integrations after retention signal"], suggested_milestones: ["Interview 10 target users", "Run 3 concierge validations", "Launch a narrow beta"] } },
    { agent: "Founder Report Agent", status: "running" },
    { agent: "Founder Report Agent", status: "completed", output: { executive_summary: `${concept} has promise when framed around one sharply defined user problem and a fast, trustworthy first result.`, market_analysis: "The opportunity is strongest where teams currently piece together research from disconnected tools.", competitor_landscape: "General AI is broad; legacy tools are heavy. Win on an opinionated workflow and visible outcome.", icp_summary: "Start with founders and lean product teams who are actively making high-stakes product decisions.", persona_highlights: "Maya wants speed; Arjun needs a result that aligns the team.", interview_highlights: "Both personas value credible synthesis, shareability, and a clear next action.", key_insights: "Focus matters more than feature volume in the first release.", pricing_suggestions: "Test $49/month for solo founders and $199/month for small teams.", mvp_roadmap: "Build the validation report loop first, then add persistence and collaboration after repeated use.", gtm_suggestions: ["Publish teardown-style examples", "Partner with founder communities", "Offer a sample report as the activation moment"], next_steps: ["Choose one user segment", "Run ten problem interviews", "Create a clickable prototype and test the report output"] } },
    { agent: "Founder Report Agent", status: "workflow_completed" },
  ];
}
