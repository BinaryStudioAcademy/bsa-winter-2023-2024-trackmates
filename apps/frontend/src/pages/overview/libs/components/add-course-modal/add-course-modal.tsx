import premiumCharacter from "~/assets/img/premium-character.svg";
import {
	Button,
	Courses,
	Image,
	Input,
	Link,
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
import { type UserAuthResponseDto } from "~/modules/auth/auth.js";
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
	const {
		courses,
		hasSubscription,
		isRecommendedLoading,
		isSearchLoading,
		recommendedCourses,
		vendors,
	} = useAppSelector((state) => {
		return {
			courses: state.courses.searchedCourses,
			hasSubscription: Boolean(
				(state.auth.user as UserAuthResponseDto).subscription,
			),
			isRecommendedLoading:
				state.courses.recommendedDataStatus === DataStatus.PENDING,
			isSearchLoading: state.courses.searchDataStatus === DataStatus.PENDING,
			recommendedCourses: state.courses.recommendedCourses,
			vendors: state.vendors.vendors,
		};
	});

	const { control, errors, getValues, handleSubmit, setValue } = useAppForm({
		defaultValues: DEFAULT_SEARCH_COURSE_PAYLOAD,
		mode: "onChange",
	});

	const [page, setPage] = useState<number>(PaginationValue.DEFAULT_PAGE);
	const isLoadFirstPage =
		isSearchLoading && page === PaginationValue.DEFAULT_PAGE;
	const isLoadMore = isSearchLoading && page !== PaginationValue.DEFAULT_PAGE;

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

		if (hasSubscription) {
			void dispatch(
				courseActions.getRecommended({
					page: PaginationValue.DEFAULT_PAGE,
					search: filterFormData.search,
					vendorsKey: getVendorsFromForm(filterFormData.vendors),
				}),
			);
		}
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
					{isLoadFirstPage && <Loader color="orange" size="large" />}
					{hasCourses ? (
						<>
							{!hasSubscription && (
								<div className={styles["subscription-ad"]}>
									<p>
										<Link className={styles["link"]} to="/subscription">
											Get premium
										</Link>
										<span className={styles["sub-content"]}>
											{" "}
											for AI-based recommendations and more!
										</span>
									</p>
									<Image
										alt="wqg"
										className={styles["premium-character"]}
										src={premiumCharacter}
									/>
								</div>
							)}

							<div className={styles["course-container"]}>
								{hasSubscription && (
									<div>
										<div className={styles["courses-title-container"]}>
											<h2 className={styles["courses-title"]}>
												AI-based Recommendations
											</h2>
											<span className={styles["premium-label"]}>Premium</span>
										</div>
										{isRecommendedLoading ? (
											<Loader color="orange" size="large" />
										) : (
											<Courses
												courses={recommendedCourses}
												onAddCourse={handleAddCourse}
											/>
										)}
									</div>
								)}
								<div className={styles["searched-courses"]}>
									<p className={styles["results-count"]}>
										{courses.length} results
									</p>

									<Courses courses={courses} onAddCourse={handleAddCourse} />
									<Button
										className={styles["load-more-button"]}
										isDisabled={isLoadMore}
										isLoading={isLoadMore}
										label="Load more"
										onClick={handleLoadMore}
										size="small"
									/>
								</div>
							</div>
						</>
					) : (
						!isLoadFirstPage && (
							<div className={styles["placeholder-container"]}>
								<p className={styles["placeholder-title"]}>
									Let&apos;s search for something...
								</p>
								<div className={styles["character"]} />
							</div>
						)
					)}
				</div>
			</div>
		</Modal>
	);
};

export { AddCourseModal };
