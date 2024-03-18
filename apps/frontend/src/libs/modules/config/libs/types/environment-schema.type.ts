import { type AppEnvironment } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";

type EnvironmentSchema = {
	API: {
		ORIGIN_URL: string;
		SOCKET_SERVER_URL: string;
	};
	APP: {
		ENVIRONMENT: ValueOf<typeof AppEnvironment>;
	};
	STRIPE: {
		PUBLIC_KEY: string;
	};
};

export { type EnvironmentSchema };
