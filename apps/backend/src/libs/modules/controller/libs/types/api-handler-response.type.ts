import { type HTTPCode } from "~/libs/modules/http/http.js";
import { type ValueOf } from "~/libs/types/types.js";

type APIHandlerResponse = {
	status: ValueOf<typeof HTTPCode>;
	payload: unknown;
};

export { type APIHandlerResponse };
