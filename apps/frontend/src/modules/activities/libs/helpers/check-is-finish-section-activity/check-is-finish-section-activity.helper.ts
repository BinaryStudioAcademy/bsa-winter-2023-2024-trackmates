import {
	type ActivityFinishCourseResponseDto,
	type ActivityFinishSectionResponseDto,
} from "../../types/types.js";

const checkIsFinishSectionActivity = (
	payload: ActivityFinishCourseResponseDto | ActivityFinishSectionResponseDto,
): payload is ActivityFinishSectionResponseDto => {
	return "courseTitle" in payload;
};

export { checkIsFinishSectionActivity };
