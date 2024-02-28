import { createAsyncThunk } from "@reduxjs/toolkit";

import { type AsyncThunkConfig } from "~/libs/types/types.js";
import { type GetFeedResponseDto } from "~/modules/feed/libs/types/types.js";

import { name as sliceName } from "./feed.slice.js";

const loadFeed = createAsyncThunk<
	GetFeedResponseDto,
	undefined,
	AsyncThunkConfig
>(`${sliceName}/load-feed`, (_payload, { extra }) => {
	const { feedApi } = extra;

	return feedApi.getFeed();
});

export { loadFeed };
