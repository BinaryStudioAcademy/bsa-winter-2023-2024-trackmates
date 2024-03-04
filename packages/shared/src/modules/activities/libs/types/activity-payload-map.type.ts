import {
	type ActivityFinishCourseRequestDto,
	type ActivityFinishSectionRequestDto,
} from "./types.js";

type ActivityPayloadMap = {
	"finish-course": ActivityFinishCourseRequestDto;
	"finish-section": ActivityFinishSectionRequestDto;
};

export { type ActivityPayloadMap };
