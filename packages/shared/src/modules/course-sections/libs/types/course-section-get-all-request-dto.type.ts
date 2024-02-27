import { type CourseSectionDto } from "./course-section-dto.type.js";

type CourseSectionGetAllRequestDto = Pick<CourseSectionDto, "courseId">;

export { type CourseSectionGetAllRequestDto };
