import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500&family=JetBrains+Mono:wght@400;500&display=swap');
  :root {
    --bg: #080808; --surface: #111111; --border: #222222;
    --accent: #00ff87; --text: #f0f0f0; --muted: #666666;
    --font-display: 'Bebas Neue', sans-serif;
    --font-body: 'DM Sans', sans-serif;
    --font-mono: 'JetBrains Mono', monospace;
  }
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  .lg-root {
    min-height: 100vh; background: var(--bg); color: var(--text);
    font-family: var(--font-body);
    display: grid; grid-template-columns: 1fr 1fr;
  }
  .lg-left {
    display: flex; flex-direction: column; justify-content: space-between;
    padding: 3rem; border-right: 1px solid var(--border);
    position: relative; overflow: hidden;
  }
  .lg-grid-bg {
    position: absolute; inset: 0;
    background-image: linear-gradient(var(--border) 1px, transparent 1px),
      linear-gradient(90deg, var(--border) 1px, transparent 1px);
    background-size: 48px 48px; opacity: 0.5;
  }
  .lg-grid-fade {
    position: absolute; inset: 0;
    background: radial-gradient(ellipse at 30% 60%, rgba(0,255,135,0.06) 0%, transparent 65%);
  }
  .lg-logo {
    position: relative; z-index: 2;
    font-family: var(--font-display); font-size: 1.6rem;
    letter-spacing: 0.08em; color: var(--text);
  }
  .lg-logo span { color: var(--accent); }
  .lg-left-body { position: relative; z-index: 2; }
  .lg-big-title {
    font-family: var(--font-display);
    font-size: clamp(4rem, 6vw, 6.5rem);
    line-height: 0.92; letter-spacing: 0.02em;
    margin-bottom: 1.5rem;
  }
  .lg-big-title .accent { color: var(--accent); }
  .lg-big-title .outline { -webkit-text-stroke: 1px var(--text); color: transparent; }
  .lg-left-desc {
    font-size: 0.9rem; font-weight: 300; color: var(--muted); line-height: 1.7;
  }
  .lg-left-footer {
    position: relative; z-index: 2;
    font-family: var(--font-mono); font-size: 0.62rem;
    letter-spacing: 0.15em; text-transform: uppercase; color: var(--muted);
  }
  /* RIGHT */
  .lg-right {
    display: flex; align-items: center; justify-content: center; padding: 3rem;
  }
  .lg-card { width: 100%; max-width: 400px; }
  .lg-eyebrow {
    font-family: var(--font-mono); font-size: 0.68rem;
    letter-spacing: 0.2em; text-transform: uppercase;
    color: var(--accent); margin-bottom: 1rem;
    display: flex; align-items: center; gap: 0.6rem;
  }
  .lg-eyebrow::before { content: ''; display: block; width: 1.5rem; height: 1px; background: var(--accent); }
  .lg-title {
    font-family: var(--font-display); font-size: 3.5rem;
    letter-spacing: 0.03em; line-height: 1; margin-bottom: 0.5rem;
  }
  .lg-subtitle { font-size: 0.88rem; font-weight: 300; color: var(--muted); margin-bottom: 2.5rem; }
  .lg-subtitle a { color: var(--accent); text-decoration: none; }
  .lg-field { margin-bottom: 1.25rem; }
  .lg-label {
    font-family: var(--font-mono); font-size: 0.62rem;
    letter-spacing: 0.15em; text-transform: uppercase;
    color: var(--muted); display: block; margin-bottom: 0.5rem;
  }
  .lg-input {
    width: 100%; background: var(--surface);
    border: 1px solid var(--border); border-bottom: 1px solid #333;
    padding: 0.85rem 1rem; color: var(--text);
    font-family: var(--font-body); font-size: 0.92rem;
    outline: none; transition: border-color 0.2s;
  }
  .lg-input::placeholder { color: var(--muted); }
  .lg-input:focus { border-color: var(--accent); }
  .lg-forgot {
    display: block; text-align: right; margin-top: 0.4rem;
    font-family: var(--font-mono); font-size: 0.6rem;
    letter-spacing: 0.1em; text-transform: uppercase;
    color: var(--muted); text-decoration: none; transition: color 0.2s;
  }
  .lg-forgot:hover { color: var(--text); }
  .lg-btn {
    width: 100%; margin-top: 2rem; padding: 0.9rem;
    background: var(--accent); color: #000; border: none;
    font-family: var(--font-mono); font-size: 0.75rem;
    letter-spacing: 0.15em; text-transform: uppercase;
    font-weight: 500; cursor: pointer; transition: all 0.2s;
  }
  .lg-btn:hover { background: #00e87a; transform: translateY(-2px); }
  .lg-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
  .lg-error {
    margin-top: 1rem; padding: 0.75rem 1rem;
    border: 1px solid rgba(255,60,110,0.3);
    background: rgba(255,60,110,0.07);
    font-family: var(--font-mono); font-size: 0.68rem;
    letter-spacing: 0.1em; color: #ff3c6e;
  }
  @media (max-width: 768px) {
    .lg-root { grid-template-columns: 1fr; }
    .lg-left { display: none; }
  }
`;

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", formData);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/");
    } catch {
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <style>{styles}</style>
      <div className="lg-root">

        {/* Left Panel */}
        <div className="lg-left">
          <div className="lg-grid-bg" />
          <div className="lg-grid-fade" />
          <div className="lg-logo">Dev<span>Connect</span></div>
          <div className="lg-left-body">
            <h2 className="lg-big-title">
              <span>BUILD.</span><br />
              <span className="accent">GROW.</span><br />
              <span className="outline">HIRE.</span>
            </h2>
            <p className="lg-left-desc">
              The platform where developers and<br />
              great companies find each other.
            </p>
          </div>
          <div className="lg-left-footer">© 2025 DevConnect</div>
        </div>

        {/* Right Panel */}
        <div className="lg-right">
          <div className="lg-card">
            <p className="lg-eyebrow">Welcome back</p>
            <h1 className="lg-title">LOG IN</h1>
            <p className="lg-subtitle">
              No account? <a href="/register">Sign up free →</a>
            </p>

            <form onSubmit={handleSubmit}>
              <div className="lg-field">
                <label className="lg-label">Email</label>
                <input
                  className="lg-input" type="email" name="email"
                  placeholder="you@example.com"
                  value={formData.email} onChange={handleChange} required
                />
              </div>
              <div className="lg-field">
                <label className="lg-label">Password</label>
                <input
                  className="lg-input" type="password" name="password"
                  placeholder="••••••••"
                  value={formData.password} onChange={handleChange} required
                />
                <a href="/forgot-password" className="lg-forgot">Forgot password?</a>
              </div>
              {error && <div className="lg-error">{error}</div>}
              <button className="lg-btn" type="submit" disabled={loading}>
                {loading ? "Authenticating..." : "Login →"}
              </button>
            </form>
          </div>
        </div>

      </div>
    </>
  );
}