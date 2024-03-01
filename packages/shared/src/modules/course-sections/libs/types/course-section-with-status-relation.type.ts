import { type SectionStatusResponseDto } from "../../../section-statuses/section-statuses.js";
import { type CourseSectionDto } from "./course-section-dto.type.js";

type CourseSectionWithStatusRelation = CourseSectionDto & {
	status: SectionStatusResponseDto | null;
};

export { type CourseSectionWithStatusRelation };
