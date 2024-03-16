import { APIPath, ContentType } from "~/libs/enums/enums.js";
import { BaseHTTPApi } from "~/libs/modules/api/api.js";
import { type HTTP } from "~/libs/modules/http/http.js";
import { type Storage } from "~/libs/modules/storage/storage.js";

import { SubscriptionApiPath } from "./libs/enums/enums.js";
import {
	type SubscriptionPaymentIntentCancelRequestDto,
	type SubscriptionPaymentIntentCreateRequestDto,
	type SubscriptionPaymentIntentCreateResponseDto,
	type SubscriptionResponseDto,
} from "./libs/types/types.js";

type Constructor = {
	baseUrl: string;
	http: HTTP;
	storage: Storage;
};

class SubscriptionApi extends BaseHTTPApi {
	public constructor({ baseUrl, http, storage }: Constructor) {
		super({ baseUrl, http, path: APIPath.SUBSCRIPTIONS, storage });
	}

	public async cancelPaymentIntent(
		payload: SubscriptionPaymentIntentCancelRequestDto,
	): Promise<boolean> {
		const response = await this.load(
			this.getFullEndpoint(SubscriptionApiPath.PAYMENT_INTENT, {}),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: "DELETE",
				payload: JSON.stringify(payload),
			},
		);

		return await response.json<boolean>();
	}

	public async createPaymentIntent(
		payload: SubscriptionPaymentIntentCreateRequestDto,
	): Promise<SubscriptionPaymentIntentCreateResponseDto> {
		const response = await this.load(
			this.getFullEndpoint(SubscriptionApiPath.PAYMENT_INTENT, {}),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: "POST",
				payload: JSON.stringify(payload),
			},
		);

		return await response.json<SubscriptionPaymentIntentCreateResponseDto>();
	}

	public async subscribe(): Promise<SubscriptionResponseDto> {
		const response = await this.load(
			this.getFullEndpoint(SubscriptionApiPath.ROOT, {}),
			{
				hasAuth: true,
				method: "POST",
			},
		);

		return await response.json<SubscriptionResponseDto>();
	}
}

export { SubscriptionApi };
