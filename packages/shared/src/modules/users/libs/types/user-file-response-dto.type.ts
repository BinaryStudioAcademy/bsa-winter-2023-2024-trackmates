import { type ContentType } from "../../../../libs/enums/enums.js";
import { type ValueOf } from "../../../../libs/types/types.js";

type UserFileResponseDto = {
	contentType: ValueOf<typeof ContentType>;
	createdAt: string;
	id: number;
	updatedAt: string;
	url: string;
};

export { type UserFileResponseDto };
