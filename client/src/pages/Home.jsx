import { useState, useEffect } from "react";
import axios from "axios";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&family=JetBrains+Mono:wght@400;500&display=swap');

  :root {
    --bg: #080808;
    --surface: #111111;
    --surface2: #1a1a1a;
    --border: #222222;
    --accent: #00ff87;
    --accent2: #ff3c6e;
    --text: #f0f0f0;
    --muted: #666666;
    --font-display: 'Bebas Neue', sans-serif;
    --font-body: 'DM Sans', sans-serif;
    --font-mono: 'JetBrains Mono', monospace;
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .dc-root {
    background: var(--bg);
    color: var(--text);
    font-family: var(--font-body);
    min-height: 100vh;
    overflow-x: hidden;
  }

  /* NAV */
  .dc-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem 3rem;
    border-bottom: 1px solid var(--border);
    position: sticky;
    top: 0;
    z-index: 100;
    background: rgba(8,8,8,0.85);
    backdrop-filter: blur(12px);
  }
  .dc-logo {
    font-family: var(--font-display);
    font-size: 1.6rem;
    letter-spacing: 0.08em;
    color: var(--text);
  }
  .dc-logo span { color: var(--accent); }
  .dc-nav-links {
    display: flex;
    gap: 2rem;
    list-style: none;
  }
  .dc-nav-links a {
    font-family: var(--font-mono);
    font-size: 0.72rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--muted);
    text-decoration: none;
    transition: color 0.2s;
  }
  .dc-nav-links a:hover { color: var(--text); }
  .dc-nav-cta {
    font-family: var(--font-mono);
    font-size: 0.72rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    background: var(--accent);
    color: #000;
    border: none;
    padding: 0.55rem 1.2rem;
    cursor: pointer;
    font-weight: 500;
    transition: background 0.2s, transform 0.15s;
  }
  .dc-nav-cta:hover { background: #00e87a; transform: translateY(-1px); }

  /* HERO */
  .dc-hero {
    display: grid;
    grid-template-columns: 1fr 1fr;
    min-height: 88vh;
    border-bottom: 1px solid var(--border);
  }
  .dc-hero-left {
    padding: 5rem 3rem 5rem 3rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-right: 1px solid var(--border);
    position: relative;
  }
  .dc-hero-eyebrow {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.6rem;
  }
  .dc-hero-eyebrow::before {
    content: '';
    display: block;
    width: 2rem;
    height: 1px;
    background: var(--accent);
  }
  .dc-hero-title {
    font-family: var(--font-display);
    font-size: clamp(4rem, 7vw, 7rem);
    line-height: 0.92;
    letter-spacing: 0.02em;
    margin-bottom: 2rem;
  }
  .dc-hero-title .line2 { color: var(--accent); }
  .dc-hero-title .line3 {
    -webkit-text-stroke: 1px var(--text);
    color: transparent;
  }
  .dc-hero-desc {
    font-size: 1rem;
    font-weight: 300;
    color: var(--muted);
    line-height: 1.7;
    max-width: 38ch;
    margin-bottom: 3rem;
  }
  .dc-hero-actions {
    display: flex;
    align-items: center;
    gap: 1.5rem;
  }
  .dc-btn-primary {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    background: var(--accent);
    color: #000;
    border: none;
    padding: 0.85rem 2rem;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.2s;
  }
  .dc-btn-primary:hover { background: #00e87a; transform: translateY(-2px); }
  .dc-btn-ghost {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    background: transparent;
    color: var(--muted);
    border: 1px solid var(--border);
    padding: 0.85rem 2rem;
    cursor: pointer;
    transition: all 0.2s;
  }
  .dc-btn-ghost:hover { border-color: var(--text); color: var(--text); }

  .dc-hero-right {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 3rem;
    position: relative;
    overflow: hidden;
  }
  .dc-hero-grid-bg {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(var(--border) 1px, transparent 1px),
      linear-gradient(90deg, var(--border) 1px, transparent 1px);
    background-size: 48px 48px;
    opacity: 0.5;
  }
  .dc-hero-grid-fade {
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at 60% 50%, transparent 20%, var(--bg) 75%);
  }
  .dc-hero-stat-grid {
    position: relative;
    z-index: 2;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1px;
    background: var(--border);
    border: 1px solid var(--border);
  }
  .dc-stat {
    background: var(--surface);
    padding: 2rem 1.5rem;
    transition: background 0.2s;
  }
  .dc-stat:hover { background: var(--surface2); }
  .dc-stat-num {
    font-family: var(--font-display);
    font-size: 3rem;
    line-height: 1;
    color: var(--accent);
    margin-bottom: 0.4rem;
  }
  .dc-stat-label {
    font-family: var(--font-mono);
    font-size: 0.65rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--muted);
  }

  /* TICKER */
  .dc-ticker {
    border-bottom: 1px solid var(--border);
    overflow: hidden;
    padding: 0.75rem 0;
    background: var(--surface);
  }
  .dc-ticker-inner {
    display: flex;
    gap: 4rem;
    animation: ticker 22s linear infinite;
    white-space: nowrap;
  }
  @keyframes ticker {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  .dc-ticker-item {
    font-family: var(--font-mono);
    font-size: 0.68rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--muted);
    display: flex;
    align-items: center;
    gap: 0.8rem;
    flex-shrink: 0;
  }
  .dc-ticker-dot {
    width: 4px; height: 4px;
    border-radius: 50%;
    background: var(--accent);
  }

  /* FEATURES */
  .dc-features {
    padding: 6rem 3rem;
    border-bottom: 1px solid var(--border);
  }
  .dc-section-header {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    margin-bottom: 4rem;
  }
  .dc-section-title {
    font-family: var(--font-display);
    font-size: clamp(2.5rem, 4vw, 4rem);
    letter-spacing: 0.03em;
  }
  .dc-section-num {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    color: var(--muted);
    letter-spacing: 0.15em;
  }
  .dc-features-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1px;
    background: var(--border);
    border: 1px solid var(--border);
  }
  .dc-feature-card {
    background: var(--surface);
    padding: 2.5rem 2rem;
    position: relative;
    overflow: hidden;
    transition: background 0.25s;
  }
  .dc-feature-card:hover { background: var(--surface2); }
  .dc-feature-card::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0;
    height: 2px; width: 0;
    background: var(--accent);
    transition: width 0.35s ease;
  }
  .dc-feature-card:hover::after { width: 100%; }
  .dc-feature-icon {
    font-size: 1.6rem;
    margin-bottom: 1.5rem;
    display: block;
  }
  .dc-feature-num {
    font-family: var(--font-mono);
    font-size: 0.6rem;
    color: var(--accent);
    letter-spacing: 0.2em;
    margin-bottom: 0.75rem;
  }
  .dc-feature-title {
    font-family: var(--font-display);
    font-size: 1.8rem;
    letter-spacing: 0.03em;
    margin-bottom: 1rem;
  }
  .dc-feature-desc {
    font-size: 0.88rem;
    font-weight: 300;
    color: var(--muted);
    line-height: 1.75;
  }

  /* POSTS */
  .dc-posts {
    padding: 6rem 3rem;
  }
  .dc-posts-list {
    max-width: 780px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 1px;
    background: var(--border);
    border: 1px solid var(--border);
  }
  .dc-post-card {
    background: var(--surface);
    padding: 1.75rem 2rem;
    display: flex;
    gap: 1.5rem;
    align-items: flex-start;
    transition: background 0.2s;
    cursor: pointer;
  }
  .dc-post-card:hover { background: var(--surface2); }
  .dc-post-index {
    font-family: var(--font-mono);
    font-size: 0.65rem;
    color: var(--muted);
    padding-top: 0.2rem;
    min-width: 2rem;
    flex-shrink: 0;
  }
  .dc-post-content {
    flex: 1;
  }
  .dc-post-text {
    font-size: 0.95rem;
    font-weight: 400;
    line-height: 1.65;
    color: var(--text);
    margin-bottom: 0.75rem;
  }
  .dc-post-meta {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  .dc-post-tag {
    font-family: var(--font-mono);
    font-size: 0.6rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--accent);
    background: rgba(0,255,135,0.07);
    padding: 0.2rem 0.6rem;
    border: 1px solid rgba(0,255,135,0.15);
  }
  .dc-post-time {
    font-family: var(--font-mono);
    font-size: 0.6rem;
    color: var(--muted);
    letter-spacing: 0.1em;
  }
  .dc-post-arrow {
    font-size: 0.8rem;
    color: var(--muted);
    transition: color 0.2s, transform 0.2s;
    padding-top: 0.15rem;
  }
  .dc-post-card:hover .dc-post-arrow { color: var(--accent); transform: translateX(4px); }

  .dc-empty {
    text-align: center;
    padding: 4rem 2rem;
    background: var(--surface);
  }
  .dc-empty-icon { font-size: 2.5rem; margin-bottom: 1rem; }
  .dc-empty-text {
    font-family: var(--font-mono);
    font-size: 0.72rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--muted);
  }

  /* LOADING */
  .dc-skeleton {
    background: var(--surface);
    padding: 1.75rem 2rem;
    display: flex;
    gap: 1.5rem;
  }
  .dc-skel-bar {
    height: 14px;
    background: var(--surface2);
    border-radius: 2px;
    animation: pulse 1.5s ease-in-out infinite;
  }
  @keyframes pulse {
    0%, 100% { opacity: 0.4; }
    50% { opacity: 1; }
  }

  /* FOOTER */
  .dc-footer {
    border-top: 1px solid var(--border);
    padding: 2rem 3rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .dc-footer-logo {
    font-family: var(--font-display);
    font-size: 1.2rem;
    letter-spacing: 0.08em;
    color: var(--muted);
  }
  .dc-footer-logo span { color: var(--accent); }
  .dc-footer-copy {
    font-family: var(--font-mono);
    font-size: 0.62rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--muted);
  }

  @media (max-width: 768px) {
    .dc-nav { padding: 1.2rem 1.5rem; }
    .dc-nav-links { display: none; }
    .dc-hero { grid-template-columns: 1fr; min-height: auto; }
    .dc-hero-left { padding: 3rem 1.5rem; }
    .dc-hero-right { display: none; }
    .dc-features { padding: 4rem 1.5rem; }
    .dc-features-grid { grid-template-columns: 1fr; }
    .dc-posts { padding: 4rem 1.5rem; }
    .dc-footer { flex-direction: column; gap: 1rem; padding: 2rem 1.5rem; }
  }
`;

const tickerItems = [
  "Developer Profiles", "Real-Time Chat", "Job Board",
  "Open Source", "Code Reviews", "Pair Programming",
  "Developer Profiles", "Real-Time Chat", "Job Board",
  "Open Source", "Code Reviews", "Pair Programming",
];

const features = [
  {
    icon: "◈",
    num: "01",
    title: "Developer Profiles",
    desc: "Build a living portfolio that shows your stack, contributions, and projects — not just a resume.",
  },
  {
    icon: "⌁",
    num: "02",
    title: "Real-Time Chat",
    desc: "Instant messaging with syntax highlighting, file sharing, and threaded code reviews.",
  },
  {
    icon: "⊞",
    num: "03",
    title: "Job Board",
    desc: "Curated opportunities from vetted companies. Apply with your DevConnect profile in one click.",
  },
];

function SkeletonPost() {
  return (
    <div className="dc-skeleton">
      <div style={{ minWidth: "2rem" }}>
        <div className="dc-skel-bar" style={{ width: "1.5rem" }} />
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "0.6rem" }}>
        <div className="dc-skel-bar" style={{ width: "90%" }} />
        <div className="dc-skel-bar" style={{ width: "65%" }} />
        <div className="dc-skel-bar" style={{ width: "30%", marginTop: "0.3rem" }} />
      </div>
    </div>
  );
}

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await axios.get("http://localhost:5000/api/posts");
        setPosts(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  return (
    <>
      <style>{styles}</style>
      <div className="dc-root">

        {/* NAV */}
        <nav className="dc-nav">
          <div className="dc-logo">Dev<span>Connect</span></div>
          <ul className="dc-nav-links">
            <li><a href="#">Profiles</a></li>
            <li><a href="#">Jobs</a></li>
            <li><a href="#">Community</a></li>
            <li><a href="#">Docs</a></li>
          </ul>
          <button className="dc-nav-cta">Sign Up Free</button>
        </nav>

        {/* HERO */}
        <section className="dc-hero">
          <div className="dc-hero-left">
            <p className="dc-hero-eyebrow">For developers, by developers</p>
            <h1 className="dc-hero-title">
              <span className="line1">CONNECT.</span><br />
              <span className="line2">COLLAB.</span><br />
              <span className="line3">CODE.</span>
            </h1>
            <p className="dc-hero-desc">
              DevConnect brings together developers and recruiters in one focused platform — profiles, real-time collaboration, and a job board built for engineers.
            </p>
            <div className="dc-hero-actions">
              <button className="dc-btn-primary">Get Started →</button>
              <button className="dc-btn-ghost">View Demo</button>
            </div>
          </div>

          <div className="dc-hero-right">
            <div className="dc-hero-grid-bg" />
            <div className="dc-hero-grid-fade" />
            <div className="dc-hero-stat-grid">
              {[
                { num: "12K+", label: "Developers" },
                { num: "340+", label: "Companies" },
                { num: "98%", label: "Hire Rate" },
                { num: "4.9★", label: "Rating" },
              ].map((s) => (
                <div className="dc-stat" key={s.label}>
                  <div className="dc-stat-num">{s.num}</div>
                  <div className="dc-stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TICKER */}
        <div className="dc-ticker">
          <div className="dc-ticker-inner">
            {tickerItems.map((item, i) => (
              <span className="dc-ticker-item" key={i}>
                <span className="dc-ticker-dot" />
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* FEATURES */}
        <section className="dc-features">
          <div className="dc-section-header">
            <h2 className="dc-section-title">FEATURES</h2>
            <span className="dc-section-num">03 modules</span>
          </div>
          <div className="dc-features-grid">
            {features.map((f) => (
              <div className="dc-feature-card" key={f.num}>
                <span className="dc-feature-icon">{f.icon}</span>
                <div className="dc-feature-num">{f.num}</div>
                <h3 className="dc-feature-title">{f.title}</h3>
                <p className="dc-feature-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* POSTS */}
        <section className="dc-posts">
          <div className="dc-section-header">
            <h2 className="dc-section-title">LATEST POSTS</h2>
            <span className="dc-section-num">{loading ? "loading..." : `${posts.length} posts`}</span>
          </div>

          <div className="dc-posts-list">
            {loading ? (
              [1, 2, 3].map((i) => <SkeletonPost key={i} />)
            ) : posts.length === 0 ? (
              <div className="dc-empty">
                <div className="dc-empty-icon">◌</div>
                <p className="dc-empty-text">No posts yet — be the first to share</p>
              </div>
            ) : (
              posts.map((post, i) => (
                <div className="dc-post-card" key={post._id}>
                  <span className="dc-post-index">{String(i + 1).padStart(2, "0")}</span>
                  <div className="dc-post-content">
                    <p className="dc-post-text">{post.content}</p>
                    <div className="dc-post-meta">
                      <span className="dc-post-tag">Post</span>
                      <span className="dc-post-time">Just now</span>
                    </div>
                  </div>
                  <span className="dc-post-arrow">→</span>
                </div>
              ))
            )}
          </div>
        </section>

        {/* FOOTER */}
        <footer className="dc-footer">
          <div className="dc-footer-logo">Dev<span>Connect</span></div>
          <span className="dc-footer-copy">© 2025 DevConnect — All rights reserved</span>
        </footer>
      </div>
    </>
  );
}