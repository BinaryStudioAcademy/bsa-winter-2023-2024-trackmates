import { logger } from "~/libs/modules/logger/logger.js";

import { VendorController } from "./vendor.controller.js";
import { VendorModel } from "./vendor.model.js";
import { VendorRepository } from "./vendor.repository.js";
import { VendorService } from "./vendor.service.js";

const vendorRepository = new VendorRepository(VendorModel);
const vendorService = new VendorService({ vendorRepository });
const vendorController = new VendorController(logger, vendorService);

export { vendorController, vendorService };
export { type VendorApi } from "./libs/types/types.js";
export { type VendorService } from "./vendor.service.js";
