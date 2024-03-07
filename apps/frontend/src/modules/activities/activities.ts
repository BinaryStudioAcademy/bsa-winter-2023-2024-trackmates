import { config } from "~/libs/modules/config/config.js";
import { http } from "~/libs/modules/http/http.js";
import { storage } from "~/libs/modules/storage/storage.js";

import { ActivitiesApi } from "./activities-api.js";

const activitiesApi = new ActivitiesApi({
	baseUrl: config.ENV.API.ORIGIN_URL,
	http,
	storage,
});

export { activitiesApi };
export { ActivityType } from "./libs/enums/enums.js";
export { getActivityTitle } from "./libs/helpers/helpers.js";
export { type ActivityResponseDto } from "./libs/types/types.js";
export { actions, reducer } from "./slices/activities.js";
