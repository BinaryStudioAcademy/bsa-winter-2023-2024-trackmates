import {
	ContentType,
	type HTTP,
	HTTPCode,
	HTTPHeader,
} from "~/libs/modules/http/http.js";

import {
	udemyCourseFieldsMapper,
	udemyCourseSectionFieldsMapper,
} from "./fields-mapper/fields-mapper.js";
import {
	ApiPath,
	CourseField,
	CourseSectionField,
	UdemyDefaultPageParameter,
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
	clientId: string;
	clientSecret: string;
	http: HTTP;
};

const PAGE_STEP = 1;

class UdemyService implements VendorService {
	private baseUrl: string;
	private clientId: string;
	private clientSecret: string;
	private courseMapper = udemyCourseFieldsMapper;
	private courseSectionMapper = udemyCourseSectionFieldsMapper;
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

	private async loadAllPages(
		url: string,
		query: Record<string, unknown>,
	): Promise<Record<string, unknown>[]> {
		const pageSize = UdemyDefaultPageParameter.PAGE_SIZE;
		let items: Record<string, unknown>[] = [];
		let results = [];
		let page = 0;

		do {
			page = page + PAGE_STEP;
			results = await this.loadResults(url, {
				...query,
				page,
				page_size: pageSize,
			});
			items = [...items, ...results];
		} while (results.length == pageSize);

		return items;
	}

	private async loadResults(
		url: string,
		query: Record<string, unknown>,
	): Promise<Record<string, unknown>[]> {
		const result = await this.load(url, query);
		const data = (await result.json()) as Record<"results", unknown>;

		if (!data.results) {
			throw new VendorError({
				message: VendorErrorMessage.WRONG_RESPONSE_FROM_VENDOR_API,
				status: HTTPCode.INTERNAL_SERVER_ERROR,
			});
		}

		return data.results as Record<string, unknown>[];
	}

	private mapToCourse(item: Record<string, unknown>): Course {
		const course = this.courseMapper.mapItem(item);

		const vendorCourseId = (
			course.vendorCourseId as number | string
		).toString();

		return { ...course, vendorCourseId } as Course;
	}

	private mapToCourseSection(item: Record<string, unknown>): CourseSection {
		return this.courseSectionMapper.mapItem(item) as CourseSection;
	}

	public async getCourseById(id: string): Promise<Course> {
		const query = {
			"fields[course]": Object.values(CourseField).join(","),
		};
		const result = await this.load(`${this.baseUrl}${id}`, query);
		const item = (await result.json()) as Record<string, unknown>;

		return this.mapToCourse(item);
	}

	public async getCourseSections(udemyId: string): Promise<CourseSection[]> {
		const url = `${this.baseUrl}${udemyId}${ApiPath.COURSE_SECTIONS}`;

		const query: Record<string, unknown> = {
			"fields[chapter]": Object.values(CourseSectionField).join(","),
		};

		const items = await this.loadAllPages(url, query);
		const orderField = CourseSectionField["SORT_ORDER"] as string;

		const compare = (
			item1: Record<string, unknown>,
			item2: Record<string, unknown>,
		): number => (item2[orderField] as number) - (item1[orderField] as number);

		return items
			.filter((item) => item["_class"] === "chapter")
			.sort((item1, item2) => compare(item1, item2))
			.map((item) => this.mapToCourseSection(item));
	}

	public async getCourses(search: string): Promise<Course[]> {
		const query: Record<string, unknown> = {
			"fields[course]": Object.values(CourseField).join(","),
			page: UdemyDefaultPageParameter.PAGE,
			page_size: UdemyDefaultPageParameter.PAGE_SIZE,
		};

		if (search) {
			query["search"] = search;
		}

		const results = await this.loadResults(this.baseUrl, query);

		return results.map((item) => this.mapToCourse(item));
	}
}

export { UdemyService };
