import { HTTPError as LibraryHTTPError } from "shared/build/index.js";

import { type ServerErrorType } from "~/libs/enums/enums.ts";
import { type ServerErrorDetail, type ValueOf } from "~/libs/types/types.ts";

import { type HTTPCode } from "../enums/enums.ts";

type Constructor = {
	status: ValueOf<typeof HTTPCode>;
	details: ServerErrorDetail[];
	message: string;
	errorType: ValueOf<typeof ServerErrorType>;
	cause?: unknown;
};

class HTTPError extends LibraryHTTPError {
	public errorType: ValueOf<typeof ServerErrorType>;

	public details: ServerErrorDetail[];

	public constructor({
		message,
		status,
		cause,
		errorType,
		details,
	}: Constructor) {
		super({
			message,
			status,
			cause,
		});

		this.errorType = errorType;
		this.details = details;
	}
}

export { HTTPError };
