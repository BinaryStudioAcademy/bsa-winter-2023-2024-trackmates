import { Loader, Pagination } from "~/libs/components/components.js";
import { PAGINATION_PAGES_CUT_COUNT } from "~/libs/constants/constants.js";
import { DataStatus, PaginationValue } from "~/libs/enums/enums.js";
import { findItemById } from "~/libs/helpers/helpers.js";
import {
	useAppDispatch,
	useAppSelector,
	useCallback,
	useEffect,
	usePagination,
	useState,
	useToggleScroll,
} from "~/libs/hooks/hooks.js";
import {
	type CourseDto,
	type CourseUpdateRequestDto,
	actions as coursesActions,
} from "~/modules/courses/courses.js";

import { ManagementDialogueMessage } from "../../enums/enums.js";
import { ConfirmationModal } from "../confirmation-modal/confirmation-modal.js";
import { CoursesTable, EditCourseModal } from "./libs/components/components.js";
import styles from "./styles.module.css";

const CoursesTab: React.FC = () => {
	const dispatch = useAppDispatch();

	const { courseToDataStatus, courses, isCoursesLoading, total } =
		useAppSelector((state) => {
			return {
				courseToDataStatus: state.courses.courseToDataStatus,
				courses: state.courses.allCourses,
				isCoursesLoading:
					state.courses.allCoursesDataStatus === DataStatus.PENDING,
				total: state.courses.totalCoursesCount,
			};
		});

	const [currentCourse, setCurrentCourse] = useState<CourseDto | null>(null);

	const [isConfirmationModalOpen, setIsConfirmationModalOpen] =
		useState<boolean>(false);

	const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);

	const { page, pages, pagesCount } = usePagination({
		pageSize: PaginationValue.DEFAULT_COUNT,
		pagesCutCount: PAGINATION_PAGES_CUT_COUNT,
		totalCount: total,
	});

	useEffect(() => {
		void dispatch(
			coursesActions.getAll({
				count: PaginationValue.DEFAULT_COUNT,
				page,
			}),
		);
	}, [dispatch, page]);

	const handleCloseConfirmationModal = useCallback(() => {
		setIsConfirmationModalOpen(false);
		setCurrentCourse(null);
	}, []);

	const handleCourseDelete = useCallback(() => {
		void dispatch(
			coursesActions.deleteById({
				courseId: currentCourse?.id as number,
				page,
			}),
		);
		handleCloseConfirmationModal();
	}, [dispatch, handleCloseConfirmationModal, page, currentCourse]);

	const handleCloseEditModal = useCallback(() => {
		setCurrentCourse(null);
		setIsEditModalOpen(false);
	}, []);

	const handleConfirmUpdate = useCallback(
		(payload: CourseUpdateRequestDto) => {
			void dispatch(
				coursesActions.update({
					id: currentCourse?.id as number,
					payload,
				}),
			);
			handleCloseEditModal();
		},
		[currentCourse, dispatch, handleCloseEditModal],
	);

	const handleEditModalOpen = useCallback(
		(courseId: number) => {
			const courseById = findItemById(courses as { id: number }[], courseId);

			if (!courseById) {
				return;
			}

			setCurrentCourse(courseById as CourseDto);
			setIsEditModalOpen(true);
		},
		[courses],
	);

	const handleConfirmationModalOpen = useCallback(
		(courseId: number) => {
			const courseById = findItemById(courses as { id: number }[], courseId);

			if (!courseById) {
				return;
			}

			setCurrentCourse(courseById as CourseDto);
			setIsConfirmationModalOpen(true);
		},
		[courses],
	);

	useToggleScroll(isEditModalOpen);

	return (
		<>
			<div className={styles["container"]}>
				{isCoursesLoading ? (
					<Loader color="orange" size="large" />
				) : (
					<div className={styles["table-container"]}>
						<CoursesTable
							courseToDataStatus={courseToDataStatus}
							courses={courses}
							onDelete={handleConfirmationModalOpen}
							onEdit={handleEditModalOpen}
						/>
					</div>
				)}
			</div>
			<Pagination currentPage={page} pages={pages} pagesCount={pagesCount} />
			{currentCourse && (
				<EditCourseModal
					course={currentCourse}
					isOpen={isEditModalOpen}
					onClose={handleCloseEditModal}
					onConfirm={handleConfirmUpdate}
				/>
			)}
			<ConfirmationModal
				isOpen={isConfirmationModalOpen}
				onCancel={handleCloseConfirmationModal}
				onClose={handleCloseConfirmationModal}
				onConfirm={handleCourseDelete}
				title={`${ManagementDialogueMessage.DELETE_COURSE} "${currentCourse?.title}"?`}
			/>
		</>
	);
};

export { CoursesTab };
