import { HTTPError } from "../../../../libs/exceptions/http-error/http-error.exception.js";
import { HTTPCode } from "../../../../libs/modules/http/libs/enums/http-code.enum.js";
import { ValueOf } from "../../../../libs/types/value-of.type.js";

class AuthError extends HTTPError {
	public constructor(message: string, status: ValueOf<typeof HTTPCode>) {
		super({
			message,
			status,
		});
	}
}

export { AuthError };
