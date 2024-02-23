import { CourseError, HTTPCode } from "shared";

import { type Repository } from "~/libs/types/types.js";

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
				})
			: null;
	}

	public async findAll(): Promise<VendorEntity[]> {
		const vendors = await this.vendorModel.query().execute();

		return vendors.map((vendor) => {
			return VendorEntity.initialize({
				createdAt: vendor.createdAt,
				id: vendor.id,
				key: vendor.key,
				name: vendor.name,
				updatedAt: vendor.updatedAt,
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
			throw new CourseError(
				`Not found vendor with id '${id}'`,
				HTTPCode.BAD_REQUEST,
			);
		}

		return vendorModel.id
			? VendorEntity.initialize({
					createdAt: vendorModel.createdAt,
					id: vendorModel.id,
					key: vendorModel.key,
					name: vendorModel.name,
					updatedAt: vendorModel.updatedAt,
				})
			: null;
	}
}

export { VendorRepository };
