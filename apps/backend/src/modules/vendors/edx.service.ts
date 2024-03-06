import {
	ContentType,
	type HTTP,
	HTTPHeader,
} from "~/libs/modules/http/http.js";

import { EdxApiPath } from "./libs/enums/enums.js";
import { edxCourseToCourse } from "./libs/maps/maps.js";
import {
	type Course,
	type CourseFieldsMapping,
	type CourseSection,
	type EdxCourseResponseDto,
	type EdxQuery,
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

	private load(url: string, query: EdxQuery): Promise<Response> {
		return this.http.load(url, {
			headers: this.getHeaders(),
			method: "GET",
			payload: null,
			query,
		});
	}

	private mapItem<
		FROM_FIELD extends keyof EdxCourseResponseDto,
		TO_FIELD extends keyof CourseFieldsMapping,
	>(
		item: EdxCourseResponseDto,
		mapping: CourseFieldsMapping,
	): Record<TO_FIELD, EdxCourseResponseDto[FROM_FIELD]> {
		const mappingEntries = Object.entries(mapping) as [TO_FIELD, FROM_FIELD][];
		const mappedItem = {} as Record<TO_FIELD, EdxCourseResponseDto[FROM_FIELD]>;

		for (const [to, from] of mappingEntries) {
			mappedItem[to] = item[from];
		}

		return mappedItem;
	}

	private mapToCourse(item: EdxCourseResponseDto): Course {
		const course = this.mapItem(item, edxCourseToCourse);

		const media = item["media"];
		const courseImage = media["course_image"];

		course.image = `${this.baseUrl}${courseImage["uri"]}`;
		course.url = "https://www.edx.org/";

		return course as Course;
	}

	public async getCourseById(id: string): Promise<Course> {
		const result = await this.load(
			`${this.baseUrl}${EdxApiPath.COURSES}${id}`,
			{},
		);
		const item = (await result.json()) as EdxCourseResponseDto;

		return this.mapToCourse(item);
	}

	public async getCourseSections(vendorId: string): Promise<CourseSection[]> {
		await Promise.resolve(vendorId);

		return [];
	}

	public async getCourses(search: string): Promise<Course[]> {
		const query: EdxQuery = {
			search_term: search,
		};

		const result = await this.load(
			`${this.baseUrl}${EdxApiPath.COURSES}`,
			query,
		);

		const items = (await result.json()) as Record<
			"results",
			EdxCourseResponseDto[]
		>;

		return items.results.map((item) => this.mapToCourse(item));
	}
}

export { EdxService };
