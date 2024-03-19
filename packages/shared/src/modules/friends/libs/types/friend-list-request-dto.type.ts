import { type PaginationRequestDto } from "../../../../libs/types/types.js";

type FriendListRequestDto = {
	search: string;
} & PaginationRequestDto;

export { type FriendListRequestDto };
