type EdxImage = {
	[key: string]: unknown;
	uri: string;
};

type EdxMedia = {
	[key: string]: unknown;
	course_image: EdxImage;
};

type EdxCourseResponseDto = {
	[key: string]: unknown;
	course_id: string;
	media: EdxMedia;
	name: string;
	short_description: string;
};

export { type EdxCourseResponseDto };
