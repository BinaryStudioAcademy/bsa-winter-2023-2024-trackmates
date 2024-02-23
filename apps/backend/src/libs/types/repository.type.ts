type Repository<T = unknown> = {
	create(payload: unknown): Promise<T | null>;
	delete(id: number): Promise<boolean>;
	find(id: number): Promise<T | null>;
	findAll(): Promise<T[]>;
	update(id: number, payload: unknown): Promise<T | null>;
};

export { type Repository };
