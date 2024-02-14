import { HTTPOptions } from "shared";

import { HTTPHeader, Http } from "../http/http.js";
import { ApiPath } from "./libs/enums/enums.js";
import { SearchParameters, Udemy } from "./libs/types/udemy.type.js";

type Constructor = {
	baseUrl: string;
	clientId: string;
	clientSecret: string;
	fields: {
		course: Record<string, string>;
		courseCurriculum: Record<string, string>;
		courseDetails: Record<string, string>;
	};
	http: Http;
};

class BasseUdemy<C, CD, CC> implements Udemy<C, CD, CC> {
	private authHeader: string;
	private baseUrl: string;
	private fields: {
		course: Record<string, string>;
		courseCurriculum: Record<string, string>;
		courseDetails: Record<string, string>;
	};
	private http: Http;

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

	private getOptions(query: Record<string, unknown>): Partial<HTTPOptions> {
		const headers = new Headers();
		headers.append(HTTPHeader.AUTHORIZATION, this.authHeader);

		return { headers, query };
	}

	public async getCourseCurriculums(id: number): Promise<CC | null> {
		const url = `${this.baseUrl}${id}${ApiPath.COURSE_CURRICULUM}`;
		const fields = Object.values(this.fields.courseCurriculum).join(",");
		const options = this.getOptions({
			/**
			 * Not describe in documentation, but without it field 'content_summary',
			 * will not be returned. To see more fields "@all" can be used here too.
			 */
			"fields[chapter]": fields,
			"fields[lecture]": fields,
			"fields[quiz]": fields,
		});

		return await this.http.load<CC>(url, options);
	}

	public async getCourseDetails(id: number): Promise<CD | null> {
		const url = `${this.baseUrl}${id}`;
		const options = this.getOptions({
			// "fields[course]": "@all", - to see more fields
			"fields[course]": Object.values(this.fields.courseDetails).join(","),
		});

		return await this.http.load<CD>(url, options);
	}

	//TODO add defaults params
	public async getCourses({
		page,
		pageSize,
		search,
	}: SearchParameters): Promise<C[]> {
		const url = `${this.baseUrl}${ApiPath.COURSES}`;

		/**
		 * Some fields (avg_rating, num_reviews, num_lectures, instructional_level_simple)
		 * will not be returned by Udemy API, if not be in query params (?fields[course]=...).
		 * We can send "?fields[course]=@all", but then Udemy API return too many fields,
		 * and take more time
		 */
		const options = this.getOptions({
			"fields[course]": Object.values(this.fields.course).join(","),
			page,
			page_size: pageSize,
			search,
		});

		return await this.http.load<C[]>(url, options);
	}
}

export { BasseUdemy };
