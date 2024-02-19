import { VendorResponseDto } from "../../../vendors/vendors.js";

type CourseDto = {
	description: string;
	id: number;
	image: string;
	imageSmall: string;
	title: string;
	url: string;
	vendor: VendorResponseDto;
	vendorCourseId: string;
};

export { type CourseDto };
