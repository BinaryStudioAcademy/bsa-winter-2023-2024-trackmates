import { JWTVerifyResult } from "jose";

import { TokenPayload } from "./token-payload.type.js";

type Token = {
	create(payload: TokenPayload, expiration: Date): Promise<string>;
	verify(token: string): Promise<JWTVerifyResult<TokenPayload>>;
};

export { type Token };
