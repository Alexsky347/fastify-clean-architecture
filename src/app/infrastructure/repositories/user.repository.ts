import { IDatabase } from "pg-promise";
import { DbConnection } from "../database/connection";
import { UserInterface } from "../../domain/interface/users.interface";

export class UserRepository {
	public db: IDatabase<any>;

	constructor() {
		this.db = new DbConnection().getDB();
	}

	async save({
		email,
		phone_no,
		password,
	}: UserInterface): Promise<UserInterface | null> {
		return this.db.oneOrNone<UserInterface>(
			" INSERT INTO users (email, phone_no, password) VALUES ($1, $2, $3, $4) RETURNING *",
			[email, phone_no, password],
		);
	}

	async findOne(payload: string): Promise<UserInterface | null> {
		return this.db.oneOrNone<UserInterface>(
			"SELECT * FROM users WHERE email = $1",
			[payload],
		);
	}
}
