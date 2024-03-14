const CoursesApiPath = {
	$COURSE_ID: "/:courseId",
	ALL: "/all",
	RECOMMENDED: "/recommended",
	ROOT: "/",
} as const;

export { CoursesApiPath };
