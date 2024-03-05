import { type ActivityTypeValue } from "../enums/enums.js";
import {
	type ActivityFinishCourseRequestDto,
	type ActivityFinishSectionRequestDto,
} from "./types.js";

type ActivityPayloadMap = {
	[ActivityTypeValue.FINISH_COURSE]: ActivityFinishCourseRequestDto;
	[ActivityTypeValue.FINISH_SECTION]: ActivityFinishSectionRequestDto;
};

export { type ActivityPayloadMap };
