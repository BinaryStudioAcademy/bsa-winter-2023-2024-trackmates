import { type CourseDto } from "shared";

type VendorService = {
	getCourseById(
		id: string,
	): Promise<
		Pick<
			CourseDto,
			"description" | "image" | "title" | "url" | "vendorCourseId"
		>
	>;
	getCourses(
		search: string,
	): Promise<
		Pick<
			CourseDto,
			"description" | "image" | "title" | "url" | "vendorCourseId"
		>[]
	>;
};

export { type VendorService };
