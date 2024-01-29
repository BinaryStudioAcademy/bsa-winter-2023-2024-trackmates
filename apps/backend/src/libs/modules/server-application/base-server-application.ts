import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import fastifyStatic from "@fastify/static";
import swagger, { type StaticDocumentSpec } from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import Fastify, { type FastifyError } from "fastify";

import { ServerErrorType } from "~/libs/enums/enums.js";
import { type ValidationError } from "~/libs/exceptions/exceptions.js";
import { type Config } from "~/libs/modules/config/config.js";
import { type Database } from "~/libs/modules/database/database.js";
import { HTTPCode, HTTPError } from "~/libs/modules/http/http.js";
import { type Logger } from "~/libs/modules/logger/logger.js";
import {
	type ServerCommonErrorResponse,
	type ServerValidationErrorResponse,
	type ValidationSchema,
} from "~/libs/types/types.js";

import {
	type ServerApplication,
	type ServerApplicationApi,
	type ServerApplicationRouteParameters,
} from "./libs/types/types.js";

type Constructor = {
	title: string;
	config: Config;
	logger: Logger;
	database: Database;
	apis: ServerApplicationApi[];
};

class BaseServerApplication implements ServerApplication {
	private title: string;

	private config: Config;

	private logger: Logger;

	private database: Database;

	private apis: ServerApplicationApi[];

	private app: ReturnType<typeof Fastify>;

	public constructor({ title, config, logger, database, apis }: Constructor) {
		this.title = title;
		this.config = config;
		this.logger = logger;
		this.database = database;
		this.apis = apis;

		this.app = Fastify({
			ignoreTrailingSlash: true,
		});
	}

	public addRoute(parameters: ServerApplicationRouteParameters): void {
		const { path, method, handler, validation } = parameters;

		this.app.route({
			url: path,
			method,
			handler,
			schema: {
				body: validation?.body,
			},
		});

		this.logger.info(`Route: ${method} ${path} is registered`);
	}

	public addRoutes(parameters: ServerApplicationRouteParameters[]): void {
		parameters.forEach((parameter) => {
			this.addRoute(parameter);
		});
	}

	public initRoutes(): void {
		const routers = this.apis.flatMap((api) => api.routes);

		this.addRoutes(routers);
	}

	public async initMiddlewares(): Promise<void> {
		await Promise.all(
			this.apis.map(async (api) => {
				this.logger.info(
					`Generate swagger documentation for API ${api.version}`,
				);

				await this.app.register(swagger, {
					mode: "static",
					specification: {
						document: api.generateDoc(
							this.title,
						) as StaticDocumentSpec["document"],
					},
				});

				await this.app.register(swaggerUi, {
					routePrefix: `${api.version}/documentation`,
				});
			}),
		);
	}

	private async initServe(): Promise<void> {
		const staticPath = join(
			dirname(fileURLToPath(import.meta.url)),
			"../../../../public",
		);

		await this.app.register(fastifyStatic, {
			root: staticPath,
			prefix: "/",
		});

		this.app.setNotFoundHandler(async (_request, response) => {
			await response.sendFile("index.html", staticPath);
		});
	}

	private initValidationCompiler(): void {
		this.app.setValidatorCompiler<ValidationSchema>(({ schema }) => {
			return <T, R = ReturnType<ValidationSchema["parse"]>>(data: T): R => {
				return schema.parse(data) as R;
			};
		});
	}

	private initErrorHandler(): void {
		this.app.setErrorHandler(
			(error: FastifyError | ValidationError, _request, reply) => {
				if ("issues" in error) {
					this.logger.error(`[Validation Error]: ${error.message}`);

					error.issues.forEach((issue) => {
						this.logger.error(`[${issue.path.toString()}] — ${issue.message}`);
					});

					const response: ServerValidationErrorResponse = {
						errorType: ServerErrorType.VALIDATION,
						message: error.message,
						details: error.issues.map((issue) => ({
							path: issue.path,
							message: issue.message,
						})),
					};

					return reply.status(HTTPCode.UNPROCESSED_ENTITY).send(response);
				}

				if (error instanceof HTTPError) {
					this.logger.error(`[HTTP Error]: ${error.status} – ${error.message}`);

					const response: ServerCommonErrorResponse = {
						errorType: ServerErrorType.COMMON,
						message: error.message,
					};

					return reply.status(error.status).send(response);
				}

				this.logger.error(error.message);

				const response: ServerCommonErrorResponse = {
					errorType: ServerErrorType.COMMON,
					message: error.message,
				};

				return reply.status(HTTPCode.INTERNAL_SERVER_ERROR).send(response);
			},
		);
	}

	public async init(): Promise<void> {
		this.logger.info("Application initialization…");

		await this.initServe();

		await this.initMiddlewares();

		this.initValidationCompiler();

		this.initErrorHandler();

		this.initRoutes();

		this.database.connect();

		try {
			await this.app.listen({
				port: this.config.ENV.APP.PORT,
				host: this.config.ENV.APP.HOST,
			});

			this.logger.info(
				`Application is listening on PORT – ${this.config.ENV.APP.PORT.toString()}, on ENVIRONMENT – ${
					this.config.ENV.APP.ENVIRONMENT as string
				}.`,
			);
		} catch (error) {
			if (error instanceof Error) {
				this.logger.error(error.message, {
					cause: error.cause,
					stack: error.stack,
				});
			}

			throw error;
		}
	}
}

export { BaseServerApplication };
