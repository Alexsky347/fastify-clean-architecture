import pino from "pino";
import { EnvConfig } from "../config/env-config";

export const logger = pino({
	level: EnvConfig.get("PINO_LOG_LEVEL") ?? "info",
	formatters: {
		bindings: (bindings: any) => {
			return { pid: bindings.pid, host: bindings.hostname };
		},
		level: (label: string) => {
			return { level: label.toUpperCase() };
		},
	},
	timestamp: pino.stdTimeFunctions.isoTime,
});
