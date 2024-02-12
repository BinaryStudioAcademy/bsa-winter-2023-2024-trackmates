import { hash as genHash, genSalt } from "bcrypt";

import { Encrypt } from "./libs/types/types.js";

const SALT_ROUNDS = 10;

class BaseEncrypt implements Encrypt {
	public async compare(
		data: string,
		hash: string,
		salt: string,
	): Promise<boolean> {
		const dataHash = await genHash(data, salt);

		return dataHash === hash;
	}

	public async encrypt(data: string): ReturnType<Encrypt["encrypt"]> {
		const salt = await genSalt(SALT_ROUNDS);
		const hash = await genHash(data, salt);

		return { hash, salt };
	}
}

export { BaseEncrypt };
