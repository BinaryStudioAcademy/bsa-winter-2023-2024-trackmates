import { createAsyncThunk } from "@reduxjs/toolkit";

import { type AsyncThunkConfig } from "~/libs/types/types.js";
import { type GetFeedResponseDto } from "~/modules/feed/libs/types/types.js";

import { name as sliceName } from "./feed.slice.js";

const loadFeed = createAsyncThunk<GetFeedResponseDto, number, AsyncThunkConfig>(
	`${sliceName}/load-feed`,
	(userId, { extra }) => {
		const { feedApi, notification } = extra;

		try {
			return feedApi.getFeed(userId);
		} catch (error) {
			notification.error((error as Error).message);

			throw error;
		}
	},
);

export { loadFeed };
