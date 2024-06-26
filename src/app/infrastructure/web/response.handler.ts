import { FastifyReply } from "fastify";
import { parseResponse } from "./response.parser";
import { ResponseInterface } from "../../domain/interface/response.interface";

export const responseSender = async (
	data: ResponseInterface,
	reply: FastifyReply,
): Promise<void> => {
	reply.send(data);
};

export const responseHandler = async (
	next: () => ResponseInterface | PromiseLike<ResponseInterface>,
	reply: FastifyReply,
): Promise<void> => {
	try {
		const data: ResponseInterface = await next();
		responseSender(parseResponse(data), reply);
	} catch (error: any) {
		responseSender(parseResponse(error), reply);
	}
};
