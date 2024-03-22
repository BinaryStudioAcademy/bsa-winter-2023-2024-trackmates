import { SortOrder } from "~/libs/enums/enums.js";
import { type Repository } from "~/libs/types/types.js";

import { CommentEntity } from "./comment.entity.js";
import { type CommentModel } from "./comment.model.js";
import { RelationName } from "./libs/enums/enums.js";

class CommentRepository implements Repository<CommentEntity> {
	private authorWithAvatarRelation = `[${RelationName.AUTHOR}.[${RelationName.AVATAR_FILE}, ${RelationName.SUBSCRIPTION}]]`;

	private commentModel: typeof CommentModel;

	public constructor(commentModel: typeof CommentModel) {
		this.commentModel = commentModel;
	}

	public async create(commentEntity: CommentEntity): Promise<CommentEntity> {
		const { activityId, text, userId } = commentEntity.toNewObject();

		const comment = await this.commentModel
			.query()
			.insert({
				activityId,
				text,
				userId,
			})
			.returning("*")
			.withGraphFetched(this.authorWithAvatarRelation)
			.execute();

		return CommentEntity.initialize({
			activityId: comment.activityId,
			author: {
				avatarUrl: comment.author.avatarFile?.url ?? null,
				firstName: comment.author.firstName,
				lastName: comment.author.lastName,
				nickname: comment.author.nickname,
				subscription: comment.author.subscription ?? null,
			},
			createdAt: comment.createdAt,
			id: comment.id,
			text: comment.text,
			updatedAt: comment.updatedAt,
			userId: comment.userId,
		});
	}

	public async delete(id: number): Promise<boolean> {
		const deletedItemsCount = await this.commentModel
			.query()
			.deleteById(id)
			.execute();

		return Boolean(deletedItemsCount);
	}

	public async find(id: number): Promise<CommentEntity | null> {
		const comment = await this.commentModel
			.query()
			.findById(id)
			.withGraphJoined(this.authorWithAvatarRelation)
			.execute();

		if (!comment) {
			return null;
		}

		return CommentEntity.initialize({
			activityId: comment.activityId,
			author: {
				avatarUrl: comment.author.avatarFile?.url ?? null,
				firstName: comment.author.firstName,
				lastName: comment.author.lastName,
				nickname: comment.author.nickname,
				subscription: comment.author.subscription ?? null,
			},
			createdAt: comment.createdAt,
			id: comment.id,
			text: comment.text,
			updatedAt: comment.updatedAt,
			userId: comment.userId,
		});
	}

	public async findAll(): Promise<CommentEntity[]> {
		const comments = await this.commentModel.query().execute();

		return comments.map((comment) => {
			return CommentEntity.initialize({
				activityId: comment.activityId,
				author: {
					avatarUrl: comment.author.avatarFile?.url ?? null,
					firstName: comment.author.firstName,
					lastName: comment.author.lastName,
					nickname: comment.author.nickname,
					subscription: comment.author.subscription ?? null,
				},
				createdAt: comment.createdAt,
				id: comment.id,
				text: comment.text,
				updatedAt: comment.updatedAt,
				userId: comment.userId,
			});
		});
	}

	public async findAllByActivityId(
		activityId: number,
	): Promise<{ items: CommentEntity[] }> {
		const comments = await this.commentModel
			.query()
			.where("activityId", activityId)
			.orderBy("comments.createdAt", SortOrder.DESC)
			.withGraphJoined(this.authorWithAvatarRelation)
			.execute();

		const commentItems = comments.map((comment) => {
			return CommentEntity.initialize({
				activityId: comment.activityId,
				author: {
					avatarUrl: comment.author.avatarFile?.url ?? null,
					firstName: comment.author.firstName,
					lastName: comment.author.lastName,
					nickname: comment.author.nickname,
					subscription: comment.author.subscription ?? null,
				},
				createdAt: comment.createdAt,
				id: comment.id,
				text: comment.text,
				updatedAt: comment.updatedAt,
				userId: comment.userId,
			});
		});

		return {
			items: commentItems,
		};
	}

	public async update(
		id: number,
		entity: CommentEntity,
	): Promise<CommentEntity> {
		const commentPayload = entity.toNewObject();

		const comment = await this.commentModel
			.query()
			.patchAndFetchById(id, commentPayload)
			.withGraphFetched(this.authorWithAvatarRelation)
			.execute();

		return CommentEntity.initialize({
			activityId: comment.activityId,
			author: {
				avatarUrl: comment.author.avatarFile?.url ?? null,
				firstName: comment.author.firstName,
				lastName: comment.author.lastName,
				nickname: comment.author.nickname,
				subscription: comment.author.subscription ?? null,
			},
			createdAt: comment.createdAt,
			id: comment.id,
			text: comment.text,
			updatedAt: comment.updatedAt,
			userId: comment.userId,
		});
	}
}

export { CommentRepository };
