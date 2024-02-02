import { HTTPError as LibraryHTTPError } from "shared";

import { type ServerErrorType } from "~/libs/enums/enums.ts";
import { type ServerErrorDetail, type ValueOf } from "~/libs/types/types.ts";

import { type HTTPCode } from "../enums/enums.ts";

type Constructor = {
	cause?: unknown;
	details: ServerErrorDetail[];
	errorType: ValueOf<typeof ServerErrorType>;
	message: string;
	status: ValueOf<typeof HTTPCode>;
};

class HTTPError extends LibraryHTTPError {
	public details: ServerErrorDetail[];

	public errorType: ValueOf<typeof ServerErrorType>;

	public constructor({
		cause,
		details,
		errorType,
		message,
		status,
	}: Constructor) {
		super({
			cause,
			message,
			status,
		});

		this.errorType = errorType;
		this.details = details;
	}
}

export { HTTPError };
