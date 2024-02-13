import { JWTVerifyResult, SignJWT, jwtVerify } from "jose";

import { type Config } from "~/libs/modules/config/config.js";

import { type Token, type TokenPayload } from "./libs/types/types.js";

class BaseToken implements Token {
	private algorithm: string;
	private expiresIn: string;
	private secret: Uint8Array;

	public constructor(config: Config) {
		this.algorithm = config.ENV.JWT.ALGORITHM;
		this.expiresIn = config.ENV.JWT.EXPIRES_IN;
		this.secret = Buffer.from(config.ENV.JWT.SECRET, "utf8");
	}

	public async create(payload: TokenPayload): Promise<string> {
		return await new SignJWT(payload)
			.setProtectedHeader({ alg: this.algorithm })
			.setExpirationTime(this.expiresIn)
			.sign(this.secret);
	}

	public async verify(token: string): Promise<JWTVerifyResult<TokenPayload>> {
		return await jwtVerify<TokenPayload>(token, this.secret);
	}
}

export { BaseToken };
