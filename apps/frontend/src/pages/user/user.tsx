import defaultAvatar from "~/assets/img/default-avatar.png";
import {
	Button,
	Courses,
	EmptyPagePlaceholder,
	Image,
	Loader,
	Navigate,
	Pagination,
} from "~/libs/components/components.js";
import {
	BACK_NAVIGATION_STEP,
	EMPTY_LENGTH,
	PAGINATION_PAGES_CUT_COUNT,
} from "~/libs/constants/constants.js";
import { AppRoute, DataStatus, PaginationValue } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppSelector,
	useCallback,
	useEffect,
	useNavigate,
	usePagination,
	useParams,
} from "~/libs/hooks/hooks.js";
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
		commonCourses,
		courses,
		currentUserId,
		isCoursesLoading,
		isFollowing,
		isUserNotFound,
		profileUser,
		totalCount,
	} = useAppSelector((state) => {
		return {
			commonCourses: state.userCourses.commonCourses,
			courses: state.userCourses.userCourses,
			currentUserId: (state.auth.user as UserAuthResponseDto).id,
			isCoursesLoading: state.userCourses.dataStatus === DataStatus.PENDING,
			isFollowing: state.friends.isFollowing,
			isUserNotFound: state.users.dataStatus === DataStatus.REJECTED,
			profileUser: state.users.profileUser,
			totalCount: state.userCourses.totalUserCoursesCount,
		};
	});

	const { handlePageChange, page, pages, pagesCount } = usePagination({
		pageSize: PaginationValue.DEFAULT_COUNT,
		pagesCutCount: PAGINATION_PAGES_CUT_COUNT,
		totalCount,
	});

	const navigate = useNavigate();

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

	const handleGoBackToPreviousPage = useCallback((): void => {
		navigate(BACK_NAVIGATION_STEP);
	}, [navigate]);

	useEffect(() => {
		void dispatch(usersActions.getById(userId));
		void dispatch(userCoursesActions.loadCommonCourses(userId));
		void dispatch(friendsActions.getIsFollowing(userId));
	}, [dispatch, userId]);

	useEffect(() => {
		void dispatch(
			userCoursesActions.loadUserCourses({
				count: PaginationValue.DEFAULT_COUNT,
				page,
				search: "",
				userId,
			}),
		);
	}, [dispatch, userId, page]);

	const hasUser = Boolean(profileUser);
	const hasCommonCourses = commonCourses.length > EMPTY_ARRAY_LENGTH;

	if (isUserNotFound || currentUserId === userId) {
		return <Navigate to={AppRoute.ROOT} />;
	}

	if (!hasUser) {
		return <Loader color="orange" size="large" />;
	}

	const hasCourses = courses.length > EMPTY_LENGTH;

	const fullName = `${(profileUser as UserAuthResponseDto).firstName} ${(profileUser as UserAuthResponseDto).lastName}`;

	return (
		<div className={styles["container"]}>
			<Button
				className={styles["return-button"]}
				hasVisuallyHiddenLabel
				iconName="back"
				label="Go back"
				onClick={handleGoBackToPreviousPage}
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
					<p className={styles["fullName"]}>{fullName}</p>
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
					<>
						{hasCourses ? (
							<div className={styles["courses-container-content"]}>
								<Courses courses={courses} userId={userId} />
								<Pagination
									currentPage={page}
									onPageChange={handlePageChange}
									pages={pages}
									pagesCount={pagesCount}
								/>
							</div>
						) : (
							<EmptyPagePlaceholder
								title={`${fullName} hasn't added any courses yet`}
							/>
						)}
					</>
				)}
				{hasCommonCourses && (
					<>
						<h2 className={styles["courses-title"]}>Common courses</h2>
						<Courses courses={commonCourses} userId={userId} />
					</>
				)}
			</div>
		</div>
	);
};

export { User };
