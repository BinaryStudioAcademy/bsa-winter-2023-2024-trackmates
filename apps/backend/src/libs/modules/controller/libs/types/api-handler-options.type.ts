import { type UploadedFile } from "~/modules/files/files.js";
import { type UserAuthResponseDto } from "~/modules/users/users.js";

type DefaultApiHandlerOptions = {
	body?: unknown;
	params?: unknown;
	query?: unknown;
	uploadedFile?: UploadedFile | null;
	user?: UserAuthResponseDto | null;
};

type APIHandlerOptions<
	T extends DefaultApiHandlerOptions = DefaultApiHandlerOptions,
> = {
	body: T["body"];
	params: T["params"];
	query: T["query"];
	uploadedFile: T["uploadedFile"];
	user: T["user"];
};

export { type APIHandlerOptions };
