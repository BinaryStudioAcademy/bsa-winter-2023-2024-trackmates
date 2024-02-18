import { type CourseDto } from "./types.js";

type CourseOpenAIRequest = Pick<CourseDto, "description" | "id" | "title">[];

export { type CourseOpenAIRequest };
