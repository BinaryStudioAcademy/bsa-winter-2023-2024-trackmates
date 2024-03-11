import {
	type HTTPCode,
	HTTPError,
} from "../../../../libs/modules/http/http.js";
import { type ValueOf } from "../../../../libs/types/types.js";

type Constructor = {
	cause?: unknown;
	message: string;
	status: ValueOf<typeof HTTPCode>;
};

class PushSubscriptionError extends HTTPError {
	public constructor({ cause, message, status }: Constructor) {
		super({ cause, message, status });
	}
}

export { PushSubscriptionError };
