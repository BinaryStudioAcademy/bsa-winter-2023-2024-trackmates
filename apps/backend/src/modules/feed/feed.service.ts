// import { ExceptionMessage } from "~/libs/enums/enums.js";
// import { HTTPCode } from "~/libs/modules/http/http.js";
// import { type Service } from "~/libs/types/types.js";

import { FeedActionType } from "./libs/enums/enums.js";
import {
	type FeedActionDto,
	type GetFeedResponseDto,
} from "./libs/types/types.js";

// type Constructor = {
// 	 courseSectionRepository: CourseSectionRepository;
// };

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

class FeedService {
	// private courseSectionRepository: CourseSectionRepository;

	// public constructor({ courseSectionRepository }: Constructor) {
	// 	this.courseSectionRepository = courseSectionRepository;
	// }

	public async getFeed(userId: number): Promise<GetFeedResponseDto> {
		// eslint-disable-next-line no-console
		console.log(userId);

		return await Promise.resolve({ actions: [feedAction, feedAction] });
	}
}

export { FeedService };
