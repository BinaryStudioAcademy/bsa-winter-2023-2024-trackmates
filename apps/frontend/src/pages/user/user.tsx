import defaultAvatar from "~/assets/img/default-avatar.png";
import {
	Button,
	Courses,
	Image,
	Loader,
	Navigate,
} from "~/libs/components/components.js";
import { AppRoute, DataStatus } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppSelector,
	useCallback,
	useEffect,
	useLocation,
	useParams,
} from "~/libs/hooks/hooks.js";
import { type ValueOf } from "~/libs/types/types.js";
import { actions as friendsActions } from "~/modules/friends/friends.js";
import { actions as userCoursesActions } from "~/modules/user-courses/user-courses.js";
import {
	type UserAuthResponseDto,
	actions as usersActions,
} from "~/modules/users/users.js";

import styles from "./styles.module.css";

const User: React.FC = () => {
	const dispatch = useAppDispatch();
	const { id } = useParams();
	const userId = Number(id);
	const {
		courses,
		currentUserId,
		isCoursesLoading,
		isFollowing,
		isUserNotFound,
		profileUser,
	} = useAppSelector((state) => {
		return {
			courses: state.userCourses.userCourses,
			currentUserId: (state.auth.user as UserAuthResponseDto).id,
			isCoursesLoading: state.userCourses.dataStatus === DataStatus.PENDING,
			isFollowing: state.friends.isFollowing,
			isUserNotFound: state.users.dataStatus === DataStatus.REJECTED,
			profileUser: state.users.profileUser,
		};
	});

	const { search } = useLocation();
	const queryParameters = new URLSearchParams(search);
	const redirectTo = queryParameters.get("redirectTo");

	const handleFollow = useCallback(() => {
		void dispatch(friendsActions.follow({ id: userId }))
			.unwrap()
			.then(() => {
				dispatch(friendsActions.setIsFollowing(true));
			});
	}, [dispatch, userId]);

	const handleUnfollow = useCallback(() => {
		void dispatch(friendsActions.unfollow({ id: userId }))
			.unwrap()
			.then(() => {
				dispatch(friendsActions.setIsFollowing(false));
			});
	}, [dispatch, userId]);

	useEffect(() => {
		void dispatch(usersActions.getById(userId));
		void dispatch(userCoursesActions.loadUserCourses(userId));
		void dispatch(friendsActions.getIsFollowing(userId));
	}, [dispatch, userId]);

	const hasUser = Boolean(profileUser);

	if (isUserNotFound || currentUserId === userId) {
		return <Navigate to={AppRoute.FRIENDS} />;
	}

	if (!hasUser) {
		return <Loader color="orange" size="large" />;
	}

	return (
		<div className={styles["container"]}>
			<Button
				className={styles["return-button"]}
				hasVisuallyHiddenLabel
				href={redirectTo as ValueOf<typeof AppRoute>}
				iconName="back"
				label="Go back"
				size="small"
			/>

			<div className={styles["user-content"]}>
				<div className={styles["profile-image-wrapper"]}>
					<Image
						alt="avatar"
						className={styles["profile-image"]}
						src={
							(profileUser as UserAuthResponseDto).avatarUrl ?? defaultAvatar
						}
					/>
				</div>

				<div className={styles["user-wrapper"]}>
					<p className={styles["fullName"]}>
						{(profileUser as UserAuthResponseDto).firstName}{" "}
						{(profileUser as UserAuthResponseDto).lastName}
					</p>
					<Button
						className={styles["follow-button"]}
						iconName={isFollowing ? "cross" : "add"}
						label={isFollowing ? "Following" : "Follow"}
						onClick={isFollowing ? handleUnfollow : handleFollow}
						size="small"
						style={isFollowing ? "secondary" : "primary"}
					/>
				</div>
			</div>

			<div className={styles["courses-container"]}>
				<h2 className={styles["courses-title"]}>Courses</h2>
				{isCoursesLoading ? (
					<Loader color="orange" size="large" />
				) : (
					<Courses courses={courses} userId={userId} />
				)}
			</div>
		</div>
	);
};

export { User };
