import { type ValueOf } from "../../../../libs/types/types.js";
import { type SectionStatus } from "../enums/enums.js";

type SectionStatusResponseDto = {
	courseSectionId: number;
	id: number;
	status: ValueOf<typeof SectionStatus>;
	userId: number;
};

export { type SectionStatusResponseDto };
