import { afterEach, beforeEach, describe, it } from "node:test";
import { env } from "node:process";
import assert from "node:assert/strict";
import { EnvConfig } from "./env-config";

describe("EnvConfig", () => {
	let originalEnv: NodeJS.ProcessEnv;

	beforeEach(() => {
		originalEnv = { ...env };
	});

	afterEach(() => {
		process.env = originalEnv;
	});

	it("should be able to find env", async () => {
		process.env["DB_HOST"] = "localhost";
		assert.strictEqual(EnvConfig.get("DB_HOST"), "localhost");
	});

	it("should be able to find number env", async () => {
		process.env["PORT"] = "3000";
		assert.strictEqual(EnvConfig.getNumber(200), 3000);
	});
});
