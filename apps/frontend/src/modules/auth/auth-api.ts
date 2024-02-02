import { APIPath, ContentType } from "~/libs/enums/enums.ts";
import { BaseHTTPApi } from "~/libs/modules/api/api.ts";
import { type HTTP } from "~/libs/modules/http/http.ts";
import { type Storage } from "~/libs/modules/storage/storage.ts";
import {
	type UserSignUpRequestDto,
	type UserSignUpResponseDto,
} from "~/modules/users/users.ts";

import { AuthApiPath } from "./libs/enums/enums.ts";

type Constructor = {
	baseUrl: string;
	http: HTTP;
	storage: Storage;
};

class AuthApi extends BaseHTTPApi {
	public constructor({ baseUrl, http, storage }: Constructor) {
		super({ baseUrl, http, path: APIPath.AUTH, storage });
	}

	public async signUp(
		payload: UserSignUpRequestDto,
	): Promise<UserSignUpResponseDto> {
		const response = await this.load(
			this.getFullEndpoint(AuthApiPath.SIGN_UP, {}),
			{
				contentType: ContentType.JSON,
				hasAuth: false,
				method: "POST",
				payload: JSON.stringify(payload),
			},
		);

		return await response.json<UserSignUpResponseDto>();
	}
}

export { AuthApi };
