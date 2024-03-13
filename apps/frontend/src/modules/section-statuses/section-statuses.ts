import { config } from "~/libs/modules/config/config.js";
import { http } from "~/libs/modules/http/http.js";
import { storage } from "~/libs/modules/storage/storage.js";

import { SectionStatusApi } from "./section-statuses-api.js";

const sectionStatusApi = new SectionStatusApi({
	baseUrl: config.ENV.API.ORIGIN_URL,
	http,
	storage,
});

export { sectionStatusApi };
export { SectionStatus } from "./libs/enums/enums.js";
export { type SectionStatusResponseDto } from "./libs/types/types.js";
export { actions, reducer } from "./slices/section-statuses.js";
