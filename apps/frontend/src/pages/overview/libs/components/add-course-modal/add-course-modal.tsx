import { Courses, Loader, Modal } from "~/libs/components/components.js";
import { DEFAULT_COURSES_DATA } from "~/libs/constants/constants.js";
import { DataStatus } from "~/libs/enums/enums.js";
import { debounce } from "~/libs/helpers/helpers.js";
import {
	useAppDispatch,
	useAppSelector,
	useEffect,
} from "~/libs/hooks/hooks.js";
import { actions as courseActions } from "~/modules/courses/courses.js";

import { useSearchCourseFilter } from "../../hooks/hooks.js";
import { SearchCourseForm } from "../search-course-form/search-course-form.js";
import { VendorsFilterForm } from "../vendors-filter-form/vendors-filter-form.js";
import styles from "./styles.module.css";

type Properties = {
	onClose: () => void;
};

const SEARCH_COURSES_DELAY_MS = 500;

const AddCourseModal: React.FC<Properties> = ({ onClose }: Properties) => {
	const dispatch = useAppDispatch();
	const { isLoading } = useAppSelector((state) => ({
		courses: state.courses.searchedCourses,
		isLoading: state.courses.searchDataStatus === DataStatus.PENDING,
	}));

	const { handleChangeSearch, handleChangeVendors, searchCourseFilter } =
		useSearchCourseFilter();

	const handleSearchCourses = () => {
		void dispatch(
			courseActions.search({
				search: searchCourseFilter.search,
				vendorId: 0,
			}),
		);
	};

	const debouncedSearchCourses = debounce(
		handleSearchCourses,
		SEARCH_COURSES_DELAY_MS,
	);

	useEffect(() => {
		debouncedSearchCourses();

		return () => {
			debouncedSearchCourses.clear();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchCourseFilter]);

	return (
		<Modal isOpen onClose={onClose}>
			<div className={styles["add-course-modal"]}>
				<header className={styles["header"]}>
					<h3 className={styles["title"]}>Add the Course</h3>
					<SearchCourseForm onSearchChange={handleChangeSearch} />
				</header>
				<div className={styles["content"]}>
					<div className={styles["toolbar"]}>
						<p className={styles["results-count"]}>7 results</p>
						<VendorsFilterForm onVendorsChange={handleChangeVendors} />
					</div>
					<div className={styles["course-container"]}>
						{isLoading ? (
							<Loader color="orange" size="large" />
						) : (
							<Courses courses={DEFAULT_COURSES_DATA} isNew />
						)}
					</div>
				</div>
			</div>
		</Modal>
	);
};

export { AddCourseModal };
