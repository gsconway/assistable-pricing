import React, { useState } from "react";

// ---------- easy-to-edit numbers (all USD) ----------
const SETUP_FIRST_MONTH = 12000; // $ first month
const MONTHLY_AFTER = 8000;      // $ per month, months 2 & 3
const ACCEL_PER_MONTH = 2000;    // $ per acceleration module / month
const UPFRONT_DISCOUNT = 0.075;   // 7.5% off if all 3 months paid upfront (ACH/bank transfer only)

const CORE_MODULES = [
  "Positioning & Messaging (+ Brand Bible)",
  "LinkedIn Content Engine + Intent (Fibbler + Clay to HubSpot)",
  "AEO - Answer Engine Visibility",
  "Tracking & Handover",
];

const ACCEL_MODULES = [
  { id: "creator", name: "Creator Programme", note: "Practitioners post real results, paid on reach" },
  { id: "affiliate", name: "Affiliate Programme", note: "Recurring commission for referred customers" },
];

const LEVELS = [
  {
    id: "engineer",
    title: "GTM Engineer / Architect",
    here: true,
    tag: "Where I am now",
    money: "Cash only - no equity",
    color: "#C8452F",
    doing: [
      "Design and build the whole engine",
      "Set up the tools and wire the flow",
      "Write the playbooks and templates",
      "Hand it over so your team can run it",
    ],
    notDoing: [
      "Not running your day-to-day",
      "Not making ad creative",
      "Not a headcount on your team",
    ],
  },
  {
    id: "embedded",
    title: "Embedded Growth Lead",
    here: false,
    tag: "The next step, if it's working",
    money: "Slightly lower cash + some equity",
    color: "#D99A2B",
    doing: [
      "Everything in the build, plus:",
      "Steer it week to week",
      "Optimise off the data",
      "Skin in the game - I share the upside",
    ],
    notDoing: [
      "Still part-time, still light on your team",
      "Your team still closes the deals",
    ],
  },
  {
    id: "vp",
    title: "VP Growth",
    here: false,
    greyed: true,
    tag: "Where this could go - not now",
    money: "Lower cash + more equity",
    color: "#9A9284",
    doing: [
      "A dedicated growth leader in the business",
      "Owns the number end-to-end",
      "Meaningful equity - properly invested",
    ],
    notDoing: [
      "Not what I'm offering today",
      "A conversation for much later",
    ],
  },
];

const USD = (n) => "$" + n.toLocaleString("en-US");

// ---- tiny SVG icons (no emojis) ----
const Check = ({ c = "#2E7D5B" }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M5 12.5l4.5 4.5L19 7" stroke={c} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const Cross = ({ c = "#B4A99A" }) => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M6 6l12 12M18 6L6 18" stroke={c} strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);
const Plus = ({ c = "currentColor" }) => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M12 5v14M5 12h14" stroke={c} strokeWidth="2.4" strokeLinecap="round" />
  </svg>
);
const Pin = ({ c = "#fff" }) => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M12 2C8 2 5 5 5 9c0 5 7 13 7 13s7-8 7-13c0-4-3-7-7-7z" fill={c} />
    <circle cx="12" cy="9" r="2.5" fill="#C8452F" />
  </svg>
);
const Repeat = ({ c = "#D99A2B" }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M4 9a8 8 0 0113-3l3 3M20 15a8 8 0 01-13 3l-3-3" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M20 4v5h-5M4 20v-5h5" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function PricingSheet() {
  const [accel, setAccel] = useState({ creator: false, affiliate: false });
  const [upfront, setUpfront] = useState(false);

  const accelCount = Object.values(accel).filter(Boolean).length;
  const accelMonthly = accelCount * ACCEL_PER_MONTH;

  const firstMonth = SETUP_FIRST_MONTH + accelMonthly;
  const laterMonth = MONTHLY_AFTER + accelMonthly;
  const threeMonthTotal = firstMonth + laterMonth * 2;
  const upfrontTotal = Math.round(threeMonthTotal * (1 - UPFRONT_DISCOUNT));
  const upfrontSaving = threeMonthTotal - upfrontTotal;

  const toggle = (id) => setAccel((s) => ({ ...s, [id]: !s[id] }));

  return (
    <div style={S.page}>
      <style>{CSS}</style>

      <header style={S.header}>
        <div style={S.eyebrow}>ASSISTABLE - ENTERPRISE GROWTH ENGINE</div>
        <h1 style={S.h1}>How I'd work with you - and where that can go.</h1>
        <p style={S.sub}>
          Same engine, three depths of involvement. The full core build sits inside
          every level - what changes is how hands-on I am, and how we split cash vs.
          equity. Right now I'm the GTM Engineer: I build the machine, cash only.
        </p>
      </header>

      {/* CORE - always included */}
      <div style={S.coreCard}>
        <div style={S.coreLabel}>
          <span style={S.coreDot}><Check c="#fff" /></span>
          The core engine - included at every level
        </div>
        <div style={S.coreGrid}>
          {CORE_MODULES.map((m) => (
            <div key={m} style={S.coreItem}><Check /> <span>{m}</span></div>
          ))}
        </div>
      </div>

      {/* THE THREE LEVELS */}
      <div style={S.levelsGrid} className="levels-grid">
        {LEVELS.map((lv) => (
          <div
            key={lv.id}
            style={{ ...S.levelCard, ...(lv.here ? S.levelHere : {}), ...(lv.greyed ? S.levelGrey : {}) }}
          >
            {lv.here && <div style={S.hereBadge}><Pin /> You are here</div>}
            <div style={{ ...S.levelTitle, color: lv.greyed ? "#9A9284" : "#14110E" }}>{lv.title}</div>
            <div style={{ ...S.levelTag, color: lv.color }}>{lv.tag}</div>
            <div style={{ ...S.moneyPill, ...(lv.greyed ? S.moneyPillGrey : {}) }}>{lv.money}</div>

            <div style={S.levelSection}>
              <div style={S.levelSecLabel}>What I do</div>
              {lv.doing.map((d, i) => (
                <div key={i} style={S.levelRow}><Check c={lv.greyed ? "#B4A99A" : "#2E7D5B"} /> <span>{d}</span></div>
              ))}
            </div>

            <div style={S.levelSection}>
              <div style={S.levelSecLabel}>What I'm not doing</div>
              {lv.notDoing.map((d, i) => (
                <div key={i} style={S.levelRowMute}><Cross /> <span>{d}</span></div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ADD-ONS */}
      <div style={S.addonWrap}>
        <div style={S.sectionLabel}>
          <span style={S.sectionN}>+</span>
          <span style={S.sectionText}>Add the Acceleration modules</span>
          <span style={S.sectionNote}>Optional - {USD(ACCEL_PER_MONTH)}/month each to run</span>
        </div>
        {ACCEL_MODULES.map((m) => {
          const on = accel[m.id];
          return (
            <button key={m.id} onClick={() => toggle(m.id)} style={{ ...S.addonRow, ...(on ? S.addonOn : {}) }}>
              <div style={S.addonLeft}>
                <div style={{ ...S.tick, ...(on ? S.tickOn : {}) }}>{on ? <Check c="#fff" /> : <Plus />}</div>
                <div>
                  <div style={S.addonName}>{m.name}</div>
                  <div style={S.addonNote}>{m.note}</div>
                </div>
              </div>
              <span style={S.addonPrice}>+{USD(ACCEL_PER_MONTH)}/mo</span>
            </button>
          );
        })}
      </div>

      {/* PRICE SUMMARY */}
      <div style={S.priceCard}>
        <div style={S.priceEyebrow}>Your engagement - GTM Engineer</div>
        <div style={S.priceRow}>
          <span style={S.priceLabel}>First month <span style={S.priceMini}>(setup + build)</span></span>
          <span style={S.priceVal}>{USD(firstMonth)}</span>
        </div>
        <div style={S.priceRow}>
          <span style={S.priceLabel}>Months 2 & 3 <span style={S.priceMini}>(each)</span></span>
          <span style={S.priceVal}>{USD(laterMonth)}</span>
        </div>
        {accelCount > 0 && (
          <div style={S.priceNote}>
            Includes {accelCount} Acceleration module{accelCount > 1 ? "s" : ""} at {USD(ACCEL_PER_MONTH)}/mo each
          </div>
        )}
        <div style={S.priceDivider} />
        <div style={S.priceTotalRow}>
          <span>3-month total</span>
          <span style={S.priceTotal}>{USD(threeMonthTotal)}</span>
        </div>

        <button onClick={() => setUpfront((v) => !v)} style={{ ...S.upfrontRow, ...(upfront ? S.upfrontOn : {}) }}>
          <div style={S.upfrontLeft}>
            <div style={{ ...S.upfrontTick, ...(upfront ? S.upfrontTickOn : {}) }}>
              {upfront ? <Check c="#14110E" /> : null}
            </div>
            <div>
              <div style={S.upfrontName}>Pay all 3 months upfront</div>
              <div style={S.upfrontNote}>7.5% off - bank transfer (ACH) only</div>
            </div>
          </div>
          <div style={S.upfrontRight}>
            {upfront
              ? <><span style={S.upfrontWas}>{USD(threeMonthTotal)}</span><span style={S.upfrontNow}>{USD(upfrontTotal)}</span></>
              : <span style={S.upfrontSave}>save {USD(upfrontSaving)}</span>}
          </div>
        </button>

        <div style={S.priceSmall}>
          Cash only at this level. After month 3 we decide together: hand it over clean, or move
          into a deeper (part-equity) level. Tools & ad spend are yours directly, never in my fee.
        </div>
      </div>

      {/* ENGAGEMENT & PAYMENT */}
      <div style={S.payCard}>
        <div style={S.payHead}><Repeat /> <span>How payment works</span></div>
        <div style={S.payGrid}>
          <div style={S.payItem}>
            <div style={S.payItemTitle}>Billed through GoCardless</div>
            <div style={S.payItemText}>Simple automatic recurring payment - set up once, no chasing invoices.</div>
          </div>
          <div style={S.payItem}>
            <div style={S.payItemTitle}>Paid in advance</div>
            <div style={S.payItemText}>Each month is paid at the start, before the work - so we both know where we stand.</div>
          </div>
          <div style={S.payItem}>
            <div style={S.payItemTitle}>3-month minimum</div>
            <div style={S.payItemText}>The engine needs a few weeks to prove the message before it accelerates.</div>
          </div>
        </div>
      </div>
    </div>
  );
}

const INK = "#14110E";
const PAPER = "#F5F1EA";
const ACCENT = "#C8452F";
const GOLD = "#D99A2B";
const MUTE = "#7A7267";
const GREEN = "#2E7D5B";

const S = {
  page: { background: PAPER, color: INK, minHeight: "100%", padding: "clamp(20px,4vw,48px)", fontFamily: "'Inter', system-ui, sans-serif" },
  header: { maxWidth: 720, marginBottom: 26 },
  eyebrow: { fontSize: 11, letterSpacing: "0.18em", fontWeight: 600, color: ACCENT, marginBottom: 14 },
  h1: { fontFamily: "'Fraunces', Georgia, serif", fontSize: "clamp(27px,4.3vw,42px)", lineHeight: 1.05, fontWeight: 600, letterSpacing: "-0.02em", margin: "0 0 14px" },
  sub: { fontSize: 15.5, lineHeight: 1.55, color: MUTE, maxWidth: 600 },

  coreCard: { background: "#fff", border: "1.5px solid " + INK, borderRadius: 14, padding: "18px 20px", marginBottom: 24 },
  coreLabel: { display: "flex", alignItems: "center", gap: 10, fontSize: 14, fontWeight: 700, marginBottom: 14 },
  coreDot: { width: 22, height: 22, borderRadius: "50%", background: GREEN, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  coreGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 20px" },
  coreItem: { display: "flex", alignItems: "flex-start", gap: 9, fontSize: 13, lineHeight: 1.4 },

  levelsGrid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 26 },
  levelCard: { position: "relative", background: "#FBF8F2", border: "1px solid #E3DBCD", borderRadius: 14, padding: "22px 18px 18px", display: "flex", flexDirection: "column" },
  levelHere: { background: "#fff", borderColor: ACCENT, boxShadow: "0 2px 0 " + ACCENT },
  levelGrey: { background: "#F0ECE3", borderStyle: "dashed", opacity: 0.72 },
  hereBadge: { position: "absolute", top: -11, left: 16, display: "flex", alignItems: "center", gap: 5, fontSize: 10.5, fontWeight: 700, letterSpacing: "0.04em", color: "#fff", background: ACCENT, borderRadius: 6, padding: "4px 9px", textTransform: "uppercase" },
  levelTitle: { fontFamily: "'Fraunces', serif", fontSize: 18, fontWeight: 600, lineHeight: 1.1 },
  levelTag: { fontSize: 12, fontWeight: 600, marginTop: 5, marginBottom: 10 },
  moneyPill: { display: "inline-block", fontSize: 11.5, fontWeight: 600, background: "#EFE7D6", border: "1px solid #E0D6C2", borderRadius: 20, padding: "4px 11px", color: "#6B5D3E", alignSelf: "flex-start" },
  moneyPillGrey: { background: "#E8E3D8", color: "#8A8272" },
  levelSection: { marginTop: 14 },
  levelSecLabel: { fontSize: 10.5, fontWeight: 700, letterSpacing: "0.08em", color: MUTE, textTransform: "uppercase", marginBottom: 8 },
  levelRow: { display: "flex", alignItems: "flex-start", gap: 8, fontSize: 12.5, lineHeight: 1.4, marginBottom: 6 },
  levelRowMute: { display: "flex", alignItems: "flex-start", gap: 8, fontSize: 12.5, lineHeight: 1.4, marginBottom: 6, color: MUTE },

  addonWrap: { marginBottom: 24 },
  sectionLabel: { display: "flex", alignItems: "baseline", gap: 10, margin: "0 0 12px" },
  sectionN: { fontFamily: "'Fraunces', serif", fontSize: 15, fontWeight: 600, color: ACCENT },
  sectionText: { fontSize: 13, fontWeight: 700, letterSpacing: "0.02em" },
  sectionNote: { fontSize: 12, color: MUTE, marginLeft: "auto" },
  addonRow: { width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 14, background: "#FBF8F2", border: "1px solid #E3DBCD", borderRadius: 12, padding: "13px 16px", marginBottom: 8, cursor: "pointer", transition: "all .15s", textAlign: "left" },
  addonOn: { background: "#fff", borderColor: ACCENT },
  addonLeft: { display: "flex", alignItems: "center", gap: 12 },
  tick: { width: 22, height: 22, borderRadius: 6, border: "1.5px solid #C9BFAE", display: "flex", alignItems: "center", justifyContent: "center", color: MUTE, flexShrink: 0 },
  tickOn: { background: ACCENT, borderColor: ACCENT, color: "#fff" },
  addonName: { fontSize: 14, fontWeight: 600 },
  addonNote: { fontSize: 12, color: MUTE, marginTop: 2 },
  addonPrice: { fontFamily: "'Fraunces', serif", fontSize: 15, fontWeight: 600, flexShrink: 0 },

  priceCard: { background: INK, color: PAPER, borderRadius: 16, padding: "24px 24px 22px", maxWidth: 460, marginBottom: 24 },
  priceEyebrow: { fontSize: 10.5, letterSpacing: "0.16em", fontWeight: 600, color: GOLD, marginBottom: 16 },
  priceRow: { display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 12 },
  priceLabel: { fontSize: 14, color: "#CFC6B8" },
  priceMini: { fontSize: 11.5, color: "#8F877A" },
  priceVal: { fontFamily: "'Fraunces', serif", fontSize: 22, fontWeight: 600 },
  priceNote: { fontSize: 11.5, color: GOLD, marginTop: -4, marginBottom: 8 },
  priceDivider: { height: 1, background: "#33302A", margin: "8px 0 14px" },
  priceTotalRow: { display: "flex", justifyContent: "space-between", alignItems: "baseline", fontSize: 14, fontWeight: 600 },
  priceTotal: { fontFamily: "'Fraunces', serif", fontSize: 30, fontWeight: 600, color: "#fff" },
  priceSmall: { fontSize: 11.5, color: "#8F877A", marginTop: 14, lineHeight: 1.5 },

  upfrontRow: { width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, background: "#211E1A", border: "1px dashed #C8952B", borderRadius: 10, padding: "11px 13px", marginTop: 14, cursor: "pointer", transition: "all .15s", textAlign: "left" },
  upfrontOn: { background: "#2A2515", border: "1px solid #D99A2B" },
  upfrontLeft: { display: "flex", alignItems: "center", gap: 10 },
  upfrontTick: { width: 20, height: 20, borderRadius: 5, border: "1.5px solid #C8952B", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  upfrontTickOn: { background: "#D99A2B", borderColor: "#D99A2B" },
  upfrontName: { fontSize: 13, fontWeight: 600, color: "#F5F1EA" },
  upfrontNote: { fontSize: 11, color: "#C8952B", marginTop: 2 },
  upfrontRight: { textAlign: "right", flexShrink: 0 },
  upfrontWas: { fontSize: 12, color: "#8F877A", textDecoration: "line-through", marginRight: 8 },
  upfrontNow: { fontFamily: "'Fraunces', serif", fontSize: 18, fontWeight: 600, color: "#F5D08A" },
  upfrontSave: { fontSize: 12.5, fontWeight: 700, color: "#D99A2B" },
  payCard: { background: "#FBF8F2", border: "1px solid #E3DBCD", borderRadius: 14, padding: "20px 22px", maxWidth: 760 },
  payHead: { display: "flex", alignItems: "center", gap: 9, fontSize: 14, fontWeight: 700, marginBottom: 16 },
  payGrid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 },
  payItem: {},
  payItemTitle: { fontSize: 13, fontWeight: 650, marginBottom: 5 },
  payItemText: { fontSize: 12.5, color: MUTE, lineHeight: 1.45 },
};

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600&family=Inter:wght@400;500;600;700&display=swap');
* { box-sizing: border-box; }
@media (max-width: 820px) {
  .levels-grid { grid-template-columns: 1fr !important; }
}
`;
