"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  ChangeEvent,
  FormEvent,
} from "react";

const services = [
  "CRM Systems",
  "Lead-Gen",
  "Automation",
  "Request A Quote",
  "About Us",
];

const finalCardPositions = [
  { x: -260, y: 35, rotate: -16 },
  { x: -130, y: 16, rotate: -8 },
  { x: 0, y: 0, rotate: 0 },
  { x: 130, y: 16, rotate: 8 },
  { x: 260, y: 35, rotate: 16 },
];

const headlineText = "Have The Strongest Hand In The Market";

const serviceContent: Record<
  string,
  {
    eyebrow: string;
    title: string;
    description: string;
    bullets: string[];
  }
> = {
  "CRM Systems": {
    eyebrow: "Infrastructure",
    title: "CRM Systems Built For Control.",
    description:
      "Custom Operating Systems Designed To Give Your Team Full Visibility Across Leads, Follow-Up, Pipeline, Sales Activity, And Conversion Flow.",
    bullets: [
      "Pipeline Visibility Across Every Stage",
      "Lead Tracking With Clean Handoff Logic",
      "Follow-Up Systems That Reduce Leakage",
      "Dashboards Built Around Revenue Activity",
      "Custom Stages Built Around Your Actual Sales Cycle",
      "Automated Handoff Between Marketing And Sales Activity",
    ],
  },
  "Lead-Gen": {
    eyebrow: "Demand",
    title: "Lead Generation With Stronger Intent.",
    description:
      "We Design Acquisition Systems That Do More Than Collect Contacts.",
    bullets: [
      "Conversion-First Landing Flows",
      "Lead Capture Architecture That Reduces Drop-Off",
      "Higher-Quality Inbound Opportunities",
      "Campaign Structure Built For Scale",
      "Cleaner Qualification Before The Sales Conversation",
      "Better Flow From Click To Booked Appointment",
    ],
  },
  Automation: {
    eyebrow: "Execution",
    title: "Automation That Removes Friction.",
    description:
      "From Intake To Follow-Up To Internal Workflows, Automation Is Used To Eliminate Repetitive Work And Create A Tighter, Faster Operating Rhythm.",
    bullets: [
      "Automated Follow-Up And Response Flows",
      "Internal Workflow Simplification",
      "Reduced Admin Drag Across The Team",
      "Faster Movement From Inquiry To Action",
      "Less Manual Checking Between Tools And People",
      "Systems That Keep Moving Even After Hours",
    ],
  },
  "Request A Quote": {
    eyebrow: "Inquiry",
    title: "Request A Quote.",
    description:
      "Tell us about your business, what you need, and how to reach you. We’ll review the request and follow up with the right next step.",
    bullets: [
      "Business + Contact Info",
      "Service Interest Selection",
      "Project Scope / Notes",
      "Clean Submission Flow",
      "Direct Entry Into Internal Sheet",
      "Built For Fast Qualification",
    ],
  },
  "About Us": {
    eyebrow: "Identity",
    title: "A Brand Built Around Authority And Systems.",
    description:
      "SOVRN Is Positioned As A Premium Agency Focused On Control, Leverage, And Modern Operational Infrastructure For Serious Businesses.",
    bullets: [
      "Dark, Premium, Cinematic Brand Direction",
      "Built For Operators, Not Spectators",
      "Focused On Authority And Execution",
      "Designed To Feel Sharp, Deliberate, And Modern",
      "Aesthetic Aligned With Premium Digital Product Brands",
      "Built To Communicate Confidence Before A Word Is Spoken",
    ],
  },
};

export default function HomePage() {
  const [showCards, setShowCards] = useState(false);
  const [slideToLeft, setSlideToLeft] = useState(false);
  const [fanOpen, setFanOpen] = useState(false);
  const [showHeadline, setShowHeadline] = useState(false);
  const [typingDone, setTypingDone] = useState(false);
  const [headlineWidth, setHeadlineWidth] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const headlineMeasureRef = useRef<HTMLSpanElement | null>(null);

  const goHome = () => {
    setActiveCard(null);

    if (typeof window !== "undefined") {
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }
  };

  useLayoutEffect(() => {
    if (headlineMeasureRef.current) {
      setHeadlineWidth(headlineMeasureRef.current.offsetWidth);
    }
  }, []);

  useEffect(() => {
    const riseTimer = setTimeout(() => {
      setShowCards(true);
    }, 2200);

    const slideTimer = setTimeout(() => {
      setSlideToLeft(true);
    }, 3150);

    const fanTimer = setTimeout(() => {
      setFanOpen(true);
    }, 3900);

    const headlineTimer = setTimeout(() => {
      setShowHeadline(true);
    }, 4550);

    return () => {
      clearTimeout(riseTimer);
      clearTimeout(slideTimer);
      clearTimeout(fanTimer);
      clearTimeout(headlineTimer);
    };
  }, []);

  useEffect(() => {
    if (!showHeadline) return;

    setTypingDone(false);

    const doneTimer = setTimeout(() => {
      setTypingDone(true);
    }, 2100);

    return () => clearTimeout(doneTimer);
  }, [showHeadline]);

  useEffect(() => {
    if (activeCard !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [activeCard]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[650px] w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 blur-3xl md:h-[1000px] md:w-[1000px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.07),transparent_45%)]" />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,transparent_28%,rgba(0,0,0,0.82)_100%)]" />

      <span
        ref={headlineMeasureRef}
        className="invisible absolute left-0 top-0 whitespace-nowrap text-lg font-bold uppercase tracking-[0.18em] sm:text-xl md:text-2xl"
      >
        {headlineText}
      </span>

      <section className="relative z-20 flex min-h-screen flex-col px-4 pb-10 pt-8 md:hidden">
        <div className="flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.82 }}
            animate={{
              opacity: [0, 1, 1, 1],
              scale: [0.82, 1, 1.03, 1],
              y: showCards ? -8 : 0,
            }}
            transition={{
              duration: 2.3,
              times: [0, 0.25, 0.65, 1],
              ease: "easeInOut",
            }}
            className="relative"
          >
            <motion.div
              animate={{
                opacity: [0.18, 0.4, 0.18],
                scale: [1, 1.06, 1],
              }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-0 rounded-full bg-white/10 blur-3xl"
            />

            <HomeLogoLink
              onClick={goHome}
              className="relative z-20 block"
              imageClassName="h-auto w-[150px] select-none object-contain"
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: showCards ? -6 : 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease: "easeOut" }}
            className="-mt-4 text-center text-xl font-semibold tracking-[0.22em] text-zinc-100"
          >
            SOVRN
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: showCards ? -6 : 0 }}
            transition={{ duration: 0.9, delay: 0.55, ease: "easeOut" }}
            className="mt-1 text-center text-[8px] uppercase tracking-[0.2em] text-zinc-400"
          >
            Authority. Systems. Control.
          </motion.p>

          {showHeadline && (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="mt-8 max-w-[290px]"
            >
              <h2 className="text-center text-xs font-bold uppercase leading-6 tracking-[0.16em] text-zinc-100">
                Have The Strongest Hand In The Market
              </h2>
            </motion.div>
          )}
        </div>

        {showCards && (
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8"
          >
            <div className="flex gap-4 overflow-x-auto px-1 pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {services.map((service, index) => {
                const isAnotherCardOpen =
                  activeCard !== null && activeCard !== index;

                return (
                  <motion.button
                    key={service}
                    type="button"
                    whileTap={{ scale: 0.98 }}
                    animate={{
                      opacity: isAnotherCardOpen ? 0 : 1,
                      filter: isAnotherCardOpen ? "blur(6px)" : "blur(0px)",
                    }}
                    transition={{ duration: 0.25 }}
                    style={{
                      pointerEvents: activeCard !== null ? "none" : "auto",
                    }}
                    className="bg-transparent p-0"
                    onClick={() => setActiveCard(index)}
                  >
                    <CardFace label={service} isHovered={false} isMobile />
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </section>

      <motion.section
        animate={{
          y: showCards ? -270 : 0,
          scale: showCards ? 0.72 : 1,
        }}
        transition={{
          duration: 1.2,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative z-20 hidden min-h-screen items-center justify-center px-6 md:flex"
      >
        <div className="flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.82 }}
            animate={{
              opacity: [0, 1, 1, 1],
              scale: [0.82, 1, 1.035, 1],
            }}
            transition={{
              duration: 2.8,
              times: [0, 0.25, 0.65, 1],
              ease: "easeInOut",
            }}
            className="relative"
          >
            <motion.div
              animate={{
                opacity: [0.18, 0.4, 0.18],
                scale: [1, 1.06, 1],
              }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-0 rounded-full bg-white/10 blur-3xl"
            />

            <div className="relative flex items-center justify-center">
              <HomeLogoLink
                onClick={goHome}
                className="relative z-20 block"
                imageClassName="h-auto w-[500px] select-none object-contain sm:w-[650px] md:w-[800px] lg:w-[950px]"
              />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.45, ease: "easeOut" }}
            className="-mt-40 text-center text-3xl font-semibold tracking-[0.35em] text-zinc-100 sm:text-4xl md:text-5xl"
          >
            SOVRN
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7, ease: "easeOut" }}
            className="mt-0 text-center text-[10px] uppercase tracking-[0.32em] text-zinc-400 sm:text-xs"
          >
            Authority. Systems. Control.
          </motion.p>
        </div>
      </motion.section>

      <section className="pointer-events-none absolute inset-0 z-[25] hidden items-center justify-center px-6 md:flex">
        {showHeadline && (
          <motion.div
            initial={{ opacity: 0, y: -18 }}
            animate={{ opacity: 1, y: -50 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="max-w-4xl"
          >
            <div className="relative mx-auto flex justify-center">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: headlineWidth || "auto" }}
                transition={{
                  duration: 2.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative overflow-hidden whitespace-nowrap"
              >
                <h2 className="text-center text-lg font-bold uppercase tracking-[0.18em] text-zinc-100 sm:text-xl md:text-2xl">
                  {headlineText}
                </h2>

                <motion.span
                  animate={
                    typingDone
                      ? { opacity: 0, y: 12 }
                      : { opacity: [1, 0.25, 1], y: 0 }
                  }
                  transition={
                    typingDone
                      ? { duration: 0.4, ease: "easeOut" }
                      : { duration: 0.75, repeat: Infinity, ease: "linear" }
                  }
                  className="absolute right-0 top-1/2 h-[1.15em] w-[2px] -translate-y-1/2 bg-zinc-100"
                />
              </motion.div>
            </div>
          </motion.div>
        )}
      </section>

      <section className="absolute inset-0 z-30 hidden items-center justify-center px-6 md:flex">
        {showCards && (
          <div
            className="absolute flex items-center justify-center"
            onMouseLeave={() => setHoveredCard(null)}
          >
            {services.map((service, index) => {
              const card = finalCardPositions[index];
              const isHovered = hoveredCard === index;
              const isActive = activeCard === index;
              const isAnotherCardOpen =
                activeCard !== null && activeCard !== index;

              return (
                <motion.button
                  key={service}
                  type="button"
                  initial={{
                    x: 0,
                    y: 520,
                    rotate: 0,
                    opacity: 1,
                    scale: 0.98,
                  }}
                  animate={{
                    x: fanOpen ? card.x : slideToLeft ? finalCardPositions[0].x : 0,
                    y: fanOpen ? card.y + (isHovered ? 130 : 190) : 190,
                    rotate: fanOpen ? card.rotate : 0,
                    opacity: isAnotherCardOpen ? 0 : 1,
                    scale: isActive ? 1.02 : isHovered ? 1.04 : 1,
                    filter: isAnotherCardOpen ? "blur(6px)" : "blur(0px)",
                  }}
                  transition={{
                    duration: fanOpen ? 0.85 : slideToLeft ? 0.7 : 1.15,
                    delay: fanOpen ? index * 0.06 : 0,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{
                    zIndex: isHovered ? 50 : index + 1,
                    pointerEvents: activeCard !== null ? "none" : "auto",
                  }}
                  className="absolute cursor-pointer bg-transparent p-0 text-left outline-none"
                  onMouseEnter={() => setHoveredCard(index)}
                  onClick={() => setActiveCard(index)}
                  whileTap={{ scale: 0.98 }}
                >
                  <CardFace label={service} isHovered={isHovered} isMobile={false} />
                </motion.button>
              );
            })}
          </div>
        )}
      </section>

      <AnimatePresence>
        {activeCard !== null && (
          <ExpandedServicePanel
            index={activeCard}
            label={services[activeCard]}
            onClose={() => setActiveCard(null)}
            onHomeClick={goHome}
          />
        )}
      </AnimatePresence>
    </main>
  );
}

function HomeLogoLink({
  onClick,
  className,
  imageClassName,
}: {
  onClick?: () => void;
  className?: string;
  imageClassName?: string;
}) {
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label="Go To Homepage"
      className={`cursor-pointer bg-transparent p-0 outline-none transition hover:opacity-90 ${className ?? ""}`}
    >
      <Image
        src="/logo.png"
        alt="SOVRN Logo"
        width={1600}
        height={2200}
        priority
        className={imageClassName}
      />
    </Link>
  );
}

function CardFace({
  label,
  isHovered,
  isMobile,
}: {
  label: string;
  isHovered: boolean;
  isMobile: boolean;
}) {
  return (
    <motion.div
      animate={{
        boxShadow: isHovered
          ? "0 30px 120px rgba(255,255,255,0.18)"
          : "0 20px 80px rgba(255,255,255,0.08)",
        borderColor: isHovered
          ? "rgba(255,255,255,0.82)"
          : "rgba(255,255,255,0.72)",
      }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={`relative overflow-hidden rounded-[24px] border-[2px] bg-white ${
        isMobile ? "h-[230px] w-[155px] shrink-0" : "h-[300px] w-[200px] sm:h-[340px] sm:w-[220px]"
      }`}
    >
      <div className="absolute inset-[4px] rounded-[18px] bg-black sm:rounded-[20px]" />
      <div className="absolute inset-[4px] rounded-[18px] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_38%)] sm:rounded-[20px]" />
      <motion.div
        animate={{ opacity: isHovered ? 0.16 : 0.07 }}
        transition={{ duration: 0.25 }}
        className="absolute inset-[4px] rounded-[18px] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.18),transparent_58%)] sm:rounded-[20px]"
      />

      <div
        className={`absolute left-[2px] top-[2px] overflow-hidden ${
          isMobile ? "h-[68px] w-[68px]" : "h-[92px] w-[92px] sm:left-[3px] sm:top-[3px] sm:h-[110px] sm:w-[110px]"
        }`}
      >
        <Image
          src="/logo.png"
          alt="SOVRN Logo"
          width={220}
          height={280}
          className={`absolute h-auto object-contain ${
            isMobile
              ? "left-[-22px] top-[-5px] w-[102px]"
              : "left-[-30px] top-[-8px] w-[140px] sm:left-[-34px] sm:top-[-10px] sm:w-[165px]"
          }`}
        />
      </div>

      <div
        className={`absolute bottom-[2px] right-[2px] overflow-hidden ${
          isMobile ? "h-[68px] w-[68px]" : "h-[92px] w-[92px] sm:bottom-[3px] sm:right-[3px] sm:h-[110px] sm:w-[110px]"
        }`}
      >
        <Image
          src="/logo.png"
          alt="SOVRN Logo"
          width={220}
          height={280}
          className={`absolute h-auto rotate-180 object-contain ${
            isMobile
              ? "bottom-[-5px] right-[-22px] w-[102px]"
              : "bottom-[-8px] right-[-30px] w-[140px] sm:bottom-[-10px] sm:right-[-34px] sm:w-[165px]"
          }`}
        />
      </div>

      <div className="relative z-10 flex h-full items-center justify-center px-4 sm:px-8">
        <p className={`text-center font-medium tracking-[0.14em] text-zinc-100 ${isMobile ? "text-sm" : "text-lg sm:text-xl"}`}>
          {label}
        </p>
      </div>
    </motion.div>
  );
}

function ExpandedServicePanel({
  index,
  label,
  onClose,
  onHomeClick,
}: {
  index: number;
  label: string;
  onClose: () => void;
  onHomeClick: () => void;
}) {
  const card = finalCardPositions[index];
  const content = serviceContent[label];
  const isQuoteCard = label === "Request A Quote";

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="absolute inset-0 z-40 bg-black/72 backdrop-blur-[10px]"
        onClick={onClose}
      />

      <motion.section
        initial={{
          opacity: 0,
          scale: 0.24,
          x: card.x,
          y: card.y + 190,
          rotate: card.rotate,
          filter: "blur(8px)",
        }}
        animate={{
          opacity: 1,
          scale: 1,
          x: 0,
          y: 0,
          rotate: 0,
          filter: "blur(0px)",
        }}
        exit={{
          opacity: 0,
          scale: 0.5,
          y: 60,
          filter: "blur(8px)",
        }}
        transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="absolute inset-0 z-50 origin-center overflow-hidden"
      >
        <div className="relative h-screen w-full overflow-y-auto bg-black">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-[28%] h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-white/8 blur-3xl" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.10),transparent_32%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.84)_100%)]" />
          </div>

          <div className="relative z-10 min-h-screen">
            <div className="flex items-start justify-between px-4 pb-4 pt-3 sm:px-6 md:px-8 md:pt-4">
              <div className="flex items-start">
                <div className="relative -ml-6 -mt-6 h-[420px] w-[315px] sm:-ml-8 sm:-mt-8 sm:h-[520px] sm:w-[390px] md:h-[620px] md:w-[465px]">
                  <HomeLogoLink
                    onClick={onHomeClick}
                    className="relative z-20 block h-full w-full"
                    imageClassName="h-full w-full object-contain"
                  />
                </div>
              </div>

              <motion.button
                type="button"
                onClick={onClose}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="sticky top-4 z-20 rounded-full border border-white/15 bg-black/55 px-4 py-2 text-xs font-medium uppercase tracking-[0.22em] text-zinc-200 backdrop-blur-md transition hover:border-white/30 hover:bg-white/10"
              >
                Close
              </motion.button>
            </div>

            <div className="px-4 pb-16 pt-2 sm:px-8 md:px-12 md:pb-24">
              {isQuoteCard ? (
                <QuoteRequestForm />
              ) : (
                <div className="grid w-full gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, delay: 0.18, ease: "easeOut" }}
                    className="max-w-3xl"
                  >
                    <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.32em] text-zinc-500 sm:text-xs">
                      {content.eyebrow}
                    </p>

                    <h2 className="max-w-4xl text-3xl font-semibold leading-[1.02] tracking-[-0.04em] text-zinc-100 sm:text-5xl md:text-6xl lg:text-7xl">
                      {content.title}
                    </h2>

                    <p className="mt-6 max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base sm:leading-8">
                      {content.description}
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, delay: 0.28, ease: "easeOut" }}
                    className="flex items-start"
                  >
                    <div className="w-full rounded-[30px] border border-white/12 bg-white/[0.03] p-6 shadow-[0_20px_100px_rgba(255,255,255,0.06)] backdrop-blur-xl sm:p-8">
                      <p className="mb-6 text-[11px] uppercase tracking-[0.28em] text-zinc-500 sm:text-xs">
                        {label}
                      </p>

                      <div className="space-y-4">
                        {content.bullets.map((bullet) => (
                          <div
                            key={bullet}
                            className="flex items-start gap-3 border-b border-white/8 pb-4 last:border-b-0 last:pb-0"
                          >
                            <div className="mt-[7px] h-[6px] w-[6px] rounded-full bg-white/70" />
                            <p className="text-sm leading-7 text-zinc-300 sm:text-base">
                              {bullet}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.section>
    </>
  );
}

function QuoteRequestForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    businessName: "",
    email: "",
    phone: "",
    service: "",
    website: "",
    monthlyRevenue: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState<"idle" | "success" | "error">("idle");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitState("idle");

    try {
      const res = await fetch("/api/request-quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Submission failed");
      }

      setSubmitState("success");
      setFormData({
        firstName: "",
        lastName: "",
        businessName: "",
        email: "",
        phone: "",
        service: "",
        website: "",
        monthlyRevenue: "",
        message: "",
      });
    } catch (error) {
      console.error(error);
      setSubmitState("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-6xl">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.18, ease: "easeOut" }}
        className="mb-10 max-w-3xl"
      >
        <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.32em] text-zinc-500 sm:text-xs">
          Inquiry
        </p>

        <h2 className="max-w-4xl text-3xl font-semibold leading-[1.02] tracking-[-0.04em] text-zinc-100 sm:text-5xl md:text-6xl lg:text-7xl">
          Request A Quote.
        </h2>

        <p className="mt-6 max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base sm:leading-8">
          Tell us about your business, what you need, and the best way to reach you.
        </p>
      </motion.div>

      <motion.form
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.28, ease: "easeOut" }}
        onSubmit={handleSubmit}
        className="rounded-[30px] border border-white/12 bg-white/[0.03] p-6 shadow-[0_20px_100px_rgba(255,255,255,0.06)] backdrop-blur-xl sm:p-8"
      >
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-[11px] uppercase tracking-[0.22em] text-zinc-500">
              First Name
            </label>
            <input
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="w-full rounded-2xl border border-white/10 bg-black/50 px-4 py-3 text-sm text-white outline-none transition focus:border-white/30"
            />
          </div>

          <div>
            <label className="mb-2 block text-[11px] uppercase tracking-[0.22em] text-zinc-500">
              Last Name
            </label>
            <input
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="w-full rounded-2xl border border-white/10 bg-black/50 px-4 py-3 text-sm text-white outline-none transition focus:border-white/30"
            />
          </div>

          <div>
            <label className="mb-2 block text-[11px] uppercase tracking-[0.22em] text-zinc-500">
              Business Name
            </label>
            <input
              name="businessName"
              value={formData.businessName}
              onChange={handleChange}
              required
              className="w-full rounded-2xl border border-white/10 bg-black/50 px-4 py-3 text-sm text-white outline-none transition focus:border-white/30"
            />
          </div>

          <div>
            <label className="mb-2 block text-[11px] uppercase tracking-[0.22em] text-zinc-500">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full rounded-2xl border border-white/10 bg-black/50 px-4 py-3 text-sm text-white outline-none transition focus:border-white/30"
            />
          </div>

          <div>
            <label className="mb-2 block text-[11px] uppercase tracking-[0.22em] text-zinc-500">
              Phone
            </label>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full rounded-2xl border border-white/10 bg-black/50 px-4 py-3 text-sm text-white outline-none transition focus:border-white/30"
            />
          </div>

          <div>
            <label className="mb-2 block text-[11px] uppercase tracking-[0.22em] text-zinc-500">
              Service Needed
            </label>
            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
              required
              className="w-full rounded-2xl border border-white/10 bg-black/50 px-4 py-3 text-sm text-white outline-none transition focus:border-white/30"
            >
              <option value="">Select a service</option>
              <option value="CRM Systems">CRM Systems</option>
              <option value="Lead-Gen">Lead-Gen</option>
              <option value="Automation">Automation</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-[11px] uppercase tracking-[0.22em] text-zinc-500">
              Website
            </label>
            <input
              name="website"
              value={formData.website}
              onChange={handleChange}
              placeholder="https://"
              className="w-full rounded-2xl border border-white/10 bg-black/50 px-4 py-3 text-sm text-white outline-none transition focus:border-white/30"
            />
          </div>

          <div>
            <label className="mb-2 block text-[11px] uppercase tracking-[0.22em] text-zinc-500">
              Monthly Revenue
            </label>
            <input
              name="monthlyRevenue"
              value={formData.monthlyRevenue}
              onChange={handleChange}
              placeholder="$"
              className="w-full rounded-2xl border border-white/10 bg-black/50 px-4 py-3 text-sm text-white outline-none transition focus:border-white/30"
            />
          </div>
        </div>

        <div className="mt-5">
          <label className="mb-2 block text-[11px] uppercase tracking-[0.22em] text-zinc-500">
            Project Details
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={6}
            required
            className="w-full rounded-[24px] border border-white/10 bg-black/50 px-4 py-3 text-sm text-white outline-none transition focus:border-white/30"
            placeholder="Tell us what you need, what stage you're at, and what kind of outcome you're after."
          />
        </div>

        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-full border border-white/15 bg-white px-6 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-black transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>

          {submitState === "success" && (
            <p className="text-sm text-emerald-400">
              Quote request submitted successfully.
            </p>
          )}

          {submitState === "error" && (
            <p className="text-sm text-red-400">
              Something went wrong. Please try again.
            </p>
          )}
        </div>
      </motion.form>
    </div>
  );
}