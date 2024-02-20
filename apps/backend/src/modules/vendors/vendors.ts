import { config } from "~/libs/modules/config/config.js";
import { logger } from "~/libs/modules/logger/logger.js";

import { http } from "../../libs/modules/http/http.js";
import { UdemyService } from "./udemy.service.js";
import { VendorController } from "./vendor.controller.js";
import { VendorModel } from "./vendor.model.js";
import { VendorRepository } from "./vendor.repository.js";
import { VendorService } from "./vendor.service.js";

const udemyService = new UdemyService({
	baseUrl: config.ENV.UDEMY.URL,
	clientId: config.ENV.UDEMY.CLIENT_ID,
	clientSecret: config.ENV.UDEMY.CLIENT_SECRET,
	http,
});

const vendorRepository = new VendorRepository(VendorModel);
const vendorService = new VendorService({ vendorRepository });
const vendorController = new VendorController(logger, vendorService);

export { udemyService };
export { vendorController, vendorService };
export { CourseField } from "./libs/enums/enums.js";
export { type VendorService as VendorApi } from "./libs/types/types.js";
export { type VendorService } from "./vendor.service.js";
