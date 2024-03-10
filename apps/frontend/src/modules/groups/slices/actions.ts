import { createAsyncThunk } from "@reduxjs/toolkit";

import { type AsyncThunkConfig } from "~/libs/types/async-thunk-config.type.js";
import {
	type GroupRequestDto,
	type GroupResponseDto,
} from "~/modules/groups/libs/types/types.js";

import { name as sliceName } from "./groups.slice.js";

const createGroup = createAsyncThunk<
	GroupResponseDto,
	GroupRequestDto,
	AsyncThunkConfig
>(`${sliceName}/create-group`, (createPayload, { extra }) => {
	const { groupsApi } = extra;

	return groupsApi.createGroup(createPayload);
});

const deleteGroup = createAsyncThunk<boolean, number, AsyncThunkConfig>(
	`${sliceName}/delete-group`,
	(groupId, { extra }) => {
		const { groupsApi } = extra;

		return groupsApi.deleteGroup(groupId);
	},
);

const editGroup = createAsyncThunk<
	GroupResponseDto,
	{ editPayload: GroupRequestDto; groupId: number },
	AsyncThunkConfig
>(`${sliceName}/edit-group`, ({ editPayload, groupId }, { extra }) => {
	const { groupsApi } = extra;

	return groupsApi.editGroup(groupId, editPayload);
});

const getAllGroups = createAsyncThunk<
	{ items: GroupResponseDto[] },
	undefined,
	AsyncThunkConfig
>(`${sliceName}/get-all-groups`, (_, { extra }) => {
	const { groupsApi } = extra;

	return groupsApi.getAllGroups();
});

const updateGroupPermissions = createAsyncThunk<
	{ items: GroupResponseDto[] },
	{ groupId: number; permissionId: number },
	AsyncThunkConfig
>(
	`${sliceName}/update-groups-permissions`,
	({ groupId, permissionId }, { extra }) => {
		const { groupsApi } = extra;

		return groupsApi.updateGroupPermissions(groupId, permissionId);
	},
);

const updateUserGroups = createAsyncThunk<
	{ items: GroupResponseDto[] },
	{ groupId: number; userId: number },
	AsyncThunkConfig
>(`${sliceName}/update-user-groups`, ({ groupId, userId }, { extra }) => {
	const { groupsApi } = extra;

	return groupsApi.updateUserGroups(groupId, userId);
});

export {
	createGroup,
	deleteGroup,
	editGroup,
	getAllGroups,
	updateGroupPermissions,
	updateUserGroups,
};
