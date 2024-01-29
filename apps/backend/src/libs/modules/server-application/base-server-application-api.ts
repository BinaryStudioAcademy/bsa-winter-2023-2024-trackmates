import swaggerJsdoc from "swagger-jsdoc";

import { AppEnvironment } from "~/libs/enums/enums.js";
import { type Config } from "~/libs/modules/config/config.js";

import {
	type ServerApplicationApi,
	type ServerApplicationRouteParameters,
} from "./libs/types/types.js";

class BaseServerApplicationApi implements ServerApplicationApi {
	public version: string;

	public routes: ServerApplicationRouteParameters[];

	private config: Config;

	public constructor(
		version: string,
		config: Config,
		...handlers: ServerApplicationRouteParameters[]
	) {
		this.version = version;
		this.config = config;
		this.routes = handlers.map((handler) => ({
			...handler,
			path: `/api/${this.version}${handler.path}`,
		}));
	}

	public generateDoc(title: string): ReturnType<typeof swaggerJsdoc> {
		const isProduction =
			this.config.ENV.APP.ENVIRONMENT === AppEnvironment.PRODUCTION;

		const controllerExtension = isProduction ? "js" : "ts";

		return swaggerJsdoc({
			definition: {
				openapi: "3.0.0",
				info: {
					title,
					version: `${this.version}.0.0`,
				},
				servers: [{ url: "/api/v1" }],
				components: {
					securitySchemes: {
						bearerAuth: {
							type: "http",
							scheme: "bearer",
							bearerFormat: "JWT",
						},
					},
				},
			},
			apis: [`src/packages/**/*.controller.${controllerExtension}`],
		});
	}
}

export { BaseServerApplicationApi };
