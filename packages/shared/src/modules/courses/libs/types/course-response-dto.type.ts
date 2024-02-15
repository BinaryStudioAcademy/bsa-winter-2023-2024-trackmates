import { ValueOf } from "src/libs/types/types.js";

import { CourseLevel } from "../enums/enums.js";
import { CourseInstructorResponseDto } from "./course-instructor-response-dto.type.js";

type CourseResponseDto = {
	avgRating: number;
	headline: string;
	id: number;
	image: string;
	instructors: CourseInstructorResponseDto[];
	isPaid: boolean;
	level: ValueOf<typeof CourseLevel>;
	numLectures: number;
	numReviews: number;
	price: string;
	title: string;
	url: string;
};

export { type CourseResponseDto };
