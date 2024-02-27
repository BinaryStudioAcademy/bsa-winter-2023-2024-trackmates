import { type VendorResponseDto } from "../../../vendors/vendors.js";

type CourseDto = {
	description: string;
	id: null | number;
	image: string;
	title: string;
	url: string;
	vendor: VendorResponseDto;
	vendorCourseId: string;
};

export { type CourseDto };
