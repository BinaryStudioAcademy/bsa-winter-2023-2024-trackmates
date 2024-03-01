type Repository<T = unknown> = {
	create(payload: unknown): Promise<T>;
	delete(payload: unknown): Promise<boolean>;
	find(id: number): Promise<T | null>;
	findAll(payload: unknown): Promise<T[]>;
	update(id: number, payload: unknown): Promise<T | null>;
};

export { type Repository };
