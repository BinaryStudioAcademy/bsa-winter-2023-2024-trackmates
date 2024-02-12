import { hash as genHash, genSalt } from "bcrypt";

import { Encript } from "./libs/types/types.js";

const SALT_ROUNDS = 10;

class BaseEncript implements Encript {
	public async compare(
		data: string,
		hash: string,
		salt: string,
	): Promise<boolean> {
		const dataHash = await genHash(data, salt);

		return dataHash === hash;
	}

	public async encript(data: string): ReturnType<Encript["encript"]> {
		const salt = await genSalt(SALT_ROUNDS);
		const hash = await genHash(data, salt);

		return { hash, salt };
	}
}

export { BaseEncript };
