import {
	ContentType,
	type HTTP,
	HTTPHeader,
	type HTTPOptions,
} from "../http/http.js";
import { UdemyDefaultSearchParameter } from "./libs/enums/enums.js";

type SearchParameters = {
	page?: number;
	pageSize?: number;
	search: string;
};

type Constructor = {
	baseUrl: string;
	clientId: string;
	clientSecret: string;
	fields: {
		course: Record<string, string>;
		courseDetails: Record<string, string>;
	};
	http: HTTP;
};

class Udemy {
	private authHeader: string;
	private baseUrl: string;
	private fields: {
		course: Record<string, string>;
		courseDetails: Record<string, string>;
	};
	private http: HTTP;

	public constructor({
		baseUrl,
		clientId,
		clientSecret,
		fields,
		http,
	}: Constructor) {
		this.authHeader = this.getAuthHeader(clientId, clientSecret);
		this.baseUrl = baseUrl;
		this.fields = fields;
		this.http = http;
	}

	private getAuthHeader(clientId: string, clientSecret: string): string {
		const token = btoa(`${clientId}:${clientSecret}`);
		return `Basic ${token}`;
	}

	private getOptions(query: Record<string, unknown>): HTTPOptions {
		const headers = new Headers();
		headers.append(HTTPHeader.AUTHORIZATION, this.authHeader);
		headers.append(HTTPHeader.CONTENT_TYPE, ContentType.JSON);

		return { headers, method: "GET", payload: null, query };
	}

	public async getCourseDetails(id: number): Promise<Response> {
		const url = `${this.baseUrl}${id}`;
		const options = this.getOptions({
			// "fields[course]": "@all", - to see more fields
			"fields[course]": Object.values(this.fields.courseDetails).join(","),
		});

		return await this.http.load(url, options);
	}

	public async getCourses({
		page = UdemyDefaultSearchParameter.PAGE,
		pageSize = UdemyDefaultSearchParameter.PAGE_SIZE,
		search,
	}: SearchParameters): Promise<Response> {
		/**
		 * Some fields (avg_rating, num_reviews, num_lectures, instructional_level_simple)
		 * will not be returned by Udemy API, if not be in query params (?fields[course]=...).
		 * We can send "?fields[course]=@all", but then Udemy API return too many fields,
		 * and take more time
		 */
		const options = this.getOptions({
			// "fields[course]": Object.values(this.fields.course).join(","),
			page,
			page_size: pageSize,
			search,
		});

		return await this.http.load(this.baseUrl, options);
	}
}

export { Udemy };
