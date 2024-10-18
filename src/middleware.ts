import { NextRequest, NextResponse } from "next/server";
import redis from "./lib/redis";

const RATE_LIMIT = 60;
const WINDOW_SIZE_IN_SECONDS = 60;

export async function middleware(req: NextRequest) {
	const ip = req.headers.get("x-forwarded-for") || req.ip || "127.0.0.1";
	const key = `rate-limit:${ip}`;

	try {
		const currentRequests = await redis.incr(key);

		if (currentRequests === 1) await redis.expire(key, WINDOW_SIZE_IN_SECONDS);

		if (currentRequests > RATE_LIMIT) return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });

		return NextResponse.next();
	} catch (err) {
		console.error("Rate limiting error:", err);

		return NextResponse.json({ error: "Service unavailable. Please try again later." }, { status: 503 });
	}
}

export const config = {
	matcher: "/api/:path*",
};
