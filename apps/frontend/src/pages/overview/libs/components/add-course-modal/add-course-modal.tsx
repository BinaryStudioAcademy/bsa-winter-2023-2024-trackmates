import { Courses, Loader, Modal } from "~/libs/components/components.js";
import { DataStatus } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppSelector,
	useCallback,
} from "~/libs/hooks/hooks.js";
import { type AddCourseRequestDto } from "~/modules/courses/courses.js";
import { actions as userCourseActions } from "~/modules/user-courses/user-courses.js";

import { useSearchCourse } from "../../hooks/hooks.js";
import { SearchCourseForm } from "../search-course-form/search-course-form.js";
import { VendorsFilterForm } from "../vendors-filter-form/vendors-filter-form.js";
import styles from "./styles.module.css";

type Properties = {
	onClose: () => void;
};

const ZERO_LENGTH = 0;

const AddCourseModal: React.FC<Properties> = ({ onClose }: Properties) => {
	const dispatch = useAppDispatch();
	const { courses, isLoading, vendors } = useAppSelector((state) => {
		return {
			courses: state.courses.searchedCourses,
			isLoading: state.courses.searchDataStatus === DataStatus.PENDING,
			vendors: state.vendors.vendors,
		};
	});

	const { handleChangeSearch, handleChangeVendors } = useSearchCourse();

	const handleAddCourse = useCallback(
		(payload: AddCourseRequestDto) => {
			void dispatch(userCourseActions.add(payload));
		},
		[dispatch],
	);

	return (
		<Modal isOpen onClose={onClose}>
			<div className={styles["add-course-modal"]}>
				<header className={styles["header"]}>
					<h3 className={styles["title"]}>Add the Course</h3>
					<SearchCourseForm onSearchChange={handleChangeSearch} />
				</header>
				<div className={styles["content"]}>
					<div className={styles["toolbar"]}>
						<p className={styles["results-count"]}>{courses.length} results</p>
						{vendors.length > ZERO_LENGTH && (
							<VendorsFilterForm
								onVendorsChange={handleChangeVendors}
								vendors={vendors}
							/>
						)}
					</div>
					<div className={styles["course-container"]}>
						{isLoading ? (
							<Loader color="orange" size="large" />
						) : (
							<Courses courses={courses} onAddCourse={handleAddCourse} />
						)}
					</div>
				</div>
			</div>
		</Modal>
	);
};

export { AddCourseModal };
