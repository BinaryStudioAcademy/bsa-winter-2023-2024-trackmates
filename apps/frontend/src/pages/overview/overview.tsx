import { Courses } from "~/libs/components/components.js";
import {
	useAppDispatch,
	useAppSelector,
	useCallback,
	useEffect,
	useState,
} from "~/libs/hooks/hooks.js";
// import { actions as courseActions } from "~/modules/courses/courses.js";
import { UserAuthResponseDto } from "~/modules/users/users.js";

import { AddCourseModal, WelcomeHeader } from "./libs/components/components.js";
import styles from "./styles.module.css";

const Overview: React.FC = () => {
	const { courses, user } = useAppSelector((state) => ({
		courses: state.courses.courses,
		user: state.auth.user,
	}));
	const dispatch = useAppDispatch();
	const [isAddCourseModalOpen, setIsAddCourseModalOpen] = useState(false);

	useEffect(() => {
		// void dispatch(courseActions.loadAll());
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
			<Courses courses={courses} />
			{isAddCourseModalOpen && <AddCourseModal onClose={handleModalClose} />}
		</div>
	);
};

export { Overview };
