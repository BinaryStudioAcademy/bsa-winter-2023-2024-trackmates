import { type CourseSectionDto } from "~/modules/course-sections/course-sections.js";
import { type CourseDto } from "~/modules/courses/courses.js";

import { type CourseFieldForMap } from "./course-field-for-map.type.js";
import { type CourseSectionFieldForMap } from "./course-section-field-for-map.type.js";

type Course = Pick<CourseDto, CourseFieldForMap>;

type CourseSection = Pick<CourseSectionDto, CourseSectionFieldForMap>;

type VendorService = {
	getCourseById(id: string): Promise<Course>;
	getCourseSections(udemyId: string): Promise<CourseSection[]>;
	getCourses(search: string): Promise<Course[]>;
};

export { type Course, type CourseSection, type VendorService };
