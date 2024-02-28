import { type ValueOf } from "../../../../libs/types/types.js";
import { type SectionStatus } from "../enums/enums.js";

type SectionStatusDto = {
	courseSectionId: number;
	id: number;
	status: ValueOf<typeof SectionStatus>;
	userId: number;
};

export { type SectionStatusDto };
