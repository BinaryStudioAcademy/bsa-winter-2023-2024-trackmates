import {
	ContentType,
	type HTTP,
	HTTPCode,
	HTTPHeader,
} from "~/libs/modules/http/http.js";
// import from ~/modules/courses/courses.ts here causes round dependency
// and error "ReferenceError: Cannot access 'UserModel' before initialization"
import { CourseError } from "~/modules/courses/libs/exceptions/exceptions.js";

import {
	CourseField,
	UdemyDefaultSearchParameter,
} from "./libs/enums/enums.js";
import { type VendorService } from "./libs/types/types.js";

type Constructor = {
	baseUrl: string;
	clientId: string;
	clientSecret: string;
	http: HTTP;
};

class UdemyService implements VendorService {
	private baseUrl: string;
	private clientId: string;
	private clientSecret: string;
	private http: HTTP;

	public constructor({ baseUrl, clientId, clientSecret, http }: Constructor) {
		this.baseUrl = baseUrl;
		this.clientId = clientId;
		this.clientSecret = clientSecret;
		this.http = http;
	}

	private gethHeaders(): Headers {
		const headers = new Headers();
		const token = btoa(`${this.clientId}:${this.clientSecret}`);

		headers.append(HTTPHeader.AUTHORIZATION, `Basic ${token}`);
		headers.append(HTTPHeader.CONTENT_TYPE, ContentType.JSON);

		return headers;
	}

	private load(url: string, query: Record<string, unknown>): Promise<Response> {
		return this.http.load(url, {
			headers: this.gethHeaders(),
			method: "GET",
			payload: null,
			query,
		});
	}

	public async getCourseById(id: string): Promise<Record<string, unknown>> {
		const query = {
			"fields[course]": Object.values(CourseField).join(","),
		};
		const result = await this.load(`${this.baseUrl}${id}`, query);

		return (await result.json()) as Record<string, unknown>;
	}

	public async getCourses(search: string): Promise<Record<string, unknown>[]> {
		const query: Record<string, unknown> = {
			"fields[course]": Object.values(CourseField).join(","),
			page: UdemyDefaultSearchParameter.PAGE,
			page_size: UdemyDefaultSearchParameter.PAGE_SIZE,
		};

		if (search) {
			query["search"] = search;
		}

		const result = await this.load(this.baseUrl, query).then(
			async (result) => (await result.json()) as Record<"results", unknown>,
		);

		if (!result.results) {
			throw new CourseError(
				"Wrong response from Udemy API",
				HTTPCode.INTERNAL_SERVER_ERROR,
			);
		}

		return result.results as Record<string, unknown>[];
	}
}

export { UdemyService };
