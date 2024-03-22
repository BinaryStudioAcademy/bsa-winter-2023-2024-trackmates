import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Repository } from "~/libs/types/types.js";

import { VendorErrorMessage } from "./libs/enums/enums.js";
import { VendorError } from "./libs/exceptions/exceptions.js";
import { VendorEntity } from "./vendor.entity.js";
import { type VendorModel } from "./vendor.model.js";

class VendorRepository implements Repository<VendorEntity> {
	private vendorModel: typeof VendorModel;

	public constructor(vendorModel: typeof VendorModel) {
		this.vendorModel = vendorModel;
	}

	public async create(vendor: VendorEntity): Promise<VendorEntity> {
		const vendorModel = await this.vendorModel
			.query()
			.insert(vendor.toNewObject())
			.returning("*")
			.castTo<VendorModel>()
			.execute();

		return VendorEntity.initialize({
			createdAt: vendorModel.createdAt,
			id: vendorModel.id,
			key: vendorModel.key,
			name: vendorModel.name,
			updatedAt: vendorModel.updatedAt,
			url: vendorModel.url,
		});
	}

	public async delete(id: number): Promise<boolean> {
		const itemsCount = await this.vendorModel.query().deleteById(id).execute();

		return Boolean(itemsCount);
	}

	public async find(id: number): Promise<VendorEntity | null> {
		const vendor = await this.vendorModel.query().findById(id).execute();

		return vendor
			? VendorEntity.initialize({
					createdAt: vendor.createdAt,
					id: vendor.id,
					key: vendor.key,
					name: vendor.name,
					updatedAt: vendor.updatedAt,
					url: vendor.url,
				})
			: null;
	}

	public async findAll(): Promise<{ items: VendorEntity[] }> {
		const vendors = await this.vendorModel.query().execute();

		return {
			items: vendors.map((vendor) => {
				return VendorEntity.initialize({
					createdAt: vendor.createdAt,
					id: vendor.id,
					key: vendor.key,
					name: vendor.name,
					updatedAt: vendor.updatedAt,
					url: vendor.url,
				});
			}),
		};
	}

	public async findAllByKeys(keys: string[]): Promise<VendorEntity[]> {
		const vendors = await this.vendorModel
			.query()
			.whereIn("key", keys)
			.execute();

		return vendors.map((vendor) => {
			return VendorEntity.initialize({
				createdAt: vendor.createdAt,
				id: vendor.id,
				key: vendor.key,
				name: vendor.name,
				updatedAt: vendor.updatedAt,
				url: vendor.url,
			});
		});
	}

	public async update(
		id: number,
		entity: VendorEntity,
	): Promise<VendorEntity | null> {
		const vendor = entity.toNewObject();
		const vendorModel = await this.vendorModel
			.query()
			.findById(id)
			.patch(vendor)
			.returning("*")
			.castTo<VendorModel>()
			.execute();

		if (!vendorModel.id) {
			throw new VendorError({
				message: VendorErrorMessage.NOT_FOUND_VENDOR,
				status: HTTPCode.BAD_REQUEST,
			});
		}

		return vendorModel.id
			? VendorEntity.initialize({
					createdAt: vendorModel.createdAt,
					id: vendorModel.id,
					key: vendorModel.key,
					name: vendorModel.name,
					updatedAt: vendorModel.updatedAt,
					url: vendor.url,
				})
			: null;
	}
}

export { VendorRepository };
