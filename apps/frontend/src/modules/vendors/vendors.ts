import { config } from "~/libs/modules/config/config.js";
import { http } from "~/libs/modules/http/http.js";
import { storage } from "~/libs/modules/storage/storage.js";

import { VendorApi } from "./vendors-api.js";

const vendorApi = new VendorApi({
	baseUrl: config.ENV.API.ORIGIN_URL,
	http,
	storage,
});

export { vendorApi };
export { VendorKey } from "./libs/enums/enums.js";
export { type VendorResponseDto } from "./libs/types/types.js";
export { actions, reducer } from "./slices/vendors.js";
