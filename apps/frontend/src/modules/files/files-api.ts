import { APIPath } from "~/libs/enums/enums.js";
import { BaseHTTPApi } from "~/libs/modules/api/api.js";
import { type HTTP } from "~/libs/modules/http/http.js";
import { type Storage } from "~/libs/modules/storage/storage.js";

import { FilesApiPath } from "./libs/enums/enums.js";
import { type UserFileResponseDto } from "./libs/types/type.js";

type Constructor = {
	baseUrl: string;
	http: HTTP;
	storage: Storage;
};

class FilesApi extends BaseHTTPApi {
	public constructor({ baseUrl, http, storage }: Constructor) {
		super({ baseUrl, http, path: APIPath.FILES, storage });
	}

	public async updateAvatar(payload: FormData): Promise<UserFileResponseDto> {
		const response = await this.load(
			this.getFullEndpoint(FilesApiPath.UPLOAD_AVATAR, {}),
			{
				hasAuth: true,
				method: "POST",
				payload,
			},
		);

		return await response.json<UserFileResponseDto>();
	}
}

export { FilesApi };
