import { type AppEnvironment } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";

type EnvironmentSchema = {
	APP: {
		ENVIRONMENT: ValueOf<typeof AppEnvironment>;
		HOST: string;
		PORT: number;
	};
	AWS_S3: {
		AWS_ACCESS_KEY_ID: string;
		AWS_SECRET_ACCESS_KEY: string;
		S3_BUCKET: string;
		S3_REGION: string;
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
	FORGOT_PASSWORD: {
		RESET_PASSWORD_BASE_LINK: string;
	};
	JWT: {
		ALGORITHM: string;
		EXPIRES_IN: string;
		SECRET: string;
	};
	MAIL: {
		SERVICE: string;
		USER_EMAIL: string;
		USER_NAME: string;
		USER_PASSWORD: string;
	};
	OPENAI: {
		API_KEY: string;
		MODEL: string;
	};
	UDEMY: {
		CLIENT_ID: string;
		CLIENT_SECRET: string;
		URL: string;
	};
};

export { type EnvironmentSchema };
