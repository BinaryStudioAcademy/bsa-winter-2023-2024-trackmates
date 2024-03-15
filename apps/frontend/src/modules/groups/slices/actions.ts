import { createAsyncThunk } from "@reduxjs/toolkit";

import { NotificationMessage } from "~/libs/modules/notification/notification.js";
import { type AsyncThunkConfig } from "~/libs/types/types.js";
import {
	type GroupRequestDto,
	type GroupResponseDto,
} from "~/modules/groups/groups.js";
import { type PermissionResponseDto } from "~/modules/permissions/permissions.js";

import { name as sliceName } from "./groups.slice.js";

const createGroup = createAsyncThunk<
	GroupResponseDto,
	GroupRequestDto,
	AsyncThunkConfig
>(`${sliceName}/create-group`, async (createPayload, { extra }) => {
	const { groupsApi, notification } = extra;

	const createdGroup = await groupsApi.createGroup(createPayload);

	notification.success(NotificationMessage.GROUP_CREATED);

	return createdGroup;
});

const deleteGroup = createAsyncThunk<boolean, number, AsyncThunkConfig>(
	`${sliceName}/delete-group`,
	async (groupId, { extra }) => {
		const { groupsApi, notification } = extra;

		const isDeleted = await groupsApi.deleteGroup(groupId);

		if (isDeleted) {
			notification.success(NotificationMessage.GROUP_DELETED);
		}

		return isDeleted;
	},
);

const getAllGroups = createAsyncThunk<
	GroupResponseDto[],
	undefined,
	AsyncThunkConfig
>(`${sliceName}/get-all-groups`, async (_, { extra }) => {
	const { groupsApi } = extra;

	const groups = await groupsApi.getAllGroups();

	return groups.items;
});

const updateGroupPermissions = createAsyncThunk<
	PermissionResponseDto[],
	{ groupId: number; permissionId: number },
	AsyncThunkConfig
>(
	`${sliceName}/update-groups-permissions`,
	async ({ groupId, permissionId }, { extra }) => {
		const { groupsApi, notification } = extra;

		const permissionList = await groupsApi.updateGroupPermissions(
			groupId,
			permissionId,
		);

		notification.success(NotificationMessage.GROUP_PERMISSIONS_CHANGED);

		return permissionList.items;
	},
);

const updateUserGroups = createAsyncThunk<
	GroupResponseDto[],
	{ groupId: number; userId: number },
	AsyncThunkConfig
>(`${sliceName}/update-user-groups`, async ({ groupId, userId }, { extra }) => {
	const { groupsApi, notification } = extra;

	const groupsList = await groupsApi.updateUserGroups(groupId, userId);

	notification.success(NotificationMessage.USER_GROUPS_CHANGED);

	return groupsList.items;
});

export {
	createGroup,
	deleteGroup,
	getAllGroups,
	updateGroupPermissions,
	updateUserGroups,
};
