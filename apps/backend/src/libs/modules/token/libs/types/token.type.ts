import { JWTPayload } from "jose";

type Token = {
	createToken(payload: JWTPayload, expiration: Date): Promise<string>;
	verifyToken(token: string): Promise<JWTPayload>;
};

export { type Token };
