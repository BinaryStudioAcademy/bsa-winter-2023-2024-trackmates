import { AppEnvironment } from "~/libs/enums/enums.ts";
import { ValueOf } from "~/libs/types/types.ts";

type EnvironmentSchema = {
	APP: {
		ENVIRONMENT: ValueOf<typeof AppEnvironment>;
	};
	API: {
		ORIGIN_URL: string;
	};
};

export { type EnvironmentSchema };
