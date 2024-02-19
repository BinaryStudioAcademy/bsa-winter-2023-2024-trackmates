import { CourseSearchRequestDto } from "./course-search-request-dto.type.js";

type CourseSearchFilterDto = Omit<CourseSearchRequestDto, "vendors"> & {
	vendors: string[];
};

export { type CourseSearchFilterDto };
