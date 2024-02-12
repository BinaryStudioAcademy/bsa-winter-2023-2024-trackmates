import { UserAuthResponse } from "~/modules/users/users.js";

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
	user: UserAuthResponse | null;
};

export { type APIHandlerOptions };
