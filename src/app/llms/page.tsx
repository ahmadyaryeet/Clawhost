"use client";

import { useState, useEffect } from "react";

/* ═══════════════════════════════════════════════
   GCLID TRACKING
   ═══════════════════════════════════════════════ */

function captureGclid(): void {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);
  const gclid = params.get("gclid");
  if (gclid) {
    const expires = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toUTCString();
    document.cookie = `gclid=${encodeURIComponent(gclid)}; expires=${expires}; path=/; SameSite=Lax`;
  }
}

/* ═══════════════════════════════════════════════
   TYPES & DATA
   ═══════════════════════════════════════════════ */

interface Model {
  provider: string;
  name: string;
  inputPrice: number;
  outputPrice: number;
  good: number;
  bad: number;
}

const models: Model[] = [
  { provider: "Moonshotai", name: "Kimi K2.5", inputPrice: 0.45, outputPrice: 2.2, good: 27, bad: 1 },
  { provider: "Z-ai", name: "GLM 4.7", inputPrice: 0.3, outputPrice: 1.4, good: 22, bad: 2 },
  { provider: "Google", name: "Gemini 3 Flash Preview", inputPrice: 0.5, outputPrice: 3.0, good: 17, bad: 0 },
  { provider: "Anthropic", name: "Claude Opus 4.5", inputPrice: 5.0, outputPrice: 25.0, good: 27, bad: 12 },
  { provider: "Anthropic", name: "Claude Opus 4.6", inputPrice: 5.0, outputPrice: 25.0, good: 9, bad: 0 },
  { provider: "Anthropic", name: "Claude Sonnet 4.5", inputPrice: 3.0, outputPrice: 15.0, good: 8, bad: 2 },
  { provider: "OpenAI", name: "GPT-5.2", inputPrice: 1.75, outputPrice: 14.0, good: 7, bad: 1 },
  { provider: "Deepseek", name: "DeepSeek V3", inputPrice: 0.32, outputPrice: 0.89, good: 6, bad: 1 },
  { provider: "Minimax", name: "MiniMax M2.1", inputPrice: 0.27, outputPrice: 0.95, good: 4, bad: 0 },
  { provider: "Mistral AI", name: "Mixtral 8x7B Instruct", inputPrice: 0.54, outputPrice: 0.54, good: 4, bad: 0 },
  { provider: "Mistral AI", name: "Devstral 2 2512", inputPrice: 0.4, outputPrice: 2.0, good: 2, bad: 0 },
  { provider: "Google", name: "Gemini 3 Pro Preview", inputPrice: 2.0, outputPrice: 12.0, good: 2, bad: 0 },
  { provider: "Mistral AI", name: "Mistral 7B Instruct v0.1", inputPrice: 0.11, outputPrice: 0.19, good: 2, bad: 0 },
  { provider: "Mistral AI", name: "Mistral Small 3.1 24B", inputPrice: 0.35, outputPrice: 0.56, good: 1, bad: 0 },
  { provider: "OpenAI", name: "GPT-OSS-120b", inputPrice: 0.039, outputPrice: 0.19, good: 1, bad: 0 },
  { provider: "Z-ai", name: "GLM-4.7-Flash", inputPrice: 0.06, outputPrice: 0.4, good: 1, bad: 0 },
  { provider: "Stepfun-ai", name: "Step 3.5 Flash", inputPrice: 0.1, outputPrice: 0.3, good: 1, bad: 0 },
  { provider: "Mistral AI", name: "Mistral Large 3 2512", inputPrice: 0.5, outputPrice: 1.5, good: 1, bad: 0 },
  { provider: "Xai", name: "Grok 4.1 Fast", inputPrice: 0.2, outputPrice: 0.5, good: 1, bad: 0 },
  { provider: "OpenAI", name: "GPT-5 Mini", inputPrice: 0.25, outputPrice: 2.0, good: 1, bad: 0 },
  { provider: "OpenAI", name: "GPT-5 Nano", inputPrice: 0.05, outputPrice: 0.4, good: 1, bad: 0 },
  { provider: "Qwen", name: "Qwen3 Coder 30B A3B", inputPrice: 0.07, outputPrice: 0.27, good: 1, bad: 0 },
  { provider: "Google", name: "Gemini 2.5 Flash Lite", inputPrice: 0.1, outputPrice: 0.4, good: 1, bad: 0 },
  { provider: "Amazon", name: "Nova 2 Lite", inputPrice: 0.3, outputPrice: 2.5, good: 1, bad: 0 },
  { provider: "OpenAI", name: "GPT-4o-mini", inputPrice: 0.15, outputPrice: 0.6, good: 1, bad: 0 },
  { provider: "Anthropic", name: "Claude Sonnet 4.6", inputPrice: 3.0, outputPrice: 15.0, good: 0, bad: 0 },
  { provider: "Anthropic", name: "Claude Haiku 4.5", inputPrice: 1.0, outputPrice: 5.0, good: 0, bad: 0 },
  { provider: "Google", name: "Gemini 2.5 Pro", inputPrice: 1.25, outputPrice: 10.0, good: 0, bad: 0 },
  { provider: "Google", name: "Gemini 2.5 Flash", inputPrice: 0.3, outputPrice: 2.5, good: 0, bad: 0 },
  { provider: "OpenAI", name: "GPT-5", inputPrice: 1.25, outputPrice: 10.0, good: 0, bad: 0 },
  { provider: "OpenAI", name: "o3", inputPrice: 2.0, outputPrice: 8.0, good: 0, bad: 0 },
  { provider: "OpenAI", name: "o4 Mini", inputPrice: 1.1, outputPrice: 4.4, good: 0, bad: 0 },
  { provider: "Deepseek", name: "R1", inputPrice: 0.7, outputPrice: 2.5, good: 0, bad: 0 },
  { provider: "Deepseek", name: "DeepSeek V3.1", inputPrice: 0.15, outputPrice: 0.75, good: 0, bad: 0 },
  { provider: "Meta-llama", name: "Llama 4 Maverick", inputPrice: 0.15, outputPrice: 0.6, good: 0, bad: 0 },
  { provider: "Meta-llama", name: "Llama 4 Scout", inputPrice: 0.08, outputPrice: 0.3, good: 0, bad: 0 },
  { provider: "Xai", name: "Grok 4", inputPrice: 3.0, outputPrice: 15.0, good: 0, bad: 0 },
  { provider: "Xai", name: "Grok 3", inputPrice: 3.0, outputPrice: 15.0, good: 0, bad: 0 },
  { provider: "Qwen", name: "Qwen3 235B A22B", inputPrice: 0.455, outputPrice: 1.82, good: 0, bad: 0 },
  { provider: "Qwen", name: "Qwen3 32B", inputPrice: 0.08, outputPrice: 0.24, good: 0, bad: 0 },
  { provider: "Cohere", name: "Command A", inputPrice: 2.5, outputPrice: 10.0, good: 0, bad: 0 },
  { provider: "Mistral AI", name: "Mistral Medium 3.1", inputPrice: 0.4, outputPrice: 2.0, good: 0, bad: 0 },
  { provider: "Microsoft", name: "Phi 4", inputPrice: 0.06, outputPrice: 0.14, good: 0, bad: 0 },
  { provider: "Nvidia", name: "Nemotron 3 Nano 30B A3B", inputPrice: 0.05, outputPrice: 0.2, good: 0, bad: 0 },
  { provider: "Perplexity", name: "Sonar Pro", inputPrice: 3.0, outputPrice: 15.0, good: 0, bad: 0 },
];

/* ═══════════════════════════════════════════════
   COMPONENTS
   ═══════════════════════════════════════════════ */

const providerLogos: Record<string, string> = {
  "Anthropic": "/logos/anthropic.png",
  "OpenAI": "/logos/openai.png",
  "Google": "/logos/google.png",
  "Deepseek": "/logos/deepseek.png",
  "Mistral AI": "/logos/mistral.png",
  "Meta-llama": "/logos/meta.png",
  "Xai": "/logos/xai.png",
  "Qwen": "/logos/qwen.png",
  "Cohere": "/logos/cohere.png",
  "Amazon": "/logos/amazon.png",
  "Minimax": "/logos/minimax.png",
  "Moonshotai": "/logos/moonshotai.png",
  "Z-ai": "/logos/zai.png",
  "Nvidia": "/logos/nvidia.png",
  "Microsoft": "/logos/microsoft.png",
  "Perplexity": "/logos/perplexity.png",
  "Stepfun-ai": "/logos/stepfun.png",
};

function modelKey(m: Model): string {
  return `${m.provider}::${m.name}`;
}

function ModelRow({
  model, rank, good, bad, userVote, onVote,
}: {
  model: Model; rank: number;
  good: number; bad: number;
  userVote: "good" | "bad" | null;
  onVote: (key: string, type: "good" | "bad") => void;
}) {
  const net = good - bad;
  const logo = providerLogos[model.provider];
  const key = modelKey(model);

  return (
    <div className={`row${rank <= 3 ? " row--top" : ""}`}>
      <div className="row__rank">{rank}</div>
      <div className="row__model">
        <img className="row__avatar" src={logo} alt={model.provider} />
        <div className="row__info">
          <span className="row__name">{model.name}</span>
          <span className="row__provider">{model.provider}</span>
        </div>
      </div>
      <div className="row__price">
        <span className="row__price-val">${model.inputPrice < 0.01 ? model.inputPrice.toFixed(3) : model.inputPrice.toFixed(2)}</span>
        <span className="row__price-label">input</span>
      </div>
      <div className="row__price">
        <span className="row__price-val">${model.outputPrice < 0.01 ? model.outputPrice.toFixed(3) : model.outputPrice.toFixed(2)}</span>
        <span className="row__price-label">output</span>
      </div>
      <div className="row__votes">
        <button
          className={`row__vote-btn row__vote-btn--good${userVote === "good" ? " row__vote-btn--active" : ""}`}
          onClick={() => onVote(key, "good")}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 8l4-5 4 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          {good}
        </button>
        <button
          className={`row__vote-btn row__vote-btn--bad${userVote === "bad" ? " row__vote-btn--active" : ""}`}
          onClick={() => onVote(key, "bad")}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 4l4 5 4-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          {bad}
        </button>
        <span className={`row__net${net > 0 ? " row__net--pos" : net < 0 ? " row__net--neg" : ""}`}>
          {net > 0 ? "+" : ""}{net}
        </span>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════ */

export default function LLMsPage() {
  const [search, setSearch] = useState("");
  const [voteCounts, setVoteCounts] = useState<Record<string, { good: number; bad: number }>>({});
  const [userVotes, setUserVotes] = useState<Record<string, string>>({});
  const [votesLoaded, setVotesLoaded] = useState(false);

  useEffect(() => {
    captureGclid();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.08 }
    );
    document.querySelectorAll(".fade-up").forEach((el) => observer.observe(el));

    // Fetch votes from API
    fetch("/api/votes")
      .then((res) => res.json())
      .then((data) => {
        setVoteCounts(data.counts || {});
        setUserVotes(data.userVotes || {});
        setVotesLoaded(true);
      })
      .catch(() => setVotesLoaded(true));

    return () => observer.disconnect();
  }, []);

  const handleVote = async (key: string, type: "good" | "bad") => {
    const prev = userVotes[key] as "good" | "bad" | undefined;
    const prevCounts = voteCounts[key] || { good: 0, bad: 0 };

    // Optimistic update
    const newCounts = { ...voteCounts };
    const newUserVotes = { ...userVotes };

    if (prev === type) {
      // Toggle off
      newCounts[key] = { ...prevCounts, [type]: Math.max(0, prevCounts[type] - 1) };
      delete newUserVotes[key];
    } else {
      // New vote or switch
      const updated = { ...prevCounts };
      if (prev) updated[prev as "good" | "bad"] = Math.max(0, updated[prev as "good" | "bad"] - 1);
      updated[type] = updated[type] + 1;
      newCounts[key] = updated;
      newUserVotes[key] = type;
    }

    setVoteCounts(newCounts);
    setUserVotes(newUserVotes);

    // Send to API
    try {
      await fetch("/api/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ modelKey: key, voteType: type }),
      });
    } catch {
      // Revert on error
      setVoteCounts(voteCounts);
      setUserVotes(userVotes);
    }
  };

  const getVoteCounts = (key: string) => voteCounts[key] || { good: 0, bad: 0 };

  const sorted = [...models].sort((a, b) => {
    const aVotes = getVoteCounts(modelKey(a));
    const bVotes = getVoteCounts(modelKey(b));
    const aNet = (votesLoaded ? aVotes.good : a.good) - (votesLoaded ? aVotes.bad : a.bad);
    const bNet = (votesLoaded ? bVotes.good : b.good) - (votesLoaded ? bVotes.bad : b.bad);
    return bNet - aNet;
  });
  const filtered = search
    ? sorted.filter(
        (m) =>
          m.name.toLowerCase().includes(search.toLowerCase()) ||
          m.provider.toLowerCase().includes(search.toLowerCase())
      )
    : sorted;

  return (
    <>
      {/* Grain */}
      <div className="grain" aria-hidden="true">
        <svg width="100%" height="100%">
          <filter id="grain-filter">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#grain-filter)" />
        </svg>
      </div>

      {/* Header */}
      <header className="header">
        <div className="header__inner">
          <div className="header__left">
            <a href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
              <img src="/openclaw.png" alt="OpenClaw" className="header__logo" />
              <span className="header__brand">OpenClaw Rankings</span>
            </a>
            <div className="header__dropdown">
              <button className="header__dropdown-btn">
                Rankings
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
              <div className="header__dropdown-menu">
                <a href="/" className="header__dropdown-item">Best Providers</a>
                <a href="/llms" className="header__dropdown-item header__dropdown-item--active">Best LLMs</a>
              </div>
            </div>
          </div>
          <div className="header__right">
            <span className="header__updated">Last updated: February 2026</span>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="hero fade-up">
        <div className="hero__glow" aria-hidden="true" />
        <h1 className="hero__title">Best LLMs for OpenClaw in 2026</h1>
        <p className="hero__subtitle">
          Community-ranked large language models for OpenClaw agents. Compared on pricing, quality, and real-world performance.
        </p>
        <div className="hero__stats">
          <span>{models.length} models tracked</span>
          <span className="hero__stats-dot" />
          <span>{votesLoaded
            ? Object.values(voteCounts).reduce((s, c) => s + c.good + c.bad, 0)
            : models.reduce((s, m) => s + m.good + m.bad, 0)}+ community votes</span>
          <span className="hero__stats-dot" />
          <span>Updated Feb 2026</span>
        </div>
      </section>

      {/* Search */}
      <div className="search-bar fade-up">
        <div className="search-bar__inner">
          <svg className="search-bar__icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.4"/>
            <path d="M11 11l3.5 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
          </svg>
          <input
            className="search-bar__input"
            type="text"
            placeholder="Search providers or models..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <section className="table-section fade-up">
        <div className="table-section__inner">
          {/* Table header */}
          <div className="row row--header">
            <div className="row__rank">#</div>
            <div className="row__model">Model</div>
            <div className="row__price">Input /1M</div>
            <div className="row__price">Output /1M</div>
            <div className="row__votes">Votes</div>
          </div>
          {/* Rows */}
          {filtered.map((model, i) => {
            const key = modelKey(model);
            const counts = getVoteCounts(key);
            return (
              <ModelRow
                key={key}
                model={model}
                rank={i + 1}
                good={votesLoaded ? counts.good : model.good}
                bad={votesLoaded ? counts.bad : model.bad}
                userVote={(userVotes[key] as "good" | "bad") || null}
                onVote={handleVote}
              />
            );
          })}
          {filtered.length === 0 && (
            <div className="table-empty">No models matching &ldquo;{search}&rdquo;</div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer__inner">
          <div className="footer__brand">OpenClaw Rankings</div>
          <div className="footer__links">
            <a href="/">Best Providers</a>
            <span className="footer__dot">&middot;</span>
            <a href="/llms">Best LLMs</a>
          </div>
          <div className="footer__copy">&copy; 2026 OpenClaw Rankings. Independent and community-driven.</div>
        </div>
      </footer>

      {/* ═══ STYLES ═══ */}
      <style>{`

        @keyframes card-enter {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .grain {
          position: fixed; inset: 0; z-index: 9999;
          pointer-events: none; opacity: 0.022;
        }

        /* ── Header ── */

        .header {
          position: sticky; top: 0; z-index: 50;
          background: rgba(252,250,247,0.85); backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--border-light);
          padding: 12px 24px;
        }
        .header__inner {
          max-width: 1060px; margin: 0 auto;
          display: flex; align-items: center; justify-content: space-between;
        }
        .header__left { display: flex; align-items: center; gap: 10px; }
        .header__logo { width: 30px; height: 30px; border-radius: 8px; object-fit: contain; }
        .header__brand { font-size: 17px; font-weight: 600; color: var(--text); letter-spacing: -0.01em; }
        .header__right { display: flex; align-items: center; gap: 20px; }
        .header__updated { font-size: 12px; color: var(--text-dim); }

        .header__dropdown { position: relative; }
        .header__dropdown-btn {
          display: flex; align-items: center; gap: 5px;
          font-family: inherit; font-size: 13px; font-weight: 500;
          color: var(--text-muted); background: var(--bg);
          border: 1px solid var(--border); border-radius: 8px;
          padding: 6px 12px; cursor: pointer;
          transition: all 0.15s ease;
        }
        .header__dropdown-btn:hover { color: var(--text); border-color: rgba(0,0,0,0.15); }
        .header__dropdown-menu {
          position: absolute; top: calc(100% + 6px); left: 0;
          background: #fff; border: 1px solid var(--border); border-radius: 10px;
          padding: 4px; min-width: 160px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.03);
          opacity: 0; visibility: hidden; transform: translateY(-4px);
          transition: all 0.15s ease; z-index: 100;
        }
        .header__dropdown:hover .header__dropdown-menu {
          opacity: 1; visibility: visible; transform: translateY(0);
        }
        .header__dropdown-item {
          display: block; padding: 8px 12px; font-size: 13px; font-weight: 450;
          color: var(--text-muted); border-radius: 7px;
          transition: all 0.1s ease; text-decoration: none;
        }
        .header__dropdown-item:hover { background: var(--bg-warm); color: var(--text); }
        .header__dropdown-item--active { color: var(--accent); font-weight: 550; }

        /* ── Hero ── */

        .hero {
          text-align: center; padding: 56px 24px 32px;
          position: relative; overflow: hidden;
        }
        .hero__glow {
          position: absolute; top: -80px; left: 50%; transform: translateX(-50%);
          width: 600px; height: 400px;
          background: radial-gradient(ellipse, rgba(255,107,74,0.06) 0%, transparent 70%);
          pointer-events: none;
        }
        .hero__title {
          font-family: var(--font-heading); font-size: 36px; font-weight: 400;
          color: var(--text); line-height: 1.15; letter-spacing: -0.02em;
          margin-bottom: 14px; position: relative;
        }
        .hero__subtitle {
          font-size: 16px; color: var(--text-secondary); line-height: 1.6;
          max-width: 560px; margin: 0 auto 20px; position: relative;
        }
        .hero__stats {
          display: flex; justify-content: center; align-items: center;
          gap: 12px; font-size: 13px; color: var(--text-muted); position: relative;
        }
        .hero__stats-dot {
          width: 3px; height: 3px; border-radius: 50%;
          background: var(--text-dim);
        }

        /* ── Search ── */

        .search-bar { padding: 0 24px 24px; }
        .search-bar__inner {
          max-width: 520px; margin: 0 auto; position: relative;
        }
        .search-bar__icon {
          position: absolute; left: 14px; top: 50%; transform: translateY(-50%);
          color: var(--text-dim); pointer-events: none;
        }
        .search-bar__input {
          width: 100%; font-family: inherit; font-size: 14px; color: var(--text);
          background: #fff; border: 1px solid var(--border); border-radius: 10px;
          padding: 10px 14px 10px 40px; outline: none;
          transition: border-color 0.15s ease, box-shadow 0.15s ease;
        }
        .search-bar__input::placeholder { color: var(--text-dim); }
        .search-bar__input:focus {
          border-color: var(--accent);
          box-shadow: 0 0 0 3px rgba(255,107,74,0.08);
        }

        /* ── Table ── */

        .table-section { padding: 0 24px 64px; }
        .table-section__inner {
          max-width: 880px; margin: 0 auto;
          background: #fff; border: 1px solid var(--border); border-radius: 14px;
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(0,0,0,0.03);
        }

        .row {
          display: grid;
          grid-template-columns: 48px 1fr 100px 100px 160px;
          align-items: center; padding: 12px 20px;
          border-bottom: 1px solid var(--border-light);
          transition: background 0.1s ease;
          animation: card-enter 0.4s ease both;
        }
        .row:last-child { border-bottom: none; }
        .row:not(.row--header):hover { background: rgba(0,0,0,0.01); }
        .row--header {
          background: var(--bg); font-size: 12px; font-weight: 600;
          color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.04em;
          padding: 10px 20px; position: sticky; top: 0;
        }
        .row--top { background: rgba(255,107,74,0.02); }

        .row__rank {
          font-size: 13px; font-weight: 600; color: var(--text-muted);
          text-align: center;
        }

        .row__model { display: flex; align-items: center; gap: 10px; min-width: 0; }
        .row__avatar {
          width: 32px; height: 32px; border-radius: 8px; flex-shrink: 0;
          object-fit: contain; background: var(--bg);
          border: 1px solid var(--border-light);
        }
        .row__info { display: flex; flex-direction: column; min-width: 0; }
        .row__name {
          font-size: 14px; font-weight: 550; color: var(--text);
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .row__provider {
          font-size: 12px; color: var(--text-muted);
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }

        .row__price { text-align: right; }
        .row__price-val {
          font-size: 14px; font-weight: 550; color: var(--text);
          font-variant-numeric: tabular-nums;
        }
        .row__price-label {
          display: block; font-size: 11px; color: var(--text-dim);
        }
        .row--header .row__price { font-size: 12px; }

        .row__votes {
          display: flex; align-items: center; gap: 6px; justify-content: flex-end;
        }
        .row__vote-btn {
          display: flex; align-items: center; gap: 4px;
          font-family: inherit; font-size: 12px; font-weight: 550;
          border: 1px solid var(--border); border-radius: 6px;
          padding: 4px 8px; cursor: pointer;
          background: #fff; color: var(--text-muted);
          transition: all 0.15s ease;
        }
        .row__vote-btn--good:hover,
        .row__vote-btn--good.row__vote-btn--active {
          color: #16a34a; background: rgba(22,163,74,0.06);
          border-color: rgba(22,163,74,0.2);
        }
        .row__vote-btn--bad:hover,
        .row__vote-btn--bad.row__vote-btn--active {
          color: #e53e3e; background: rgba(229,62,62,0.06);
          border-color: rgba(229,62,62,0.2);
        }

        .row__net {
          font-size: 13px; font-weight: 600; min-width: 32px; text-align: right;
          color: var(--text-muted); font-variant-numeric: tabular-nums;
        }
        .row__net--pos { color: #16a34a; }
        .row__net--neg { color: #e53e3e; }

        .table-empty {
          padding: 40px 20px; text-align: center;
          font-size: 14px; color: var(--text-muted);
        }

        /* ── Footer ── */

        .footer {
          padding: 40px 24px; border-top: 1px solid var(--border-light);
          text-align: center;
        }
        .footer__inner { max-width: 600px; margin: 0 auto; }
        .footer__brand {
          font-size: 15px; font-weight: 600; color: var(--text);
          margin-bottom: 10px;
        }
        .footer__links {
          display: flex; justify-content: center; gap: 8px;
          font-size: 13px; margin-bottom: 14px;
        }
        .footer__links a { color: var(--text-muted); transition: color 0.2s ease; }
        .footer__links a:hover { color: var(--text); }
        .footer__dot { color: var(--text-dim); font-size: 13px; }
        .footer__copy { font-size: 12px; color: var(--text-muted); }

        /* ── Fade animation ── */
        .fade-up {
          opacity: 0; transform: translateY(20px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .fade-up.is-visible { opacity: 1; transform: translateY(0); }

        /* ═══ RESPONSIVE ═══ */

        @media (max-width: 768px) {
          .header__inner { flex-direction: column; gap: 8px; }

          .hero { padding: 44px 20px 28px; }
          .hero__title { font-size: 28px; }
          .hero__subtitle { font-size: 15px; }
          .hero__stats { font-size: 12px; gap: 8px; }

          .row {
            grid-template-columns: 32px 1fr 70px 70px;
            padding: 10px 12px; font-size: 12px;
          }
          .row__votes { display: none; }
          .row--header .row__votes { display: none; }
          .row__avatar { width: 28px; height: 28px; font-size: 11px; }
          .row__name { font-size: 13px; }
          .row__price-val { font-size: 12px; }

          .footer { padding: 32px 20px; }
        }

        @media (max-width: 420px) {
          .hero__title { font-size: 24px; }
          .row { grid-template-columns: 28px 1fr 60px 60px; padding: 8px 10px; }
          .row__avatar { width: 24px; height: 24px; font-size: 10px; border-radius: 6px; }
          .row__name { font-size: 12px; }
          .row__provider { font-size: 10px; }
          .row__price-val { font-size: 11px; }
        }

      `}</style>
    </>
  );
}
