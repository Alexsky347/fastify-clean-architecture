import { createClient } from "redis";
import { EnvConfig } from "../../config/env-config";
import { logger } from "../../utils/logger";

const port = EnvConfig.getNumber("REDIS_PORT");
const username = EnvConfig.getNumber("REDIS_USERNAME");
const host = EnvConfig.get("REDIS_HOST");
const password = EnvConfig.get("REDIS_PASSWORD");
const url = `redis://${username}:${password}@${host}:${port}`;

export const redisClient = async () => {
	const client = createClient({ url });

	client.on("error", (err: Error) => {
		logger.error("Redis Client Error", err);
		process.exit(1);
	});

	client.on("connect", () =>
		logger.info(
			`Redis Client Connected on Port ${EnvConfig.getNumber("REDIS_PORT")}`,
		),
	);

	await client.connect();

	return client;
};
