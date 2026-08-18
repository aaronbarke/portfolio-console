import type { Project, Tile } from "./types";

const GH = "https://github.com/aaronbarke";

/** Flagship work — one tile each on the home row. */
export const featuredProjects: Project[] = [
  {
    id: "fantasy-football-ai",
    title: "Fantasy Football AI",
    tagline: "An AI assistant that argues its picks with receipts.",
    summary:
      "A full-stack fantasy football assistant that connects to a live Sleeper or ESPN league and answers roster questions with real data behind every claim. Chat requests are classified by intent, routed through a context builder that assembles the exact stats the question needs, and handed to Claude as structured JSON — so the answer cites weekly production, matchup history and defense-vs-position splits instead of guessing.",
    stack: ["Next.js 14", "TypeScript", "Tailwind", "FastAPI", "Python", "PostgreSQL", "Redis"],
    features: [
      "Intent-classified AI chat grounded in injected league and player data",
      "Trade analyzer with a 0–100 value model: two-season blend, recency-weighted percentile by position",
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
    art: { motif: "peaks", from: "#0f4c81", to: "#0a1f38", monogram: "FF" },
  },
  {
    id: "scentscout",
    title: "ScentScout",
    tagline: "Price comparison that refuses to compare the wrong bottle.",
    summary:
      "A fragrance price-comparison product built around one hard invariant: an offer only counts if it is provably the same exact variant — same concentration, same size, same presentation. Retail bottles, testers, refills and gift sets are never mixed. Prices are stored as append-only observations in integer cents, and a deterministic matcher decides what goes live while the language model is allowed to suggest only.",
    stack: ["Next.js 16", "TypeScript", "Supabase / Postgres", "Drizzle", "Zod", "Vitest", "Playwright"],
    features: [
      "Deterministic exact-variant matcher — inferred matches queue for human review, never auto-approve",
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
    art: { motif: "orbit", from: "#1b3b6f", to: "#08182c", monogram: "SS" },
  },
  {
    id: "patternedge-trader",
    title: "PatternEdge Trader",
    tagline: "Mine a pattern, prove it out of sample, then let it trade paper.",
    summary:
      "A multi-timeframe research, backtesting and paper-trading system for SPY and QQQ. Strategies are mined from rule search plus an ML pass, then have to survive walk-forward validation before they can be promoted. Promotion is manual at every step and there is deliberately no automated path to live money — the risk engine, kill switch and circuit breaker sit between a signal and an order.",
    stack: ["FastAPI", "Python", "PostgreSQL", "SQLAlchemy 2.0", "APScheduler", "Next.js", "Docker"],
    features: [
      "research → backtested → paper → approved → live promotion pipeline with no auto-live transition",
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
    art: { motif: "bars", from: "#12507a", to: "#061726", monogram: "PE" },
  },
  {
    id: "marketedge-terminal",
    title: "MarketEdge Terminal",
    tagline: "A 0–100 score for every prediction market, and an alert when it moves.",
    summary:
      "A prediction-market intelligence platform that continuously scans Polymarket, scores each market on an explainable 0–100 Interest Score, and pushes alerts when something is worth a look. A paper-trade tracker measures every alert across 1h / 6h / 24h / 7d horizons, and a backtester replays them with take-profit and stop-loss simulation so the scoring model can be judged on outcomes rather than vibes.",
    stack: ["FastAPI", "Python", "PostgreSQL", "Alembic", "APScheduler", "Next.js 14", "Recharts", "Docker"],
    features: [
      "Explainable 0–100 Interest Score with per-component attribution",
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
    art: { motif: "wave", from: "#0d6ea8", to: "#071d2f", monogram: "ME" },
  },
  {
    id: "quant-platform",
    title: "Quant Platform",
    tagline: "A framework whose main job is throwing strategies away.",
    summary:
      "A multi-strategy research and paper-trading framework built to test whole strategy families, reject the overfit ones on out-of-sample evidence, and allocate capital across whatever survives. It runs entirely offline on a synthetic data provider by default, and has been verified end to end against real market data. Live trading needs four separate environment switches plus a manual promotion — a gate that never gets loosened to make something work.",
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
    art: { motif: "grid", from: "#144a6d", to: "#05131f", monogram: "QP" },
  },
];

/** Smaller builds and research labs, grouped so the main row stays focused. */
export const experimentProjects: Project[] = [
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
      "Zero third-party dependencies — deliberate constraint, not an accident",
    ],
    privateSource: true,
    links: [],
    art: { motif: "scatter", from: "#0e5f8f", to: "#061a2b", monogram: "PW" },
  },
  {
    id: "solana-wallet-lab",
    title: "Solana Wallet Lab",
    tagline: "Research that published its own negative result.",
    summary:
      "A research system for smart-wallet copy trading on Solana: backfill transactions, decode swaps, reconstruct positions, and score wallets on skill, copyability, integrity and specialisation. Backtesting is event-driven and deliberately includes tokens that died, because excluding them is how this kind of research lies to itself. Its first headline finding was that a friend-group cluster signal is negative — written up rather than buried.",
    stack: ["TypeScript", "Node", "SQLite", "Drizzle", "Helius RPC"],
    features: [
      "Wallet scoring across skill, copyability, integrity and specialisation",
      "Token safety engine with pre-entry gates and recorded rejections",
      "Event-driven backtesting that includes dead tokens",
      "Zero signing code in V1 — research and paper only, by design",
    ],
    privateSource: true,
    links: [],
    art: { motif: "orbit", from: "#0a5b7a", to: "#04161f", monogram: "SW" },
  },
  {
    id: "prediction-market-analyzer",
    title: "Prediction Market Analyzer",
    tagline: "Same event, two venues, different price.",
    summary:
      "A cross-venue arbitrage scanner for prediction markets. The hard part is not the maths, it is deciding that a market on Polymarket and a market on Kalshi are the same real-world event — handled by a multi-pass matching pipeline that escalates from exact string match through canonicalisation and team-name resolution to fuzzy matching, with an LLM verification pass only at the end.",
    stack: ["Python", "SQLite", "Streamlit", "Pydantic"],
    features: [
      "Multi-pass matching pipeline, cheapest and most certain pass first",
      "LLM verification reserved for the ambiguous tail",
      "Live opportunity feed with analytics and monitor control",
    ],
    privateSource: true,
    links: [],
    art: { motif: "grid", from: "#125e86", to: "#05161f", monogram: "PM" },
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
    art: { motif: "peaks", from: "#16597c", to: "#06171f", monogram: "CK" },
  },
  {
    id: "proplab",
    title: "PropLab",
    tagline: "Audited the strategy, then refused to run it.",
    summary:
      "A research lab for a funded-trader evaluation account. The first deliverable was an audit of a purchased expert advisor, which turned out to be a grid system that averages down with no stop loss — prohibited by the firm's own rules, so it was rejected outright rather than benchmarked. The research that followed established the real constraints: transaction costs rival the entire profit target, and a zero-edge strategy passes both evaluation phases 2.7% of the time, which is the null result everything else has to beat.",
    stack: ["Python", "MT4 / MQL4", "Monte Carlo simulation"],
    features: [
      "Full audit of a purchased EA, rejected on rule compliance rather than performance",
      "Monte Carlo baseline establishing the pass rate of a zero-edge strategy",
      "Cost modelling showing transaction costs are comparable to the profit target",
      "Finding that stop width dominates signal quality for pass probability",
    ],
    privateSource: true,
    links: [],
    art: { motif: "bars", from: "#0b4f72", to: "#04131d", monogram: "PL" },
  },
];

/** The home row, in display order. */
export const homeTiles: Tile[] = [
  ...featuredProjects.map((project): Tile => ({ kind: "project", project })),
  {
    kind: "folder",
    id: "experiments",
    title: "Experiments",
    blurb: "Research labs and smaller builds",
    projects: experimentProjects,
  },
];

export const allProjects: Project[] = [...featuredProjects, ...experimentProjects];
