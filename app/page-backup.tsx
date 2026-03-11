"use client";

import { motion } from "framer-motion";

export default function IglooInspiredAgencyHomepage() {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" as const },
    },
  };

  const stagger = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const services = [
    {
      title: "CRM Systems",
      text: "Custom-built operating systems that give you visibility across leads, follow-up, pipeline, and sales activity.",
    },
    {
      title: "Lead Capture",
      text: "Conversion-first landing flows, intake forms, and ad response infrastructure designed to capture demand cleanly.",
    },
    {
      title: "Automations",
      text: "Follow-up logic, pipeline triggers, task creation, and internal workflows that remove manual friction.",
    },
    {
      title: "Revenue Infrastructure",
      text: "We design the systems behind faster response times, cleaner handoffs, and stronger conversion from inquiry to close.",
    },
  ];

  const problems = [
    "Leads come in, but follow-up is inconsistent.",
    "Your pipeline exists, but nobody trusts it.",
    "Your tools are disconnected and slow down execution.",
    "Growth is being capped by weak internal systems.",
  ];

  const process = [
    {
      step: "01",
      title: "Diagnose",
      text: "We identify where leads, follow-up, and operational momentum are leaking.",
    },
    {
      step: "02",
      title: "Design",
      text: "We architect a clearer system around how your business actually sells and operates.",
    },
    {
      step: "03",
      title: "Build",
      text: "We implement the CRM, workflows, forms, dashboards, and conversion infrastructure.",
    },
    {
      step: "04",
      title: "Automate",
      text: "We connect follow-up, handoffs, reminders, and internal logic so the machine runs cleaner.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#06070a] text-white selection:bg-white/20">
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(125,166,255,0.14),transparent_28%),radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.08),transparent_18%),linear-gradient(to_bottom,#06070a,#090b10_35%,#06070a)]" />
        <div className="absolute left-1/2 top-24 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full border border-white/10 bg-white/[0.03] blur-3xl" />
        <div className="absolute left-[12%] top-[20%] h-40 w-40 rounded-full bg-blue-300/10 blur-3xl" />
        <div className="absolute right-[8%] top-[12%] h-56 w-56 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.8)_1px,transparent_1px)] [background-size:72px_72px]" />
      </div>

      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#06070a]/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <div className="flex items-center gap-5">
            <img
              src="/logo.png"
              alt="SOVRN logo"
              className="h-40 w-40 object-contain shrink-0"
            />
            <div className="text-xl font-semibold tracking-[0.3em] text-white uppercase whitespace-nowrap">
              SOVRN
            </div>
          </div>

          <nav className="hidden items-center gap-8 text-sm text-white/70 md:flex">
            <a href="#services" className="transition hover:text-white">
              Services
            </a>
            <a href="#showcase" className="transition hover:text-white">
              Solutions
            </a>
            <a href="#process" className="transition hover:text-white">
              Process
            </a>
            <a href="#contact" className="transition hover:text-white">
              Contact
            </a>
          </nav>

          <motion.a
            href="#contact"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/15"
          >
            Book a Call
          </motion.a>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden">
          <div className="mx-auto grid min-h-[92vh] max-w-7xl items-center gap-14 px-6 py-24 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-16">
            <motion.div
              className="max-w-3xl"
              variants={stagger}
              initial="hidden"
              animate="show"
            >
              <motion.div
                variants={fadeUp}
                className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.25em] text-white/60"
              >
                <span className="h-2 w-2 rounded-full bg-white/70" />
                Automation Systems For Modern Businesses
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="max-w-4xl text-5xl font-semibold leading-[0.95] tracking-[-0.05em] text-white sm:text-6xl lg:text-8xl"
              >
                We build the infrastructure that turns attention into revenue.
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="mt-8 max-w-2xl text-base leading-7 text-white/68 sm:text-lg"
              >
                CRM systems, lead capture, follow-up automation, and conversion architecture
                designed to make your business operate like a machine.
              </motion.p>

              <motion.div
                variants={fadeUp}
                className="mt-10 flex flex-col gap-4 sm:flex-row"
              >
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition"
                >
                  Book a Strategy Call
                </motion.a>

                <motion.a
                  href="#showcase"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Explore the System
                </motion.a>
              </motion.div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
            >
              <div className="absolute inset-0 rounded-[2.5rem] bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.12),transparent_35%),linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] blur-2xl" />
              <motion.div
                className="relative mx-auto aspect-[4/5] max-w-xl overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.03] p-6 shadow-2xl shadow-black/40"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/30 px-4 py-3">
                  <div>
                    <div className="text-xs uppercase tracking-[0.22em] text-white/45">
                      Operator View
                    </div>
                    <div className="mt-1 text-sm font-medium text-white/85">
                      Revenue Infrastructure
                    </div>
                  </div>
                  <div className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/55">
                    Live
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-4">
                    <div className="text-xs uppercase tracking-[0.22em] text-white/45">
                      New Leads
                    </div>
                    <div className="mt-3 text-4xl font-semibold tracking-[-0.04em]">
                      42
                    </div>
                    <div className="mt-2 text-sm text-white/45">This week</div>
                  </div>
                  <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-4">
                    <div className="text-xs uppercase tracking-[0.22em] text-white/45">
                      Response Time
                    </div>
                    <div className="mt-3 text-4xl font-semibold tracking-[-0.04em]">
                      3m
                    </div>
                    <div className="mt-2 text-sm text-white/45">
                      Automated first touch
                    </div>
                  </div>
                </div>

                <div className="mt-4 rounded-[2rem] border border-white/10 bg-black/25 p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <div className="text-xs uppercase tracking-[0.22em] text-white/45">
                        Pipeline
                      </div>
                      <div className="mt-1 text-lg font-medium text-white/88">
                        Opportunities in motion
                      </div>
                    </div>
                    <div className="text-sm text-white/45">Q1</div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { stage: "New", count: 18 },
                      { stage: "Qualified", count: 10 },
                      { stage: "Proposal", count: 6 },
                    ].map((item) => (
                      <div
                        key={item.stage}
                        className="rounded-2xl border border-white/10 bg-white/[0.03] p-3"
                      >
                        <div className="text-xs uppercase tracking-[0.18em] text-white/40">
                          {item.stage}
                        </div>
                        <div className="mt-3 text-2xl font-semibold tracking-[-0.03em]">
                          {item.count}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 rounded-[2rem] border border-white/10 bg-white/[0.03] p-4">
                  <div className="text-xs uppercase tracking-[0.22em] text-white/45">
                    Automation Flow
                  </div>
                  <div className="mt-4 space-y-3">
                    {[
                      "Lead enters from ad or landing page",
                      "Instant qualification and CRM assignment",
                      "Automated follow-up and task creation",
                      "Operator closes from a cleaner pipeline",
                    ].map((line, idx) => (
                      <div
                        key={line}
                        className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3"
                      >
                        <div className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 text-xs text-white/60">
                          {idx + 1}
                        </div>
                        <div className="text-sm text-white/75">{line}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section className="border-y border-white/8 bg-white/[0.02]">
          <div className="mx-auto max-w-6xl px-6 py-20 text-center lg:px-8">
            <p className="mx-auto max-w-4xl text-3xl font-medium leading-tight tracking-[-0.04em] text-white/90 sm:text-5xl">
              Most businesses don’t have a lead problem. They have a systems problem.
            </p>
          </div>
        </section>

        <motion.section
          className="mx-auto max-w-7xl px-6 py-24 lg:px-8"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
        >
          <div className="mb-12 max-w-2xl">
            <div className="text-xs uppercase tracking-[0.25em] text-white/45">
              Where growth breaks
            </div>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
              Revenue slows down when the backend is messy.
            </h2>
          </div>

          <motion.div
            className="grid gap-5 md:grid-cols-2 xl:grid-cols-4"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            {problems.map((problem) => (
              <motion.div
                key={problem}
                variants={fadeUp}
                whileHover={{ y: -6, scale: 1.01 }}
                className="group rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 transition duration-300 hover:border-white/20 hover:bg-white/[0.05]"
              >
                <div className="mb-8 h-12 w-12 rounded-2xl border border-white/10 bg-white/[0.04]" />
                <p className="text-lg leading-7 text-white/82">{problem}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        <section className="mx-auto grid max-w-7xl gap-8 px-6 py-10 lg:grid-cols-2 lg:px-8">
          <div className="rounded-[2.5rem] border border-white/10 bg-white/[0.02] p-8 lg:p-10">
            <div className="text-xs uppercase tracking-[0.24em] text-white/45">Before</div>
            <h3 className="mt-4 text-3xl font-semibold tracking-[-0.04em]">
              Scattered tools. Slow response. Low trust.
            </h3>
            <ul className="mt-8 space-y-4 text-white/65">
              <li>Disconnected follow-up across channels</li>
              <li>No clean view of lead status</li>
              <li>Manual handoffs and missed tasks</li>
              <li>Operators working from memory instead of systems</li>
            </ul>
          </div>
          <div className="rounded-[2.5rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-8 lg:p-10">
            <div className="text-xs uppercase tracking-[0.24em] text-white/45">After</div>
            <h3 className="mt-4 text-3xl font-semibold tracking-[-0.04em]">
              A cleaner machine built to convert attention.
            </h3>
            <ul className="mt-8 space-y-4 text-white/75">
              <li>Leads enter a structured system immediately</li>
              <li>Pipeline stages are visible and actionable</li>
              <li>Follow-up happens faster and more consistently</li>
              <li>Decision-making is based on real visibility</li>
            </ul>
          </div>
        </section>

        <section id="services" className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <div className="mb-12 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="text-xs uppercase tracking-[0.25em] text-white/45">
                What we build
              </div>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
                The operating system behind better follow-up, cleaner handoffs, and stronger
                conversion.
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-white/62 sm:text-base">
              We design and implement the infrastructure modern businesses need once growth
              starts exposing operational weakness.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {services.map((service, i) => (
              <div
                key={service.title}
                className="group rounded-[2rem] border border-white/10 bg-white/[0.03] p-7 transition duration-300 hover:border-white/20 hover:bg-white/[0.05]"
              >
                <div className="mb-6 flex items-center justify-between">
                  <div className="text-xs uppercase tracking-[0.22em] text-white/40">
                    0{i + 1}
                  </div>
                  <div className="h-10 w-10 rounded-2xl border border-white/10 bg-white/[0.04]" />
                </div>
                <h3 className="text-2xl font-semibold tracking-[-0.03em] text-white">
                  {service.title}
                </h3>
                <p className="mt-4 max-w-xl text-white/65">{service.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="showcase" className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <div className="mb-12 max-w-3xl">
            <div className="text-xs uppercase tracking-[0.25em] text-white/45">
              System Showcase
            </div>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
              Designed to feel as sharp on the inside as it does on the outside.
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.03] p-5">
              <div className="rounded-[2rem] border border-white/10 bg-[#0b0d12] p-5">
                <div className="flex items-center justify-between border-b border-white/8 pb-4">
                  <div>
                    <div className="text-xs uppercase tracking-[0.24em] text-white/45">
                      Dashboard
                    </div>
                    <div className="mt-1 text-lg font-medium text-white/85">
                      Command View
                    </div>
                  </div>
                  <div className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/45">
                    Live Metrics
                  </div>
                </div>

                <div className="mt-5 grid gap-4 md:grid-cols-3">
                  {[
                    ["Lead Velocity", "+38%"],
                    ["Booked Calls", "27"],
                    ["Pipeline Value", "$84k"],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                    >
                      <div className="text-xs uppercase tracking-[0.2em] text-white/40">
                        {label}
                      </div>
                      <div className="mt-3 text-3xl font-semibold tracking-[-0.03em]">
                        {value}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 grid gap-4 md:grid-cols-[1.05fr_0.95fr]">
                  <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-4">
                    <div className="text-xs uppercase tracking-[0.2em] text-white/40">
                      Pipeline Health
                    </div>
                    <div className="mt-4 space-y-3">
                      {[52, 74, 38, 88].map((width, idx) => (
                        <div key={idx}>
                          <div className="mb-2 flex items-center justify-between text-xs text-white/45">
                            <span>Stage {idx + 1}</span>
                            <span>{width}%</span>
                          </div>
                          <div className="h-2 rounded-full bg-white/8">
                            <div
                              className="h-2 rounded-full bg-white/70"
                              style={{ width: `${width}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-4">
                    <div className="text-xs uppercase tracking-[0.2em] text-white/40">
                      Recent Actions
                    </div>
                    <div className="mt-4 space-y-3">
                      {[
                        "New lead captured from paid campaign",
                        "Qualification task assigned automatically",
                        "Proposal follow-up triggered",
                        "Pipeline stage updated to Qualified",
                      ].map((event) => (
                        <div
                          key={event}
                          className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/72"
                        >
                          {event}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {[
                {
                  title: "Lead intake to close",
                  text: "Every inquiry enters a structured path instead of landing in a mess of tabs, messages, and memory.",
                },
                {
                  title: "Operator visibility",
                  text: "The right data becomes visible at the right moment so you know exactly where attention should go.",
                },
                {
                  title: "Automation where it matters",
                  text: "We automate the repeatable parts while keeping the human moments sharp and controlled.",
                },
              ].map((card) => (
                <div
                  key={card.title}
                  className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6"
                >
                  <h3 className="text-2xl font-semibold tracking-[-0.03em] text-white">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-white/65">{card.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="process" className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <div className="mb-12 max-w-3xl">
            <div className="text-xs uppercase tracking-[0.25em] text-white/45">
              Process
            </div>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
              We don’t sell random tactics. We build the system underneath the outcome.
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {process.map((item) => (
              <div
                key={item.step}
                className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6"
              >
                <div className="text-xs uppercase tracking-[0.22em] text-white/40">
                  Step {item.step}
                </div>
                <h3 className="mt-5 text-2xl font-semibold tracking-[-0.03em] text-white">
                  {item.title}
                </h3>
                <p className="mt-4 text-white/65">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <div className="grid gap-5 md:grid-cols-3">
            {[
              ["Faster follow-up", "Respond to inquiries before momentum disappears."],
              ["Clearer pipeline", "Operate from visibility instead of guesswork."],
              [
                "Higher-leverage execution",
                "Let systems handle the repeatable work so the team can close.",
              ],
            ].map(([title, body]) => (
              <div
                key={title}
                className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6"
              >
                <h3 className="text-xl font-semibold tracking-[-0.03em] text-white">
                  {title}
                </h3>
                <p className="mt-3 text-white/62">{body}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="mx-auto max-w-5xl px-6 py-24 lg:px-8">
          <div className="overflow-hidden rounded-[2.75rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.09),rgba(255,255,255,0.03))] p-8 sm:p-10 lg:p-14">
            <div className="mx-auto max-w-3xl text-center">
              <div className="text-xs uppercase tracking-[0.25em] text-white/45">
                Get started
              </div>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-white sm:text-6xl">
                If your business is growing faster than your systems can handle, that’s the
                problem we solve.
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/65 sm:text-lg">
                We design the infrastructure behind better follow-up, clearer pipelines, and
                more conversion.
              </p>
            </div>

            <form className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-2">
              <input
                className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-white/25"
                placeholder="Name"
              />
              <input
                className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-white/25"
                placeholder="Email"
              />
              <input
                className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-white/25 sm:col-span-2"
                placeholder="Company"
              />
              <textarea
                className="min-h-36 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-white/25 sm:col-span-2"
                placeholder="What do you need help building?"
              />
              <button
                type="submit"
                className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:scale-[1.02] sm:col-span-2"
              >
                Request a Strategy Call
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-8 text-sm text-white/45 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>© 2026 SOVRN. Built for modern operators.</div>
          <div className="flex gap-6">
            <a href="#services" className="hover:text-white">
              Services
            </a>
            <a href="#showcase" className="hover:text-white">
              Solutions
            </a>
            <a href="#contact" className="hover:text-white">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}