import { JWTPayload } from "jose";

type Tokenizer = {
	createToken(payload: JWTPayload, expiration: Date): Promise<string>;
	verifyToken(token: string): Promise<JWTPayload>;
};

export { type Tokenizer };
