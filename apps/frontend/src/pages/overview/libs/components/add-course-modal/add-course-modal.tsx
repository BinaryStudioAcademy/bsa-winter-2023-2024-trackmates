import {
	Button,
	Courses,
	Input,
	Loader,
	Modal,
} from "~/libs/components/components.js";
import { EMPTY_LENGTH } from "~/libs/constants/constants.js";
import { DataStatus, PaginationValue } from "~/libs/enums/enums.js";
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
	isOpen: boolean;
	onClose: () => void;
};

const AddCourseModal: React.FC<Properties> = ({
	isOpen,
	onClose,
}: Properties) => {
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
	const { control, errors, getValues, handleSubmit, setValue } = useAppForm({
		defaultValues: DEFAULT_SEARCH_COURSE_PAYLOAD,
		mode: "onChange",
	});

	const [page, setPage] = useState<number>(PaginationValue.DEFAULT_PAGE);
	const isLoadFirstPage = isLoading && page === PaginationValue.DEFAULT_PAGE;
	const isLoadMore = isLoading && page !== PaginationValue.DEFAULT_PAGE;

	const handleAddCourse = useCallback(
		(payload: AddCourseRequestDto) => {
			void dispatch(userCourseActions.add(payload));
		},
		[dispatch],
	);

	const handleSearchCourses = (
		filterFormData: typeof DEFAULT_SEARCH_COURSE_PAYLOAD,
	): void => {
		dispatch(courseActions.clearCourses());
		setPage(PaginationValue.DEFAULT_PAGE);

		void dispatch(
			courseActions.getAllByVendor({
				page: PaginationValue.DEFAULT_PAGE,
				search: filterFormData.search,
				vendorsKey: getVendorsFromForm(filterFormData.vendors),
			}),
		);
		void dispatch(
			courseActions.getRecommended({
				page: PaginationValue.DEFAULT_PAGE,
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

	const handleLoadMore = useCallback((): void => {
		const newPage = page + PaginationValue.DEFAULT_STEP;
		void dispatch(
			courseActions.getAllByVendor({
				page: newPage,
				search: getValues("search"),
				vendorsKey: getVendorsFromForm(getValues("vendors")),
			}),
		);
		setPage(newPage);
	}, [dispatch, getValues, page]);

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

	const hasCourses = courses.length > EMPTY_LENGTH;

	const handleClose = useCallback((): void => {
		dispatch(courseActions.clearCourses());
		setPage(PaginationValue.DEFAULT_PAGE);
		setValue("search", "");
		onClose();
	}, [dispatch, onClose, setPage, setValue]);

	return (
		<Modal isOpen={isOpen} onClose={handleClose}>
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
						{hasCourses && (
							<>
								<div>
									<h2 className={styles["courses-title"]}>
										Recommended Courses
									</h2>

									<Courses
										courses={recommendedCourses}
										onAddCourse={handleAddCourse}
									/>
								</div>

								<div className={styles["searched-courses"]}>
									<p className={styles["results-count"]}>
										{courses.length} results
									</p>
									{isLoadFirstPage ? (
										<Loader color="orange" size="large" />
									) : (
										<>
											<Courses
												courses={courses}
												onAddCourse={handleAddCourse}
											/>
											<Button
												className={styles["load-more-button"]}
												isDisabled={isLoadMore}
												isLoading={isLoadMore}
												label="Load more"
												onClick={handleLoadMore}
												size="small"
											/>
										</>
									)}
								</div>
							</>
						)}
					</div>
				</div>
			</div>
		</Modal>
	);
};

export { AddCourseModal };
