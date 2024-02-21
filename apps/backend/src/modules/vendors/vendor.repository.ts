import { type Repository } from "~/libs/types/types.js";

import { VendorEntity } from "./vendor.entity.js";
import { VendorModel } from "./vendor.model.js";

class VendorRepository implements Repository<VendorEntity> {
	private vendorModel: typeof VendorModel;

	public constructor(vendorModel: typeof VendorModel) {
		this.vendorModel = vendorModel;
	}

	public create(): Promise<VendorEntity> {
		throw new Error("Method not implemented.");
	}

	public delete(): Promise<boolean> {
		return Promise.resolve(true);
	}

	public find(): Promise<VendorEntity | null> {
		return Promise.resolve(null);
	}

	public async findAll(): Promise<VendorEntity[]> {
		const vendors = await this.vendorModel.query().execute();

		return vendors.map((vendor) =>
			VendorEntity.initialize({
				createdAt: vendor.createdAt,
				id: vendor.id,
				key: vendor.key,
				name: vendor.name,
				updatedAt: vendor.updatedAt,
			}),
		);
	}

	public async findById(id: number): Promise<VendorEntity | null> {
		const vendor = await this.vendorModel.query().findById(id).execute();

		return vendor
			? VendorEntity.initialize({
					createdAt: vendor.createdAt,
					id: vendor.id,
					key: vendor.key,
					name: vendor.name,
					updatedAt: vendor.updatedAt,
				})
			: null;
	}

	public update(): Promise<VendorEntity | null> {
		return Promise.resolve(null);
	}
}

export { VendorRepository };
