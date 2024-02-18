import { APIPath } from "~/libs/enums/enums.js";
import {
	type APIHandlerResponse,
	BaseController,
} from "~/libs/modules/controller/controller.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Logger } from "~/libs/modules/logger/logger.js";

import { VendorsApiPath } from "./libs/enums/enums.js";
import { VendorService } from "./vendor.service.js";

class VendorController extends BaseController {
	private vendorService: VendorService;

	public constructor(logger: Logger, vendorService: VendorService) {
		super(logger, APIPath.VENDORS);

		this.vendorService = vendorService;

		this.addRoute({
			handler: () => this.findAll(),
			method: "GET",
			path: VendorsApiPath.ROOT,
		});
	}

	private async findAll(): Promise<APIHandlerResponse> {
		return {
			payload: await this.vendorService.findAll(),
			status: HTTPCode.OK,
		};
	}
}

export { VendorController };
