const CoursesApiPath = {
	$COURSE_ID: "/:courseId",
	FROM_VENDORS: "/from-vendors",
	FROM_VENDORS_$COURSE_ID: "/from-vendors/:courseId",
	RECOMMENDED: "/recommended",
	ROOT: "/",
} as const;

export { CoursesApiPath };
