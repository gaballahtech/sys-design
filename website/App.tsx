import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { flushSync } from "react-dom";

// SYS Design System — rebuilt from the real production sites:
//   medical     → sys-medical-day.ahmed1.workers.dev
//   youth       → sys-youth-hub.lovable.app
//   competition → sys-competition.ahmedalghazaly123.workers.dev
// Architecture: foundations.css (tokens/motion) → themes.css (3 identities + dark)
// → components.css (theme-aware components). App.tsx = demo + live styleguide.

import "../design-system/foundations.css";
import "../design-system/themes.css";
import "../design-system/components.css";

import {
  UserPlus, Ticket, Upload, Handshake, Newspaper as NewspaperIcon, Trophy,
  Users, GraduationCap, MessageCircle, Globe, School, Sparkles,
  Goal, Target, Gem, Code2, PenLine, Lightbulb, Wrench, Megaphone, Rocket,
  Image as ImageIcon, Monitor, AlertTriangle, Moon, Sun, ArrowLeft, Check,
  FileText, CheckCircle2, XCircle, Type, Ruler, Layers, MousePointerClick,
  Table as TableIcon, Bell, CircleDot,
} from "lucide-react";

type SiteId = "medical" | "youth" | "competition";
type TabId = SiteId | "system";

interface SiteConfig {
  id: SiteId;
  label: string;
  heading: string;
  tagline: string;
}

const sites: SiteConfig[] = [
  { id: "medical", label: "Medical Day", heading: "MEB × SYS", tagline: "تسجيل الحضور — MEB × SYS" },
  { id: "youth", label: "Youth Hub", heading: "SYS Youth", tagline: "شباب يدعم الشباب" },
  { id: "competition", label: "Competition", heading: "SYS Season 2", tagline: "مسابقة SYS للإبداع والابتكار" },
];

/** CSS custom properties helper for staggered entrance animations */
const stagger = (i: number) => ({ "--stagger-i": i }) as React.CSSProperties;

/* ===================== Data ===================== */

const medicalStats = [
  { label: "رسوم الحضور", value: "100,000 د.ع" },
  { label: "التاريخ", value: "2026-10-29" },
  { label: "المكان", value: "مركز الزمالك" },
];

const medicalFaq = [
  { q: "هل أحتاج حساب Google للتسجيل؟", a: "نعم — التسجيل عبر Google يمنع التسجيلات المزيفة ويكمل بياناتك تلقائيًا." },
  { q: "كيف أستلم تذكرة QR؟", a: "تظهر التذكرة مباشرة بعد التسجيل في صفحة 'تذكرتي'، ويمكن طباعتها أو الاحتفاظ بها في الهاتف." },
  { q: "هل يمكنني تعديل بياناتي؟", a: "نعم، قبل تسجيل الحضور. بعد أول مسح يتم قفل التعديل." },
  { q: "كم رسوم التسجيل؟", a: "100,000 دينار عبر فودافون كاش أو Instapay مع رفع صورة التحويل." },
];

const medicalPartners = ["MEB Training Center", "SYS Youth", "Ministry of Youth & Sports", "Youth Development Pioneers"];

const youthStats = [
  { label: "عضو ومتطوع", value: "+500" },
  { label: "عضو مدرب", value: "+150" },
  { label: "شريك رسمي", value: "15" },
  { label: "محافظة", value: "27" },
];

const youthNews = [
  { id: "1", title: "فتح باب التطوع من جديد", date: "2026-07-15", status: "Published" as const },
  { id: "2", title: "حدث قريب", date: "2026-07-20", status: "Published" as const },
  { id: "3", title: "SYS تواصل النمو", date: "2026-07-25", status: "Draft" as const },
];

const youthPartners = [
  "خطوة شباب", "Acoliro", "MYOB", "Alpha Academy", "Frame House",
  "Banker's Lounge", "Kerma", "Avenix", "Corevia", "Zentrox",
];

const youthLeaderboard = [
  { rank: 1, name: "Youssef Nabil", points: 950, badge: "Gold" },
  { rank: 2, name: "Nour El-Din", points: 880, badge: "Silver" },
  { rank: 3, name: "Mariam Tarek", points: 820, badge: "Bronze" },
  { rank: 4, name: "Khaled Samir", points: 760, badge: "" },
];

const youthValues = [
  { icon: <Goal />, title: "رؤيتنا", body: "أن نكون الكيان الشبابي الأول في مصر لصناعة الأثر وتمكين جيل قادر على قيادة التغيير." },
  { icon: <Target />, title: "رسالتنا", body: "دعم الشباب عبر التدريب والفعاليات وبناء بيئة تعاون بين المبادرات والشركاء لتحقيق أثر مستدام." },
  { icon: <Gem />, title: "قيمنا", body: "الشغف، الالتزام، العمل الجماعي، والمصداقية — نصنع فرقًا حقيقية بأخلاق واحترافية." },
];

const YOUTH_HERO_IMG = "https://sys-youth-hub.lovable.app/__l5e/assets-v1/e4bf370e-b67c-449b-8c3f-f3dcf1fb3d7d/sys-hero.jpg";

const compTracks = [
  {
    id: "tech" as const,
    tag: "مسار أول",
    icon: <Code2 size={13} />,
    title: "محور التكنولوجيا والابتكار",
    desc: "مشروعات وأفكار تقنية تقدّم حلولًا لمشكلات واقعية — النموذج الأولي مقبول، مش لازم منتج نهائي.",
    chips: ["الذكاء الاصطناعي", "البرمجة والتطبيقات", "الأمن السيبراني", "IoT", "EdTech", "HealthTech"],
    criteria: ["وضوح المشكلة", "مدى الابتكار", "إمكانية التطبيق", "الأثر المتوقع"],
  },
  {
    id: "arts" as const,
    tag: "مسار ثانٍ",
    icon: <PenLine size={13} />,
    title: "محور الأدب والفنون والإبداع",
    desc: "مواهب تعبّر عن الرؤية والموهبة بالكلمة أو الصورة أو المحتوى الرقمي.",
    chips: ["القصة القصيرة", "الشعر", "الرسم", "التصوير", "تصميم جرافيك", "فيديو ومحتوى"],
    criteria: ["الأصالة", "الإبداع", "جودة التنفيذ", "التعبير"],
  },
];

const compStats = [
  { label: "الفئة العمرية", value: "9 – 28" },
  { label: "المسارات", value: "2" },
  { label: "مشاركة واحدة", value: "لكل مشارك" },
  { label: "إثبات العمل", value: "إجباري" },
];

const compRules = [
  { num: 1, title: "الفئة العمرية", body: "من 9 حتى 28 سنة — النظام يمنع الإرسال تلقائيًا خارج النطاق." },
  { num: 2, title: "المجالات", body: "مسار واحد فقط لكل مشارك: التكنولوجيا أو الأدب والفنون." },
  { num: 3, title: "إثبات العمل", body: "صور لمراحل التنفيذ أو لقطات شاشة — حد أقصى 5 ملفات." },
  { num: 4, title: "التقييم", body: "الفكرة والإبداع · جودة التنفيذ · التأثير والابتكار." },
];

const compProof = [
  { icon: <ImageIcon />, title: "صور مراحل التنفيذ", body: "صوّر شغلك وهو في الطريق: الرسم الأول، النسخ، التعديلات، أو تسلسل البناء." },
  { icon: <Monitor />, title: "لقطات شاشة", body: "للمشروعات التقنية: لقطات من بيئة التطوير، الكود، التشغيل، أو النموذج الأولي." },
];

const compJudging = [
  { icon: <Lightbulb />, title: "الفكرة والإبداع" },
  { icon: <Wrench />, title: "جودة التنفيذ" },
  { icon: <Megaphone />, title: "التأثير والابتكار" },
  { icon: <Rocket />, title: "إمكانية التطوير" },
];

const compQa = [
  { icon: <Users size={14} />, label: "صديق / زميل" },
  { icon: <GraduationCap size={14} />, label: "عضو في SYS" },
  { icon: <MessageCircle size={14} />, label: "قناة واتساب" },
  { icon: <Globe size={14} />, label: "فيسبوك" },
  { icon: <School size={14} />, label: "جامعة" },
  { icon: <Sparkles size={14} />, label: "جهة أخرى" },
];

const compFaq = [
  { q: "مين اللي يحق له المشاركة؟", a: "أي حد من 9 حتى 28 سنة، من أي جنسية." },
  { q: "أقدر أقدّم في المسارين؟", a: "لأ — مجال واحد فقط ومشاركة واحدة لكل مشارك." },
  { q: "إزاي أعرف إن مشاركتي وصلت؟", a: "بيظهرلك كود مشاركة زي SYS-CMP-0001 — احتفظ بيه." },
];

const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

/* ===================== Reusable demo pieces ===================== */

function Toast({ toast }: { toast: { msg: string; kind: "ok" | "err" } | null }) {
  return (
    <div className={`sys-toast ${toast ? "is-show" : ""} ${toast?.kind === "ok" ? "sys-toast-ok" : toast?.kind === "err" ? "sys-toast-err" : ""}`} role="status" aria-live="polite">
      {toast?.kind === "ok" ? <CheckCircle2 /> : <AlertTriangle />}
      <span>{toast?.msg ?? ""}</span>
    </div>
  );
}

function Field({
  label, value, onChange, placeholder, type = "text", required, hint, ltr,
}: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder: string; type?: string; required?: boolean; hint?: string; ltr?: boolean;
}) {
  const filled = value.trim().length > 0;
  const valid = required ? (type === "email" ? isValidEmail(value) : filled) : filled;
  const touched = filled || value.length > 0;
  return (
    <div className={`sys-field ${touched && !valid ? "invalid" : touched && valid ? "valid" : ""}`}>
      <label>
        {label} {required && <span style={{ color: "var(--danger)" }}>*</span>}
      </label>
      <input
        className="sys-input"
        type={type}
        placeholder={placeholder}
        value={value}
        dir={ltr ? "ltr" : undefined}
        onChange={(e) => onChange(e.target.value)}
      />
      <span className="sys-err-msg"><XCircle /> الحقل مطلوب — تأكد من القيمة</span>
      <span className="sys-ok-msg"><CheckCircle2 /> تمام</span>
      {hint && <span className="sys-help">{hint}</span>}
    </div>
  );
}

/* ===================== Styleguide — «النظام» هو المنتج ===================== */

type ToastMsg = { msg: string; kind: "ok" | "err" };
type Pair = [string, string];
type Trio = [string, string, string];
type Quad = [string, string, string, string];

const brandSwatches = ["brand-50", "brand-100", "brand-200", "brand-300", "brand-400", "brand-500", "brand-600", "brand-700", "brand-800", "brand-900", "brand-950"];
const inkSwatches = ["ink-50", "ink-100", "ink-200", "ink-300", "ink-400", "ink-500", "ink-600", "ink-700", "ink-800", "ink-900", "ink-950"];

const typeScale: Trio[] = [
  ["--text-hero", "شباب يدعم الشباب", "عناوين الصفحات · h1"],
  ["--text-3xl", "أحدث الأخبار", "عناوين الأقسام · h2"],
  ["--text-xl", "نموذج التسجيل", "عناوين البطاقات"],
  ["--text-lg", "رؤيتنا ورسالتنا", "عناوين فرعية"],
  ["--text-md", "نظام تصميم موحّد لكل مواقع SYS", "النص الافتراضي · body"],
  ["--text-sm", "نصوص المساعدات", "نص ثانوي · forms"],
  ["--text-xs", "2026 · سجل", "وسوم ومساعدات"],
  ["--text-2xs", "27 محافظة", "eyebrow / code"],
];

const spacingSteps = ["--space-1", "--space-2", "--space-3", "--space-4", "--space-5", "--space-6", "--space-8", "--space-10", "--space-12", "--space-16"];
const elevations = ["elev-1", "elev-2", "elev-3", "elev-4", "elev-5"];
const radiiL: Trio[] = [
  ["--radius-xs", "8px", "وسوم صغيرة"],
  ["--radius-sm", "10px", "أزرار + chips"],
  ["--radius-md", "14px", "حقول · التوست"],
  ["--radius-lg", "16px", "بطاقات · جداول"],
  ["--radius-xl", "24px", "أسطح كبيرة"],
  ["--radius-full", "999px", "عناصر دائرية"],
];
const zIndexes: Pair[] = [
  ["--z-base", "0"], ["--z-raised", "10"], ["--z-sticky", "50"], ["--z-overlay", "100"], ["--z-modal", "200"],
];
const durationsL: Trio[] = [
  ["--dur-1", "110ms", "hover / press"],
  ["--dur-2", "180ms", "الانتقالات القياسية"],
  ["--dur-3", "260ms", "دخول الأسطح · انتقال الصفحات"],
  ["--dur-4", "420ms", "دخول الـ hero"],
];

const architecture: { icon: React.ReactNode; file: string; title: string; body: string }[] = [
  { icon: <Layers />, file: "foundations.css", title: "الأساس", body: "توكنات محايدة للمواقع كلها: مسافات 4pt · سلم خطوط · زوايا · ظلال · حركة · z-index + reset موحّد" },
  { icon: <Sparkles />, file: "themes.css", title: "الثيمات", body: "هوية كل موقع عبر data-site + الوضع عبر data-mode — تبدّل توكنات الألوان فقط، لا تلمس السلوك أبدًا" },
  { icon: <CircleDot />, file: "components.css", title: "المكونات", body: "تسمية موحّدة: sys-<name> + <variant> + is-<state> — كل مكون يقرأ التوكن مباشرة، صفر قيم لون ثابتة داخله" },
];

const identities: Quad[] = [
  ["Medical Day", "طبي · رسمي · موثوق", "أزرق SYS + سماوي طبي + ظل الفورم الدافئ", "السلوك · الحركة · المقاسات"],
  ["Youth Hub", "شبابي · طموح · مجتمعي", "كحلي عميق + primary-blue للدعوة الأساسية", "السلوك · الحركة · المقاسات"],
  ["Competition", "تنافسي · مشوّق", "أزرق SYS + تدرّج في العنوان", "السلوك · الحركة · المقاسات"],
];

const componentApi: Quad[] = [
  ["زر", ".sys-btn", "primary · primary-blue · dark · outline · outline-light · ghost · ghost-light · icon", "is-active · disabled · lg · sm · block"],
  ["سويتش", ".sys-switch", "— (role=switch)", "aria-checked true/false"],
  ["حقل", ".sys-field + .sys-input", "—", "valid · invalid · disabled"],
  ["وسم", ".sys-tag", "ok · warn", "—"],
  ["شيب", ".sys-chip", "chip-btn (تفاعلي)", "is-on"],
  ["تنبيه", ".sys-notice", "info · ok · warn", "—"],
  ["جدول", ".sys-table", "zebra · compact · selectable · stack", "is-selected"],
  ["توست", ".sys-toast", "ok · err", "is-show"],
  ["بطاقة", ".sys-card", "dark · alt · track-card", "sys-lift"],
  ["صفحة", ".sys-page", "— (انتقال)", "أنيميشن دخول واحد عند التبديل"],
];

const iconSizes: Pair[] = [
  ["أزرار (default)", "16px"], ["أزرار sm", "14px"], ["أزرار lg", "18px"],
  ["chips", "14px"], ["tags", "12px"], ["icon bubbles", "20px"],
];

const rulesList: string[] = [
  "RTL أصلًا: كل مكون مبني على inset-inline و margin-inline — لا شيء مربوط بيمين أو شمال ثابت",
  "خط Cairo لكل العناوين والنصوص — والوزن هو ما يميّز المستويات، لا الديكور",
  "أيقونات lucide فقط — ممنوع الإيموجي في أي مكوّن",
  "ممنوع letter-spacing على أي نص عربي (يفكك اتصال الحروف) — التمييز بالوزن والحجم واللون",
  "مقاس الأيقونة يأتي من CSS حسب السياق — لا size يدوي لكل instance",
  "تفاعل واحد للأزرار في النظام كله: hover يرتفع 1px · active scale(.97) · focus ring — الألوان تتغير، السلوك لا يتغير أبدًا",
  "بداية كل صفحة موحّدة: شارة «…مفتوح الآن» + CTA أساسي + CTA ثانوي أيقوني",
];

const iconSet = [UserPlus, Ticket, Upload, Handshake, Trophy, Users, GraduationCap, MessageCircle, Globe, School, Sparkles, Goal, Target, Gem, Code2, PenLine, Lightbulb, Wrench, Megaphone, Rocket, ImageIcon, Monitor, AlertTriangle, Moon, Sun, ArrowLeft, Check, FileText, NewspaperIcon, Bell, MousePointerClick, TableIcon, Ruler, Type, Layers, CircleDot, CheckCircle2, XCircle];

function StyleGuide({ onToast }: { onToast?: (t: ToastMsg) => void }) {
  const [qaSel, setQaSel] = useState("صديق / زميل");

  const copyTok = (t: string) => {
    try { navigator.clipboard?.writeText(t); onToast?.({ msg: `تم نسخ ${t}`, kind: "ok" }); } catch { /* ignore */ }
  };

  const SGHead = ({ icon, title, sub }: { icon: React.ReactNode; title: string; sub: string }) => (
    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 10, marginTop: 44 }}>
      <div className="sys-icon-bubble" style={{ margin: 0 }}>{icon}</div>
      <div>
        <h2 className="sys-h2" style={{ margin: 0 }}>{title}</h2>
        <p className="sys-help" style={{ margin: 0 }}>{sub}</p>
      </div>
    </div>
  );

  return (
    <main className="sys-page">
      <section className="sys-hero">
        <div className="sys-wrap">
          <span className="sys-badge-open"><span className="dot" /> نظام تصميم موحّد · v1.0</span>
          <h1 className="sys-h1">
            SYS <span style={{ color: "var(--site-hero-accent)" }}>Design System</span>
          </h1>
          <p className="sys-lead">
            الديزاين سيستم هو المنتج — والمواقع الثلاثة هي تطبيقاته. طبقة واحدة تشغّل ثلاث هويات:
            توكنات محايدة، مكوّنات سلوكها واحد، ووضع dark مدمج. المعاينة هنا بتقرأ هوية الموقع المختار من الهيدر.
          </p>
          <div className="sys-chip-row">
            {["foundations.css", "themes.css", "components.css"].map((f) => (
              <span key={f} className="sys-chip" style={{ direction: "ltr" }}>{f}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="sys-section">
        <div className="sys-wrap">

          {/* ===== 1. المعمار: 3 طبقات ===== */}
          <SGHead icon={<Layers />} title="المعمار · 3 طبقات" sub="الأساس يغذّي الثيمات، والثيمات تغذّي المكونات — لا مكون يعرف لونًا نهائيًا" />
          <div className="sys-grid sys-grid-3" style={{ marginTop: 16 }}>
            {architecture.map((a, i) => (
              <div key={a.file} className="sys-card sys-lift" style={{ animationDelay: `${i * 60}ms` }}>
                <div className="sys-icon-bubble">{a.icon}</div>
                <h3 style={{ fontSize: "var(--text-lg)", marginTop: 12 }}>{a.title}</h3>
                <code style={{ fontSize: "var(--text-2xs)", color: "var(--site-muted)", direction: "ltr", display: "block", marginBlock: "4px" }}>{a.file}</code>
                <p style={{ marginTop: 8 }}>{a.body}</p>
              </div>
            ))}
          </div>
          <div className="sys-notice sys-notice-info" style={{ marginTop: 14 }}>
            <AlertTriangle />
            <div><b>القاعدة الذهبية:</b> الثابت عبر الهويات الثلاث = السلوك، الحركة، الزوايا، الظلال، المسافات، الخط. المتغيّر = توكنات الألوان فقط. لو تعديل ثيم اضطرّك تغيّر سلوك مكوّن — الرجوع للبنية: الخطأ في الطبقة مش في المكوّن.</div>
          </div>

          {/* ===== 2. قاعدة التفاعل الواحدة ===== */}
          <SGHead icon={<MousePointerClick />} title="قاعدة التفاعل الواحدة · One interaction spec" sub="كل عنصر تفاعلي في النظام يتحرك بنفس المواصفات بالضبط — اللون وحده ما يفرّق" />
          <div className="sys-grid sys-grid-2" style={{ marginTop: 16 }}>
            <div className="sys-card">
              <ul className="sys-tick-list">
                <li>hover: translateY(-1px)</li>
                <li>press: scale(.97)</li>
                <li>focus-visible: ring بلون الـ accent وحده</li>
                <li>توقيت واحد: var(--dur-2) 180ms · var(--ease-standard)</li>
                <li>الأيقونة جوه الزر تتحرك معاه ككتلة واحدة</li>
              </ul>
            </div>
            <div className="sys-card sys-card-alt">
              <p className="sys-help" style={{ marginTop: 0 }}>جرّبها — نفس المواصفات للجميع:</p>
              <div className="sys-chip-row">
                <button className="sys-btn sys-btn-primary">أساسي</button>
                <button className="sys-btn sys-btn-outline">محدد بحدود</button>
                <button className="sys-btn sys-btn-ghost">شفاف</button>
              </div>
              <div className="sys-code-box" style={{ marginTop: 14, fontSize: ".78rem", padding: "10px 14px" }}>
                hover translateY(-1px) · active scale(.97) · transition 180ms cubic-bezier(.4, 0, .2, 1)
              </div>
            </div>
          </div>

          {/* ===== 3. الهويات الثلاث ===== */}
          <SGHead icon={<Gem />} title="الهويات الثلاث · data-site" sub="اللون يتغير حسب الهوية · السلوك لا يتغير أبدًا" />
          <div className="sys-table-wrap sys-reveal" style={{ marginTop: 16 }}>
            <table className="sys-table sys-table--stack">
              <thead><tr><th>الهوية</th><th>الشخصية</th><th>يتغيّر (ألوان فقط)</th><th>لا يتغيّر</th></tr></thead>
              <tbody>
                {identities.map(([name, persona, changes, fixed]) => (
                  <tr key={name}>
                    <td data-label="الهوية" style={{ fontWeight: 700 }}>{name}</td>
                    <td data-label="الشخصية">{persona}</td>
                    <td data-label="يتغيّر">{changes}</td>
                    <td data-label="لا يتغيّر"><span className="sys-tag sys-tag-ok">{fixed}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ===== 4. الأساس: الألوان ===== */}
          <SGHead icon={<Layers />} title="الأساس · الألوان" sub="اضغط أي توكن لنسخه — السلم كله محايد ويعاد تلوينه في themes.css" />
          {[
            { name: "Brand · SYS Blue", sw: brandSwatches },
            { name: "Ink · المحايدات", sw: inkSwatches },
          ].map((s) => (
            <div key={s.name} style={{ marginBlock: "14px" }}>
              <p style={{ fontWeight: 700, marginBottom: 8 }}>{s.name}</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(92px, 1fr))", gap: 8 }}>
                {s.sw.map((n) => (
                  <button key={n} type="button" onClick={() => copyTok(`--${n}`)} title={`اضغط لنسخ --${n}`} style={{ padding: 0, overflow: "hidden", boxShadow: "var(--elev-1)", cursor: "pointer", border: "1px solid var(--site-card-border)", borderRadius: "var(--radius-md)", background: "var(--site-card)", font: "inherit" }}>
                    <span style={{ display: "block", height: 54, background: `var(--${n})`, borderBottom: "1px solid var(--site-card-border)" }} />
                    <span style={{ display: "block", padding: "6px 10px", fontSize: "var(--text-2xs)", fontWeight: 700, direction: "ltr", color: "var(--site-ink, inherit)" }}>{`--${n}`}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
          <div className="sys-card" style={{ marginTop: 10 }}>
            <div className="sys-chip-row">
              {[
                ["--ok", "نجاح #009767"],
                ["--warn", "تحذير #b75000"],
                ["--danger", "خطأ #dc2626"],
              ].map(([tok, label]) => (
                <span key={tok} className="sys-chip">
                  <span style={{ width: 10, height: 10, borderRadius: "var(--radius-full)", background: `var(${tok})`, display: "inline-block" }} /> {label}
                </span>
              ))}
            </div>
          </div>

          {/* ===== 5. الأساس: الخط والمسافات ===== */}
          <SGHead icon={<Type />} title="الأساس · الخط والمسافات" sub="Cairo · سلم أنواع واحد · شبكة 4pt — وبدون letter-spacing على نص عربي" />
          <div className="sys-card" style={{ marginTop: 16 }}>
            {typeScale.map(([tok, sample, note]) => (
              <div key={tok} style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "baseline", paddingBlock: 8, borderBottom: "1px dashed var(--site-card-border)" }}>
                <button type="button" onClick={() => copyTok(`var(${tok})`)} title={`اضغط لنسخ var(${tok})`} style={{ minWidth: 120, background: "none", border: 0, padding: 0, cursor: "pointer", font: "inherit", textAlign: "start" }}>
                  <code style={{ fontSize: "var(--text-2xs)", color: "var(--site-muted)", direction: "ltr" }}>{`var(${tok})`}</code>
                </button>
                <strong style={{ fontSize: `var(${tok})` }}>{sample}</strong>
                <span className="sys-chip">{note}</span>
              </div>
            ))}
          </div>
          <div className="sys-card" style={{ marginTop: 12 }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: "8px 20px" }}>
              {spacingSteps.map((s) => (
                <div key={s} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <code style={{ fontSize: "var(--text-2xs)", color: "var(--site-muted)", direction: "ltr", minWidth: 78 }}>{s}</code>
                  <span style={{ width: `var(${s})`, height: 10, borderRadius: "var(--radius-full)", background: "var(--site-accent)", opacity: .85, display: "inline-block" }} />
                </div>
              ))}
            </div>
          </div>

          {/* ===== 6. الأساس: زوايا/ظلال/حركة/z ===== */}
          <SGHead icon={<Ruler />} title="الأساس · زوايا · ظلال · حركة · z-index" sub="كلها توكنات — لا قيم عينية داخل المكونات" />
          <div className="sys-grid sys-grid-4" style={{ marginTop: 16 }}>
            {radiiL.map(([tok, val, usage]) => (
              <div key={tok} className="sys-card sys-card-alt" style={{ borderRadius: val }}>
                <code style={{ fontSize: "var(--text-2xs)", direction: "ltr" }}>{tok} · {val}</code>
                <p className="sys-help" style={{ margin: 0 }}>{usage}</p>
              </div>
            ))}
          </div>
          <div className="sys-grid sys-grid-4" style={{ marginTop: 12 }}>
            {elevations.map((e) => (
              <div key={e} className="sys-card sys-center" style={{ boxShadow: `var(--${e})` }}>
                <code style={{ fontSize: "var(--text-2xs)", direction: "ltr" }}>{`--${e}`}</code>
              </div>
            ))}
          </div>
          <div className="sys-grid sys-grid-2" style={{ marginTop: 12 }}>
            <div className="sys-card">
              <p style={{ fontWeight: 700, margin: 0 }}>الحركة · Motion</p>
              <div className="sys-chip-row" style={{ marginTop: 8 }}>
                {durationsL.map(([tok, val, usage]) => (
                  <span key={tok} className="sys-chip" style={{ direction: "ltr" }} title={usage}>{tok} · {val}</span>
                ))}
              </div>
              <div className="sys-chip-row" style={{ marginTop: 8 }}>
                {["--ease-standard", "--ease-decel", "--ease-spring"].map((e) => (
                  <span key={e} className="sys-chip" style={{ direction: "ltr" }}>{e}</span>
                ))}
              </div>
              <p className="sys-help">ندعم prefers-reduced-motion: الأنيميشن يتراجع لحالة ثابتة من غير حركة زائدة.</p>
            </div>
            <div className="sys-card">
              <p style={{ fontWeight: 700, margin: 0 }}>سلّم z-index</p>
              <div className="sys-chip-row" style={{ marginTop: 8 }}>
                {zIndexes.map(([tok, val]) => (
                  <span key={tok} className="sys-chip" style={{ direction: "ltr" }}>{tok} · {val}</span>
                ))}
              </div>
              <p className="sys-help">كل طبقة تعرف مكانها بالتوكن — لا سباق قيم بين الطبقات.</p>
            </div>
          </div>

          {/* ===== 7. API المكونات ===== */}
          <SGHead icon={<CircleDot />} title="المكونات · API موحّدة" sub="sys-<name> + <variant> + is-<state> — نفس العقد لكل المكوّنات" />
          <div className="sys-table-wrap sys-reveal" style={{ marginTop: 16 }}>
            <table className="sys-table sys-table--stack">
              <thead><tr><th>المكوّن</th><th>الصنف الأساسي</th><th>الأشكال · variants</th><th>الحالات · states</th></tr></thead>
              <tbody>
                {componentApi.map(([name, base, variants, states]) => (
                  <tr key={name}>
                    <td data-label="المكوّن" style={{ fontWeight: 700 }}>{name}</td>
                    <td data-label="الصنف الأساسي"><code style={{ fontSize: "var(--text-2xs)", direction: "ltr" }}>{base}</code></td>
                    <td data-label="variants"><code style={{ fontSize: "var(--text-2xs)", direction: "ltr", color: "var(--site-accent-strong)" }}>{variants}</code></td>
                    <td data-label="states"><code style={{ fontSize: "var(--text-2xs)", direction: "ltr", color: "var(--site-muted)" }}>{states}</code></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="sys-card" style={{ marginTop: 12 }}>
            <p className="sys-help" style={{ marginTop: 0 }}>التركيب النمطي — الصنف الأساسي + شكل واحد + حالة لما يلزم:</p>
            <div className="sys-chip-row">
              <div className="sys-code-box" style={{ fontSize: ".82rem", padding: "10px 16px" }}>class="sys-btn sys-btn-primary sys-btn-lg"</div>
              <div className="sys-code-box" style={{ fontSize: ".82rem", padding: "10px 16px" }}>class="sys-chip sys-chip-btn is-on"</div>
              <div className="sys-code-box" style={{ fontSize: ".82rem", padding: "10px 16px" }}>class="sys-field invalid"</div>
            </div>
          </div>

          {/* ===== 8. معاينة مكونات حيّة ===== */}
          <SGHead icon={<Sparkles />} title="مكوّنات حيّة · Live components" sub="كل معاينة تعمل فعليًا — التفاعل الواحد محسوس بالتجربة" />
          <div className="sys-card" style={{ marginTop: 16 }}>
            <p style={{ fontWeight: 700 }}>أزرار · الأشكال والمقاسات</p>
            <div className="sys-chip-row">
              <button className="sys-btn sys-btn-primary">primary <ArrowLeft /></button>
              <button className="sys-btn sys-btn-primary sys-btn-primary-blue">primary-blue <ArrowLeft /></button>
              <button className="sys-btn sys-btn-dark">dark</button>
              <button className="sys-btn sys-btn-outline">outline</button>
              <button className="sys-btn sys-btn-ghost">ghost</button>
              <button className="sys-btn sys-btn-primary" disabled>disabled</button>
              <button className="sys-btn sys-btn-icon" aria-label="رفع ملف" title="رفع ملف"><Upload /></button>
            </div>
            <div className="sys-chip-row">
              <button className="sys-btn sys-btn-lg sys-btn-primary">lg · أيقونات 18</button>
              <button className="sys-btn sys-btn-primary">md · أيقونات 16</button>
              <button className="sys-btn sys-btn-sm sys-btn-primary">sm · أيقونات 14</button>
              <button className="sys-btn sys-btn-primary sys-btn-block" style={{ maxWidth: 320 }}>block · عرض كامل</button>
            </div>
          </div>

          <div className="sys-card" style={{ marginTop: 12, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
            <div className="sys-field"><label>حقل · default</label><input className="sys-input" placeholder="اكتب هنا…" /></div>
            <div className="sys-field valid"><label>حقل · valid</label><input className="sys-input" value="sys@sys.example" readOnly dir="ltr" /><span className="sys-ok-msg"><CheckCircle2 /> تمام</span></div>
            <div className="sys-field invalid"><label>حقل · invalid</label><input className="sys-input" value="قيمة غير صحيحة" readOnly /><span className="sys-err-msg"><XCircle /> رسالة الخطأ تظهر مع الحالة</span></div>
            <div className="sys-field"><label>حقل · disabled</label><input className="sys-input" value="غير متاح" disabled /></div>
          </div>

          <div className="sys-card" style={{ marginTop: 12 }}>
            <div className="sys-chip-row">
              <span className="sys-tag"><Code2 size={12} /> tag default</span>
              <span className="sys-tag sys-tag-ok"><CheckCircle2 size={12} /> tag ok</span>
              <span className="sys-tag sys-tag-warn"><AlertTriangle size={12} /> tag warn</span>
              <span className="sys-chip"><Users size={14} /> chip</span>
            </div>
            <p className="sys-help" style={{ marginTop: 10 }}>شبّات انتقائية (radiogroup) — المختار ياخد is-on:</p>
            <div className="sys-chip-row" role="radiogroup" aria-label="اختيار تجريبي">
              {compQa.map((q) => (
                <button key={q.label} type="button" role="radio" aria-checked={qaSel === q.label}
                  className={`sys-chip sys-chip-btn ${qaSel === q.label ? "is-on" : ""}`}
                  onClick={() => setQaSel(q.label)}>
                  {q.icon} {q.label}
                </button>
              ))}
            </div>
            <div className="sys-faq" style={{ marginTop: 8 }}>
              <div className="sys-notice sys-notice-info"><Bell /> notice info · معلومة</div>
              <div className="sys-notice sys-notice-ok"><CheckCircle2 /> notice ok · نجاح</div>
              <div className="sys-notice sys-notice-warn"><AlertTriangle /> notice warn · تحذير</div>
            </div>
          </div>

          <div className="sys-table-wrap sys-reveal" style={{ marginTop: 12 }}>
            <table className="sys-table sys-table--zebra">
              <thead><tr><th>العنوان</th><th>الحالة</th><th>النقاط</th></tr></thead>
              <tbody>
                <tr className="is-selected"><td>صف محدد · is-selected</td><td><span className="sys-tag sys-tag-ok">محدد</span></td><td className="num">950</td></tr>
                <tr><td>صف عادي · zebra + hover</td><td><span className="sys-tag">افتراضي</span></td><td className="num">820</td></tr>
              </tbody>
            </table>
          </div>

          {/* ===== 9. قواعد الأيقونات ===== */}
          <SGHead icon={<TableIcon />} title="الأيقونات · lucide فقط" sub="المقاس يأتي من CSS حسب السياق — مفيش size يدوي لكل instance" />
          <div className="sys-grid sys-grid-2 sys-reveal-group" style={{ marginTop: 16, alignItems: "start" }}>
            <div className="sys-card">
              <table className="sys-table" style={{ boxShadow: "none", background: "transparent", border: 0 }}>
                <thead><tr><th>السياق</th><th>المقاس</th></tr></thead>
                <tbody>
                  {iconSizes.map(([ctx, px]) => (
                    <tr key={ctx}><td>{ctx}</td><td><code style={{ direction: "ltr" }}>{px}</code></td></tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="sys-card">
              <p style={{ fontWeight: 700, marginTop: 0 }}>المجموعة الحالية بالمشروع:</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(64px, 1fr))", gap: 8, marginTop: 8 }}>
                {iconSet.map((I, i) => (
                  <div key={i} className="sys-card sys-card-alt sys-lift" style={{ padding: 12, display: "grid", placeItems: "center", color: "var(--site-accent-strong)" }} title="lucide icon">
                    <I />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ===== 10. قواعد النظام الثابتة ===== */}
          <SGHead icon={<Check />} title="قواعد النظام · Non-negotiables" sub="لو مكوّن خالف قاعدة هنا — الرجوع للبنية لا للمكوّن" />
          <div className="sys-card" style={{ marginTop: 16 }}>
            <ul className="sys-tick-list">
              {rulesList.map((r) => <li key={r}>{r}</li>)}
            </ul>
          </div>

          {/* ===== 11. العلامة ===== */}
          <SGHead icon={<Gem />} title="العلامة · Brand mark" sub="SVG واحد للهيدر والفافيكون — لا إصدارات متعددة" />
          <div className="sys-card" style={{ marginTop: 16, display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center" }}>
            <img src="/website/assets/logo-cutout.png" alt="شعار SYS" width={56} height={56} />
            <div>
              <strong>SYS Design System v1.0</strong>
              <p style={{ margin: 0 }}>Foundations ← Themes ← Components · Cairo · RTL-native · light/dark</p>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}

/* ===================== App ===================== */

function App() {
  const [siteId, setSiteId] = useState<SiteId>("medical");
  const [tabId, setTabId] = useState<TabId>("system"); // النظام هو الواجهة الرئيسية للمشروع
  const [mode, setMode] = useState<"light" | "dark">("light");
  const [scrolled, setScrolled] = useState(false);
  const [toast, setToast] = useState<ToastMsg | null>(null);
  const [youthTab, setYouthTab] = useState<"news" | "partners" | "board">("news");
  const [qaSel, setQaSel] = useState("صديق / زميل"); // راديوي «عرفت المسابقة من إيه»
  const [medName, setMedName] = useState("");
  const [medEmail, setMedEmail] = useState("");

  // auto-hide toast
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2800);
    return () => clearTimeout(t);
  }, [toast]);

  // Header elevation on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // كشف عند الدخول للشاشة (scroll reveal) — مرة واحدة لكل عنصر، وإعادة فحص مع كل تبديل تاب.
  // بدون IntersectionObserver: كل العناصر تظهر فورًا (سقوط آمن).
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".sys-reveal, .sys-reveal-group"));
    els.forEach((el) => el.classList.remove("is-in"));
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("is-in");
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -36px 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [tabId]);

  const site = sites.find((s) => s.id === siteId)!;

  // تبديل الوضع الفاتح/الداكن: كشف دائري (circular reveal) من مكان السويتش
  // عبر View Transitions API — الثيم الجديد ينتشر كدائرة ت cenترها نقطة الزر،
  // والمتصفح بدون دعم (Firefox) أو مع prefers-reduced-motion → تبديل فوري عادي.
  const toggleMode = (e: React.MouseEvent<HTMLButtonElement>) => {
    const next = mode === "light" ? "dark" : "light";
    const doc = document as Document & {
      startViewTransition?: (cb: () => void) => { ready: Promise<void>; finished: Promise<void> };
    };

    // بدون دعم أو مع تفضيل تقليل الحركة: تبديل فوري — الـ transition اللوني الحالي يعالج التنعيم
    if (!doc.startViewTransition || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setMode(next);
      return;
    }

    const vtRoot = document.querySelector(".theme-root");

    // apply يعمل داخل اللقطة: قفّل انتقالات اللون + طبّق الحالة فورًا (مهم قبل الـ snapshot)
    const apply = () => {
      vtRoot?.classList.add("sys-vt");
      flushSync(() => setMode(next));
    };

    // نقطة الأصل = مركز السويتش · نصف القطر = أبعد زاوية في الشاشة
    const r = e.currentTarget.getBoundingClientRect();
    const x = r.left + r.width / 2;
    const y = r.top + r.height / 2;
    const endR = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));

    // علامة الاتجاه على <html>: تقلب ترتيب طبقات اللقطة في CSS
    // (to-light → القديم فوق وينكمش، هو موجة الرجوع المرئية)
    document.documentElement.dataset.vt = next === "light" ? "to-light" : "to-dark";

    const vt = doc.startViewTransition(apply);
    vt.ready
      .then(() => {
        if (next === "light") {
          // موجة رجوع (→ فاتح): القديم (الداكن) ينكمش دائريًا راجعًا ناحية نقطة الأصل
          // كاشفًا الثيم الفاتح الثابت تحته — الاتجاه معكوس، مش انتشار عكسي بالحظ
          document.documentElement.animate(
            { clipPath: [`circle(${endR}px at ${x}px ${y}px)`, `circle(0px at ${x}px ${y}px)`] },
            { duration: 480, easing: "cubic-bezier(.4, 0, .2, 1)", pseudoElement: "::view-transition-old(root)", fill: "forwards" },
          );
        } else {
          // موجة هجوم (→ داكن): الجديد (الداكن) ينتشر دائريًا من نقطة الأصل
          document.documentElement.animate(
            { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${endR}px at ${x}px ${y}px)`] },
            { duration: 480, easing: "cubic-bezier(0, 0, .2, 1)", pseudoElement: "::view-transition-new(root)", fill: "forwards" },
          );
        }
      })
      .catch(() => { /* اللقطة اتأخرت أو اتمسحت — مش مشكلة */ });
    vt.finished.finally(() => {
      vtRoot?.classList.remove("sys-vt");
      delete document.documentElement.dataset.vt;
    });
  };

  // تسجيل Medical: تحقق فعلي من الاسم والإيميل ثم توست نجاح
  const medSubmit = () => {
    if (medName.trim().length < 3) {
      setToast({ msg: "اكتب اسمك الكامل الأول (3 حروف على الأقل)", kind: "err" });
      return;
    }
    if (!isValidEmail(medEmail)) {
      setToast({ msg: "الإيميل غير صحيح — مثال: name@mail.com", kind: "err" });
      return;
    }
    setToast({ msg: `تم استلام تسجيلك يا ${medName.trim().split(" ")[0]} — كود الحضور SMD-0042`, kind: "ok" });
  };

  return (
    <div className="theme-root" data-site={siteId} data-mode={mode} dir="rtl">
      {/* ==================== HEADER ==================== */}
      <header className={`sys-header ${scrolled ? "is-scrolled" : ""}`}>
        <div className="sys-wrap">
          <div className="sys-brand">
            <img src="/website/assets/logo.jpg" alt="شعار SYS" width={38} height={38} style={{ borderRadius: 10 }} />
            <strong>{site.heading}</strong>
          </div>

          {/* Tabs — النظام أولًا (هو المنتج) وبعده معاينات الهويات، كلها .sys-btn واحد */}
          <nav className="sys-nav" aria-label="التنقل">
            <button
              type="button"
              className={`sys-btn sys-btn-sm ${tabId === "system" ? "sys-btn-primary" : "sys-btn-ghost-light"}`}
              aria-pressed={tabId === "system"}
              onClick={() => { setTabId("system"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            >
              <Sparkles size={14} /> النظام
            </button>
            {sites.map((s) => (
              <button
                key={s.id}
                type="button"
                className={`sys-btn sys-btn-sm ${tabId === s.id ? "sys-btn-primary" : "sys-btn-ghost-light"}`}
                aria-pressed={tabId === s.id}
                onClick={() => { setSiteId(s.id); setTabId(s.id); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              >
                {s.label}
              </button>
            ))}
          </nav>

          {/* Mode switch */}
          <div className="sys-header-end">
            <button
              className="sys-switch"
              role="switch"
              aria-checked={mode === "dark"}
              aria-label="التبديل بين الوضع النهاري والليلي"
              onClick={toggleMode}
            >
              <span className="sys-switch-track-icon sys-switch-track-icon--sun"><Sun /></span>
              <span className="sys-switch-knob">{mode === "light" ? <Sun /> : <Moon />}</span>
              <span className="sys-switch-track-icon sys-switch-track-icon--moon"><Moon /></span>
            </button>
          </div>
        </div>
      </header>

      {/* ==================== STYLEGUIDE ==================== */}
      {tabId === "system" && <StyleGuide onToast={setToast} />}

      {/* ==================== MEDICAL ==================== */}
      {tabId === "medical" && (
        <main className="sys-page">
          <section className="sys-hero">
            <div className="sys-wrap">
              <span className="sys-badge-open"><span className="dot" /> التسجيل مفتوح الآن</span>
              <h1 className="sys-h1">
                MEB × <span style={{ color: "var(--site-hero-accent)" }}>SYS</span> — تسجيل الحضور
              </h1>
              <p className="sys-lead">
                سجّل حضورك في دقيقة واحدة، واستلم تذكرة QR تدخل بيها الايفنت. بياناتك محفوظة عندنا وبس.
              </p>
              <div className="sys-hero-cta">
                <button className="sys-btn sys-btn-primary sys-btn-lg">سجّل دلوقتي <ArrowLeft /></button>
                <button className="sys-btn sys-btn-outline-light sys-btn-lg"><Ticket /> عندي تذكرة</button>
              </div>
              <div className="sys-stat-grid">
                {medicalStats.map((s, i) => (
                  <div key={s.label} className="sys-stat" style={stagger(i)}>
                    <b>{s.value}</b><span>{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="sys-section">
            <div className="sys-wrap">
              {/* Form + QR ticket side by side */}
              <div className="sys-grid sys-grid-2 sys-reveal-group">
                <div className="sys-card">
                  <span className="sys-tag"><UserPlus size={12} /> التسجيل</span>
                  <h2 style={{ fontSize: "var(--text-xl)", marginTop: 12 }}>نموذج التسجيل</h2>
                  <Field label="الاسم" value={medName} onChange={setMedName} placeholder="اسمك الكامل" required />
                  <div className="sys-form-row">
                    <Field label="الإيميل" value={medEmail} onChange={setMedEmail} type="email" placeholder="example@email.com" ltr required />
                    <div className="sys-field"><label>رقم واتساب</label><input className="sys-input" placeholder="07xx xxx xxxx" dir="ltr" /></div>
                  </div>
                  <div className="sys-form-row">
                    <div className="sys-field"><label>المحافظة</label><input className="sys-input" placeholder="بغداد" /></div>
                    <div className="sys-field"><label>المسمى الوظيفي</label><input className="sys-input" placeholder="طالب / خريج" /></div>
                  </div>
                  <button
                    type="button"
                    className="sys-btn sys-btn-primary sys-btn-block"
                    onClick={medSubmit}
                  >
                    <Check /> أرسل التسجيل
                  </button>
                </div>

                {/* QR ticket */}
                <div className="sys-card sys-card-dark">
                  <span className="sys-tag"><Ticket size={12} /> الحضور</span>
                  <h2 style={{ fontSize: "var(--text-xl)", marginTop: 12 }}>تذكرة الحضور</h2>
                  <p>التذكرة جاهزة على موبايلك — بتتقري على باب الايفنت.</p>
                  <div style={{ width: 160, height: 160, borderRadius: "var(--radius-lg)", background: "rgba(147,197,253,.12)", border: "1px solid rgba(191,219,254,.25)", display: "grid", placeItems: "center", margin: "16px auto" }}>
                    <span style={{ color: "var(--brand-300)", fontSize: ".8rem" }}>QR Code</span>
                  </div>
                  <div className="sys-chip-row"><span className="sys-chip">SMD-0042</span></div>
                  <button type="button" className="sys-btn sys-btn-outline-light sys-btn-sm" style={{ marginTop: 14 }} onClick={() => setToast({ msg: "رفع صورة التحويل — تجريبي", kind: "ok" })}>
                    <Upload size={14} /> ارفع صورة التحويل
                  </button>
                </div>
              </div>

              {/* Partners full-width strip */}
              <div className="sys-card sys-reveal" style={{ marginTop: 18 }}>
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "6px 12px" }}>
                  <span className="sys-tag"><Handshake size={12} /> الجهات الرسمية والشركاء</span>
                  <div className="sys-chip-row" style={{ marginTop: 0, marginInlineStart: "auto" }}>
                    {medicalPartners.map((p) => <span key={p} className="sys-chip">{p}</span>)}
                  </div>
                </div>
              </div>

              {/* FAQ */}
              <h2 className="sys-h2" style={{ margin: "36px 0 14px" }}>أسئلة متكررة</h2>
              <div className="sys-faq">
                {medicalFaq.map((f, i) => (
                  <details key={i} open={i === 0} style={stagger(i)}>
                    <summary>{f.q}</summary>
                    <p>{f.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>
        </main>
      )}

      {/* ==================== YOUTH HUB ==================== */}
      {tabId === "youth" && (
        <main className="sys-page">
          <section className="sys-hero">
            <div className="sys-wrap" style={{ display: "grid", gridTemplateColumns: "1.2fr .8fr", gap: 32, alignItems: "center" }}>
              <div>
                <span className="sys-badge-open"><span className="dot" /> التطوع مفتوح الآن</span>
                <h1 className="sys-h1">
                  شباب يدعم الشباب — <span style={{ color: "var(--site-hero-accent)" }}>SYS Youth</span>
                </h1>
                <p className="sys-lead">
                  مبادرة شبابية مصرية تجمع الطاقات وتصنع فرصًا حقيقية للشباب — لأن التغيير يبدأ منّا.
                </p>
                <div className="sys-hero-cta">
                  <button className="sys-btn sys-btn-primary sys-btn-primary-blue sys-btn-lg">انضم كمتطوع <ArrowLeft /></button>
                  <button className="sys-btn sys-btn-outline-light sys-btn-lg"><Handshake /> اطلب شراكة</button>
                </div>
              </div>
              <div style={{ borderRadius: "var(--radius-xl)", overflow: "hidden", border: "1px solid var(--site-hero-stat-border)", boxShadow: "var(--elev-4)", animation: "sys-scale-in var(--dur-4) var(--ease-decel) both", animationDelay: ".15s" }} className="sys-hide-mobile">
                <img src={YOUTH_HERO_IMG} alt="شباب SYS يصنعون الأثر" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </div>
            </div>
            <div className="sys-wrap">
              <div className="sys-stat-grid">
                {youthStats.map((s, i) => (
                  <div key={s.label} className="sys-stat" style={stagger(i)}>
                    <b>{s.value}</b><span>{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="sys-section">
            <div className="sys-wrap">
              {/* Vision / Mission / Values */}
              <div className="sys-grid sys-grid-3 sys-reveal-group" style={{ marginBottom: 36 }}>
                {youthValues.map((v, i) => (
                  <div key={v.title} className="sys-card sys-lift" style={stagger(i)}>
                    <div className="sys-icon-bubble">{v.icon}</div>
                    <h3 style={{ fontSize: "var(--text-lg)" }}>{v.title}</h3>
                    <p>{v.body}</p>
                  </div>
                ))}
              </div>

              {/* Tabs — ghost idle / primary active */}
              <div className="sys-chip-row" style={{ marginBottom: 18 }}>
                {(
                  [
                    ["news", "أخبار", <NewspaperIcon key="i" size={13} />],
                    ["partners", "شركاء", <Handshake key="i" size={13} />],
                    ["board", "المتصدرون", <Trophy key="i" size={13} />],
                  ] as const
                ).map(([key, label, icon]) => (
                  <button
                    key={key}
                    type="button"
                    className={`sys-btn sys-btn-sm ${youthTab === key ? "sys-btn-primary" : "sys-btn-ghost"}`}
                    aria-pressed={youthTab === key}
                    onClick={() => setYouthTab(key)}
                  >
                    {icon} {label}
                  </button>
                ))}
              </div>

              {youthTab === "news" && (
                <div className="sys-table-wrap sys-reveal-group">
                  <table className="sys-table sys-table--stack sys-table--zebra">
                    <thead><tr><th>العنوان</th><th>التاريخ</th><th>الحالة</th></tr></thead>
                    <tbody>
                      {youthNews.map((n) => (
                        <tr key={n.id}>
                          <td data-label="العنوان" style={{ fontWeight: 700 }}>{n.title}</td>
                          <td data-label="التاريخ">{n.date}</td>
                          <td data-label="الحالة">
                            <span className={`sys-tag ${n.status === "Draft" ? "sys-tag-warn" : "sys-tag-ok"}`}>
                              {n.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {youthTab === "partners" && (
                <div className="sys-grid sys-grid-4 sys-reveal-group">
                  {youthPartners.map((p) => (
                    <div key={p} className="sys-card sys-lift sys-center">
                      <div className="sys-icon-bubble" style={{ marginInline: "auto" }}><Handshake /></div>
                      <strong style={{ fontSize: ".92rem" }}>{p}</strong>
                    </div>
                  ))}
                </div>
              )}

              {youthTab === "board" && (
                <div className="sys-table-wrap sys-reveal-group">
                  <table className="sys-table sys-table--stack sys-table--zebra">
                    <thead><tr><th>الترتيب</th><th>الاسم</th><th>النقاط</th><th>المستوى</th></tr></thead>
                    <tbody>
                      {youthLeaderboard.map((r) => (
                        <tr key={r.rank}>
                          <td data-label="الترتيب" className="num"><b>{r.rank}</b></td>
                          <td data-label="الاسم" style={{ fontWeight: 700 }}>{r.name}</td>
                          <td data-label="النقاط" className="num">{r.points}</td>
                          <td data-label="المستوى">{r.badge && <span className="sys-tag">{r.badge}</span>}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </section>
        </main>
      )}

      {/* ==================== COMPETITION ==================== */}
      {tabId === "competition" && (
        <main className="sys-page">
          <section className="sys-hero">
            <div className="sys-wrap">
              <span className="sys-badge-open"><span className="dot" /> التقديم مفتوح الآن</span>
              <h1 className="sys-h1">
                مسابقة{" "}
                <span style={{
                  background: "linear-gradient(120deg,var(--site-hero-accent),var(--brand-400) 55%,#dbeafe)",
                  WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent",
                }}>
                  SYS
                </span>{" "}
                للإبداع والابتكار
              </h1>
              <p className="sys-lead">
                مساران بيتنافسوا على نفس الفرصة: <b>التكنولوجيا والابتكار</b> و<b>الأدب والفنون</b> —
                اختر مسار واحد بس وارفق إثبات إن العمل بتاعك.
              </p>
              <div className="sys-hero-cta">
                <button className="sys-btn sys-btn-primary sys-btn-lg">قدّم مشاركتك الآن <ArrowLeft /></button>
                <button className="sys-btn sys-btn-outline-light sys-btn-lg"><FileText /> اقرأ الشروط الأول</button>
              </div>
              <div className="sys-stat-grid">
                {compStats.map((s, i) => (
                  <div key={s.label} className="sys-stat" style={stagger(i)}>
                    <b>{s.value}</b><span>{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="sys-section">
            <div className="sys-wrap">
              {/* Tracks */}
              <div className="sys-grid sys-grid-2 sys-reveal-group">
                {compTracks.map((t) => (
                  <article key={t.id} className="sys-card sys-track-card sys-lift">
                    <span className="sys-tag">{t.icon} {t.tag}</span>
                    <h3 style={{ fontSize: "var(--text-lg)", marginTop: 12 }}>{t.title}</h3>
                    <p>{t.desc}</p>
                    <div className="sys-chip-row">
                      {t.chips.map((c) => <span key={c} className="sys-chip">{c}</span>)}
                    </div>
                    <h4 style={{ marginTop: 18, fontSize: ".95rem" }}>التركيز في التحكيم</h4>
                    <ul className="sys-tick-list">
                      {t.criteria.map((c) => <li key={c}>{c}</li>)}
                    </ul>
                    <button type="button" className="sys-btn sys-btn-primary sys-btn-block" style={{ marginTop: 18 }} onClick={() => setToast({ msg: "نموذج التقديم — تجريبي", kind: "ok" })}>
                      قدّم في {t.id === "tech" ? "مسار التكنولوجيا" : "مسار الأدب والفنون"}
                    </button>
                  </article>
                ))}
              </div>

              {/* Rules */}
              <h2 className="sys-h2" style={{ margin: "40px 0 18px" }}>شروط وأحكام المسابقة</h2>
              <div className="sys-grid sys-grid-4 sys-reveal-group">
                {compRules.map((r, i) => (
                  <div key={r.num} className="sys-card sys-lift" style={stagger(i)}>
                    <div className="sys-card-head">
                      <span className="sys-card-num">{r.num}</span>
                      <h3 style={{ fontSize: "var(--text-base)" }}>{r.title}</h3>
                    </div>
                    <p>{r.body}</p>
                  </div>
                ))}
              </div>

              {/* Proof of work */}
              <div className="sys-card sys-reveal" style={{ marginTop: 36 }}>
                <span className="sys-tag"><Upload size={12} /> إثبات العمل</span>
                <h3 style={{ fontSize: "var(--text-xl)", marginTop: 12 }}>إثبات إن العمل بتاعك… شرط مش اختياري</h3>
                <p>مع كل مشاركة لازم دليل واضح يوضح إنك صاحب العمل — بحد أقصى 5 ملفات، 10 ميجا للملف.</p>
                <div className="sys-grid sys-grid-2" style={{ marginTop: 16 }}>
                  {compProof.map((p) => (
                    <div key={p.title} className="sys-card sys-card-alt" style={{ boxShadow: "none" }}>
                      <div className="sys-icon-bubble">{p.icon}</div>
                      <h4 style={{ fontSize: ".95rem" }}>{p.title}</h4>
                      <p>{p.body}</p>
                    </div>
                  ))}
                  <div className="sys-notice sys-notice-warn" style={{ gridColumn: "1 / -1" }}>
                    <AlertTriangle size={16} />
                    <div><b>تنبيه مهم:</b> عدم تقديم إثبات واضح للعمل من أسباب الاستبعاد المباشر من المسابقة.</div>
                  </div>
                </div>
              </div>

              {/* Judging */}
              <h2 className="sys-h2" style={{ margin: "40px 0 18px" }}>بيتقيّم إزاي؟</h2>
              <div className="sys-grid sys-grid-4 sys-reveal-group">
                {compJudging.map((j, i) => (
                  <div key={j.title} className="sys-card sys-lift sys-center" style={stagger(i)}>
                    <div className="sys-icon-bubble" style={{ marginInline: "auto" }}>{j.icon}</div>
                    <h3 style={{ fontSize: ".98rem" }}>{j.title}</h3>
                  </div>
                ))}
              </div>

              {/* How did you hear about us — interactive radio pills */}
              <div className="sys-card sys-reveal" style={{ marginTop: 36 }}>
                <h3 style={{ fontSize: "var(--text-lg)" }}>
                  عرفت المسابقة من إيه؟ <span style={{ color: "var(--danger)" }}>*</span>
                </h3>
                <div className="sys-chip-row" role="radiogroup" aria-label="عرفت المسابقة من إيه">
                  {compQa.map((q) => (
                    <button
                      key={q.label}
                      type="button"
                      role="radio"
                      aria-checked={qaSel === q.label}
                      className={`sys-chip sys-chip-btn ${qaSel === q.label ? "is-on" : ""}`}
                      onClick={() => setQaSel(q.label)}
                    >
                      {q.icon} {q.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dark CTA */}
              <div className="sys-card sys-card-dark sys-center sys-reveal" style={{ marginTop: 36 }}>
                <h2 style={{ fontSize: "var(--text-2xl)" }}>جاهز تقدّم مشاركتك؟</h2>
                <p>الفورم 5 خطوات ومن 10 لـ 15 دقيقة، وفيه حفظ تلقائي للمسودة.</p>
                <div className="sys-chip-row" style={{ justifyContent: "center" }}>
                  <button type="button" className="sys-btn sys-btn-primary">افتح فورم المشاركة</button>
                </div>
              </div>

              {/* FAQ */}
              <h2 className="sys-h2" style={{ margin: "40px 0 14px" }}>أسئلة شاهقة</h2>
              <div className="sys-faq">
                {compFaq.map((f, i) => (
                  <details key={i} open={i === 0} style={stagger(i)}>
                    <summary>{f.q}</summary>
                    <p>{f.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>
        </main>
      )}

      {/* ==================== FOOTER ==================== */}
      <footer className="sys-footer">
        <div className="sys-wrap">
          <div className="cols">
            <div>
              <h4>SYS Design System</h4>
              <span style={{ fontSize: ".88rem", display: "block" }}>{site.heading} — {site.tagline}</span>
              <span style={{ fontSize: ".8rem" }}>هوية موحّدة مستخرجة من المواقع الثلاثة · خط Cairo · RTL</span>
            </div>
            <div>
              <h4>المواقع</h4>
              {sites.map((s) => (
                <a key={s.id} className="link" href="#" onClick={(e) => { e.preventDefault(); setSiteId(s.id); setTabId(s.id); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
                  {s.label}
                </a>
              ))}
            </div>
            <div>
              <h4>التقديم</h4>
              <a className="link" href="#">فورم المشاركة</a>
              <a className="link" href="#">الشروط والأحكام</a>
              <a className="link" href="#">أسئلة شائعة</a>
            </div>
          </div>
          <div className="copy">
            <span>© 2026 SYS — نظام تصميم موحّد لكل مواقع SYS</span>
            <span>Foundations · Themes · Components — Cairo · RTL-native</span>
          </div>
        </div>
      </footer>

      <Toast toast={toast} />
    </div>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
