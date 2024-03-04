import { useCallback } from "react";

import { PaginationItem } from "./libs/components/components.js";
import { getPagesCut, getPagesRange } from "./libs/helpers/helpers.js";
import styles from "./styles.module.css";

type Properties = {
	currentPage: number;
	onPageChange: (nextPage: number) => void;
	pageSize: number;
	pagesCutCount?: number;
	totalCount: number;
};

const ONE_ITEM_COUNT = 1;
const DEFAULT_MAX_PAGES_DISPLAYED = 5;
const NO_ITEMS_PAGE_COUNT = 0;

const Pagination: React.FC<Properties> = ({
	currentPage,
	onPageChange,
	pageSize,
	pagesCutCount = DEFAULT_MAX_PAGES_DISPLAYED,
	totalCount,
}: Properties) => {
	const pagesCount = Math.ceil(totalCount / pageSize);
	const pagesCut = getPagesCut({ currentPage, pagesCount, pagesCutCount });
	const pages = getPagesRange(pagesCut.start, pagesCut.end);
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

	return (
		<nav
			aria-label="pagination"
			className={styles["pagination"]}
			role="navigation"
		>
			<ul className={styles["content"]}>
				<PaginationItem
					isDisabled={isFirstPage}
					label="First"
					onPageChange={handlePageChange(ONE_ITEM_COUNT)}
				/>
				<PaginationItem
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
					isDisabled={isLastPage}
					label="Next"
					onPageChange={handlePageChange(currentPage + ONE_ITEM_COUNT)}
				/>
				<PaginationItem
					isDisabled={isLastPage}
					label="Last"
					onPageChange={handlePageChange(pagesCount)}
				/>
			</ul>
		</nav>
	);
};

export { Pagination };
