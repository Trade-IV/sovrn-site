"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";

/* ────────────────────────────────────────────────────────
   Types
   ──────────────────────────────────────────────────────── */

interface AuditResult {
  hoursSavedPerMonth: number;
  revenueRecoveredPerMonth: number;
  costSavedPerMonth: number;
  totalMonthlyImpact: number;
  annualImpact: number;
  summary: string;
  opportunities: string[];
  assumptions: string[];
}

type StepType = "text" | "select" | "number" | "currency";

interface Step {
  key: string;
  question: string;
  type: StepType;
  options?: string[];
  placeholder?: string;
  suffix?: string;
}

const STEPS: Step[] = [
  {
    key: "name",
    question: "What should I call you?",
    type: "text",
    placeholder: "Your first name",
  },
  {
    key: "businessType",
    question: "What type of business are you running?",
    type: "select",
    options: [
      "Home Services",
      "Dental / Medical",
      "Legal",
      "Real Estate",
      "Automotive",
      "Marketing Agency",
      "General Local Business",
      "Other",
    ],
  },
  {
    key: "monthlyLeads",
    question: "About how many inbound leads do you get per month?",
    type: "number",
    placeholder: "e.g. 120",
  },
  {
    key: "responseTime",
    question: "How quickly are leads usually contacted?",
    type: "select",
    options: [
      "Under 5 minutes",
      "5-15 minutes",
      "15-60 minutes",
      "1-4 hours",
      "Same day",
      "Next day or later",
    ],
  },
  {
    key: "followUpConsistency",
    question: "How consistent is your follow-up after the first contact attempt?",
    type: "select",
    options: [
      "Very consistent",
      "Somewhat consistent",
      "Inconsistent",
      "Mostly manual / reactive",
      "Almost none",
    ],
  },
  {
    key: "adminHoursPerWeek",
    question:
      "How many hours per week does your team spend on manual admin or follow-up work?",
    type: "number",
    placeholder: "e.g. 20",
  },
  {
    key: "missedCallsPerWeek",
    question: "How many inbound calls do you think you miss in a typical week?",
    type: "number",
    placeholder: "e.g. 8",
  },
  {
    key: "closeRate",
    question: "What percent of qualified leads typically become customers?",
    type: "number",
    placeholder: "e.g. 25",
    suffix: "%",
  },
  {
    key: "avgCustomerValue",
    question: "What is your average customer value or average job value in dollars?",
    type: "currency",
    placeholder: "e.g. 3000",
  },
  {
    key: "noShowFrequency",
    question:
      "How often do appointments no-show or fall through due to weak follow-up?",
    type: "select",
    options: ["Rarely", "Sometimes", "Often", "Very often"],
  },
  {
    key: "hasAutomation",
    question:
      "Do you have an automated system for reviews, reminders, and reactivation?",
    type: "select",
    options: ["Yes, fully automated", "Partially", "Mostly manual", "No"],
  },
];

/* ────────────────────────────────────────────────────────
   Main Component
   ──────────────────────────────────────────────────────── */

export default function AuditChatbot({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState<AuditResult | null>(null);
  const [computing, setComputing] = useState(false);
  const [error, setError] = useState("");

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when step changes
  useEffect(() => {
    if (scrollRef.current) {
      requestAnimationFrame(() => {
        scrollRef.current?.scrollTo({
          top: scrollRef.current.scrollHeight,
          behavior: "smooth",
        });
      });
    }
  }, [currentStep, result]);

  // Focus input on step change
  useEffect(() => {
    if (open && !result) {
      setTimeout(() => inputRef.current?.focus(), 350);
    }
  }, [currentStep, open, result]);

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const reset = () => {
    setCurrentStep(0);
    setAnswers({});
    setInputValue("");
    setResult(null);
    setComputing(false);
    setError("");
  };

  const handleClose = () => {
    onClose();
    setTimeout(reset, 400);
  };

  const step = STEPS[currentStep] as Step | undefined;
  const isLastStep = currentStep >= STEPS.length;

  /* ── Submit current answer ── */
  const submitAnswer = async (value: string) => {
    if (!step) return;
    const trimmed = value.trim();
    if (!trimmed) return;

    const updated = { ...answers, [step.key]: trimmed };
    setAnswers(updated);
    setInputValue("");

    if (currentStep < STEPS.length - 1) {
      setCurrentStep((s) => s + 1);
    } else {
      // Last question answered — compute
      setCurrentStep(STEPS.length);
      setComputing(true);
      setError("");

      try {
        const payload = {
          name: updated.name || "Friend",
          businessType: updated.businessType || "General Local Business",
          monthlyLeads: parseInt(updated.monthlyLeads || "0"),
          responseTime: updated.responseTime || "15-60 minutes",
          followUpConsistency:
            updated.followUpConsistency || "Inconsistent",
          adminHoursPerWeek: parseInt(updated.adminHoursPerWeek || "0"),
          missedCallsPerWeek: parseInt(updated.missedCallsPerWeek || "0"),
          closeRate: parseInt(updated.closeRate || "0"),
          avgCustomerValue: parseInt(
            (updated.avgCustomerValue || "0").replace(/[^0-9]/g, "")
          ),
          noShowFrequency: updated.noShowFrequency || "Sometimes",
          hasAutomation: updated.hasAutomation || "No",
        };

        const res = await fetch("/api/audit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!res.ok) throw new Error("Audit failed");
        const data: AuditResult = await res.json();
        setResult(data);
      } catch {
        setError("Something went wrong computing your audit. Please try again.");
      } finally {
        setComputing(false);
      }
    }
  };

  /* ── Select option handler ── */
  const selectOption = (option: string) => {
    submitAnswer(option);
  };

  /* ── Render conversation history ── */
  const renderHistory = () => {
    const items: React.ReactNode[] = [];

    for (let i = 0; i < Math.min(currentStep + 1, STEPS.length); i++) {
      const s = STEPS[i];

      // Bot question
      items.push(
        <motion.div
          key={`q-${i}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="flex gap-3"
        >
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/[0.08] text-[10px] font-bold tracking-wider text-zinc-400">
            S
          </div>
          <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-white/[0.06] px-4 py-3 text-[14px] leading-relaxed text-zinc-200">
            {i === 0 && answers.name
              ? s.question
              : i > 0 && answers.name
                ? s.question.replace("you", `you, ${answers.name},`)
                : s.question}
          </div>
        </motion.div>
      );

      // User answer (if answered)
      if (answers[s.key]) {
        items.push(
          <motion.div
            key={`a-${i}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="flex justify-end"
          >
            <div className="max-w-[75%] rounded-2xl rounded-tr-sm bg-white/[0.12] px-4 py-3 text-[14px] leading-relaxed text-white">
              {s.type === "currency" ? `$${parseInt(answers[s.key].replace(/[^0-9]/g, "")).toLocaleString()}` : s.suffix ? `${answers[s.key]}${s.suffix}` : answers[s.key]}
            </div>
          </motion.div>
        );
      }
    }

    return items;
  };

  /* ── Dollar format helper ── */
  const fmt = (n: number) => `$${n.toLocaleString()}`;

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="audit-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            key="audit-modal"
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 30 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[210] flex items-center justify-center p-4"
          >
            <div
              className="relative flex h-[min(92vh,740px)] w-full max-w-[520px] flex-col overflow-hidden rounded-[28px] border border-white/[0.08] bg-[#0a0a0a] shadow-[0_40px_160px_rgba(0,0,0,0.8)]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex shrink-0 items-center justify-between border-b border-white/[0.06] px-5 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/[0.08]">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-zinc-300"
                    >
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold tracking-wide text-zinc-100">
                      Run An Audit
                    </p>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                      SOVRN Strategic Assessment
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleClose}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white/[0.06] text-zinc-400 transition hover:bg-white/[0.12] hover:text-white"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              {/* Progress bar */}
              {!result && (
                <div className="shrink-0 px-5 pt-3">
                  <div className="flex items-center justify-between pb-2">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                      Progress
                    </span>
                    <span className="text-[10px] tabular-nums text-zinc-500">
                      {Math.min(currentStep, STEPS.length)} / {STEPS.length}
                    </span>
                  </div>
                  <div className="h-[3px] w-full overflow-hidden rounded-full bg-white/[0.06]">
                    <motion.div
                      className="h-full rounded-full bg-white/40"
                      initial={{ width: "0%" }}
                      animate={{
                        width: `${(Math.min(currentStep, STEPS.length) / STEPS.length) * 100}%`,
                      }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    />
                  </div>
                </div>
              )}

              {/* Chat body */}
              <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto px-5 py-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              >
                {/* Result screen */}
                {result ? (
                  <ResultScreen
                    result={result}
                    name={answers.name || "Friend"}
                    fmt={fmt}
                    onReset={() => {
                      reset();
                    }}
                    onClose={handleClose}
                  />
                ) : (
                  <div className="flex flex-col gap-4">
                    {/* Intro message */}
                    {currentStep === 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.15 }}
                        className="flex gap-3"
                      >
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/[0.08] text-[10px] font-bold tracking-wider text-zinc-400">
                          S
                        </div>
                        <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-white/[0.06] px-4 py-3 text-[14px] leading-relaxed text-zinc-300">
                          I&apos;m going to ask you a few quick questions about
                          your business. At the end, you&apos;ll get a
                          personalized estimate of how much time and revenue
                          SOVRN systems could recover for you.
                        </div>
                      </motion.div>
                    )}

                    {/* Conversation history */}
                    {renderHistory()}

                    {/* Computing spinner */}
                    {computing && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex gap-3"
                      >
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/[0.08] text-[10px] font-bold tracking-wider text-zinc-400">
                          S
                        </div>
                        <div className="flex items-center gap-2 rounded-2xl rounded-tl-sm bg-white/[0.06] px-4 py-3">
                          <div className="flex gap-1">
                            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-zinc-400" style={{ animationDelay: "0ms" }} />
                            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-zinc-400" style={{ animationDelay: "150ms" }} />
                            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-zinc-400" style={{ animationDelay: "300ms" }} />
                          </div>
                          <span className="text-[13px] text-zinc-400">
                            Computing your audit...
                          </span>
                        </div>
                      </motion.div>
                    )}

                    {/* Error */}
                    {error && (
                      <div className="rounded-xl bg-red-500/10 px-4 py-3 text-[13px] text-red-400">
                        {error}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Input area — only when chatting */}
              {!result && !computing && !isLastStep && step && (
                <div className="shrink-0 border-t border-white/[0.06] px-4 pb-4 pt-3">
                  {step.type === "select" ? (
                    <div className="flex flex-wrap gap-2">
                      {step.options?.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => selectOption(opt)}
                          className="rounded-full border border-white/[0.1] bg-white/[0.04] px-4 py-2.5 text-[13px] text-zinc-300 transition-all duration-200 hover:border-white/[0.25] hover:bg-white/[0.1] hover:text-white active:scale-[0.97]"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        submitAnswer(inputValue);
                      }}
                      className="flex gap-2"
                    >
                      <div className="relative flex-1">
                        {step.type === "currency" && (
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[14px] text-zinc-500">
                            $
                          </span>
                        )}
                        <input
                          ref={inputRef}
                          type={step.type === "text" ? "text" : "text"}
                          inputMode={
                            step.type === "number" || step.type === "currency"
                              ? "numeric"
                              : "text"
                          }
                          value={inputValue}
                          onChange={(e) => {
                            if (step.type === "number" || step.type === "currency") {
                              setInputValue(e.target.value.replace(/[^0-9]/g, ""));
                            } else {
                              setInputValue(e.target.value);
                            }
                          }}
                          placeholder={step.placeholder || "Type your answer..."}
                          className={`w-full rounded-2xl border border-white/[0.1] bg-white/[0.04] py-3 pr-4 text-[14px] text-white outline-none transition placeholder:text-zinc-600 focus:border-white/[0.2] ${step.type === "currency" ? "pl-8" : "pl-4"}`}
                        />
                        {step.suffix && inputValue && (
                          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[14px] text-zinc-500">
                            {step.suffix}
                          </span>
                        )}
                      </div>
                      <button
                        type="submit"
                        disabled={!inputValue.trim()}
                        className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-2xl bg-white/[0.08] text-zinc-300 transition hover:bg-white/[0.15] hover:text-white disabled:opacity-30"
                      >
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                      </button>
                    </form>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ────────────────────────────────────────────────────────
   Result Screen
   ──────────────────────────────────────────────────────── */

function ResultScreen({
  result,
  name,
  fmt,
  onReset,
  onClose,
}: {
  result: AuditResult;
  name: string;
  fmt: (n: number) => string;
  onReset: () => void;
  onClose: () => void;
}) {
  const stats = [
    { label: "Hours Saved / Month", value: `${result.hoursSavedPerMonth} hrs` },
    { label: "Revenue Recovered / Month", value: fmt(result.revenueRecoveredPerMonth) },
    { label: "Cost Saved / Month", value: fmt(result.costSavedPerMonth) },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col gap-6 pb-4"
    >
      {/* Hero number */}
      <div className="text-center">
        <p className="mb-2 text-[10px] uppercase tracking-[0.25em] text-zinc-500">
          Your Estimated Annual Impact
        </p>
        <motion.p
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl font-bold tracking-tight text-white sm:text-5xl"
        >
          {fmt(result.annualImpact)}
          <span className="text-lg text-zinc-500">/yr</span>
        </motion.p>
        <p className="mt-1 text-[13px] text-zinc-400">
          {fmt(result.totalMonthlyImpact)} per month
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-3 gap-2">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
            className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-3 text-center"
          >
            <p className="text-[16px] font-semibold text-white">{s.value}</p>
            <p className="mt-1 text-[9px] uppercase leading-tight tracking-[0.15em] text-zinc-500">
              {s.label}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Summary */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.5 }}
        className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-4"
      >
        <p className="mb-2 text-[10px] uppercase tracking-[0.2em] text-zinc-500">
          Summary
        </p>
        <p className="text-[13px] leading-6 text-zinc-300">{result.summary}</p>
      </motion.div>

      {/* Opportunities */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.6 }}
      >
        <p className="mb-3 text-[10px] uppercase tracking-[0.2em] text-zinc-500">
          Biggest Opportunities
        </p>
        <div className="space-y-2">
          {result.opportunities.map((opp, i) => (
            <div key={i} className="flex items-start gap-2.5">
              <div className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-white/50" />
              <p className="text-[13px] leading-5 text-zinc-300">{opp}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Assumptions */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.7 }}
      >
        <p className="mb-3 text-[10px] uppercase tracking-[0.2em] text-zinc-500">
          Assumptions
        </p>
        <div className="space-y-1.5">
          {result.assumptions.map((a, i) => (
            <p key={i} className="text-[11px] leading-4 text-zinc-500">
              {a}
            </p>
          ))}
        </div>
      </motion.div>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.8 }}
        className="flex flex-col gap-3 pt-2"
      >
        <a
          href="https://sovrnhq.com"
          onClick={(e) => {
            e.preventDefault();
            onClose();
            // Scroll to or open the "Request A Quote" card
            window.dispatchEvent(
              new CustomEvent("sovrn:open-quote")
            );
          }}
          className="flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-[12px] font-semibold uppercase tracking-[0.2em] text-black transition hover:opacity-90"
        >
          Book A Strategy Call
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </a>

        <button
          type="button"
          onClick={onReset}
          className="text-[11px] uppercase tracking-[0.2em] text-zinc-500 transition hover:text-zinc-300"
        >
          Run Another Audit
        </button>
      </motion.div>
    </motion.div>
  );
}
