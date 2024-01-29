import { config } from "~/libs/modules/config/config.ts";
import { http } from "~/libs/modules/http/http.ts";
import { storage } from "~/libs/modules/storage/storage.ts";

import { AuthApi } from "./auth-api.ts";

const authApi = new AuthApi({
	baseUrl: config.ENV.API.ORIGIN_URL,
	storage,
	http,
});

export { authApi };
