import { type ActivityType } from "../enums/enums.js";
import {
	type ActivityFinishCourseResponseDto,
	type ActivityFinishSectionResponseDto,
} from "./types.js";

type ActivityPayloadMap = {
	[ActivityType.FINISH_COURSE]: ActivityFinishCourseResponseDto;
	[ActivityType.FINISH_SECTION]: ActivityFinishSectionResponseDto;
};

export { type ActivityPayloadMap };
