import { config } from "~/libs/modules/config/config.js";
import { http } from "~/libs/modules/http/http.js";
import { storage } from "~/libs/modules/storage/storage.js";

import { GroupsApi } from "./groups-api.js";

const groupsApi = new GroupsApi({
	baseUrl: config.ENV.API.ORIGIN_URL,
	http,
	storage,
});

export { groupsApi };
export { type GroupRequestDto } from "./libs/types/types.js";
export { actions, reducer } from "./slices/groups.js";
