import { ExceptionMessage } from "~/libs/enums/enums.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Service } from "~/libs/types/types.js";

import { CommentEntity } from "./comment.entity.js";
import { type CommentRepository } from "./comment.repository.js";
import { CommentError } from "./libs/exceptions/exceptions.js";
import {
	type CommentCreateRequestDto,
	type CommentGetAllResponseDto,
	type CommentUpdateRequestDto,
	type CommentWithRelationsResponseDto,
} from "./libs/types/types.js";

type Constructor = {
	commentRepository: CommentRepository;
};

class CommentService implements Service {
	private commentRepository: CommentRepository;

	public constructor({ commentRepository }: Constructor) {
		this.commentRepository = commentRepository;
	}

	public async create(
		payload: CommentCreateRequestDto & { userId: number },
	): Promise<CommentWithRelationsResponseDto> {
		const comment = await this.commentRepository.create(
			CommentEntity.initializeNew({
				activityId: payload.activityId,
				text: payload.text,
				userId: payload.userId,
			}),
		);

		return comment.toObjectWithRelations();
	}

	public async delete(id: number): Promise<boolean> {
		return await this.commentRepository.delete(id);
	}

	public async find(id: number): Promise<CommentWithRelationsResponseDto> {
		const comment = await this.commentRepository.find(id);

		if (!comment) {
			throw new CommentError({
				message: ExceptionMessage.COMMENT_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}

		return comment.toObjectWithRelations();
	}

	public async findAll(): Promise<CommentGetAllResponseDto> {
		const comments = await this.commentRepository.findAll();

		return {
			items: comments.map((comment) => comment.toObjectWithRelations()),
		};
	}

	public async findAllByActivityId(
		activityId: number,
	): Promise<CommentGetAllResponseDto> {
		const { items: comments } =
			await this.commentRepository.findAllByActivityId(activityId);

		return {
			items: comments.map((comment) => comment.toObjectWithRelations()),
		};
	}

	public async update(
		id: number,
		{ payload, userId }: { payload: CommentUpdateRequestDto; userId: number },
	): Promise<CommentWithRelationsResponseDto> {
		const commentToUpdate = await this.find(id);

		if (commentToUpdate.userId !== userId) {
			throw new CommentError({
				message: ExceptionMessage.NO_PERMISSION,
				status: HTTPCode.NOT_FOUND,
			});
		}

		const updatedComment = await this.commentRepository.update(
			id,
			CommentEntity.initializeNew({
				activityId: commentToUpdate.activityId,
				text: payload.text,
				userId: commentToUpdate.userId,
			}),
		);

		return updatedComment.toObjectWithRelations();
	}
}

export { CommentService };
