import { type ValueOf } from "~/libs/types/types.js";

import {
	ContentType,
	HTTPCode,
	HTTPError,
	HTTPHeader,
	type HTTPOptions,
} from "./libs/enums/enums.js";
import { queryString } from "./libs/helpers/helpers.js";
import { Http } from "./libs/types/types.js";

// TODO there is already exists HTTPMethod type in shared dir
// what to do with it?
const HTTPMethod = {
	DELETE: "DELETE",
	GET: "GET",
	POST: "POST",
	PUT: "PUT",
} as const;

class BaseHttp implements Http {
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
			return `${url}?${queryString.stringify(query)}`;
		}

		return url;
	};

	private parseJSON = <T>(response: Response): Promise<T> => {
		return response.json() as Promise<T>;
	};

	private throwError = (error: Error): never => {
		throw error;
	};

	private getHeaders(headers: Headers): Headers {
		headers.append(HTTPHeader.CONTENT_TYPE, ContentType.JSON.toString());
		return headers;
	}

	public async load<T>(
		url: string,
		options: Partial<HTTPOptions> = {},
	): Promise<T> | never {
		const {
			headers = new Headers(),
			method = HTTPMethod.GET,
			payload = null,
			query = {},
		} = options;

		return await fetch(this.getUrl(url, query), {
			body: payload,
			headers: this.getHeaders(headers),
			method,
		})
			.then(this.checkStatus)
			.then<T>(this.parseJSON)
			.catch(this.throwError);
	}
}

export { BaseHttp };
