import { NextRequest, NextResponse } from "next/server";
import redis from "@/lib/redis";

const RATE_LIMIT = 60;
const WINDOW_SIZE_IN_SECONDS = 60;

export async function middleware(req: NextRequest) {
	console.log("Middleware triggered for request to:", req.nextUrl.pathname);

	const ip = req.headers.get("x-forwarded-for") || req.ip || "127.0.0.1";
	const key = `rate-limit:${ip}`;

	try {
		const currentRequests = await redis.incr(key);
		console.log(`Current request count for key ${key}:`, currentRequests);

		if (currentRequests === 1) {
			await redis.expire(key, WINDOW_SIZE_IN_SECONDS);
			console.log(`Expiry set for key ${key} to ${WINDOW_SIZE_IN_SECONDS} seconds`);
		}

		if (currentRequests > RATE_LIMIT) {
			console.log("Rate limit exceeded for IP:", ip);
			return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
		}

		return NextResponse.next();
	} catch (error) {
		console.error("Rate limiting error:", error);
		return NextResponse.next();
	}
}

export const config = {
	matcher: "/api/:path*",
};
