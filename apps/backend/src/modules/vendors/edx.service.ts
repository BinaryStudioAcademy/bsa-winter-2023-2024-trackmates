import {
	ContentType,
	type HTTP,
	HTTPCode,
	HTTPHeader,
} from "~/libs/modules/http/http.js";

import {
	EdxApiPath,
	EdxCourseFieldsMapping,
	VendorErrorMessage,
} from "./libs/enums/enums.js";
import { VendorError } from "./libs/exceptions/exceptions.js";
import {
	type Course,
	type CourseSection,
	type VendorService,
} from "./libs/types/types.js";

type Constructor = {
	baseUrl: string;
	http: HTTP;
};

class EdxService implements VendorService {
	private baseUrl: string;
	private http: HTTP;

	public constructor({ baseUrl, http }: Constructor) {
		this.baseUrl = baseUrl;
		this.http = http;
	}

	private getHeaders(): Headers {
		const headers = new Headers();

		headers.append(HTTPHeader.CONTENT_TYPE, ContentType.JSON);

		return headers;
	}

	private load(url: string, query: Record<string, unknown>): Promise<Response> {
		return this.http.load(url, {
			headers: this.getHeaders(),
			method: "GET",
			payload: null,
			query,
		});
	}

	private async loadResults(
		url: string,
		query: Record<string, unknown>,
	): Promise<Record<string, unknown>[]> {
		const result = await this.load(url, query);
		const items = (await result.json()) as Record<"results", unknown>;

		if (!items.results) {
			throw new VendorError({
				message: VendorErrorMessage.WRONG_RESPONSE_FROM_VENDOR_API,
				status: HTTPCode.INTERNAL_SERVER_ERROR,
			});
		}

		return items.results as Record<string, unknown>[];
	}

	private mapItem<FROM_FIELD extends string, TO_FIELD extends string>(
		item: Record<FROM_FIELD, unknown>,
		mapping: Record<TO_FIELD, FROM_FIELD>,
	): Record<TO_FIELD, unknown> {
		const mappingEntries = Object.entries(mapping) as [TO_FIELD, FROM_FIELD][];
		const mappedItem = {} as Record<TO_FIELD, unknown>;

		for (const [to, from] of mappingEntries) {
			mappedItem[to] = item[from];
		}

		return mappedItem;
	}

	private mapToCourse(item: Record<string, unknown>): Course {
		const course = this.mapItem(item, EdxCourseFieldsMapping);

		const media = item["media"] as Record<string, unknown>;
		const courseImage = media["course_image"] as Record<string, unknown>;

		course.image = `${this.baseUrl}${courseImage["uri"] as string}`;
		course.url = "https://www.edx.org/" as string;

		return course as Course;
	}

	public async getCourseById(id: string): Promise<Course> {
		const result = await this.load(
			`${this.baseUrl}${EdxApiPath.COURSES}${id}`,
			{},
		);
		const item = (await result.json()) as Record<string, unknown>;

		return this.mapToCourse(item);
	}

	public async getCourseSections(vendorId: string): Promise<CourseSection[]> {
		await Promise.resolve(vendorId);

		return [];
	}

	public async getCourses(search: string): Promise<Course[]> {
		const query: Record<string, unknown> = {
			search_term: search,
		};

		const result = await this.loadResults(
			`${this.baseUrl}${EdxApiPath.COURSES}`,
			query,
		);

		return result.map((item) => this.mapToCourse(item));
	}
}

export { EdxService };
