import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "";
    const userAgent = req.headers.get("user-agent") || "";
    const res = await fetch("http://192.227.172.231:3005/api/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": userAgent,
        ...(clientIp ? { "X-Forwarded-For": clientIp, "CF-Connecting-IP": clientIp } : {}),
      },
      body,
    });
    const data = await res.text();
    return new NextResponse(data, { status: res.status });
  } catch {
    return NextResponse.json({ ok: true });
  }
}
