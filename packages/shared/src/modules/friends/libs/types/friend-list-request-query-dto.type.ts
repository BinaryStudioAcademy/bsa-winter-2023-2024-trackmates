import { type PaginationRequestDto } from "../../../../libs/types/types.js";

type FriendListRequestQueryDto = {
	search: string;
} & PaginationRequestDto;

export { type FriendListRequestQueryDto };
