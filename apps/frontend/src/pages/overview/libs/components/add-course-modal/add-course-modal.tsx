import { Courses, Loader, Modal } from "~/libs/components/components.js";
import { DataStatus } from "~/libs/enums/enums.js";
import { debounce } from "~/libs/helpers/helpers.js";
import {
	useAppDispatch,
	useAppSelector,
	useCallback,
	useEffect,
} from "~/libs/hooks/hooks.js";
import {
	type CourseSearchRequestDto,
	actions as courseActions,
} from "~/modules/courses/courses.js";
import { actions as vendorActions } from "~/modules/vendors/vendors.js";

import { useSearchCourseFilter } from "../../hooks/hooks.js";
import { SearchCourseForm } from "../search-course-form/search-course-form.js";
import { VendorsFilterForm } from "../vendors-filter-form/vendors-filter-form.js";
import styles from "./styles.module.css";

type Properties = {
	onClose: () => void;
};

const SEARCH_COURSES_DELAY_MS = 500;
const ZERO_LENGTH = 0;

const AddCourseModal: React.FC<Properties> = ({ onClose }: Properties) => {
	const dispatch = useAppDispatch();
	const { courses, isLoading, vendors } = useAppSelector((state) => ({
		courses: state.courses.searchedCourses,
		isLoading: state.courses.searchDataStatus === DataStatus.PENDING,
		vendors: state.vendors.vendors,
	}));

	const { handleChangeSearch, handleChangeVendors, searchCourseFilter } =
		useSearchCourseFilter();

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const debouncedSearchCourses = useCallback(
		debounce((filter: CourseSearchRequestDto) => {
			void dispatch(courseActions.search(filter));
		}, SEARCH_COURSES_DELAY_MS),
		[dispatch],
	);

	useEffect(() => {
		if (vendors.length === ZERO_LENGTH) {
			void dispatch(vendorActions.loadAll());
		}
	}, [dispatch, vendors]);

	useEffect(() => {
		debouncedSearchCourses(searchCourseFilter);
		return () => {
			debouncedSearchCourses.clear();
		};
	}, [debouncedSearchCourses, searchCourseFilter]);

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
							<Courses courses={courses} isNew />
						)}
					</div>
				</div>
			</div>
		</Modal>
	);
};

export { AddCourseModal };
