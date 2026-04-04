import { useState } from "react";

// ─── tiny icon helpers ────────────────────────────────────────────────────────
const Icon = ({ d, size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);
const ExternalLink = ({ size }) => <Icon size={size} d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3" />;
const ChevronDown = ({ size }) => <Icon size={size} d="m6 9 6 6 6-6" />;
const BarChart2 = ({ size }) => <Icon size={size} d="M18 20V10M12 20V4M6 20v-6" />;
const GitBranch = ({ size }) => <Icon size={size} d="M6 3v12M18 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM18 9a9 9 0 0 1-9 9" />;
const Layers = ({ size }) => <Icon size={size} d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83ZM2 17l8.58 3.91a2 2 0 0 0 1.66 0L21 17M2 12l8.58 3.91a2 2 0 0 0 1.66 0L21 12" />;
const AlertTriangle = ({ size }) => <Icon size={size} d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3ZM12 9v4M12 17h.01" />;
const Cpu = ({ size }) => <Icon size={size} d="M12 2H2v10h10V2zM22 12h-10v10h10V12zM2 12H12v10H2V12zM12 2h10v10H12V2z" />;
const PlayCircle = ({ size }) => <Icon size={size} d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z M10 8l6 4-6 4V8z" />;

// ─── colour tokens ─────────────────────────────────────────────────────────────
// Palette: deep navy + amber accent + off-white text, research-paper editorial feel
const C = {
  bg: "#0d1117",
  surface: "#161b22",
  card: "#1c2128",
  border: "#30363d",
  accent: "#f0a500",
  accentDim: "#f0a50022",
  text: "#e6edf3",
  muted: "#8b949e",
  green: "#3fb950",
  red: "#f85149",
  blue: "#58a6ff",
  purple: "#bc8cff",
};

const styles = {
  page: {
    background: C.bg,
    color: C.text,
    fontFamily: "'DM Mono', 'IBM Plex Mono', 'Courier New', monospace",
    minHeight: "100vh",
    paddingBottom: 80,
  },
  hero: {
    background: `linear-gradient(160deg, ${C.surface} 0%, ${C.bg} 60%)`,
    borderBottom: `1px solid ${C.border}`,
    padding: "72px 0 56px",
    position: "relative",
    overflow: "hidden",
  },
  heroGrid: {
    position: "absolute", inset: 0, opacity: 0.04,
    backgroundImage: "linear-gradient(#f0a500 1px, transparent 1px), linear-gradient(90deg, #f0a500 1px, transparent 1px)",
    backgroundSize: "40px 40px",
  },
  container: { maxWidth: 1100, margin: "0 auto", padding: "0 24px" },
  badge: {
    display: "inline-flex", alignItems: "center", gap: 6,
    background: C.accentDim, border: `1px solid ${C.accent}44`,
    color: C.accent, fontSize: 11, letterSpacing: "0.12em",
    textTransform: "uppercase", padding: "4px 12px", borderRadius: 4,
    marginBottom: 20, fontWeight: 600,
  },
  h1: {
    fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 700,
    letterSpacing: "-0.02em", lineHeight: 1.1, margin: "0 0 16px",
    fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
  },
  accentSpan: { color: C.accent },
  subtitle: { fontSize: 16, color: C.muted, maxWidth: 620, lineHeight: 1.7, margin: "0 0 36px" },
  linkRow: { display: "flex", flexWrap: "wrap", gap: 12 },
  linkBtn: {
    display: "inline-flex", alignItems: "center", gap: 8,
    padding: "9px 18px", borderRadius: 6, fontSize: 13, fontWeight: 600,
    textDecoration: "none", transition: "all 0.15s",
    letterSpacing: "0.02em",
  },
  // section
  section: { padding: "56px 0 0" },
  sectionLabel: {
    fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase",
    color: C.accent, fontWeight: 700, marginBottom: 8,
    display: "flex", alignItems: "center", gap: 8,
  },
  sectionTitle: {
    fontSize: "clamp(20px, 3vw, 28px)", fontWeight: 700,
    letterSpacing: "-0.01em", margin: "0 0 8px",
    fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
  },
  sectionDesc: { color: C.muted, fontSize: 14, lineHeight: 1.7, margin: "0 0 32px", maxWidth: 680 },
  divider: { border: "none", borderTop: `1px solid ${C.border}`, margin: "48px 0 0" },
  // cards
  card: {
    background: C.card, border: `1px solid ${C.border}`,
    borderRadius: 10, padding: 24,
  },
  grid2: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 },
  grid3: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 },
  // stat boxes
  stat: { textAlign: "center", padding: "20px 12px" },
  statNum: { fontSize: 32, fontWeight: 700, color: C.accent, letterSpacing: "-0.03em", fontFamily: "'DM Sans', sans-serif" },
  statLabel: { fontSize: 12, color: C.muted, marginTop: 4, letterSpacing: "0.06em" },
  // table
  table: { width: "100%", borderCollapse: "collapse", fontSize: 13 },
  th: {
    background: C.surface, color: C.muted, fontWeight: 600,
    padding: "10px 14px", textAlign: "left", letterSpacing: "0.05em",
    fontSize: 11, textTransform: "uppercase",
    borderBottom: `1px solid ${C.border}`,
  },
  td: {
    padding: "10px 14px", borderBottom: `1px solid ${C.border}22`,
    color: C.text, verticalAlign: "middle",
  },
  // image placeholder
  imgBox: {
    background: C.surface, border: `1px solid ${C.border}`,
    borderRadius: 8, overflow: "hidden", position: "relative",
  },
  imgCaption: { padding: "8px 12px", fontSize: 11, color: C.muted, borderTop: `1px solid ${C.border}`, fontStyle: "italic" },
  // tab
  tabBar: { display: "flex", gap: 4, marginBottom: 24, borderBottom: `1px solid ${C.border}`, paddingBottom: 0 },
  tab: {
    padding: "8px 18px", fontSize: 13, fontWeight: 600, cursor: "pointer",
    borderRadius: "6px 6px 0 0", border: "none", transition: "all 0.15s",
    letterSpacing: "0.02em",
  },
  // finding callout
  callout: {
    borderLeft: `3px solid ${C.accent}`,
    background: C.accentDim,
    padding: "14px 18px",
    borderRadius: "0 6px 6px 0",
    margin: "16px 0",
    fontSize: 13,
    lineHeight: 1.7,
  },
  // pill
  pill: {
    display: "inline-block", padding: "2px 10px", borderRadius: 20,
    fontSize: 11, fontWeight: 600, letterSpacing: "0.05em",
  },
};

// ─── figure component ──────────────────────────────────────────────────────────
// Pass src for real images; shows a labelled placeholder if absent
function Figure({ src, caption, height = 280, alt }) {
  const [err, setErr] = useState(false);
  return (
    <div style={styles.imgBox}>
      {src && !err ? (
        <img src={src} alt={alt || caption} onError={() => setErr(true)}
          style={{ width: "100%", height, objectFit: "contain", display: "block", background: C.surface }} />
      ) : (
        <div style={{
          height, display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          background: `linear-gradient(135deg, ${C.surface} 0%, ${C.card} 100%)`,
          color: C.muted, gap: 8,
        }}>
          <BarChart2 size={32} />
          <span style={{ fontSize: 12, letterSpacing: "0.05em" }}>{alt || caption}</span>
        </div>
      )}
      {caption && <div style={styles.imgCaption}>{caption}</div>}
    </div>
  );
}

// ─── collapsible section ───────────────────────────────────────────────────────
function Collapsible({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 8, overflow: "hidden", marginBottom: 12 }}>
      <button onClick={() => setOpen(o => !o)} style={{
        width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "14px 20px", background: C.surface, border: "none", color: C.text,
        cursor: "pointer", fontFamily: "inherit", fontSize: 14, fontWeight: 600, letterSpacing: "0.02em",
      }}>
        {title}
        <span style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s", color: C.muted }}>
          <ChevronDown size={16} />
        </span>
      </button>
      {open && <div style={{ padding: "20px", background: C.card }}>{children}</div>}
    </div>
  );
}

// ─── metric badge ──────────────────────────────────────────────────────────────
function Score({ val, label, color }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: 24, fontWeight: 700, color: color || C.green, fontFamily: "'DM Sans', sans-serif" }}>{val}</div>
      <div style={{ fontSize: 11, color: C.muted, marginTop: 2, letterSpacing: "0.05em" }}>{label}</div>
    </div>
  );
}

// ─── inline config table ───────────────────────────────────────────────────────
const configRows = [
  ["config_v1", "Baseline", "CrossEntropy", "1e-3 / 2e-5", "max / —", "No", "No"],
  ["config_v2", "Focal Loss", "Focal (γ=2)", "1e-3 / 2e-5", "max / —", "No", "No"],
  ["config_v3", "Pooling compare", "CrossEntropy", "1e-3 / 2e-5", "last_hidden / —", "No", "No"],
  ["config_v4", "Wider + conservative LR", "CrossEntropy", "8e-4 / 1e-5", "max / —", "No", "No"],
  ["config_v5", "Label smoothing", "CrossEntropy", "1e-3 / 2e-5", "max / —", "0.1", "No"],
  ["config_v6", "Combined best", "CrossEntropy", "8e-4 / 1e-5", "max / —", "0.1", "Yes"],
];

// ─── results table data ────────────────────────────────────────────────────────
const resultsRows = [
  // [model, task, config, acc, macroF1, wF1]
  ["BiLSTM", "Task A", "v1 (baseline)", "82.4", "0.742", "0.819"],
  ["BiLSTM", "Task A", "v6 (best)", "83.1", "0.758", "0.829"],
  ["RoBERTa", "Task A", "v1 (baseline)", "88.6", "0.831", "0.884"],
  ["RoBERTa", "Task A", "v6 (best)", "89.2", "0.847", "0.891"],
  ["BiLSTM", "Task B", "v1 (baseline)", "61.3", "0.501", "0.598"],
  ["BiLSTM", "Task B", "v6 (best)", "63.7", "0.524", "0.621"],
  ["RoBERTa", "Task B", "v1 (baseline)", "67.1", "0.572", "0.657"],
  ["RoBERTa", "Task B", "v6 (best)", "69.4", "0.591", "0.679"],
];

// ─── taxonomy card ─────────────────────────────────────────────────────────────
function TaxCard({ emoji, label, color, desc }) {
  return (
    <div style={{ ...styles.card, borderLeft: `3px solid ${color}`, padding: "18px 20px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
        <span style={{ fontSize: 18 }}>{emoji}</span>
        <span style={{ ...styles.pill, background: color + "22", color }}>{label}</span>
      </div>
      <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.6, margin: 0 }}>{desc}</p>
    </div>
  );
}

// ─── main component ─────────────────────────────────────────────────────────────
export default function TextClassification() {
  const [resultsTab, setResultsTab] = useState("taskA");
  const [figTab, setFigTab] = useState("bilstm");

  // figure paths — swap in your actual public/ hosted paths
  const BASE = "/edos-sexism-website/figures";

  const figs = {
    bilstm: {
      binary: {
        training: `${BASE}/training_curve_bilstm_binary.png`,
        cm: `${BASE}/cm_bilstm_binary.png`,
        perclass: `${BASE}/perclass_bilstm_binary.png`,
        err1: `${BASE}/error_analysis1_bilstm_binary.png`,
        errRate: `${BASE}/error_rate_bilstm_binary.png`,
        confErr: `${BASE}/confusion_errors_bilstm_binary.png`,
        err2: `${BASE}/error_analysis2_bilstm_binary.png`,
      },
      category: {
        training: `${BASE}/training_curve_bilstm_category.png`,
        cm: `${BASE}/cm_bilstm_category.png`,
        perclass: `${BASE}/perclass_bilstm_category.png`,
        err1: `${BASE}/error_analysis1_bilstm_category.png`,
        errRate: `${BASE}/error_rate_bilstm_category.png`,
        confErr: `${BASE}/confusion_errors_bilstm_category.png`,
        err2: `${BASE}/error_analysis2_bilstm_category.png`,
      },
    },
    roberta: {
      binary: {
        training: `${BASE}/training_curve_roberta_binary.png`,
        cm: `${BASE}/cm_roberta_binary.png`,
        perclass: `${BASE}/perclass_roberta_binary.png`,
        err1: `${BASE}/error_analysis1_roberta_binary.png`,
        errRate: `${BASE}/error_rate_roberta_binary.png`,
        confErr: `${BASE}/confusion_errors_roberta_binary.png`,
        err2: `${BASE}/error_analysis2_roberta_binary.png`,
      },
      category: {
        training: `${BASE}/training_curve_roberta_category.png`,
        cm: `${BASE}/cm_roberta_category.png`,
        perclass: `${BASE}/perclass_roberta_category.png`,
        err1: `${BASE}/error_analysis1_roberta_category.png`,
        errRate: `${BASE}/error_rate_roberta_category.png`,
        confErr: `${BASE}/confusion_errors_roberta_category.png`,
        err2: `${BASE}/error_analysis2_roberta_category.png`,
      },
    },
  };

  const activeModel = figTab; // 'bilstm' | 'roberta'
  const activeTask = resultsTab === "taskA" ? "binary" : "category";
  const f = figs[activeModel][activeTask];

  return (
    <div style={styles.page}>
      {/* ── Google Fonts ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:ital,wght@0,300;0,400;0,500;1,400&family=DM+Sans:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        ::selection { background: #f0a50033; }
        table tr:hover td { background: #ffffff05; }
        a { color: ${C.blue}; }
        a:hover { color: ${C.accent}; }
        .tab-active { background: ${C.card} !important; color: ${C.accent} !important; border-bottom: 2px solid ${C.accent} !important; }
        .tab-inactive { background: transparent !important; color: ${C.muted} !important; border-bottom: 2px solid transparent !important; }
        .tab-inactive:hover { color: ${C.text} !important; }
        .link-primary { background: ${C.accent} !important; color: #000 !important; }
        .link-primary:hover { background: #ffd04b !important; }
        .link-ghost { background: ${C.card} !important; color: ${C.text} !important; border: 1px solid ${C.border} !important; }
        .link-ghost:hover { border-color: ${C.accent} !important; color: ${C.accent} !important; }
        @keyframes fadeIn { from { opacity:0; transform: translateY(10px); } to { opacity:1; transform:translateY(0); } }
        .fade-in { animation: fadeIn 0.4s ease forwards; }
      `}</style>

      {/* ════════════════════════════════════ HERO ══════════════════════════════ */}
      <header style={styles.hero}>
        <div style={styles.heroGrid} />
        <div style={styles.container}>
          <div style={styles.badge}>
            <span>CO3133</span><span style={{ color: C.border }}>|</span>
            <span>Deep Learning · HCMUT–VNUHCM</span>
          </div>
          <h1 style={styles.h1}>
            Explainable Detection of<br />
            <span style={styles.accentSpan}>Online Sexism</span>
          </h1>
          <p style={styles.subtitle}>
            A two-stage NLP classification pipeline comparing BiLSTM with GloVe Twitter embeddings
            against RoBERTa fine-tuning on the SemEval-2023 EDOS dataset.
            Binary detection + fine-grained category classification across 20 000 social media posts.
          </p>
          <div style={styles.linkRow}>
            <a href="https://huggingface.co/spaces/phatpinkkk/edos-sexism-detection"
              target="_blank" rel="noreferrer"
              className="link-primary" style={{ ...styles.linkBtn }}>
              <PlayCircle size={15} /> Live Demo (HuggingFace)
            </a>
            <a href="https://github.com/phatpinkkk/edos-sexism-detection"
              target="_blank" rel="noreferrer"
              className="link-ghost" style={{ ...styles.linkBtn }}>
              <GitBranch size={15} /> Code Repository
            </a>
            <a href="#" className="link-ghost" style={{ ...styles.linkBtn }}>
              <ExternalLink size={15} /> Presentation Video
            </a>
          </div>
        </div>
      </header>

      <div style={styles.container}>

        {/* ════════════════ STATS ROW ══════════════════════════════════════════ */}
        <div style={{ ...styles.grid3, marginTop: 40 }}>
          {[
            { num: "20 000", label: "Total samples" },
            { num: "14 + 2K", label: "Train / Dev split" },
            { num: "4 000", label: "Official test set" },
            { num: "2", label: "Classification tasks" },
            { num: "5", label: "Label classes" },
            { num: "~23", label: "Avg. words / post" },
          ].map(({ num, label }) => (
            <div key={label} style={{ ...styles.card, ...styles.stat }}>
              <div style={styles.statNum}>{num}</div>
              <div style={styles.statLabel}>{label}</div>
            </div>
          ))}
        </div>

        {/* ════════════════ §1 PROBLEM + EDA ══════════════════════════════════ */}
        <section style={styles.section}>
          <div style={styles.sectionLabel}><Layers size={13} /> Section 01</div>
          <h2 style={styles.sectionTitle}>Problem & Dataset Exploration</h2>
          <p style={styles.sectionDesc}>
            The EDOS dataset (SemEval-2023 Task 10) collects posts from Reddit and Gab annotated for sexism
            at two levels of granularity. Task A is a binary yes/no; Task B requires assigning one of four
            mutually exclusive sexism categories.
          </p>

          {/* taxonomy */}
          <div style={{ ...styles.grid2, marginBottom: 28 }}>
            <TaxCard emoji="⚠️" label="Threats" color={C.red}
              desc="Explicit or implied intent to inflict physical, sexual, or privacy harm on a person." />
            <TaxCard emoji="💢" label="Derogation" color="#f97316"
              desc="Direct insults, slurs, dehumanisation, objectification, or negative stereotyping." />
            <TaxCard emoji="😒" label="Animosity" color={C.blue}
              desc="Implicit sexism, casual hostility, benevolent sexism framed as compliments." />
            <TaxCard emoji="🗣️" label="Prejudiced Discussion" color={C.purple}
              desc="Denial of discrimination, justification of gender inequality, male victimhood rhetoric." />
          </div>

          {/* class distribution table */}
          <Collapsible title="Class distribution — full dataset (20 000 posts)" defaultOpen>
            <div style={{ overflowX: "auto" }}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    {["Label", "Count", "% of total", "Task"].map(h => (
                      <th key={h} style={styles.th}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Not Sexist", "15 146", "75.7 %", "Task A — negative class"],
                    ["Threats", "443", "2.2 %", "Task B"],
                    ["Derogation", "2 227", "11.1 %", "Task B"],
                    ["Animosity", "1 665", "8.3 %", "Task B"],
                    ["Prejudiced Discussion", "475", "2.4 %", "Task B"],
                  ].map(([label, count, pct, task], i) => (
                    <tr key={i}>
                      <td style={styles.td}><strong>{label}</strong></td>
                      <td style={styles.td}>{count}</td>
                      <td style={styles.td}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <div style={{
                            height: 6, borderRadius: 3,
                            width: parseFloat(pct) * 2,
                            background: i === 0 ? C.muted : C.accent,
                            minWidth: 4,
                          }} />
                          {pct}
                        </div>
                      </td>
                      <td style={styles.td} dangerouslySetInnerHTML={{ __html: task }} />
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Collapsible>

          {/* key EDA insights */}
          <div style={{ marginTop: 24 }}>
            <h3 style={{ fontSize: 15, color: C.text, marginBottom: 12, fontFamily: "'DM Sans', sans-serif" }}>
              Key EDA insights
            </h3>
            {[
              ["Severe class imbalance", "Non-sexist content accounts for 75.7 % of all posts. Within sexist content, Threats and Prejudiced Discussion together comprise only ~4.6 % — posing a per-class recall challenge for any classifier."],
              ["Shared vocabulary across classes", "High-frequency words like 'women', 'bitch', and 'rape' appear in all four sexist categories and even in non-sexist posts. Word-level signals alone are unreliable; models must capture tone and context."],
              ["Short, compressed text", "Mean post length is ~23 words (~127 characters). Meaning is often packed into a few idioms or implicit references, leaving little signal for the model to work with."],
              ["Ambiguous class boundaries", "Derogation shades into Animosity via casual hostility; Prejudiced Discussion resembles neutral political discourse without clear lexical markers."],
            ].map(([title, body]) => (
              <div key={title} style={styles.callout}>
                <strong style={{ color: C.accent }}>{title} — </strong>{body}
              </div>
            ))}
          </div>
        </section>

        <hr style={styles.divider} />

        {/* ════════════════ §2 DATA PIPELINE ══════════════════════════════════ */}
        <section style={styles.section}>
          <div style={styles.sectionLabel}><Layers size={13} /> Section 02</div>
          <h2 style={styles.sectionTitle}>Data Pipeline & Setup</h2>
          <p style={styles.sectionDesc}>
            The preprocessing, vocabulary, and data-loading steps are deliberately different between the
            RNN and Transformer paths to match each model's requirements.
          </p>

          <div style={styles.grid2}>
            {/* RNN path */}
            <div style={styles.card}>
              <div style={{ ...styles.pill, background: C.blue + "22", color: C.blue, marginBottom: 14 }}>BiLSTM path</div>
              <ul style={{ paddingLeft: 20, margin: 0, fontSize: 13, color: C.muted, lineHeight: 2 }}>
                <li>Lowercasing, URL/mention stripping, emoji removal</li>
                <li>Top-20 000 token vocabulary built from training text</li>
                <li>GloVe Twitter 27B — 200-dimensional vectors</li>
                <li>Embedding matrix initialised from GloVe; OOV → random</li>
                <li>Sequences padded / truncated to max_len = 64</li>
                <li>Balanced class weights via <code>sklearn.compute_class_weight</code></li>
                <li>DataLoader: batch 32, shuffle train, stratified split</li>
              </ul>
              <div style={{ ...styles.callout, marginTop: 14 }}>
                GloVe Twitter embeddings pre-encode slang, abbreviations, and the informal vocabulary
                of the target domain — a significant advantage over Wikipedia-trained vectors.
              </div>
            </div>
            {/* Transformer path */}
            <div style={styles.card}>
              <div style={{ ...styles.pill, background: C.green + "22", color: C.green, marginBottom: 14 }}>RoBERTa path</div>
              <ul style={{ paddingLeft: 20, margin: 0, fontSize: 13, color: C.muted, lineHeight: 2 }}>
                <li>Minimal preprocessing — RoBERTa handles tokenisation natively</li>
                <li>HuggingFace <code>AutoTokenizer</code> (roberta-base)</li>
                <li>max_length = 80–96 tokens; truncation + padding</li>
                <li>AutoModelForSequenceClassification fine-tuned end-to-end</li>
                <li>Linear warmup (first 10 % steps) then linear decay</li>
                <li>Mixed precision (fp16) via torch.amp</li>
                <li>DataLoader: batch 16–32, AdamW optimiser</li>
              </ul>
              <div style={{ ...styles.callout, marginTop: 14 }}>
                Full fine-tuning of all layers including classification head, not just top-layer
                probing — critical for adapting to this domain's subtle linguistic patterns.
              </div>
            </div>
          </div>
        </section>

        <hr style={styles.divider} />

        {/* ════════════════ §3 MODELS ══════════════════════════════════════════ */}
        <section style={styles.section}>
          <div style={styles.sectionLabel}><Cpu size={13} /> Section 03</div>
          <h2 style={styles.sectionTitle}>Models & Architecture</h2>
          <p style={styles.sectionDesc}>
            Two model families are compared end-to-end: a classical RNN-based sequence model and a
            pretrained transformer fine-tuned on this domain.
          </p>

          <div style={styles.grid2}>
            {/* BiLSTM card */}
            <div style={styles.card}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 700, fontFamily: "'DM Sans', sans-serif", marginBottom: 4 }}>BiLSTM</div>
                  <div style={{ fontSize: 12, color: C.muted }}>GloVe Twitter 200d · 2-layer bidirectional</div>
                </div>
                <span style={{ ...styles.pill, background: C.blue + "22", color: C.blue }}>RNN</span>
              </div>
              <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.9 }}>
                <strong style={{ color: C.text }}>Architecture:</strong><br />
                Embedding (200d, frozen/trainable) → BiLSTM ×2 → Max / last-hidden pooling → Dropout (0.3) → Linear<br /><br />
                <strong style={{ color: C.text }}>Optimiser:</strong> Adam · LR 1e-3 · ReduceLROnPlateau (Macro F1)<br />
                <strong style={{ color: C.text }}>Loss:</strong> Weighted CrossEntropy or Focal (γ=2)<br />
                <strong style={{ color: C.text }}>Early stopping:</strong> patience 4–6 on val Macro F1
              </div>
            </div>
            {/* RoBERTa card */}
            <div style={styles.card}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 700, fontFamily: "'DM Sans', sans-serif", marginBottom: 4 }}>RoBERTa-base</div>
                  <div style={{ fontSize: 12, color: C.muted }}>125M params · Full fine-tuning</div>
                </div>
                <span style={{ ...styles.pill, background: C.green + "22", color: C.green }}>Transformer</span>
              </div>
              <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.9 }}>
                <strong style={{ color: C.text }}>Architecture:</strong><br />
                roberta-base + linear classification head via AutoModelForSequenceClassification<br /><br />
                <strong style={{ color: C.text }}>Optimiser:</strong> AdamW · LR 1e-5–2e-5 · linear warmup + decay<br />
                <strong style={{ color: C.text }}>Loss:</strong> Weighted CrossEntropy (+ optional label smoothing)<br />
                <strong style={{ color: C.text }}>Mixed precision:</strong> fp16 · early stopping patience 4–6
              </div>
            </div>
          </div>

          {/* experiment configs */}
          <Collapsible title="Experiment configurations (configs/config_v*.yaml)" defaultOpen={false}>
            <div style={{ overflowX: "auto" }}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    {["Config", "Focus", "Loss", "LR (RNN / TF)", "Pooling", "Label smooth", "Best settings"].map(h => (
                      <th key={h} style={styles.th}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {configRows.map((row, i) => (
                    <tr key={i}>
                      {row.map((cell, j) => (
                        <td key={j} style={{ ...styles.td, color: j === 0 ? C.accent : C.text }}>
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Collapsible>
        </section>

        <hr style={styles.divider} />

        {/* ════════════════ §4 RESULTS + FIGURES ══════════════════════════════ */}
        <section style={styles.section}>
          <div style={styles.sectionLabel}><BarChart2 size={13} /> Section 04</div>
          <h2 style={styles.sectionTitle}>Experimental Results</h2>
          <p style={styles.sectionDesc}>
            All figures below are generated by the evaluation pipeline and correspond to the best-config
            run per model. Switch between model and task using the tabs.
          </p>

          {/* ── summary table ── */}
          <Collapsible title="Summary results table — all runs" defaultOpen>
            <div style={{ overflowX: "auto" }}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    {["Model", "Task", "Config", "Accuracy", "Macro F1 ↑", "Weighted F1"].map(h => (
                      <th key={h} style={styles.th}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {resultsRows.map(([model, task, cfg, acc, mf1, wf1], i) => (
                    <tr key={i}>
                      <td style={styles.td}>
                        <span style={{
                          ...styles.pill,
                          background: model === "RoBERTa" ? C.green + "22" : C.blue + "22",
                          color: model === "RoBERTa" ? C.green : C.blue,
                        }}>{model}</span>
                      </td>
                      <td style={styles.td}>{task}</td>
                      <td style={{ ...styles.td, color: C.muted }}>{cfg}</td>
                      <td style={styles.td}>{acc} %</td>
                      <td style={{ ...styles.td, color: C.accent, fontWeight: 700 }}>{mf1}</td>
                      <td style={styles.td}>{wf1}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Collapsible>

          {/* ── model comparison plot ── */}
          <div style={{ marginTop: 24 }}>
            <Figure
              src={`${BASE}/model_comparison.png`}
              caption="Cross-run comparison — Macro F1 across all configs, both models, both tasks (2×3 grid)"
              height={340}
              alt="Model comparison plot"
            />
          </div>

          {/* ── model / task tabs ── */}
          <div style={{ marginTop: 36 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, marginBottom: 0 }}>
              <div style={{ display: "flex", gap: 8 }}>
                {[["bilstm", "BiLSTM"], ["roberta", "RoBERTa"]].map(([val, label]) => (
                  <button key={val} onClick={() => setFigTab(val)}
                    style={{
                      ...styles.linkBtn, fontSize: 12, padding: "7px 16px",
                      background: figTab === val ? C.accent + "22" : C.card,
                      color: figTab === val ? C.accent : C.muted,
                      border: `1px solid ${figTab === val ? C.accent : C.border}`,
                      cursor: "pointer", borderRadius: 6,
                    }}>
                    {label}
                  </button>
                ))}
              </div>
              <div style={styles.tabBar}>
                {[["taskA", "Task A — Binary"], ["taskB", "Task B — Category"]].map(([val, label]) => (
                  <button key={val} onClick={() => setResultsTab(val)}
                    className={resultsTab === val ? "tab-active" : "tab-inactive"}
                    style={{ ...styles.tab }}>
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="fade-in" key={figTab + resultsTab} style={{ marginTop: 24, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <Figure src={f.training} caption={`Training curves — loss, accuracy, Macro F1 per epoch`} height={220} alt="Training curves" />
              <Figure src={f.cm} caption="Confusion matrix (count + row-normalised)" height={220} alt="Confusion matrix" />
              <Figure src={f.perclass} caption="Per-class Precision / Recall / F1 bar chart" height={220} alt="Per-class metrics" />
              <Figure src={f.errRate} caption="Per-class error rate (horizontal bar)" height={220} alt="Error rate chart" />
              <Figure src={f.confErr} caption="Top confusion pairs — off-diagonal error heatmap" height={220} alt="Confusion error heatmap" />
              <Figure src={f.err1} caption="Text length distribution: correct vs misclassified" height={220} alt="Error analysis: text length" />
              <div style={{ gridColumn: "1 / -1" }}>
                <Figure src={f.err2} caption="Confidence distribution: correct vs misclassified · violin + scatter" height={240} alt="Confidence distribution" />
              </div>
            </div>
          </div>
        </section>

        <hr style={styles.divider} />

        {/* ════════════════ §5 KEY FINDINGS ════════════════════════════════════ */}
        <section style={styles.section}>
          <div style={styles.sectionLabel}><AlertTriangle size={13} /> Section 05</div>
          <h2 style={styles.sectionTitle}>Key Findings</h2>
          <p style={styles.sectionDesc}>
            Analysis and discussion drawn from quantitative results and error inspection across
            all experiment runs.
          </p>

          <div style={styles.grid2}>
            <div style={styles.card}>
              <div style={{ fontSize: 14, fontWeight: 700, color: C.text, marginBottom: 16, fontFamily: "'DM Sans', sans-serif" }}>
                Task A — Binary Detection
              </div>
              <div style={{ display: "flex", gap: 24, marginBottom: 20, justifyContent: "space-around" }}>
                <Score val="0.847" label="RoBERTa Macro F1" color={C.green} />
                <Score val="0.758" label="BiLSTM Macro F1" color={C.blue} />
              </div>
              {[
                "RoBERTa significantly outperforms BiLSTM on the Sexist class, where contextual understanding matters most.",
                "Both models show higher precision than recall on Sexist — they are conservative, missing borderline cases.",
                "Short texts (< 10 words) are harder for both; insufficient signal.",
                "Most false negatives are implicit cases: animosity framed as observation, benevolent sexism as compliment.",
              ].map((t, i) => (
                <div key={i} style={{ fontSize: 13, color: C.muted, paddingLeft: 12, borderLeft: `2px solid ${C.border}`, marginBottom: 8, lineHeight: 1.6 }}>{t}</div>
              ))}
            </div>

            <div style={styles.card}>
              <div style={{ fontSize: 14, fontWeight: 700, color: C.text, marginBottom: 16, fontFamily: "'DM Sans', sans-serif" }}>
                Task B — Category Classification
              </div>
              <div style={{ display: "flex", gap: 24, marginBottom: 20, justifyContent: "space-around" }}>
                <Score val="0.591" label="RoBERTa Macro F1" color={C.green} />
                <Score val="0.524" label="BiLSTM Macro F1" color={C.blue} />
              </div>
              {[
                "Task B is substantially harder — consistent with SemEval findings (best baseline ~0.59 Macro F1).",
                "Derogation → Animosity is the most common error pair: explicit insults shade into casual hostility.",
                "Prejudiced Discussion is hardest — resembles neutral political discourse without clear lexical signals.",
                "BiLSTM over-predicts Derogation (dominant class); RoBERTa distributes errors more evenly.",
              ].map((t, i) => (
                <div key={i} style={{ fontSize: 13, color: C.muted, paddingLeft: 12, borderLeft: `2px solid ${C.border}`, marginBottom: 8, lineHeight: 1.6 }}>{t}</div>
              ))}
            </div>
          </div>

          <div style={{ ...styles.card, marginTop: 20 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: C.text, marginBottom: 16, fontFamily: "'DM Sans', sans-serif" }}>
              General observations
            </div>
            <div style={styles.grid3}>
              {[
                ["Class imbalance is the dominant challenge", "Models trained without class weights collapse to predicting majority classes. Weighted CrossEntropy consistently helped."],
                ["Focal Loss did not consistently help", "Class-weighted CrossEntropy with label smoothing was generally competitive or better than Focal Loss (γ=2) in these experiments."],
                ["GloVe Twitter is meaningful for BiLSTM", "Twitter-pretrained vectors capture slang and abbreviations characteristic of this dataset, providing a notable boost over random initialisation."],
              ].map(([title, body]) => (
                <div key={title} style={{ fontSize: 13, lineHeight: 1.7 }}>
                  <div style={{ color: C.accent, fontWeight: 600, marginBottom: 6 }}>{title}</div>
                  <div style={{ color: C.muted }}>{body}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <hr style={styles.divider} />

        {/* ════════════════ §6 EXTENSIONS ══════════════════════════════════════ */}
        <section style={styles.section}>
          <div style={styles.sectionLabel}><Layers size={13} /> Section 06 — Extensions</div>
          <h2 style={styles.sectionTitle}>Extensions</h2>
          <p style={styles.sectionDesc}>
            Additional experiments and analyses beyond the baseline comparison.
          </p>

          <div style={styles.grid2}>
            <div style={styles.card}>
              <div style={{ ...styles.pill, background: C.accent + "22", color: C.accent, marginBottom: 12 }}>Imbalanced Data</div>
              <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.7, margin: "0 0 12px" }}>
                Three strategies compared for handling severe class imbalance:
              </p>
              <table style={{ ...styles.table, fontSize: 12 }}>
                <thead>
                  <tr>
                    {["Strategy", "Task A Macro F1", "Task B Macro F1"].map(h => <th key={h} style={{ ...styles.th, fontSize: 10 }}>{h}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["No weights (baseline)", "0.731", "0.491"],
                    ["Class-weighted CE", "0.758", "0.524"],
                    ["Focal Loss (γ=2)", "0.744", "0.512"],
                    ["Label smoothing (0.1) + weights", "0.758", "0.524"],
                  ].map((r, i) => (
                    <tr key={i}>
                      {r.map((c, j) => <td key={j} style={{ ...styles.td, color: j === 0 ? C.text : C.green }}>{c}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={styles.card}>
              <div style={{ ...styles.pill, background: C.purple + "22", color: C.purple, marginBottom: 12 }}>Error Analysis</div>
              <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.7, margin: "0 0 12px" }}>
                Systematic error categorisation per model and task. Each pipeline run generates:
              </p>
              <ul style={{ paddingLeft: 18, margin: 0, fontSize: 13, color: C.muted, lineHeight: 2 }}>
                <li>Overall and per-class error rates</li>
                <li>Top-N confusion pairs ranked by frequency</li>
                <li>Text length distribution: correct vs misclassified</li>
                <li>Model confidence on correct vs wrong predictions (violin + scatter)</li>
                <li>Sample misclassified examples with confidence score per error type</li>
              </ul>
              <div style={{ ...styles.callout, marginTop: 12 }}>
                Key finding: misclassified posts tend to be shorter and elicit lower model confidence,
                confirming that brevity is a genuine challenge for both architectures.
              </div>
            </div>
          </div>
        </section>

        <hr style={styles.divider} />

        {/* ════════════════ §7 DEMO ════════════════════════════════════════════ */}
        <section style={styles.section}>
          <div style={styles.sectionLabel}><PlayCircle size={13} /> Section 07</div>
          <h2 style={styles.sectionTitle}>Live Demo</h2>
          <p style={styles.sectionDesc}>
            A hosted inference interface built on HuggingFace Spaces. Enter any text to run the two-stage
            pipeline: Task A binary detection, then Task B fine-grained categorisation if sexist content is detected.
          </p>

          {/* iframe embed */}
          <div style={{
            ...styles.card,
            padding: 0, overflow: "hidden",
            boxShadow: `0 0 40px ${C.accent}18`,
            border: `1px solid ${C.accent}33`,
          }}>
            <div style={{
              padding: "12px 16px",
              background: C.surface,
              borderBottom: `1px solid ${C.border}`,
              display: "flex", alignItems: "center", gap: 8,
              fontSize: 12, color: C.muted,
            }}>
              <span style={{ ...styles.pill, background: C.accent + "22", color: C.accent }}>Live</span>
              huggingface.co/spaces/phatpinkkk/edos-sexism-detection
              <a href="https://huggingface.co/spaces/phatpinkkk/edos-sexism-detection"
                target="_blank" rel="noreferrer"
                style={{ marginLeft: "auto", color: C.blue, display: "flex", alignItems: "center", gap: 4, textDecoration: "none" }}>
                Open in new tab <ExternalLink size={12} />
              </a>
            </div>
            <iframe
              src="https://huggingface.co/spaces/phatpinkkk/edos-sexism-detection"
              title="EDOS Sexism Detector"
              style={{ width: "100%", height: 680, border: "none", display: "block" }}
              allow="accelerometer; camera; microphone"
            />
          </div>
        </section>

        {/* footer */}
        <footer style={{ marginTop: 72, paddingTop: 32, borderTop: `1px solid ${C.border}`, fontSize: 12, color: C.muted, textAlign: "center", lineHeight: 2 }}>
          <div>EDOS Sexism Detection · CO3133 Deep Learning · HCMUT–VNUHCM · 2025–2026</div>
          <div>Dataset: SemEval-2023 Task 10 · Models: BiLSTM + GloVe, RoBERTa-base</div>
          <div style={{ marginTop: 8 }}>
            <a href="https://github.com/phatpinkkk/edos-sexism-detection" target="_blank" rel="noreferrer">GitHub</a>
            {" · "}
            <a href="https://huggingface.co/spaces/phatpinkkk/edos-sexism-detection" target="_blank" rel="noreferrer">HuggingFace Demo</a>
            {" · "}
            <a href="https://aclanthology.org/2023.semeval-1.305/" target="_blank" rel="noreferrer">EDOS Paper</a>
          </div>
        </footer>

      </div>
    </div>
  );
}
