import { useState, useRef } from "react";
import axios from "axios";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500&family=JetBrains+Mono:wght@400;500&display=swap');
  :root{--bg:#080808;--surface:#111111;--surface2:#1a1a1a;--border:#222222;--accent:#00ff87;--text:#f0f0f0;--muted:#666666;}
  *{box-sizing:border-box;margin:0;padding:0;}
  .pr-root{min-height:100vh;background:var(--bg);color:var(--text);font-family:'DM Sans',sans-serif;}
  .pr-nav{display:flex;justify-content:space-between;align-items:center;padding:1.5rem 3rem;border-bottom:1px solid var(--border);position:sticky;top:0;z-index:10;background:rgba(8,8,8,0.85);backdrop-filter:blur(12px);}
  .pr-logo{font-family:'Bebas Neue',sans-serif;font-size:1.6rem;letter-spacing:0.08em;}
  .pr-logo span{color:var(--accent);}
  .pr-body{display:grid;grid-template-columns:300px 1fr;gap:1px;background:var(--border);min-height:calc(100vh - 65px);}
  .pr-sidebar{background:var(--surface);padding:2.5rem 2rem;display:flex;flex-direction:column;gap:2rem;}
  .pr-avatar-wrap{position:relative;width:100px;height:100px;cursor:pointer;}
  .pr-avatar{width:100px;height:100px;object-fit:cover;display:block;border:1px solid var(--border);}
  .pr-avatar-placeholder{width:100px;height:100px;background:var(--surface2);border:1px solid var(--border);display:flex;align-items:center;justify-content:center;font-family:'Bebas Neue',sans-serif;font-size:2.5rem;color:var(--accent);}
  .pr-avatar-overlay{position:absolute;inset:0;background:rgba(0,0,0,0.6);display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity 0.2s;font-family:'JetBrains Mono',monospace;font-size:0.6rem;letter-spacing:0.1em;text-transform:uppercase;color:var(--accent);}
  .pr-avatar-wrap:hover .pr-avatar-overlay{opacity:1;}
  .pr-sidebar-name{font-family:'Bebas Neue',sans-serif;font-size:2.2rem;letter-spacing:0.03em;line-height:0.95;}
  .pr-role{font-family:'JetBrains Mono',monospace;font-size:0.68rem;letter-spacing:0.1em;text-transform:uppercase;color:#000;background:var(--accent);padding:0.2rem 0.6rem;display:inline-block;margin-top:0.5rem;}
  .pr-email{font-family:'JetBrains Mono',monospace;font-size:0.65rem;letter-spacing:0.08em;color:var(--muted);margin-top:0.5rem;}
  .pr-main{background:var(--bg);padding:2.5rem 3rem;display:flex;flex-direction:column;gap:2.5rem;}
  .pr-section-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:1.25rem;}
  .pr-section-title{font-family:'JetBrains Mono',monospace;font-size:0.65rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--accent);display:flex;align-items:center;gap:0.6rem;}
  .pr-section-title::before{content:'';width:1.5rem;height:1px;background:var(--accent);display:block;}
  .pr-edit-btn{font-family:'JetBrains Mono',monospace;font-size:0.6rem;letter-spacing:0.12em;text-transform:uppercase;background:none;border:1px solid var(--border);color:var(--muted);padding:0.3rem 0.75rem;cursor:pointer;transition:all 0.2s;}
  .pr-edit-btn:hover{border-color:var(--accent);color:var(--accent);}
  .pr-save-btn{font-family:'JetBrains Mono',monospace;font-size:0.6rem;letter-spacing:0.12em;text-transform:uppercase;background:var(--accent);border:none;color:#000;padding:0.3rem 0.75rem;cursor:pointer;transition:all 0.2s;}
  .pr-save-btn:hover{background:#00e87a;}
  .pr-save-btn:disabled{opacity:0.5;cursor:not-allowed;}
  .pr-bio-text{font-size:0.92rem;font-weight:300;color:var(--text);line-height:1.75;}
  .pr-bio-empty{font-size:0.88rem;color:var(--muted);font-style:italic;}
  .pr-textarea{width:100%;background:var(--surface);border:1px solid var(--border);padding:0.85rem 1rem;color:var(--text);font-family:'DM Sans',sans-serif;font-size:0.92rem;font-weight:300;line-height:1.75;outline:none;resize:vertical;min-height:100px;transition:border-color 0.2s;}
  .pr-textarea:focus{border-color:var(--accent);}
  .pr-skills{display:flex;flex-wrap:wrap;gap:0.5rem;min-height:2rem;}
  .pr-skill{font-family:'JetBrains Mono',monospace;font-size:0.65rem;letter-spacing:0.1em;text-transform:uppercase;color:var(--text);background:var(--surface);border:1px solid var(--border);padding:0.3rem 0.75rem;display:flex;align-items:center;gap:0.5rem;}
  .pr-skill-remove{background:none;border:none;color:var(--muted);cursor:pointer;font-size:0.8rem;line-height:1;padding:0;transition:color 0.2s;}
  .pr-skill-remove:hover{color:#ff3c6e;}
  .pr-skill-input-row{display:flex;gap:0.5rem;margin-top:0.75rem;}
  .pr-skill-input{flex:1;background:var(--surface);border:1px solid var(--border);padding:0.6rem 0.85rem;color:var(--text);font-family:'JetBrains Mono',monospace;font-size:0.7rem;letter-spacing:0.08em;outline:none;transition:border-color 0.2s;}
  .pr-skill-input:focus{border-color:var(--accent);}
  .pr-skill-add{font-family:'JetBrains Mono',monospace;font-size:0.65rem;letter-spacing:0.1em;text-transform:uppercase;background:none;border:1px solid var(--border);color:var(--muted);padding:0.6rem 1rem;cursor:pointer;transition:all 0.2s;white-space:nowrap;}
  .pr-skill-add:hover{border-color:var(--accent);color:var(--accent);}
  .pr-toast{position:fixed;bottom:2rem;right:2rem;font-family:'JetBrains Mono',monospace;font-size:0.68rem;letter-spacing:0.1em;text-transform:uppercase;padding:0.75rem 1.25rem;border:1px solid rgba(0,255,135,0.3);background:rgba(0,255,135,0.07);color:var(--accent);}
  .pr-toast.error{border-color:rgba(255,60,110,0.3);background:rgba(255,60,110,0.07);color:#ff3c6e;}
  .pr-divider{height:1px;background:var(--border);}
  .pr-empty{display:flex;align-items:center;justify-content:center;min-height:100vh;flex-direction:column;gap:0.5rem;text-align:center;}
  .pr-empty-title{font-family:'Bebas Neue',sans-serif;font-size:3rem;color:var(--muted);}
  .pr-empty-sub{font-family:'JetBrains Mono',monospace;font-size:0.65rem;letter-spacing:0.15em;text-transform:uppercase;color:var(--muted);}
  .pr-empty-sub a{color:var(--accent);text-decoration:none;}
  @media(max-width:768px){
    .pr-nav{padding:1.2rem 1.5rem;}
    .pr-body{grid-template-columns:1fr;}
    .pr-main{padding:2rem 1.5rem;}
  }
`;

export default function Profile() {
  let storedUser = null;
  try { storedUser = JSON.parse(localStorage.getItem("user")); } catch {}

  const fileRef = useRef();
  const [avatar, setAvatar] = useState(storedUser?.avatar || "");
  const [bio, setBio] = useState(storedUser?.bio || "");
  const [editingBio, setEditingBio] = useState(false);
  const [bioInput, setBioInput] = useState("");
  const [skills, setSkills] = useState(storedUser?.skills || []);
  const [skillInput, setSkillInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  function showToast(msg, type = "success") {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }

  async function saveToServer(updates) {
    setSaving(true);
    try {
      const token = localStorage.getItem("token");
      await axios.put("http://localhost:5000/api/auth/profile", updates, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const current = JSON.parse(localStorage.getItem("user"));
      localStorage.setItem("user", JSON.stringify({ ...current, ...updates }));
      showToast("Saved successfully");
    } catch {
      showToast("Failed to save", "error");
    } finally {
      setSaving(false);
    }
  }

  function handleAvatarChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (ev) => {
      const base64 = ev.target.result;
      setAvatar(base64);
      await saveToServer({ avatar: base64, bio, skills });
    };
    reader.readAsDataURL(file);
  }

  async function saveBio() {
    const trimmed = bioInput.trim();
    setBio(trimmed);
    setEditingBio(false);
    await saveToServer({ avatar, bio: trimmed, skills });
  }

  async function addSkill(e) {
    e.preventDefault();
    const s = skillInput.trim();
    if (!s || skills.includes(s)) return setSkillInput("");
    const updated = [...skills, s];
    setSkills(updated);
    setSkillInput("");
    await saveToServer({ avatar, bio, skills: updated });
  }

  async function removeSkill(s) {
    const updated = skills.filter(sk => sk !== s);
    setSkills(updated);
    await saveToServer({ avatar, bio, skills: updated });
  }

  if (!storedUser) return (
    <>
      <style>{styles}</style>
      <div className="pr-root">
        <div className="pr-empty">
          <div className="pr-empty-title">NOT LOGGED IN</div>
          <p className="pr-empty-sub"><a href="/login">Login →</a></p>
        </div>
      </div>
    </>
  );

  return (
    <>
      <style>{styles}</style>
      <div className="pr-root">

        <nav className="pr-nav">
          <div className="pr-logo">Dev<span>Connect</span></div>
        </nav>

        <div className="pr-body">

          <aside className="pr-sidebar">
            <div>
              <input ref={fileRef} type="file" accept="image/*" style={{display:"none"}} onChange={handleAvatarChange} />
              <div className="pr-avatar-wrap" onClick={() => fileRef.current.click()}>
                {avatar
                  ? <img className="pr-avatar" src={avatar} alt="avatar" />
                  : <div className="pr-avatar-placeholder">{storedUser.name?.[0]?.toUpperCase()}</div>
                }
                <div className="pr-avatar-overlay">Change</div>
              </div>
            </div>
            <div>
              <div className="pr-sidebar-name">{storedUser.name}</div>
              <div className="pr-role">{storedUser.role}</div>
              <div className="pr-email">{storedUser.email}</div>
            </div>
          </aside>

          <main className="pr-main">

            <div>
              <div className="pr-section-header">
                <span className="pr-section-title">About</span>
                {editingBio
                  ? <button className="pr-save-btn" onClick={saveBio} disabled={saving}>{saving ? "Saving..." : "Save"}</button>
                  : <button className="pr-edit-btn" onClick={() => { setBioInput(bio); setEditingBio(true); }}>Edit</button>
                }
              </div>
              {editingBio
                ? <textarea className="pr-textarea" value={bioInput} onChange={e => setBioInput(e.target.value)} placeholder="Tell people who you are..." autoFocus />
                : bio
                  ? <p className="pr-bio-text">{bio}</p>
                  : <p className="pr-bio-empty">No bio yet — click Edit to add one.</p>
              }
            </div>

            <div className="pr-divider" />

            <div>
              <div className="pr-section-header">
                <span className="pr-section-title">Skills</span>
              </div>
              <div className="pr-skills">
                {skills.length === 0 && <span style={{fontSize:"0.88rem",color:"var(--muted)",fontStyle:"italic"}}>No skills added yet.</span>}
                {skills.map(s => (
                  <span className="pr-skill" key={s}>
                    {s}
                    <button className="pr-skill-remove" onClick={() => removeSkill(s)}>✕</button>
                  </span>
                ))}
              </div>
              <form className="pr-skill-input-row" onSubmit={addSkill}>
                <input className="pr-skill-input" value={skillInput} onChange={e => setSkillInput(e.target.value)} placeholder="e.g. React, Go, Postgres..." />
                <button className="pr-skill-add" type="submit">+ Add</button>
              </form>
            </div>

          </main>
        </div>

        {toast && <div className={`pr-toast${toast.type === "error" ? " error" : ""}`}>{toast.msg}</div>}

      </div>
    </>
  );
}