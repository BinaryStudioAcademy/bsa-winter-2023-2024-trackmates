type DefaultApiHandlerOptions = {
  body?: unknown;
  query?: unknown;
  params?: unknown;
};

type APIHandlerOptions<
  T extends DefaultApiHandlerOptions = DefaultApiHandlerOptions,
> = {
  body: T["body"];
  query: T["query"];
  params: T["params"];
};

export { type APIHandlerOptions };
