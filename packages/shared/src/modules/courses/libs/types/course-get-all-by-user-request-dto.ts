import { type PaginationRequestDto } from "../../../../libs/types/types.js";

type CourseGetAllByUserRequestDto = {
	search: string;
	userId: number;
} & PaginationRequestDto;

export { type CourseGetAllByUserRequestDto };
