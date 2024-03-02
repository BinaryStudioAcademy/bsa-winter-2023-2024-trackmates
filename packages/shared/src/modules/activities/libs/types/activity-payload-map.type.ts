import { type FinishCourseDto, type FinishSectionDto } from "./types.js";

type ActivityPayloadMap = {
	FINISH_COURSE: FinishCourseDto;
	FINISH_SECTION: FinishSectionDto;
};

export { type ActivityPayloadMap };
