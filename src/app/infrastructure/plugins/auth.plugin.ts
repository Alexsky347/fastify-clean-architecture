import { EnvConfig } from "../config/env-config";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import fastifyPlugin from "fastify-plugin";
import fastifyJwt from "@fastify/jwt";
import { responseSender } from "../web/response.handler";
import { parseResponse } from "../web/response.parser";

export const AuthPlugin = fastifyPlugin<FastifyInstance>(
	async (fastify) => {
		fastify.register(fastifyJwt, {
			secret: EnvConfig.get("JWT_SECRET") as string,
		});

		fastify.decorate(
			"authenticate",
			async (req: FastifyRequest, reply: FastifyReply) => {
				try {
					await req.jwtVerify();
				} catch (err: any) {
					responseSender(
						parseResponse(
							new Error(`${err.statusCode}: Unauthorize, ${err.message}`),
						),
						reply,
					);
				}
			},
		);
	},
	{
		name: "auth-middleware",
	},
);
