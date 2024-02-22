type Repository<T = unknown> = {
	create(payload: unknown): Promise<T | null>;
	delete(id: number, userId: number): Promise<boolean>;
	find(id: number, userId: number): Promise<T | null>;
	findAll(id: number): Promise<T[]>;
	update(id: number, payload: unknown): Promise<T | null>;
};

export { type Repository };
