import { type Repository } from "~/libs/types/repository.type.js";

class ProfileRepository implements Repository {
	create(payload: unknown): Promise<unknown> {
		return Promise.resolve(payload);
	}
	delete(): Promise<boolean> {
		return Promise.resolve(true);
	}
	find(): Promise<null> {
		return Promise.resolve(null);
	}
	findAll(): Promise<null[]> {
		return Promise.resolve([]);
	}
	update(): Promise<null> {
		return Promise.resolve(null);
	}
}

export { ProfileRepository };
