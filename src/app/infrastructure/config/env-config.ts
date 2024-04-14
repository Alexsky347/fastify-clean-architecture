import { env } from "node:process";

export class EnvConfig {
	static get(envToFind: string | number | boolean) {
		return env[envToFind.toString()];
	}

	static getNumber(env: string | number | boolean) {
		return Number(this.get(env));
	}
}
