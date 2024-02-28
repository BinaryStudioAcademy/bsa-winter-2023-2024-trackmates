import { ExceptionMessage, HTTPCode } from "~/libs/enums/enums.js";
import { type Service } from "~/libs/types/types.js";
import { type FriendRepository } from "~/modules/friends/friends.js";
import { type UserRepository } from "~/modules/users/users.js";

import { ChatEntity } from "./chat.entity.js";
import { type ChatRepository } from "./chat.repository.js";
import { ChatError } from "./libs/exceptions/exceptions.js";
import {
	type ChatCreateRequestDto,
	type ChatGetAllItemResponseDto,
	type ChatResponseDto,
	type ChatSingleItemResponseDto,
} from "./libs/types/types.js";

class ChatService implements Service {
	private chatRepository: ChatRepository;

	private friendRepository: FriendRepository;

	private userRepository: UserRepository;

	public constructor(
		chatRepository: ChatRepository,
		friendRepository: FriendRepository,
		userRepository: UserRepository,
	) {
		this.chatRepository = chatRepository;
		this.friendRepository = friendRepository;
		this.userRepository = userRepository;
	}

	public async create({
		chatData,
		userId,
	}: {
		chatData: ChatCreateRequestDto;
		userId: number;
	}): Promise<ChatSingleItemResponseDto> {
		const chatByMembersIds = await this.chatRepository.findByMembersIds(
			userId,
			chatData.userId,
		);

		if (chatByMembersIds) {
			return chatByMembersIds.toObjectWithMessages(userId);
		}

		const firstUser = await this.userRepository.findById(userId);
		const secondUser = await this.userRepository.findById(chatData.userId);

		if (!firstUser || !secondUser) {
			throw new ChatError({
				message: ExceptionMessage.USER_NOT_FOUND,
				status: HTTPCode.BAD_REQUEST,
			});
		}

		const isUsersMutualFollowers =
			await this.friendRepository.checkIsMutualFollowersByIds(
				userId,
				chatData.userId,
			);

		if (!isUsersMutualFollowers) {
			throw new ChatError({
				message: ExceptionMessage.USER_NOT_MUTUAL_FOLLOWERS,
				status: HTTPCode.FORBIDDEN,
			});
		}

		const createdChat = await this.chatRepository.create(
			ChatEntity.initializeNew({
				firstUser,
				secondUser,
			}),
		);

		return createdChat.toObjectWithMessages(userId);
	}

	public async delete(id: number): Promise<boolean> {
		const chatById = await this.chatRepository.find(id);

		if (!chatById) {
			throw new ChatError({
				message: ExceptionMessage.CHAT_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}

		return await this.chatRepository.delete(id);
	}

	public async find(id: number): Promise<ChatResponseDto> {
		const chatById = await this.chatRepository.find(id);

		if (!chatById) {
			throw new ChatError({
				message: ExceptionMessage.CHAT_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}

		return chatById.toObject();
	}

	public async findAll(
		userId: number,
	): Promise<{ items: ChatGetAllItemResponseDto[] }> {
		const chatsByUserId = await this.chatRepository.findAll(userId);

		return {
			items: chatsByUserId.map((chatByUserId) => {
				return chatByUserId.toObjectWithLastMessage(userId);
			}),
		};
	}

	public async findWithMessages({
		id,
		userId,
	}: {
		id: number;
		userId: number;
	}): Promise<ChatSingleItemResponseDto> {
		const chatById = await this.chatRepository.findWithMessage(id);

		if (!chatById) {
			throw new ChatError({
				message: ExceptionMessage.CHAT_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}

		const { firstUser, secondUser } = chatById.toObject();

		if (userId !== firstUser.id && userId !== secondUser.id) {
			throw new ChatError({
				message: ExceptionMessage.NO_PERMISSION,
				status: HTTPCode.FORBIDDEN,
			});
		}

		return chatById.toObjectWithMessages(userId);
	}

	public async update(
		id: number,
		{
			firstUserId,
			secondUserId,
		}: { firstUserId: number; secondUserId: number },
	): Promise<ChatResponseDto> {
		const chatById = await this.chatRepository.find(id);

		if (!chatById) {
			throw new ChatError({
				message: ExceptionMessage.CHAT_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}

		const firstUser = await this.userRepository.findById(firstUserId);
		const secondUser = await this.userRepository.findById(secondUserId);

		if (!firstUser || !secondUser) {
			throw new ChatError({
				message: ExceptionMessage.USER_NOT_FOUND,
				status: HTTPCode.BAD_REQUEST,
			});
		}

		const updatedChat = await this.chatRepository.update(
			id,
			ChatEntity.initializeNew({
				firstUser,
				secondUser,
			}),
		);

		return updatedChat.toObject();
	}
}

export { ChatService };
