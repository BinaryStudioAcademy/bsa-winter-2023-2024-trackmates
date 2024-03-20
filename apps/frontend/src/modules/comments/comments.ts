import { config } from "~/libs/modules/config/config.js";
import { http } from "~/libs/modules/http/http.js";
import { storage } from "~/libs/modules/storage/storage.js";

import { CommentApi } from "./comments-api.js";

const commentApi = new CommentApi({
	baseUrl: config.ENV.API.ORIGIN_URL,
	http,
	storage,
});

export { commentApi };
export {
	type CommentCreateRequestDto,
	type CommentWithRelationsResponseDto,
} from "./libs/types/types.js";
export { commentTextValidationSchema } from "./libs/validation-schemas/validation-schemas.js";
export { actions, reducer } from "./slices/comments.js";
