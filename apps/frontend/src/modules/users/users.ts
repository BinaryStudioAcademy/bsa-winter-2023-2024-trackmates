import { config } from "~/libs/modules/config/config.js";
import { http } from "~/libs/modules/http/http.js";
import { storage } from "~/libs/modules/storage/storage.js";

import { UserApi } from "./users-api.js";

const userApi = new UserApi({
	baseUrl: config.ENV.API.ORIGIN_URL,
	http,
	storage,
});

export { userApi };
export { UserErrorMessage, UserSex } from "./libs/enums/enums.js";
export { UserError } from "./libs/exceptions/exceptions.js";
export { userSexToPronoun } from "./libs/maps/maps.js";
export {
	type UserAuthResponseDto,
	type UserProfileRequestDto,
	type UserSignInRequestDto,
	type UserSignInResponseDto,
	type UserSignUpRequestDto,
	type UserSignUpResponseDto,
} from "./libs/types/types.js";
export {
	userProfileValidationSchema,
	userSignInValidationSchema,
	userSignUpValidationSchema,
} from "./libs/validation-schemas/validation-schemas.js";
export { actions, reducer } from "./slices/users.js";
