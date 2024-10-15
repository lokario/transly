import Redis from "ioredis";

const redis = new Redis({
	host: process.env.UPSTASH_ENDPOINT,
	port: 6379,
	password: process.env.UPSTASH_PASSWORD,
	tls: {},
});

export default redis;
