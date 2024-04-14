import { plugins } from "./app/infrastructure/plugins";
import { Server } from "./app/infrastructure/web";
import { routes } from "./app/interface/routes";

export const server = new Server({
	plugins,
	routes,
});

server.listen();
