import { type FinishCourseDto, type FinishSectionDto } from "./types.js";

type ActivityPayloadMap = {
	"finish-course": FinishCourseDto;
	"finish-section": FinishSectionDto;
};

export { type ActivityPayloadMap };
