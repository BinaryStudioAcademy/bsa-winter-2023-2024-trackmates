import { Courses, Loader } from "~/libs/components/components.js";
import { DataStatus } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppSelector,
	useCallback,
	useEffect,
	useState,
} from "~/libs/hooks/hooks.js";
import { actions as courseActions } from "~/modules/courses/courses.js";
import { UserAuthResponseDto } from "~/modules/users/users.js";

import { AddCourseModal, WelcomeHeader } from "./libs/components/components.js";
import styles from "./styles.module.css";

const Overview: React.FC = () => {
	const { courses, isLoading, user } = useAppSelector((state) => ({
		courses: state.courses.courses,
		isLoading: state.courses.dataStatus === DataStatus.PENDING,
		user: state.auth.user,
	}));
	const dispatch = useAppDispatch();
	const [isAddCourseModalOpen, setIsAddCourseModalOpen] = useState(false);

	useEffect(() => {
		void dispatch(courseActions.loadAll());
	}, [dispatch]);

	const handleModalOpen = useCallback(() => {
		setIsAddCourseModalOpen(true);
	}, [setIsAddCourseModalOpen]);
	const handleModalClose = useCallback(() => {
		setIsAddCourseModalOpen(false);
	}, [setIsAddCourseModalOpen]);

	return (
		<div className={styles["container"]}>
			<WelcomeHeader
				onAddCourseClick={handleModalOpen}
				user={user as UserAuthResponseDto}
			/>
			{isLoading ? (
				<Loader color="orange" size="large" />
			) : (
				<Courses courses={courses} />
			)}

			{isAddCourseModalOpen && <AddCourseModal onClose={handleModalClose} />}
		</div>
	);
};

export { Overview };
