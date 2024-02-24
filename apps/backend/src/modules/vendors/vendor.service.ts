import { HTTPCode } from "~/libs/modules/http/http.js";

import { VendorErrorMessage } from "./libs/enums/enums.js";
import { VendorError } from "./libs/exceptions/exceptions.js";
import {
	type VendorRequestDto,
	type VendorResponseDto,
} from "./libs/types/types.js";
import { VendorEntity } from "./vendor.entity.js";
import { type VendorRepository } from "./vendor.repository.js";

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
				url: vendor.url,
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
			throw new VendorError(
				VendorErrorMessage.NOT_FOUND_VENDOR,
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
		const entities = await this.vendorRepository.findAllByKeys(keys);

		return entities.map((entity) => entity.toObject());
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
				url: vendor.url,
			}),
		);

		return updatedVendor ? updatedVendor.toObject() : null;
	}
}

export { VendorService };
