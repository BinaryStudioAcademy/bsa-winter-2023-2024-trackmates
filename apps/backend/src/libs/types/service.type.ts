type Service<T = unknown> = {
	create(payload: unknown): Promise<T>;
	delete(id: unknown): Promise<boolean>;
	find(id: unknown): Promise<T | null>;
	findAll(parameters: unknown): Promise<{
		items: T[];
	}>;
	update(id: unknown, payload: unknown): Promise<T>;
};

export { type Service };
