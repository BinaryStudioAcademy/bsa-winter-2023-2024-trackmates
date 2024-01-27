import { AppEnvironment } from "~/libs/enums/enums.js";
import { ValueOf } from "~/libs/types/types.js";

type EnvironmentSchema = {
  APP: {
    ENVIRONMENT: ValueOf<typeof AppEnvironment>;
  };
  API: {
    ORIGIN_URL: string;
  };
};

export { type EnvironmentSchema };
