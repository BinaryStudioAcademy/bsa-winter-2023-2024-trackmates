import { config } from "~/libs/modules/config/config.ts";
import { http } from "~/libs/modules/http/http.ts";
import { storage } from "~/libs/modules/storage/storage.ts";

import { UserApi } from "./users-api.ts";

const userApi = new UserApi({
	baseUrl: config.ENV.API.ORIGIN_URL,
	storage,
	http,
});

export { userApi };
export {
	type UserGetAllItemResponseDto,
	type UserGetAllResponseDto,
	type UserSignUpRequestDto,
	type UserSignUpResponseDto,
} from "./libs/types/types.ts";
export { userSignUpValidationSchema } from "./libs/validation-schemas/validation-schemas.ts";
