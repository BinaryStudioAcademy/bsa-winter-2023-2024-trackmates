import { createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type Friend, type ValueOf } from "~/libs/types/types.js";

import { type FriendResponseDto } from "../libs/types/types.js";
import { acceptRequest, denyRequest, loadAll, sendRequest } from "./actions.js";

type State = {
	dataStatus: ValueOf<typeof DataStatus>;
	friends: Friend[];
};

const transformUser = (currentUserId: number) => {
	const imageUrl =
		"https://s3-alpha-sig.figma.com/img/e5a8/4d2a/8468b40071144244537e7aa36b4d9354?Expires=1708905600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=YabQdizET7TaHqgYdN~Kai8uMZBSMzSZ0rZL2goz3TgB0QE14X~jzsIvcN5yRmYT~dT5q3Xo33ThriO0QmovboskT6Um5OagC-Zyj-zu40pczDLI7L7-sw15AXjfIWA1G5nPCPPQ30lmLG999MM-LY9v~a1BnhmwDJ1N9r7bPaBOA8PEEmJ4RDSCfnhJC9sDdHUG8-VJGh04amY7NCrKHJjhTYW5iEIlkFiN5pkl7HhTCh-IWckvqZAeB-qTcfhb6AW60gf0IqzzNIO-KeLz1LdpCvSe0Ynty5W4qkLJFwtqCA2jBPkTRfk~iFgspQtBE7Xy3u~0j4EK8dKxx9~RbQ__";

	return ({
		firstUser,
		firstUserId,
		id,
		isInvitationAccepted,
		secondUser,
	}: FriendResponseDto): Friend => {
		if (isInvitationAccepted) {
			return currentUserId === firstUserId
				? {
						fullName: `${secondUser?.userDetails.firstName} ${secondUser?.userDetails.lastName}`,
						id,
						imageUrl,
						status: "friend",
					}
				: {
						fullName: `${firstUser?.userDetails.firstName} ${firstUser?.userDetails.lastName}`,
						id,
						imageUrl,
						status: "friend",
					};
		} else if (currentUserId === firstUserId) {
			return {
				fullName: `${secondUser?.userDetails.firstName} ${secondUser?.userDetails.lastName}`,
				id,
				imageUrl,
				status: "requested",
			};
		} else {
			return {
				fullName: `${firstUser?.userDetails.firstName} ${firstUser?.userDetails.lastName}`,
				id,
				imageUrl,
				status: "invited",
			};
		}
	};
};

const initialState: State = {
	dataStatus: DataStatus.IDLE,
	friends: [],
};
const { actions, name, reducer } = createSlice({
	extraReducers(builder) {
		builder.addCase(acceptRequest.fulfilled, (state, action) => {
			const friend = state.friends.find(({ id }) => id === action.payload);
			if (!friend) {
				return state;
			}
			friend.status = "friend";
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(acceptRequest.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(acceptRequest.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});

		builder.addCase(denyRequest.fulfilled, (state, action) => {
			state.friends = state.friends.filter(({ id }) => id !== action.payload);
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(denyRequest.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(denyRequest.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});

		builder.addCase(loadAll.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(loadAll.fulfilled, (state, action) => {
			const { currentUserId, friends } = action.payload;

			if (!currentUserId) {
				return state;
			}

			state.friends = friends.map(transformUser(currentUserId));

			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(loadAll.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});

		builder.addCase(sendRequest.fulfilled, (state, action) => {
			const { currentUserId, friendRequest } = action.payload;

			if (!currentUserId) {
				return state;
			}

			state.friends = [
				...state.friends,
				transformUser(currentUserId)(friendRequest),
			];
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(sendRequest.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(sendRequest.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});
	},
	initialState,
	name: "friends",
	reducers: {},
});

export { actions, name, reducer };
