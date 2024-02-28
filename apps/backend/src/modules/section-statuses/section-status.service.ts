import { ExceptionMessage } from "~/libs/enums/enums.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Service } from "~/libs/types/types.js";

import { SectionStatusError } from "./libs/exceptions/exceptions.js";
import {
	type SectionStatusAddRequestDto,
	type SectionStatusDto,
	type SectionStatusGetAllResponseDto,
	type SectionStatusGetRequestDto,
	type SectionStatusUpdateRequestDto,
} from "./libs/types/types.js";
import { SectionStatusEntity } from "./section-status.entity.js";
import { type SectionStatusRepository } from "./section-status.repository.js";

type Constructor = {
	sectionStatusRepository: SectionStatusRepository;
};

class SectionStatusService implements Service {
	private sectionStatusRepository: SectionStatusRepository;

	public constructor({ sectionStatusRepository }: Constructor) {
		this.sectionStatusRepository = sectionStatusRepository;
	}

	public async create(
		payload: SectionStatusAddRequestDto,
	): Promise<SectionStatusDto> {
		const sectionStatus = await this.sectionStatusRepository.create(
			SectionStatusEntity.initializeNew({
				courseSectionId: payload.courseSectionId,
				status: payload.status,
				userId: payload.userId,
			}),
		);

		return sectionStatus.toObject();
	}

	public async delete(id: number): Promise<boolean> {
		const sectionStatus = await this.sectionStatusRepository.find(id);

		if (!sectionStatus) {
			throw new SectionStatusError({
				message: ExceptionMessage.SECTION_STATUS_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}

		return await this.sectionStatusRepository.delete(id);
	}

	public async find(id: number): Promise<SectionStatusEntity> {
		const sectionStatus = await this.sectionStatusRepository.find(id);

		if (!sectionStatus) {
			throw new SectionStatusError({
				message: ExceptionMessage.SECTION_STATUS_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}

		return sectionStatus;
	}

	public async findAll(): Promise<SectionStatusGetAllResponseDto> {
		const sectionStatuses = await this.sectionStatusRepository.findAll();

		return {
			items: sectionStatuses.map((sectionStatus) => sectionStatus.toObject()),
		};
	}

	public async findByCourseSectionIdAndUserId(
		query: SectionStatusGetRequestDto,
	): Promise<SectionStatusDto | null> {
		const sectionStatus =
			await this.sectionStatusRepository.findByCourseSectionIdAndUserId(query);

		return sectionStatus?.toObject() ?? null;
	}

	public async update(
		id: number,
		payload: SectionStatusUpdateRequestDto,
	): Promise<SectionStatusEntity> {
		const sectionStatus = await this.sectionStatusRepository.find(id);

		if (!sectionStatus) {
			throw new SectionStatusError({
				message: ExceptionMessage.SECTION_STATUS_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}

		return await this.sectionStatusRepository.update(
			id,
			SectionStatusEntity.initializeNew({
				courseSectionId: sectionStatus.courseSectionId,
				status: payload.status,
				userId: sectionStatus.userId,
			}),
		);
	}
}

export { SectionStatusService };
