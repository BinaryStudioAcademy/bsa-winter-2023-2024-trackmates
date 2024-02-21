type Service<T = unknown> = {
	create(payload: unknown): Promise<T>;
	delete(id: number): Promise<boolean>;
	find(id: number): Promise<T>;
	findAll(): Promise<T[]>;
	update(id: number, partialPayload: Partial<T>): Promise<T>;
};

export { type Service };
