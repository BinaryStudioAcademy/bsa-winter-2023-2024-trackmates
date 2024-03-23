import { createAsyncThunk } from "@reduxjs/toolkit";

import { PaginationValue } from "~/libs/enums/enums.js";
import { NotificationMessage } from "~/libs/modules/notification/notification.js";
import {
	type AsyncThunkConfig,
	type PaginationRequestDto,
	type PaginationResponseDto,
} from "~/libs/types/types.js";
import { type PermissionResponseDto } from "~/modules/permissions/permissions.js";

import {
	type GroupCreateRequestDto,
	type GroupResponseDto,
} from "../libs/types/types.js";
import { name as sliceName } from "./groups.slice.js";

const createGroup = createAsyncThunk<
	GroupResponseDto,
	Record<"createPayload", GroupCreateRequestDto> & Record<"page", number>,
	AsyncThunkConfig
>(
	`${sliceName}/create-group`,
	async ({ createPayload, page }, { dispatch, extra }) => {
		const { groupsApi, notification } = extra;

		const createdGroup = await groupsApi.createGroup(createPayload);

		notification.success(NotificationMessage.GROUP_CREATED);

		void dispatch(getAllGroups({ count: PaginationValue.DEFAULT_COUNT, page }));

		return createdGroup;
	},
);

const deleteGroup = createAsyncThunk<
	boolean,
	{ groupId: number; page: number },
	AsyncThunkConfig
>(
	`${sliceName}/delete-group`,
	async ({ groupId, page }, { dispatch, extra }) => {
		const { groupsApi, notification } = extra;

		const isDeleted = await groupsApi.deleteGroup(groupId);

		if (isDeleted) {
			notification.success(NotificationMessage.GROUP_DELETED);
		}

		void dispatch(getAllGroups({ count: PaginationValue.DEFAULT_COUNT, page }));

		return isDeleted;
	},
);

const getAllGroups = createAsyncThunk<
	PaginationResponseDto<GroupResponseDto>,
	PaginationRequestDto,
	AsyncThunkConfig
>(`${sliceName}/get-all-groups`, async (query, { extra }) => {
	const { groupsApi } = extra;

	return await groupsApi.getAllGroups(query);
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
