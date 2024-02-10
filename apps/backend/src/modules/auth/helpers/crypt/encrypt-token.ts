import { jwtVerify } from "jose";

import { config } from "~/libs/modules/config/config.js";

async function encryptToken(token: string) {
	try {
		const secret = new TextEncoder().encode(config.ENV.JWT.SECRET_KEY);

		const { payload } = await jwtVerify(token, secret);

		return payload;
	} catch {
		return null;
	}
}

export { encryptToken };
