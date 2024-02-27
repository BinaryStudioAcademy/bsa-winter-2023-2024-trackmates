import { Courses, Input, Loader, Modal } from "~/libs/components/components.js";
import { DataStatus } from "~/libs/enums/enums.js";
import { initDebounce } from "~/libs/helpers/helpers.js";
import {
	useAppDispatch,
	useAppForm,
	useAppSelector,
	useCallback,
	useEffect,
} from "~/libs/hooks/hooks.js";
import { actions as courseActions } from "~/modules/courses/courses.js";
import {
	type AddCourseRequestDto,
	actions as userCourseActions,
} from "~/modules/user-courses/user-courses.js";
import { actions as vendorActions } from "~/modules/vendors/vendors.js";

import {
	DEFAULT_SEARCH_COURSE_PAYLOAD,
	SEARCH_COURSES_DELAY_MS,
} from "../../constants/constants.js";
import {
	getDefaultVendors,
	getVendorsFromForm,
} from "../../helpers/helpers.js";
import { VendorBadge } from "../vendor-badge/vendor-badge.js";
import styles from "./styles.module.css";

type Properties = {
	onClose: () => void;
};

const AddCourseModal: React.FC<Properties> = ({ onClose }: Properties) => {
	const dispatch = useAppDispatch();
	const { courses, isLoading, recommendedCourses, vendors } = useAppSelector(
		(state) => {
			return {
				courses: state.courses.searchedCourses,
				isLoading: state.courses.searchDataStatus === DataStatus.PENDING,
				recommendedCourses: state.courses.recommendedCourses,
				vendors: state.vendors.vendors,
			};
		},
	);
	const { control, errors, handleSubmit, setValue } = useAppForm({
		defaultValues: DEFAULT_SEARCH_COURSE_PAYLOAD,
		mode: "onChange",
	});

	const handleAddCourse = useCallback(
		(payload: AddCourseRequestDto) => {
			void dispatch(userCourseActions.add(payload));
		},
		[dispatch],
	);

	const handleSearchCourses = (
		filterFormData: typeof DEFAULT_SEARCH_COURSE_PAYLOAD,
	): void => {
		void dispatch(
			courseActions.getAll({
				search: filterFormData.search,
				vendorsKey: getVendorsFromForm(filterFormData.vendors),
			}),
		);
		void dispatch(
			courseActions.getRecommended({
				search: filterFormData.search,
				vendorsKey: getVendorsFromForm(filterFormData.vendors),
			}),
		);
	};

	const handleFormChange = (event_: React.BaseSyntheticEvent): void => {
		void handleSubmit(handleSearchCourses)(event_);
	};

	const handleDebouncedSearchCourses = initDebounce(
		handleFormChange,
		SEARCH_COURSES_DELAY_MS,
	);

	useEffect(() => {
		void dispatch(vendorActions.loadAll())
			.unwrap()
			.then((vendors) => {
				setValue("vendors", getDefaultVendors(vendors));
			});

		void dispatch(
			courseActions.getRecommended({
				search: "",
				vendorsKey: [],
			}),
		);
	}, [dispatch, setValue]);

	useEffect(() => {
		return () => {
			handleDebouncedSearchCourses.clear();
		};
	}, [handleDebouncedSearchCourses]);

	return (
		<Modal isOpen onClose={onClose}>
			<div className={styles["add-course-modal"]}>
				<header className={styles["header"]}>
					<h3 className={styles["title"]}>Add the Course</h3>
					<form onChange={handleDebouncedSearchCourses}>
						<Input
							className={styles["search-input"]}
							control={control}
							errors={errors}
							hasVisuallyHiddenLabel
							label="Search course"
							name="search"
							placeholder="Course name..."
							type="text"
						/>
						<div className={styles["toolbar"]}>
							<p className={styles["results-count"]}>
								{courses.length} results
							</p>
							<fieldset className={styles["vendors-container"]}>
								{vendors.map((vendor) => (
									<VendorBadge
										control={control}
										key={vendor.id}
										name={`vendors.${vendor.key}`}
										vendorKey={vendor.key}
									/>
								))}
							</fieldset>
						</div>
					</form>
				</header>

				<div className={styles["content"]}>
					<div className={styles["course-container"]}>
						{isLoading ? (
							<Loader color="orange" size="large" />
						) : (
							<>
								<Courses courses={courses} onAddCourse={handleAddCourse} />
								{control.getFieldState("search").isDirty && (
									<div className={styles["recommended-courses"]}>
										<h2 className={styles["courses-title"]}>
											Recommended Courses
										</h2>

										<Courses
											courses={recommendedCourses}
											onAddCourse={handleAddCourse}
										/>
									</div>
								)}
							</>
						)}
						{/* {control.getFieldState("search").isDirty && (
							<>
								<h2 className={styles["courses-title"]}>Recommended Courses</h2>

								<Courses
									courses={recommendedCourses}
									onAddCourse={handleAddCourse}
								/>
							</>
						)} */}
					</div>
				</div>
			</div>
		</Modal>
	);
};

export { AddCourseModal };