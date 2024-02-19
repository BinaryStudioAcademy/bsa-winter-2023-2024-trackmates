import { Courses, Loader } from "~/libs/components/components.js";
import { DataStatus } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppSelector,
	useEffect,
} from "~/libs/hooks/hooks.js";
import { actions as courseActions } from "~/modules/courses/courses.js";
import { UserAuthResponseDto } from "~/modules/users/users.js";

import { AddCourseModal, WelcomeHeader } from "./libs/components/components.js";
import { useAddCourseModal } from "./libs/hooks/hooks.js";
import styles from "./styles.module.css";

const Overview: React.FC = () => {
	const { courses, isLoading, user } = useAppSelector((state) => ({
		courses: state.courses.courses,
		isLoading: state.courses.dataStatus === DataStatus.PENDING,
		user: state.auth.user,
	}));
	const dispatch = useAppDispatch();
	const { handleModalClose, handleModalOpen, isAddCourseModalOpen } =
		useAddCourseModal();

	useEffect(() => {
		if (user) {
			void dispatch(courseActions.loadAll(user.id));
		}
	}, [dispatch, user]);

	return (
		<div className={styles["container"]}>
			<WelcomeHeader
				onAddCourseClick={handleModalOpen}
				user={user as UserAuthResponseDto}
			/>
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
