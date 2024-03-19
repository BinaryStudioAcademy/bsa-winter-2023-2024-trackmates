const GroupsApiPath = {
	$GROUP_ID: "/:groupId",
	$GROUP_ID_PERMISSIONS: "/:groupId/permissions",
	$GROUP_ID_PERMISSIONS_$PERMISSION_ID: "/:groupId/permissions/:permissionId",
	$GROUP_ID_USERS_$USER_ID: "/:groupId/users/:userId",
	ROOT: "/",
} as const;

export { GroupsApiPath };
