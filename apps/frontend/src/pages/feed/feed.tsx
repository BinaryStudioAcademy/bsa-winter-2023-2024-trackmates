import {
	useAppDispatch,
	useAppSelector,
	useEffect,
} from "~/libs/hooks/hooks.js";
import { FeedActionType } from "~/modules/feed/libs/enums/enum.js";
import { type FeedActionDto } from "~/modules/feed/libs/types/types.js";
import { actions } from "~/modules/friends/friends.js"; // todo
import { type UserAuthResponseDto } from "~/modules/users/users.js";

import { FeedActionList } from "./libs/components/components.js";
import styles from "./styles.module.css";

const getAction = (user: UserAuthResponseDto): FeedActionDto => {
	return {
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
		user,
	};
};

const Feed: React.FC = () => {
	const followings = useAppSelector((state) => state.friends.followings);
	const dispatch = useAppDispatch();

	const feedActions: FeedActionDto[] = followings.flatMap((user) => [
		getAction(user),
		getAction(user),
	]);

	useEffect(() => {
		void dispatch(actions.getFollowings());
	}, [dispatch]);

	return (
		<div className={styles["wrapper"]}>
			<h2>Friends Activity Feed</h2>
			<FeedActionList actions={feedActions} />
		</div>
	);
};

export { Feed };
