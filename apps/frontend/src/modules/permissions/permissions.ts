import { config } from "~/libs/modules/config/config.js";
import { http } from "~/libs/modules/http/http.js";
import { storage } from "~/libs/modules/storage/storage.js";

import { PermissionsApi } from "./permissions-api.js";

const permissionsApi = new PermissionsApi({
	baseUrl: config.ENV.API.ORIGIN_URL,
	http,
	storage,
});

export {
	type PermissionResponseDto,
	type PermissionsGetAllResponseDto,
} from "./libs/types/types.js";
export { permissionsApi };
export { actions } from "./slices/permissions.js";
