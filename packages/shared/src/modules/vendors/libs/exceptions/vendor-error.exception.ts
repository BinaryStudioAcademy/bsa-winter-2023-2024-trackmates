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

class VendorError extends HTTPError {
	public constructor(arguments_: Constructor) {
		super(arguments_);
	}
}

export { VendorError };
