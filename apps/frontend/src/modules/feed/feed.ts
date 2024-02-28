import { config } from "~/libs/modules/config/config.js";
import { http } from "~/libs/modules/http/http.js";
import { storage } from "~/libs/modules/storage/storage.js";

import { FeedApi } from "./feed-api.js";

const feedApi = new FeedApi({
	baseUrl: config.ENV.API.ORIGIN_URL,
	http,
	storage,
});

export { feedApi };
export { actions, reducer } from "./slices/feed.js";
