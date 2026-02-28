"use client";

import { useState, useEffect } from "react";

/* ═══════════════════════════════════════════════
   TYPES & DATA
   ═══════════════════════════════════════════════ */

type FeatureStatus = "present" | "missing" | "partial" | "manual";

interface Feature {
  name: string;
  status: FeatureStatus;
  label?: string;
}

interface Provider {
  name: string;
  category: string;
  score: number;
  votes: number;
  summary: string;
  features: Feature[];
  price: string;
  priceSubtitle: string;
  url: string;
  callout?: string;
  tip?: string;
  tipUrl?: string;
}

function formatVotes(n: number): string {
  if (n >= 1000) {
    const k = n / 1000;
    return k % 1 === 0 ? `${k}k` : `${k.toFixed(1)}k`;
  }
  return n.toString();
}

const oneClickProviders: Provider[] = [
  {
    name: "ClawCloud",
    category: "Managed",
    score: 9.6,
    votes: 4500,
    summary: "Purpose-built managed hosting for OpenClaw agents. Live in under 1 minute.",
    features: [
      { name: "Docker Isolation", status: "present" },
      { name: "Auto-TLS", status: "present" },
      { name: "WhatsApp", status: "present" },
      { name: "Telegram", status: "present" },
      { name: "Discord", status: "present" },
      { name: "Slack", status: "present" },
    ],
    price: "$29/mo",
    priceSubtitle: "Starting at",
    url: "https://clawcloud.dev",
    callout: "Only provider with built-in WhatsApp, Telegram, Discord, and Slack support.",
  },
  {
    name: "Railway",
    category: "PaaS",
    score: 7.8,
    votes: 2800,
    summary: "Fastest deploy from GitHub. Good for prototyping, limited per-agent isolation.",
    features: [
      { name: "Shared Containers", status: "partial" },
      { name: "Auto-TLS", status: "present" },
      { name: "WhatsApp", status: "missing" },
      { name: "Telegram", status: "missing" },
      { name: "Discord", status: "missing" },
      { name: "Slack", status: "missing" },
    ],
    price: "$35/mo",
    priceSubtitle: "Starting at",
    url: "https://railway.app",
  },
  {
    name: "OpenClaw Hosting",
    category: "Managed",
    score: 7.5,
    votes: 1950,
    summary: "Dedicated OpenClaw hosting with pre-configured agent environments and built-in scaling.",
    features: [
      { name: "Docker Isolation", status: "present" },
      { name: "Auto-TLS", status: "present" },
      { name: "WhatsApp", status: "missing" },
      { name: "Telegram", status: "present" },
      { name: "Discord", status: "missing" },
      { name: "Slack", status: "missing" },
    ],
    price: "$49/mo",
    priceSubtitle: "Starting at",
    url: "https://openclawhosting.io",
  },
  {
    name: "Render",
    category: "PaaS",
    score: 7.6,
    votes: 2100,
    summary: "Simple managed platform with free tier. Auto-deploy from Git repos with zero config.",
    features: [
      { name: "Docker Isolation", status: "present" },
      { name: "Auto-TLS", status: "present" },
      { name: "WhatsApp", status: "missing" },
      { name: "Telegram", status: "missing" },
      { name: "Discord", status: "missing" },
      { name: "Slack", status: "missing" },
    ],
    price: "$30/mo",
    priceSubtitle: "Starting at",
    url: "https://render.com",
  },
  {
    name: "DigitalOcean App Platform",
    category: "Managed",
    score: 7.4,
    votes: 1700,
    summary: "Solid managed platform with team collaboration features. Messaging channels are DIY.",
    features: [
      { name: "Docker Isolation", status: "present" },
      { name: "Auto-TLS", status: "present" },
      { name: "WhatsApp", status: "missing" },
      { name: "Telegram", status: "missing" },
      { name: "Discord", status: "missing" },
      { name: "Slack", status: "missing" },
    ],
    price: "$40/mo",
    priceSubtitle: "Starting at",
    url: "https://digitalocean.com",
  },
  {
    name: "Fly.io",
    category: "Edge",
    score: 7.2,
    votes: 1400,
    summary: "Edge deployment across 30+ regions with per-app isolation. Complex config but fast cold starts.",
    features: [
      { name: "Docker Isolation", status: "present" },
      { name: "Auto-TLS", status: "present" },
      { name: "WhatsApp", status: "missing" },
      { name: "Telegram", status: "missing" },
      { name: "Discord", status: "missing" },
      { name: "Slack", status: "missing" },
    ],
    price: "$5/mo",
    priceSubtitle: "+ usage",
    url: "https://fly.io",
  },
  {
    name: "Coolify",
    category: "Open Source",
    score: 7.0,
    votes: 1100,
    summary: "Self-hosted Heroku alternative. One-click deploys with Docker Compose and automatic SSL.",
    features: [
      { name: "Docker Isolation", status: "present" },
      { name: "Auto-TLS", status: "present" },
      { name: "WhatsApp", status: "missing" },
      { name: "Telegram", status: "missing" },
      { name: "Discord", status: "missing" },
      { name: "Slack", status: "missing" },
    ],
    price: "$25/mo",
    priceSubtitle: "cloud hosted",
    url: "https://coolify.io",
  },
  {
    name: "Zeabur",
    category: "PaaS",
    score: 6.8,
    votes: 680,
    summary: "One-click deploy platform with marketplace templates. Growing community, newer platform.",
    features: [
      { name: "Docker Isolation", status: "present" },
      { name: "Auto-TLS", status: "present" },
      { name: "WhatsApp", status: "missing" },
      { name: "Telegram", status: "missing" },
      { name: "Discord", status: "missing" },
      { name: "Slack", status: "missing" },
    ],
    price: "$5/mo",
    priceSubtitle: "+ usage",
    url: "https://zeabur.com",
  },
  {
    name: "OpenClaw HQ",
    category: "Tool",
    score: 6.5,
    votes: 620,
    summary: "Your Agent Command Center. Dashboard for managing and monitoring your OpenClaw agents.",
    features: [
      { name: "Dashboard", status: "present" },
      { name: "Monitoring", status: "present" },
      { name: "Management", status: "present" },
    ],
    price: "$45/mo",
    priceSubtitle: "Starting at",
    url: "https://openclawhq.ai",
  },
  {
    name: "OpenClaw Skills Directory",
    category: "Tool",
    score: 5.8,
    votes: 410,
    summary: "Search, filter & install skills. The community directory for OpenClaw skills and plugins.",
    features: [
      { name: "Skills", status: "present" },
      { name: "Search", status: "present" },
      { name: "Community", status: "present" },
    ],
    price: "$38/mo",
    priceSubtitle: "Starting at",
    url: "https://openclawskills.org",
  },
  {
    name: "OpenClaws.io",
    category: "Portal",
    score: 4.2,
    votes: 290,
    summary: "The AI that actually does things. Alternative portal to the OpenClaw ecosystem.",
    features: [
      { name: "Portal", status: "present" },
      { name: "Getting started", status: "present" },
    ],
    price: "$27/mo",
    priceSubtitle: "Starting at",
    url: "https://openclaws.io",
  },
  {
    name: "ClawPrompts.ai",
    category: "Tool",
    score: 5.2,
    votes: 350,
    summary: "Expert prompts for OpenClaw AI agents. Curated prompt library.",
    features: [
      { name: "Prompts", status: "present" },
      { name: "Templates", status: "present" },
      { name: "Library", status: "present" },
    ],
    price: "$33/mo",
    priceSubtitle: "Starting at",
    url: "https://clawprompts.ai",
  },
  {
    name: "TouchGrass.sh",
    category: "CLI Bridge",
    score: 3.5,
    votes: 180,
    summary: "Remote control Claude Code, Codex, Pi via Telegram. Lightweight PTY bridge for managing coding agents from your phone.",
    features: [
      { name: "Claude Code", status: "present" },
      { name: "Codex", status: "present" },
      { name: "Telegram", status: "present" },
    ],
    price: "$25/mo",
    priceSubtitle: "Starting at",
    url: "https://touchgrass.sh",
  },
];

const manualProviders: Provider[] = [
  {
    name: "Hetzner VPS + ClawCloud OSS",
    category: "VPS",
    score: 9.0,
    votes: 3200,
    summary: "Cheapest option with full control. ClawCloud\u2019s open-source repo automates Docker + Caddy setup.",
    features: [
      { name: "Docker Isolation", status: "present" },
      { name: "Auto-TLS (manual Caddy)", status: "manual" },
      { name: "WhatsApp (manual)", status: "manual" },
      { name: "Telegram (manual)", status: "manual" },
      { name: "Discord (manual)", status: "manual" },
      { name: "Slack (manual)", status: "manual" },
    ],
    price: "$27/mo",
    priceSubtitle: "CX22 VPS",
    url: "https://hetzner.com",
    callout: "Best price-to-performance ratio. Open-source deploy script cuts setup from hours to 15 minutes.",
    tip: "Use github.com/saroyas/ClawCloud to automate the full stack setup.",
    tipUrl: "https://github.com/saroyas/ClawCloud",
  },
  {
    name: "Linode / Akamai VPS",
    category: "VPS",
    score: 7.5,
    votes: 1300,
    summary: "Reliable VPS with good global coverage and responsive support.",
    features: [
      { name: "Docker Isolation", status: "present" },
      { name: "Auto-TLS (manual)", status: "manual" },
      { name: "WhatsApp (manual)", status: "manual" },
      { name: "Telegram (manual)", status: "manual" },
      { name: "Discord (manual)", status: "manual" },
      { name: "Slack (manual)", status: "manual" },
    ],
    price: "$36/mo",
    priceSubtitle: "Dedicated 4GB",
    url: "https://linode.com",
  },
  {
    name: "AWS ECS",
    category: "Enterprise",
    score: 7.0,
    votes: 890,
    summary: "Maximum scale and AWS ecosystem integration. Significant setup complexity.",
    features: [
      { name: "Docker Isolation", status: "present" },
      { name: "Auto-TLS (via ALB)", status: "present" },
      { name: "WhatsApp (manual)", status: "manual" },
      { name: "Telegram (manual)", status: "manual" },
      { name: "Discord (manual)", status: "manual" },
      { name: "Slack (manual)", status: "manual" },
    ],
    price: "$48/mo",
    priceSubtitle: "Starting at",
    url: "https://aws.amazon.com/ecs",
  },
  {
    name: "Oracle Cloud Free Tier",
    category: "Free Tier",
    score: 6.5,
    votes: 540,
    summary: "Genuinely free ARM instances with 24GB RAM. Availability is hit-or-miss. Great if you can get one.",
    features: [
      { name: "Docker Isolation", status: "present" },
      { name: "Auto-TLS (manual)", status: "manual" },
      { name: "WhatsApp (manual)", status: "manual" },
      { name: "Telegram (manual)", status: "manual" },
      { name: "Discord (manual)", status: "manual" },
      { name: "Slack (manual)", status: "manual" },
    ],
    price: "Free",
    priceSubtitle: "forever tier (ARM)",
    url: "https://oracle.com/cloud/free",
  },
];

/* ── Providers under review ── */

const reviewDomains: { name: string; status: "live" | "new" | "review" }[] = [
  { name: "openclawmarketplace.ai", status: "live" },
  { name: "openclawhosting.io", status: "live" },
  { name: "openclawhq.ai", status: "live" },
  { name: "openclawpro.app", status: "live" },
  { name: "openclawskills.org", status: "live" },
  { name: "openclaws.io", status: "live" },
  { name: "openclawrouter.dev", status: "new" },
  { name: "openclawdirectory.ai", status: "new" },
  { name: "secureopenclaw.ai", status: "new" },
  { name: "tryopenclaw.cloud", status: "new" },
  { name: "openclaw-cloud.com", status: "new" },
  { name: "openclawcloud.io", status: "new" },
  { name: "openclawtools.io", status: "review" },
  { name: "deployopenclaw.ai", status: "review" },
  { name: "openclawcloud.ai", status: "review" },
  { name: "openclaw.in", status: "review" },
  { name: "openclaw.co.in", status: "review" },
  { name: "moltbot.in", status: "review" },
  { name: "clawdbot.ai", status: "review" },
  { name: "touchgrass.sh", status: "live" },
];

const methodologyCriteria = [
  { icon: "\uD83D\uDC33", label: "Docker Isolation" },
  { icon: "\uD83D\uDD12", label: "Auto-TLS" },
  { icon: "\uD83D\uDCAC", label: "Messaging" },
  { icon: "\uD83D\uDCB0", label: "Pricing" },
  { icon: "\u26A1", label: "Setup Speed" },
  { icon: "\uD83D\uDCCA", label: "Maturity" },
];

/* ═══════════════════════════════════════════════
   HELPERS
   ═══════════════════════════════════════════════ */

/* ═══════════════════════════════════════════════
   SUB-COMPONENTS
   ═══════════════════════════════════════════════ */

function VoteColumn({ votes, name }: { votes: number; name: string }) {
  const [voteState, setVoteState] = useState<"up" | "down" | null>(null);

  const delta = voteState === "up" ? 1 : voteState === "down" ? -1 : 0;

  const handleUp = () => setVoteState(voteState === "up" ? null : "up");
  const handleDown = () => setVoteState(voteState === "down" ? null : "down");

  return (
    <div className="vote">
      <button
        className={`vote__up${voteState === "up" ? " vote__up--active" : ""}`}
        aria-label="Upvote"
        onClick={handleUp}
      >
        <svg width="14" height="9" viewBox="0 0 14 9" fill="none">
          <path d="M1 8L7 2L13 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <span className={`vote__count${voteState ? " vote__count--active" : ""}`}>
        {formatVotes(votes + delta)}
      </span>
      <button
        className={`vote__down${voteState === "down" ? " vote__down--active" : ""}`}
        aria-label="Downvote"
        onClick={handleDown}
      >
        <svg width="14" height="9" viewBox="0 0 14 9" fill="none">
          <path d="M1 1L7 7L13 1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}

function ScoreBar({ score }: { score: number }) {
  const pct = (score / 10) * 100;
  const color = score >= 8 ? "#ff6b4a" : score >= 7 ? "#f59e0b" : "#94a3b8";
  return (
    <div className="score-bar">
      <span className="score-bar__number">{score.toFixed(1)}</span>
      <div className="score-bar__track">
        <div
          className="score-bar__fill"
          style={{ "--fill-width": `${pct}%`, "--fill-color": color } as React.CSSProperties}
        />
      </div>
    </div>
  );
}

function FeaturePill({ feature, hideable }: { feature: Feature; hideable?: boolean }) {
  if (feature.status === "missing") return null;
  const cfg = {
    present: { bg: "var(--pill-green-bg)", color: "var(--pill-green-text)" },
    partial: { bg: "var(--pill-amber-bg)", color: "var(--pill-amber-text)" },
    manual: { bg: "var(--pill-manual-bg)", color: "var(--pill-manual-text)" },
  };
  const s = cfg[feature.status];
  return (
    <span
      className={`pill${hideable ? " pill--hideable" : ""}`}
      style={{ background: s.bg, color: s.color }}
    >
      {feature.label || feature.name}
    </span>
  );
}

function ProviderCard({ provider, rank, index }: { provider: Provider; rank: number; index: number }) {
  const [pillsExpanded, setPillsExpanded] = useState(false);
  const hiddenCount = Math.max(0, provider.features.length - 4);

  const handleCardClick = rank === 1 ? (e: React.MouseEvent) => {
    // Don't redirect if they clicked a button, link, or the pills toggle
    const target = e.target as HTMLElement;
    if (target.closest("a, button")) return;
    window.open(provider.url, "_blank", "noopener,noreferrer");
  } : undefined;

  return (
    <div
      className={`card${rank === 1 ? " card--clickable" : ""}`}
      style={{ animationDelay: `${index * 80}ms` }}
      onClick={handleCardClick}
    >
      {rank === 1 && <span className="card__popular">Most Popular</span>}
      <div className="card__inner">
        <VoteColumn votes={provider.votes} name={provider.name} />

        <div className="card__body">
          <div className="card__header">
            <span className="card__rank">#{rank}</span>
            <h3 className="card__name">{provider.name}</h3>
            {rank === 1 && (
              <span className="yc-badge" title="Backed by YC">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <rect width="24" height="24" rx="4" fill="#F26522" />
                  <path d="M7 6l5 7.5L17 6" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  <line x1="12" y1="13.5" x2="12" y2="19" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />
                </svg>
                <span className="yc-badge__tooltip">Backed by YC</span>
              </span>
            )}
            <span className="card__category">{provider.category}</span>
          </div>

          {/* Mobile price (visible only on small screens) */}
          <div className="card__price-mobile">
            <span className="card__price-mobile-val">{provider.price}</span>
            <span className="card__price-mobile-sub">{provider.priceSubtitle}</span>
          </div>

          <ScoreBar score={provider.score} />
          <p className="card__summary">{provider.summary}</p>

          {rank === 1 && provider.callout && (
            <p className="card__callout">&mdash; {provider.callout}</p>
          )}

          <div className={`card__pills${pillsExpanded ? " card__pills--expanded" : ""}`}>
            {provider.features.map((f, i) => (
              <FeaturePill key={f.label || f.name} feature={f} hideable={i >= 4} />
            ))}
            {hiddenCount > 0 && (
              <button
                className="pill pill--more"
                onClick={() => setPillsExpanded(!pillsExpanded)}
              >
                {pillsExpanded ? "Show less" : `+${hiddenCount} more`}
              </button>
            )}
          </div>

          {provider.tip && (
            <p className="card__tip">
              {provider.tip}{" "}
              {provider.tipUrl && (
                <a href={provider.tipUrl} target="_blank" rel="noopener noreferrer">
                  View repo &rarr;
                </a>
              )}
            </p>
          )}
        </div>

        <div className="card__right">
          <div className="card__price-sub">{provider.priceSubtitle}</div>
          <div className="card__price">{provider.price}</div>
          <a href={provider.url} target="_blank" rel="noopener noreferrer" className="cta">
            Visit &rarr;
          </a>
        </div>
      </div>
    </div>
  );
}

function SubmitModal({ onClose }: { onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal">
        <button className="modal__close" onClick={onClose} aria-label="Close">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>

        {!submitted ? (
          <>
            <h2 className="modal__title">Submit a Provider</h2>
            <p className="modal__desc">Know a hosting provider that should be listed? Tell us about it.</p>
            <form className="modal__form" onSubmit={handleSubmit}>
              <div className="modal__field">
                <label className="modal__label" htmlFor="sp-name">Provider Name</label>
                <input
                  id="sp-name"
                  className="modal__input"
                  type="text"
                  placeholder="e.g. Acme Cloud"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="modal__field">
                <label className="modal__label" htmlFor="sp-url">Website URL</label>
                <input
                  id="sp-url"
                  className="modal__input"
                  type="url"
                  placeholder="https://example.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  required
                />
              </div>
              <div className="modal__field">
                <label className="modal__label" htmlFor="sp-desc">Description</label>
                <textarea
                  id="sp-desc"
                  className="modal__input modal__textarea"
                  placeholder="What makes this provider a good fit for OpenClaw?"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  required
                />
              </div>
              <button type="submit" className="modal__submit">Submit Provider</button>
            </form>
          </>
        ) : (
          <div className="modal__success">
            <div className="modal__success-icon">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="16" fill="rgba(255,107,74,0.1)" />
                <path d="M10 16.5L14 20.5L22 12.5" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h2 className="modal__title">Thank you!</h2>
            <p className="modal__desc">
              Your submission has been received. It can take up to 24 hours for our team to evaluate your provider.
            </p>
            <button className="modal__submit" onClick={onClose}>Done</button>
          </div>
        )}
      </div>
    </div>
  );
}

function ProvidersUnderReview({ onSubmit }: { onSubmit: () => void }) {
  return (
    <section className="review fade-up">
      <div className="review__inner">
        <h2 className="review__title">Providers Under Review</h2>
        <p className="review__subtitle">
          {reviewDomains.length.toLocaleString()}+ claw domains tracked &middot; Updated daily
        </p>
        <div className="review__card">
          <div className="review__domains">
            {reviewDomains.map((d) => (
              <span key={d.name} className="review__domain">{d.name}</span>
            ))}
          </div>
          <div className="review__footer">
            <button className="review__submit" onClick={onSubmit}>
              Submit a Provider &rarr;
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════ */

export default function Home() {
  const [activeTab, setActiveTab] = useState<"oneclick" | "manual">("oneclick");
  const [showSubmit, setShowSubmit] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.08 }
    );
    document.querySelectorAll(".fade-up").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const providers = activeTab === "oneclick" ? oneClickProviders : manualProviders;
  const totalVotes = [...oneClickProviders, ...manualProviders].reduce((s, p) => s + p.votes, 0);

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
            <img src="/openclaw.png" alt="OpenClaw" className="header__logo" />
            <span className="header__brand">OpenClaw Rankings</span>
          </div>
          <div className="header__right">
            <a href="#methodology" className="header__link">Methodology</a>
            <a href="#" className="header__link" onClick={(e) => { e.preventDefault(); setShowSubmit(true); }}>Submit a Provider</a>
            <span className="header__updated">Last updated: February 2026</span>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="hero fade-up">
        <div className="hero__glow" aria-hidden="true" />
        <h1 className="hero__title">Best OpenClaw Hosting Providers in 2026</h1>
        <p className="hero__subtitle">
          Independently reviewed and ranked by the community. Evaluated on
          Docker isolation, TLS configuration, messaging integrations, uptime, and pricing.
        </p>
        <div className="hero__stats">
          <span>3,064 providers</span>
          <span className="hero__stats-dot" />
          <span>54.6k+ community votes</span>
          <span className="hero__stats-dot" />
          <span>Updated Feb 2026</span>
        </div>
        <button className="hero__submit" onClick={() => setShowSubmit(true)}>
          Submit a Provider
        </button>
      </section>

      {/* Tabs */}
      <div className="tabs fade-up" style={{ transitionDelay: "80ms" }}>
        <div className="tabs__track">
          <button
            className={`tabs__btn${activeTab === "oneclick" ? " tabs__btn--active" : ""}`}
            onClick={() => setActiveTab("oneclick")}
          >
            One-Click Setup
          </button>
          <button
            className={`tabs__btn${activeTab === "manual" ? " tabs__btn--active" : ""}`}
            onClick={() => setActiveTab("manual")}
          >
            Manual Setup
          </button>
        </div>
      </div>

      {/* Cards */}
      <section className="cards">
        <div className="cards__list" key={activeTab}>
          {providers.map((p, i) => (
            <div key={p.name}>
              {i === 3 && (
                <div className="divider">
                  <span className="divider__text">Also considered</span>
                </div>
              )}
              <ProviderCard provider={p} rank={i + 1} index={i} />
            </div>
          ))}
        </div>
      </section>

      {/* Trend Graph */}
      <ProvidersUnderReview onSubmit={() => setShowSubmit(true)} />

      {/* Methodology */}
      <section className="methodology fade-up" id="methodology">
        <div className="methodology__inner">
          <h2 className="methodology__title">How We Rank Providers</h2>
          <p className="methodology__text">
            We evaluate each provider across six criteria: setup time, per-agent
            Docker isolation, automatic TLS provisioning, built-in messaging
            channel support (WhatsApp, Telegram, Discord, Slack), monthly cost,
            and platform maturity. Scores are weighted &mdash; Docker isolation
            and messaging support carry the highest weight since they&apos;re the
            hardest to configure manually. Community votes factor into the final
            ranking. We re-test quarterly and update rankings as providers ship
            new features.
          </p>
          <div className="criteria">
            {methodologyCriteria.map((c) => (
              <div key={c.label} className="criteria__card">
                <span className="criteria__icon">{c.icon}</span>
                <span className="criteria__label">{c.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer__inner">
          <div className="footer__brand">OpenClaw Rankings</div>
          <div className="footer__links">
            <a href="#">About</a>
            <span className="footer__dot">&middot;</span>
            <a href="#methodology">Methodology</a>
            <span className="footer__dot">&middot;</span>
            <a href="#" onClick={(e) => { e.preventDefault(); setShowSubmit(true); }}>Submit Provider</a>
            <span className="footer__dot">&middot;</span>
            <a href="#">Contact</a>
          </div>
          <div className="footer__copy">&copy; 2026 OpenClaw Rankings. Independent and community-driven.</div>
        </div>
      </footer>

      {/* Submit Modal */}
      {showSubmit && <SubmitModal onClose={() => setShowSubmit(false)} />}

      {/* ═══ STYLES ═══ */}
      <style>{`

        /* ── Keyframes ── */

        @keyframes card-enter {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes score-fill {
          from { width: 0; }
          to   { width: var(--fill-width); }
        }
        /* ── Grain ── */

        .grain {
          position: fixed; inset: 0; z-index: 9999;
          pointer-events: none; opacity: 0.022;
          mix-blend-mode: multiply;
        }
        .grain svg { display: block; width: 100%; height: 100%; }

        /* ── Scroll reveal ── */

        .fade-up {
          opacity: 0; transform: translateY(24px);
          transition: opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1);
        }
        .fade-up.is-visible { opacity: 1; transform: translateY(0); }

        /* ── Header ── */

        .header {
          background: rgba(255,255,255,0.85);
          backdrop-filter: blur(16px) saturate(1.3);
          -webkit-backdrop-filter: blur(16px) saturate(1.3);
          border-bottom: 1px solid var(--border);
          position: relative; z-index: 100;
        }
        .header__inner {
          max-width: 1100px; margin: 0 auto; padding: 14px 24px;
          display: flex; align-items: center; justify-content: space-between;
        }
        .header__left { display: flex; align-items: center; gap: 10px; }
        .header__logo {
          width: 30px; height: 30px; border-radius: 8px; object-fit: contain;
        }
        .header__brand { font-size: 17px; font-weight: 600; color: var(--text); letter-spacing: -0.01em; }
        .header__right { display: flex; align-items: center; gap: 20px; }
        .header__link { font-size: 13px; font-weight: 450; color: var(--text-muted); transition: color 0.2s ease; }
        .header__link:hover { color: var(--text); }
        .header__updated { font-size: 12px; color: var(--text-dim); }

        /* ── Hero ── */

        .hero {
          position: relative; background: var(--bg-warm);
          text-align: center; padding: 64px 24px 32px; overflow: hidden;
        }
        .hero__glow {
          position: absolute; top: -40%; left: 50%; transform: translateX(-50%);
          width: 700px; height: 500px;
          background: radial-gradient(ellipse 70% 55%, rgba(255,107,74,0.06), transparent 70%);
          pointer-events: none;
        }
        .hero__title {
          position: relative; font-family: var(--font-heading);
          font-size: 40px; font-weight: 400; color: var(--text);
          letter-spacing: -0.01em; line-height: 1.15; margin: 0 auto 14px; max-width: 680px;
        }
        .hero__subtitle {
          position: relative; font-size: 17px; font-weight: 400;
          color: var(--text-secondary); max-width: 560px; margin: 0 auto; line-height: 1.55;
        }
        .hero__stats {
          position: relative; display: flex; align-items: center; justify-content: center;
          gap: 12px; margin-top: 20px; font-size: 13px; color: var(--text-muted); font-weight: 450;
        }
        .hero__stats-dot { width: 3px; height: 3px; border-radius: 50%; background: var(--text-dim); }
        .hero__submit {
          margin-top: 20px;
          padding: 10px 24px;
          font-size: 14px;
          font-family: var(--font-sans);
          font-weight: 500;
          color: var(--accent);
          background: transparent;
          border: 1.5px solid var(--border-hover);
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.25s var(--ease-out-expo);
        }
        .hero__submit:hover {
          background: var(--accent-subtle);
          border-color: var(--accent);
        }

        /* ── Tabs ── */

        .tabs {
          display: flex; justify-content: center; padding: 0 24px 32px; background: var(--bg-warm);
        }
        .tabs__track {
          display: flex; max-width: 380px; width: 100%;
          background: var(--bg-surface); border-radius: 10px; padding: 3px;
        }
        .tabs__btn {
          flex: 1; padding: 9px 20px; border-radius: 8px; border: none;
          font-size: 14px; font-weight: 500; font-family: inherit; cursor: pointer;
          transition: all 0.25s cubic-bezier(0.16,1,0.3,1);
          background: transparent; color: var(--text-muted); letter-spacing: -0.005em;
        }
        .tabs__btn--active {
          background: #fff; color: var(--text);
          box-shadow: 0 1px 3px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.03);
        }
        .tabs__btn:hover:not(.tabs__btn--active) { color: var(--text-secondary); }

        /* ── Cards section ── */

        .cards { padding: 8px 24px 48px; }
        .cards__list {
          max-width: 880px; margin: 0 auto;
          display: flex; flex-direction: column; gap: 14px;
        }

        /* ── Divider ── */

        .divider {
          display: flex; align-items: center; gap: 16px;
          padding: 10px 0 24px;
        }
        .divider::before, .divider::after {
          content: ''; flex: 1; height: 1px; background: #e2e8f0;
        }
        .divider__text {
          font-size: 11px; font-weight: 600; color: #94a3b8;
          text-transform: uppercase; letter-spacing: 0.1em; white-space: nowrap;
        }

        /* ── Card ── */

        .card {
          position: relative; background: #fff;
          border: 1px solid var(--border); border-radius: 14px;
          padding: 22px 28px;
          transition: transform 0.3s cubic-bezier(0.16,1,0.3,1),
                      box-shadow 0.3s cubic-bezier(0.16,1,0.3,1),
                      border-color 0.3s ease;
          box-shadow: 0 1px 2px rgba(0,0,0,0.03);
          animation: card-enter 0.55s cubic-bezier(0.16,1,0.3,1) both;
        }
        .card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(0,0,0,0.06);
          border-color: rgba(0,0,0,0.1);
        }
        .card--clickable { cursor: pointer; }
        .card__popular {
          position: absolute; top: -11px; right: 24px;
          font-size: 11px; font-weight: 600; letter-spacing: 0.04em; text-transform: uppercase;
          color: #fff; background: var(--accent);
          padding: 3px 12px; border-radius: 20px;
          line-height: 1.4;
        }
        .card::after {
          content: ''; position: absolute; inset: -1px; border-radius: 15px;
          background: linear-gradient(135deg, rgba(255,107,74,0.06), transparent 50%, rgba(255,107,74,0.03));
          opacity: 0; transition: opacity 0.3s ease; pointer-events: none; z-index: 0;
        }
        .card:hover::after { opacity: 1; }

        .card__inner {
          display: flex; align-items: flex-start; gap: 24px;
          position: relative; z-index: 1;
        }

        /* ── Vote ── */

        .vote {
          display: flex; flex-direction: column; align-items: center;
          gap: 1px; flex-shrink: 0; min-width: 44px; padding-top: 2px;
        }
        .vote__up, .vote__down {
          background: none; border: none; padding: 5px 8px; cursor: pointer;
          color: var(--text-dim); border-radius: 6px; transition: all 0.2s ease;
          display: flex; align-items: center; justify-content: center;
        }
        .vote__up:hover { color: var(--accent); background: rgba(255,107,74,0.06); }
        .vote__up--active { color: var(--accent); background: rgba(255,107,74,0.1); }
        .vote__up--active:hover { background: rgba(255,107,74,0.14); }
        .vote__down:hover { color: var(--text-secondary); background: rgba(0,0,0,0.03); }
        .vote__down--active { color: #e53e3e; background: rgba(229,62,62,0.08); }
        .vote__down--active:hover { background: rgba(229,62,62,0.12); }
        .vote__count--active { color: var(--accent); }
        .vote__count {
          font-size: 14px; font-weight: 700; color: var(--text);
          line-height: 1; letter-spacing: -0.01em; padding: 1px 0;
        }

        /* ── Card body ── */

        .card__body { flex: 1; min-width: 0; }
        .card__header {
          display: flex; align-items: baseline; gap: 8px;
          margin-bottom: 6px; flex-wrap: wrap;
        }
        .card__rank { font-size: 13px; font-weight: 600; color: var(--text-muted); }
        .card__name {
          font-size: 18px; font-weight: 650; color: var(--text);
          line-height: 1.2; letter-spacing: -0.01em;
        }
        .yc-badge {
          position: relative; display: inline-flex; align-items: center;
          cursor: default; flex-shrink: 0;
        }
        .yc-badge__tooltip {
          position: absolute; bottom: calc(100% + 6px); left: 50%;
          transform: translateX(-50%); white-space: nowrap;
          font-size: 11px; font-weight: 500; color: #fff;
          background: #1a1a1a; padding: 4px 10px; border-radius: 6px;
          opacity: 0; pointer-events: none;
          transition: opacity 0.15s ease, transform 0.15s ease;
          transform: translateX(-50%) translateY(2px);
        }
        .yc-badge__tooltip::after {
          content: ""; position: absolute; top: 100%; left: 50%;
          transform: translateX(-50%);
          border: 4px solid transparent; border-top-color: #1a1a1a;
        }
        .yc-badge:hover .yc-badge__tooltip {
          opacity: 1; transform: translateX(-50%) translateY(0);
        }
        .card__category {
          font-size: 10px; font-weight: 600; color: #475569;
          background: #f1f5f9; padding: 2px 8px; border-radius: 4px;
          text-transform: uppercase; letter-spacing: 0.05em;
        }

        /* Mobile price */
        .card__price-mobile {
          display: none;
          gap: 6px; align-items: baseline;
          margin-bottom: 6px;
        }
        .card__price-mobile-val { font-size: 18px; font-weight: 700; color: var(--text); }
        .card__price-mobile-sub { font-size: 12px; color: var(--text-muted); }

        /* ── Score bar ── */

        .score-bar {
          display: flex; align-items: center; gap: 8px; margin-bottom: 8px;
        }
        .score-bar__number {
          font-size: 15px; font-weight: 700; color: var(--text);
          line-height: 1; min-width: 28px;
        }
        .score-bar__track {
          width: 120px; height: 6px; background: #e2e8f0;
          border-radius: 3px; overflow: hidden; flex-shrink: 0;
        }
        .score-bar__fill {
          height: 100%; border-radius: 3px;
          background: var(--fill-color); width: var(--fill-width);
          animation: score-fill 0.7s cubic-bezier(0.16,1,0.3,1) both;
          animation-delay: 0.2s;
        }

        /* ── Callout ── */

        .card__callout {
          font-size: 13px; font-style: italic; color: var(--text-secondary);
          margin-bottom: 10px; line-height: 1.45;
        }

        /* ── Summary ── */

        .card__summary {
          font-size: 14px; font-weight: 400; color: var(--text-secondary);
          line-height: 1.45; margin-bottom: 10px;
        }

        /* ── Pills ── */

        .card__pills { display: flex; flex-wrap: wrap; gap: 5px; }
        .pill {
          display: inline-flex; align-items: center;
          font-size: 11px; font-weight: 500; padding: 3px 9px;
          border-radius: 5px; white-space: nowrap;
          transition: transform 0.15s ease; letter-spacing: 0.005em;
        }
        .pill:hover { transform: translateY(-1px); }
        .pill--more {
          display: none;
          background: var(--bg-surface); color: var(--text-muted);
          cursor: pointer; border: none; font-family: inherit;
          font-size: 11px; font-weight: 500; padding: 3px 9px;
          border-radius: 5px;
        }

        /* ── Tip ── */

        .card__tip {
          margin-top: 10px; font-size: 12px; color: var(--text-secondary);
          line-height: 1.45; padding: 7px 11px;
          background: rgba(255,107,74,0.03); border-radius: 6px;
          border-left: 2px solid rgba(255,107,74,0.25);
        }
        .card__tip a { color: var(--accent); font-weight: 500; transition: color 0.15s; }
        .card__tip a:hover { color: var(--accent-light); text-decoration: underline; }

        /* ── Card right ── */

        .card__right {
          display: flex; flex-direction: column; align-items: flex-end;
          flex-shrink: 0; text-align: right; min-width: 120px; padding-top: 2px;
        }
        .card__price-sub {
          font-size: 12px; font-weight: 400; color: var(--text-muted);
        }
        .card__price {
          font-size: 12px; font-weight: 400; color: var(--text-muted); margin-bottom: 14px;
        }
        .cta {
          display: inline-block; font-size: 13px; font-weight: 550;
          padding: 8px 20px; border-radius: 8px; text-align: center;
          white-space: nowrap; font-family: inherit;
          transition: all 0.25s cubic-bezier(0.16,1,0.3,1); cursor: pointer;
          background: #fff; color: var(--text-secondary);
          border: 1px solid var(--border); box-shadow: 0 1px 2px rgba(0,0,0,0.03);
        }
        .cta:hover {
          border-color: rgba(0,0,0,0.14); color: var(--text);
          box-shadow: 0 2px 8px rgba(0,0,0,0.06); transform: translateY(-1px);
        }

        /* ── Providers under review ── */

        .review {
          padding: 48px 24px 64px; background: var(--bg-warm);
          border-top: 1px solid var(--border-light);
        }
        .review__inner {
          max-width: 1060px; margin: 0 auto; text-align: center;
        }
        .review__title {
          font-family: var(--font-heading); font-size: 22px; font-weight: 400;
          color: var(--text); margin-bottom: 8px;
        }
        .review__subtitle {
          font-size: 14px; color: var(--text-muted); margin-bottom: 28px;
        }
        .review__card {
          background: #fff; border: 1px solid var(--border); border-radius: 16px;
          padding: 24px 24px 20px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.03);
          text-align: left;
        }
        .review__domains {
          display: flex; flex-wrap: wrap; gap: 8px;
          margin-bottom: 18px;
        }
        .review__domain {
          display: inline-flex; align-items: center;
          background: var(--bg); border: 1px solid var(--border);
          border-radius: 8px; padding: 7px 14px;
          font-size: 13px; font-family: var(--font-mono, ui-monospace, monospace);
          color: var(--text); letter-spacing: -0.01em;
          white-space: nowrap;
          transition: border-color 0.15s ease, box-shadow 0.15s ease;
        }
        .review__domain:hover {
          border-color: rgba(0,0,0,0.12);
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
        }
        .review__footer {
          display: flex; justify-content: center;
          padding-top: 16px; border-top: 1px solid var(--border-light);
        }
        .review__submit {
          font-family: inherit; font-size: 13px; font-weight: 600;
          color: var(--accent); background: rgba(255,107,74,0.06);
          border: 1px solid rgba(255,107,74,0.2); border-radius: 8px;
          padding: 8px 18px; cursor: pointer;
          transition: all 0.2s ease;
        }
        .review__submit:hover {
          background: rgba(255,107,74,0.12);
          border-color: rgba(255,107,74,0.35);
          transform: translateY(-1px);
          box-shadow: 0 2px 8px rgba(255,107,74,0.12);
        }

        /* ── Methodology ── */

        .methodology {
          background: var(--bg); padding: 64px 24px;
          border-top: 1px solid var(--border-light);
        }
        .methodology__inner { max-width: 660px; margin: 0 auto; text-align: center; }
        .methodology__title {
          font-family: var(--font-heading); font-size: 22px; font-weight: 400;
          color: var(--text); margin-bottom: 14px;
        }
        .methodology__text {
          font-size: 14px; font-weight: 400; color: var(--text-secondary);
          line-height: 1.7; margin-bottom: 32px;
        }
        .criteria { display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; }
        .criteria__card {
          display: flex; flex-direction: column; align-items: center;
          gap: 6px; width: 100px; padding: 14px 10px;
          background: var(--bg-warm); border: 1px solid var(--border);
          border-radius: 10px;
          transition: transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s ease;
        }
        .criteria__card:hover { transform: translateY(-2px); box-shadow: 0 4px 16px rgba(0,0,0,0.04); }
        .criteria__icon { font-size: 20px; line-height: 1; }
        .criteria__label { font-size: 11px; font-weight: 500; color: var(--text-secondary); text-align: center; }

        /* ── Footer ── */

        .footer { background: var(--bg-warm); padding: 40px 24px; border-top: 1px solid var(--border); }
        .footer__inner { max-width: 1100px; margin: 0 auto; text-align: center; }
        .footer__brand { font-size: 14px; font-weight: 600; color: var(--text); margin-bottom: 10px; }
        .footer__links { display: flex; justify-content: center; align-items: center; gap: 10px; margin-bottom: 14px; }
        .footer__links a { font-size: 13px; color: var(--text-secondary); transition: color 0.2s ease; }
        .footer__links a:hover { color: var(--accent); }
        .footer__dot { color: var(--text-dim); font-size: 13px; }
        .footer__copy { font-size: 12px; color: var(--text-muted); }

        /* ── Submit Modal ── */

        .modal-overlay {
          position: fixed; inset: 0; z-index: 10000;
          background: rgba(0,0,0,0.4); backdrop-filter: blur(4px);
          display: flex; align-items: center; justify-content: center;
          padding: 20px;
          animation: overlay-in 0.2s ease;
        }
        @keyframes overlay-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .modal {
          position: relative; background: #fff; border-radius: 16px;
          padding: 36px 32px 32px; width: 100%; max-width: 440px;
          box-shadow: 0 24px 80px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.05);
          animation: modal-in 0.25s cubic-bezier(0.16,1,0.3,1);
        }
        @keyframes modal-in {
          from { opacity: 0; transform: translateY(12px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .modal__close {
          position: absolute; top: 16px; right: 16px;
          background: none; border: none; padding: 6px; cursor: pointer;
          color: var(--text-muted); border-radius: 8px;
          transition: all 0.15s ease;
          display: flex; align-items: center; justify-content: center;
        }
        .modal__close:hover { background: rgba(0,0,0,0.05); color: var(--text); }
        .modal__title {
          font-family: var(--font-heading); font-size: 20px; font-weight: 500;
          color: var(--text); margin-bottom: 6px;
        }
        .modal__desc {
          font-size: 14px; color: var(--text-muted); margin-bottom: 24px; line-height: 1.5;
        }
        .modal__form { display: flex; flex-direction: column; gap: 16px; }
        .modal__field { display: flex; flex-direction: column; gap: 6px; }
        .modal__label {
          font-size: 13px; font-weight: 500; color: var(--text-secondary);
        }
        .modal__input {
          font-family: inherit; font-size: 14px; color: var(--text);
          background: var(--bg); border: 1px solid var(--border);
          border-radius: 10px; padding: 10px 14px;
          transition: border-color 0.15s ease, box-shadow 0.15s ease;
          outline: none;
        }
        .modal__input::placeholder { color: var(--text-dim); }
        .modal__input:focus {
          border-color: var(--accent);
          box-shadow: 0 0 0 3px rgba(255,107,74,0.1);
        }
        .modal__textarea { resize: vertical; min-height: 72px; }
        .modal__submit {
          font-family: inherit; font-size: 14px; font-weight: 600;
          color: #fff; background: var(--accent);
          border: none; border-radius: 10px; padding: 12px 20px;
          cursor: pointer; transition: all 0.2s ease; margin-top: 4px;
        }
        .modal__submit:hover {
          background: #e85d3a; transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(255,107,74,0.25);
        }
        .modal__success {
          text-align: center; padding: 8px 0;
        }
        .modal__success-icon { margin-bottom: 16px; }
        .modal__success .modal__title { margin-bottom: 10px; }
        .modal__success .modal__desc { margin-bottom: 28px; }

        /* ═══ RESPONSIVE ═══ */

        @media (max-width: 1024px) {
          .cards { padding: 8px 24px 40px; }
          .cards__list { max-width: 100%; }
        }

        @media (max-width: 768px) {
          .header__inner { flex-direction: column; gap: 8px; }
          .header__right { gap: 12px; flex-wrap: wrap; justify-content: center; }
          .header__link { display: none; }

          .hero { padding: 44px 20px 28px; }
          .hero__title { font-size: 28px; }
          .hero__subtitle { font-size: 15px; }
          .hero__stats { font-size: 12px; gap: 8px; }
          .hero__glow { width: 400px; height: 300px; }

          .tabs { padding: 0 16px 24px; }
          .tabs__track { max-width: 320px; }
          .tabs__btn { font-size: 13px; padding: 8px 16px; }

          .cards { padding: 0 16px 36px; }
          .card { padding: 18px; border-radius: 12px; }
          .card__inner { flex-direction: column; gap: 0; }

          .vote {
            flex-direction: row; gap: 6px; min-width: unset;
            padding-bottom: 10px; margin-bottom: 10px;
            border-bottom: 1px solid var(--border-light); width: 100%;
          }
          .vote__count { order: -1; min-width: 36px; text-align: center; }

          .card__body { width: 100%; }
          .card__name { font-size: 16px; }

          .card__price-mobile { display: flex; }

          .card__right { display: none; }

          .score-bar__track { width: 80px; }

          /* Mobile pill overflow */
          .pill--more { display: inline-flex; }
          .card__pills:not(.card__pills--expanded) .pill--hideable { display: none; }
          .card__pills--expanded .pill--more { display: none; }

          .review { padding: 36px 16px 48px; }
          .review__card { padding: 18px 14px 16px; }
          .review__domains { gap: 6px; }
          .review__domain { padding: 5px 10px; font-size: 11.5px; }

          .methodology { padding: 40px 20px; }
          .criteria { gap: 8px; }
          .criteria__card { width: 86px; padding: 12px 6px; }
          .criteria__label { font-size: 10px; }

          .footer { padding: 32px 20px; }
        }

        @media (max-width: 420px) {
          .hero__title { font-size: 24px; }
          .pill { font-size: 10px; padding: 2px 7px; }
          .card__name { font-size: 15px; }
          .criteria__card { width: 76px; padding: 10px 4px; }
        }
      `}</style>
    </>
  );
}
