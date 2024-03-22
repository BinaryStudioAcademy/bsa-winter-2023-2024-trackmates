import { type CourseDto } from "~/modules/courses/courses.js";

import { type CoursesTableRow } from "../../types/types.js";

const getCourseData = (courses: CourseDto[]): CoursesTableRow[] => {
	return courses.map(({ description, id, title, vendor }) => {
		return {
			description,
			id: Number(id),
			title,
			vendor: vendor.key,
		};
	});
};

export { getCourseData };
