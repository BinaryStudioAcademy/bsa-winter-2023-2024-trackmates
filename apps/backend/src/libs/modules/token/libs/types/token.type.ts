import { type JWTVerifyResult } from "jose";

import { type TokenPayload } from "./types.js";

type Token = {
	create(payload: TokenPayload): Promise<string>;
	verify(token: string): Promise<JWTVerifyResult<TokenPayload>>;
};

export { type Token };
