"use client";

import React from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  PhoneCall,
  Calendar,
  Star,
  CheckCircle2,
  Loader2,
  X,
  Globe,
  ChevronDown,
  Check,
  Linkedin,
  Mail,
  Flame,
  Activity,
  Dumbbell,
} from "lucide-react";

// --------------------------------------------------
// Animation presets
// --------------------------------------------------
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 12, scale: 0.985 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.28, ease: "easeOut" } },
};

const section: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.06 } },
};

// --------------------------------------------------
// Content
// --------------------------------------------------
const LOGOS = ["Nike Training", "Adidas Runners", "Cult.fit", "HydroFuel", "Men's Health", "Under Armour"] as const;

type Icon = React.ComponentType<React.SVGProps<SVGSVGElement>>;
type SelectOption = { label: string; value: string };

const HIGHLIGHTS = [
  { title: "Hybrid strength", desc: "Push-pull splits with conditioning finishers for stamina.", Icon: Dumbbell },
  { title: "Performance cues", desc: "Form tweaks, tempo work, and joint-friendly regressions.", Icon: Activity },
  { title: "Recovery system", desc: "Mobility flows, sleep anchors, and simple fueling rules.", Icon: Flame },
];

const PACKAGES = [
  {
    title: "90-day build", price: "₹18,500", desc: "Strength + conditioning + nutrition guardrails. Weekly reviews.", tags: ["3-4 sessions", "Form checks", "Macros"],
  },
  {
    title: "Lean-up sprint", price: "₹12,000", desc: "8-week cut with protein-first meals and interval conditioning.", tags: ["8 weeks", "Intervals", "Steps"],
  },
  {
    title: "Form fix pack", price: "₹6,000", desc: "4 video form audits + cues + regressions so you lift pain-free.", tags: ["4 audits", "Video cues", "Mobility"],
  },
];

const PROCESS = [
  { step: "01", title: "Assess & goals", desc: "Movement screen + schedule + current lifts.", Icon: ShieldCheck },
  { step: "02", title: "Plan & fuel", desc: "Program + macros that fit your routine and taste.", Icon: Flame },
  { step: "03", title: "Train & review", desc: "Weekly form checks, load targets, and conditioning.", Icon: Dumbbell },
  { step: "04", title: "Re-test & progress", desc: "Metrics check; adjust volume, intensity, recovery.", Icon: Activity },
];

const TESTIMONIALS: Array<{ quote: string; name: string; role: string; avatar?: string }> = [
  {
    quote: "Dropped 7 kg without crash diets. Lifts are up and my knees feel better with his cues.",
    name: "Rohan Iyer",
    role: "Product lead · Bengaluru",
  },
  {
    quote: "Form checks and weekly targets kept me consistent. I can run 5K pain-free now.",
    name: "Akhil Sharma",
    role: "Consultant",
  },
  {
    quote: "From 0 pull-ups to 4 clean reps. Protein targets and steps were easy to follow.",
    name: "Neeraj Gupta",
    role: "Founder",
  },
];

const FAQ: Array<{ q: string; a: string }> = [
  { q: "Do I need a gym?", a: "No. I program for home, apartment gyms, or full setups. Equipment is optional." },
  { q: "How many sessions weekly?", a: "Typically 3–4 for strength + 1–2 conditioning. We match your schedule." },
  { q: "Do you give meal plans?", a: "You get macros, plate guides, and easy swaps. No crash diets or bland meals." },
  { q: "Are form checks included?", a: "Yes. Weekly video reviews with cues and regressions so you stay pain-free." },
];

// --------------------------------------------------
// Utility: non-native, accessible Select (no deps)
// --------------------------------------------------
function classNames(...xs: Array<string | false | undefined>) {
  return xs.filter(Boolean).join(" ");
}

function useOnClickOutside<T extends HTMLElement>(
  ref: React.RefObject<T | null> | React.MutableRefObject<T | null>,
  cb: () => void
) {
  React.useEffect(() => {
    function handler(e: MouseEvent) {
      const el = ref.current as T | null;
      if (!el) return;
      if (!el.contains(e.target as Node)) cb();
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [ref, cb]);
}

function Avatar({ src, name, size = 36 }: { src?: string; name: string; size?: number }) {
  const [broken, setBroken] = React.useState(false);
  if (src && !broken) {
    return (
      <Image
        src={src}
        alt={name}
        width={size}
        height={size}
        onError={() => setBroken(true)}
        className="h-9 w-9 rounded-full object-cover ring-2 ring-white/80"
      />
    );
  }
  return (
    <img
      src={`https://i.pravatar.cc/120?u=${encodeURIComponent(name)}`}
      alt={name}
      width={size}
      height={size}
      className="h-9 w-9 rounded-full object-cover ring-2 ring-white/80"
    />
  );
}

interface CustomSelectProps {
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  className?: string;
  hasError?: boolean;
}

function CustomSelect({ name, value, onChange, options, placeholder = "Select…", className, hasError }: CustomSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState<number>(() => Math.max(0, options.findIndex(o => o.value === value)));
  const btnRef = React.useRef<HTMLButtonElement>(null);
  const listRef = React.useRef<HTMLDivElement>(null);

  useOnClickOutside(listRef, () => setOpen(false));

  React.useEffect(() => {
    if (!open) return;
    const el = listRef.current?.querySelector<HTMLElement>(`[data-index='${active}']`);
    el?.focus();
  }, [open, active]);

  const selectAt = (idx: number) => {
    const opt = options[idx];
    if (!opt) return;
    onChange(opt.value);
    setActive(idx);
    setOpen(false);
    btnRef.current?.focus();
  };

  const label = options.find(o => o.value === value)?.label ?? "";

  return (
    <div className={classNames("relative", className)}>
      <button
        ref={btnRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`${name}-listbox`}
        onClick={() => setOpen(o => !o)}
        className={classNames(
          "w-full rounded-xl border bg-white/90 px-3 py-2 text-left focus:outline-none focus:ring-2 focus:ring-[#22C55E] focus:ring-offset-1",
          hasError ? "border-red-300" : "border-black/10"
        )}
      >
        <span className={classNames("block truncate", !label && "text-black/40")}>{label || placeholder}</span>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-black/50" />
      </button>

      {open && (
        <div
          ref={listRef}
          id={`${name}-listbox`}
          role="listbox"
          tabIndex={-1}
          className="absolute z-[70] mt-2 max-h-64 w-full overflow-auto rounded-xl border border-black/10 bg-white p-1 shadow-lg"
        >
          {options.map((opt, i) => {
            const selected = opt.value === value;
            return (
              <button
                type="button"
                role="option"
                aria-selected={selected}
                data-index={i}
                key={opt.value}
                onClick={() => selectAt(i)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") { e.preventDefault(); selectAt(i); }
                  if (e.key === "Escape") { e.preventDefault(); setOpen(false); btnRef.current?.focus(); }
                  if (e.key === "ArrowDown") { e.preventDefault(); setActive(a => Math.min(options.length - 1, a + 1)); }
                  if (e.key === "ArrowUp") { e.preventDefault(); setActive(a => Math.max(0, a - 1)); }
                }}
                className={classNames(
                  "flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-left text-sm",
                  selected ? "bg-accent/10" : "hover:bg-black/5 focus:bg-black/5"
                )}
              >
                <span className="truncate">{opt.label}</span>
                {selected && <Check className="h-4 w-4 text-accent" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

// Booking utilities
const WORK_START_HOUR = 9;
const WORK_END_HOUR = 18;
const TIME_STEP_MIN = 30;

function pad(n: number) { return String(n).padStart(2, "0"); }
function formatTimeLabel(h: number, m: number) {
  const am = h < 12;
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${pad(m)} ${am ? "AM" : "PM"}`;
}
function generateTimeSlots(): SelectOption[] {
  const out: SelectOption[] = [];
  for (let h = WORK_START_HOUR; h < WORK_END_HOUR; h++) {
    for (let m = 0; m < 60; m += TIME_STEP_MIN) {
      const label = formatTimeLabel(h, m);
      const value = `${pad(h)}:${pad(m)}`;
      out.push({ label, value });
    }
  }
  return out;
}
const TIME_OPTIONS = generateTimeSlots();
function todayLocalISO() {
  const d = new Date();
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}
function nextSlotValueNow(): string | null {
  const now = new Date();
  let h = now.getHours();
  let m = now.getMinutes();
  if (h >= WORK_END_HOUR) return null;
  if (h < WORK_START_HOUR) return `${pad(WORK_START_HOUR)}:00`;
  const rem = m % TIME_STEP_MIN;
  if (rem > 0) m = m + (TIME_STEP_MIN - rem);
  if (m === 60) { h += 1; m = 0; }
  if (h >= WORK_END_HOUR) return null;
  return `${pad(h)}:${pad(m)}`;
}
function filteredTimesForDate(dateStr: string): SelectOption[] {
  if (!dateStr) return TIME_OPTIONS;
  if (dateStr !== todayLocalISO()) return TIME_OPTIONS;
  const min = nextSlotValueNow();
  if (!min) return [];
  return TIME_OPTIONS.filter(o => o.value >= min);
}

const TIMEZONE_OPTIONS: SelectOption[] = [
  { value: "Asia/Kolkata", label: "Asia/Kolkata (IST)" },
  { value: "America/New_York", label: "America/New_York (ET)" },
  { value: "America/Los_Angeles", label: "America/Los_Angeles (PT)" },
  { value: "Europe/London", label: "Europe/London (UK)" },
  { value: "Europe/Paris", label: "Europe/Paris (CET)" },
  { value: "Asia/Singapore", label: "Asia/Singapore (SGT)" },
  { value: "Australia/Sydney", label: "Australia/Sydney (AET)" },
  { value: "UTC", label: "UTC" },
];

const DURATION_OPTIONS: SelectOption[] = [
  { value: "30", label: "30 minutes" },
  { value: "45", label: "45 minutes" },
  { value: "60", label: "60 minutes" },
];

// --------------------------------------------------
// Page
// --------------------------------------------------
export default function Page() {
  const validateEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  const [isModalOpen, setModalOpen] = React.useState(false);
  const [booking, setBooking] = React.useState({
    name: "",
    email: "",
    timezone: "",
    date: "",
    time: "",
    duration: "30",
    notes: "",
  });
  const [bookingStatus, setBookingStatus] = React.useState<"idle" | "submitting" | "success" | "error">("idle");
  const [bookingError, setBookingError] = React.useState("");
  const modalRef = React.useRef<HTMLDivElement>(null);

  const openModal = () => {
    setBookingStatus("idle");
    setBookingError("");
    setModalOpen(true);
  };
  const closeModal = () => setModalOpen(false);

  const onBookingChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setBooking((b) => ({ ...b, [name]: value }));
  };

  const timeOptions = React.useMemo(() => filteredTimesForDate(booking.date), [booking.date]);

  React.useEffect(() => {
    if (!booking.time) return;
    if (!timeOptions.find(o => o.value === booking.time)) {
      setBooking(b => ({ ...b, time: "" }));
    }
  }, [booking.date]);

  async function handleBooking(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBookingError("");

    const okName = booking.name.trim().length >= 2;
    const okEmail = validateEmail(booking.email);
    const okTZ = booking.timezone.trim().length > 0;
    const okDate = !!booking.date;
    const okTime = !!booking.time;

    if (!(okName && okEmail && okTZ && okDate && okTime)) {
      setBookingStatus("error");
      setBookingError(
        !okName
          ? "Please enter your full name."
          : !okEmail
          ? "Please enter a valid email."
          : !okTZ
          ? "Please select your time zone."
          : !okDate
          ? "Choose a date."
          : "Choose a time within working hours."
      );
      return;
    }

    const [hh, mm] = booking.time.split(":").map(Number);
    const withinHours = hh >= WORK_START_HOUR && (hh < WORK_END_HOUR || (hh === WORK_END_HOUR && mm === 0));
    if (!withinHours) {
      setBookingStatus("error");
      setBookingError("Please choose a time between 9:00 and 18:00.");
      return;
    }
    if (booking.date === todayLocalISO()) {
      const min = nextSlotValueNow();
      if (!min || booking.time < min) {
        setBookingStatus("error");
        setBookingError("That time today has already passed. Pick a later slot or another day.");
        return;
      }
    }

    if (booking.date === todayLocalISO() && timeOptions.length === 0) {
      setBookingStatus("error");
      setBookingError("No remaining slots today. Please pick another date.");
      return;
    }

    setBookingStatus("submitting");
    await new Promise((r) => setTimeout(r, 1000));
    setBookingStatus("success");
  }

  React.useEffect(() => {
    if (!isModalOpen) return;
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
      if (e.key === "Tab" && modalRef.current) {
        const focusables = modalRef.current.querySelectorAll<HTMLElement>(
          "a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex='-1'])"
        );
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    setTimeout(() => {
      modalRef.current?.querySelector<HTMLElement>("input, [role='listbox'], textarea, button")?.focus();
    }, 0);

    return () => {
      document.documentElement.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [isModalOpen]);

  return (
    <main className="relative">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0b0f14]/80 backdrop-blur supports-[backdrop-filter]:bg-[#0b0f14]/70">
        <div className="container mx-auto flex h-14 items-center justify-between px-6">
          <a href="#" className="inline-flex items-center gap-2 font-semibold">
            <Sparkles className="h-4 w-4 text-accent" />
            <span>Pankaj Patel</span>
          </a>
          <nav className="hidden items-center gap-6 text-sm text-slate-200 sm:flex">
            <a href="#work" className="hover:text-white">Results</a>
            <a href="#packages" className="hover:text-white">Programs</a>
            <a href="#how" className="hover:text-white">Method</a>
            <a href="#faq" className="hover:text-white">FAQ</a>
            <button type="button" onClick={openModal} className="btn-primary">Book a call</button>
          </nav>
          <button type="button" onClick={openModal} className="btn-ghost px-3 py-1 sm:hidden">Book</button>
        </div>
      </header>

      {/* HERO */}
      <section className="container mx-auto px-6 py-16 lg:py-24">
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          <motion.div variants={section} initial="hidden" animate="show" className="text-center lg:text-left lg:max-w-2xl">
            <motion.span variants={fadeInUp} className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-[#a3e635]">
              <Sparkles className="h-3.5 w-3.5 text-accent" /> 24 · Pankaj Patel · Fitness Coach · India
            </motion.span>
            <motion.h1 variants={fadeInUp} className="mx-auto lg:mx-0 mt-3 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
              Stronger, leaner, and faster—without guessing every week.
            </motion.h1>
            <motion.p variants={fadeInUp} className="mx-auto lg:mx-0 mt-3 max-w-2xl text-slate-300">
              Programs built for Indian routines: strength + conditioning, protein-first meals, and weekly feedback that keeps you progressing—whether you train at home or in the gym.
            </motion.p>
            <motion.ul variants={fadeInUp} className="mx-auto lg:mx-0 mt-4 grid gap-2 text-left text-sm text-slate-300 max-w-2xl">
              <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 text-accent" /> Structured push–pull–legs + conditioning finishers matched to your schedule.</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 text-accent" /> Form cues and regressions so joints stay happy and progress keeps climbing.</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 text-accent" /> Protein-first plates, steps, and sleep anchors—simple, sustainable habits.</li>
            </motion.ul>

            <motion.div variants={fadeInUp} className="mt-6 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
              <button type="button" onClick={openModal} className="btn-primary h-12 px-5 shadow-lg shadow-emerald-200/50">
                Book a call <ArrowRight className="h-4 w-4" />
              </button>
              <a href="#packages" className="btn-ghost h-12 px-5 shadow-sm shadow-emerald-100/40">View programs</a>
            </motion.div>

            <motion.div variants={fadeInUp} className="mt-7 grid gap-4 sm:grid-cols-3">
              {[{ label: "Sessions", value: "4x / week" }, { label: "Check-ins", value: "Weekly + DM" }, { label: "Focus", value: "Strength + Conditioning" }].map((item) => (
                <div
                  key={item.label}
                  className="card relative flex min-h-[150px] flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 text-left shadow-[0_12px_38px_-18px_rgba(34,197,94,0.35)]"
                >
                  <div className="text-[11px] uppercase tracking-[0.2em] text-emerald-100/80">{item.label}</div>
                  <div className="mt-1 text-xl font-semibold text-white">{item.value}</div>
                  <div className="mt-3 h-1 rounded-full bg-gradient-to-r from-emerald-200 via-emerald-400 to-emerald-500" />
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-200/60 to-transparent" aria-hidden />
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div variants={fadeInUp} className="mx-auto w-full max-w-2xl self-start">
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0f1622]/80 p-4 shadow-sm backdrop-blur-sm">
              <div className="absolute inset-0 bg-[radial-gradient(420px_260px_at_50%_0%,rgba(34,197,94,0.12),transparent_65%)]" aria-hidden />
              <div className="relative flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900">
                <Image
                  src="/coach/coach_pankaj.jpg"
                  alt="Pankaj Patel — fitness coach"
                  width={960}
                  height={1200}
                  priority
                  className="h-auto w-full max-h-[720px] object-cover saturate-110 brightness-[1.05]"
                  sizes="(min-width: 1024px) 620px, 92vw"
                />
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background: "linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.45) 55%, rgba(0,0,0,0.6) 100%)",
                  }}
                  aria-hidden
                />

                <div className="absolute left-4 top-4 rounded-xl bg-white/90 p-3 text-sm shadow-lg ring-1 ring-black/30 backdrop-blur-sm">
                  <div className="flex items-center justify-between text-xs text-slate-600">
                    <span className="font-medium text-slate-900">Today’s block</span>
                    <Sparkles className="h-3.5 w-3.5 text-accent" />
                  </div>
                  <div className="mt-2 space-y-1 text-xs text-slate-600">
                    <div className="flex items-center gap-2"><Dumbbell className="h-3.5 w-3.5 text-accent" /> Push: bench + rows</div>
                    <div className="flex items-center gap-2"><Flame className="h-3.5 w-3.5 text-accent" /> Finisher: 10-min EMOM</div>
                    <div className="flex items-center gap-2"><Calendar className="h-3.5 w-3.5 text-accent" /> Protein target: 160g</div>
                  </div>
                </div>

                <div className="absolute bottom-4 right-4 rounded-xl bg-white/90 p-3 text-sm shadow-lg ring-1 ring-white/30 backdrop-blur-sm">
                  <div className="text-[11px] uppercase tracking-[0.08em] text-slate-700">Next slot</div>
                  <div className="mt-1 flex items-center gap-2 text-slate-900">
                    <PhoneCall className="h-4 w-4 text-accent" /> Thu · 7:00 AM · Push + intervals
                  </div>
                  <div className="mt-1 text-xs text-slate-600">Mobility + tempo bench + row ladder</div>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap items-center justify-between gap-2 px-1.5 text-xs text-slate-400">
                <div className="inline-flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-accent" /> 200+ clients trained
                </div>
                <div className="inline-flex items-center gap-2">
                  <Calendar className="h-3.5 w-3.5 text-accent" /> Weekly form checks
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* LOGOS */}
      <section className="container mx-auto px-6 py-12" id="work">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs font-medium text-slate-300">
          {LOGOS.map((name) => (
            <span key={name} className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1">
              <ShieldCheck className="h-3.5 w-3.5 text-accent" /> {name}
            </span>
          ))}
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section className="container mx-auto px-6 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-semibold">Programs tailored to your day</h2>
          <p className="mx-auto mt-2 max-w-2xl text-slate-300">Strength, conditioning, and recovery built around your schedule and equipment.</p>
        </div>
        <motion.ul variants={section} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }} className="mt-6 grid gap-4 sm:grid-cols-3">
          {HIGHLIGHTS.map(({ title, desc, Icon }) => (
            <motion.li key={title} variants={fadeInUp} className="card p-5">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 rounded-lg bg-accent/10 p-2 text-accent">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold">{title}</h3>
                  <p className="mt-1 text-sm text-slate-300">{desc}</p>
                </div>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </section>

      {/* PACKAGES */}
      <section id="packages" className="container mx-auto px-6 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-semibold">Pick a program or build your own</h2>
          <p className="mx-auto mt-2 max-w-2xl text-slate-300">Clear inclusions, weekly reviews, and simple habits that fit your life.</p>
        </div>
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {PACKAGES.map((p) => (
            <div key={p.title} className="card flex flex-col gap-3 p-5 shadow-[0_16px_48px_-20px_rgba(34,197,94,0.35)]">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">{p.title}</h3>
                <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-emerald-200">{p.price}</span>
              </div>
              <p className="text-sm text-slate-300">{p.desc}</p>
              <div className="flex flex-wrap gap-2 text-xs text-emerald-200">
                {p.tags.map((t) => (
                  <span key={t} className="rounded-full bg-white/5 px-3 py-1 ring-1 ring-white/15">{t}</span>
                ))}
              </div>
              <button onClick={openModal} className="btn-ghost mt-2 w-full justify-center">Book this</button>
            </div>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section id="how" className="container mx-auto px-6 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-semibold">How we flow</h2>
          <p className="mx-auto mt-2 max-w-2xl text-slate-300">A simple loop from assessment to measurable progress.</p>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS.map(({ step, title, desc, Icon }) => (
            <div key={step} className="card p-5">
              <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-accent/10 text-[#7A143C]">{step}</span>
                <Icon className="h-4 w-4 text-accent" />
              </div>
              <h3 className="mt-2 text-sm font-semibold">{title}</h3>
              <p className="mt-1 text-sm text-slate-300">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="container mx-auto px-6 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-semibold">Client love</h2>
          <p className="mx-auto mt-2 max-w-2xl text-slate-300">Notes from people who trained, leaned out, and stayed consistent.</p>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <blockquote key={i} className="card p-5 bg-slate-900/85 text-slate-100 border-white/10">
              <div className="flex items-center gap-3">
                <Avatar src={t.avatar} name={t.name} />
                <div>
                  <div className="text-sm font-medium text-slate-50">{t.name}</div>
                  <div className="text-xs text-slate-300">{t.role}</div>
                </div>
              </div>
              <p className="mt-3 text-[15px] leading-7 text-slate-100">“{t.quote}”</p>
              <div className="mt-2 flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, s) => (
                  <Star key={s} className="h-3.5 w-3.5 fill-current" />
                ))}
              </div>
            </blockquote>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="container mx-auto px-6 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-semibold">FAQ</h2>
          <p className="mx-auto mt-2 max-w-2xl text-slate-300">Quick answers so you know how we’ll train together.</p>
        </div>
        <div className="mx-auto mt-6 max-w-3xl space-y-3">
          {FAQ.map((item, i) => (
            <details key={i} className="group rounded-xl border border-white/10 bg-slate-900/80 p-4 backdrop-blur-sm text-slate-100">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-semibold">
                <span>{item.q}</span>
                <span className="text-slate-400 group-open:hidden">+</span>
                <span className="text-slate-400 hidden group-open:inline">−</span>
              </summary>
              <p className="mt-2 text-sm text-slate-300">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* FINAL CTA / CONTACT */}
      <section id="contact" className="container mx-auto px-6 py-16">
        <div className="mx-auto max-w-3xl rounded-2xl border border-white/10 bg-slate-900/85 p-6 backdrop-blur-sm text-slate-100">
          <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
            <div>
              <h2 className="text-2xl font-semibold">Book your slot</h2>
              <p className="mt-1 text-sm text-slate-300">Share your goal, schedule, and equipment. I’ll confirm availability and next steps.</p>
            </div>
            <button type="button" onClick={openModal} className="btn-primary w-full justify-center sm:w-auto">
              <PhoneCall className="h-4 w-4" /> Book now
            </button>
          </div>
        </div>
      </section>

      {isModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
          aria-hidden={!isModalOpen}
        >
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="w-full max-w-lg rounded-2xl border border-white/10 bg-slate-900 p-6 text-slate-100 shadow-xl backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-labelledby="book-title"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 id="book-title" className="text-lg font-semibold">Book a call with Pankaj Patel</h3>
                <p className="mt-1 text-sm text-slate-300">Pick a time that works. I’ll send a calendar invite with a video link. (Demo flow)</p>
              </div>
              <button type="button" onClick={closeModal} className="btn-ghost px-2 py-1" aria-label="Close">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form className="mt-4 grid gap-3 sm:grid-cols-2" onSubmit={handleBooking} noValidate>
              {bookingStatus === "error" && (
                <div className="sm:col-span-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{bookingError}</div>
              )}

              <label className="text-sm">
                <span className="font-medium">Name</span>
                <input
                  name="name"
                  value={booking.name}
                  onChange={onBookingChange}
                  required
                  className={`mt-1 w-full rounded-xl border px-3 py-2 bg-white/95 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#22C55E] focus:ring-offset-1 ${
                    bookingStatus === "error" && booking.name.trim().length < 2 ? "border-red-300" : "border-white/20"
                  }`}
                  placeholder="Your name"
                />
              </label>

              <label className="text-sm">
                <span className="font-medium">Email</span>
                <input
                  type="email"
                  name="email"
                  value={booking.email}
                  onChange={onBookingChange}
                  required
                  className={`mt-1 w-full rounded-xl border px-3 py-2 bg-white/95 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#22C55E] focus:ring-offset-1 ${
                    bookingStatus === "error" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(booking.email) ? "border-red-300" : "border-white/20"
                  }`}
                  placeholder="you@example.com"
                />
              </label>

              <div className="sm:col-span-2 grid gap-3 sm:grid-cols-2">
                <label className="text-sm">
                  <span className="font-medium">Time zone</span>
                  <CustomSelect
                    name="timezone"
                    value={booking.timezone}
                    onChange={(v) => setBooking(b => ({ ...b, timezone: v }))}
                    options={TIMEZONE_OPTIONS}
                    placeholder="Select…"
                    hasError={bookingStatus === "error" && !booking.timezone}
                    className="mt-1"
                  />
                </label>

                <label className="text-sm">
                  <span className="font-medium">Date</span>
                  <input
                    type="date"
                    name="date"
                    value={booking.date}
                    min={todayLocalISO()}
                    onChange={onBookingChange}
                    required
                    className={`mt-1 w-full rounded-xl border px-3 py-2 bg-white/95 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#22C55E] focus:ring-offset-1 ${
                      bookingStatus === "error" && !booking.date ? "border-red-300" : "border-white/20"
                    }`}
                  />
                </label>
              </div>

              <div className="sm:col-span-2 grid gap-3 sm:grid-cols-2">
                <label className="text-sm">
                  <span className="font-medium">Time</span>
                  <CustomSelect
                    name="time"
                    value={booking.time}
                    onChange={(v) => setBooking(b => ({ ...b, time: v }))}
                    options={timeOptions}
                    placeholder="Select a slot (09:00–18:00)"
                    hasError={bookingStatus === "error" && !booking.time}
                    className="mt-1"
                  />
                  {booking.date === todayLocalISO() && (
                    <p className="mt-1 text-xs text-slate-400">
                      {timeOptions.length > 0 ? "Showing only remaining slots for today." : "No remaining slots today — please pick another date."}
                    </p>
                  )}
                </label>

                <label className="text-sm">
                  <span className="font-medium">Duration</span>
                  <CustomSelect
                    name="duration"
                    value={booking.duration}
                    onChange={(v) => setBooking(b => ({ ...b, duration: v }))}
                    options={DURATION_OPTIONS}
                    className="mt-1"
                  />
                </label>
              </div>

              <label className="sm:col-span-2 text-sm">
                <span className="font-medium">Notes (optional)</span>
                <textarea
                  name="notes"
                  value={booking.notes}
                  onChange={onBookingChange}
                  rows={3}
                  className="mt-1 w-full rounded-xl border border-white/20 bg-white/95 text-slate-900 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#22C55E] focus:ring-offset-1"
                  placeholder="Share your goals, current routine, and any injuries."
                />
              </label>

              <div className="sm:col-span-2 mt-2 flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-center sm:text-left text-xs text-slate-400"><Globe className="mr-1 inline h-3.5 w-3.5 text-accent" />Times are interpreted in your selected time zone.</p>
                <button
                  className="btn-primary inline-flex w-full items-center justify-center whitespace-nowrap sm:w-auto"
                  disabled={bookingStatus === "submitting"}
                >
                  {bookingStatus === "submitting" ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Booking…
                    </>
                  ) : (
                    <>
                      Book call <Calendar className="ml-2 h-4 w-4" />
                    </>
                  )}
                </button>
              </div>

              <p className="sr-only" aria-live="polite">
                {bookingStatus === "submitting" ? "Booking…" : bookingStatus === "error" ? bookingError : ""}
              </p>
            </form>
          </motion.div>
        </motion.div>
      )}

      <footer className="mt-16 border-t border-white/10 bg-[#0b0f14]/80 backdrop-blur">
        <div className="container mx-auto grid justify-items-center text-center gap-8 px-6 py-10 sm:grid-cols-3 sm:justify-items-start sm:text-left">
          <div>
            <div className="inline-flex items-center gap-2 font-semibold"><Sparkles className="h-4 w-4 text-accent" /> Pankaj Patel</div>
            <p className="mt-2 max-w-xs text-sm text-slate-300">Strength & conditioning coach helping you build muscle, stay lean, and move pain-free.</p>
          </div>
          <div className="text-sm">
            <div className="font-semibold text-white">Navigate</div>
            <ul className="mt-2 space-y-2 text-slate-300">
              <li><a className="hover:text-white" href="#work">Results</a></li>
              <li><a className="hover:text-white" href="#packages">Programs</a></li>
              <li><a className="hover:text-white" href="#faq">FAQ</a></li>
              <li><button className="hover:text-white" onClick={openModal}>Book a call</button></li>
            </ul>
          </div>
          <div className="text-sm">
            <div className="font-semibold text-white">Connect</div>
            <ul className="mt-2 flex justify-center sm:justify-start gap-3 text-slate-300">
              <li><a href="#" aria-label="LinkedIn" className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/10 hover:bg-black/5"><Linkedin className="h-4 w-4" /></a></li>
              <li><a href="#" aria-label="Email" className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/10 hover:bg-black/5"><Mail className="h-4 w-4" /></a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 py-4 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} Pankaj Patel. All rights reserved.
        </div>
      </footer>
    </main>
  );
}
