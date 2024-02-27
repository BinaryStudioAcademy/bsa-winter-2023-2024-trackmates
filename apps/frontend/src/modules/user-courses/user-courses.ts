import { config } from "~/libs/modules/config/config.js";
import { http } from "~/libs/modules/http/http.js";
import { storage } from "~/libs/modules/storage/storage.js";

import { UserCourseApi } from "./user-courses-api.js";

const userCourseApi = new UserCourseApi({
	baseUrl: config.ENV.API.ORIGIN_URL,
	http,
	storage,
});

export { type AddCourseRequestDto } from "./libs/types/types.js";
export { userCourseApi };
export { actions, reducer } from "./slices/user-courses.js";
