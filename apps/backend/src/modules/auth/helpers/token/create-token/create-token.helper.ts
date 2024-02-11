import { JWTPayload, SignJWT } from "jose";

const createToken = async (
	payload: JWTPayload,
	expiration: Date,
): Promise<string> => {
	// TODO: fix secret
	const secret = new TextEncoder().encode("");
	const alg = "HS256";

	return await new SignJWT(payload)
		.setProtectedHeader({ alg })
		.setExpirationTime(expiration)
		.sign(secret);
};

export { createToken };
