import { ExceptionMessage } from "~/libs/enums/enums.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Service } from "~/libs/types/types.js";
import { type ActivityService } from "~/modules/activities/activities.js";
import {
	type NotificationService,
	NotificationType,
} from "~/modules/notifications/notifications.js";

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
	activityService: ActivityService;
	commentRepository: CommentRepository;
	notificationService: NotificationService;
};

class CommentService implements Service {
	private activityService: ActivityService;

	private commentRepository: CommentRepository;

	private notificationService: NotificationService;

	public constructor({
		activityService,
		commentRepository,
		notificationService,
	}: Constructor) {
		this.activityService = activityService;
		this.commentRepository = commentRepository;
		this.notificationService = notificationService;
	}

	public async create(
		payload: CommentCreateRequestDto & { userId: number },
	): Promise<CommentWithRelationsResponseDto> {
		const activity = await this.activityService.find(payload.activityId);

		if (!activity) {
			throw new CommentError({
				message: ExceptionMessage.ACTIVITY_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}

		const comment = await this.commentRepository.create(
			CommentEntity.initializeNew({
				activityId: payload.activityId,
				text: payload.text,
				userId: payload.userId,
			}),
		);

		const commentObject = comment.toObjectWithRelations();

		if (activity.user.id !== payload.userId) {
			void this.notificationService.create({
				actionId: commentObject.id,
				receiverUserId: activity.user.id,
				type: NotificationType.NEW_COMMENT,
				userId: payload.userId,
			});
		}

		return commentObject;
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
