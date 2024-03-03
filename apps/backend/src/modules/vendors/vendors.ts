import { config } from "~/libs/modules/config/config.js";
import { http } from "~/libs/modules/http/http.js";
import { logger } from "~/libs/modules/logger/logger.js";

import { EdxService } from "./edx.service.js";
import { UdemyService } from "./udemy.service.js";
import { VendorController } from "./vendor.controller.js";
import { VendorModel } from "./vendor.model.js";
import { VendorRepository } from "./vendor.repository.js";
import { VendorService } from "./vendor.service.js";

const edxService = new EdxService({
	baseUrl: config.ENV.EDX.URL,
	http,
});

const udemyService = new UdemyService({
	baseUrl: config.ENV.UDEMY.URL,
	clientId: config.ENV.UDEMY.CLIENT_ID,
	clientSecret: config.ENV.UDEMY.CLIENT_SECRET,
	http,
});

const vendorRepository = new VendorRepository(VendorModel);
const vendorService = new VendorService({ vendorRepository });
const vendorController = new VendorController(logger, vendorService);

export { edxService, udemyService };
export { vendorController, vendorService };
export {
	type VendorResponseDto,
	type VendorService as VendorApi,
} from "./libs/types/types.js";
export { VendorEntity } from "./vendor.entity.js";
export { VendorModel } from "./vendor.model.js";
export { type VendorService } from "./vendor.service.js";
