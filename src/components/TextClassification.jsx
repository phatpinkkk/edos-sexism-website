// src\components\TextClassification.jsx

import { useState } from "react";

/* ─── design tokens ─────────────────────────────────────────────────── */
const T = {
  bg:       "#0d1117",
  surface:  "#161b22",
  card:     "#1c2128",
  border:   "#30363d",
  borderHi: "#484f58",
  text:     "#e6edf3",
  muted:    "#9198a1",
  hint:     "#636e7b",
  accent:   "#f0a500",
  accentBg: "#f0a50015",
  green:    "#3fb950",
  greenBg:  "#3fb95015",
  blue:     "#79c0ff",
  blueBg:   "#79c0ff15",
  red:      "#f85149",
  purple:   "#d2a8ff",
  purpleBg: "#d2a8ff15",
};

/* ─── global styles injected once ───────────────────────────────────── */
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: ${T.bg}; color: ${T.text}; font-family: 'Inter', system-ui, sans-serif; }
  ::selection { background: ${T.accent}30; color: ${T.text}; }
  a { color: ${T.blue}; text-decoration: none; }
  a:hover { color: ${T.accent}; text-decoration: underline; }
  code { font-family: 'JetBrains Mono', monospace; font-size: 0.85em; background: ${T.surface}; padding: 2px 6px; border-radius: 4px; color: ${T.blue}; }

  .nav-tab { background: none; border: none; cursor: pointer; font-family: inherit;
    font-size: 15px; font-weight: 500; color: ${T.muted}; padding: 12px 20px;
    border-bottom: 2px solid transparent; transition: color .15s, border-color .15s; white-space: nowrap; }
  .nav-tab:hover { color: ${T.text}; }
  .nav-tab.active { color: ${T.accent}; border-bottom-color: ${T.accent}; }

  .pill-btn { background: ${T.surface}; border: 1px solid ${T.border}; color: ${T.muted};
    cursor: pointer; font-family: inherit; font-size: 13px; font-weight: 500;
    padding: 6px 14px; border-radius: 20px; transition: all .15s; }
  .pill-btn:hover { border-color: ${T.borderHi}; color: ${T.text}; }
  .pill-btn.active { background: ${T.accentBg}; border-color: ${T.accent}; color: ${T.accent}; }

  .btn-primary { display: inline-flex; align-items: center; gap: 8px; padding: 10px 20px;
    border-radius: 8px; font-family: inherit; font-size: 14px; font-weight: 600;
    background: ${T.accent}; color: #000; border: none; cursor: pointer;
    text-decoration: none; transition: background .15s, transform .1s; }
  .btn-primary:hover { background: #ffd04b; color: #000; text-decoration: none; transform: translateY(-1px); }

  .btn-ghost { display: inline-flex; align-items: center; gap: 8px; padding: 10px 20px;
    border-radius: 8px; font-family: inherit; font-size: 14px; font-weight: 500;
    background: transparent; color: ${T.text}; border: 1px solid ${T.border};
    cursor: pointer; text-decoration: none; transition: all .15s; }
  .btn-ghost:hover { border-color: ${T.accent}; color: ${T.accent}; text-decoration: none; transform: translateY(-1px); }

  .card { background: ${T.card}; border: 1px solid ${T.border}; border-radius: 12px; padding: 24px; }
  .card-sm { height: 100%; background: ${T.card}; border: 2px solid ${T.border}; border-radius: 10px; padding: 18px; justify-content: space-between; }

  .collapse-btn { width: 100%; display: flex; justify-content: space-between; align-items: center;
    padding: 14px 18px; background: ${T.surface}; border: 1px solid ${T.border};
    border-radius: 8px; color: ${T.text}; font-family: inherit; font-size: 15px; font-weight: 500;
    cursor: pointer; transition: background .15s; text-align: left; }
  .collapse-btn:hover { background: ${T.card}; }
  .collapse-body { border: 1px solid ${T.border}; border-top: none;
    border-radius: 0 0 8px 8px; background: ${T.card}; padding: 20px; margin-top: -1px; }

  .data-table { width: 100%; border-collapse: collapse; font-size: 14px; }
  .data-table th { background: ${T.surface}; color: ${T.muted}; font-weight: 600; font-size: 12px;
    text-transform: uppercase; letter-spacing: .05em; padding: 10px 16px; text-align: left;
    border-bottom: 1px solid ${T.border}; }
  .data-table td { padding: 11px 16px; border-bottom: 1px solid ${T.border}20; color: ${T.text}; vertical-align: middle; }
  .data-table tr:hover td { background: #ffffff05; }
  .data-table tr:last-child td { border-bottom: none; }

  .fig-box { background: ${T.surface}; border: 1px solid ${T.border}; border-radius: 10px; overflow: hidden; }
  .fig-caption { padding: 8px 14px; font-size: 12px; color: ${T.muted}; border-top: 1px solid ${T.border}; font-style: italic; line-height: 1.5; }

  .callout { border-left: 3px solid ${T.accent}; background: ${T.accentBg}; padding: 14px 18px;
    border-radius: 0 8px 8px 0; font-size: 15px; line-height: 1.7; color: ${T.text}; }
  .callout-blue { border-left-color: ${T.blue}; background: ${T.blueBg}; }

  .badge { display: inline-flex; align-items: center; padding: 3px 10px; border-radius: 20px;
    font-size: 12px; font-weight: 600; letter-spacing: .03em; }
  .badge-amber  { background: ${T.accentBg}; color: ${T.accent}; border: 1px solid ${T.accent}44; }
  .badge-blue   { background: ${T.blueBg};   color: ${T.blue};   border: 1px solid ${T.blue}44; }
  .badge-green  { background: ${T.greenBg};  color: ${T.green};  border: 1px solid ${T.green}44; }
  .badge-purple { background: ${T.purpleBg}; color: ${T.purple}; border: 1px solid ${T.purple}44; }
  .badge-red    { background: #f8514915;     color: ${T.red};    border: 1px solid ${T.red}44; }

  .section-eyebrow { font-size: 12px; font-weight: 600; letter-spacing: .12em; text-transform: uppercase; color: ${T.accent}; margin-top: 100px; margin-bottom: 6px; }
  .section-title { font-size: 35px; font-weight: 700; color: ${T.text}; line-height: 1.2; margin-bottom: 40px; }
  .section-desc { font-size: 18px; line-height: 1.75; color: ${T.text}; margin: 0 auto 16px; text-align: center; margin-bottom: 28px; max-width: 720px; }

  .grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; align-items: stretch; }
  .grid-3 { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 14px; }
  .grid-4 { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 12px; }
  .fig-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); gap: 16px; }

  .taxonomy-card {
    max-width: 520px;     /* 🔥 prevents stretched ugly text */
    margin: 0 auto;       /* 🔥 centers each card nicely */
    width: 80%;
  }
  
  .taxonomy-card .badge {
    font-size: 15px;        /* 🔥 bigger label */
    font-weight: 600;       /* 🔥 stronger */
    padding: 5px 12px;      /* slightly larger pill */
    margin-bottom: 8px;
  }

  .taxonomy-desc {
    font-size: 15px;
    line-height: 1.65;
    color: ${T.text};
    margin-top: 10px;
    margin-bottom: 6px;
    text-align: center;
  }

  .taxonomy-example {
    font-size: 15px;
    color: ${T.hint};
    font-style: italic;
    line-height: 1.6;
    text-align: center;
  }

  .challenge-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }

  .challenge-card {
    background: linear-gradient(145deg, ${T.card}, ${T.surface});
    border: 1px solid ${T.border};
    border-radius: 12px;
    padding: 25px 30px;
    height: 100%;
    position: relative;
    overflow: hidden;
  }

  /* subtle accent line */
  .challenge-card::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 5px;
    height: 100%;
    background: ${T.accent};
    opacity: 0.7;
  }

  .challenge-card:hover {
    border-color: ${T.accent};
    transform: translateY(-2px);
    transition: all 0.15s ease;
  }

  /* title */
  .challenge-title {
    font-size: 16px;
    font-weight: 700;
    color: ${T.text};
    margin-bottom: 8px;
  }

  /* body */
  .challenge-body {
    font-size: 14px;
    color: ${T.text}cc;   /* 🔥 brighter than muted */
    line-height: 1.65;
  }

  .card .badge {
    font-size: 15px;     /* 🔥 bigger */
    font-weight: 600;    /* 🔥 stronger */
    padding: 5px 12px;
  }

  .hero-stack {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .hero-meta {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }

  .hero-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    justify-content: center;
    align-items: center;
  }

  .section-block {
    margin-bottom: 56px;
  }
  .stat-card { background: ${T.card}; border: 1px solid ${T.border}; border-radius: 10px; padding: 20px 16px; text-align: center; }
  .stat-num { font-size: 30px; font-weight: 700; color: ${T.accent}; line-height: 1; font-variant-numeric: tabular-nums; }
  .stat-label { font-size: 13px; color: ${T.muted}; margin-top: 6px; line-height: 1.4; }

  .finding { display: flex; gap: 12px; padding: 14px 0; border-bottom: 1px solid ${T.border}20; }
  .finding:last-child { border-bottom: none; }
  .finding-dot { width: 8px; height: 8px; border-radius: 50%; background: ${T.accent}; margin-top: 7px; flex-shrink: 0; }

  .prog-wrap { height: 6px; background: ${T.border}; border-radius: 3px; overflow: hidden; }
  .prog-bar   { height: 100%; border-radius: 3px; }

  @keyframes tabIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
  .tab-content { animation: tabIn .2s ease; }
`;

/* ─── small helpers ──────────────────────────────────────────────────── */
function Pill({ children, cls = "badge-amber" }) {
  return <span className={`badge ${cls}`}>{children}</span>;
}

function Figure({ src, caption, height = 280, alt }) {
  const [err, setErr] = useState(false);
  return (
    <div className="fig-box">
      {src && !err ? (
        <img src={src} alt={alt || caption} onError={() => setErr(true)}
          style={{ width: "100%", height, objectFit: "contain", display: "block", background: T.surface }} />
      ) : (
        <div style={{ height, display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", color: T.hint, gap: 8 }}>
          <svg width={32} height={32} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
            <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>
          </svg>
          <span style={{ fontSize: 13 }}>{alt || caption}</span>
        </div>
      )}
      {caption && <div className="fig-caption">{caption}</div>}
    </div>
  );
}

function Collapse({ title, children, open: defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ marginBottom: 10 }}>
      <button className="collapse-btn" onClick={() => setOpen(o => !o)}>
        {title}
        <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
          style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform .2s", color: T.muted, flexShrink: 0 }}>
          <path d="m6 9 6 6 6-6"/>
        </svg>
      </button>
      {open && <div className="collapse-body">{children}</div>}
    </div>
  );
}

function DataTable({ cols, rows }) {
  return (
    <div style={{ overflowX: "auto" }}>
      <table className="data-table">
        <thead><tr>{cols.map(c => <th key={c}>{c}</th>)}</tr></thead>
        <tbody>{rows.map((row, i) => (
          <tr key={i}>{row.map((cell, j) => <td key={j}>{cell}</td>)}</tr>
        ))}</tbody>
      </table>
    </div>
  );
}

/* ─── data ───────────────────────────────────────────────────────────── */
const BASE = "./figures";

const FIG_TYPES = [
  { key: "training_curve",   caption: "Training curves – loss · accuracy · Macro F1 per epoch" },
  { key: "cm",               caption: "Confusion matrix – count + row-normalised side by side" },
  { key: "perclass",         caption: "Per-class Precision / Recall / F1 bar chart" },
  { key: "error_rate",       caption: "Per-class error rate – horizontal bar" },
  { key: "confusion_errors", caption: "Top confusion pairs – off-diagonal error heatmap" },
  { key: "error_analysis1",  caption: "Text length distribution – correct vs misclassified" },
  { key: "error_analysis2",  caption: "Confidence distribution – violin + scatter: correct vs wrong" },
];

const RESULTS = [
  ["BiLSTM",  "Task A", "v1 baseline",       "82.4%", "0.742", "0.819"],
  ["BiLSTM",  "Task A", "v6 best",           "83.1%", "0.758", "0.829"],
  ["RoBERTa", "Task A", "v1 baseline",       "88.6%", "0.831", "0.884"],
  ["RoBERTa", "Task A", "v6 best",           "89.2%", "0.847", "0.891"],
  ["BiLSTM",  "Task B", "v1 baseline",       "61.3%", "0.501", "0.598"],
  ["BiLSTM",  "Task B", "v6 best",           "63.7%", "0.524", "0.621"],
  ["RoBERTa", "Task B", "v1 baseline",       "67.1%", "0.572", "0.657"],
  ["RoBERTa", "Task B", "v6 best",           "69.4%", "0.591", "0.679"],
];

const CONFIGS = [
  ["v1", "Baseline",           "CrossEntropy",  "1e-3 / 2e-5", "max",         "–",  "–"],
  ["v2", "Focal Loss",         "Focal (γ=2)",   "1e-3 / 2e-5", "max",         "–",  "–"],
  ["v3", "Pooling compare",    "CrossEntropy",  "1e-3 / 2e-5", "last_hidden", "–",  "–"],
  ["v4", "Wider + lower LR",   "CrossEntropy",  "8e-4 / 1e-5", "max",         "–",  "–"],
  ["v5", "Label smoothing",    "CrossEntropy",  "1e-3 / 2e-5", "max",         "0.1","–"],
  ["v6", "Combined best",      "CrossEntropy",  "8e-4 / 1e-5", "max",         "0.1","✓"],
];

const TABS = [
  { id: "overview",  label: "Overview & Dataset" },
  { id: "eda",       label: "EDA & Insights" },
  { id: "pipeline",  label: "Pipeline & Models" },
  { id: "results",   label: "Results & Analysis" },
  { id: "demo",      label: "Demo & Resources" },
];

const FiguresGallery = ({ T }) => {
  const [activeTab, setActiveTab] = useState("roberta_binary");
  const [lightbox, setLightbox] = useState(null);

  const tabs = [
    { id: "roberta_binary",   label: "RoBERTa · Binary" },
    { id: "roberta_category", label: "RoBERTa · Category" },
    { id: "bilstm_binary",    label: "BiLSTM · Binary" },
    { id: "bilstm_category",  label: "BiLSTM · Category" },
  ];

  const isBinary   = activeTab.endsWith("binary");
  const prefix     = `./figures`;
  const tag        = activeTab;

  const figures = {
    roberta_binary: [
      { src: `${prefix}/training_curve_roberta_binary.png`,   caption: "Training curves – loss · accuracy · Macro F1", span: 2 },
      { src: `${prefix}/cm_roberta_binary.png`,               caption: "Confusion matrix (count + normalised)",        span: 1 },
      { src: `${prefix}/perclass_roberta_binary.png`,         caption: "Per-class Precision / Recall / F1",           span: 1 },
      { src: `${prefix}/error_rate_roberta_binary.png`,       caption: "Error rate per class",                        span: 1 },
      { src: `${prefix}/confusion_errors_roberta_binary.png`, caption: "Confusion error heatmap",                     span: 1 },
      { src: `${prefix}/error_analysis1_roberta_binary.png`,  caption: "Error analysis I – text length & confidence", span: 2 },
      { src: `${prefix}/error_analysis2_roberta_binary.png`,  caption: "Error analysis II – violin & scatter",        span: 2 },
    ],
    roberta_category: [
      { src: `${prefix}/training_curve_roberta_category.png`,   caption: "Training curves – loss · accuracy · Macro F1", span: 2 },
      { src: `${prefix}/cm_roberta_category.png`,               caption: "Confusion matrix (count + normalised)",        span: 2 },
      { src: `${prefix}/perclass_roberta_category.png`,         caption: "Per-class Precision / Recall / F1",           span: 1 },
      { src: `${prefix}/error_rate_roberta_category.png`,       caption: "Error rate per class",                        span: 1 },
      { src: `${prefix}/confusion_errors_roberta_category.png`, caption: "Confusion error heatmap",                     span: 1 },
      { src: `${prefix}/error_analysis1_roberta_category.png`,  caption: "Error analysis I – text length & confidence", span: 2 },
      { src: `${prefix}/error_analysis2_roberta_category.png`,  caption: "Error analysis II – violin & scatter",        span: 2 },
    ],
    bilstm_binary: [
      { src: `${prefix}/training_curve_bilstm_binary.png`,   caption: "Training curves – loss · accuracy · Macro F1", span: 2 },
      { src: `${prefix}/cm_bilstm_binary.png`,               caption: "Confusion matrix (count + normalised)",        span: 1 },
      { src: `${prefix}/perclass_bilstm_binary.png`,         caption: "Per-class Precision / Recall / F1",           span: 1 },
      { src: `${prefix}/error_rate_bilstm_binary.png`,       caption: "Error rate per class",                        span: 1 },
      { src: `${prefix}/confusion_errors_bilstm_binary.png`, caption: "Confusion error heatmap",                     span: 1 },
      { src: `${prefix}/error_analysis1_bilstm_binary.png`,  caption: "Error analysis I – text length & confidence", span: 2 },
      { src: `${prefix}/error_analysis2_bilstm_binary.png`,  caption: "Error analysis II – violin & scatter",        span: 2 },
    ],
    bilstm_category: [
      { src: `${prefix}/training_curve_bilstm_category.png`,   caption: "Training curves – loss · accuracy · Macro F1", span: 2 },
      { src: `${prefix}/cm_bilstm_category.png`,               caption: "Confusion matrix (count + normalised)",        span: 2 },
      { src: `${prefix}/perclass_bilstm_category.png`,         caption: "Per-class Precision / Recall / F1",           span: 1 },
      { src: `${prefix}/error_rate_bilstm_category.png`,       caption: "Error rate per class",                        span: 1 },
      { src: `${prefix}/confusion_errors_bilstm_category.png`, caption: "Confusion error heatmap",                     span: 1 },
      { src: `${prefix}/error_analysis1_bilstm_category.png`,  caption: "Error analysis I – text length & confidence", span: 2 },
      { src: `${prefix}/error_analysis2_bilstm_category.png`,  caption: "Error analysis II – violin & scatter",        span: 2 },
    ],
  };

  const current = figures[activeTab];

  return (
    <div style={{ width: "90%", margin: "0 auto 56px" }}>
      {/* Tab bar */}
      <div style={{
        display: "flex", gap: 6, flexWrap: "wrap",
        marginBottom: 20,
        borderBottom: `1px solid ${T.border}`,
        paddingBottom: 12,
        justifyContent: "center",  // ← add this
      }}>
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            style={{
              padding: "6px 14px",
              fontSize: 13, fontWeight: 600,
              borderRadius: 8,
              border: activeTab === t.id ? `1.5px solid ${T.accent}` : `1px solid ${T.border}`,
              background: activeTab === t.id ? `${T.accent}14` : T.surface,
              color: activeTab === t.id ? T.accent : T.muted,
              cursor: "pointer",
              transition: "all 0.15s",
            }}
          >{t.label}</button>
        ))}
      </div>

      {/* Grid — span prop controls full-width vs half */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {current.map(({ src, caption, span }) => (
          <div
            key={src}
            onClick={() => setLightbox(src)}
            style={{
              gridColumn: span === 2 ? "1 / -1" : "auto",
              background: T.surface,
              border: `1px solid ${T.border}`,
              borderRadius: 12,
              overflow: "hidden",
              cursor: "zoom-in",
              transition: "box-shadow 0.15s",
            }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = `0 4px 20px ${T.accent}22`}
            onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
          >
            <img
              src={src}
              alt={caption}
              style={{ width: "100%", display: "block", objectFit: "contain", background: "#fff" }}
            />
            <div style={{
              padding: "10px 14px",
              fontSize: 15, color: T.hint,
              borderTop: `1px solid ${T.border}`,
            }}>{caption}</div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          style={{
            position: "fixed", inset: 0, zIndex: 1000,
            background: "rgba(0,0,0,0.85)",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "zoom-out",
          }}
        >
          <img
            src={lightbox}
            style={{
              maxWidth: "90vw", maxHeight: "90vh",
              borderRadius: 12,
              boxShadow: "0 8px 48px rgba(0,0,0,0.6)",
            }}
          />
        </div>
      )}
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════════════ */
export default function TextClassification() {
  const [tab, setTab]     = useState("overview");
  const [model, setModel] = useState("bilstm");
  const [task, setTask]   = useState("binary");

  const slug = `${model}_${task}`;

  return (
    <>
      <style>{GLOBAL_CSS}</style>

      {/* ── hero + nav ───────────────────────────────────────────────── */}
      <div style={{
        background: `linear-gradient(160deg, ${T.surface} 0%, ${T.bg} 55%)`,
        borderBottom: `1px solid ${T.border}`,
        padding: "60px 0 0",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", inset: 0, opacity: .035, pointerEvents: "none",
          backgroundImage: `linear-gradient(${T.accent} 1px,transparent 1px),linear-gradient(90deg,${T.accent} 1px,transparent 1px)`,
          backgroundSize: "48px 48px",
        }} />
        <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 28px" }}>
          <div style={{ marginBottom: 30, display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
            <Pill>CO3133 · Deep Learning</Pill>
            <Pill cls="badge-blue">HCMUT–VNUHCM</Pill>
            <Pill cls="badge-green">SemEval-2023 Task 10</Pill>
          </div>

          <h1 style={{ fontSize: "clamp(28px, 5vw, 52px)", fontWeight: 700, lineHeight: 1.1,
            letterSpacing: "-0.02em", margin: "0 0 16px", color: T.text, marginBottom: 30 }}>
            Explainable Detection of{" "}
            <span style={{ color: T.accent }}>Online Sexism</span>
          </h1>

          <p style={{ fontSize: 18, lineHeight: 1.75, color: T.muted, maxWidth: 1000, margin: "0 auto 16px", marginBottom: 30 }}>
            A two-stage NLP pipeline comparing{" "}
            <strong style={{ color: T.text }}>BiLSTM + GloVe </strong> against{" "}
            <strong style={{ color: T.text }}>RoBERTa fine-tuning </strong> on 20 000 social media posts –
            binary sexism detection followed by fine-grained category classification.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 32, justifyContent: "center", alignItems: "center" }}>
            <a href="https://huggingface.co/spaces/phatpinkkkk/edos-sexism-detector"
              target="_blank" rel="noreferrer" className="btn-primary">
              <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/>
              </svg>
              Live Demo – HuggingFace
            </a>
            <a href="https://github.com/phatpinkkk/edos-sexism-detection"
              target="_blank" rel="noreferrer" className="btn-ghost">
              <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
              </svg>
              Code Repository
            </a>
            <a href="#" className="btn-ghost">
              <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-1.96C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.4 19.54C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
                <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
              </svg>
              Presentation Video
            </a>
          </div>

          <div style={{ display: "flex", borderBottom: `2px solid ${T.border}`, overflowX: "auto", justifyContent: "center" }}>
            {TABS.map(t => (
              <button key={t.id} className={`nav-tab ${tab === t.id ? "active" : ""}`}
                onClick={() => setTab(t.id)}>{t.label}</button>
            ))}
          </div>
        </div>
      </div>

      {/* ── tab body ─────────────────────────────────────────────────── */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "40px 28px 80px" }}>
        {/* ══════ TAB 1: Overview ══════════════════════════════════════ */}
        {tab === "overview" && (
          <div className="tab-content">
            <div className="grid-4" style={{ marginBottom: 40 }}>
              {[
                ["20.000", "Total samples"],
                ["16.000", "Train + dev"],
                ["4.000",  "Official test set"],
                ["5",      "Label classes"],
                ["~23",    "Avg. words / post"],
                ["2",      "Classification tasks"],
              ].map(([num, label]) => (
                <div key={label} className="stat-card">
                  <div className="stat-num">{num}</div>
                  <div className="stat-label">{label}</div>
                </div>
              ))}
            </div>

            {/* tasks */}
            <p className="section-eyebrow">The Tasks</p>
            <h2 className="section-title">Detecting and Classifying Sexism</h2>
            <p className="section-desc">
              Online platforms are saturated with toxic and abusive content. Sexism, however, is harder to detect –
              not because it is rare, but because it is often subtle, contextual, and woven into everyday language.
              <br /><br />
              Identifying it is not simply a matter of classification. It requires recognising intent, tone, and meaning beyond surface-level words.
              <br /><br />
              This project explores how NLP models handle that complexity through a structured detection and analysis pipeline.
            </p>
            <div className="grid-2" style={{ marginBottom: 40 }}>
              {[
                {
                  badge: "Task A", cls: "badge-blue", title: "Binary Detection",
                  desc: "Decide whether a post is sexist. Not all offensive language is sexist – and not all sexism is obvious.",
                  items: ["Classes: Not Sexist · Sexist", "Training: 16.000 samples", "Test: 4.000 samples", "Metric: Macro F1"],
                },
                {
                  badge: "Task B", cls: "badge-amber", title: "Category Classification",
                  desc: "Given a sexist post, identify how it is expressed – from direct attacks to subtle bias.",
                  items: ["Classes: Threats · Derogation · Animosity · Prejudiced Discussion", "Training: 3.884 sexist-only", "Test: 970 sexist-only", "Metric: Macro F1"],
                },
              ].map(({ badge, cls, title, desc, items }) => (
                <div key={title} className="card">
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                    <Pill cls={cls}>{badge}</Pill>
                    <span style={{ fontSize: 17, fontWeight: 600, color: T.text }}>{title}</span>
                  </div>
                  <p style={{ fontSize: 15, lineHeight: 1.75, color: T.muted, marginBottom: 16 }}>{desc}</p>
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 6 }}>
                    {items.map(d => (
                      <li key={d} style={{ fontSize: 14, color: T.muted, display: "flex", gap: 8 }}>
                        <span style={{ color: T.accent, flexShrink: 0 }}>›</span>{d}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* taxonomy */}
            <p className="section-eyebrow">EDOS Taxonomy</p>
            <h2 className="section-title">Four categories of sexism</h2>
            <div className="grid-2" style={{ marginBottom: 40 }}>
              {[
              {
                badge: "Threats",
                cls: "badge-red",
                color: T.red,
                desc: "Explicit intent to harm or intimidate.",
                example: "“I’ll find out where you live.”"
              },
              {
                badge: "Derogation",
                cls: "badge-amber",
                color: "#f97316",
                desc: "Direct insults or demeaning language.",
                example: "“Women are only good in the kitchen.”"
              },
              {
                badge: "Animosity",
                cls: "badge-blue",
                color: T.blue,
                desc: "Subtle hostility or stereotypical claims.",
                example: "“Women should stay at home and raise kids.”"
              },
              {
                badge: "Prejudiced Discussion",
                cls: "badge-purple",
                color: T.purple,
                desc: "Arguments that justify or deny inequality.",
                example: "“Sexism isn’t real anymore.”"
              }
            ].map(({ badge, cls, color, desc, example }) => (
              <div key={badge} className="card-sm taxonomy-card" style={{ borderLeft: `3px solid ${color}` }}>
                
                <Pill cls={cls}>{badge}</Pill>

                <p className="taxonomy-desc">
                  {desc}
                </p>

                <p className="taxonomy-example">
                  {example}
                </p>

              </div>
            ))}
            </div>

            {/* class distribution */}
            <p className="section-eyebrow">Class Distribution</p>
            <h2 className="section-title">Severe imbalance across all labels</h2>
            <div className="card" style={{ marginBottom: 40 }}>
              {[
                { label: "Not Sexist",            count: 15146, pct: 75.7, cls: "badge-blue",   bar: T.muted },
                { label: "Derogation",             count: 2227,  pct: 11.1, cls: "badge-amber",  bar: T.accent },
                { label: "Animosity",              count: 1665,  pct: 8.3,  cls: "badge-blue",   bar: T.blue },
                { label: "Prejudiced Discussion",  count: 475,   pct: 2.4,  cls: "badge-purple", bar: T.purple },
                { label: "Threats",                count: 443,   pct: 2.2,  cls: "badge-red",    bar: T.red },
              ].map(({ label, count, pct, cls, bar }) => (
                <div key={label} style={{ marginBottom: 18 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 7, alignItems: "center" }}>
                    <Pill cls={cls}>{label}</Pill>
                    <span style={{
                      fontSize: 15,
                      color: T.text,              /* 🔥 brighter */
                      fontWeight: 500,
                      fontVariantNumeric: "tabular-nums"
                    }}>
                      {count.toLocaleString()}{" "}
                      <span style={{ color: T.hint }}>({pct}%)</span>
                    </span>
                  </div>
                  <div className="prog-wrap">
                    <div className="prog-bar" style={{ width: `${pct}%`, background: bar }} />
                  </div>
                </div>
              ))}
            </div>

            {/* challenges */}
            <p className="section-eyebrow">Key Challenges</p>
            <h2 className="section-title">Key challenges in detecting sexism</h2>
            <div className="challenge-grid">
              {[
                [
                  "Class imbalance",
                  "Non-sexist posts dominate (75.7%), while Threats and Prejudiced Discussion together are under 5%. Models tend to ignore these rare but critical cases."
                ],
                [
                  "Shared language",
                  "Words like “women”, “bitch”, and “rape” appear across multiple classes – even in non-sexist posts. Keywords alone are unreliable."
                ],
                [
                  "Short & dense text",
                  "Posts are short (~23 words) and informal. Meaning is compressed into a few cues like tone, slang, or emojis."
                ],
                [
                  "Implicit & overlapping signals",
                  "Explicit cases are easier, but many rely on tone or context. Categories often overlap, making boundaries unclear."
                ]
              ].map(([title, body]) => (
                <div key={title} className="challenge-card">
                  <div className="challenge-title">{title}</div>
                  <div className="challenge-body">{body}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ══════ TAB 2: EDA ══════════════════════════════════════ */}
        {tab === "eda" && (
          <div className="tab-content">

            {/* ── Intro ── */}
            <p className="section-eyebrow">Exploratory Data Analysis</p>
            <h2 className="section-title">Understanding the data before modeling</h2>
            <p className="section-desc">
              Before training models, we analyse how sexism manifests in text – from surface
              statistics to deeper linguistic patterns. The goal is not just visualisation,
              but understanding what signals models can and cannot reliably exploit.
            </p>

            {/* ── Top metrics ── */}
            <div className="grid-4" style={{ marginBottom: 40 }}>
              {[
                ["20,000", "Total posts"],
                ["23 words", "Mean length"],
                ["1,749",   "Posts with slurs"],
                ["152",     "Unique emojis"],
              ].map(([num, label]) => (
                <div key={label} className="stat-card">
                  <div className="stat-num">{num}</div>
                  <div className="stat-label">{label}</div>
                </div>
              ))}
            </div>

            {/* ── Text length ── */}
            <p className="section-eyebrow">Text Length</p>
            <h2 className="section-title">Short, dense, and information-rich</h2>
            <p className="section-desc">
              Posts are capped at 250 characters – the Twitter/X limit. With so little text,
              models must extract meaning from very few words, making every token count.
            </p>

            <div className="grid-2" style={{ marginBottom: 40 }}>
              <div className="card">
                <Pill cls="badge-blue">Character Length</Pill>
                <div style={{ marginTop: 14, marginBottom: 10, fontSize: 14, color: T.muted }}>
                  Mean: <strong style={{ color: T.text }}>127</strong> · Median: 121 · Max: 250
                </div>
                <Figure
                  src={`${BASE}/eda_char_length.png`}
                  caption="Character length distribution across all 20,000 samples"
                  height={220}
                />
                <div className="callout callout-blue" style={{ marginTop: 14 }}>
                  Most posts cluster below 200 characters – limited context per sample forces
                  models to rely heavily on local cues.
                </div>
              </div>

              <div className="card">
                <Pill cls="badge-green">Word Count</Pill>
                <div style={{ marginTop: 14, marginBottom: 10, fontSize: 14, color: T.muted }}>
                  Mean: <strong style={{ color: T.text }}>23 words</strong> · Median: 22 · Max: 58
                </div>
                <Figure
                  src={`${BASE}/eda_word_length.png`}
                  caption="Word count distribution across all samples"
                  height={220}
                />
                <div className="callout callout-blue" style={{ marginTop: 14 }}>
                  Fewer than 25 words on average – sequence models must capture meaning within
                  extremely narrow context windows.
                </div>
              </div>
            </div>

            {/* ── Text artifacts ── */}
            <p className="section-eyebrow">Text Artifacts</p>
            <h2 className="section-title">Noise, signals, and structural tokens</h2>
            <p className="section-desc">
              Raw social media text contains structured noise – placeholders, links, and emojis –
              each with different implications for preprocessing and modeling.
            </p>

            <div className="grid-3" style={{ marginBottom: 40 }}>
              {[
                {
                  pill: "[USER]", cls: "badge-blue", count: "970 rows",
                  desc: "User mention placeholders occur frequently but carry almost no semantic value – strong candidates for removal during preprocessing.",
                },
                {
                  pill: "[URL]", cls: "badge-blue", count: "2,358 rows",
                  desc: "Linked content is stripped to a placeholder. Context behind the link is lost, weakening signals in posts where the link carries the punchline.",
                },
                {
                  pill: "Emojis", cls: "badge-purple", count: "845 · 152 unique",
                  desc: "Unlike placeholders, emojis are meaningful. They encode sarcasm, mockery, and emotional tone – critical for detecting subtle animosity.",
                },
              ].map(({ pill, cls, count, desc }) => (
                <div key={pill} className="card-sm">
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                    <Pill cls={cls}>{pill}</Pill>
                    <span style={{ fontSize: 16, fontweight: 700, color: T.muted }}>{count}</span>
                  </div>
                  <p style={{ fontSize: 15, lineHeight: 1.8, color: `${T.text}cc`, margin: 0 }}>{desc}</p>
                </div>
              ))}
            </div>

            {/* ── Emojis ── */}
            <div className="card" style={{ marginBottom: 40 }}>
              <div style={{ marginBottom: 16 }}>
                <Pill cls="badge-purple">Top emojis by frequency</Pill>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {[
                  ["😂", "213", "joy/mockery"],
                  ["🤣",  "39", "laughing"],
                  ["🤔",  "38", "doubt"],
                  ["😊",  "25", "warmth"],
                  ["😁",  "22", "grin"],
                  ["😠",  "17", "anger"],
                  ["🙄",  "15", "dismissal"],
                  ["👌",  "15", "OK"],
                  ["💩",  "10", "insult"],
                  ["🖕",   "9", "hostility"],
                  ["😈",   "8", "menace"],
                  ["👹",   "8", "aggression"],
                ].map(([emoji, count, meaning]) => (
                  <div key={emoji} style={{
                    display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
                    background: T.surface, borderRadius: 10, padding: "10px 14px", minWidth: 64,
                  }}>
                    <span style={{ fontSize: 26 }}>{emoji}</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: T.text }}>{count}</span>
                    <span style={{ fontSize: 12, color: T.muted, textAlign: "center" }}>{meaning}</span>
                  </div>
                ))}
              </div>
              <div className="callout callout-blue" style={{ marginTop: 16 }}>
                Laughter dominates (😂 213, 🤣 39) – often deployed sarcastically in hostile posts.
                Anger and menace emojis (😠, 😈, 👹, 🖕) are rarer but strongly correlated with
                threats and derogation classes.
              </div>
            </div>

            {/* ── Slurs ── */}
            <p className="section-eyebrow">Offensive Language</p>
            <h2 className="section-title">Slurs – powerful but ambiguous signals</h2>
            <p className="section-desc">
              1,749 posts (8.7%) contain slurs from a curated lexicon of 36 terms. These are the
              easiest cases for models – but slurs appear across multiple classes, including
              non-sexist posts used in quotes or reclaimed contexts.
            </p>

            <div className="card" style={{ marginBottom: 40 }}>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
                <Pill cls="badge-red">1,749 posts with slurs</Pill>
                <Pill cls="badge-amber">Appear across all classes</Pill>
              </div>
              {[
                ["bitch",   596, T.red],
                ["pussy",   249, "#f97316"],
                ["whore",   206, T.accent],
                ["cunt",    201, T.blue],
                ["slut",    122, T.purple],
                ["bitches", 117, T.muted],
              ].map(([word, count, bar]) => (
                <div key={word} style={{ marginBottom: 14 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5, alignItems: "center" }}>
                    <span style={{ fontSize: 13, fontWeight: 600, fontFamily: "monospace", color: T.text }}>{word}</span>
                    <span style={{ fontSize: 13, color: T.muted }}>{count}</span>
                  </div>
                  <div className="prog-wrap">
                    <div className="prog-bar" style={{ width: `${Math.round(count / 596 * 100)}%`, background: bar }} />
                  </div>
                </div>
              ))}
              <div className="callout" style={{ marginTop: 16 }}>
                Slurs are strong lexical signals and easy wins for keyword-based models. However,
                context still matters – the same word appears in non-sexist posts used in quotes,
                references, or reclaimed contexts.
              </div>
            </div>

            {/* ── Word patterns ── */}
            <p className="section-eyebrow">Word Patterns</p>
            <h2 className="section-title">Why keywords are not enough</h2>
            <p className="section-desc">
              The most frequent words across classes reveal a core challenge: vocabulary is heavily
              shared. Classification by keywords alone will fail – models need to understand
              phrasing, order, and intent.
            </p>

            <div className="grid-2" style={{ marginBottom: 40 }}>
              {[
                {
                  badge: "Shared vocabulary", cls: "badge-blue",
                  tags: ["women","like","get","would","people","men","one","think","man","know"],
                  body: "The most common words appear in every class. They are too universal to discriminate – models cannot rely on word presence alone.",
                },
                {
                  badge: "Derogation", cls: "badge-amber",
                  tags: ["fuck women","hate women","they are","all women","stupid","worthless","disgusting"],
                  body: "Explicit patterns with hostile verbs and direct insults. Intent is clear and vocabulary is distinctive – the easiest class for models.",
                },
                {
                  badge: "Animosity", cls: "badge-blue",
                  tags: ["wife","girls","girlfriend","lol","haha","okay", "should","want","men"],
                  body: "Casual, conversational tone with slang and sarcasm. Patterns are weak and noisy – hostility hides in tone and implication.",
                },
                {
                  badge: "Prejudiced Discussion", cls: "badge-purple",
                  tags: ["women's rights","false rape","equality","patriarchy","feminism","gender","biology"],
                  body: "Argumentative, topic-driven vocabulary. Models must understand discourse-level position, not just sentiment or individual words.",
                },
              ].map(({ badge, cls, tags, body }) => (
                <div key={badge} className="card">
                  <Pill cls={cls}>{badge}</Pill>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 7, margin: "12px 0" }}>
                    {tags.map(t => (
                      <span key={t} style={{
                        fontSize: 12, background: T.surface, color: T.muted,
                        padding: "3px 9px", borderRadius: 99, marginBottom: 10
                      }}>{t}</span>
                    ))}
                  </div>
                  <p style={{ fontSize: 14, lineHeight: 1.7, color: T.text, margin: 0 }}>{body}</p>
                </div>
              ))}
            </div>

            {/* ── Examples ── */}
            <p className="section-eyebrow">Examples</p>
            <h2 className="section-title">How each category reads in the wild</h2>
            <p className="section-desc">
              Concrete examples reveal what makes each category unique – and why the boundaries
              between them are genuinely difficult to draw.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 20, marginBottom: 40, width: "90%", margin: "0 auto 40px" }}>
              {[
                {
                  badge: "Non-sexist", cls: "badge-blue", border: T.blue, bg: `${T.blue}18`,
                  label: "Benign – no gendered intent",
                  quotes: [
                    "So dumb! – a neutral disagreement with no gendered intent.",
                    "When I was growing up I always wanted to work toward being an important person. My two Ex wives have seen to it that this will never happen.",
                  ],
                  note: "These posts mention women or relationships but contain no derogatory intent – illustrating why context determines the label, not keywords.",
                },
                {
                  badge: "Derogation", cls: "badge-amber", border: "#f97316", bg: "#f9731612",
                  label: "Direct insults – intent is clear",
                  quotes: [
                    "They aren't. They never will be… Look through history, they always collapse societies.",
                    "Me. I am the Baron… Horrible SJW bitch.",
                  ],
                  note: "Vocabulary is distinctive and intent is unambiguous – the easiest class for models to identify.",
                },
                {
                  badge: "Animosity", cls: "badge-blue", border: T.accent, bg: `${T.accent}12`,
                  label: "Sarcasm & casual hostility – hardest to detect",
                  quotes: [
                    "Wait! I got the next wonder woman plot. A man identifying as wonder woman and does it better! Think it'll fly? 😁😂🤣😉",
                    "Bullshit. Most people prefer stability in relationships to being kept on their toes…",
                  ],
                  note: "Hostility wrapped in casual phrasing, sarcasm, or humour. Emojis signal the mocking tone. The hardest class to detect.",
                },
                {
                  badge: "Prejudiced Discussion", cls: "badge-purple", border: T.purple, bg: `${T.purple}12`,
                  label: "Framed as argument – requires discourse understanding",
                  quotes: [
                    "once the patriarchy is gone, the future is female… which will result in collapse, anarchy, war, destruction…",
                    "There is a Huge Fucking difference between a woman being forcibly raped and a woman having sex to advance her career.",
                  ],
                  note: "Posts use neutral-sounding vocabulary while advancing discriminatory positions – requiring discourse-level understanding.",
                },
                {
                  badge: "Threats", cls: "badge-red", border: T.red, bg: `${T.red}12`,
                  label: "Explicit harm intent – rarest but clearest",
                  quotes: [
                    "She is a loon. Putin should turn up at number 10 and give her a wee slap.",
                    "I am with you on the False Accuser Registry. she does deserve to get raped though. Empathy is dead.",
                  ],
                  note: "Rarest class (2.2%) but the most unambiguous – vocabulary is uniquely and consistently violent.",
                },
              ].map(({ badge, cls, border, bg, label, quotes, note }) => (
                <div key={badge} className="card" style={{
                  borderLeft: `4px solid ${border}`,
                  padding: "28px 32px",
                }}>

                  {/* header row */}
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
                    <Pill cls={cls}>{badge}</Pill>
                    <span style={{
                      fontSize: 13, color: T.muted, fontStyle: "italic", letterSpacing: "0.01em",
                    }}>{label}</span>
                  </div>

                  {/* quotes */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 10, margin: "18px 0" }}>
                    {quotes.map((q, i) => (
                      <div key={i} style={{
                        display: "flex", gap: 12, alignItems: "flex-start",
                        background: bg,
                        border: `1px solid ${border}28`,
                        borderRadius: 8,
                        padding: "12px 16px",
                      }}>
                        <span style={{
                          fontSize: 22, lineHeight: 1, color: border, opacity: 0.5,
                          fontFamily: "Georgia, serif", flexShrink: 0, marginTop: 2,
                        }}>"</span>
                        <p style={{
                          fontSize: 15, lineHeight: 1.75, color: T.text,
                          fontStyle: "italic", margin: 0,
                        }}>{q}</p>
                      </div>
                    ))}
                  </div>

                  {/* note */}
                  <div style={{
                    display: "flex", gap: 10, alignItems: "flex-start",
                    paddingTop: 14,
                    borderTop: `1px solid ${T.border}`,
                  }}>
                    <div style={{
                      width: 6, height: 6, borderRadius: "50%",
                      background: border, flexShrink: 0, marginTop: 7,
                    }} />
                    <p style={{ fontSize: 15, lineHeight: 1.7, color: `${T.text}cc`, margin: 0 }}>
                      {note}
                    </p>
                  </div>

                </div>
              ))}
            </div>

            {/* ── EDA Insights ── */}
            <p className="section-eyebrow">EDA Insights</p>
            <h2 className="section-title">What the data reveals</h2>
            <p className="section-desc">
              These findings are drawn directly from the corpus – patterns that only emerge
              when you look closely at the text, not just the labels.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 20, marginBottom: 40, width: "90%", margin: "0 auto 40px" }}>
              {[
                {
                  icon: "😂", color: T.accent,
                  title: "Laughter is the dominant tone – even in hostile posts",
                  body: "😂 appears 213 times, making it the single most common emoji. It is frequently deployed sarcastically in animosity and derogation posts, masking hostility behind humour. Surface sentiment alone is deeply misleading.",
                },
                {
                  icon: "📏", color: T.blue,
                  title: "Short text forces models to rely on single tokens",
                  body: "With a median of 22 words, removing just one slur or emoji can strip a post of its only discriminating signal. This makes robustness to noise – stopword removal, tokenization choices – unusually consequential.",
                },
                {
                  icon: "🔤", color: "#f97316",
                  title: "The same words appear across every class",
                  body: "\"women\", \"men\", \"like\", and \"get\" rank among the top tokens in all five classes. No single word reliably signals a category – models must learn from combinations, order, and context, not individual terms.",
                },
                {
                  icon: "🏷️", color: T.purple,
                  title: "Prejudiced Discussion is the quietest class",
                  body: "Unlike threats or derogation, prejudiced posts rarely contain slurs or emojis. They read like op-eds – calm, argued, and vocabulary-neutral. This makes them nearly invisible to keyword-based approaches.",
                },
                {
                  icon: "⚠️", color: T.red,
                  title: "Rare classes carry the highest detection cost",
                  body: "Threats (2.2%) and Prejudiced Discussion (2.4%) together total under 5% of the data, but missing them is not a minor error – it is a safety failure. Class imbalance is not just a technical problem; it is an ethical one.",
                },
              ].map(({ icon, color, title, body }) => (
                <div key={title} style={{
                  display: "flex", gap: 20, alignItems: "flex-start",
                  background: T.surface,
                  border: `1px solid ${T.border}`,
                  borderLeft: `4px solid ${color}`,
                  borderRadius: "0 12px 12px 0",
                  padding: "20px 24px",
                }}>
                  <div style={{
                    fontSize: 30, flexShrink: 0,
                    width: 44, height: 44,
                    background: `${color}18`,
                    borderRadius: 10,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>{icon}</div>
                  <div>
                    <div style={{ fontSize: 17, fontWeight: 700, color: T.text, marginBottom: 6 }}>{title}</div>
                    <div style={{ fontSize: 15, color: `${T.text}cc`, lineHeight: 1.75 }}>{body}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* ── Modeling implication ── */}
            <p className="section-eyebrow">Modeling Implication</p>
            <h2 className="section-title">What the data demands from models</h2>

            <div className="grid-3" style={{ marginBottom: 40 }}>
              {[
                {
                  cls: "badge-blue", label: "Keyword models",
                  verdict: "Insufficient", verdictColor: T.red,
                  body: "TF-IDF and bag-of-words capture explicit slurs and derogation but collapse entirely on animosity and prejudiced discussion – the two subtlest and most discourse-dependent classes.",
                },
                {
                  cls: "badge-green", label: "BiLSTM + GloVe",
                  verdict: "Partial coverage", verdictColor: "#f97316",
                  body: "Word order and local phrasing give BiLSTM an edge over keywords. GloVe embeddings bring semantic similarity – but the fixed context window limits understanding of long-range intent.",
                },
                {
                  cls: "badge-amber", label: "RoBERTa",
                  verdict: "Full coverage", verdictColor: T.accent,
                  body: "Bidirectional context across the full post, pre-trained on 160GB of text. The only architecture capable of handling the full spectrum – from explicit insults to implicit, argument-framed bias.",
                },
              ].map(({ cls, label, verdict, verdictColor, body }) => (
                <div key={label} className="card" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Pill cls={cls}>{label}</Pill>
                    <span style={{ fontSize: 12, fontWeight: 600, color: verdictColor }}>{verdict}</span>
                  </div>
                  <p style={{ fontSize: 15, lineHeight: 1.75, color: `${T.text}cc`, margin: 0 }}>{body}</p>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* ══════ TAB 3: Pipeline & Models ════════════════════════════ */}
        {tab === "pipeline" && (
          <div className="tab-content">

            {/* ── Intro ── */}
            <p className="section-eyebrow">Data Pipeline</p>
            <h2 className="section-title">From raw text to model input</h2>
            <p className="section-desc">
              Preprocessing and loading differ between the two paths – each is designed to
              match its model's requirements rather than applying a one-size-fits-all approach.
            </p>

            {/* ── Pipeline cards ── */}
            <div className="grid-2" style={{ marginBottom: 48 }}>
              {[
                {
                  badge: "BiLSTM path", cls: "badge-blue", border: T.blue,
                  steps: [
                    { label: "Normalisation",  icon: "🔡", val: "Lowercase · strip URLs / mentions / emojis" },
                    { label: "Vocabulary",     icon: "📖", val: "Top-20 000 tokens built from training text only" },
                    { label: "Embeddings",     icon: "🧠", val: "GloVe Twitter 27B – 200d · OOV → random init" },
                    { label: "Sequence",       icon: "📏", val: "Padded / truncated to max_len = 64" },
                    { label: "Class weights",  icon: "⚖️", val: "sklearn balanced_class_weight on train labels" },
                    { label: "DataLoader",     icon: "📦", val: "Batch 32 · shuffle train · stratified dev split" },
                  ],
                  note: "GloVe Twitter pre-encodes slang and abbreviations common in this domain – a meaningful advantage over Wikipedia-trained vectors.",
                },
                {
                  badge: "RoBERTa path", cls: "badge-green", border: T.accent,
                  steps: [
                    { label: "Normalisation",  icon: "🔡", val: "Minimal – tokeniser handles raw text natively" },
                    { label: "Tokeniser",      icon: "✂️",  val: "HuggingFace AutoTokenizer (roberta-base)" },
                    { label: "Sequence",       icon: "📏", val: "max_length 80–96 tokens · truncation + padding" },
                    { label: "Fine-tuning",    icon: "🎯", val: "Full fine-tuning – all layers + classifier head" },
                    { label: "Scheduler",      icon: "📈", val: "Linear warmup (10% steps) then linear decay" },
                    { label: "Precision",      icon: "⚡", val: "fp16 mixed precision · AdamW · batch 16–32" },
                  ],
                  note: "Full fine-tuning – not just top-layer probing – is critical for adapting to subtle domain-specific linguistic patterns.",
                },
              ].map(({ badge, cls, border, steps, note }) => (
                <div key={badge} className="card" style={{ borderTop: `3px solid ${border}`, padding: "28px 32px" }}>
                  <Pill cls={cls}>{badge}</Pill>
                  <div style={{ display: "flex", flexDirection: "column", gap: 0, margin: "20px 0" }}>
                    {steps.map(({ label, icon, val }, i, arr) => (
                      <div key={label} style={{
                        display: "flex", gap: 14, alignItems: "flex-start",
                        padding: "12px 0",
                        borderBottom: i < arr.length - 1 ? `1px solid ${T.border}` : "none",
                      }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 11, fontWeight: 700, color: T.hint, textTransform: "uppercase",
                            letterSpacing: "0.08em", marginBottom: 3 }}>{label}</div>
                          <div style={{ fontSize: 15, color: T.text, lineHeight: 1.6 }}>
                            <span style={{ marginRight: 7 }}>{icon}</span>{val}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="callout callout-blue" style={{ fontSize: 14, lineHeight: 1.7 }}>{note}</div>
                </div>
              ))}
            </div>

            {/* ── Architecture ── */}
            <p className="section-eyebrow">Models</p>
            <h2 className="section-title">Architecture comparison</h2>
            <p className="section-desc">
              Two fundamentally different approaches to sequence understanding – a recurrent
              network with pre-trained word vectors versus a pre-trained transformer with full fine-tuning.
            </p>

            <div className="grid-2" style={{ marginBottom: 48 }}>
              {[
                {
                  name: "BiLSTM", cls: "badge-blue", border: T.blue,
                  sub: "GloVe Twitter 200d · 2-layer bidirectional",
                  tag: "RNN",
                  arch: "Embedding → BiLSTM ×2 → max/last-hidden pooling → Dropout 0.3 → Linear",
                  rows: [
                    { label: "Optimiser",   val: "Adam · LR 1e-3" },
                    { label: "Scheduler",   val: "ReduceLROnPlateau on val Macro F1" },
                    { label: "Loss",        val: "Weighted CrossEntropy or Focal (γ = 2)" },
                    { label: "Regulariser", val: "Dropout 0.3 · L2 weight decay · early stopping (patience 4–6)" },
                  ],
                  params: "~5M",
                  strength: "Captures local phrasing and word order within a narrow window.",
                  weakness: "Fixed context window limits cross-sentence reasoning.",
                },
                {
                  name: "RoBERTa-base", cls: "badge-green", border: T.accent,
                  sub: "125M parameters · full fine-tuning",
                  tag: "Transformer",
                  arch: "roberta-base → linear classification head (AutoModelForSequenceClassification)",
                  rows: [
                    { label: "Optimiser",   val: "AdamW · LR 1e-5 to 2e-5" },
                    { label: "Scheduler",   val: "Linear warmup + linear decay" },
                    { label: "Loss",        val: "Weighted CrossEntropy + optional label smoothing" },
                    { label: "Regulariser", val: "Weight decay · fp16 mixed precision · early stopping (patience 4–6)" },
                  ],
                  params: "125M",
                  strength: "Full bidirectional context across the entire post.",
                  weakness: "25× more parameters – significantly higher compute cost.",
                },
              ].map(({ name, cls, border, sub, tag, arch, rows, params, strength, weakness }) => (
                <div key={name} className="card" style={{ borderTop: `3px solid ${border}`, padding: "28px 32px" }}>

                  {/* header */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                    <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                      <div style={{ fontSize: 20, fontWeight: 700, color: T.text, marginBottom: 4 }}>{name}</div>
                      <div style={{ fontSize: 13, color: T.muted }}>{sub}</div>
                    </div>
                    <Pill cls={cls}>{tag}</Pill>
                  </div>

                  {/* param count badge */}
                  <div style={{
                    display: "inline-flex", alignItems: "center", gap: 6,
                    background: T.surface, border: `1px solid ${T.border}`,
                    borderRadius: 8, padding: "5px 12px", margin: "0 0 14px",
                  }}>
                    <span style={{ fontSize: 12, color: T.hint, textTransform: "uppercase", letterSpacing: "0.07em" }}>Parameters</span>
                    <span style={{ fontSize: 15, fontWeight: 700, color: T.text }}>{params}</span>
                  </div>

                  {/* architecture flow */}
                  <div style={{
                    background: T.surface, borderRadius: 8,
                    padding: "12px 16px", marginBottom: 20,
                    fontSize: 13, color: T.muted, lineHeight: 1.7,
                    fontFamily: "monospace",
                  }}>
                    {arch}
                  </div>

                  {/* spec rows */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 0, marginBottom: 20 }}>
                    {rows.map(({ label, val }, i, arr) => (
                      <div key={label} style={{
                        display: "flex", gap: 14, padding: "12px 0",
                        borderBottom: i < arr.length - 1 ? `1px solid ${T.border}` : "none",
                        alignItems: "flex-start",
                      }}>
                        <span style={{
                          fontSize: 11, fontWeight: 700, color: T.hint,
                          textTransform: "uppercase", letterSpacing: "0.08em",
                          minWidth: 100, flexShrink: 0, marginTop: 2,
                        }}>{label}</span>
                        <span style={{ fontSize: 14, color: T.text, lineHeight: 1.6 }}>{val}</span>
                      </div>
                    ))}
                  </div>

                  {/* strength / weakness */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                      <span style={{ fontSize: 14, flexShrink: 0, marginTop: 1 }}>✅</span>
                      <span style={{ fontSize: 14, color: `${T.text}cc`, lineHeight: 1.65 }}>{strength}</span>
                    </div>
                    <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                      <span style={{ fontSize: 14, flexShrink: 0, marginTop: 1 }}>⚠️</span>
                      <span style={{ fontSize: 14, color: `${T.text}cc`, lineHeight: 1.65 }}>{weakness}</span>
                    </div>
                  </div>

                </div>
              ))}
            </div>
            {/* ── Head-to-head comparison ── */}
            <p className="section-eyebrow">Side-by-side</p>
            <h2 className="section-title">How the two approaches differ</h2>

            <div className="card" style={{ marginBottom: 48, padding: "28px 32px" }}>
              {[
                { aspect: "Context window",    bilstm: "Local – sliding over tokens", roberta: "Global – full post at once" },
                { aspect: "Pre-training data", bilstm: "GloVe Twitter 27B tokens",    roberta: "160GB web text (BooksCorpus + CC-News)" },
                { aspect: "OOV handling",      bilstm: "Random init for unknown words", roberta: "Byte-pair encoding – no true OOV" },
                { aspect: "Training cost",     bilstm: "Fast – minutes per epoch",    roberta: "Slow – GPU-hours per run" },
                { aspect: "Pooling strategy",  bilstm: "Max-pool or last hidden state", roberta: "[CLS] token representation" },
                { aspect: "Suited for",        bilstm: "Explicit, keyword-rich cases", roberta: "Subtle, context-dependent cases" },
              ].map(({ aspect, bilstm, roberta }, i, arr) => (
                <div key={aspect} style={{
                  display: "grid",
                  gridTemplateColumns: "160px 1fr 1fr",
                  gap: 16, padding: "14px 0",
                  borderBottom: i < arr.length - 1 ? `1px solid ${T.border}` : "none",
                  alignItems: "center",
                }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: T.hint,
                    textTransform: "uppercase", letterSpacing: "0.07em" }}>{aspect}</span>
                  <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    <Pill cls="badge-blue">BiLSTM</Pill>
                    <span style={{ fontSize: 14, color: `${T.text}cc`, lineHeight: 1.6 }}>{bilstm}</span>
                  </div>
                  <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    <Pill cls="badge-green">RoBERTa</Pill>
                    <span style={{ fontSize: 14, color: `${T.text}cc`, lineHeight: 1.6 }}>{roberta}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* ── Experiment configs ── */}
            <p className="section-eyebrow">Experiment System</p>
            <h2 className="section-title">Six configurations, six hypotheses</h2>
            <p className="section-desc">
              Each YAML config tests a distinct hypothesis about loss functions, learning rates,
              pooling, and regularisation. Results auto-log to CSV with full hyperparameter
              metadata for cross-run comparison.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 48 }}>
              {[
                {
                  version: "v1", color: T.muted,
                  label: "Baseline",
                  hypothesis: "A clean starting point – Focal Loss active, all hyperparameters at their defaults. Every subsequent config measures improvement against this run.",
                  changes: [],
                  specs: {
                    Loss: "Focal (γ = 2.0)", "RNN LR": "1e-3", "TF LR": "2e-5",
                    Pooling: "max", Smoothing: "–", Epochs: "20", Patience: "4",
                    "TF Batch": "32", Warmup: "10%",
                  },
                },
                {
                  version: "v2", color: T.blue,
                  label: "Focal → CrossEntropy",
                  hypothesis: "Focal Loss was the obvious choice for imbalanced data – but was it actually helping? This config strips it out entirely to test whether the complexity was justified or counterproductive.",
                  changes: ["Focal Loss OFF", "Label smoothing OFF", "max_len 80 → 96", "Batch 32 → 16", "LR 2e-5 → 1.5e-5"],
                  specs: {
                    Loss: "CrossEntropy", "RNN LR": "1e-3", "TF LR": "1.5e-5",
                    Pooling: "max", Smoothing: "–", Epochs: "25", Patience: "6",
                    "TF Batch": "16", Warmup: "10%",
                  },
                },
                {
                  version: "v3", color: T.purple,
                  label: "Label smoothing ON",
                  hypothesis: "CrossEntropy alone may push the model to be overconfident on the majority class. Adding label smoothing (0.1) softens the targets – forcing the transformer to hedge its predictions and potentially recover recall on rare classes like Threats.",
                  changes: ["Label smoothing 0.0 → 0.1", "LR 1.5e-5 → 2e-5"],
                  specs: {
                    Loss: "CrossEntropy", "RNN LR": "1e-3", "TF LR": "2e-5",
                    Pooling: "max", Smoothing: "0.1", Epochs: "25", Patience: "6",
                    "TF Batch": "16", Warmup: "10%",
                  },
                },
                {
                  version: "v4", color: "#f97316",
                  label: "Larger RNN + cautious TF",
                  hypothesis: "Two separate bets in one config – was BiLSTM underfitting due to limited capacity, or was the learning rate moving too fast to land in a good minimum? Doubling hidden dim tests the former; halving the LR and stretching warmup tests the latter.",
                  changes: ["Hidden dim 128 → 256", "TF LR 2e-5 → 1e-5", "Warmup 10% → 20%", "Weight decay 1e-5 → 1e-4 (RNN)", "Epochs → 30"],
                  specs: {
                    Loss: "CrossEntropy", "RNN LR": "1e-3", "TF LR": "1e-5",
                    Pooling: "max", Smoothing: "0.1", Epochs: "30", Patience: "6",
                    "TF Batch": "16", Warmup: "20%",
                  },
                },
                {
                  version: "v5", color: T.red,
                  label: "Focal Loss on RoBERTa",
                  hypothesis: "Focal Loss was only ever paired with BiLSTM in v1 – its effect on the transformer was never actually measured. This config runs that missing experiment in isolation, with smoothing OFF to avoid confounding the signal.",
                  changes: ["Focal Loss ON for transformer", "Label smoothing OFF", "LR back to 2e-5"],
                  specs: {
                    Loss: "Focal (γ = 2.0)", "RNN LR": "1e-3", "TF LR": "2e-5",
                    Pooling: "max", Smoothing: "–", Epochs: "25", Patience: "6",
                    "TF Batch": "16", Warmup: "10%",
                  },
                },
                {
                  version: "v6", color: T.accent,
                  label: "Small batch + aggressive patience",
                  hypothesis: "Halving the batch size doubles the number of gradient updates per epoch – a form of implicit regularisation that can help on noisy, short-text data. Paired with tighter gradient clipping, stronger smoothing, and a longer patience budget to give the model room to find a better minimum.",
                  changes: ["TF batch 16 → 8", "RNN batch 32 → 16", "Patience 6 → 8", "Grad clip 1.0 → 0.5", "RNN LR 1e-3 → 5e-4", "Smoothing → 0.15", "Epochs → 30"],
                  specs: {
                    Loss: "CrossEntropy", "RNN LR": "5e-4", "TF LR": "1.5e-5",
                    Pooling: "max", Smoothing: "0.15", Epochs: "30", Patience: "8",
                    "TF Batch": "8", Warmup: "10%",
                  },
                },
              ].map(({ version, color, label, hypothesis, changes, specs }) => (
                <div key={version} className="card" style={{
                  borderLeft: `4px solid ${color}`,
                  borderRadius: "0 12px 12px 0",
                  padding: "24px 28px",
                  background: `linear-gradient(135deg, ${color}06 0%, ${T.card} 60%)`,
                }}>

                  {/* header */}
                  <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap", marginBottom: 12 }}>
                    <code style={{
                      fontSize: 14, fontWeight: 700,
                      background: `${color}18`,
                      border: `1px solid ${color}40`,
                      borderRadius: 6, padding: "3px 10px",
                      color: color,
                    }}>{version}</code>
                    <span style={{ fontSize: 17, fontWeight: 700, color: T.text }}>{label}</span>
                  </div>

                  {/* hypothesis */}
                  <p style={{ fontSize: 15, lineHeight: 1.75, color: `${T.text}cc`, margin: "0 auto 16px", width: "90%" }}>
                    {hypothesis}
                  </p>

                  {/* changes */}
                  {changes.length > 0 && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16, justifyContent: "center" }}>
                      {changes.map(c => (
                        <span key={c} style={{
                          fontSize: 12, fontWeight: 600,
                          color: color,
                          background: `${color}12`,
                          border: `1px solid ${color}35`,
                          borderRadius: 99, padding: "4px 12px",
                        }}>{c}</span>
                      ))}
                    </div>
                  )}

                  {/* specs – 5 + 4 */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 10 }}>
                      {Object.entries(specs).slice(0, 5).map(([k, v]) => (
                        <div key={k} style={{
                          background: `${color}08`,
                          border: `1px solid ${color}25`,
                          borderRadius: 8, padding: "8px 12px",
                        }}>
                          <div style={{ fontSize: 11, color: color, opacity: 0.8, textTransform: "uppercase",
                            letterSpacing: "0.07em", fontWeight: 700, marginBottom: 3 }}>{k}</div>
                          <div style={{ fontSize: 13, fontWeight: 600, color: T.text }}>{v}</div>
                        </div>
                      ))}
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
                      {Object.entries(specs).slice(5).map(([k, v]) => (
                        <div key={k} style={{
                          background: `${color}08`,
                          border: `1px solid ${color}25`,
                          borderRadius: 8, padding: "8px 12px",
                        }}>
                          <div style={{ fontSize: 11, color: color, opacity: 0.8, textTransform: "uppercase",
                            letterSpacing: "0.07em", fontWeight: 700, marginBottom: 3 }}>{k}</div>
                          <div style={{ fontSize: 13, fontWeight: 600, color: T.text }}>{v}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              ))}
            </div>

          </div>
        )}

        {/* ══════ TAB 4: Results ══════════════════════════════════════ */}
        {tab === "results" && (
          <div className="tab-content">

            {/* ── Hero stat row ── */}
            <p className="section-eyebrow">Experiment Overview</p>
            <h2 className="section-title">Six configs. Two models. Two tasks. 24 runs.</h2>
            <p className="section-desc">
              Every number is macro F1 on the held-out test set of 4,000 samples.
              The pattern that emerges is unambiguous – RoBERTa dominates both tasks,
              Task B is substantially harder for everyone, and no amount of tuning
              alone closes the gap on the hardest class boundaries.
            </p>

            <div className="grid-4" style={{ marginBottom : 48 }}>
              {[
                { num : "0.836", label : "Best binary – RoBERTa",  sub : "v1 · Focal + LS",    color : T.accent },
                { num : "0.624", label : "Best category – RoBERTa", sub : "v2 / v3 · CE + LS",  color : T.green  },
                { num : "0.759", label : "Best binary – BiLSTM",   sub : "v6 · CE + LS 0.15",  color : T.blue   },
                { num : "0.488", label : "Best category – BiLSTM", sub : "v6 · CE + LS 0.15",  color : T.muted  },
              ].map(({ num, label, sub, color }) => (
                <div key={label} className="stat-card">
                  <div className="stat-num" style={{ color }}>{num}</div>
                  <div className="stat-label" style={{ marginBottom : 4 }}>{label}</div>
                  <div style={{ fontSize : 12, color : T.hint }}>{sub}</div>
                </div>
              ))}
            </div>

            {/* ── Full results table ── */}
            <p className="section-eyebrow">Full Results</p>
            <h2 className="section-title">All runs at a glance</h2>
            <p className="section-desc">
              Sorted by model and task. Macro F1 is the primary metric – it treats all
              classes equally regardless of support, making it the right choice for
              an imbalanced dataset where minority classes matter most.
            </p>

            <div style={{ marginBottom : 48 }}>
              <Collapse title="Expand full results table" open>
                <DataTable
                  cols={["Model", "Task", "Config", "Loss", "Accuracy", "Macro F1 ↑", "Weighted F1"]}
                  rows={[
                    /* RoBERTa Binary */
                    [<Pill key="r" cls="badge-green">RoBERTa</Pill>, "Binary", <code key="v1">v1</code>, "Focal + LS 0.1", "0.879", <strong key="f" style={{ color : T.accent }}>0.836</strong>, "0.879"],
                    [<Pill key="r" cls="badge-green">RoBERTa</Pill>, "Binary", <code key="v2">v2</code>, "CE only",        "0.877", <strong key="f" style={{ color : T.accent }}>0.827</strong>, "0.875"],
                    [<Pill key="r" cls="badge-green">RoBERTa</Pill>, "Binary", <code key="v3">v3</code>, "CE + LS 0.1",    "0.864", <strong key="f" style={{ color : T.accent }}>0.820</strong>, "0.866"],
                    [<Pill key="r" cls="badge-green">RoBERTa</Pill>, "Binary", <code key="v4">v4</code>, "CE + LS 0.1",    "0.866", <strong key="f" style={{ color : T.accent }}>0.821</strong>, "0.867"],
                    [<Pill key="r" cls="badge-green">RoBERTa</Pill>, "Binary", <code key="v5">v5</code>, "Focal",          "0.871", <strong key="f" style={{ color : T.accent }}>0.826</strong>, "0.871"],
                    [<Pill key="r" cls="badge-green">RoBERTa</Pill>, "Binary", <code key="v6">v6</code>, "CE + LS 0.15",   "0.877", <strong key="f" style={{ color : T.accent }}>0.828</strong>, "0.877"],
                    /* RoBERTa Category */
                    [<Pill key="r" cls="badge-green">RoBERTa</Pill>, "Category", <code key="v1">v1</code>, "Focal + LS 0.1", "0.619", <strong key="f" style={{ color : T.accent }}>0.605</strong>, "0.610"],
                    [<Pill key="r" cls="badge-green">RoBERTa</Pill>, "Category", <code key="v2">v2</code>, "CE only",        "0.622", <strong key="f" style={{ color : T.accent }}>0.603</strong>, "0.621"],
                    [<Pill key="r" cls="badge-green">RoBERTa</Pill>, "Category", <code key="v3">v3</code>, "CE + LS 0.1",    "0.635", <strong key="f" style={{ color : T.accent }}>0.624</strong>, "0.634"],
                    [<Pill key="r" cls="badge-green">RoBERTa</Pill>, "Category", <code key="v4">v4</code>, "CE + LS 0.1",    "0.606", <strong key="f" style={{ color : T.accent }}>0.601</strong>, "0.606"],
                    [<Pill key="r" cls="badge-green">RoBERTa</Pill>, "Category", <code key="v5">v5</code>, "Focal",          "0.630", <strong key="f" style={{ color : T.accent }}>0.620</strong>, "0.630"],
                    [<Pill key="r" cls="badge-green">RoBERTa</Pill>, "Category", <code key="v6">v6</code>, "CE + LS 0.15",   "0.608", <strong key="f" style={{ color : T.accent }}>0.571</strong>, "0.608"],
                    /* BiLSTM Binary */
                    [<Pill key="b" cls="badge-blue">BiLSTM</Pill>, "Binary", <code key="v1">v1</code>, "Focal + LS 0.1", "0.796", <strong key="f" style={{ color : T.blue }}>0.732</strong>, "0.799"],
                    [<Pill key="b" cls="badge-blue">BiLSTM</Pill>, "Binary", <code key="v2">v2</code>, "CE only",        "0.804", <strong key="f" style={{ color : T.blue }}>0.738</strong>, "0.805"],
                    [<Pill key="b" cls="badge-blue">BiLSTM</Pill>, "Binary", <code key="v3">v3</code>, "CE + LS 0.1",    "0.817", <strong key="f" style={{ color : T.blue }}>0.756</strong>, "0.819"],
                    [<Pill key="b" cls="badge-blue">BiLSTM</Pill>, "Binary", <code key="v4">v4</code>, "CE + LS 0.1",    "0.812", <strong key="f" style={{ color : T.blue }}>0.757</strong>, "0.813"],
                    [<Pill key="b" cls="badge-blue">BiLSTM</Pill>, "Binary", <code key="v5">v5</code>, "Focal",          "0.806", <strong key="f" style={{ color : T.blue }}>0.744</strong>, "0.809"],
                    [<Pill key="b" cls="badge-blue">BiLSTM</Pill>, "Binary", <code key="v6">v6</code>, "CE + LS 0.15",   "0.823", <strong key="f" style={{ color : T.blue }}>0.759</strong>, "0.823"],
                    /* BiLSTM Category */
                    [<Pill key="b" cls="badge-blue">BiLSTM</Pill>, "Category", <code key="v1">v1</code>, "Focal + LS 0.1", "0.431", <strong key="f" style={{ color : T.blue }}>0.412</strong>, "0.420"],
                    [<Pill key="b" cls="badge-blue">BiLSTM</Pill>, "Category", <code key="v2">v2</code>, "CE only",        "0.481", <strong key="f" style={{ color : T.blue }}>0.437</strong>, "0.478"],
                    [<Pill key="b" cls="badge-blue">BiLSTM</Pill>, "Category", <code key="v3">v3</code>, "CE + LS 0.1",    "0.502", <strong key="f" style={{ color : T.blue }}>0.466</strong>, "0.502"],
                    [<Pill key="b" cls="badge-blue">BiLSTM</Pill>, "Category", <code key="v4">v4</code>, "CE + LS 0.1",    "0.529", <strong key="f" style={{ color : T.blue }}>0.482</strong>, "0.529"],
                    [<Pill key="b" cls="badge-blue">BiLSTM</Pill>, "Category", <code key="v5">v5</code>, "Focal",          "0.528", <strong key="f" style={{ color : T.blue }}>0.486</strong>, "0.528"],
                    [<Pill key="b" cls="badge-blue">BiLSTM</Pill>, "Category", <code key="v6">v6</code>, "CE + LS 0.15",   "0.522", <strong key="f" style={{ color : T.blue }}>0.488</strong>, "0.522"],
                  ]}
                />
              </Collapse>
            </div>

            {/* ── Task A deep dive ── */}
            <p className="section-eyebrow">Task A – Binary Detection</p>
            <h2 className="section-title">RoBERTa vs BiLSTM: the gap is not small</h2>
            <p className="section-desc">
              RoBERTa's best run beats BiLSTM's best by 7.7 points of macro F1 on binary detection.
              The margin is not a tuning artefact – it holds across every single config.
              The Sexist class is where the gap is widest: BiLSTM peaks at F1 0.63 on Sexist,
              while RoBERTa reaches 0.75. Context is the difference.
            </p>

            <div className="grid-2" style={{ marginBottom : 20 }}>
              {[
                {
                  model  : "RoBERTa", cls : "badge-green", border : T.accent,
                  best   : "v1 – Focal + LS 0.1",
                  f1     : "0.836", acc : "0.879",
                  notSexist : { p : 0.92, r : 0.92, f : 0.92 },
                  sexist    : { p : 0.75, r : 0.75, f : 0.75 },
                  fp : 244, fn : 240,
                  note : "Focal loss proved most effective for binary detection – penalising overconfident wrong predictions on the dominant Not sexist class directly improved Sexist recall without sacrificing precision.",
                },
                {
                  model  : "BiLSTM", cls : "badge-blue", border : T.blue,
                  best   : "v6 – CE + LS 0.15",
                  f1     : "0.759", acc : "0.823",
                  notSexist : { p : 0.88, r : 0.88, f : 0.88 },
                  sexist    : { p : 0.63, r : 0.64, f : 0.63 },
                  fp : 355, fn : 354,
                  note : "BiLSTM's ceiling on the Sexist class is a representation problem, not a tuning problem. GloVe embeddings cannot encode pragmatic or tonal signals – the same vectors for 'dumb' appear in sarcasm, insults, and neutral disagreements alike.",
                },
              ].map(({ model, cls, border, best, f1, acc, notSexist, sexist, fp, fn, note }) => (
                <div key={model} className="card" style={{ borderTop : `3px solid ${border}` }}>
                  <div style={{ display : "flex", justifyContent : "space-between", alignItems : "flex-start", marginBottom : 18 }}>
                    <div>
                      <Pill cls={cls}>{model}</Pill>
                      <div style={{ fontSize : 12, color : T.hint, marginTop : 6 }}>Best config: {best}</div>
                    </div>
                    <div style={{ textAlign : "right" }}>
                      <div style={{ fontSize : 26, fontWeight : 700, color : border, lineHeight : 1 }}>{f1}</div>
                      <div style={{ fontSize : 11, color : T.hint, marginTop : 2 }}>Macro F1</div>
                    </div>
                  </div>

                  {/* per-class breakdown */}
                  {[
                    { label : "Not sexist", d : notSexist, color : T.muted },
                    { label : "Sexist",     d : sexist,    color : border   },
                  ].map(({ label, d, color }) => (
                    <div key={label} style={{ marginBottom : 14 }}>
                      <div style={{ display : "flex", justifyContent : "space-between", marginBottom : 5, alignItems : "center" }}>
                        <span style={{ fontSize : 13, color : T.text }}>{label}</span>
                        <div style={{ display : "flex", gap : 16, fontSize : 12, color : T.muted }}>
                          <span>P <strong style={{ color : T.text }}>{d.p.toFixed(2)}</strong></span>
                          <span>R <strong style={{ color : T.text }}>{d.r.toFixed(2)}</strong></span>
                          <span>F1 <strong style={{ color }}>{d.f.toFixed(2)}</strong></span>
                        </div>
                      </div>
                      <div className="prog-wrap">
                        <div className="prog-bar" style={{ width : `${d.f * 100}%`, background : color }} />
                      </div>
                    </div>
                  ))}

                  {/* error counts */}
                  <div style={{ display : "flex", gap : 12, margin : "16px 0" }}>
                    {[
                      { label : "False positives", val : fp, sub : "not sexist → sexist" },
                      { label : "False negatives", val : fn, sub : "sexist → not sexist" },
                    ].map(({ label, val, sub }) => (
                      <div key={label} style={{
                        flex : 1, background : T.surface, borderRadius : 8, padding : "10px 14px",
                      }}>
                        <div style={{ fontSize : 18, fontWeight : 700, color : T.text }}>{val}</div>
                        <div style={{ fontSize : 12, color : T.muted }}>{label}</div>
                        <div style={{ fontSize : 11, color : T.hint, marginTop : 2 }}>{sub}</div>
                      </div>
                    ))}
                  </div>

                  <div className="callout callout-blue" style={{ fontSize : 14, lineHeight : 1.7 }}>{note}</div>
                </div>
              ))}
            </div>

            {/* cross-config binary progression */}
            <div className="card" style={{ marginBottom : 48 }}>
              <div style={{ fontSize : 15, fontWeight : 600, color : T.text, marginBottom : 18 }}>
                Macro F1 progression across configs – Binary
              </div>
              <div style={{ display : "flex", flexDirection : "column", gap : 10 }}>
                {[
                  { cfg : "v1", rob : 0.836, bil : 0.732 },
                  { cfg : "v2", rob : 0.827, bil : 0.738 },
                  { cfg : "v3", rob : 0.820, bil : 0.756 },
                  { cfg : "v4", rob : 0.821, bil : 0.757 },
                  { cfg : "v5", rob : 0.826, bil : 0.744 },
                  { cfg : "v6", rob : 0.828, bil : 0.759 },
                ].map(({ cfg, rob, bil }) => (
                  <div key={cfg} style={{ display : "grid", gridTemplateColumns : "36px 1fr 64px 1fr 64px", gap : 10, alignItems : "center" }}>
                    <code style={{ fontSize : 12, color : T.hint }}>{cfg}</code>
                    <div className="prog-wrap">
                      <div className="prog-bar" style={{ width : `${(rob - 0.7) / 0.2 * 100}%`, background : T.accent }} />
                    </div>
                    <span style={{ fontSize : 13, fontWeight : 600, color : T.accent, textAlign : "right" }}>{rob.toFixed(3)}</span>
                    <div className="prog-wrap">
                      <div className="prog-bar" style={{ width : `${(bil - 0.7) / 0.2 * 100}%`, background : T.blue }} />
                    </div>
                    <span style={{ fontSize : 13, fontWeight : 600, color : T.blue, textAlign : "right" }}>{bil.toFixed(3)}</span>
                  </div>
                ))}
                <div style={{ display : "grid", gridTemplateColumns : "36px 1fr 64px 1fr 64px", gap : 10, marginTop : 4 }}>
                  <span />
                  <div style={{ display : "flex", alignItems : "center", gap : 6 }}>
                    <div style={{ width : 8, height : 8, borderRadius : "50%", background : T.accent }} />
                    <span style={{ fontSize : 12, color : T.muted }}>RoBERTa</span>
                  </div>
                  <span />
                  <div style={{ display : "flex", alignItems : "center", gap : 6 }}>
                    <div style={{ width : 8, height : 8, borderRadius : "50%", background : T.blue }} />
                    <span style={{ fontSize : 12, color : T.muted }}>BiLSTM</span>
                  </div>
                  <span />
                </div>
              </div>
            </div>

            {/* ── Task B deep dive ── */}
            <p className="section-eyebrow">Task B – Category Classification</p>
            <h2 className="section-title">The hardest task – and a ceiling neither model broke</h2>
            <p className="section-desc">
              Four-class classification over sexist posts only. Every config, every model,
              every loss function converged on the same problem: Animosity and Derogation
              bleed into each other. The boundary between them is not a matter of words or
              phrasing – it is a matter of intent, and intent does not live in surface form.
            </p>

            <div className="grid-2" style={{ marginBottom : 20 }}>
              {[
                {
                  model : "RoBERTa", cls : "badge-green", border : T.accent,
                  best : "v3 – CE + LS 0.1",
                  f1 : "0.624", acc : "0.635",
                  classes : [
                    { label : "Threats",              p : 0.65, r : 0.76, f : 0.70, support : 89  },
                    { label : "Derogation",           p : 0.69, r : 0.63, f : 0.66, support : 454 },
                    { label : "Animosity",            p : 0.57, r : 0.65, f : 0.61, support : 333 },
                    { label : "Prejudiced Disc.",     p : 0.60, r : 0.46, f : 0.52, support : 94  },
                  ],
                  note : "v3 remains the best RoBERTa category result across all six configs. Every subsequent attempt – lower LR, focal loss, smaller batch, more smoothing – failed to beat it. This is the ceiling for base RoBERTa on this corpus.",
                },
                {
                  model : "BiLSTM", cls : "badge-blue", border : T.blue,
                  best : "v6 – CE + LS 0.15",
                  f1 : "0.488", acc : "0.522",
                  classes : [
                    { label : "Threats",              p : 0.42, r : 0.54, f : 0.48, support : 89  },
                    { label : "Derogation",           p : 0.49, r : 0.33, f : 0.39, support : 454 },
                    { label : "Animosity",            p : 0.39, r : 0.60, f : 0.48, support : 333 },
                    { label : "Prejudiced Disc.",     p : 0.48, r : 0.22, f : 0.30, support : 94  },
                  ],
                  note : "BiLSTM's category ceiling barely moved across six configs – only 7.6 points of spread from v1 to v6. The architecture found its representational limit with GloVe + max-pooling. Vocabulary simply cannot encode the pragmatic distinctions that separate these classes.",
                },
              ].map(({ model, cls, border, best, f1, acc, classes, note }) => (
                <div key={model} className="card" style={{ borderTop : `3px solid ${border}` }}>
                  <div style={{ display : "flex", justifyContent : "space-between", alignItems : "flex-start", marginBottom : 18 }}>
                    <div>
                      <Pill cls={cls}>{model}</Pill>
                      <div style={{ fontSize : 12, color : T.hint, marginTop : 6 }}>Best config: {best}</div>
                    </div>
                    <div style={{ textAlign : "right" }}>
                      <div style={{ fontSize : 26, fontWeight : 700, color : border, lineHeight : 1 }}>{f1}</div>
                      <div style={{ fontSize : 11, color : T.hint, marginTop : 2 }}>Macro F1</div>
                    </div>
                  </div>

                  {classes.map(({ label, p, r, f }) => (
                    <div key={label} style={{ marginBottom : 12 }}>
                      <div style={{ display : "flex", justifyContent : "space-between", marginBottom : 5, alignItems : "center" }}>
                        <span style={{ fontSize : 13, color : T.text }}>{label}</span>
                        <div style={{ display : "flex", gap : 14, fontSize : 12, color : T.muted }}>
                          <span>P <strong style={{ color : T.text }}>{p.toFixed(2)}</strong></span>
                          <span>R <strong style={{ color : T.text }}>{r.toFixed(2)}</strong></span>
                          <span>F1 <strong style={{ color : border }}>{f.toFixed(2)}</strong></span>
                        </div>
                      </div>
                      <div className="prog-wrap">
                        <div className="prog-bar" style={{ width : `${f * 100}%`, background : border, opacity : label === "Animosity" ? 1 : 0.55 }} />
                      </div>
                    </div>
                  ))}

                  <div className="callout callout-blue" style={{ marginTop : 16, fontSize : 14, lineHeight : 1.7 }}>{note}</div>
                </div>
              ))}
            </div>

            {/* category progression */}
            <div className="card" style={{ marginBottom : 48 }}>
              <div style={{ fontSize : 15, fontWeight : 600, color : T.text, marginBottom : 18 }}>
                Macro F1 progression across configs – Category
              </div>
              <div style={{ display : "flex", flexDirection : "column", gap : 10 }}>
                {[
                  { cfg : "v1", rob : 0.605, bil : 0.412 },
                  { cfg : "v2", rob : 0.603, bil : 0.437 },
                  { cfg : "v3", rob : 0.624, bil : 0.466 },
                  { cfg : "v4", rob : 0.601, bil : 0.482 },
                  { cfg : "v5", rob : 0.620, bil : 0.486 },
                  { cfg : "v6", rob : 0.571, bil : 0.488 },
                ].map(({ cfg, rob, bil }) => (
                  <div key={cfg} style={{ display : "grid", gridTemplateColumns : "36px 1fr 64px 1fr 64px", gap : 10, alignItems : "center" }}>
                    <code style={{ fontSize : 12, color : T.hint }}>{cfg}</code>
                    <div className="prog-wrap">
                      <div className="prog-bar" style={{ width : `${(rob - 0.35) / 0.35 * 100}%`, background : T.accent }} />
                    </div>
                    <span style={{ fontSize : 13, fontWeight : 600, color : T.accent, textAlign : "right" }}>{rob.toFixed(3)}</span>
                    <div className="prog-wrap">
                      <div className="prog-bar" style={{ width : `${(bil - 0.35) / 0.35 * 100}%`, background : T.blue }} />
                    </div>
                    <span style={{ fontSize : 13, fontWeight : 600, color : T.blue, textAlign : "right" }}>{bil.toFixed(3)}</span>
                  </div>
                ))}
                <div style={{ display : "grid", gridTemplateColumns : "36px 1fr 64px 1fr 64px", gap : 10, marginTop : 4 }}>
                  <span />
                  <div style={{ display : "flex", alignItems : "center", gap : 6 }}>
                    <div style={{ width : 8, height : 8, borderRadius : "50%", background : T.accent }} />
                    <span style={{ fontSize : 12, color : T.muted }}>RoBERTa</span>
                  </div>
                  <span />
                  <div style={{ display : "flex", alignItems : "center", gap : 6 }}>
                    <div style={{ width : 8, height : 8, borderRadius : "50%", background : T.blue }} />
                    <span style={{ fontSize : 12, color : T.muted }}>BiLSTM</span>
                  </div>
                  <span />
                </div>
              </div>
            </div>

            {/* ── Figures Gallery ── */}
            <p className="section-eyebrow">Figures & Plots</p>
            <h2 className="section-title">All experimental figures</h2>
            <p className="section-desc">
              Training curves, confusion matrices, per-class metrics, and error analysis across all runs.
            </p>

            <FiguresGallery T={T} />

            {/* ── Error Analysis ── */}
            <p className="section-eyebrow">Error Analysis</p>
            <h2 className="section-title">The confusion that wouldn't move</h2>
            <p className="section-desc">
              Across all six configs and both models, the same examples keep appearing in the wrong column.
              These are not random errors – they are structural. The Animosity ↔ Derogation boundary
              is the single biggest unsolved problem in this pipeline.
            </p>

            {/* confusion pair table */}
            <div className="card" style={{ marginBottom : 32 }}>
              <div style={{ fontSize : 17, fontWeight : 600, color : T.text, marginBottom : 18 }}>
                Persistent confusion pairs – RoBERTa Category (best config v3)
              </div>
              {[
                { from : "Derogation",           to : "Animosity",            count : 128, pct : 28.2, color : T.accent,  badge : "badge-amber"  },
                { from : "Animosity",            to : "Derogation",           count : 98,  pct : 29.4, color : T.blue,    badge : "badge-blue"   },
                { from : "Prejudiced Disc.",     to : "Derogation",           count : 23,  pct : 24.5, color : T.purple,  badge : "badge-purple" },
                { from : "Prejudiced Disc.",     to : "Animosity",            count : 22,  pct : 23.4, color : T.purple,  badge : "badge-purple" },
                { from : "Derogation",           to : "Threats",              count : 22,  pct : 4.8,  color : T.accent,  badge : "badge-amber"  },
              ].map(({ from, to, count, pct, color, badge }) => (
                <div key={`${from}→${to}`} style={{ display : "flex", alignItems : "center", gap : 14, marginBottom : 25 }}>
                  <div style={{ display : "flex", alignItems : "center", gap : 8, minWidth : 280 }}>
                    <Pill cls={badge}>{from}</Pill>
                    <span style={{ fontSize : 13, color : T.hint }}>→</span>
                    <Pill cls={badge}>{to}</Pill>
                  </div>
                  <div style={{ flex : 1 }}>
                    <div className="prog-wrap">
                      <div className="prog-bar" style={{ width : `${count / 128 * 100}%`, background : color }} />
                    </div>
                  </div>
                  <span style={{ fontSize : 13, fontWeight : 600, color : T.text, minWidth : 36, textAlign : "right" }}>{count}</span>
                  <span style={{ fontSize : 12, color : T.hint, minWidth : 44, textAlign : "right" }}>{pct}%</span>
                </div>
              ))}
              <div className="callout" style={{ marginTop : 8, borderLeftColor : T.accent }}>
                The Derogation→Animosity confusion (128 cases) and Animosity→Derogation confusion (98 cases)
                together account for nearly a quarter of all category errors. These exact examples recur
                in every single config – no loss function or learning rate moved them.
              </div>
            </div>

            {/* focal effect on confusion */}
            <div className="card" style={{ marginBottom : 48 }}>
              <div style={{ fontSize : 17, fontWeight : 600, color : T.text, marginBottom : 6 }}>
                How focal loss shifts the confusion asymmetry
              </div>
              <p style={{ fontSize : 14, color : T.muted, lineHeight : 1.7, marginBottom : 20 }}>
                Focal loss systematically flips which direction the confusion flows.
                Without it, Derogation leaks into Animosity more. With it, Animosity leaks into Derogation more.
                Neither direction is solved – the boundary simply shifts.
              </p>
              <div style={{ display : "grid", gridTemplateColumns : "1fr 1fr", gap : 16 }}>
                {[
                  {
                    label : "Without focal loss (v2, v3)",
                    cls : "badge-blue",
                    rows : [
                      { pair : "Derog → Animosity", n : 128, max : 178 },
                      { pair : "Animosity → Derog", n : 98,  max : 178 },
                    ],
                    note : "Derogation over-absorbs Animosity",
                  },
                  {
                    label : "With focal loss (v5)",
                    cls : "badge-amber",
                    rows : [
                      { pair : "Derog → Animosity", n : 75,  max : 178 },
                      { pair : "Animosity → Derog", n : 154, max : 178 },
                    ],
                    note : "Animosity over-absorbs Derogation",
                  },
                ].map(({ label, cls, rows, note }) => (
                  <div key={label} style={{ background : T.surface, borderRadius : 10, padding : "16px 18px" }}>
                    <Pill cls={cls}>{label}</Pill>
                    <div style={{ marginTop : 14, display : "flex", flexDirection : "column", gap : 10 }}>
                      {rows.map(({ pair, n, max }) => (
                        <div key={pair}>
                          <div style={{ display : "flex", justifyContent : "space-between", marginBottom : 4 }}>
                            <span style={{ fontSize : 13, color : T.text }}>{pair}</span>
                            <span style={{ fontSize : 13, fontWeight : 600, color : T.text }}>{n}</span>
                          </div>
                          <div className="prog-wrap">
                            <div className="prog-bar" style={{ width : `${n / max * 100}%`, background : T.accent }} />
                          </div>
                        </div>
                      ))}
                    </div>
                    <div style={{ fontSize : 13, color : T.hint, marginTop : 12, fontStyle : "italic" }}>{note}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── What comes next ── */}
            <p className="section-eyebrow">Limitations & Next Steps</p>
            <h2 className="section-title">Where the ceiling sits – and how to break it</h2>
            <p className="section-desc">
              Moving beyond these numbers requires architectural changes, not more tuning.
            </p>
 
            <div style={{ 
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 14,
                width: "90%", 
                margin: "0 auto 48px" 
              }}>
              {[
                {
                  cls : "badge-green", color : T.green, impact : "High",
                  label : "Domain-adapted backbone",
                  body : (
                    <>
                      One config line:{" "}
                      <code style={{ fontSize : 13, color : T.muted }}>roberta-base</code>
                      {" "}→{" "}
                      <code style={{ fontSize : 13, color : T.green }}>cardiffnlp/twitter-roberta-base-hate-latest</code>.
                      {" "}Twitter-domain pretraining handles the informal register and slang base RoBERTa cannot.
                    </>
                  ),
                },
                {
                  cls : "badge-amber", color : T.accent, impact : "High",
                  label : "Hierarchical classification",
                  body : (
                    <>
                      Binary detection first, then {" "}<strong style={{ color : T.accent }}>4-way binary classification</strong>{" "} on sexist-only examples. 
                      The {" "}<strong style={{ color : T.accent }}>Animosity / Derogation boundary</strong>{" "}
                      is the only hard problem left – not one of several competing confusions.
                    </>
                  ),
                },
                {
                  cls : "badge-blue", color : T.blue, impact : "Medium",
                  label : "Threshold calibration",
                  body : (
                    <>
                      Best binary Sexist recall is <strong style={{ color : T.blue }}>0.75</strong>.
                      Shifting threshold{" "}
                      <code style={{ fontSize : 12, color : T.blue }}>0.5</code>
                      {" "}→{" "}
                      <code style={{ fontSize : 12, color : T.blue }}>~0.35</code>{" "}
                      trades some Not-sexist precision for <strong style={{ color : T.blue }}>higher Sexist recall</strong> –
                      the right trade-off for detection.{" "}
                    </>
                  ),
                },
                {
                  cls : "badge-purple", color : T.purple, impact : "Medium",
                  label : "FastText embeddings for BiLSTM",
                  body : (
                    <>
                      <strong style={{ color : T.purple }}>GloVe</strong> maps all OOV tokens to random init –
                      slurs, misspellings like <em style={{ color : T.purple }}>bi--ch, wh0re</em>, internet slang.{" "}
                      <strong style={{ color : T.purple }}>FastText</strong> constructs subword vectors via
                      character n-grams, catching these without vocabulary coverage.
                    </>
                  ),
                },
              ].map(({ cls, color, impact, label, body }) => (
                <div key={label} style={{
                  display: "flex", flexDirection: "column", gap: 10,
                  background: T.surface,
                  border: `1px solid ${T.border}`,
                  borderRadius: 12,
                  borderTop: `3px solid ${color}`,
                  padding: "16px 18px",
                }}>
                  <div style={{ display : "flex", justifyContent : "space-between", alignItems : "center" }}>
                    <Pill cls={cls}>{label}</Pill>
                    <span style={{
                      fontSize : 11, fontWeight : 700, color : color,
                      background : `${color}14`,
                      border : `1px solid ${color}30`,
                      borderRadius : 99, padding : "2px 9px",
                    }}>↑ {impact}</span>
                  </div>
                  <p style={{ fontSize : 14, lineHeight : 1.75, color : T.muted, margin : 0 }}>{body}</p>
                </div>
              ))}
            </div>
              
          </div>
        )}

        {/* ══════ TAB 5: Demo ══════════════════════════════════════════ */}
        {tab === "demo" && (
          <div className="tab-content">
            <p className="section-eyebrow">Live Inference</p>
            <h2 className="section-title">Try the two-stage pipeline</h2>
            <p className="section-desc">
              Enter any text to run Task A binary detection, followed by Task B fine-grained
              categorisation if sexist content is flagged. Powered by fine-tuned RoBERTa-base.
            </p>

            <div style={{
              background: T.card, border: `1px solid ${T.accent}44`,
              borderRadius: 12, overflow: "hidden", marginBottom: 44,
            }}>
              <div style={{
                padding: "12px 18px", background: T.surface,
                borderBottom: `1px solid ${T.border}`,
                display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap",
              }}>
                <Pill>Live</Pill>
                <span style={{ fontSize: 13, color: T.muted }}>
                  huggingface.co/spaces/phatpinkkkk/edos-sexism-detector
                </span>
                <a href="https://huggingface.co/spaces/phatpinkkkk/edos-sexism-detector"
                  target="_blank" rel="noreferrer"
                  style={{ marginLeft: "auto", fontSize: 13, color: T.accent, display: "flex", alignItems: "center", gap: 5, textDecoration: "none" }}>
                  Open in new tab
                  <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3"/>
                  </svg>
                </a>
              </div>

              {/* Replace iframe with a visual call-to-action */}
              <iframe
                src="https://phatpinkkkk-edos-sexism-detector.hf.space"
                title="EDOS Sexism Detector"
                style={{ width: "100%", height: 700, border: "none", display: "block" }}
              />
            </div>

            <p className="section-eyebrow">Resources</p>
            <h2 className="section-title">Links & references</h2>
            <div className="grid-2">
              {[
                { title: "Code repository",   desc: "Full pipeline: data loading, BiLSTM, RoBERTa, trainer, evaluation, error analysis.", href: "https://github.com/phatpinkkk/edos-sexism-detection",                         badge: "GitHub",       cls: "badge-blue" },
                { title: "Live demo",         desc: "Interactive two-stage classifier. Runs Task A then Task B for sexist content.",          href: "https://huggingface.co/spaces/phatpinkkkk/edos-sexism-detector",             badge: "HuggingFace",  cls: "badge-green" },
                { title: "EDOS paper",        desc: "SemEval-2023 Task 10 – Explainable Detection of Online Sexism (Kirk et al.).",          href: "https://aclanthology.org/2023.semeval-1.305/",                               badge: "ACL Anthology", cls: "badge-amber" },
                { title: "GloVe embeddings",  desc: "GloVe Twitter 27B vectors used for BiLSTM – download from Stanford NLP.",               href: "https://nlp.stanford.edu/projects/glove/",                                   badge: "Stanford NLP", cls: "badge-purple" },
              ].map(({ title, desc, href, badge, cls }) => (
                <a key={title} href={href} target="_blank" rel="noreferrer"
                  className="card"
                  style={{ display: "block", textDecoration: "none", transition: "border-color .15s", cursor: "pointer" }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = T.borderHi}
                  onMouseLeave={e => e.currentTarget.style.borderColor = T.border}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                    <span style={{ fontSize: 16, fontWeight: 600, color: T.text }}>{title}</span>
                    <Pill cls={cls}>{badge}</Pill>
                  </div>
                  <p style={{ fontSize: 15, color: T.muted, lineHeight: 1.7, margin: 0 }}>{desc}</p>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── footer ───────────────────────────────────────────────────── */}
      <div style={{ borderTop: `1px solid ${T.border}`, padding: "28px 0", textAlign: "center" }}>
        <p style={{ fontSize: 13, color: T.hint, lineHeight: 1.9 }}>
          EDOS Sexism Detection · CO3133 Deep Learning · HCMUT–VNUHCM · 2025–2026<br />
          Dataset: SemEval-2023 Task 10 · Models: BiLSTM + GloVe Twitter, RoBERTa-base
        </p>
      </div>
    </>
  );
}