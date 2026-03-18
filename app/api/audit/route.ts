import { NextResponse } from "next/server";

/* ────────────────────────────────────────────────────────
   SOVRN Audit Engine — rule-based, zero external deps
   ──────────────────────────────────────────────────────── */

interface AuditInput {
  name: string;
  businessType: string;
  monthlyLeads: number;
  responseTime: string;
  followUpConsistency: string;
  adminHoursPerWeek: number;
  missedCallsPerWeek: number;
  closeRate: number;          // 0–100
  avgCustomerValue: number;
  noShowFrequency: string;
  hasAutomation: string;
}

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

/* ── Multiplier look-ups ── */

const responseTimeLostPct: Record<string, number> = {
  "Under 5 minutes": 0.02,
  "5-15 minutes": 0.08,
  "15-60 minutes": 0.18,
  "1-4 hours": 0.32,
  "Same day": 0.42,
  "Next day or later": 0.58,
};

const followUpRecoveryPct: Record<string, number> = {
  "Very consistent": 0.03,
  "Somewhat consistent": 0.10,
  "Inconsistent": 0.22,
  "Mostly manual / reactive": 0.35,
  "Almost none": 0.50,
};

const noShowRecoveryPct: Record<string, number> = {
  Rarely: 0.02,
  Sometimes: 0.10,
  Often: 0.22,
  "Very often": 0.35,
};

const automationHoursSaved: Record<string, number> = {
  "Yes, fully automated": 0.10,
  Partially: 0.30,
  "Mostly manual": 0.55,
  No: 0.75,
};

const LABOR_COST_PER_HOUR = 35;

function computeAudit(input: AuditInput): AuditResult {
  const {
    monthlyLeads,
    responseTime,
    followUpConsistency,
    adminHoursPerWeek,
    missedCallsPerWeek,
    closeRate,
    avgCustomerValue,
    noShowFrequency,
    hasAutomation,
  } = input;

  const closeRateDec = closeRate / 100;
  const monthlyMissedCalls = missedCallsPerWeek * 4.33;

  // ── Revenue recovered from faster response ──
  const lostPct = responseTimeLostPct[responseTime] ?? 0.18;
  const leadsRecoverableFromSpeed = Math.round(monthlyLeads * lostPct * 0.6);
  const revenueFromSpeed = leadsRecoverableFromSpeed * closeRateDec * avgCustomerValue;

  // ── Revenue recovered from better follow-up ──
  const fuPct = followUpRecoveryPct[followUpConsistency] ?? 0.22;
  const leadsRecoverableFromFollowUp = Math.round(monthlyLeads * fuPct * 0.5);
  const revenueFromFollowUp = leadsRecoverableFromFollowUp * closeRateDec * avgCustomerValue;

  // ── Revenue from missed calls recovered ──
  const callsRecovered = Math.round(monthlyMissedCalls * 0.65);
  const revenueFromCalls = callsRecovered * closeRateDec * avgCustomerValue;

  // ── Revenue from no-show reduction ──
  const noShowPct = noShowRecoveryPct[noShowFrequency] ?? 0.10;
  const monthlyAppointments = monthlyLeads * closeRateDec;
  const recoveredNoShows = Math.round(monthlyAppointments * noShowPct * 0.5);
  const revenueFromNoShows = recoveredNoShows * avgCustomerValue;

  // ── Hours saved from automation ──
  const autoSavePct = automationHoursSaved[hasAutomation] ?? 0.55;
  const monthlyAdminHours = adminHoursPerWeek * 4.33;
  const hoursSaved = Math.round(monthlyAdminHours * autoSavePct);
  const costSaved = Math.round(hoursSaved * LABOR_COST_PER_HOUR);

  // ── Totals ──
  const revenueRecovered = Math.round(
    revenueFromSpeed + revenueFromFollowUp + revenueFromCalls + revenueFromNoShows
  );
  const totalMonthly = revenueRecovered + costSaved;
  const annual = totalMonthly * 12;

  // ── Opportunities (top issues) ──
  const opps: { label: string; value: number }[] = [];
  if (revenueFromSpeed > 0)
    opps.push({ label: `Faster lead response could recover ~${leadsRecoverableFromSpeed} leads/mo`, value: revenueFromSpeed });
  if (revenueFromFollowUp > 0)
    opps.push({ label: `Stronger follow-up could recover ~${leadsRecoverableFromFollowUp} leads/mo`, value: revenueFromFollowUp });
  if (revenueFromCalls > 0)
    opps.push({ label: `Missed call capture could recover ~${callsRecovered} opportunities/mo`, value: revenueFromCalls });
  if (revenueFromNoShows > 0)
    opps.push({ label: `No-show reduction could save ~${recoveredNoShows} appointments/mo`, value: revenueFromNoShows });
  if (hoursSaved > 0)
    opps.push({ label: `Automation could free up ~${hoursSaved} hours/mo of admin work`, value: costSaved });

  opps.sort((a, b) => b.value - a.value);
  const opportunities = opps.slice(0, 4).map((o) => o.label);

  // ── Assumptions ──
  const assumptions = [
    `Based on ${monthlyLeads} inbound leads per month`,
    `${closeRate}% close rate at $${avgCustomerValue.toLocaleString()} average customer value`,
    `${adminHoursPerWeek} hours/week of manual admin at $${LABOR_COST_PER_HOUR}/hr`,
    `Recovery estimates are conservative (50-65% capture rate)`,
  ];

  // ── Summary ──
  const summary = `Based on your current operations, SOVRN estimates your business is leaving approximately $${totalMonthly.toLocaleString()} on the table every month. With tighter systems around response time, follow-up, and automation, the projected annual impact is $${annual.toLocaleString()}. The biggest lever is ${opps[0]?.label.toLowerCase() ?? "operational improvement"}.`;

  return {
    hoursSavedPerMonth: hoursSaved,
    revenueRecoveredPerMonth: revenueRecovered,
    costSavedPerMonth: costSaved,
    totalMonthlyImpact: totalMonthly,
    annualImpact: annual,
    summary,
    opportunities,
    assumptions,
  };
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as AuditInput;

    // Basic validation
    if (!body.monthlyLeads || !body.avgCustomerValue || !body.closeRate) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const result = computeAudit(body);
    return NextResponse.json(result);
  } catch (err) {
    console.error("Audit computation error:", err);
    return NextResponse.json(
      { error: "Failed to compute audit" },
      { status: 500 }
    );
  }
}
