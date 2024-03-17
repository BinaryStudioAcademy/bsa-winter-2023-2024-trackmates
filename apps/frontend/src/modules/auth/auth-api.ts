import { APIPath, ContentType } from "~/libs/enums/enums.js";
import { BaseHTTPApi } from "~/libs/modules/api/api.js";
import { type HTTP } from "~/libs/modules/http/http.js";
import { type Storage } from "~/libs/modules/storage/storage.js";
import {
	type UserAuthResponseDto,
	type UserSignInRequestDto,
	type UserSignInResponseDto,
	type UserSignUpRequestDto,
	type UserSignUpResponseDto,
} from "~/modules/users/users.js";

import {
	type AuthForgotPasswordRequestDto,
	type AuthUpdatePasswordRequestDto,
} from "./auth.js";
import { AuthApiPath } from "./libs/enums/enums.js";
import { type AuthUpdatePasswordResponseDto } from "./libs/types/types.js";

type Constructor = {
	baseUrl: string;
	http: HTTP;
	storage: Storage;
};

class AuthApi extends BaseHTTPApi {
	public constructor({ baseUrl, http, storage }: Constructor) {
		super({ baseUrl, http, path: APIPath.AUTH, storage });
	}

	public async forgotPassword(
		payload: AuthForgotPasswordRequestDto,
	): Promise<boolean> {
		const response = await this.load(
			this.getFullEndpoint(AuthApiPath.FORGOT_PASSWORD, {}),
			{
				contentType: ContentType.JSON,
				hasAuth: false,
				method: "POST",
				payload: JSON.stringify(payload),
			},
		);
		const { success } = await response.json<{ success: boolean }>();

		return success;
	}

	public async getAuthenticatedUser(): Promise<UserAuthResponseDto | null> {
		const response = await this.load(
			this.getFullEndpoint(AuthApiPath.AUTHENTICATED_USER, {}),
			{
				hasAuth: true,
				method: "GET",
			},
		);

		return await response.json<UserAuthResponseDto | null>();
	}

	public async signIn(
		payload: UserSignInRequestDto,
	): Promise<UserSignInResponseDto> {
		const response = await this.load(
			this.getFullEndpoint(AuthApiPath.SIGN_IN, {}),
			{
				contentType: ContentType.JSON,
				hasAuth: false,
				method: "POST",
				payload: JSON.stringify(payload),
			},
		);

		return await response.json<UserSignInResponseDto>();
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

	public async updatePassword(
		payload: AuthUpdatePasswordRequestDto,
	): Promise<AuthUpdatePasswordResponseDto> {
		const response = await this.load(
			this.getFullEndpoint(AuthApiPath.UPDATE_PASSWORD, {}),
			{
				contentType: ContentType.JSON,
				hasAuth: false,
				method: "PATCH",
				payload: JSON.stringify(payload),
			},
		);

		return await response.json<AuthUpdatePasswordResponseDto>();
	}
}

export { AuthApi };
