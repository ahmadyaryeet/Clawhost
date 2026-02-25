export default function Home() {
  return (
    <>
      {/* ── Nav ── */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: "#fff",
          borderBottom: "1px solid #e6e6e6",
          height: 57,
        }}
      >
        <div
          style={{
            maxWidth: 1192,
            margin: "0 auto",
            padding: "0 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "100%",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                background: "#242424",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontSize: 16,
                fontWeight: 700,
                fontFamily: "Georgia, serif",
              }}
            >
              C
            </span>
            <span
              style={{
                fontFamily: "Georgia, serif",
                fontWeight: 700,
                fontSize: 22,
                color: "#242424",
                letterSpacing: "-0.5px",
              }}
            >
              ClawCloud
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <a href="#" style={{ fontSize: 14, color: "#242424" }}>
              Sign in
            </a>
            <a
              href="#"
              style={{
                fontSize: 14,
                color: "#fff",
                background: "#1a8917",
                borderRadius: 20,
                padding: "8px 16px",
                fontWeight: 500,
              }}
            >
              Sign up
            </a>
            <a
              href="#"
              className="nav-getapp"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                fontSize: 14,
                color: "#fff",
                background: "#242424",
                borderRadius: 20,
                padding: "8px 16px",
                fontWeight: 500,
              }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <rect x="1" y="1" width="7.5" height="7.5" rx="1.5" stroke="white" strokeWidth="1.5" />
                <rect x="11.5" y="1" width="7.5" height="7.5" rx="1.5" stroke="white" strokeWidth="1.5" />
                <rect x="1" y="11.5" width="7.5" height="7.5" rx="1.5" stroke="white" strokeWidth="1.5" />
                <rect x="11.5" y="11.5" width="3" height="3" rx="0.5" stroke="white" strokeWidth="1.5" />
                <path d="M16 11.5v7.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M12.5 15.25h7" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              Get app
            </a>
          </div>
        </div>
      </nav>

      <div className="page-layout">
        {/* ── Left Sidebar ── */}
        <aside className="sidebar">
          <nav style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <a href="#" className="sidebar-link">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z" />
                <path d="M9 21V12h6v9" />
              </svg>
              Home
            </a>
            <a href="#" className="sidebar-link">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                <path d="M8 7h8" />
                <path d="M8 11h5" />
              </svg>
              Library
            </a>
            <a href="#" className="sidebar-link">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="8" r="4" />
                <path d="M5.5 21a6.5 6.5 0 0 1 13 0" />
              </svg>
              Profile
            </a>
            <a href="#" className="sidebar-link">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="3" width="16" height="18" rx="2" />
                <path d="M8 7h8" />
                <path d="M8 11h8" />
                <path d="M8 15h5" />
              </svg>
              Stories
            </a>
            <a href="#" className="sidebar-link">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 20V10" />
                <path d="M9 20V4" />
                <path d="M14 20v-8" />
                <path d="M19 20v-4" />
              </svg>
              Stats
            </a>

            <div style={{ borderTop: "1px solid #e6e6e6", margin: "12px 0" }} />

            <a href="#" className="sidebar-link">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="7" r="3.5" />
                <circle cx="5" cy="10" r="2.5" />
                <circle cx="19" cy="10" r="2.5" />
                <path d="M5.5 21a6.5 6.5 0 0 1 13 0" />
              </svg>
              Following
            </a>
          </nav>
        </aside>

        {/* ── Main Content ── */}
        <main style={{ maxWidth: 680, margin: "0 auto", padding: "40px 20px", flex: 1, minWidth: 0 }}>
        {/* ── Title ── */}
        <h1
          style={{
            fontFamily: "Georgia, serif",
            fontSize: 32,
            fontWeight: 700,
            color: "#242424",
            lineHeight: 1.2,
            letterSpacing: "-0.01em",
            marginBottom: 8,
          }}
          className="article-title"
        >
          Best OpenClaw Hosting Providers 2026
        </h1>

        <p
          style={{
            fontFamily: "Georgia, serif",
            fontSize: 20,
            fontWeight: 400,
            color: "#6b6b6b",
            lineHeight: 1.4,
            marginBottom: 24,
          }}
          className="article-subtitle"
        >
          A practical guide to picking the right home for your AI agents — from
          managed platforms to bare-metal VPS setups.
        </p>

        {/* ── Byline ── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "16px 0",
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #1a8917, #0d5e0b)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontWeight: 700,
              fontSize: 18,
              flexShrink: 0,
            }}
            className="author-avatar"
          >
            RK
          </div>
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                fontSize: 14,
              }}
            >
              <a href="#" style={{ fontWeight: 600, color: "#242424" }}>
                Rauf K.
              </a>
              <span style={{ color: "#6b6b6b" }}>·</span>
              <a href="#" style={{ color: "#1a8917", fontWeight: 500 }}>
                Follow
              </a>
            </div>
            <div style={{ fontSize: 14, color: "#6b6b6b", marginTop: 2 }}>
              8 min read · Jan 15, 2026
            </div>
          </div>
        </div>

        {/* ── Engagement Bar ── */}
        <EngagementBar />

        {/* ── Hero Image ── */}
        <div style={{ margin: "32px 0 8px" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://placehold.co/728x410/f2f2f2/999999?text=Featured+Image"
            alt="Featured"
            style={{
              width: "100%",
              borderRadius: 4,
              display: "block",
            }}
          />
          <p
            style={{
              textAlign: "center",
              fontSize: 13,
              color: "#6b6b6b",
              fontStyle: "italic",
              marginTop: 8,
            }}
          >
            Comparing the top hosting options for OpenClaw in 2026
          </p>
        </div>

        {/* ── Article Body ── */}
        <article className="article-body">
          <p>
            If you&apos;re running OpenClaw agents in production, choosing the
            right hosting provider can make or break your setup. Between{" "}
            <strong>Docker isolation</strong>, auto-TLS, messaging integrations,
            and cost — there&apos;s a lot to get wrong. A bad choice means
            late-night debugging sessions, unexpected bills, and agents that
            silently stop responding at 3 AM.
          </p>

          <p>
            We spent the last three months testing every viable option for
            hosting OpenClaw agents. We deployed identical agent configurations
            across each platform, monitored uptime, measured cold-start latency,
            and stress-tested messaging throughput on WhatsApp, Telegram,
            Discord, and Slack. This article is the result — an honest,{" "}
            <em>opinionated</em> ranking of the best hosting providers available
            right now.
          </p>

          <h2>What We Looked For</h2>

          <p>
            Our evaluation criteria were straightforward. Every provider was
            judged on <strong>ease of setup</strong> (can a solo developer get an
            agent live in under 10 minutes?),{" "}
            <strong>pricing transparency</strong>, Docker support (we need
            isolated containers per agent), automatic TLS provisioning, native
            support for messaging channels, and uptime over a 30-day window.
            Bonus points for an admin dashboard and open-source self-host
            options.
          </p>

          <h2>1. ClawCloud — Best Overall</h2>

          <p>
            <a
              href="https://clawcloud.dev"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#1a8917" }}
            >
              ClawCloud
            </a>{" "}
            is purpose-built for OpenClaw. It&apos;s the only platform that
            treats OpenClaw as a first-class citizen rather than a generic
            container workload. Every agent gets its own{" "}
            <strong>managed Docker container</strong> with isolated networking,
            auto-TLS via Caddy, and WhatsApp, Telegram, Discord, and Slack
            integrations that work out of the box. The admin dashboard gives you
            full visibility into agent health, conversation logs, and billing —
            all from a single pane.
          </p>

          <p>
            What makes ClawCloud stand out is the{" "}
            <strong>one-click deployment</strong>. You connect your messaging
            channels, upload a system prompt, choose your LLM, and you&apos;re
            live. No Dockerfiles, no reverse proxy configs, no DNS headaches. And
            because ClawCloud is{" "}
            <a
              href="#"
              style={{ color: "#1a8917" }}
            >
              fully open source
            </a>
            , you can always eject and self-host if your needs change.
          </p>

          <div className="comparison-box">
            <div
              style={{
                fontWeight: 700,
                fontSize: 16,
                marginBottom: 12,
                fontFamily: "var(--font-sans)",
              }}
            >
              ClawCloud — Quick Overview
            </div>
            <div style={{ marginBottom: 12 }}>
              <strong>Pricing:</strong> Free tier available. Pro starts at
              $29/mo per agent. Volume discounts for 5+ agents.
            </div>
            <div style={{ marginBottom: 8 }}>
              <strong>Pros:</strong>
            </div>
            <ul
              style={{
                paddingLeft: 20,
                marginBottom: 12,
                listStyleType: "disc",
              }}
            >
              <li>One-click deploy — agent live in under 60 seconds</li>
              <li>Managed Docker isolation per agent</li>
              <li>Auto-TLS, no manual certificate management</li>
              <li>WhatsApp, Telegram, Discord, Slack built-in</li>
              <li>Open source — self-host option available</li>
            </ul>
            <div style={{ marginBottom: 8 }}>
              <strong>Cons:</strong>
            </div>
            <ul
              style={{
                paddingLeft: 20,
                marginBottom: 12,
                listStyleType: "disc",
              }}
            >
              <li>Newer platform — smaller community (growing fast)</li>
              <li>Custom Docker images require Pro plan</li>
            </ul>
            <a
              href="https://clawcloud.dev"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "#1a8917",
                fontWeight: 500,
              }}
            >
              Try ClawCloud free →
            </a>
          </div>

          <h2>2. Self-Hosted on Hetzner — Best Budget Option</h2>

          <p>
            If you&apos;re comfortable with the command line, a Hetzner VPS is
            hard to beat on price. Their <code>CX22</code> instance (2 vCPUs, 4
            GB RAM) runs about <strong>€4.15/month</strong> and can comfortably
            host 2–3 OpenClaw agents. You&apos;ll need to handle Docker
            installation, Caddy setup for TLS, and DNS configuration yourself —
            but ClawCloud&apos;s{" "}
            <a
              href="#"
              style={{ color: "#1a8917" }}
            >
              open-source repo
            </a>{" "}
            includes a complete <code>docker-compose.yml</code> that makes the
            initial setup surprisingly painless.
          </p>

          <p>
            The tradeoff is ongoing maintenance. You&apos;re on the hook for
            security patches, Docker updates, certificate renewals (Caddy helps
            here), and monitoring. There&apos;s no dashboard — you&apos;re{" "}
            <code>ssh</code>-ing in and reading logs. For a side project or a
            small team with ops experience, this is the sweet spot. For
            production workloads where downtime costs money, think twice.
          </p>

          <blockquote>
            &ldquo;The best infrastructure is the kind you don&apos;t have to
            think about. But if thinking about infrastructure is your idea of a
            good Friday night, Hetzner is your playground.&rdquo;
          </blockquote>

          <div className="comparison-box">
            <div
              style={{
                fontWeight: 700,
                fontSize: 16,
                marginBottom: 12,
                fontFamily: "var(--font-sans)",
              }}
            >
              Self-Hosted (Hetzner) — Quick Overview
            </div>
            <div style={{ marginBottom: 12 }}>
              <strong>Pricing:</strong> From €4.15/mo (CX22). Add €1/mo for
              backups.
            </div>
            <div style={{ marginBottom: 8 }}>
              <strong>Pros:</strong>
            </div>
            <ul
              style={{
                paddingLeft: 20,
                marginBottom: 12,
                listStyleType: "disc",
              }}
            >
              <li>Cheapest option by far</li>
              <li>Full control over your stack</li>
              <li>EU data centers — great for GDPR compliance</li>
              <li>ClawCloud&apos;s docker-compose makes setup easier</li>
            </ul>
            <div style={{ marginBottom: 8 }}>
              <strong>Cons:</strong>
            </div>
            <ul
              style={{
                paddingLeft: 20,
                marginBottom: 12,
                listStyleType: "disc",
              }}
            >
              <li>Manual setup and maintenance required</li>
              <li>No admin dashboard (unless you build one)</li>
              <li>You handle uptime monitoring yourself</li>
            </ul>
          </div>

          <h2>3. DigitalOcean App Platform — Best for Teams</h2>

          <p>
            DigitalOcean&apos;s App Platform strikes a middle ground. You get
            managed containers without the full PaaS lock-in. Deploying OpenClaw
            is fairly straightforward using their Docker-based deployment, and
            their team management features — role-based access, shared
            environments, audit logs — make it the best choice for teams of 3+
            engineers who need to collaborate on agent infrastructure.
          </p>

          {/* ── Mid-article image ── */}
          <div style={{ margin: "2em 0 8px" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://placehold.co/728x410/f2f2f2/999999?text=Comparison+Chart"
              alt="Hosting comparison chart"
              style={{ width: "100%", borderRadius: 4, display: "block" }}
            />
            <p
              style={{
                textAlign: "center",
                fontSize: 13,
                color: "#6b6b6b",
                fontStyle: "italic",
                marginTop: 8,
              }}
            >
              Head-to-head comparison of the three providers
            </p>
          </div>

          <p>
            Pricing starts at $12/mo for a Basic container, which is enough for
            a single agent. The main downside is that messaging integrations
            aren&apos;t built in — you&apos;ll need to configure webhook
            endpoints manually and handle TLS yourself or use their managed load
            balancer (additional cost). For teams already in the DO ecosystem,
            it&apos;s a natural fit.
          </p>

          <h2>Quick Setup: Deploying on ClawCloud</h2>

          <p>
            Here&apos;s how fast it is to get an OpenClaw agent live on
            ClawCloud. After signing up, you run a single command:
          </p>

          <pre className="code-block">
            <code>{`# Install the ClawCloud CLI
npm install -g @clawcloud/cli

# Login and deploy
claw login
claw init my-agent --template openclaw
claw deploy

# Your agent is live at:
# https://my-agent.clawcloud.dev`}</code>
          </pre>

          <p>
            That&apos;s it. The CLI handles container provisioning, TLS
            certificates, DNS routing, and messaging channel webhooks. You can
            manage everything from the{" "}
            <a
              href="#"
              style={{ color: "#1a8917" }}
            >
              web dashboard
            </a>{" "}
            after deployment.
          </p>

          <p>
            We&apos;ll be updating this guide as new providers enter the market
            and existing ones evolve. For now, <strong>ClawCloud</strong> remains
            our top recommendation for anyone who wants to focus on building
            great agents instead of wrestling with infrastructure...
          </p>
        </article>

        {/* ── Tags ── */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 8,
            marginTop: 40,
            marginBottom: 24,
          }}
        >
          {["OpenClaw", "AI Agents", "Cloud Hosting", "DevOps", "Self-Hosted"].map(
            (tag) => (
              <a
                key={tag}
                href="#"
                style={{
                  background: "#f2f2f2",
                  padding: "8px 16px",
                  borderRadius: 20,
                  fontSize: 13,
                  color: "#242424",
                  fontFamily: "var(--font-sans)",
                }}
              >
                {tag}
              </a>
            )
          )}
        </div>

        {/* ── Engagement Bar (repeated) ── */}
        <EngagementBar />

        {/* ── Author Bio Card ── */}
        <div
          style={{
            display: "flex",
            gap: 16,
            padding: "32px 0",
            borderBottom: "1px solid #e6e6e6",
          }}
        >
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #1a8917, #0d5e0b)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontWeight: 700,
              fontSize: 24,
              flexShrink: 0,
            }}
          >
            RK
          </div>
          <div>
            <div style={{ fontSize: 16, marginBottom: 4 }}>
              Written by{" "}
              <a href="#" style={{ fontWeight: 700, color: "#242424" }}>
                Rauf K.
              </a>
            </div>
            <div
              style={{ fontSize: 14, color: "#6b6b6b", marginBottom: 8 }}
            >
              312 Followers
            </div>
            <p
              style={{
                fontSize: 14,
                color: "#6b6b6b",
                lineHeight: 1.5,
                marginBottom: 12,
              }}
            >
              Building ClawCloud — managed hosting for OpenClaw AI agents.
              Writing about AI infrastructure, DevOps, and the future of
              autonomous agents.
            </p>
            <a
              href="#"
              style={{
                display: "inline-block",
                background: "#1a8917",
                color: "#fff",
                borderRadius: 20,
                padding: "8px 16px",
                fontSize: 14,
                fontWeight: 500,
              }}
            >
              Follow
            </a>
          </div>
        </div>

        {/* ── More from Author ── */}
        <section style={{ padding: "32px 0" }}>
          <h3
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 16,
              fontWeight: 700,
              marginBottom: 20,
            }}
          >
            More from Rauf K.
          </h3>
          <div className="more-articles">
            {[
              {
                title: "Why We Open-Sourced ClawCloud",
                preview:
                  "The story behind our decision to make the entire platform source-available under MIT.",
                read: "5 min read · Dec 8, 2025",
              },
              {
                title: "Docker Isolation Patterns for AI Agents",
                preview:
                  "How to safely sandbox LLM-powered agents that execute arbitrary code.",
                read: "12 min read · Nov 22, 2025",
              },
              {
                title: "Auto-TLS With Caddy: The Complete Guide",
                preview:
                  "Set up automatic HTTPS for any number of services with zero config renewals.",
                read: "7 min read · Oct 15, 2025",
              },
            ].map((item) => (
              <a
                key={item.title}
                href="#"
                className="more-article-card"
              >
                <div style={{ fontFamily: "Georgia, serif", fontWeight: 700, fontSize: 16, marginBottom: 4, color: "#242424" }}>
                  {item.title}
                </div>
                <div style={{ fontSize: 14, color: "#6b6b6b", marginBottom: 4, lineHeight: 1.4 }}>
                  {item.preview}
                </div>
                <div style={{ fontSize: 13, color: "#6b6b6b" }}>
                  {item.read}
                </div>
              </a>
            ))}
          </div>
        </section>
      </main>
      </div>

      {/* ── Footer ── */}
      <footer
        style={{
          background: "#f9f9f9",
          borderTop: "1px solid #e6e6e6",
          padding: "24px 20px",
          marginTop: 40,
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 16,
            maxWidth: 680,
            margin: "0 auto",
            fontSize: 14,
            color: "#6b6b6b",
            fontFamily: "var(--font-sans)",
          }}
        >
          {[
            "Help",
            "Status",
            "About",
            "Careers",
            "Press",
            "Blog",
            "Privacy",
            "Rules",
            "Terms",
            "Text to speech",
          ].map((link) => (
            <a key={link} href="#" style={{ color: "#6b6b6b" }}>
              {link}
            </a>
          ))}
        </div>
      </footer>

      <style>{`
        .article-body {
          font-family: Georgia, "Times New Roman", serif;
          font-size: 21px;
          line-height: 1.58;
          color: #242424;
          letter-spacing: -0.003em;
          word-break: break-word;
        }

        .article-body p {
          margin-bottom: 2em;
        }

        .article-body h2 {
          font-family: Georgia, serif;
          font-size: 22px;
          font-weight: 700;
          color: #242424;
          margin-top: 2em;
          margin-bottom: 0.5em;
          line-height: 1.3;
        }

        .article-body a:hover {
          text-decoration: underline;
        }

        .article-body strong {
          font-weight: 700;
        }

        .article-body em {
          font-style: italic;
        }

        .article-body blockquote {
          border-left: 3px solid #242424;
          padding-left: 20px;
          font-style: italic;
          margin: 2em 0;
          color: #242424;
        }

        .article-body code {
          background: #f0f0f0;
          font-family: Menlo, Monaco, "Courier New", monospace;
          font-size: 85%;
          padding: 2px 6px;
          border-radius: 3px;
        }

        .article-body .code-block {
          background: #f9f9f9;
          font-family: Menlo, Monaco, "Courier New", monospace;
          font-size: 15px;
          padding: 20px;
          border-radius: 4px;
          overflow-x: auto;
          margin: 2em 0;
          line-height: 1.6;
        }

        .article-body .code-block code {
          background: none;
          padding: 0;
          font-size: inherit;
          border-radius: 0;
        }

        .article-body ul {
          font-size: 16px;
          line-height: 1.6;
          font-family: system-ui, -apple-system, sans-serif;
        }

        .article-body ul li {
          margin-bottom: 4px;
        }

        .comparison-box {
          background: #f9f9f9;
          padding: 20px 24px;
          border-radius: 4px;
          margin: 1.5em 0 2em;
          font-family: system-ui, -apple-system, sans-serif;
          font-size: 15px;
          line-height: 1.6;
        }

        .more-articles {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        .more-article-card {
          display: block;
          padding: 16px;
          border-radius: 8px;
          transition: background 0.15s;
        }

        .more-article-card:hover {
          background: #f9f9f9;
        }

        .page-layout {
          display: flex;
          max-width: 1192px;
          margin: 0 auto;
        }

        .sidebar {
          width: 240px;
          flex-shrink: 0;
          padding: 32px 24px;
          border-right: 1px solid #e6e6e6;
          position: sticky;
          top: 57px;
          height: calc(100vh - 57px);
          overflow-y: auto;
        }

        .sidebar-link {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 12px 8px;
          font-size: 15px;
          color: #242424;
          border-radius: 8px;
          transition: background 0.15s;
          font-family: system-ui, -apple-system, sans-serif;
        }

        .sidebar-link:hover {
          background: #f9f9f9;
        }

        .sidebar-link svg {
          flex-shrink: 0;
          color: #6b6b6b;
        }

        .nav-getapp {
          display: inline-flex !important;
        }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .article-title {
            font-size: 28px !important;
          }

          .article-subtitle {
            font-size: 18px !important;
          }

          .article-body {
            font-size: 18px;
          }

          .author-avatar {
            width: 40px !important;
            height: 40px !important;
            font-size: 15px !important;
          }

          .more-articles {
            grid-template-columns: 1fr;
          }

          .sidebar {
            display: none;
          }

          .nav-getapp {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}

function EngagementBar() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderTop: "1px solid #e6e6e6",
        borderBottom: "1px solid #e6e6e6",
        height: 46,
        padding: "0 4px",
        color: "#6b6b6b",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <span
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            fontSize: 14,
            cursor: "pointer",
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M7 11v8a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1h3Zm0 0 3.5-8A2.5 2.5 0 0 1 13 5.5V9h4.3a2 2 0 0 1 1.98 2.27l-1.27 8A2 2 0 0 1 16.03 21H7" />
          </svg>
          247
        </span>
        <span
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            fontSize: 14,
            cursor: "pointer",
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          12
        </span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <span style={{ cursor: "pointer" }}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
          </svg>
        </span>
        <span style={{ cursor: "pointer" }}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
          </svg>
        </span>
        <span style={{ cursor: "pointer" }}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="1" />
            <circle cx="19" cy="12" r="1" />
            <circle cx="5" cy="12" r="1" />
          </svg>
        </span>
      </div>
    </div>
  );
}
