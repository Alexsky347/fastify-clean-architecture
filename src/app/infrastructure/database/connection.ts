import pgp, { IDatabase } from "pg-promise";
import pg, { IClient } from "pg-promise/typescript/pg-subset";
import { EnvConfig } from "../config/env-config";

/**
 * Params for connection
 */
const systemDb = {
	host: EnvConfig.get("DB_HOST"),
	port: EnvConfig.getNumber("DB_PORT"),
	database: EnvConfig.get("DB_NAME"),
	user: EnvConfig.get("DB_USER"),
	password: EnvConfig.get("DB_PASSWORD"),
	idleTimeoutMillis: EnvConfig.getNumber("DB_CONNECTION_TIMEOUT"),
	max: EnvConfig.getNumber("DB_POOL"),
};

/**
 * Create a connection pool
 */
const pgPromise = pgp({
	async connect({
		client,
		dc,
		useCount,
	}: { client: pg.IClient; dc: any; useCount: number }) {
		if (useCount === 0 && dc?.email) {
			const email = encodeURI(dc.email);
			await client.query(`SET SESSION "app.user" = '${email}'`);
		}
	},
});

export class DbConnection {
	private db: IDatabase<IClient>;

	constructor() {
		this.db = pgPromise(systemDb as pg.IConnectionParameters<IClient>);
	}

	getDB(): IDatabase<IClient> {
		return this.db;
	}
}
