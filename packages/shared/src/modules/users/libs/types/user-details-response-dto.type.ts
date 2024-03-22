import { type SubscriptionResponseDto } from "../../../subscriptions/subscriptions.js";

type UserDetailsResponseDto = {
	avatarUrl: null | string;
	firstName: string;
	lastName: string;
	nickname: null | string;
	subscription: SubscriptionResponseDto | null;
};

export { type UserDetailsResponseDto };
