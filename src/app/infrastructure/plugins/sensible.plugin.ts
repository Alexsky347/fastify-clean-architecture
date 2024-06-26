import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import sensible from "@fastify/sensible";

/**
 * This plugins adds some utilities to handle http errors
 *
 * @see https://github.com/fastify/fastify-sensible
 */
export const SensiblePlugin = fp(async function (fastify: FastifyInstance) {
	fastify.register(sensible);
});
