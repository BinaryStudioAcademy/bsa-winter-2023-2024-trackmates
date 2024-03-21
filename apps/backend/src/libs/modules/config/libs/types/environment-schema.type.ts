import { type AppEnvironment } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";

type EnvironmentSchema = {
	APP: {
		ENVIRONMENT: ValueOf<typeof AppEnvironment>;
		HOST: string;
		PORT: number;
	};
	AWS: {
		ACCESS_KEY: string;
		REGION: string;
		S3_BUCKET: string;
		SECRET_KEY: string;
		SES_SENDER: string;
	};
	DB: {
		CONNECTION_STRING: string;
		DIALECT: string;
		POOL_MAX: number;
		POOL_MIN: number;
	};
	EDX: {
		URL: string;
	};
	JWT: {
		ALGORITHM: string;
		EXPIRES_IN: string;
		SECRET: string;
	};
	OPENAI: {
		API_KEY: string;
		MODEL: string;
	};
	STRIPE: {
		SECRET_KEY: string;
	};
	UDEMY: {
		CLIENT_ID: string;
		CLIENT_SECRET: string;
		URL: string;
	};
	UPDATE_PASSWORD: {
		JWT: {
			ALGORITHM: string;
			EXPIRES_IN: string;
			SECRET: string;
		};
		LINK: string;
	};
};

export { type EnvironmentSchema };
