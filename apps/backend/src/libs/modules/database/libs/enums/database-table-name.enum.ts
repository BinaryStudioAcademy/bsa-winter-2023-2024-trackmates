const DatabaseTableName = {
	ACTIVITIES: "activities",
	CHAT_MESSAGES: "chat_messages",
	CHATS: "chats",
	COURSE_SECTIONS: "course_sections",
	COURSES: "courses",
	COURSES_TO_USERS: "courses_to_users",
	FILES: "files",
	FRIENDS: "friends",
	GROUPS: "groups",
	GROUPS_TO_PERMISSIONS: "groups_to_permissions",
	MIGRATIONS: "migrations",
	PERMISSIONS: "permissions",
	SECTION_STATUSES: "section_statuses",
	USER_DETAILS: "user_details",
	USERS: "users",
	USERS_TO_GROUPS: "users_to_groups",
	VENDORS: "vendors",
} as const;

export { DatabaseTableName };
