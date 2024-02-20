import { APIPath } from "~/libs/enums/enums.js";
import {
	type APIHandlerResponse,
	BaseController,
} from "~/libs/modules/controller/controller.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Logger } from "~/libs/modules/logger/logger.js";

import { VendorsApiPath } from "./libs/enums/enums.js";
import { VendorService } from "./vendor.service.js";

/*** @swagger
 * components:
 *    schemas:
 *      Vendor:
 *        type: object
 *        properties:
 *          id:
 *            type: number
 *          key:
 *            type: string
 *          name:
 *            type: string
 */
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

	/**
	 * @swagger
	 * /vendors/:
	 *    get:
	 *      description: Return vendors of courses
	 *      responses:
	 *        200:
	 *          description: Successful operation
	 *          content:
	 *            application/json:
	 *              schema:
	 *                type: object
	 *                properties:
	 *                  message:
	 *                    type: object
	 *                    $ref: "#/components/schemas/Vendor"
	 */
	private async findAll(): Promise<APIHandlerResponse> {
		return {
			payload: await this.vendorService.findAll(),
			status: HTTPCode.OK,
		};
	}
}

export { VendorController };
