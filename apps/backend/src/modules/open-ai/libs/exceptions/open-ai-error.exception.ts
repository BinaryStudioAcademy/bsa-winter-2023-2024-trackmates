import { ApplicationError } from "~/libs/exceptions/exceptions.js";

type Constructor = {
	cause?: unknown;
	message: string;
};

class OpenAiError extends ApplicationError {
	public constructor({ cause, message }: Constructor) {
		super({ cause, message });
	}
}

export { OpenAiError };
