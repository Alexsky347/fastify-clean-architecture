import fastify, {
	FastifyInstance,
	FastifyRequest,
	FastifyReply,
	DoneFuncWithErrOrRes,
} from "fastify";
import { EnvConfig } from "../config/env-config";

export class Server {
	public app: FastifyInstance;
	public app_domain = EnvConfig.get("APP_DOMAIN");
	public app_port = EnvConfig.getNumber("APP_PORT");

	constructor(appInit: { plugins: any[]; routes: any[] }) {
		this.app = fastify({
			logger: {
				transport: {
					target: "pino-pretty",
					options: {
						translateTime: "SYS:h:MM:ss",
						colorize: true,
						ignore: "pid,hostname",
					},
				},
			},
		});
		this.app.addHook(
			"preHandler",
			(
				req: FastifyRequest,
				_reply: FastifyReply,
				done: DoneFuncWithErrOrRes,
			) => {
				if (req.body) {
					req.log.info({ body: req.body }, "parsed body");
				}
				done();
			},
		);
		this.register(appInit.plugins);
		this.routes(appInit.routes);
	}

	private register(plugins: {
		forEach: (arg0: (plugin: any) => void) => void;
	}) {
		plugins.forEach((plugin) => {
			this.app.register(plugin);
		});
	}

	publicRoutes() {
		this.app.get(
			"/health",
			async (request: FastifyRequest, reply: FastifyReply) => {
				reply.send({ message: "server is alive" });
			},
		);
	}

	public routes(routes: { forEach: (arg0: (routes: any) => void) => void }) {
		routes.forEach((Route) => {
			const router = new Route();
			this.app.register(router.routes, { prefix: router.prefix_route });
		});
		this.publicRoutes();
	}

	public listen() {
		this.app.listen({ port: this.app_port }, (err: any) => {
			if (err) {
				this.app.log.fatal({ msg: "Application startup error", err });
				process.exit(1);
			}
			if (!this.app_domain) {
				this.app.log.error({
					msg: "Application startup error",
					err: "APP_DOMAIN is not defined",
				});
			}
			this.app.log.info(
				`App listening on the http://${this.app_domain}:${this.app_port} 🚀`,
			);
		});
	}
}
