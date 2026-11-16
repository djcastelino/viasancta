import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("http://192.227.172.231:3005/script.js", { next: { revalidate: 3600 } });
    const text = await res.text();
    return new NextResponse(text, {
      status: 200,
      headers: {
        "Content-Type": "application/javascript; charset=utf-8",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch {
    return new NextResponse("", { status: 200, headers: { "Content-Type": "application/javascript" } });
  }
}
