import { config } from "~/libs/modules/config/config.js";
import { http } from "~/libs/modules/http/http.js";
import { storage } from "~/libs/modules/storage/storage.js";

import { SubscriptionApi } from "./subscription-api.js";

const subscriptionApi = new SubscriptionApi({
	baseUrl: config.ENV.API.ORIGIN_URL,
	http,
	storage,
});

export { subscriptionApi };
export { SubscriptionPlan } from "./libs/enums/enums.js";
export {
	type SubscriptionPaymentIntentCreateRequestDto,
	type SubscriptionPaymentIntentCreateResponseDto,
} from "./libs/types/types.js";
export { actions, reducer } from "./slices/subscription.js";
