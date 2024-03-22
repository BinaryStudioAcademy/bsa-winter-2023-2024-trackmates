import { type PaginationResponseDto } from "~/libs/types/types.js";

type Repository<T = unknown> = {
	create(payload: unknown): Promise<T>;
	delete(id: number): Promise<boolean>;
	find(id: number): Promise<T | null>;
	findAll(payload: unknown): Promise<{ items: T[] } | PaginationResponseDto<T>>;
	update(id: number, payload: unknown): Promise<T | null>;
};

export { type Repository };
