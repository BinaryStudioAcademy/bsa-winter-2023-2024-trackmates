const NotificationMessage = {
	COURSE_ADDED: "Course successfully added to your account.",
	COURSE_DELETED: "Course deleted successfully.",
	COURSE_DELETION_FAILED: "Course deletion failed.",
	COURSE_UPDATED: "Course updated successfully.",
	FRIEND_FOLLOW_SUCCESS: "Followed successfully.",
	FRIEND_UNFOLLOW_SUCCESS: "Unfollowed successfully.",
	GROUP_CREATED: "Group was created.",
	GROUP_DELETED: "Group was deleted.",
	GROUP_PERMISSIONS_CHANGED: "Group permissions were changed.",
	PASSWORD_WAS_UPDATED: "Your password was updated.",
	PROFILE_CHANGES_SAVED: "Changes are saved.",
	SUBSCRIPTION_SUCCESS: "Congratulations! You are now a Premium Member 🎉",
	USER_DELETED: "User was deleted.",
	USER_DELETION_FAILED: "User wasn't deleted.",
	USER_GROUPS_CHANGED: "User groups were changed.",
} as const;

export { NotificationMessage };
