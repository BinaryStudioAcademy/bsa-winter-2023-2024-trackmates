import { type SectionStatusDto } from "../../../section-statuses/section-statuses.js";
import { type CourseSectionDto } from "./course-section-dto.type.js";

type CourseSectionWithStatusRelation = CourseSectionDto & {
	sectionStatus: SectionStatusDto | null;
};

export { type CourseSectionWithStatusRelation };
