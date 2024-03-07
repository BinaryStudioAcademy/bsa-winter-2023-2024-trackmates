import { config } from "~/libs/modules/config/config.js";
import { http } from "~/libs/modules/http/http.js";
import { storage } from "~/libs/modules/storage/storage.js";

import { FriendsApi } from "./friends-api.js";

const friendsApi = new FriendsApi({
	baseUrl: config.ENV.API.ORIGIN_URL,
	http,
	storage,
});

export { friendsApi };
export { useLoadFriends } from "./libs/hooks/hooks.js";
export { actions, reducer } from "./slices/friends.js";
