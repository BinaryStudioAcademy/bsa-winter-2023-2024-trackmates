import { CourseError, HTTPCode } from "shared";

import {
	type VendorRequestDto,
	type VendorResponseDto,
} from "./libs/types/types.js";
import { VendorEntity } from "./vendor.entity.js";
import { VendorRepository } from "./vendor.repository.js";

type Constructor = {
	vendorRepository: VendorRepository;
};

class VendorService {
	private vendorRepository: VendorRepository;

	public constructor({ vendorRepository }: Constructor) {
		this.vendorRepository = vendorRepository;
	}

	public async create(vendor: VendorRequestDto): Promise<VendorResponseDto> {
		const newVendor = await this.vendorRepository.create(
			VendorEntity.initializeNew({
				key: vendor.key,
				name: vendor.name,
			}),
		);

		return newVendor.toObject();
	}

	public async delete(id: number): Promise<boolean> {
		return await this.vendorRepository.delete(id);
	}

	public async find(id: number): Promise<VendorResponseDto> {
		const entity = await this.vendorRepository.find(id);

		if (!entity) {
			throw new CourseError(
				`Not found vendor with id '${id}'`,
				HTTPCode.BAD_REQUEST,
			);
		}

		return entity.toObject();
	}

	public async findAll(): Promise<VendorResponseDto[]> {
		const entities = await this.vendorRepository.findAll();
		return entities.map((entity) => entity.toObject());
	}

	public async findAllByKeys(keys: string[]): Promise<VendorResponseDto[]> {
		const vendors = await this.findAll();
		return vendors.filter(({ key }) => keys.includes(key));
	}

	public async findById(id: number): Promise<VendorResponseDto | null> {
		const entity = await this.vendorRepository.find(id);
		return entity ? entity.toObject() : null;
	}

	public async update(
		id: number,
		vendor: VendorRequestDto,
	): Promise<VendorResponseDto | null> {
		const updatedVendor = await this.vendorRepository.update(
			id,
			VendorEntity.initializeNew({
				key: vendor.key,
				name: vendor.name,
			}),
		);

		return updatedVendor?.toObject() ?? null;
	}
}

export { VendorService };
