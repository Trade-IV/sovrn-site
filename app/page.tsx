"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

const services = [
  "CRM Systems",
  "Lead-Gen",
  "Automation",
  "Pricing",
  "About Us",
];

const desktopCardPositions = [
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
  Pricing: {
    eyebrow: "Engagement",
    title: "Pricing Structured Around Real Outcomes.",
    description:
      "Pricing Should Reflect The Depth Of The System Being Built. This Section Can Later Evolve Into Your Actual Offer Ladder, Scope Structure, Or Engagement Model.",
    bullets: [
      "Retainers, Builds, Or Hybrid Structures",
      "Clear Scope Tied To Business Priorities",
      "Premium Positioning Without Clutter",
      "Room For Custom Engagement Logic Later",
      "Expandable Framework For Multiple Service Tiers",
      "Built To Support Premium Perception And Clarity",
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
  const [isMobile, setIsMobile] = useState(false);

  const headlineMeasureRef = useRef<HTMLSpanElement | null>(null);

  useLayoutEffect(() => {
    if (headlineMeasureRef.current) {
      setHeadlineWidth(headlineMeasureRef.current.offsetWidth);
    }
  }, []);

  useEffect(() => {
    const updateViewport = () => {
      setIsMobile(window.innerWidth < 768);
    };

    updateViewport();
    window.addEventListener("resize", updateViewport);

    return () => window.removeEventListener("resize", updateViewport);
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
        <div className="absolute left-1/2 top-1/2 h-[650px] w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 blur-3xl sm:h-[1000px] sm:w-[1000px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.07),transparent_45%)]" />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,transparent_28%,rgba(0,0,0,0.82)_100%)]" />

      {!isMobile && (
        <span
          ref={headlineMeasureRef}
          className="invisible absolute left-0 top-0 whitespace-nowrap text-lg font-bold uppercase tracking-[0.18em] sm:text-xl md:text-2xl"
        >
          {headlineText}
        </span>
      )}

      {isMobile ? (
        <MobileLanding
          showCards={showCards}
          showHeadline={showHeadline}
          services={services}
          activeCard={activeCard}
          setActiveCard={setActiveCard}
        />
      ) : (
        <>
          <motion.section
            animate={{
              y: showCards ? -270 : 0,
              scale: showCards ? 0.72 : 1,
            }}
            transition={{
              duration: 1.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative z-20 flex min-h-screen items-center justify-center px-6"
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
                  <Image
                    src="/logo.png"
                    alt="SOVRN Logo"
                    width={1600}
                    height={2200}
                    priority
                    className="h-auto w-[500px] select-none object-contain sm:w-[650px] md:w-[800px] lg:w-[950px]"
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

          <section className="pointer-events-none absolute inset-0 z-[25] flex items-center justify-center px-6">
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

          <section className="absolute inset-0 z-30 flex items-center justify-center px-6">
            {showCards && (
              <div
                className="absolute flex items-center justify-center"
                onMouseLeave={() => setHoveredCard(null)}
              >
                {services.map((service, index) => {
                  const card = desktopCardPositions[index];
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
                        x: fanOpen
                          ? card.x
                          : slideToLeft
                            ? desktopCardPositions[0].x
                            : 0,
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
        </>
      )}

      <AnimatePresence>
        {activeCard !== null && (
          <ExpandedServicePanel
            index={activeCard}
            label={services[activeCard]}
            onClose={() => setActiveCard(null)}
            isMobile={isMobile}
          />
        )}
      </AnimatePresence>
    </main>
  );
}

function MobileLanding({
  showCards,
  showHeadline,
  services,
  activeCard,
  setActiveCard,
}: {
  showCards: boolean;
  showHeadline: boolean;
  services: string[];
  activeCard: number | null;
  setActiveCard: (value: number | null) => void;
}) {
  return (
    <>
      <motion.section
        animate={{
          y: showCards ? -40 : 0,
          scale: showCards ? 0.96 : 1,
        }}
        transition={{
          duration: 1.1,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative z-20 flex min-h-screen flex-col items-center px-4 pt-10"
      >
        <div className="flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.82 }}
            animate={{
              opacity: [0, 1, 1, 1],
              scale: [0.82, 1, 1.03, 1],
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

            <Image
              src="/logo.png"
              alt="SOVRN Logo"
              width={1600}
              height={2200}
              priority
              className="h-auto w-[190px] select-none object-contain"
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.45, ease: "easeOut" }}
            className="-mt-8 text-center text-2xl font-semibold tracking-[0.24em] text-zinc-100"
          >
            SOVRN
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7, ease: "easeOut" }}
            className="mt-1 text-center text-[9px] uppercase tracking-[0.22em] text-zinc-400"
          >
            Authority. Systems. Control.
          </motion.p>
        </div>

        {showHeadline && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="mt-10 max-w-[310px]"
          >
            <h2 className="text-center text-sm font-bold uppercase leading-6 tracking-[0.16em] text-zinc-100">
              Have The Strongest Hand In The Market
            </h2>
          </motion.div>
        )}

        {showCards && (
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative mt-10 w-full"
          >
            <div className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-8">
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
                    className="snap-center bg-transparent p-0"
                    onClick={() => setActiveCard(index)}
                  >
                    <CardFace label={service} isHovered={false} isMobile />
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </motion.section>
    </>
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
      className={`relative overflow-hidden rounded-[22px] border-[2px] bg-white ${
        isMobile ? "h-[240px] w-[160px] shrink-0" : "h-[300px] w-[200px] sm:h-[340px] sm:w-[220px]"
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
          isMobile ? "h-[72px] w-[72px]" : "h-[92px] w-[92px] sm:left-[3px] sm:top-[3px] sm:h-[110px] sm:w-[110px]"
        }`}
      >
        <Image
          src="/logo.png"
          alt="SOVRN Logo"
          width={220}
          height={280}
          className={`absolute h-auto object-contain ${
            isMobile
              ? "left-[-23px] top-[-6px] w-[108px]"
              : "left-[-30px] top-[-8px] w-[140px] sm:left-[-34px] sm:top-[-10px] sm:w-[165px]"
          }`}
        />
      </div>

      <div
        className={`absolute bottom-[2px] right-[2px] overflow-hidden ${
          isMobile ? "h-[72px] w-[72px]" : "h-[92px] w-[92px] sm:bottom-[3px] sm:right-[3px] sm:h-[110px] sm:w-[110px]"
        }`}
      >
        <Image
          src="/logo.png"
          alt="SOVRN Logo"
          width={220}
          height={280}
          className={`absolute h-auto rotate-180 object-contain ${
            isMobile
              ? "bottom-[-6px] right-[-23px] w-[108px]"
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
  isMobile,
}: {
  index: number;
  label: string;
  onClose: () => void;
  isMobile: boolean;
}) {
  const card = isMobile
    ? { x: 0, y: 0, rotate: 0 }
    : desktopCardPositions[index];

  const content = serviceContent[label];

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
          scale: isMobile ? 0.92 : 0.24,
          x: card.x,
          y: isMobile ? 40 : card.y + 190,
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
            <div className="absolute left-1/2 top-[18%] h-[320px] w-[320px] -translate-x-1/2 rounded-full bg-white/8 blur-3xl sm:top-[28%] sm:h-[700px] sm:w-[700px]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.10),transparent_32%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.84)_100%)]" />
          </div>

          <div className="relative z-10 min-h-screen">
            <div className="flex items-start justify-between px-3 pb-3 pt-3 sm:px-6 md:px-8 md:pt-4">
              <div className="flex items-start">
                <div
                  className={`relative ${
                    isMobile
                      ? "-ml-2 -mt-2 h-[170px] w-[128px]"
                      : "-ml-3 -mt-3 h-[320px] w-[240px] sm:-ml-4 sm:-mt-4 sm:h-[360px] sm:w-[270px]"
                  }`}
                >
                  <Image
                    src="/logo.png"
                    alt="SOVRN Logo"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>

              <motion.button
                type="button"
                onClick={onClose}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="sticky top-3 z-20 rounded-full border border-white/15 bg-black/55 px-3 py-2 text-[10px] font-medium uppercase tracking-[0.18em] text-zinc-200 backdrop-blur-md transition hover:border-white/30 hover:bg-white/10 sm:top-4 sm:px-4 sm:text-xs sm:tracking-[0.22em]"
              >
                Close
              </motion.button>
            </div>

            <div className="px-4 pb-14 pt-0 sm:px-8 md:px-12 md:pb-24">
              <div className="grid w-full gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.18, ease: "easeOut" }}
                  className="max-w-3xl"
                >
                  <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.26em] text-zinc-500 sm:mb-4 sm:text-[11px] sm:tracking-[0.32em]">
                    {content.eyebrow}
                  </p>

                  <h2 className="max-w-4xl text-3xl font-semibold leading-[1.02] tracking-[-0.04em] text-zinc-100 sm:text-5xl md:text-6xl lg:text-7xl">
                    {content.title}
                  </h2>

                  <p className="mt-5 max-w-2xl text-sm leading-7 text-zinc-400 sm:mt-6 sm:text-base sm:leading-8">
                    {content.description}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.28, ease: "easeOut" }}
                  className="flex items-start"
                >
                  <div className="w-full rounded-[24px] border border-white/12 bg-white/[0.03] p-5 shadow-[0_20px_100px_rgba(255,255,255,0.06)] backdrop-blur-xl sm:rounded-[30px] sm:p-8">
                    <p className="mb-5 text-[10px] uppercase tracking-[0.24em] text-zinc-500 sm:mb-6 sm:text-[11px] sm:tracking-[0.28em]">
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
            </div>
          </div>
        </div>
      </motion.section>
    </>
  );
}