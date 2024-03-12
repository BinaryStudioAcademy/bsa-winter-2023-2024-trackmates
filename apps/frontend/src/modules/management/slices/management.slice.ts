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
	groups: GroupResponseDto[];
	groupsDataStatus: ValueOf<typeof DataStatus>;
	permissions: PermissionResponseDto[];
	permissionsDataStatus: ValueOf<typeof DataStatus>;
	userToDataStatus: Record<number, ValueOf<typeof DataStatus>>;
	users: UserAuthResponseDto[];
	usersDataStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
	groups: [],
	groupsDataStatus: DataStatus.IDLE,
	permissions: [],
	permissionsDataStatus: DataStatus.IDLE,
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
		builder.addCase(groupsActions.getAllGroups.fulfilled, (state, action) => {
			state.groups = action.payload.items;
			state.groupsDataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(groupsActions.getAllGroups.pending, (state) => {
			state.groupsDataStatus = DataStatus.PENDING;
		});
		builder.addCase(groupsActions.getAllGroups.rejected, (state) => {
			state.groupsDataStatus = DataStatus.REJECTED;
		});
		builder.addCase(usersActions.getAll.fulfilled, (state, action) => {
			state.users = action.payload.items;
			state.usersDataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(usersActions.getAll.pending, (state) => {
			state.usersDataStatus = DataStatus.PENDING;
		});
		builder.addCase(usersActions.getAll.rejected, (state) => {
			state.usersDataStatus = DataStatus.REJECTED;
		});

		builder.addCase(
			usersActions.remove.fulfilled,
			(state, { payload: userId }) => {
				state.users = state.users.filter(({ id }) => id !== userId);
				state.userToDataStatus[userId] = DataStatus.FULFILLED;
			},
		);
		builder.addCase(
			usersActions.remove.pending,
			(state, { meta: { arg: userId } }) => {
				state.userToDataStatus[userId] = DataStatus.PENDING;
			},
		);
		builder.addCase(
			usersActions.remove.rejected,
			(state, { meta: { arg: userId } }) => {
				state.userToDataStatus[userId] = DataStatus.REJECTED;
			},
		);
	},
	initialState,
	name: "management",
	reducers: {},
});

export { reducer };
