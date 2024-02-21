import { HTTPCode, HTTPError } from "../../../../libs/modules/http/http.js";
import { ValueOf } from "../../../../libs/types/types.js";

class CourseError extends HTTPError {
	public constructor(message: string, status: ValueOf<typeof HTTPCode>) {
		super({ message, status });
	}
}

export { CourseError };
