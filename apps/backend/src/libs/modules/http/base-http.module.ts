import { type ValueOf } from "~/libs/types/types.js";

import {
	type HTTPCode,
	HTTPError,
	type HTTPOptions,
} from "./libs/enums/enums.js";
import { type HTTP } from "./libs/types/types.js";

class BaseHTTP implements HTTP {
	private checkStatus = async (response: Response): Promise<Response> => {
		if (!response.ok) {
			const parsedException = (await response.json().catch(() => ({
				message: response.statusText,
			}))) as Record<"message", string>;

			throw new HTTPError({
				message: parsedException.message,
				status: response.status as ValueOf<typeof HTTPCode>,
			});
		}

		return response;
	};

	private getUrl = (url: string, query?: Record<string, unknown>): string => {
		if (query) {
			const queryParameters = new URLSearchParams(
				query as Record<string, string>,
			);

			return `${url}?${queryParameters.toString()}`;
		}

		return url;
	};

	private throwError = (error: Error): never => {
		throw error;
	};

	public async load(url: string, options: HTTPOptions): Promise<Response> {
		const { headers, method, payload, query = {} } = options;

		return await fetch(this.getUrl(url, query), {
			body: payload,
			headers,
			method,
		})
			.then(this.checkStatus)
			.catch(this.throwError);
	}
}

export { BaseHTTP };
