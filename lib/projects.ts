import type { Project } from "./types";

const GH = "https://github.com/aaronbarke";

/** Flagship work. One tile each on the home row. */
export const featuredProjects: Project[] = [
  {
    id: "fantasy-football-ai",
    title: "Fantasy Football AI",
    tagline: "An AI assistant that argues its picks with receipts.",
    summary:
      "A full-stack fantasy football assistant that connects to a live Sleeper or ESPN league and answers roster questions with real data behind every claim. Chat requests are classified by intent, routed through a context builder that assembles the exact stats the question needs, and handed to Claude as structured JSON, so the answer cites weekly production, matchup history and defense-vs-position splits instead of guessing.",
    stack: ["Next.js 14", "TypeScript", "Tailwind", "FastAPI", "Python", "PostgreSQL", "Redis"],
    features: [
      "Intent-classified AI chat grounded in injected league and player data",
      "Trade analyzer with a 0 to 100 value model: two-season blend, recency-weighted percentile by position",
      "Defense-vs-position matchup context threaded into every answer",
      "Line-shopping page that compares each sportsbook separately to surface pricing edges",
      "Player compare charts with range toggles, averages and bye-week gap handling",
    ],
    metrics: [
      { label: "Players indexed", value: "4,254" },
      { label: "Seasons of weekly stats", value: "2" },
      { label: "Data sources", value: "5" },
    ],
    links: [{ label: "View source", href: `${GH}/fantasy-football-ai`, primary: true }],
    art: { motif: "peaks", from: "#0f6f4c", to: "#04231a", monogram: "FF", accent: "#7fe0a8" },
  },
  {
    id: "uefn-maps",
    title: "Fortnite Maps (UEFN)",
    tagline: "Two years, two people, 1.2 million players.",
    summary:
      "Co-developed multiple published Fortnite maps with a two-person team in Unreal Editor for Fortnite, reaching over 1.2 million players in total. Game mechanics and interactive systems were written in Verse, and everything else was ours too: design iteration, playtesting, analytics, monetisation and creator-economy integration. It is the longest-running thing on this page, and the one that taught me most about shipping to an audience that does not care how the thing was built.",
    stack: ["Verse", "Unreal Editor for Fortnite", "Game design", "Analytics"],
    features: [
      "Multiple published maps built and maintained by a two-person team",
      "Game mechanics and interactive systems written in Verse",
      "Design iterated against playtesting and live retention analytics",
      "Monetisation and creator-economy integration managed end to end",
    ],
    metrics: [
      { label: "Total players", value: "1.2M+" },
      { label: "Active period", value: "Nov 2023 to Jun 2025" },
      { label: "Team size", value: "2" },
    ],
    links: [
      { label: "Fortnite Creative", href: "https://create.fortnite.com", primary: true },
    ],
    art: { motif: "storm", from: "#4c2f9e", to: "#150b36", monogram: "UE", accent: "#b39cff" },
  },
  {
    id: "scentscout",
    title: "ScentScout",
    tagline: "Price comparison that refuses to compare the wrong bottle.",
    summary:
      "A fragrance price-comparison product built around one hard invariant: an offer only counts if it is provably the same exact variant, meaning same concentration, same size, same presentation. Retail bottles, testers, refills and gift sets are never mixed. Prices are stored as append-only observations in integer cents, and a deterministic matcher decides what goes live while the language model is allowed to suggest only.",
    stack: ["Next.js 16", "TypeScript", "Supabase / Postgres", "Drizzle", "Zod", "Vitest", "Playwright"],
    features: [
      "Deterministic exact-variant matcher, where inferred matches queue for human review and never auto-approve",
      "Append-only price history with per-retailer chart series so coverage changes never read as price drops",
      "Delivered-price engine that only quotes a total when shipping and coupons are actually verifiable",
      "Retailer adapters that measure a site's conventions before trusting them, behind a strict boundary",
      "Admin review queue gated by a fail-closed allow-list enforced inside every server action",
    ],
    metrics: [
      { label: "Tests green", value: "222 + 9 E2E" },
      { label: "Catalog variants", value: "52" },
      { label: "Retailer adapters", value: "2 live" },
    ],
    links: [{ label: "View source", href: `${GH}/ScentScout`, primary: true }],
    art: { motif: "orbit", from: "#8a2f6b", to: "#2c0c22", monogram: "SS", accent: "#f0a6d4" },
  },
  {
    id: "patternedge-trader",
    title: "PatternEdge Trader",
    tagline: "Mine a pattern, prove it out of sample, then let it trade paper.",
    summary:
      "A multi-timeframe research, backtesting and paper-trading system for SPY and QQQ. Strategies are mined from rule search plus an ML pass, then have to survive walk-forward validation before they can be promoted. Promotion is manual at every step and there is deliberately no automated path to live money. The risk engine, kill switch and circuit breaker all sit between a signal and an order.",
    stack: ["FastAPI", "Python", "PostgreSQL", "SQLAlchemy 2.0", "APScheduler", "Next.js", "Docker"],
    features: [
      "research to backtested to paper to approved to live, a promotion pipeline with no automatic path to live",
      "Walk-forward validation gates that reject overfit candidates on out-of-sample evidence",
      "Circuit breaker reading equity straight from the broker, tripping on a 5% drawdown and persisting across restarts",
      "Paper trades mirrored to a broker paper account to measure real fills against the internal ledger",
      "Discord alerting for signals, fills, risk events and daily reports",
    ],
    metrics: [
      { label: "Paper book", value: "+14.65R" },
      { label: "Win rate", value: "11 / 17" },
      { label: "Candles ingested", value: "480k 1m" },
    ],
    privateSource: true,
    links: [],
    art: { motif: "bars", from: "#1f5fb8", to: "#071c3d", monogram: "PE", accent: "#8ec6ff" },
  },
  {
    id: "marketedge-terminal",
    title: "MarketEdge Terminal",
    tagline: "A 0 to 100 score for every prediction market, and an alert when it moves.",
    summary:
      "A prediction-market intelligence platform that continuously scans Polymarket, scores each market on an explainable 0 to 100 Interest Score, and pushes alerts when something is worth a look. A paper-trade tracker measures every alert across 1h, 6h, 24h and 7d horizons, and a backtester replays them with take-profit and stop-loss simulation so the scoring model can be judged on outcomes rather than vibes.",
    stack: ["FastAPI", "Python", "PostgreSQL", "Alembic", "APScheduler", "Next.js 14", "Recharts", "Docker"],
    features: [
      "Explainable 0 to 100 Interest Score with per-component attribution",
      "Alert engine with thresholds, cooldowns and Discord delivery",
      "Paper-trade tracker measuring every alert across four horizons",
      "Backtester with TP/SL exit simulation, MFE/MAE and an equity curve",
      "News scanner that tags alerts with the catalyst that likely moved the market",
    ],
    metrics: [
      { label: "Best-config profit factor", value: "2.29" },
      { label: "Scan cadence", value: "60s / 5m / 10m" },
      { label: "Alert horizons", value: "4" },
    ],
    privateSource: true,
    links: [],
    art: { motif: "wave", from: "#0e6f96", to: "#03222f", monogram: "ME", accent: "#7fd6f0" },
  },
];

/** Smaller builds and research labs, grouped so the main row stays focused. */
export const experimentProjects: Project[] = [
  {
    id: "quant-platform",
    title: "Quant Platform",
    tagline: "A framework whose main job is throwing strategies away.",
    summary:
      "A multi-strategy research and paper-trading framework built to test whole strategy families, reject the overfit ones on out-of-sample evidence, and allocate capital across whatever survives. It runs entirely offline on a synthetic data provider by default, and has been verified end to end against real market data. Live trading needs four separate environment switches plus a manual promotion, a gate that never gets loosened just to make something work.",
    stack: ["Python 3.13", "SQLAlchemy", "mypy --strict", "pytest", "Polygon API", "Docker"],
    features: [
      "Strategy-family research harness with out-of-sample validation gates",
      "Cross-strategy allocation layer instead of a single-signal bot",
      "Simulated broker plus a scheduled daily paper run that is safe to double-fire",
      "Offline-first synthetic data provider, so the whole system runs with no API key",
      "Live trading blocked behind four env switches and a manual promotion step",
    ],
    metrics: [
      { label: "Tests", value: "562" },
      { label: "Type checking", value: "mypy --strict clean" },
      { label: "Strategy families", value: "10 milestones" },
    ],
    privateSource: true,
    links: [],
    art: { motif: "grid", from: "#2a4a8f", to: "#0a1633", monogram: "QP", accent: "#9db8ff" },
  },
  {
    id: "polymarket-wallet-lab",
    title: "Polymarket Wallet Lab",
    tagline: "Copy-trading, paper only, zero dependencies.",
    summary:
      "A paper trading bot that watches profitable Polymarket wallets and simulates following them. Signals come from trade-proximity clustering across multiple wallets rather than any single wallet's conviction, fills are simulated against real order-book depth, and an anti-chasing premium guard refuses to enter after the move has already happened. Written against the Python standard library only, on purpose.",
    stack: ["Python 3.13", "stdlib only", "SQLite"],
    features: [
      "Multi-wallet convergence signal from trade-proximity clustering",
      "Depth-aware simulated fills instead of assuming the top of book",
      "Anti-chasing premium guard and a minimum entry price to avoid lottery tickets",
      "Exit engine covering resolution, copy-exit, take-profit and stop-loss",
      "Zero third-party dependencies, a deliberate constraint rather than an accident",
    ],
    privateSource: true,
    links: [],
    art: { motif: "scatter", from: "#a2521a", to: "#2c1206", monogram: "PW", accent: "#ffc48a" },
  },
  {
    id: "solana-wallet-lab",
    title: "Solana Wallet Lab",
    tagline: "Research that published its own negative result.",
    summary:
      "A research system for smart-wallet copy trading on Solana: backfill transactions, decode swaps, reconstruct positions, and score wallets on skill, copyability, integrity and specialisation. Backtesting is event-driven and deliberately includes tokens that died, because excluding them is how this kind of research lies to itself. Its first headline finding was that a friend-group cluster signal is negative, which got written up rather than buried.",
    stack: ["TypeScript", "Node", "SQLite", "Drizzle", "Helius RPC"],
    features: [
      "Wallet scoring across skill, copyability, integrity and specialisation",
      "Token safety engine with pre-entry gates and recorded rejections",
      "Event-driven backtesting that includes dead tokens",
      "Zero signing code in V1, research and paper only, by design",
    ],
    privateSource: true,
    links: [],
    art: { motif: "orbit", from: "#4a8f2f", to: "#152a0e", monogram: "SW", accent: "#bfe89a" },
  },
  {
    id: "prediction-market-analyzer",
    title: "Prediction Market Analyzer",
    tagline: "Same event, two venues, different price.",
    summary:
      "A cross-venue arbitrage scanner for prediction markets. The hard part is not the maths, it is deciding that a market on Polymarket and a market on Kalshi are the same real-world event. That is handled by a multi-pass matching pipeline that escalates from exact string match through canonicalisation and team-name resolution to fuzzy matching, with an LLM verification pass only at the end.",
    stack: ["Python", "SQLite", "Streamlit", "Pydantic"],
    features: [
      "Multi-pass matching pipeline, cheapest and most certain pass first",
      "LLM verification reserved for the ambiguous tail",
      "Live opportunity feed with analytics and monitor control",
    ],
    privateSource: true,
    links: [],
    art: { motif: "grid", from: "#7a2f8a", to: "#260c2c", monogram: "PM", accent: "#dda6f0" },
  },
  {
    id: "cooked",
    title: "Cooked",
    tagline: "Pantry in, dinner out.",
    summary:
      "A native iOS recipe app built around one loop: what is in the pantry, what can be cooked with it, and what the pantry looks like afterwards. Cook mode runs staged timers with audio cues, and recipe suggestions come from a provider-agnostic AI service that can be pointed at different backends or a mock for testing.",
    stack: ["Swift", "SwiftUI", "SwiftData", "AVFoundation", "MVVM"],
    features: [
      "Pantry-driven recipe suggestions that update stock after a cook",
      "Cook mode with staged timers and audio cues",
      "Provider-agnostic AI service with a mock backend for offline work",
      "Onboarding survey feeding skill level and dietary preferences",
    ],
    privateSource: true,
    links: [],
    art: { motif: "peaks", from: "#b3452a", to: "#2e0f08", monogram: "CK", accent: "#ffb59a" },
  },
  {
    id: "proplab",
    title: "PropLab",
    tagline: "Audited the strategy, then refused to run it.",
    summary:
      "A research lab for a funded-trader evaluation account. The first deliverable was an audit of a purchased expert advisor, which turned out to be a grid system that averages down with no stop loss. That is prohibited by the firm's own rules, so it was rejected outright rather than benchmarked. The research that followed established the real constraints: transaction costs rival the entire profit target, and a zero-edge strategy passes both evaluation phases 2.7% of the time, which is the null result everything else has to beat.",
    stack: ["Python", "MT4 / MQL4", "Monte Carlo simulation"],
    features: [
      "Full audit of a purchased EA, rejected on rule compliance rather than performance",
      "Monte Carlo baseline establishing the pass rate of a zero-edge strategy",
      "Cost modelling showing transaction costs are comparable to the profit target",
      "Finding that stop width dominates signal quality for pass probability",
    ],
    privateSource: true,
    links: [],
    art: { motif: "bars", from: "#1b6f6a", to: "#052624", monogram: "PL", accent: "#8ae0d8" },
  },
];

export const allProjects: Project[] = [...featuredProjects, ...experimentProjects];
