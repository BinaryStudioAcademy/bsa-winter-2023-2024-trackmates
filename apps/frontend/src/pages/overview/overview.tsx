import {
	Courses,
	EmptyPagePlaceholder,
	Loader,
	Pagination,
} from "~/libs/components/components.js";
import {
	EMPTY_LENGTH,
	PAGINATION_PAGES_CUT_COUNT,
} from "~/libs/constants/constants.js";
import {
	DataStatus,
	PaginationValue,
	QueryParameterName,
} from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppSelector,
	useAppTitle,
	useCallback,
	useEffect,
	usePagination,
	useSearchParams,
	useState,
} from "~/libs/hooks/hooks.js";
import { actions as userCourseActions } from "~/modules/user-courses/user-courses.js";
import { type UserAuthResponseDto } from "~/modules/users/users.js";

import { AddCourseModal, WelcomeHeader } from "./libs/components/components.js";
import styles from "./styles.module.css";

const Overview: React.FC = () => {
	const { courses, isLoading, totalCount, user } = useAppSelector((state) => {
		return {
			courses: state.userCourses.myCourses,
			isLoading: state.userCourses.dataStatus === DataStatus.PENDING,
			totalCount: state.userCourses.totalMyCoursesCount,
			user: state.auth.user as UserAuthResponseDto,
		};
	});
	const dispatch = useAppDispatch();
	const [isAddCourseModalOpen, setIsAddCourseModalOpen] =
		useState<boolean>(false);
	const { page, pages, pagesCount } = usePagination({
		pageSize: PaginationValue.DEFAULT_COUNT,
		pagesCutCount: PAGINATION_PAGES_CUT_COUNT,
		totalCount,
	});
	const [queryParameters] = useSearchParams();
	const searchQuery = queryParameters.get(QueryParameterName.SEARCH);

	const handleModalOpen = useCallback(() => {
		setIsAddCourseModalOpen(true);
	}, [setIsAddCourseModalOpen]);
	const handleModalClose = useCallback(() => {
		setIsAddCourseModalOpen(false);
	}, [setIsAddCourseModalOpen]);

	useAppTitle();

	useEffect(() => {
		void dispatch(
			userCourseActions.loadMyCourses({
				count: PaginationValue.DEFAULT_COUNT,
				page,
				search: searchQuery ?? "",
				userId: user.id,
			}),
		);
	}, [dispatch, user, page, totalCount, searchQuery]);

	const hasCourses = courses.length > EMPTY_LENGTH;

	return (
		<div className={styles["container"]}>
			<WelcomeHeader onAddCourseClick={handleModalOpen} user={user} />
			<div className={styles["courses-container"]}>
				<h2 className={styles["courses-title"]}>Courses</h2>
				{isLoading ? (
					<Loader color="orange" size="large" />
				) : (
					<>
						{hasCourses ? (
							<div className={styles["courses-container-content"]}>
								<Courses courses={courses} userId={user.id} />
								<Pagination
									currentPage={page}
									pages={pages}
									pagesCount={pagesCount}
								/>
							</div>
						) : (
							<EmptyPagePlaceholder
								size="large"
								title="You haven't added any courses yet"
							/>
						)}
					</>
				)}
			</div>
			<AddCourseModal
				isOpen={isAddCourseModalOpen}
				onClose={handleModalClose}
			/>
		</div>
	);
};

export { Overview };
