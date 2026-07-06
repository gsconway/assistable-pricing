import React, { useState } from "react";

// ---------- easy-to-edit numbers (all USD) ----------
const SETUP_FIRST_MONTH = 11500; // $ first month
const MONTHLY_AFTER = 8000;      // $ per month, months 2 & 3
const ACCEL_PER_MONTH = 2000;    // $ per acceleration module / month
const UPFRONT_DISCOUNT = 0.05;   // 5% off if all 3 months paid upfront (ACH only)

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
    metrics: [
      { label: "Commitment", value: "10-15 hrs / week min" },
      { label: "Equity", value: "Not included" },
      { label: "Structure", value: "Project + retainer" },
    ],
    cadence: { value: "1-2 check-ins per week", sub: "Focused bursts, not living in your Slack", dots: 2 },
    own: [
      "Design and build the whole engine",
      "Set up the tools and wire the flow into HubSpot",
      "Write the playbooks and outreach templates",
      "Hand it over so your team can run it",
    ],
    need: [
      "Call recordings, hit list, founder interview",
      "Fund the tools and any ad spend",
      "A technical person for the HubSpot wiring",
      "Your team creates content + closes the leads",
    ],
  },
  {
    id: "embedded",
    title: "Embedded Growth Lead",
    here: false,
    tag: "The next step, if it's working",
    money: "Slightly lower cash + some equity",
    color: "#D99A2B",
    metrics: [
      { label: "Commitment", value: "Part-time, ongoing" },
      { label: "Equity", value: "Small stake" },
      { label: "Structure", value: "Retainer + equity" },
    ],
    cadence: { value: "2-3 check-ins per week", sub: "Steering it week to week alongside you", dots: 3 },
    own: [
      "Everything in the build, plus:",
      "Steer and optimise it week to week",
      "Own the growth reporting",
      "Skin in the game - I share the upside",
    ],
    need: [
      "Budget committed for the run period",
      "A regular slot in your week for me",
      "Your team still owns closing the deals",
      "Equity terms agreed up front",
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
    metrics: [
      { label: "Commitment", value: "Full-time" },
      { label: "Equity", value: "Meaningful" },
      { label: "Structure", value: "Negotiated" },
    ],
    cadence: { value: "Daily", sub: "In the building - a real leadership seat", dots: 5 },
    own: [
      "End-to-end growth, owned",
      "Build and run the growth team",
      "Board & investor reporting",
      "Meaningful equity - properly invested",
    ],
    need: [
      "A formal role with real authority",
      "Funding in place to build the team",
      "A seat at the leadership table",
      "Not what I'm offering today",
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
const OwnIcon = ({ c = "#C8452F" }) => (
  <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <circle cx="8" cy="8" r="7" stroke={c} strokeWidth="1.4" />
    <path d="M5 8l2 2 4-4" stroke={c} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const NeedIcon = ({ c = "#B0733C" }) => (
  <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <circle cx="8" cy="8" r="7" stroke={c} strokeWidth="1.4" />
    <path d="M8 5v4M8 11v.5" stroke={c} strokeWidth="1.4" strokeLinecap="round" />
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
        <h1 style={S.h1}>How we'd work together - and where it can go.</h1>
        <p style={S.sub}>
          Three levels of engagement, each building on the last. The full core build sits
          inside every level - what changes is how hands-on I am. Right now I'm playing the
          GTM Engineer role: a focused, self-contained project to build the content engine.
          It's deliberately a discrete piece of work - we prove it out, then review and expand
          into the deeper roles once it's working.
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
      <div style={S.levelsWrap}>
        {LEVELS.map((lv) => (
          <div key={lv.id} style={{ ...S.levelCard, ...(lv.here ? S.levelHere : {}), ...(lv.greyed ? S.levelGrey : {}) }}>
            {lv.here && <div style={S.hereBadge}><Pin /> Recommended - start here</div>}

            {/* top row: title + money */}
            <div style={S.levelTop}>
              <div>
                <div style={{ ...S.levelTitle, color: lv.greyed ? "#9A9284" : "#14110E" }}>{lv.title}</div>
                <div style={{ ...S.levelTag, color: lv.color }}>{lv.tag}</div>
              </div>
              <div style={{ ...S.moneyPill, ...(lv.greyed ? S.moneyPillGrey : {}) }}>{lv.money}</div>
            </div>

            {/* metrics row */}
            <div style={S.metricsRow}>
              {lv.metrics.map((m) => (
                <div key={m.label} style={S.metric}>
                  <div style={S.metricLabel}>{m.label}</div>
                  <div style={S.metricValue}>{m.value}</div>
                </div>
              ))}
            </div>

            {/* two columns: own / need */}
            <div style={S.respGrid}>
              <div>
                <div style={S.respTitle}><OwnIcon c={lv.greyed ? "#9A9284" : "#C8452F"} /> What I own</div>
                <ul style={S.respList}>
                  {lv.own.map((r, i) => (
                    <li key={i} style={S.respItem}><span style={S.respDot} /> <span>{r}</span></li>
                  ))}
                </ul>
              </div>
              <div>
                <div style={S.respTitle}><NeedIcon c={lv.greyed ? "#9A9284" : "#B0733C"} /> What you need in place</div>
                <ul style={S.respList}>
                  {lv.need.map((r, i) => (
                    <li key={i} style={S.respItem}><span style={S.respDot} /> <span>{r}</span></li>
                  ))}
                </ul>
              </div>
            </div>

            {/* meeting cadence */}
            <div style={S.cadenceRow}>
              <div>
                <div style={S.cadenceLabel}>Meeting cadence</div>
                <div style={S.cadenceValue}>{lv.cadence.value}</div>
                <div style={S.cadenceSub}>{lv.cadence.sub}</div>
              </div>
              <div style={S.cadenceDots}>
                {[0, 1, 2, 3, 4].map((i) => (
                  <span key={i} style={{ ...S.cdot, ...(i < lv.cadence.dots ? { background: lv.color, borderColor: lv.color } : {}) }} />
                ))}
              </div>
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
          <div style={S.priceNote}>Includes {accelCount} Acceleration module{accelCount > 1 ? "s" : ""} at {USD(ACCEL_PER_MONTH)}/mo each</div>
        )}
        <div style={S.priceDivider} />
        <div style={S.priceTotalRow}>
          <span>3-month total</span>
          <span style={S.priceTotal}>{USD(threeMonthTotal)}</span>
        </div>

        <button onClick={() => setUpfront((v) => !v)} style={{ ...S.upfrontRow, ...(upfront ? S.upfrontOn : {}) }}>
          <div style={S.upfrontLeft}>
            <div style={{ ...S.upfrontTick, ...(upfront ? S.upfrontTickOn : {}) }}>{upfront ? <Check c="#14110E" /> : null}</div>
            <div>
              <div style={S.upfrontName}>Pay all 3 months upfront</div>
              <div style={S.upfrontNote}>5% off - bank transfer (ACH) only</div>
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

      {/* PAYMENT */}
      <div style={S.payCard}>
        <div style={S.payHead}><Repeat /> <span>How payment works</span></div>
        <div style={S.payGrid}>
          <div>
            <div style={S.payItemTitle}>Billed through GoCardless</div>
            <div style={S.payItemText}>Simple automatic recurring payment - set up once, no chasing invoices.</div>
          </div>
          <div>
            <div style={S.payItemTitle}>Paid in advance</div>
            <div style={S.payItemText}>Each month is paid at the start, before the work - so we both know where we stand.</div>
          </div>
          <div>
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
  sub: { fontSize: 15.5, lineHeight: 1.55, color: MUTE, maxWidth: 620 },

  coreCard: { background: "#fff", border: "1.5px solid " + INK, borderRadius: 14, padding: "18px 20px", marginBottom: 24 },
  coreLabel: { display: "flex", alignItems: "center", gap: 10, fontSize: 14, fontWeight: 700, marginBottom: 14 },
  coreDot: { width: 22, height: 22, borderRadius: "50%", background: GREEN, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  coreGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 20px" },
  coreItem: { display: "flex", alignItems: "flex-start", gap: 9, fontSize: 13, lineHeight: 1.4 },

  levelsWrap: { display: "flex", flexDirection: "column", gap: 16, marginBottom: 26 },
  levelCard: { position: "relative", background: "#FBF8F2", border: "1px solid #E3DBCD", borderRadius: 16, padding: "24px 22px 20px" },
  levelHere: { background: "#fff", borderColor: ACCENT, boxShadow: "0 4px 20px rgba(200,69,47,0.10)" },
  levelGrey: { background: "#F0ECE3", borderStyle: "dashed", opacity: 0.82 },
  hereBadge: { position: "absolute", top: -11, left: 22, display: "flex", alignItems: "center", gap: 5, fontSize: 10.5, fontWeight: 700, letterSpacing: "0.04em", color: "#fff", background: ACCENT, borderRadius: 6, padding: "4px 10px", textTransform: "uppercase" },
  levelTop: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, marginBottom: 18 },
  levelTitle: { fontFamily: "'Fraunces', serif", fontSize: 21, fontWeight: 600, lineHeight: 1.1 },
  levelTag: { fontSize: 12.5, fontWeight: 600, marginTop: 5 },
  moneyPill: { fontSize: 11.5, fontWeight: 600, background: "#EFE7D6", border: "1px solid #E0D6C2", borderRadius: 20, padding: "5px 12px", color: "#6B5D3E", flexShrink: 0, whiteSpace: "nowrap" },
  moneyPillGrey: { background: "#E8E3D8", color: "#8A8272" },

  metricsRow: { display: "flex", gap: 10, marginBottom: 20 },
  metric: { flex: 1, background: "#F2ECE0", borderRadius: 10, padding: "10px 14px" },
  metricLabel: { fontSize: 9.5, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#A08A5E", marginBottom: 4 },
  metricValue: { fontSize: 13.5, fontWeight: 600, color: INK },

  respGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22, paddingTop: 18, borderTop: "1px solid #E8E0D2" },
  respTitle: { display: "flex", alignItems: "center", gap: 7, fontSize: 12.5, fontWeight: 700, marginBottom: 12 },
  respList: { listStyle: "none", margin: 0, padding: 0 },
  respItem: { display: "flex", alignItems: "flex-start", gap: 9, fontSize: 12.5, color: MUTE, lineHeight: 1.45, padding: "7px 0", borderBottom: "1px solid #EDE6D8" },
  respDot: { width: 6, height: 6, borderRadius: "50%", background: "#C9B48E", flexShrink: 0, marginTop: 6 },

  cadenceRow: { display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, marginTop: 18, paddingTop: 16, borderTop: "1px solid #E8E0D2" },
  cadenceLabel: { fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#A08A5E", marginBottom: 4 },
  cadenceValue: { fontSize: 14, fontWeight: 600, color: INK },
  cadenceSub: { fontSize: 11.5, color: MUTE, marginTop: 3 },
  cadenceDots: { display: "flex", gap: 6, flexShrink: 0 },
  cdot: { width: 11, height: 11, borderRadius: "50%", background: "#EDE6D8", border: "2px solid #DDD2BE" },

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
  priceSmall: { fontSize: 11.5, color: "#8F877A", marginTop: 14, lineHeight: 1.5 },

  payCard: { background: "#FBF8F2", border: "1px solid #E3DBCD", borderRadius: 14, padding: "20px 22px", maxWidth: 760 },
  payHead: { display: "flex", alignItems: "center", gap: 9, fontSize: 14, fontWeight: 700, marginBottom: 16 },
  payGrid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 },
  payItemTitle: { fontSize: 13, fontWeight: 650, marginBottom: 5 },
  payItemText: { fontSize: 12.5, color: MUTE, lineHeight: 1.45 },
};

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600&family=Inter:wght@400;500;600;700&display=swap');
* { box-sizing: border-box; }
@media (max-width: 720px) {
  .resp-grid { grid-template-columns: 1fr !important; }
}
`;
