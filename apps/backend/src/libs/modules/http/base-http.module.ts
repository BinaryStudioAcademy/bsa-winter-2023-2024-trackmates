import { type ValueOf } from "~/libs/types/types.js";

import { HTTPCode, HTTPError, type HTTPOptions } from "./libs/enums/enums.js";
import { HTTP } from "./libs/types/types.js";

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

	private getUrl = <T extends Record<string, unknown>>(
		url: string,
		query: T | undefined,
	): string => {
		if (query) {
			const newUrl = new URL(url);
			for (const [key, value] of Object.entries(query)) {
				newUrl.searchParams.set(key, value as string);
			}

			return newUrl.toString();
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
