import {
	Button,
	Courses,
	Image,
	Loader,
	Navigate,
} from "~/libs/components/components.js";
import { DEFAULT_USER_AVATAR } from "~/libs/constants/constants.js";
import { AppRoute, DataStatus } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppSelector,
	useEffect,
	useParams,
} from "~/libs/hooks/hooks.js";
import { actions } from "~/modules/user-courses/user-courses.js";

import { UserButton } from "./libs/components/components.js";
import styles from "./styles.module.css";

const User: React.FC = () => {
	const dispatch = useAppDispatch();
	const { id } = useParams();
	const userId = +(id as string);
	const { courses, friends, isLoading } = useAppSelector((state) => {
		return {
			courses: state.userCourses.userCourses,
			friends: [
				...state.friends.potentialFriends,
				...state.friends.followers,
				...state.friends.followings,
			],
			isLoading: state.userCourses.dataStatus === DataStatus.PENDING,
		};
	});

	const user = friends.find((friend) => friend.id === userId);

	useEffect(() => {
		if (!user) {
			return;
		}

		void dispatch(actions.loadUserCourses(user.id));
	}, [dispatch, user]);

	if (!user) {
		return <Navigate to={AppRoute.FRIENDS} />;
	}

	return (
		<div className={styles["container"]}>
			<Button
				className={styles["return-button"]}
				hasVisuallyHiddenLabel
				href={AppRoute.FRIENDS}
				iconName="back"
				label="Go back"
				size="small"
			/>

			<div className={styles["user-content"]}>
				<div className={styles["profile-image-wrapper"]}>
					<Image
						alt="avatar"
						className={styles["profile-image"]}
						src={user.avatarUrl ?? DEFAULT_USER_AVATAR}
					/>
				</div>

				<div className={styles["user-wrapper"]}>
					<p className={styles["fullName"]}>
						{user.firstName} {user.lastName}
					</p>
					<UserButton id={user.id} />
				</div>
			</div>

			<div className={styles["courses-container"]}>
				<h2 className={styles["courses-title"]}>Courses</h2>
				{isLoading ? (
					<Loader color="orange" size="large" />
				) : (
					<Courses courses={courses} />
				)}
			</div>
		</div>
	);
};

export { User };
