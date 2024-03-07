import { type CommentWithRelationsResponseDto } from "./comment-with-relations-response-dto.type.js";

type CommentGetAllResponseDto = {
	items: CommentWithRelationsResponseDto[];
};

export { type CommentGetAllResponseDto };
