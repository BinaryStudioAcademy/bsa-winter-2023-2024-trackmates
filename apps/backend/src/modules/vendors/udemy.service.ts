import {
	ContentType,
	type HTTP,
	HTTPCode,
	HTTPHeader,
} from "~/libs/modules/http/http.js";
import { type CourseDto } from "~/modules/courses/libs/types/types.js";

import {
	CourseField,
	UdemyDefaultSearchParameter,
	UdemyFieldsMapping,
	VendorErrorMessage,
} from "./libs/enums/enums.js";
import { VendorError } from "./libs/exceptions/exceptions.js";
import { type CourseFieldForMap } from "./libs/types/course-field-for-map.type.js";
import { type VendorService } from "./libs/types/types.js";

type Course = Pick<CourseDto, CourseFieldForMap>;

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

	private getHeaders(): Headers {
		const headers = new Headers();
		const token = btoa(`${this.clientId}:${this.clientSecret}`);

		headers.append(HTTPHeader.AUTHORIZATION, `Basic ${token}`);
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

	private mapItemFields<T extends string>(
		item: Record<string, unknown>,
		mapping: Record<T, string>,
	): Record<T, unknown> {
		const mappingEntries = Object.entries(mapping) as [T, string][];
		const course = {} as Record<T, unknown>;

		for (const [to, from] of mappingEntries) {
			course[to] = item[from];
		}

		return course;
	}

	private mapToCourse(item: Record<string, unknown>): Course {
		const course = this.mapItemFields<CourseFieldForMap>(
			item,
			UdemyFieldsMapping,
		);

		const vendorCourseId = (
			course.vendorCourseId as number | string
		).toString();

		return { ...course, vendorCourseId } as Course;
	}

	public async getCourseById(id: string): Promise<Course> {
		const query = {
			"fields[course]": Object.values(CourseField).join(","),
		};
		const result = await this.load(`${this.baseUrl}${id}`, query);
		const item = (await result.json()) as Record<string, unknown>;

		return this.mapToCourse(item);
	}

	public async getCourses(search: string): Promise<Course[]> {
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
			throw new VendorError({
				message: VendorErrorMessage.WRONG_RESPONSE_FROM_VENDOR_API,
				status: HTTPCode.INTERNAL_SERVER_ERROR,
			});
		}

		return (result.results as Record<string, unknown>[]).map((item) =>
			this.mapToCourse(item),
		);
	}
}

export { UdemyService };
