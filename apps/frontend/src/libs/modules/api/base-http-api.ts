import { type ContentType, ServerErrorType } from "~/libs/enums/enums.ts";
import { configureString } from "~/libs/helpers/helpers.ts";
import {
	type HTTP,
	type HTTPCode,
	HTTPError,
	HTTPHeader,
} from "~/libs/modules/http/http.ts";
import { type Storage, StorageKey } from "~/libs/modules/storage/storage.ts";
import { type ServerErrorResponse, type ValueOf } from "~/libs/types/types.ts";

import {
	type HTTPApi,
	type HTTPApiOptions,
	type HTTPApiResponse,
} from "./libs/types/types.ts";

type Constructor = {
	baseUrl: string;
	path: string;
	http: HTTP;
	storage: Storage;
};

class BaseHttpApi implements HTTPApi {
	private baseUrl: string;

	private path: string;

	private http: HTTP;

	private storage: Storage;

	public constructor({ baseUrl, path, http, storage }: Constructor) {
		this.baseUrl = baseUrl;
		this.path = path;
		this.http = http;
		this.storage = storage;
	}

	public async load(
		path: string,
		options: HTTPApiOptions,
	): Promise<HTTPApiResponse> {
		const { method, contentType, payload = null, hasAuth } = options;

		const headers = await this.getHeaders(contentType, hasAuth);

		const response = await this.http.load(path, {
			method,
			headers,
			payload,
		});

		return (await this.checkResponse(response)) as HTTPApiResponse;
	}

	protected getFullEndpoint<T extends Record<string, string>>(
		...parameters: [...string[], T]
	): string {
		const copiedParameters = [...parameters];

		const options = copiedParameters.pop() as T;

		return configureString(
			this.baseUrl,
			this.path,
			...(copiedParameters as string[]),
			options,
		);
	}

	private async getHeaders(
		contentType: ValueOf<typeof ContentType>,
		hasAuth: boolean,
	): Promise<Headers> {
		const headers = new Headers();

		headers.append(HTTPHeader.CONTENT_TYPE, contentType);

		if (hasAuth) {
			const token = await this.storage.get<string>(StorageKey.TOKEN);

			headers.append(HTTPHeader.AUTHORIZATION, `Bearer ${token ?? ""}`);
		}

		return headers;
	}

	private async checkResponse(response: Response): Promise<Response> {
		if (!response.ok) {
			await this.handleError(response);
		}

		return response;
	}

	private async handleError(response: Response): Promise<never> {
		let parsedException: ServerErrorResponse;

		try {
			parsedException = (await response.json()) as ServerErrorResponse;
		} catch {
			parsedException = {
				errorType: ServerErrorType.COMMON,
				message: response.statusText,
			};
		}

		const isCustomException = Boolean(parsedException.errorType);

		throw new HTTPError({
			status: response.status as ValueOf<typeof HTTPCode>,
			errorType: isCustomException
				? parsedException.errorType
				: ServerErrorType.COMMON,
			message: parsedException.message,
			details: "details" in parsedException ? parsedException.details : [],
		});
	}
}

export { BaseHttpApi };
