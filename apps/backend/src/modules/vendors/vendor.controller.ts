import { APIPath } from "~/libs/enums/enums.js";
import {
	type APIHandlerOptions,
	type APIHandlerResponse,
	BaseController,
} from "~/libs/modules/controller/controller.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Logger } from "~/libs/modules/logger/logger.js";

import { VendorsApiPath } from "./libs/enums/enums.js";
import { type VendorRequestDto } from "./libs/types/types.js";
import { type VendorService } from "./vendor.service.js";

/***
 * @swagger
 * components:
 *    schemas:
 *      Vendor:
 *        type: object
 *        properties:
 *          id:
 *            type: number
 *            format: number
 *            minimum: 1
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
			handler: (options) =>
				this.create(
					options as APIHandlerOptions<{
						body: VendorRequestDto;
					}>,
				),
			method: "POST",
			path: VendorsApiPath.ROOT,
		});
		this.addRoute({
			handler: (options) =>
				this.find(
					options as APIHandlerOptions<{
						params: { vendorId: number };
					}>,
				),
			method: "GET",
			path: VendorsApiPath.$VENDOR_ID,
		});
		this.addRoute({
			handler: () => this.findAll(),
			method: "GET",
			path: VendorsApiPath.ROOT,
		});
		this.addRoute({
			handler: (options) =>
				this.delete(
					options as APIHandlerOptions<{
						params: { vendorId: number };
					}>,
				),
			method: "DELETE",
			path: VendorsApiPath.$VENDOR_ID,
		});
		this.addRoute({
			handler: (options) =>
				this.update(
					options as APIHandlerOptions<{
						body: VendorRequestDto;
						params: { vendorId: number };
					}>,
				),
			method: "PUT",
			path: VendorsApiPath.$VENDOR_ID,
		});
	}

	/**
	 * @swagger
	 * /vendors:
	 *    post:
	 *      description: Create new vendor and return it
	 *      requestBody:
	 *        required: true
	 *        content:
	 *          application/json:
	 *            schema:
	 *              type: object
	 *              properties:
	 *                key:
	 *                  type: string
	 *                name:
	 *                  type: string
	 *      responses:
	 *        201:
	 *          description: Successful operation
	 *          content:
	 *            application/json:
	 *              schema:
	 *                  type: object
	 *                  $ref: "#/components/schemas/Vendor"
	 */
	private async create({
		body,
	}: APIHandlerOptions<{
		body: VendorRequestDto;
	}>): Promise<APIHandlerResponse> {
		return {
			payload: await this.vendorService.create(body),
			status: HTTPCode.CREATED,
		};
	}

	/**
	 * @swagger
	 * /vendors/:id:
	 *    delete:
	 *      description: Delete vendor by id
	 *      responses:
	 *        200:
	 *          description: Successful operation
	 *          content:
	 *            application/json:
	 *              schema:
	 *                type: object
	 *                properties:
	 *                  success:
	 *                    type: string
	 */
	private async delete({
		params: { vendorId },
	}: APIHandlerOptions<{
		params: { vendorId: number };
	}>): Promise<APIHandlerResponse> {
		const success = await this.vendorService.delete(vendorId);

		return {
			payload: { success },
			status: HTTPCode.OK,
		};
	}

	/**
	 * @swagger
	 * /vendors/:id:
	 *    get:
	 *      description: Return vendor by id
	 *      responses:
	 *        200:
	 *          description: Successful operation
	 *          content:
	 *            application/json:
	 *              schema:
	 *                type: object
	 *                $ref: "#/components/schemas/Vendor"
	 */
	private async find({
		params: { vendorId },
	}: APIHandlerOptions<{
		params: { vendorId: number };
	}>): Promise<APIHandlerResponse> {
		return {
			payload: await this.vendorService.find(vendorId),
			status: HTTPCode.OK,
		};
	}

	/**
	 * @swagger
	 * /vendors:
	 *    get:
	 *      description: Return all vendors
	 *      responses:
	 *        200:
	 *          description: Successful operation
	 *          content:
	 *            application/json:
	 *              schema:
	 *                type: array
	 *                items:
	 *                  type: object
	 *                  $ref: "#/components/schemas/Vendor"
	 */
	private async findAll(): Promise<APIHandlerResponse> {
		return {
			payload: await this.vendorService.findAll(),
			status: HTTPCode.OK,
		};
	}

	/**
	 * @swagger
	 * /vendors/:id:
	 *    put:
	 *      description: Update vendor and return it
	 *      requestBody:
	 *        required: true
	 *        content:
	 *          application/json:
	 *            schema:
	 *              type: object
	 *              $ref: "#/components/schemas/Vendor"
	 *      responses:
	 *        200:
	 *          description: Successful operation
	 *          content:
	 *            application/json:
	 *              schema:
	 *                  type: object
	 *                  $ref: "#/components/schemas/Vendor"
	 */
	private async update({
		body,
		params: { vendorId },
	}: APIHandlerOptions<{
		body: VendorRequestDto;
		params: { vendorId: number };
	}>): Promise<APIHandlerResponse> {
		const updatedVendor = await this.vendorService.update(vendorId, body);

		return {
			payload: updatedVendor,
			status: HTTPCode.OK,
		};
	}
}

export { VendorController };
