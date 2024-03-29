import { createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";
import {
	type GroupResponseDto,
	actions as groupsActions,
} from "~/modules/groups/groups.js";
import {
	type PermissionResponseDto,
	actions as permissionsActions,
} from "~/modules/permissions/permissions.js";
import {
	type UserAuthResponseDto,
	actions as usersActions,
} from "~/modules/users/users.js";

type State = {
	groupToDataStatus: Record<
		number,
		{
			deleteDataStatus?: ValueOf<typeof DataStatus>;
			updateDataStatus?: ValueOf<typeof DataStatus>;
		}
	>;
	groups: GroupResponseDto[];
	groupsDataStatus: ValueOf<typeof DataStatus>;
	permissions: PermissionResponseDto[];
	permissionsDataStatus: ValueOf<typeof DataStatus>;
	totalGroupsCount: number;
	totalUsersCount: number;
	userToDataStatus: Record<
		number,
		{
			deleteDataStatus?: ValueOf<typeof DataStatus>;
			updateDataStatus?: ValueOf<typeof DataStatus>;
		}
	>;
	users: UserAuthResponseDto[];
	usersDataStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
	groupToDataStatus: {},
	groups: [],
	groupsDataStatus: DataStatus.IDLE,
	permissions: [],
	permissionsDataStatus: DataStatus.IDLE,
	totalGroupsCount: 0,
	totalUsersCount: 0,
	userToDataStatus: {},
	users: [],
	usersDataStatus: DataStatus.IDLE,
};

const { reducer } = createSlice({
	extraReducers(builder) {
		builder.addCase(
			permissionsActions.getAllPermissions.fulfilled,
			(state, action) => {
				state.permissions = action.payload.items;
				state.permissionsDataStatus = DataStatus.FULFILLED;
			},
		);
		builder.addCase(permissionsActions.getAllPermissions.pending, (state) => {
			state.permissionsDataStatus = DataStatus.PENDING;
		});
		builder.addCase(permissionsActions.getAllPermissions.rejected, (state) => {
			state.permissionsDataStatus = DataStatus.REJECTED;
		});

		builder.addCase(
			groupsActions.getAllGroups.fulfilled,
			(state, { payload: { items, total } }) => {
				state.groups = items;
				state.totalGroupsCount = total;
				state.groupsDataStatus = DataStatus.FULFILLED;
			},
		);
		builder.addCase(groupsActions.getAllGroups.pending, (state) => {
			state.groupsDataStatus = DataStatus.PENDING;
		});
		builder.addCase(groupsActions.getAllGroups.rejected, (state) => {
			state.groupsDataStatus = DataStatus.REJECTED;
		});

		builder.addCase(groupsActions.createGroup.fulfilled, (state, action) => {
			state.groups = [...state.groups, action.payload];
			state.groupsDataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(groupsActions.createGroup.pending, (state) => {
			state.groupsDataStatus = DataStatus.PENDING;
		});
		builder.addCase(groupsActions.createGroup.rejected, (state) => {
			state.groupsDataStatus = DataStatus.REJECTED;
		});

		builder.addCase(
			groupsActions.updateGroupPermissions.fulfilled,
			(
				state,
				{
					meta: {
						arg: { groupId },
					},
					payload,
				},
			) => {
				state.groups = state.groups.map((group) => {
					return group.id === groupId
						? { ...group, permissions: payload }
						: group;
				});
				state.groupToDataStatus[groupId] = {
					updateDataStatus: DataStatus.FULFILLED,
				};
			},
		);
		builder.addCase(
			groupsActions.updateGroupPermissions.pending,
			(
				state,
				{
					meta: {
						arg: { groupId },
					},
				},
			) => {
				state.groupToDataStatus[groupId] = {
					updateDataStatus: DataStatus.PENDING,
				};
			},
		);
		builder.addCase(
			groupsActions.updateGroupPermissions.rejected,
			(
				state,
				{
					meta: {
						arg: { groupId },
					},
				},
			) => {
				state.groupToDataStatus[groupId] = {
					updateDataStatus: DataStatus.REJECTED,
				};
			},
		);

		builder.addCase(
			groupsActions.updateUserGroups.fulfilled,
			(
				state,
				{
					meta: {
						arg: { userId },
					},
					payload,
				},
			) => {
				state.users = state.users.map((user) => {
					return user.id === userId ? { ...user, groups: payload } : user;
				});
				state.userToDataStatus[userId] = {
					updateDataStatus: DataStatus.FULFILLED,
				};
			},
		);
		builder.addCase(
			groupsActions.updateUserGroups.pending,
			(
				state,
				{
					meta: {
						arg: { userId },
					},
				},
			) => {
				state.userToDataStatus[userId] = {
					updateDataStatus: DataStatus.PENDING,
				};
			},
		);
		builder.addCase(
			groupsActions.updateUserGroups.rejected,
			(
				state,
				{
					meta: {
						arg: { userId },
					},
				},
			) => {
				state.userToDataStatus[userId] = {
					updateDataStatus: DataStatus.REJECTED,
				};
			},
		);

		builder.addCase(
			groupsActions.deleteGroup.fulfilled,
			(
				state,
				{
					meta: {
						arg: { groupId },
					},
					payload,
				},
			) => {
				if (payload) {
					state.groups = state.groups.filter((group) => {
						return group.id !== groupId;
					});
				}

				state.groupToDataStatus[groupId] = {
					deleteDataStatus: DataStatus.FULFILLED,
				};
			},
		);
		builder.addCase(
			groupsActions.deleteGroup.pending,
			(
				state,
				{
					meta: {
						arg: { groupId },
					},
				},
			) => {
				state.groupToDataStatus[groupId] = {
					deleteDataStatus: DataStatus.PENDING,
				};
			},
		);
		builder.addCase(
			groupsActions.deleteGroup.rejected,
			(
				state,
				{
					meta: {
						arg: { groupId },
					},
				},
			) => {
				state.groupToDataStatus[groupId] = {
					deleteDataStatus: DataStatus.REJECTED,
				};
			},
		);

		builder.addCase(
			usersActions.getAll.fulfilled,
			(state, { payload: { items, total } }) => {
				state.users = items;
				state.usersDataStatus = DataStatus.FULFILLED;
				state.totalUsersCount = total;
			},
		);
		builder.addCase(usersActions.getAll.pending, (state) => {
			state.usersDataStatus = DataStatus.PENDING;
		});
		builder.addCase(usersActions.getAll.rejected, (state) => {
			state.usersDataStatus = DataStatus.REJECTED;
		});

		builder.addCase(
			usersActions.remove.fulfilled,
			(
				state,
				{
					meta: {
						arg: { userId },
					},
					payload,
				},
			) => {
				if (payload) {
					state.users = state.users.filter(({ id }) => id !== userId);
				}

				state.userToDataStatus[userId] = {
					deleteDataStatus: DataStatus.FULFILLED,
				};
			},
		);
		builder.addCase(
			usersActions.remove.pending,
			(
				state,
				{
					meta: {
						arg: { userId },
					},
				},
			) => {
				state.userToDataStatus[userId] = {
					deleteDataStatus: DataStatus.PENDING,
				};
			},
		);
		builder.addCase(
			usersActions.remove.rejected,
			(
				state,
				{
					meta: {
						arg: { userId },
					},
				},
			) => {
				state.userToDataStatus[userId] = {
					deleteDataStatus: DataStatus.REJECTED,
				};
			},
		);
	},
	initialState,
	name: "management",
	reducers: {},
});

export { reducer };
