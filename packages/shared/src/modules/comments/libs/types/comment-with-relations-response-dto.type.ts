import { type UserDetailsResponseDto } from "../../../users/users.js";
import { type CommentResponseDto } from "./comment-response-dto.type.js";

type CommentWithRelationsResponseDto = CommentResponseDto & {
	author: UserDetailsResponseDto;
};

export { type CommentWithRelationsResponseDto };
