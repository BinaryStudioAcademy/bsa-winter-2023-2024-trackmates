import { type CourseDto } from "shared";

import { type CourseFieldForMap } from "./course-field-for-map.type.js";

type VendorService = {
	getCourseById(id: string): Promise<Pick<CourseDto, CourseFieldForMap>>;
	getCourses(search: string): Promise<Pick<CourseDto, CourseFieldForMap>[]>;
};

export { type VendorService };
