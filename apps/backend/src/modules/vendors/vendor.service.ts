import { type VendorResponseDto } from "./libs/types/types.js";
import { VendorRepository } from "./vendor.repository.js";

type Constructor = {
	vendorRepository: VendorRepository;
};

class VendorService {
	private vendorRepository: VendorRepository;

	public constructor({ vendorRepository }: Constructor) {
		this.vendorRepository = vendorRepository;
	}

	public async findAll(): Promise<VendorResponseDto[] | null> {
		const entities = await this.vendorRepository.findAll();
		return entities.map((entity) => entity.toObject());
	}

	// public async findById(id: number): Promise<VendorResponseDto | null> {
	// 	const entity = await this.vendorRepository.findById(id);

	// 	return entity ? entity.toObject() : null;
	// }
}

export { VendorService };
