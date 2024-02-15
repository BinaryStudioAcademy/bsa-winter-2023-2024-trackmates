import { CourseField } from "~/libs/modules/udemy/udemy.js";

import { CourseResponseDto } from "../types/types.js";

const CourseFieldsMapping: Record<keyof CourseResponseDto, string> = {
	avgRating: CourseField["AVG_RATING"] as string,
	headline: CourseField["HEADLINE"] as string,
	id: CourseField["ID"] as string,
	image: CourseField["IMAGE_SMALL"] as string,
	instructors: CourseField["INSTRUCTORS"] as string,
	isPaid: CourseField["IS_PAID"] as string,
	level: CourseField["LEVEL"] as string,
	numLectures: CourseField["NUM_LECTURES"] as string,
	numReviews: CourseField["NUM_REVIEWS"] as string,
	price: CourseField["PRICE"] as string,
	title: CourseField["TITLE"] as string,
	url: CourseField["URL"] as string,
} as const;

export { CourseFieldsMapping };
