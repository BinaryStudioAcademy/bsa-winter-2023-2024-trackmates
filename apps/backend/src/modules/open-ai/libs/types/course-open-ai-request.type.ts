import { type CourseDto } from "./types.js";

type CourseOpenAiRequest = Pick<CourseDto, "description" | "title">[];

export { type CourseOpenAiRequest };
