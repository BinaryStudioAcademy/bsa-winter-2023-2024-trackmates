type Repository<T = unknown> = {
	create(payload: unknown): Promise<T>;
	delete(): Promise<boolean>;
	find(): Promise<T | null>;
	findAll(): Promise<T[]>;
	update(id: number, payload: unknown): Promise<T | null>;
};

export { type Repository };
