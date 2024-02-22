import { HTTPCode, HTTPError } from "../../../../libs/modules/http/http.js";
import { type ValueOf } from "../../../../libs/types/value-of.type.js";

type Constructor = {
	cause?: unknown;
	message: string;
	status: ValueOf<typeof HTTPCode>;
};

class UserError extends HTTPError {
	public constructor(arguments_: Constructor) {
		super(arguments_);
	}
}

export { UserError };
