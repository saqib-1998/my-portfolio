import { useState, useEffect } from "react";

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxAbysgrYLQVyHkrH29WWxpA_LNMbf4xSkvRpSJt8u0MJ_M0twVQeZkmnDMwKU1S4zF/exec";

const data = {
  name: "Shaik Saqib Hussain",
  title: "Senior Full Stack Developer",
  email: "shaikhussainsaqib@gmail.com",
  phone: "+91 6300151039",
  location: "Bengaluru, Karnataka, India",
  linkedin: "https://www.linkedin.com/in/shaik-saqib-hussain-26017518a ",
  github: "https://github.com/ShaikSaqibHussain",
cvLink: "/Shaik_Saqib_CV.pdf",
  badges: ["Open to Remote","Open to Relocate","Open to Hybrid","Open to On-Site","Open to Travel"],
  summary: [
    "Accomplished Senior Full Stack Developer with over 5 years of experience designing and scaling SaaS & PaaS based products using the MERN stack.",
    "Expert in React.js, Node.js, microservices architecture, and DevOps tools including Docker. Proven track record in improving API performance by 30%, leading monolith-to-microservices migrations, and mentoring development teams to deliver secure, zero-downtime releases.",
    "Skilled in building high-throughput systems for telecom and enterprise clients with a focus on reliability and scalability."
  ],
  experience: [
    {
      role: "Senior Software Engineer",
      company: "Tecnotree Convergence Pvt Ltd",
      period: "Apr 2023 — Present",
      bullets: [
        "Designed scalable Node.js and Express microservices for billing and user authentication supporting 10,000+ concurrent users.",
        "Led migration from monolithic architecture to microservices, reducing CPU and RAM usage by 25%.",
        "Optimized RESTful APIs and implemented in-memory caching, decreasing average response time by 30%.",
        "Containerized services using Docker and orchestrated AWS deployments, enabling zero-downtime releases and accelerating CI/CD cycles by 50%.",
        "Mentored 5 junior developers on best practices, reducing production defects by 20%."
      ]
    },
    {
      role: "Software Engineer",
      company: "Tecnotree Convergence Pvt Ltd",
      period: "May 2021 — Mar 2023",
      bullets: [
        "Developed responsive React and Redux UIs, improving initial load times by 20% through code-splitting and lazy loading.",
        "Built high-throughput Node.js services for telecom billing, handling over 1 million transactions per day.",
        "Designed and indexed MongoDB and MySQL schemas, enhancing complex query performance by 25%."
      ]
    }
  ],
  skills: [
    { cat: "Frontend", tags: ["React.js","Redux","AngularJS","JavaScript ES6+","HTML5","CSS3"] },
    { cat: "Backend", tags: ["Node.js","Express.js","RESTful APIs","Microservices"] },
    { cat: "Databases", tags: ["MongoDB","MySQL"] },
    { cat: "Tools / DevOps", tags: ["Docker","Git / GitHub","Jenkins","Linux","AWS","SaaS Architecture","PaaS Architecture"] },
    { cat: "Business Intelligence", tags: ["Power BI"] }
  ],
  projects: [
    {
      title: "BSS Modules (DCLM, DCBS, DOM, DCM, DRM)",
      company: "Tecnotree Convergence Pvt Ltd",
      period: "Jan 2023 — Jun 2023",
      bullets: [
        "Developed a real-time analytics dashboard using React.js, Node.js, and MySQL to monitor network performance.",
        "Reduced incident response time by 30% through enhanced data visualization and alerting mechanisms."
      ],
      tags: ["React.js","Node.js","MySQL"]
    },
    {
      title: "Customer Life Cycle (CLM)",
      company: "Tecnotree Convergence Pvt Ltd",
      period: "Jul 2022 — Dec 2022",
      bullets: [
        "Migrated legacy Property Management System to AngularJS and Node.js microservices architecture.",
        "Achieved 25% faster page load times and improved system scalability."
      ],
      tags: ["AngularJS","Node.js","Microservices"]
    },
    {
      title: "Billing Machine Microservice Engine",
      company: "Tecnotree Convergence Pvt Ltd",
      period: "Apr 2023 — Present",
      bullets: [
        "Designed and implemented a microservice engine processing over 1 million daily transactions with 99.9% uptime.",
        "Ensured high availability and accuracy in telecom billing using Node.js and MongoDB."
      ],
      tags: ["Node.js","MongoDB","Docker"]
    }
  ]
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
  *{margin:0;padding:0;box-sizing:border-box;}
  html{scroll-behavior:smooth;}
  body{font-family:'Inter',sans-serif;background:#0a1628;color:#ccd6f6;}
  ::-webkit-scrollbar{width:6px;}
  ::-webkit-scrollbar-track{background:#0a1628;}
  ::-webkit-scrollbar-thumb{background:#1e5faa;border-radius:3px;}
`;

const S = {
  nav: { position:"fixed",top:0,width:"100%",background:"rgba(10,22,40,0.97)",backdropFilter:"blur(10px)",borderBottom:"1px solid #1e3a5f",zIndex:100,padding:"0 2rem" },
  navInner: { maxWidth:1100,margin:"auto",display:"flex",alignItems:"center",justifyContent:"space-between",height:60 },
  navLogo: { fontSize:"1.1rem",fontWeight:800,color:"#4fa3e0",letterSpacing:1 },
  navLinks: { display:"flex",gap:"1.5rem",listStyle:"none" },
  navLink: { color:"#8892a4",textDecoration:"none",fontSize:".9rem",cursor:"pointer",transition:"color .2s" },
  section: { padding:"100px 2rem 60px",maxWidth:1100,margin:"auto" },
  sectionTitle: { fontSize:"1.6rem",fontWeight:700,color:"#e8f0fe",marginBottom:"2rem",display:"flex",alignItems:"center",gap:".75rem" },
  titleLine: { flex:1,height:1,background:"#1e3a5f" },
  hero: { minHeight:"100vh",display:"flex",alignItems:"center",background:"linear-gradient(135deg,#0a1628 60%,#0d2144)",padding:"0 2rem" },
  heroInner: { maxWidth:1100,margin:"auto",width:"100%",paddingTop:60 },
  heroTag: { color:"#4fa3e0",fontSize:".95rem",letterSpacing:2,fontWeight:600,marginBottom:".75rem" },
  heroName: { fontSize:"clamp(2.2rem,6vw,4rem)",fontWeight:800,color:"#e8f0fe",lineHeight:1.1,marginBottom:".5rem" },
  heroTitle: { fontSize:"clamp(1rem,2.5vw,1.5rem)",color:"#8892a4",marginBottom:"1.5rem" },
  badges: { display:"flex",flexWrap:"wrap",gap:".5rem",marginBottom:"2rem" },
  badge: { background:"rgba(30,95,170,0.2)",border:"1px solid #1e5faa",color:"#4fa3e0",padding:".3rem .85rem",borderRadius:20,fontSize:".8rem" },
  btns: { display:"flex",gap:"1rem",flexWrap:"wrap" },
  btnPrimary: { padding:".7rem 1.6rem",borderRadius:6,fontSize:".9rem",fontWeight:600,cursor:"pointer",textDecoration:"none",background:"#1e5faa",color:"#fff",border:"2px solid #1e5faa",display:"inline-flex",alignItems:"center",gap:".4rem",transition:"all .2s" },
  btnOutline: { padding:".7rem 1.6rem",borderRadius:6,fontSize:".9rem",fontWeight:600,cursor:"pointer",textDecoration:"none",background:"transparent",color:"#4fa3e0",border:"2px solid #4fa3e0",display:"inline-flex",alignItems:"center",gap:".4rem",transition:"all .2s" },
  aboutGrid: { display:"grid",gridTemplateColumns:"1fr 270px",gap:"3rem",alignItems:"start" },
  aboutText: { color:"#8892a4",fontSize:"1rem",lineHeight:1.8 },
  card: { background:"#112240",border:"1px solid #1e3a5f",borderRadius:10,padding:"1.5rem" },
  ciItem: { display:"flex",alignItems:"center",gap:".75rem",marginBottom:".85rem",fontSize:".875rem" },
  ciIcon: { width:32,height:32,background:"rgba(30,95,170,0.2)",borderRadius:6,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1rem",flexShrink:0 },
  link: { color:"#4fa3e0",textDecoration:"none" },
  timeline: { position:"relative",paddingLeft:"2rem" },
  timelineLine: { position:"absolute",left:0,top:0,bottom:0,width:2,background:"#1e3a5f" },
  tlItem: { position:"relative",marginBottom:"2.5rem" },
  tlDot: { position:"absolute",left:"-2.4rem",top:".4rem",width:14,height:14,borderRadius:"50%",background:"#1e5faa",border:"3px solid #0a1628",boxShadow:"0 0 0 2px #1e5faa" },
  tlHeader: { display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:".5rem",marginBottom:".3rem" },
  tlRole: { fontSize:"1.05rem",fontWeight:700,color:"#e8f0fe" },
  tlDate: { color:"#4fa3e0",fontSize:".85rem" },
  tlCompany: { color:"#8892a4",fontSize:".9rem",marginBottom:".75rem" },
  bullets: { listStyle:"none",color:"#8892a4",fontSize:".9rem" },
  skillsGrid: { display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(210px,1fr))",gap:"1.25rem" },
  skillCard: { background:"#112240",border:"1px solid #1e3a5f",borderRadius:10,padding:"1.25rem" },
  skillCat: { color:"#4fa3e0",fontSize:".8rem",letterSpacing:1,textTransform:"uppercase",marginBottom:".75rem",fontWeight:600 },
  skillTags: { display:"flex",flexWrap:"wrap",gap:".4rem" },
  skillTag: { background:"rgba(30,95,170,0.15)",border:"1px solid rgba(79,163,224,0.3)",color:"#ccd6f6",padding:".25rem .65rem",borderRadius:4,fontSize:".8rem" },
  projGrid: { display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(290px,1fr))",gap:"1.5rem" },
  projCard: { background:"#112240",border:"1px solid #1e3a5f",borderRadius:10,padding:"1.5rem",transition:"border-color .2s,transform .2s",cursor:"default" },
  projPeriod: { color:"#4fa3e0",fontSize:".8rem",marginBottom:".4rem" },
  projTitle: { fontSize:"1rem",fontWeight:700,color:"#e8f0fe",marginBottom:".2rem" },
  projCompany: { color:"#8892a4",fontSize:".85rem",marginBottom:".75rem" },
  projTags: { display:"flex",flexWrap:"wrap",gap:".4rem",marginTop:"1rem" },
  projTag: { background:"rgba(41,121,212,0.15)",color:"#4fa3e0",padding:".2rem .6rem",borderRadius:4,fontSize:".75rem" },
  contactLayout: { display:"grid",gridTemplateColumns:"1fr 1.2fr",gap:"3rem",alignItems:"start" },
  formCard: { background:"#112240",border:"1px solid #1e3a5f",borderRadius:12,padding:"2rem" },
  formRow: { display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1rem",marginBottom:"1rem" },
  formGroup: { marginBottom:"1rem" },
  label: { display:"block",color:"#ccd6f6",fontSize:".85rem",marginBottom:".4rem",fontWeight:500 },
  input: { width:"100%",background:"rgba(10,22,40,0.8)",border:"1px solid #1e3a5f",borderRadius:6,padding:".65rem .9rem",color:"#ccd6f6",fontSize:".9rem",fontFamily:"inherit",outline:"none" },
  note: { color:"#8892a4",fontSize:".8rem",marginBottom:"1rem" },
  footer: { background:"#112240",borderTop:"1px solid #1e3a5f",textAlign:"center",padding:"1.5rem",color:"#8892a4",fontSize:".85rem" }
};

function NavLink({ href, children }) {
  return (
    <a href={href} style={S.navLink}
      onMouseEnter={e => e.target.style.color="#4fa3e0"}
      onMouseLeave={e => e.target.style.color="#8892a4"}>
      {children}
    </a>
  );
}

function Btn({ href, outline, children, onClick, download }) {
  const base = outline ? S.btnOutline : S.btnPrimary;
  return (
    <a href={href} style={base} onClick={onClick} download={download}
      target={href && href.startsWith("http") ? "_blank" : undefined}
      rel="noreferrer"
      onMouseEnter={e => { e.currentTarget.style.opacity=".85"; e.currentTarget.style.transform="translateY(-1px)"; }}
      onMouseLeave={e => { e.currentTarget.style.opacity="1"; e.currentTarget.style.transform="none"; }}>
      {children}
    </a>
  );
}

function SectionTitle({ children }) {
  return (
    <h2 style={S.sectionTitle}>
      {children}
      <span style={S.titleLine} />
    </h2>
  );
}

function BulletList({ items, style }) {
  return (
    <ul style={{ ...S.bullets, ...style }}>
      {items.map((b, i) => (
        <li key={i} style={{ padding:".3rem 0",paddingLeft:"1.2rem",position:"relative" }}>
          <span style={{ position:"absolute",left:0,color:"#4fa3e0" }}>▹</span>
          {b}
        </li>
      ))}
    </ul>
  );
}

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navSections = ["about","experience","skills","projects","contact"];
  const [form, setForm] = useState({ name:"",email:"",phone:"",company:"",calltime:"",message:"" });
  const [status, setStatus] = useState(null);
  const [sending, setSending] = useState(false);
  const [hoveredProj, setHoveredProj] = useState(null);

  useEffect(() => {
    const styleEl = document.createElement("style");
    styleEl.textContent = css;
    document.head.appendChild(styleEl);
    return () => document.head.removeChild(styleEl);
  }, []);

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) {
      setStatus({ type:"error", msg:"⚠️ Please fill in all required fields." });
      return;
    }
    setSending(true);
    setStatus(null);
    const payload = { ...form, timestamp: new Date().toLocaleString("en-IN", { timeZone:"Asia/Kolkata" }) };
    try {
      await fetch(SCRIPT_URL, { method:"POST", mode:"no-cors", headers:{"Content-Type":"application/json"}, body:JSON.stringify(payload) });
      setStatus({ type:"success", msg:"✅ Message sent! I'll get back to you soon." });
      setForm({ name:"",email:"",phone:"",company:"",calltime:"",message:"" });
    } catch {
      setStatus({ type:"error", msg:"❌ Something went wrong. Please email me directly." });
    }
    setSending(false);
  };

  const inp = (id, placeholder, type="text") => (
    <input
      type={type}
      style={S.input}
      placeholder={placeholder}
      value={form[id]}
      onChange={e => setForm(p => ({ ...p, [id]: e.target.value }))}
      onFocus={e => e.target.style.borderColor="#4fa3e0"}
      onBlur={e => e.target.style.borderColor="#1e3a5f"}
    />
  );

  return (
    <div style={{ fontFamily:"Inter,sans-serif",background:"#0a1628",color:"#ccd6f6",minHeight:"100vh" }}>

      {/* NAV */}
      <nav style={S.nav}>
        <div style={S.navInner}>
          <div style={S.navLogo}>SSH</div>
          <div style={{ display:"flex",gap:"1.5rem" }}>
            {navSections.map(s => (
              <NavLink key={s} href={`#${s}`}>{s.charAt(0).toUpperCase()+s.slice(1)}</NavLink>
            ))}
          </div>
          <div style={{ display:"flex",alignItems:"center",gap:".5rem",cursor:"pointer" }} onClick={() => setMenuOpen(o => !o)}>
            {[0,1,2].map(i => <span key={i} style={{ display:"block",width:22,height:2,background:"#4fa3e0",transition:".3s" }} />)}
          </div>
        </div>
        {menuOpen && (
          <div style={{ background:"#112240",borderTop:"1px solid #1e3a5f",padding:"1rem 2rem",display:"flex",flexDirection:"column" }}>
            {navSections.map(s => (
              <a key={s} href={`#${s}`}
                onClick={() => setMenuOpen(false)}
                style={{ color:"#8892a4",textDecoration:"none",padding:".6rem 0",borderBottom:"1px solid #1e3a5f",fontSize:".95rem" }}>
                {s.charAt(0).toUpperCase()+s.slice(1)}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="hero" style={S.hero}>
        <div style={S.heroInner}>
          <div style={S.heroTag}>👋 Welcome to my portfolio</div>
          <h1 style={S.heroName}>{data.name}</h1>
          <p style={S.heroTitle}>Senior Full Stack Developer · MERN Stack · Microservices</p>
          <div style={S.badges}>
            {data.badges.map(b => <span key={b} style={S.badge}>✅ {b}</span>)}
          </div>
          <div style={S.btns}>
            <Btn href="#contact">📬 Contact Me</Btn>
            <Btn href={data.cvLink} outline download>⬇ Download CV</Btn>
            <Btn href={data.linkedin} outline>💼 LinkedIn</Btn>
            <Btn href={data.github} outline>🐙 GitHub</Btn>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={S.section}>
        <SectionTitle>About Me</SectionTitle>
        <div style={{ ...S.aboutGrid, gridTemplateColumns: "1fr 270px" }}>
          <div>
            {data.summary.map((p, i) => <p key={i} style={{ ...S.aboutText, marginBottom:"1rem" }}>{p}</p>)}
            <div style={{ marginTop:"1.5rem" }}>
              <Btn href={data.cvLink} download>⬇ Download My CV</Btn>
            </div>
          </div>
          <div style={S.card}>
            <h3 style={{ color:"#e8f0fe",fontSize:"1rem",marginBottom:"1rem" }}>Quick Info</h3>
            {[
              { icon:"📍", content: data.location },
              { icon:"📞", content: <a href={`tel:${data.phone}`} style={S.link}>{data.phone}</a> },
              { icon:"📧", content: <a href={`mailto:${data.email}`} style={S.link}>{data.email}</a> },
              { icon:"💼", content: <a href={data.linkedin} target="_blank" rel="noreferrer" style={S.link}>LinkedIn Profile</a> },
              { icon:"🐙", content: <a href={data.github} target="_blank" rel="noreferrer" style={S.link}>GitHub Profile</a> },
            ].map(({ icon, content }, i) => (
              <div key={i} style={S.ciItem}>
                <div style={S.ciIcon}>{icon}</div>
                <span>{content}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" style={S.section}>
        <SectionTitle>Experience</SectionTitle>
        <div style={S.timeline}>
          <div style={S.timelineLine} />
          {data.experience.map((exp, i) => (
            <div key={i} style={S.tlItem}>
              <div style={S.tlDot} />
              <div style={S.tlHeader}>
                <span style={S.tlRole}>{exp.role}</span>
                <span style={S.tlDate}>{exp.period}</span>
              </div>
              <div style={S.tlCompany}>{exp.company}</div>
              <BulletList items={exp.bullets} />
            </div>
          ))}
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" style={S.section}>
        <SectionTitle>Skills</SectionTitle>
        <div style={S.skillsGrid}>
          {data.skills.map(({ cat, tags }) => (
            <div key={cat} style={S.skillCard}>
              <div style={S.skillCat}>{cat}</div>
              <div style={S.skillTags}>
                {tags.map(t => <span key={t} style={S.skillTag}>{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" style={S.section}>
        <SectionTitle>Projects</SectionTitle>
        <p style={{ color:"#8892a4",marginBottom:"1.5rem",fontSize:".9rem" }}>Telecom BSS · SaaS-based Digital Transformation · PaaS-based Digital Transformation</p>
        <div style={S.projGrid}>
          {data.projects.map((p, i) => (
            <div key={i}
              style={{ ...S.projCard, borderColor: hoveredProj===i ? "#4fa3e0" : "#1e3a5f", transform: hoveredProj===i ? "translateY(-4px)" : "none" }}
              onMouseEnter={() => setHoveredProj(i)}
              onMouseLeave={() => setHoveredProj(null)}>
              <div style={S.projPeriod}>{p.period}</div>
              <div style={S.projTitle}>{p.title}</div>
              <div style={S.projCompany}>{p.company}</div>
              <BulletList items={p.bullets} />
              <div style={S.projTags}>
                {p.tags.map(t => <span key={t} style={S.projTag}>{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ ...S.section, paddingBottom:80 }}>
        <SectionTitle>Get In Touch</SectionTitle>
        <div style={{ background:"rgba(30,95,170,0.1)",border:"1px solid #1e5faa",borderRadius:10,padding:"1.25rem 1.5rem",marginBottom:"2rem",fontSize:".875rem" }}>
          <strong style={{ color:"#4fa3e0" }}>⚙️ One-time Google Sheets Setup (2 min):</strong>
          <ol style={{ marginTop:".5rem",marginLeft:"1.2rem",color:"#8892a4" }}>
            <li>Go to sheets.google.com → create a new sheet → click <strong>Extensions → Apps Script</strong></li>
            <li>Paste the Apps Script code (provided below the portfolio) → Deploy as Web App → Anyone</li>
            <li>Copy the URL and replace <code style={{ background:"rgba(0,0,0,0.3)",padding:".1rem .4rem",borderRadius:3,color:"#4fa3e0" }}>https://script.google.com/macros/s/AKfycbxAbysgrYLQVyHkrH29WWxpA_LNMbf4xSkvRpSJt8u0MJ_M0twVQeZkmnDMwKU1S4zF/exec</code> at the top of the file</li>
          </ol>
        </div>
        <div style={{ ...S.contactLayout }}>
          <div>
            <h3 style={{ color:"#e8f0fe",fontSize:"1.1rem",marginBottom:".75rem" }}>Let's work together</h3>
            <p style={{ color:"#8892a4",fontSize:".95rem",marginBottom:"1.5rem",lineHeight:1.7 }}>
              I'm currently open to new opportunities — full-time, contract, or remote. Fill in the form and I'll get back to you. If you'd prefer a call, leave your number and best time!
            </p>
            <div style={{ display:"flex",flexDirection:"column",gap:".75rem" }}>
              {[
                { icon:"📞", label: <a href={`tel:${data.phone}`} style={S.link}>{data.phone}</a> },
                { icon:"📧", label: <a href={`mailto:${data.email}`} style={S.link}>{data.email}</a> },
                { icon:"📍", label: data.location },
                { icon:"💼", label: <a href={data.linkedin} target="_blank" rel="noreferrer" style={S.link}>LinkedIn</a> },
                { icon:"🐙", label: <a href={data.github} target="_blank" rel="noreferrer" style={S.link}>GitHub</a> },
              ].map(({ icon, label }, i) => (
                <div key={i} style={{ display:"flex",alignItems:"center",gap:".75rem",color:"#8892a4",fontSize:".9rem" }}>
                  <span>{icon}</span><span>{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={S.formCard}>
            <div style={S.formRow}>
              <div style={S.formGroup}>
                <label style={S.label}>Full Name *</label>
                {inp("name","John Smith")}
              </div>
              <div style={S.formGroup}>
                <label style={S.label}>Email Address *</label>
                {inp("email","john@company.com","email")}
              </div>
            </div>
            <div style={S.formRow}>
              <div style={S.formGroup}>
                <label style={S.label}>Phone Number</label>
                {inp("phone","+1 234 567 8900","tel")}
              </div>
              <div style={S.formGroup}>
                <label style={S.label}>Company / Organisation</label>
                {inp("company","Your Company Ltd")}
              </div>
            </div>
            <div style={S.formGroup}>
              <label style={S.label}>Best Time to Call</label>
              <select style={S.input} value={form.calltime}
                onChange={e => setForm(p => ({ ...p, calltime: e.target.value }))}
                onFocus={e => e.target.style.borderColor="#4fa3e0"}
                onBlur={e => e.target.style.borderColor="#1e3a5f"}>
                <option value="">Select a time slot</option>
                <option>Morning (9am – 12pm IST)</option>
                <option>Afternoon (12pm – 4pm IST)</option>
                <option>Evening (4pm – 7pm IST)</option>
                <option>Flexible / Any time</option>
                <option>Prefer email only</option>
              </select>
            </div>
            <div style={S.formGroup}>
              <label style={S.label}>Message *</label>
              <textarea
                style={{ ...S.input, resize:"vertical", minHeight:110 }}
                placeholder="Tell me about the role or opportunity..."
                value={form.message}
                onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                onFocus={e => e.target.style.borderColor="#4fa3e0"}
                onBlur={e => e.target.style.borderColor="#1e3a5f"}
              />
            </div>
            <p style={S.note}>* Required fields. Your details are saved to a private Google Sheet.</p>
            <button
              onClick={handleSubmit}
              disabled={sending}
              style={{ ...S.btnPrimary, width:"100%", justifyContent:"center", opacity: sending ? .7 : 1, cursor: sending ? "not-allowed" : "pointer" }}>
              {sending ? "Sending..." : "📨 Send Message"}
            </button>
            {status && (
              <div style={{
                marginTop:"1rem", padding:".75rem 1rem", borderRadius:6, fontSize:".9rem",
                background: status.type==="success" ? "rgba(34,197,94,0.15)" : "rgba(239,68,68,0.15)",
                border: `1px solid ${status.type==="success" ? "rgba(34,197,94,0.4)" : "rgba(239,68,68,0.4)"}`,
                color: status.type==="success" ? "#4ade80" : "#f87171"
              }}>
                {status.msg}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={S.footer}>
        <p>© 2024 Shaik Saqib Hussain · <a href={`mailto:${data.email}`} style={S.link}>{data.email}</a></p>
      </footer>

    </div>
  );
}