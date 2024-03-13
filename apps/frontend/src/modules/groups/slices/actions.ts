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

const editGroup = createAsyncThunk<
	GroupResponseDto,
	{ editPayload: GroupRequestDto; groupId: number },
	AsyncThunkConfig
>(`${sliceName}/edit-group`, ({ editPayload, groupId }, { extra }) => {
	const { groupsApi } = extra;

	return groupsApi.editGroup(groupId, editPayload);
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
	{
		updatedCurrentGroup: GroupResponseDto | null;
		updatedGroups: GroupResponseDto[];
	},
	{ groupId: number; permissionId: number },
	AsyncThunkConfig
>(
	`${sliceName}/update-groups-permissions`,
	async ({ groupId, permissionId }, { extra, getState }) => {
		const { groupsApi } = extra;
		const {
			management: { currentGroup, groups },
		} = getState();

		const permissionList = await groupsApi.updateGroupPermissions(
			groupId,
			permissionId,
		);

		const updatedCurrentGroup = currentGroup
			? {
					...currentGroup,
					permissions: permissionList.items,
				}
			: null;

		const updatedGroups = groups.map((group) => {
			return group.id === groupId
				? {
						...group,
						permissions: permissionList.items,
					}
				: group;
		});

		return {
			updatedCurrentGroup,
			updatedGroups,
		};
	},
);

const updateUserGroups = createAsyncThunk<
	{
		updatedCurrentUser: UserAuthResponseDto | null;
		updatedUsers: UserAuthResponseDto[];
	},
	{ groupId: number; userId: number },
	AsyncThunkConfig
>(
	`${sliceName}/update-user-groups`,
	async ({ groupId, userId }, { extra, getState }) => {
		const { groupsApi } = extra;
		const {
			management: { currentUser, users },
		} = getState();

		const groupsList = await groupsApi.updateUserGroups(groupId, userId);

		const updatedCurrentUser = currentUser
			? {
					...currentUser,
					groups: groupsList.items,
				}
			: null;

		const updatedUsers = users.map((user) => {
			return user.id === userId
				? {
						...user,
						groups: groupsList.items,
					}
				: user;
		});

		return {
			updatedCurrentUser,
			updatedUsers,
		};
	},
);

export {
	createGroup,
	deleteGroup,
	editGroup,
	getAllGroups,
	updateGroupPermissions,
	updateUserGroups,
};
