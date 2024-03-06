import { ExceptionMessage } from "~/libs/enums/enums.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Service } from "~/libs/types/types.js";
import {
	type ActivityEntity,
	type ActivityService,
	ActivityType,
} from "~/modules/activities/activities.js";
import { type CourseSectionRepository } from "~/modules/course-sections/course-sections.js";

import { SectionStatus } from "./libs/enums/enums.js";
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
	activityService: ActivityService;
	courseSectionRepository: CourseSectionRepository;
	sectionStatusRepository: SectionStatusRepository;
};

class SectionStatusService implements Service {
	private activityService: ActivityService;
	private courseSectionRepository: CourseSectionRepository;
	private sectionStatusRepository: SectionStatusRepository;

	public constructor({
		activityService,
		courseSectionRepository,
		sectionStatusRepository,
	}: Constructor) {
		this.activityService = activityService;
		this.courseSectionRepository = courseSectionRepository;
		this.sectionStatusRepository = sectionStatusRepository;
	}

	private async createActivity(
		sectionStatus: SectionStatusEntity,
	): Promise<ActivityEntity> {
		const { courseSectionId, id: actionId, userId } = sectionStatus.toObject();

		const courseSection =
			await this.courseSectionRepository.find(courseSectionId);

		if (!courseSection) {
			throw new SectionStatusError({
				message: ExceptionMessage.COURSE_SECTION_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}

		const { course, id, title } = courseSection.toObject();

		if (!course) {
			throw new SectionStatusError({
				message: ExceptionMessage.COURSE_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}

		return await this.activityService.create<
			typeof ActivityType.FINISH_SECTION
		>({
			actionId,
			payload: {
				courseId: course.id,
				courseTitle: course.title,
				id,
				title,
				vendorId: course.vendorId,
			},
			type: ActivityType.FINISH_SECTION,
			userId,
		});
	}

	public async create(
		payload: SectionStatusAddRequestDto & { userId: number },
	): Promise<SectionStatusResponseDto> {
		const { courseSectionId, status, userId } = payload;

		const sectionStatus = await this.sectionStatusRepository.create(
			SectionStatusEntity.initializeNew({
				courseSectionId,
				status,
				userId,
			}),
		);

		await this.createActivity(sectionStatus);

		return sectionStatus.toObject();
	}

	public async createActivityById(id: number): Promise<ActivityEntity> {
		const sectionStatus = await this.sectionStatusRepository.find(id);

		if (!sectionStatus) {
			throw new SectionStatusError({
				message: ExceptionMessage.SECTION_STATUS_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}

		return await this.createActivity(sectionStatus);
	}

	public async delete(id: number): Promise<boolean> {
		const sectionStatus = await this.sectionStatusRepository.find(id);

		if (!sectionStatus) {
			throw new SectionStatusError({
				message: ExceptionMessage.SECTION_STATUS_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}

		const isDeleted = await this.sectionStatusRepository.delete(id);

		if (isDeleted) {
			await this.deleteActivity(id, sectionStatus.toObject().userId);
		}

		return isDeleted;
	}

	public async deleteActivity(
		actionId: number,
		userId: number,
	): Promise<boolean> {
		return await this.activityService.deleteByKeyFields<
			typeof ActivityType.FINISH_SECTION
		>({
			actionId,
			type: ActivityType.FINISH_SECTION,
			userId,
		});
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

		const updatedStatusEntity = await this.sectionStatusRepository.update(
			id,
			SectionStatusEntity.initializeNew({
				courseSectionId: sectionStatus.courseSectionId,
				status: payload.status,
				userId: sectionStatus.userId,
			}),
		);
		const updatedStatus = updatedStatusEntity.toObject();
		const { status, userId } = updatedStatus;

		status === SectionStatus.COMPLETED
			? await this.createActivity(updatedStatusEntity)
			: await this.deleteActivity(id, userId);

		return updatedStatus;
	}
}

export { SectionStatusService };
