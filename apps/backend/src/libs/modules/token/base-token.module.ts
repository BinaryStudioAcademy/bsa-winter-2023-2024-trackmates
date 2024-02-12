import { JWTPayload, SignJWT, jwtVerify } from "jose";

import { Token } from "./libs/types/types.js";

class BaseToken implements Token {
	public async createToken(
		payload: JWTPayload,
		expiration: Date,
	): Promise<string> {
		// TODO: fix secret
		const secret = new TextEncoder().encode("");
		const alg = "HS256";

		return await new SignJWT(payload)
			.setProtectedHeader({ alg })
			.setExpirationTime(expiration)
			.sign(secret);
	}

	public async verifyToken(token: string): Promise<JWTPayload> {
		// TODO: fix secret
		const secret = new TextEncoder().encode("");
		const { payload } = await jwtVerify(token, secret);

		return payload;
	}
}

export { BaseToken };
