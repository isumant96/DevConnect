import { useState } from "react";
import axios from "axios";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400&family=JetBrains+Mono:wght@400;500&display=swap');
  :root{--bg:#080808;--surface:#111111;--border:#222222;--accent:#00ff87;--text:#f0f0f0;--muted:#666666;}
  *{box-sizing:border-box;margin:0;padding:0;}
  .rg-root{
    min-height:100vh;background:var(--bg);color:var(--text);
    font-family:'DM Sans',sans-serif;
    display:grid;grid-template-columns:1fr 1fr;
  }
  .rg-left{
    display:flex;flex-direction:column;justify-content:space-between;
    padding:3rem;border-right:1px solid var(--border);
    position:relative;overflow:hidden;
  }
  .rg-grid-bg{
    position:absolute;inset:0;
    background-image:linear-gradient(var(--border) 1px,transparent 1px),
      linear-gradient(90deg,var(--border) 1px,transparent 1px);
    background-size:48px 48px;opacity:0.5;
  }
  .rg-grid-fade{
    position:absolute;inset:0;
    background:radial-gradient(ellipse at 30% 60%,rgba(0,255,135,0.06) 0%,transparent 65%);
  }
  .rg-logo{position:relative;z-index:2;font-family:'Bebas Neue',sans-serif;font-size:1.6rem;letter-spacing:0.08em;}
  .rg-logo span{color:var(--accent);}
  .rg-left-body{position:relative;z-index:2;}
  .rg-big{font-family:'Bebas Neue',sans-serif;font-size:clamp(4rem,6vw,6.5rem);line-height:0.92;letter-spacing:0.02em;margin-bottom:1.5rem;}
  .rg-big .ac{color:var(--accent);}
  .rg-big .ol{-webkit-text-stroke:1px var(--text);color:transparent;}
  .rg-left-desc{font-size:0.9rem;font-weight:300;color:var(--muted);line-height:1.7;}
  .rg-left-foot{position:relative;z-index:2;font-family:'JetBrains Mono',monospace;font-size:0.62rem;letter-spacing:0.15em;text-transform:uppercase;color:var(--muted);}
  /* right */
  .rg-right{display:flex;align-items:center;justify-content:center;padding:3rem;}
  .rg-card{width:100%;max-width:400px;}
  .rg-eyebrow{font-family:'JetBrains Mono',monospace;font-size:0.68rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--accent);display:flex;align-items:center;gap:0.6rem;margin-bottom:1rem;}
  .rg-eyebrow::before{content:'';width:1.5rem;height:1px;background:var(--accent);display:block;}
  .rg-title{font-family:'Bebas Neue',sans-serif;font-size:3.5rem;letter-spacing:0.03em;line-height:1;margin-bottom:0.5rem;}
  .rg-sub{font-size:0.88rem;font-weight:300;color:var(--muted);margin-bottom:2.5rem;}
  .rg-sub a{color:var(--accent);text-decoration:none;}
  .rg-field{margin-bottom:1.25rem;}
  .rg-label{font-family:'JetBrains Mono',monospace;font-size:0.62rem;letter-spacing:0.15em;text-transform:uppercase;color:var(--muted);display:block;margin-bottom:0.5rem;}
  .rg-input,.rg-select{
    width:100%;background:var(--surface);border:1px solid var(--border);
    padding:0.85rem 1rem;color:var(--text);
    font-family:'DM Sans',sans-serif;font-size:0.92rem;
    outline:none;transition:border-color 0.2s;appearance:none;
  }
  .rg-input::placeholder{color:var(--muted);}
  .rg-input:focus,.rg-select:focus{border-color:var(--accent);}
  .rg-select-wrap{position:relative;}
  .rg-select-wrap::after{content:'↓';position:absolute;right:1rem;top:50%;transform:translateY(-50%);font-size:0.7rem;color:var(--muted);pointer-events:none;font-family:'JetBrains Mono',monospace;}
  .rg-role-grid{display:grid;grid-template-columns:1fr 1fr;gap:1px;background:var(--border);border:1px solid var(--border);}
  .rg-role-btn{
    background:var(--surface);padding:0.75rem;text-align:center;cursor:pointer;border:none;
    font-family:'JetBrains Mono',monospace;font-size:0.68rem;letter-spacing:0.1em;text-transform:uppercase;
    color:var(--muted);transition:all 0.2s;
  }
  .rg-role-btn.active{background:var(--accent);color:#000;}
  .rg-role-btn:not(.active):hover{background:#1a1a1a;color:var(--text);}
  .rg-btn{
    width:100%;margin-top:2rem;padding:0.9rem;
    background:var(--accent);color:#000;border:none;
    font-family:'JetBrains Mono',monospace;font-size:0.75rem;
    letter-spacing:0.15em;text-transform:uppercase;
    font-weight:500;cursor:pointer;transition:all 0.2s;
  }
  .rg-btn:hover{background:#00e87a;transform:translateY(-2px);}
  .rg-btn:disabled{opacity:0.5;cursor:not-allowed;transform:none;}
  .rg-success{margin-top:1rem;padding:0.75rem 1rem;border:1px solid rgba(0,255,135,0.3);background:rgba(0,255,135,0.07);font-family:'JetBrains Mono',monospace;font-size:0.68rem;letter-spacing:0.1em;color:var(--accent);}
  .rg-error{margin-top:1rem;padding:0.75rem 1rem;border:1px solid rgba(255,60,110,0.3);background:rgba(255,60,110,0.07);font-family:'JetBrains Mono',monospace;font-size:0.68rem;letter-spacing:0.1em;color:#ff3c6e;}
  @media(max-width:768px){.rg-root{grid-template-columns:1fr;}.rg-left{display:none;}}
`;

export default function Register() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "developer" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // {type: 'success'|'error', msg}

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setStatus(null);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", formData);
      setStatus({ type: "success", msg: res.data?.message || "Account created! You can now log in." });
    } catch {
      setStatus({ type: "error", msg: "Registration failed. Please try again." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <style>{styles}</style>
      <div className="rg-root">

        <div className="rg-left">
          <div className="rg-grid-bg" /><div className="rg-grid-fade" />
          <div className="rg-logo">Dev<span>Connect</span></div>
          <div className="rg-left-body">
            <h2 className="rg-big">
              <span>BUILD.</span><br />
              <span className="ac">GROW.</span><br />
              <span className="ol">HIRE.</span>
            </h2>
            <p className="rg-left-desc">The platform where developers and<br />great companies find each other.</p>
          </div>
          <div className="rg-left-foot">© 2025 DevConnect</div>
        </div>

        <div className="rg-right">
          <div className="rg-card">
            <p className="rg-eyebrow">Create account</p>
            <h1 className="rg-title">REGISTER</h1>
            <p className="rg-sub">Already have one? <a href="/login">Log in →</a></p>

            <form onSubmit={handleSubmit}>
              <div className="rg-field">
                <label className="rg-label">Name</label>
                <input className="rg-input" type="text" name="name" placeholder="Your full name" value={formData.name} onChange={handleChange} required />
              </div>
              <div className="rg-field">
                <label className="rg-label">Email</label>
                <input className="rg-input" type="email" name="email" placeholder="you@example.com" value={formData.email} onChange={handleChange} required />
              </div>
              <div className="rg-field">
                <label className="rg-label">Password</label>
                <input className="rg-input" type="password" name="password" placeholder="••••••••" value={formData.password} onChange={handleChange} required />
              </div>
              <div className="rg-field">
                <label className="rg-label">Role</label>
                <div className="rg-role-grid">
                  {["developer", "recruiter"].map(r => (
                    <button type="button" key={r} className={`rg-role-btn${formData.role === r ? " active" : ""}`} onClick={() => { setFormData({ ...formData, role: r }); setStatus(null); }}>
                      {r}
                    </button>
                  ))}
                </div>
              </div>
              {status && <div className={status.type === "success" ? "rg-success" : "rg-error"}>{status.msg}</div>}
              <button className="rg-btn" type="submit" disabled={loading}>
                {loading ? "Creating account..." : "Register →"}
              </button>
            </form>
          </div>
        </div>

      </div>
    </>
  );
}