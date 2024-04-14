import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { AuthController } from "../controller/auth/auth.controller";
import { UserInterface } from "../../domain/interface/users.interface";
import { LoginSchema } from "../../domain/validation/auth.validate";

export class AuthRoute {
	public prefix_route = "/auth";

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async routes(
		fastify: FastifyInstance,
		_options: FastifyPluginOptions,
		_done: any,
	) {
		fastify.post<{ Body: UserInterface }>(
			"/login",
			{
				schema: {
					body: LoginSchema,
				},
			},
			AuthController.login,
		);
	}
}
