import { Courses, Input, Loader, Modal } from "~/libs/components/components.js";
import { EMPTY_ARRAY_LENGTH } from "~/libs/constants/constants.js";
import { DataStatus } from "~/libs/enums/enums.js";
import { initDebounce } from "~/libs/helpers/helpers.js";
import {
	useAppDispatch,
	useAppForm,
	useAppSelector,
	useCallback,
	useEffect,
	useState,
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
	const [addedCourses, setAddedCourses] = useState<AddCourseRequestDto[]>([]);
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
			setAddedCourses((previous) => [...previous, payload]);
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

	const handleFormSubmit = useCallback(
		(event_: React.FormEvent<HTMLFormElement>): void => {
			event_.preventDefault();
		},
		[],
	);

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
	}, [dispatch, setValue]);

	useEffect(() => {
		return () => {
			handleDebouncedSearchCourses.clear();
		};
	}, [handleDebouncedSearchCourses]);

	const hasCourses = courses.length > EMPTY_ARRAY_LENGTH;

	const extendedOnClose = useCallback((): void => {
		dispatch(courseActions.removeAlreadyAddedCourses(addedCourses));
		setAddedCourses([]);
		onClose();
	}, [dispatch, addedCourses, onClose]);

	return (
		<Modal isOpen onClose={extendedOnClose}>
			<div className={styles["add-course-modal"]}>
				<header className={styles["header"]}>
					<h3 className={styles["title"]}>Add course</h3>
					<form
						onChange={handleDebouncedSearchCourses}
						onSubmit={handleFormSubmit}
					>
						<div className={styles["search-input-container"]}>
							<Input
								control={control}
								errors={errors}
								hasVisuallyHiddenLabel
								iconName="search"
								label="Search course"
								name="search"
								placeholder="Course name..."
								type="text"
							/>
						</div>
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
								{hasCourses && (
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
					</div>
				</div>
			</div>
		</Modal>
	);
};

export { AddCourseModal };
