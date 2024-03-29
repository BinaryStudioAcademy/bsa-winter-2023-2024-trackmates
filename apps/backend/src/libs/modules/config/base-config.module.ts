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
			AWS: {
				ACCESS_KEY: {
					default: null,
					doc: "AWS access key",
					env: "AWS_ACCESS_KEY",
					format: String,
				},
				REGION: {
					default: null,
					doc: "AWS region",
					env: "AWS_REGION",
					format: String,
				},
				S3_BUCKET: {
					default: null,
					doc: "AWS S3 bucket",
					env: "S3_BUCKET",
					format: String,
				},
				SECRET_KEY: {
					default: null,
					doc: "AWS secret key",
					env: "AWS_SECRET_KEY",
					format: String,
				},
				SES_SENDER: {
					default: null,
					doc: "AWS SES sender",
					env: "SES_SENDER",
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
			EDX: {
				URL: {
					default: null,
					doc: "edX API url",
					env: "EDX_URL",
					format: String,
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
			OPENAI: {
				API_KEY: {
					default: null,
					doc: "OpenAI API key",
					env: "OPENAI_API_KEY",
					format: String,
				},
				MODEL: {
					default: null,
					doc: "OpenAI model",
					env: "OPENAI_MODEL",
					format: String,
				},
			},
			STRIPE: {
				SECRET_KEY: {
					default: null,
					doc: "Stripe secret key",
					env: "STRIPE_SECRET_KEY",
					format: String,
				},
			},
			UDEMY: {
				CLIENT_ID: {
					default: null,
					doc: "Udemy Affiliate ClientId",
					env: "UDEMY_CLIENT_ID",
					format: String,
				},
				CLIENT_SECRET: {
					default: null,
					doc: "Udemy Affiliate ClientSecret",
					env: "UDEMY_CLIENT_SECRET",
					format: String,
				},
				URL: {
					default: null,
					doc: "API url",
					env: "UDEMY_URL",
					format: String,
				},
			},
			UPDATE_PASSWORD: {
				JWT: {
					ALGORITHM: {
						default: null,
						doc: "Algorithm for token generation",
						env: "UPDATE_PASSWORD_TOKEN_ALGORITHM",
						format: String,
					},
					EXPIRES_IN: {
						default: null,
						doc: "Token expiration time",
						env: "UPDATE_PASSWORD_TOKEN_EXPIRES_IN",
						format: String,
					},
					SECRET: {
						default: null,
						doc: "Secret key for token generation",
						env: "UPDATE_PASSWORD_SECRET_KEY",
						format: String,
					},
				},
				LINK: {
					default: null,
					doc: "Update password base link",
					env: "UPDATE_PASSWORD_LINK",
					format: String,
				},
			},
		});
	}
}

export { BaseConfig };
