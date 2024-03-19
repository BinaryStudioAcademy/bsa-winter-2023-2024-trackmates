import { type JWTVerifyResult } from "jose";

type Token<T> = {
	create(payload: T): Promise<string>;
	verify(token: string): Promise<JWTVerifyResult<T>>;
};

export { type Token };
