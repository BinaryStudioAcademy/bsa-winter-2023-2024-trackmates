import { AppEnvironment } from "~/libs/enums/enums.ts";
import { ValueOf } from "~/libs/types/types.ts";

type EnvironmentSchema = {
	API: {
		ORIGIN_URL: string;
	};
	APP: {
		ENVIRONMENT: ValueOf<typeof AppEnvironment>;
	};
};

export { type EnvironmentSchema };
