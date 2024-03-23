import defaultAvatar from "~/assets/img/default-avatar.png";
import {
	Button,
	Courses,
	EmptyPagePlaceholder,
	Icon,
	Image,
	Link,
	Loader,
	Navigate,
	Pagination,
} from "~/libs/components/components.js";
import {
	BACK_NAVIGATION_STEP,
	EMPTY_LENGTH,
	PAGINATION_PAGES_CUT_COUNT,
} from "~/libs/constants/constants.js";
import {
	AppRoute,
	AppTitle,
	DataStatus,
	PaginationValue,
	QueryParameterName,
} from "~/libs/enums/enums.js";
import { getValidClassNames } from "~/libs/helpers/helpers.js";
import {
	useAppDispatch,
	useAppSelector,
	useAppTitle,
	useCallback,
	useEffect,
	useNavigate,
	usePagination,
	useParams,
	useSearchParams,
} from "~/libs/hooks/hooks.js";
import { actions as friendsActions } from "~/modules/friends/friends.js";
import { actions as userCoursesActions } from "~/modules/user-courses/user-courses.js";
import {
	type UserAuthResponseDto,
	actions as usersActions,
} from "~/modules/users/users.js";

import styles from "./styles.module.css";

const User: React.FC = () => {
	useAppTitle(AppTitle.FRIEND);
	const dispatch = useAppDispatch();
	const { id } = useParams();
	const userId = Number(id);
	const {
		commonCoursesIds,
		courses,
		currentUserId,
		hasSubscription,
		isCoursesLoading,
		isFollowing,
		isUserNotFound,
		profileUser,
		totalCount,
	} = useAppSelector((state) => {
		return {
			commonCoursesIds: state.userCourses.commonCoursesIds,
			courses: state.userCourses.userCourses,
			currentUserId: (state.auth.user as UserAuthResponseDto).id,
			hasSubscription: Boolean(
				(state.auth.user as UserAuthResponseDto).subscription,
			),
			isCoursesLoading: state.userCourses.dataStatus === DataStatus.PENDING,
			isFollowing: state.friends.isFollowing,
			isUserNotFound: state.users.dataStatus === DataStatus.REJECTED,
			profileUser: state.users.profileUser,
			totalCount: state.userCourses.totalUserCoursesCount,
		};
	});
	const [queryParameters] = useSearchParams();
	const searchQuery = queryParameters.get(QueryParameterName.SEARCH);

	const { page, pages, pagesCount } = usePagination({
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

		if (hasSubscription) {
			void dispatch(userCoursesActions.loadCommonCourses(userId));
		}

		void dispatch(friendsActions.getIsFollowing(userId));

		return () => {
			dispatch(usersActions.reset());
			dispatch(userCoursesActions.reset());
			dispatch(friendsActions.resetIsFollowing());
		};
	}, [dispatch, userId, hasSubscription]);

	useEffect(() => {
		void dispatch(
			userCoursesActions.loadUserCourses({
				count: PaginationValue.DEFAULT_COUNT,
				page,
				search: searchQuery ?? "",
				userId,
			}),
		);
	}, [dispatch, userId, page, searchQuery]);

	const hasUser = Boolean(profileUser);

	if (isUserNotFound || currentUserId === userId) {
		return <Navigate to={AppRoute.ROOT} />;
	}

	if (!hasUser) {
		return <Loader color="orange" size="large" />;
	}

	const hasCourses = courses.length > EMPTY_LENGTH;

	const fullName = `${(profileUser as UserAuthResponseDto).firstName} ${(profileUser as UserAuthResponseDto).lastName}`;

	const isPremiumUser = Boolean(
		(profileUser as UserAuthResponseDto).subscription,
	);

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
				<div className={styles["avatar"]}>
					<div
						className={getValidClassNames(
							styles["profile-image-wrapper"],
							isPremiumUser && styles["premium"],
						)}
					>
						<Image
							alt="avatar"
							className={styles["profile-image"]}
							src={
								(profileUser as UserAuthResponseDto).avatarUrl ?? defaultAvatar
							}
						/>
					</div>
					{isPremiumUser && (
						<Icon className={styles["premium-icon"]} name="crown" />
					)}
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
				<div className={styles["title-container"]}>
					<h2 className={styles["courses-title"]}>Courses</h2>
					{!hasSubscription && (
						<p className={styles["courses-subtitle"]}>
							Want to compare your progress with your friend? Then{" "}
							<Link className={styles["link"]} to={AppRoute.SUBSCRIPTION}>
								subscribe
							</Link>
							!
						</p>
					)}
				</div>
				{isCoursesLoading ? (
					<Loader color="orange" size="large" />
				) : (
					<>
						{hasCourses ? (
							<div className={styles["courses-container-content"]}>
								<Courses
									commonCoursesIds={commonCoursesIds}
									courses={courses}
									userId={userId}
								/>
								<Pagination
									currentPage={page}
									pages={pages}
									pagesCount={pagesCount}
									searchQuery={searchQuery}
								/>
							</div>
						) : (
							<EmptyPagePlaceholder
								size="large"
								title={`${fullName} hasn't added any courses yet`}
							/>
						)}
					</>
				)}
			</div>
		</div>
	);
};

export { User };
