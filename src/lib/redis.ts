import { Redis } from "@upstash/redis";

const redis = new Redis({
	url: process.env.UPSTASH_ENDPOINT,
	token: process.env.UPSTASH_PASSWORD,
});

export default redis;
