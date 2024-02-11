import { UserInfoResponse } from "shared/src/modules/users/users.js";

type DefaultApiHandlerOptions = {
	body?: unknown;
	params?: unknown;
	query?: unknown;
};

type APIHandlerOptions<
	T extends DefaultApiHandlerOptions = DefaultApiHandlerOptions,
> = {
	body: T["body"];
	params: T["params"];
	query: T["query"];
	user: UserInfoResponse | null;
};

export { type APIHandlerOptions };
