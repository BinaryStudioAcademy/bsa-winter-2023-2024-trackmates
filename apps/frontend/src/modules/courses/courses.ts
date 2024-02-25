import { config } from "~/libs/modules/config/config.js";
import { http } from "~/libs/modules/http/http.js";
import { storage } from "~/libs/modules/storage/storage.js";

import { CourseApi } from "./courses-api.js";

const courseApi = new CourseApi({
	baseUrl: config.ENV.API.ORIGIN_URL,
	http,
	storage,
});

export { courseApi };
export {
	type CourseDto,
	type CourseSearchFilterDto,
} from "./libs/types/types.js";
export { actions, reducer } from "./slices/courses.js";
