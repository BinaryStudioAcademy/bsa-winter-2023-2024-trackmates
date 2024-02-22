type Repository<T = unknown> = {
	create(payload: unknown): Promise<T>;
	delete(id: unknown): Promise<boolean>;
	find(id: unknown): Promise<T | null>;
	findAll(): Promise<T[]>;
	update(id: unknown, payload: unknown): Promise<T | null>;
};

export { type Repository };
