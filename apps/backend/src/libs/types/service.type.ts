type Service<T = unknown> = {
	create(payload: unknown): Promise<T>;
	delete(): Promise<boolean>;
	find(): Promise<T | null>;
	findAll(): Promise<{
		items: T[];
	}>;
	update(): Promise<T>;
};

export { type Service };
