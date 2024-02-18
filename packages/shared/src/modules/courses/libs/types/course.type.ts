import { VendorResponseDto } from "../../../vendors/vendors.js";

type CourseDto = {
	description: string;
	id: string;
	image: string;
	imageSmall: string;
	title: string;
	url: string;
	vendor: VendorResponseDto;
	vendorCourseId: string;
};

export { type CourseDto };
