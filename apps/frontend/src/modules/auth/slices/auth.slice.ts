import { createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";
import { type UserAuthResponseDto } from "~/modules/auth/auth.js";
import { actions as filesActions } from "~/modules/files/files.js";
import { actions as usersActions } from "~/modules/users/users.js";

import {
	getAuthenticatedUser,
	logOut,
	sendUpdatePasswordLink,
	signIn,
	signUp,
	updatePassword,
} from "./actions.js";

type State = {
	avatarUploadDataStatus: ValueOf<typeof DataStatus>;
	dataStatus: ValueOf<typeof DataStatus>;
	sendUpdatePasswordLinkStatus: ValueOf<typeof DataStatus>;
	updateUserDataStatus: ValueOf<typeof DataStatus>;
	user: UserAuthResponseDto | null;
};

const initialState: State = {
	avatarUploadDataStatus: DataStatus.IDLE,
	dataStatus: DataStatus.IDLE,
	sendUpdatePasswordLinkStatus: DataStatus.IDLE,
	updateUserDataStatus: DataStatus.IDLE,
	user: null,
};

const { actions, name, reducer } = createSlice({
	extraReducers(builder) {
		builder.addCase(getAuthenticatedUser.fulfilled, (state, action) => {
			state.user = action.payload;
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(getAuthenticatedUser.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(getAuthenticatedUser.rejected, (state) => {
			state.user = null;
			state.dataStatus = DataStatus.REJECTED;
		});
		builder.addCase(signUp.fulfilled, (state, action) => {
			state.dataStatus = DataStatus.FULFILLED;
			state.user = action.payload;
		});
		builder.addCase(signUp.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(signUp.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
			state.user = null;
		});

		builder.addCase(signIn.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(signIn.fulfilled, (state, action) => {
			state.dataStatus = DataStatus.FULFILLED;
			state.user = action.payload;
		});
		builder.addCase(signIn.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});

		builder.addCase(updatePassword.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(updatePassword.fulfilled, (state, action) => {
			state.dataStatus = DataStatus.FULFILLED;
			state.user = action.payload;
		});
		builder.addCase(updatePassword.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});

		builder.addCase(sendUpdatePasswordLink.pending, (state) => {
			state.sendUpdatePasswordLinkStatus = DataStatus.PENDING;
		});
		builder.addCase(sendUpdatePasswordLink.fulfilled, (state, action) => {
			state.sendUpdatePasswordLinkStatus = action.payload
				? DataStatus.FULFILLED
				: DataStatus.REJECTED;
		});
		builder.addCase(sendUpdatePasswordLink.rejected, (state) => {
			state.sendUpdatePasswordLinkStatus = DataStatus.REJECTED;
		});

		builder.addCase(logOut.fulfilled, (state, action) => {
			state.user = action.payload;
		});

		builder.addCase(usersActions.updateProfile.pending, (state) => {
			state.updateUserDataStatus = DataStatus.PENDING;
		});
		builder.addCase(usersActions.updateProfile.fulfilled, (state, action) => {
			state.updateUserDataStatus = DataStatus.FULFILLED;
			state.user = {
				...state.user,
				...action.payload,
			};
		});
		builder.addCase(usersActions.updateProfile.rejected, (state) => {
			state.updateUserDataStatus = DataStatus.REJECTED;
		});
		builder.addCase(filesActions.updateUserAvatar.pending, (state) => {
			state.avatarUploadDataStatus = DataStatus.PENDING;
		});
		builder.addCase(
			filesActions.updateUserAvatar.fulfilled,
			(state, action) => {
				state.avatarUploadDataStatus = DataStatus.FULFILLED;

				if (state.user) {
					state.user = {
						...state.user,
						avatarUrl: action.payload.url,
					};
				}
			},
		);
		builder.addCase(filesActions.updateUserAvatar.rejected, (state) => {
			state.avatarUploadDataStatus = DataStatus.REJECTED;
		});
	},
	initialState,
	name: "auth",
	reducers: {},
});

export { actions, name, reducer };
