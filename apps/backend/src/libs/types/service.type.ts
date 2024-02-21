type Service<T = unknown> = {
	create(payload: unknown): Promise<T>;
	delete(): Promise<boolean>;
	find(): Promise<T | null>;
	findAll(): Promise<{
		items: T[];
	}>;
	update(id: number, payload: unknown): Promise<T>;
};

export { type Service };
