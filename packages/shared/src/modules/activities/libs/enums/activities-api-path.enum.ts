const ActivitiesApiPath = {
	FINISH_COURSE: "/finish-course",
	FINISH_SECTION: "/finish-section",
	FINISH_SECTION_$ACTION_ID: "/finish-section/:actionId",
	LIKE: "/like",
	ROOT: "/",
} as const;

export { ActivitiesApiPath };
