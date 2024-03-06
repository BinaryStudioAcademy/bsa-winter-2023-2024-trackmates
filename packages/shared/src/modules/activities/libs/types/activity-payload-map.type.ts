import { type ActivityType } from "../enums/enums.js";
import {
	type ActivityFinishCourseRequestDto,
	type ActivityFinishSectionRequestDto,
} from "./types.js";

type ActivityPayloadMap = {
	[ActivityType.FINISH_COURSE]: ActivityFinishCourseRequestDto;
	[ActivityType.FINISH_SECTION]: ActivityFinishSectionRequestDto;
};

export { type ActivityPayloadMap };
