import { ExceptionMessage } from "~/libs/enums/enums.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Service } from "~/libs/types/types.js";

import { SectionStatusError } from "./libs/exceptions/exceptions.js";
import {
	type SectionStatusAddRequestDto,
	type SectionStatusGetAllRequestDto,
	type SectionStatusGetAllResponseDto,
	type SectionStatusResponseDto,
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
	): Promise<SectionStatusResponseDto> {
		const { courseSectionId, status, userId } = payload;

		const sectionStatus = await this.sectionStatusRepository.create(
			SectionStatusEntity.initializeNew({
				courseSectionId: courseSectionId,
				status: status,
				userId: userId,
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

	public async find(id: number): Promise<SectionStatusResponseDto> {
		const sectionStatus = await this.sectionStatusRepository.find(id);

		if (!sectionStatus) {
			throw new SectionStatusError({
				message: ExceptionMessage.SECTION_STATUS_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}

		return sectionStatus.toObject();
	}

	public async findAll(): Promise<SectionStatusGetAllResponseDto> {
		const sectionStatuses = await this.sectionStatusRepository.findAll();

		return {
			items: sectionStatuses.map((sectionStatus) => sectionStatus.toObject()),
		};
	}

	public async findAllByCourseIdAndUserId(
		query: SectionStatusGetAllRequestDto,
	): Promise<SectionStatusGetAllResponseDto> {
		const sectionStatuses =
			await this.sectionStatusRepository.findAllByCourseIdAndUserId(query);

		return {
			items: sectionStatuses.map((sectionStatus) => sectionStatus.toObject()),
		};
	}

	public async update(
		id: number,
		payload: SectionStatusUpdateRequestDto,
	): Promise<SectionStatusResponseDto> {
		const sectionStatus = await this.sectionStatusRepository.find(id);

		if (!sectionStatus) {
			throw new SectionStatusError({
				message: ExceptionMessage.SECTION_STATUS_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}

		const updatedSection = await this.sectionStatusRepository.update(
			id,
			SectionStatusEntity.initializeNew({
				courseSectionId: sectionStatus.courseSectionId,
				status: payload.status,
				userId: sectionStatus.userId,
			}),
		);

		return updatedSection.toObject();
	}
}

export { SectionStatusService };
