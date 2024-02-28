import { APIPath } from "~/libs/enums/enums.js";
import { BaseHTTPApi } from "~/libs/modules/api/api.js";
import { type HTTP } from "~/libs/modules/http/http.js";
import { type Storage } from "~/libs/modules/storage/storage.js";

import { FeedActionType } from "./libs/enums/enums.js";
import {
	type FeedActionDto,
	type GetFeedResponseDto,
} from "./libs/types/types.js";

type Constructor = {
	baseUrl: string;
	http: HTTP;
	storage: Storage;
};

const feedAction: FeedActionDto = {
	course: {
		description: "",
		id: 1,
		image: "",
		title: "[NEW] Ultimate AWS Certified Cloud Practitioner CLF-C02",
		url: "",
		vendor: {
			id: 1,
			key: "udemy",
			name: "Udemy",
			url: "https://www.udemy.com",
		},
		vendorCourseId: "3142166",
	},
	courseSection: {
		courseId: 1,
		description:
			"Explore how to get the most out of this course learn about all the popular G Suite Apps",
		id: 2,
		title: "Introduction to the Complete Google Workspace (G Suite) Course",
	},
	id: 1,
	type: FeedActionType.FINISH_MODULE,
	user: {
		avatarUrl: null,
		createdAt: "2024-02-16T13:49:52.164Z",
		email: "k20@gmail.com",
		firstName: "Katerina",
		id: 1,
		lastName: "Savelieva",
		updatedAt: "2024-02-16T13:49:52.164Z",
	},
};

class FeedApi extends BaseHTTPApi {
	public constructor({ baseUrl, http, storage }: Constructor) {
		super({ baseUrl, http, path: APIPath.FEED, storage });
	}

	public getFeed(userId: number): Promise<GetFeedResponseDto> {
		// const response = await this.load(
		// 	this.getFullEndpoint(`${FeedApiPath.ROOT}${userId}`, {}),
		// 	{
		// 		contentType: ContentType.JSON,
		// 		hasAuth: true,
		// 		method: "GET",
		// 	},
		// );

		// eslint-disable-next-line no-console
		console.log(userId);

		return Promise.resolve({ actions: [feedAction, feedAction] });
	}
}

export { FeedApi };
