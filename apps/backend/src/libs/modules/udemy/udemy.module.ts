import {
	ContentType,
	type HTTP,
	HTTPHeader,
	type HTTPOptions,
} from "../http/http.js";
import {
	CourseDetailsField,
	CourseField,
	UdemyDefaultSearchParameter,
} from "./libs/enums/enums.js";

type SearchParameters = {
	page?: number;
	pageSize?: number;
	search?: string;
};

type Constructor = {
	baseUrl: string;
	clientId: string;
	clientSecret: string;
	http: HTTP;
};

class Udemy {
	private authHeader: string;
	private baseUrl: string;
	private http: HTTP;

	public constructor({ baseUrl, clientId, clientSecret, http }: Constructor) {
		this.authHeader = this.getAuthHeader(clientId, clientSecret);
		this.baseUrl = baseUrl;
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
			"fields[course]": Object.values(CourseDetailsField).join(","),
		});

		return await this.http.load(url, options);
	}

	public async getCourses({
		page = UdemyDefaultSearchParameter.PAGE,
		pageSize = UdemyDefaultSearchParameter.PAGE_SIZE,
		search,
	}: SearchParameters): Promise<Response> {
		const query = {
			"fields[course]": Object.values(CourseField).join(","),
			page,
			page_size: pageSize,
		};

		const options = this.getOptions(search ? { ...query, search } : query);

		return await this.http.load(this.baseUrl, options);
	}
}

export { Udemy };
