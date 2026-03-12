import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const requiredFields = [
      "firstName",
      "lastName",
      "businessName",
      "email",
      "service",
      "message",
    ];

    for (const field of requiredFields) {
      if (!body[field] || String(body[field]).trim() === "") {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    const appsScriptUrl = process.env.GOOGLE_APPS_SCRIPT_WEB_APP_URL;

    if (!appsScriptUrl) {
      return NextResponse.json(
        { error: "Missing Google Apps Script URL" },
        { status: 500 }
      );
    }

    const payload = {
      submittedAt: new Date().toISOString(),
      firstName: body.firstName,
      lastName: body.lastName,
      businessName: body.businessName,
      email: body.email,
      phone: body.phone || "",
      service: body.service,
      website: body.website || "",
      monthlyRevenue: body.monthlyRevenue || "",
      message: body.message,
    };

    const response = await fetch(appsScriptUrl, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    const text = await response.text();

    if (!response.ok) {
      return NextResponse.json(
        { error: "Apps Script rejected the request", details: text },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true, details: text });
  } catch (error) {
    console.error("QUOTE_REQUEST_ERROR", error);

    return NextResponse.json(
      { error: "Server error while submitting quote request" },
      { status: 500 }
    );
  }
}