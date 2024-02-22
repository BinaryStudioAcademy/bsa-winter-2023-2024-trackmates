import { Courses, Loader } from "~/libs/components/components.js";
import { DataStatus } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppSelector,
	useCallback,
	useEffect,
	useState,
} from "~/libs/hooks/hooks.js";
import { actions as userCourseActions } from "~/modules/user-courses/user-courses.js";
import { type UserAuthResponseDto } from "~/modules/users/users.js";

import { AddCourseModal, WelcomeHeader } from "./libs/components/components.js";
import styles from "./styles.module.css";

const Overview: React.FC = () => {
	const { courses, isLoading, user } = useAppSelector((state) => ({
		courses: state.userCourses.courses,
		isLoading: state.userCourses.dataStatus === DataStatus.PENDING,
		user: state.auth.user as UserAuthResponseDto,
	}));
	const dispatch = useAppDispatch();
	const [isAddCourseModalOpen, setIsAddCourseModalOpen] =
		useState<boolean>(false);

	const handleModalOpen = useCallback(() => {
		setIsAddCourseModalOpen(true);
	}, [setIsAddCourseModalOpen]);
	const handleModalClose = useCallback(() => {
		setIsAddCourseModalOpen(false);
	}, [setIsAddCourseModalOpen]);

	useEffect(() => {
		void dispatch(userCourseActions.loadMyCourses(user.id));
	}, [dispatch, user]);

	return (
		<div className={styles["container"]}>
			<WelcomeHeader onAddCourseClick={handleModalOpen} user={user} />
			{isLoading ? (
				<Loader color="orange" size="large" />
			) : (
				<Courses courses={courses} title="Courses" />
			)}

			{isAddCourseModalOpen && <AddCourseModal onClose={handleModalClose} />}
		</div>
	);
};

export { Overview };
