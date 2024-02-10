type DefaultApiHandlerOptions = {
	body?: unknown;
	params?: unknown;
	headers?: unknown;
	query?: unknown;
};

type APIHandlerOptions<
	T extends DefaultApiHandlerOptions = DefaultApiHandlerOptions,
> = {
	body: T["body"];
	params: T["params"];
	headers?: T["headers"] & {
		authorization?: string | undefined;
	};
	query: T["query"];
};

export { type APIHandlerOptions };
