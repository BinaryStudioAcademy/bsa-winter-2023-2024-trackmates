import { type Entity } from "~/libs/types/types.js";
import { type UserDetailsResponseDto } from "~/modules/users/users.js";

class CommentEntity implements Entity {
	private activityId: number;

	private author: UserDetailsResponseDto | null;

	private createdAt: string;

	private id: null | number;

	private text: string;

	private updatedAt: string;

	private userId: number;

	private constructor({
		activityId,
		author,
		createdAt,
		id,
		text,
		updatedAt,
		userId,
	}: {
		activityId: number;
		author: UserDetailsResponseDto | null;
		createdAt: string;
		id: null | number;
		text: string;
		updatedAt: string;
		userId: number;
	}) {
		this.createdAt = createdAt;
		this.id = id;
		this.text = text;
		this.updatedAt = updatedAt;
		this.activityId = activityId;
		this.userId = userId;
		this.author = author;
	}

	public static initialize({
		activityId,
		author,
		createdAt,
		id,
		text,
		updatedAt,
		userId,
	}: {
		activityId: number;
		author: UserDetailsResponseDto | null;
		createdAt: string;
		id: null | number;
		text: string;
		updatedAt: string;
		userId: number;
	}): CommentEntity {
		return new CommentEntity({
			activityId,
			author,
			createdAt,
			id,
			text,
			updatedAt,
			userId,
		});
	}

	public static initializeNew({
		activityId,
		text,
		userId,
	}: {
		activityId: number;
		text: string;
		userId: number;
	}): CommentEntity {
		return new CommentEntity({
			activityId,
			author: null,
			createdAt: "",
			id: null,
			text,
			updatedAt: "",
			userId,
		});
	}

	public toNewObject(): {
		activityId: number;
		text: string;
		userId: number;
	} {
		return {
			activityId: this.activityId,
			text: this.text,
			userId: this.userId,
		};
	}

	public toObject(): {
		activityId: number;
		id: number;
		text: string;
		userId: number;
	} {
		return {
			activityId: this.activityId,
			id: this.id as number,
			text: this.text,
			userId: this.userId,
		};
	}
	public toObjectWithRelations(): {
		activityId: number;
		author: UserDetailsResponseDto;
		id: number;
		text: string;
		userId: number;
	} {
		return {
			activityId: this.activityId,
			author: this.author as UserDetailsResponseDto,
			id: this.id as number,
			text: this.text,
			userId: this.userId,
		};
	}
}

export { CommentEntity };
