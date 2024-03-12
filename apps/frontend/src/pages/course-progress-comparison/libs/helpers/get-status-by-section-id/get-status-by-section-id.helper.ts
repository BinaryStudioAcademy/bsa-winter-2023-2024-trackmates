import { type SectionStatusResponseDto } from "~/modules/section-statuses/section-statuses.js";

const getStatusBySectionId = (
	sectionId: number,
	statuses: SectionStatusResponseDto[],
): SectionStatusResponseDto | null => {
	return (
		statuses.find((status) => status.courseSectionId === sectionId) ?? null
	);
};

export { getStatusBySectionId };
