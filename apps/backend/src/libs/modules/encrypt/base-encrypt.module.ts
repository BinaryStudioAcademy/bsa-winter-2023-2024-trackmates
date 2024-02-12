import { hash as genHash, genSalt } from "bcrypt";

import { Encrypt } from "./libs/types/types.js";

const SALT_ROUNDS = 10;

class BaseEncrypt implements Encrypt {
	private static saltRounds = SALT_ROUNDS;

	private generateSalt(): Promise<string> {
		return genSalt(BaseEncrypt.saltRounds);
	}

	public async compare({
		password,
		passwordHash,
		salt,
	}: {
		password: string;
		passwordHash: string;
		salt: string;
	}): Promise<boolean> {
		const hash = await genHash(password, salt);

		return hash === passwordHash;
	}

	public async encrypt(password: string): ReturnType<Encrypt["encrypt"]> {
		const salt = await this.generateSalt();
		const hash = await genHash(password, salt);

		return { hash, salt };
	}
}

export { BaseEncrypt };
