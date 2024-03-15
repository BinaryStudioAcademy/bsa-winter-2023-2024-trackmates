import { createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";
import { type CourseDto } from "~/modules/courses/courses.js";
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
	courses: CourseDto[];
	coursesDataStatus: ValueOf<typeof DataStatus>;
	groups: GroupResponseDto[];
	groupsDataStatus: ValueOf<typeof DataStatus>;
	permissions: PermissionResponseDto[];
	permissionsDataStatus: ValueOf<typeof DataStatus>;
	users: UserAuthResponseDto[];
	usersDataStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
	courses: [],
	coursesDataStatus: DataStatus.IDLE,
	groups: [],
	groupsDataStatus: DataStatus.IDLE,
	permissions: [],
	permissionsDataStatus: DataStatus.IDLE,
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
			state.groups = action.payload;
			state.groupsDataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(groupsActions.getAllGroups.pending, (state) => {
			state.groupsDataStatus = DataStatus.PENDING;
		});
		builder.addCase(groupsActions.getAllGroups.rejected, (state) => {
			state.groupsDataStatus = DataStatus.REJECTED;
		});

		builder.addCase(groupsActions.createGroup.fulfilled, (state, action) => {
			state.groups = action.payload;
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
			(state, action) => {
				state.groups = action.payload;
			},
		);
		builder.addCase(groupsActions.updateGroupPermissions.pending, (state) => {
			state.groupsDataStatus = DataStatus.PENDING;
		});
		builder.addCase(groupsActions.updateGroupPermissions.rejected, (state) => {
			state.groupsDataStatus = DataStatus.REJECTED;
		});

		builder.addCase(
			groupsActions.updateUserGroups.fulfilled,
			(state, action) => {
				state.users = action.payload;
			},
		);
		builder.addCase(groupsActions.updateUserGroups.pending, (state) => {
			state.groupsDataStatus = DataStatus.PENDING;
		});
		builder.addCase(groupsActions.updateUserGroups.rejected, (state) => {
			state.groupsDataStatus = DataStatus.REJECTED;
		});

		builder.addCase(groupsActions.deleteGroup.fulfilled, (state, action) => {
			state.groups = action.payload;
			state.groupsDataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(groupsActions.deleteGroup.pending, (state) => {
			state.groupsDataStatus = DataStatus.PENDING;
		});
		builder.addCase(groupsActions.deleteGroup.rejected, (state) => {
			state.groupsDataStatus = DataStatus.REJECTED;
		});

		builder.addCase(usersActions.getAll.fulfilled, (state, action) => {
			state.users = action.payload;
			state.usersDataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(usersActions.getAll.pending, (state) => {
			state.usersDataStatus = DataStatus.PENDING;
		});
		builder.addCase(usersActions.getAll.rejected, (state) => {
			state.usersDataStatus = DataStatus.REJECTED;
		});
	},
	initialState,
	name: "management",
	reducers: {},
});

export { reducer };
