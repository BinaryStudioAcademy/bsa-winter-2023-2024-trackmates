import { type ContentType, type ValueOf } from "../../../../index.js";

type UserFileResponseDto = {
	contentType: ValueOf<typeof ContentType>;
	createdAt: string;
	id: number;
	updatedAt: string;
	url: string;
};

export { type UserFileResponseDto };
