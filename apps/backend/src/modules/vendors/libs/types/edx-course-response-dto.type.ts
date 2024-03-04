import { type EdxMedia } from "./edx-media.type.js";

type EdxCourseResponseDto = {
	course_id: string;
	media: EdxMedia;
	name: string;
	short_description: string;
};

export { type EdxCourseResponseDto };
