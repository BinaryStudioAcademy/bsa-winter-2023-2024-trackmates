import { type HTTPCode } from "~/libs/enums/enums.js";
import { HTTPError } from "~/libs/exceptions/exceptions.js";
import { type ValueOf } from "~/libs/types/types.js";

type Constructor = {
	cause?: unknown;
	message: string;
	status: ValueOf<typeof HTTPCode>;
};

class OpenAIError extends HTTPError {
	public constructor({ cause, message, status }: Constructor) {
		super({ cause, message, status });
	}
}

export { OpenAIError };
