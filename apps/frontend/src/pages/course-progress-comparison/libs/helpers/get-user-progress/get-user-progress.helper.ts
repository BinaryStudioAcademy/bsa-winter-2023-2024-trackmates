import { getPercentage } from "~/libs/helpers/helpers.js";
import {
	SectionStatus,
	type SectionStatusResponseDto,
} from "~/modules/section-statuses/section-statuses.js";

const getUserProgress = (
	sectionsCount: number,
	sectionStatuses: SectionStatusResponseDto[],
): number => {
	const completedSectionsCount = sectionStatuses.filter(
		({ status }) => status === SectionStatus.COMPLETED,
	).length;

	return Math.round(
		getPercentage({ part: completedSectionsCount, total: sectionsCount }),
	);
};

export { getUserProgress };
