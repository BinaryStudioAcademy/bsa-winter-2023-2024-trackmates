import { CourseDto } from "./types.js";

type CourseFieldsMapping = Record<
	keyof Omit<CourseDto, "id" | "vendor">,
	string
>;

export { type CourseFieldsMapping };
