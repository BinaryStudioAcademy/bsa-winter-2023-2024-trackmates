import convict, { type Config as LibraryConfig } from "convict";
import { config } from "dotenv";

import { AppEnvironment } from "~/libs/enums/enums.js";
import { type Logger } from "~/libs/modules/logger/logger.js";

import { type Config, type EnvironmentSchema } from "./libs/types/types.js";

class BaseConfig implements Config {
	private logger: Logger;

	public ENV: EnvironmentSchema;

	public constructor(logger: Logger) {
		this.logger = logger;

		config();

		this.envSchema.load({});
		this.envSchema.validate({
			allowed: "strict",
			output: (message) => {
				this.logger.info(message);
			},
		});

		this.ENV = this.envSchema.getProperties();
		this.logger.info(".env file found and successfully parsed!");
	}

	private get envSchema(): LibraryConfig<EnvironmentSchema> {
		return convict<EnvironmentSchema>({
			APP: {
				ENVIRONMENT: {
					default: null,
					doc: "Application environment",
					env: "NODE_ENV",
					format: Object.values(AppEnvironment),
				},
				HOST: {
					default: null,
					doc: "Host for server app",
					env: "HOST",
					format: String,
				},
				PORT: {
					default: null,
					doc: "Port for incoming connections",
					env: "PORT",
					format: Number,
				},
			},
			AWS_S3: {
				AWS_ACCESS_KEY_ID: {
					default: null,
					doc: "AWS access key id",
					env: "AWS_ACCESS_KEY_ID",
					format: String,
				},
				AWS_SECRET_ACCESS_KEY: {
					default: null,
					doc: "AWS secret access key",
					env: "AWS_SECRET_ACCESS_KEY",
					format: String,
				},
				S3_BUCKET: {
					default: null,
					doc: "S3 bucket",
					env: "S3_BUCKET",
					format: String,
				},
				S3_REGION: {
					default: null,
					doc: "S3 region",
					env: "S3_REGION",
					format: String,
				},
			},
			DB: {
				CONNECTION_STRING: {
					default: null,
					doc: "Database connection string",
					env: "DB_CONNECTION_STRING",
					format: String,
				},
				DIALECT: {
					default: null,
					doc: "Database dialect",
					env: "DB_DIALECT",
					format: String,
				},
				POOL_MAX: {
					default: null,
					doc: "Database pool max count",
					env: "DB_POOL_MAX",
					format: Number,
				},
				POOL_MIN: {
					default: null,
					doc: "Database pool min count",
					env: "DB_POOL_MIN",
					format: Number,
				},
			},
			JWT: {
				ALGORITHM: {
					default: null,
					doc: "Algorithm for token generation",
					env: "TOKEN_ALGORITHM",
					format: String,
				},
				EXPIRES_IN: {
					default: null,
					doc: "Token expiration time",
					env: "TOKEN_EXPIRES_IN",
					format: String,
				},
				SECRET: {
					default: null,
					doc: "Secret key for token generation",
					env: "SECRET_KEY",
					format: String,
				},
			},
		});
	}
}

export { BaseConfig };
