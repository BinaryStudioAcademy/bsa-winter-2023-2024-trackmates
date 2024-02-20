import { type CourseDto } from "./types.js";

type CourseOpenAiRequest = Pick<CourseDto, "description" | "id" | "title">[];

export { type CourseOpenAiRequest };
