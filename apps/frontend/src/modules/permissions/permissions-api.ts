import { APIPath } from "~/libs/enums/enums.js";
import { BaseHTTPApi } from "~/libs/modules/api/api.js";
import { type HTTP } from "~/libs/modules/http/http.js";
import { type Storage } from "~/libs/modules/storage/storage.js";

import { PermissionsApiPath } from "./libs/enums/enums.js";
import { type AllPermissionsResponseDto } from "./libs/types/types.js";

type Constructor = {
	baseUrl: string;
	http: HTTP;
	storage: Storage;
};

class PermissionsApi extends BaseHTTPApi {
	public constructor({ baseUrl, http, storage }: Constructor) {
		super({ baseUrl, http, path: APIPath.PERMISSIONS, storage });
	}

	public async getAllPermissions(): Promise<AllPermissionsResponseDto> {
		const response = await this.load(
			this.getFullEndpoint(PermissionsApiPath.ROOT, {}),
			{
				hasAuth: true,
				method: "GET",
			},
		);

		return await response.json<AllPermissionsResponseDto>();
	}
}

export { PermissionsApi };
