import { useCallback } from "react";

import { PaginationItem } from "./libs/components/components.js";
import styles from "./styles.module.css";

type Properties = {
	currentPage: number;
	onPageChange: (nextPage: number) => void;
	pages: number[];
	pagesCount: number;
};

const ONE_ITEM_COUNT = 1;
const NO_ITEMS_PAGE_COUNT = 0;

const Pagination: React.FC<Properties> = ({
	currentPage,
	onPageChange,
	pages,
	pagesCount,
}: Properties) => {
	const isFirstPage = currentPage === ONE_ITEM_COUNT;
	const isLastPage =
		currentPage === pagesCount || pagesCount === NO_ITEMS_PAGE_COUNT;

	const handlePageChange = useCallback(
		(nextPage: number) => {
			return (): void => {
				onPageChange(nextPage);
			};
		},
		[onPageChange],
	);

	if (pagesCount === ONE_ITEM_COUNT) {
		return null;
	}

	return (
		<nav
			aria-label="pagination"
			className={styles["pagination"]}
			role="navigation"
		>
			<ul className={styles["content"]}>
				<PaginationItem
					hasVisuallyHiddenLabel
					iconName="navFirst"
					isDisabled={isFirstPage}
					label="First"
					onPageChange={handlePageChange(ONE_ITEM_COUNT)}
				/>
				<PaginationItem
					hasVisuallyHiddenLabel
					iconName="navPrev"
					isDisabled={isFirstPage}
					label="Prev"
					onPageChange={handlePageChange(currentPage - ONE_ITEM_COUNT)}
				/>
				{pages.map((page) => (
					<PaginationItem
						isActive={currentPage === page}
						key={page}
						label={page}
						onPageChange={handlePageChange(page)}
					/>
				))}
				<PaginationItem
					hasVisuallyHiddenLabel
					iconName="navNext"
					isDisabled={isLastPage}
					label="Next"
					onPageChange={handlePageChange(currentPage + ONE_ITEM_COUNT)}
				/>
				<PaginationItem
					hasVisuallyHiddenLabel
					iconName="navLast"
					isDisabled={isLastPage}
					label="Last"
					onPageChange={handlePageChange(pagesCount)}
				/>
			</ul>
		</nav>
	);
};

export { Pagination };
