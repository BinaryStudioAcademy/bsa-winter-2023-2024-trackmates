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
	useCallback,
	useEffect,
	useParams,
	useState,
} from "~/libs/hooks/hooks.js";
import { actions as friendsActions } from "~/modules/friends/friends.js";
import { actions as userCoursesActions } from "~/modules/user-courses/user-courses.js";

import styles from "./styles.module.css";

const User: React.FC = () => {
	const dispatch = useAppDispatch();
	const { id } = useParams();
	const userId = Number(id);
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

	const [isFollowing, setIsFollowing] = useState<boolean>(
		useAppSelector((state) =>
			state.friends.followings.some((friend) => friend.id === userId),
		),
	);
	const handleFollow = useCallback(() => {
		void dispatch(friendsActions.follow({ id: userId }))
			.unwrap()
			.then(() => {
				setIsFollowing(true);
			});
	}, [dispatch, userId]);

	const handleUnfollow = useCallback(() => {
		void dispatch(friendsActions.unfollow({ id: userId }))
			.unwrap()
			.then(() => {
				setIsFollowing(false);
			});
	}, [dispatch, userId]);

	useEffect(() => {
		if (!user) {
			return;
		}

		void dispatch(userCoursesActions.loadUserCourses(user.id));
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
					<Button
						color="primary"
						iconName={isFollowing ? "cross" : "add"}
						label={isFollowing ? "Following" : "Follow"}
						onClick={isFollowing ? handleUnfollow : handleFollow}
						size="small"
					/>
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
