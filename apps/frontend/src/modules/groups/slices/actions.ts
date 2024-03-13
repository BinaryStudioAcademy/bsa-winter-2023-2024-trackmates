import { createAsyncThunk } from "@reduxjs/toolkit";

import { type AsyncThunkConfig } from "~/libs/types/async-thunk-config.type.js";
import {
	type GroupRequestDto,
	type GroupResponseDto,
} from "~/modules/groups/groups.js";
import { type UserAuthResponseDto } from "~/modules/users/users.js";

import { name as sliceName } from "./groups.slice.js";

const createGroup = createAsyncThunk<
	GroupResponseDto[],
	GroupRequestDto,
	AsyncThunkConfig
>(`${sliceName}/create-group`, async (createPayload, { extra, getState }) => {
	const { groupsApi } = extra;
	const {
		management: { groups },
	} = getState();

	const createdGroup = await groupsApi.createGroup(createPayload);

	return [...groups, createdGroup];
});

const deleteGroup = createAsyncThunk<
	GroupResponseDto[],
	number,
	AsyncThunkConfig
>(`${sliceName}/delete-group`, async (groupId, { extra, getState }) => {
	const { groupsApi } = extra;
	const {
		management: { groups },
	} = getState();

	const isDeleted = await groupsApi.deleteGroup(groupId);

	if (isDeleted) {
		return groups.filter((group) => {
			return group.id !== groupId;
		});
	}

	return groups;
});

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
	GroupResponseDto[],
	{ groupId: number; permissionId: number },
	AsyncThunkConfig
>(
	`${sliceName}/update-groups-permissions`,
	async ({ groupId, permissionId }, { extra, getState }) => {
		const { groupsApi } = extra;
		const {
			management: { groups },
		} = getState();

		const permissionList = await groupsApi.updateGroupPermissions(
			groupId,
			permissionId,
		);

		return groups.map((group) => {
			return group.id === groupId
				? {
						...group,
						permissions: permissionList.items,
					}
				: group;
		});
	},
);

const updateUserGroups = createAsyncThunk<
	UserAuthResponseDto[],
	{ groupId: number; userId: number },
	AsyncThunkConfig
>(
	`${sliceName}/update-user-groups`,
	async ({ groupId, userId }, { extra, getState }) => {
		const { groupsApi } = extra;
		const {
			management: { users },
		} = getState();

		const groupsList = await groupsApi.updateUserGroups(groupId, userId);

		return users.map((user) => {
			return user.id === userId
				? {
						...user,
						groups: groupsList.items,
					}
				: user;
		});
	},
);

export {
	createGroup,
	deleteGroup,
	getAllGroups,
	updateGroupPermissions,
	updateUserGroups,
};
