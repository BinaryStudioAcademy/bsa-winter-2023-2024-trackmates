import {
	type JWTPayload,
	type JWTVerifyResult,
	SignJWT,
	jwtVerify,
} from "jose";

import { type Token } from "./libs/types/types.js";

type Config = {
	algorithm: string;
	expiresIn: string;
	secret: Uint8Array;
};

class BaseToken<T extends JWTPayload> implements Token<T> {
	private algorithm: string;
	private expiresIn: string;
	private secret: Uint8Array;

	public constructor({ algorithm, expiresIn, secret }: Config) {
		this.algorithm = algorithm;
		this.expiresIn = expiresIn;
		this.secret = secret;
	}

	public async create(payload: T): Promise<string> {
		return await new SignJWT(payload)
			.setProtectedHeader({ alg: this.algorithm })
			.setExpirationTime(this.expiresIn)
			.sign(this.secret);
	}

	public async verify(token: string): Promise<JWTVerifyResult<T>> {
		return await jwtVerify<T>(token, this.secret);
	}
}

export { BaseToken };
