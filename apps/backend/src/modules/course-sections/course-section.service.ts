import { ExceptionMessage } from "~/libs/enums/enums.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Service } from "~/libs/types/types.js";

import { CourseSectionEntity } from "./course-section.entity.js";
import { type CourseSectionRepository } from "./course-section.repository.js";
import { CourseSectionError } from "./libs/exceptions/exceptions.js";
import {
	type CourseSectionAddRequestDto,
	type CourseSectionDto,
	type CourseSectionGetAllResponseDto,
} from "./libs/types/types.js";

type Constructor = {
	courseSectionRepository: CourseSectionRepository;
};

class CourseSectionService implements Service {
	private courseSectionRepository: CourseSectionRepository;

	public constructor({ courseSectionRepository }: Constructor) {
		this.courseSectionRepository = courseSectionRepository;
	}

	public async create(
		payload: CourseSectionAddRequestDto,
	): Promise<CourseSectionDto> {
		const courseSection = await this.courseSectionRepository.create(
			CourseSectionEntity.initializeNew({
				courseId: payload.courseId,
				description: payload.description,
				title: payload.title,
			}),
		);

		return courseSection.toObject();
	}

	public async delete(id: number): Promise<boolean> {
		const courseSection = await this.courseSectionRepository.find(id);

		if (!courseSection) {
			throw new CourseSectionError({
				message: ExceptionMessage.COURSE_SECTION_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}

		return await this.courseSectionRepository.delete(id);
	}

	//TODO
	public find(): Promise<CourseSectionEntity | null> {
		return Promise.resolve(null);
	}

	public async findAll(): Promise<CourseSectionGetAllResponseDto> {
		const sections = await this.courseSectionRepository.findAll();

		return { items: sections.map((section) => section.toObject()) };
	}

	public async findCourseSections(
		courseId: number,
	): Promise<CourseSectionGetAllResponseDto> {
		const courseSections =
			await this.courseSectionRepository.findCourseSections(courseId);

		return {
			items: courseSections.map((courseSection) => courseSection.toObject()),
		};
	}

	//TODO
	public update(): Promise<CourseSectionEntity | null> {
		return Promise.resolve(null);
	}
}

export { CourseSectionService };
