import { PaginationValue } from "~/libs/enums/enums.js";
import {
	ContentType,
	type HTTP,
	HTTPCode,
	HTTPHeader,
} from "~/libs/modules/http/http.js";

import {
	CourseField,
	CourseSectionField,
	UdemyApiPath,
	UdemyPageParameter,
	VendorErrorMessage,
} from "./libs/enums/enums.js";
import { VendorError } from "./libs/exceptions/exceptions.js";
import {
	udemyCourseSectionToCourseSection,
	udemyCourseToCourse,
} from "./libs/maps/maps.js";
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

	private async loadAllPages(
		url: string,
		query: Record<string, unknown>,
	): Promise<Record<string, unknown>[]> {
		let items: Record<string, unknown>[] = [];
		let results = [];
		let page = 0;

		do {
			page = page + UdemyPageParameter.STEP;
			results = await this.loadResults(url, {
				...query,
				page,
				page_size: UdemyPageParameter.SIZE,
			});
			items = [...items, ...results];
		} while (results.length === UdemyPageParameter.SIZE);

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
		const course = this.mapItem(item, udemyCourseToCourse);

		const vendorCourseId = (
			course.vendorCourseId as number | string
		).toString();

		return { ...course, vendorCourseId } as Course;
	}

	private mapToCourseSection(item: Record<string, unknown>): CourseSection {
		return this.mapItem(
			item,
			udemyCourseSectionToCourseSection,
		) as CourseSection;
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
		const url = `${this.baseUrl}${udemyId}${UdemyApiPath.COURSE_SECTIONS}`;

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

	public async getCourses(page: number, search: string): Promise<Course[]> {
		const query: Record<string, unknown> = {
			"fields[course]": Object.values(CourseField).join(","),
			page,
			page_size: PaginationValue.DEFAULT_COUNT,
		};

		if (search) {
			query["search"] = search;
		}

		const results = await this.loadResults(this.baseUrl, query);

		return results.map((item) => this.mapToCourse(item));
	}
}

export { UdemyService };
