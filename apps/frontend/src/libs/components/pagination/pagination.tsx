import { type AppRoute } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";

import { PaginationItem } from "./libs/components/components.js";
import styles from "./styles.module.css";

type Properties = {
	currentPage: number;
	pages: number[];
	pagesCount: number;
};

const ONE_ITEM_COUNT = 1;
const NO_ITEMS_PAGE_COUNT = 0;

const Pagination: React.FC<Properties> = ({
	currentPage,
	pages,
	pagesCount,
}: Properties) => {
	const isFirstPage = currentPage === ONE_ITEM_COUNT;
	const isLastPage =
		currentPage === pagesCount || pagesCount === NO_ITEMS_PAGE_COUNT;

	return (
		<nav
			aria-label="pagination"
			className={styles["pagination"]}
			role="navigation"
		>
			<ul className={styles["content"]}>
				<PaginationItem
					isDisabled={isFirstPage}
					to={`?page=${ONE_ITEM_COUNT}` as ValueOf<typeof AppRoute>}
				>
					<span>First</span>
				</PaginationItem>
				<PaginationItem
					isDisabled={isFirstPage}
					to={
						`?page=${currentPage - ONE_ITEM_COUNT}` as ValueOf<typeof AppRoute>
					}
				>
					<span>Prev</span>
				</PaginationItem>
				{pages.map((page) => (
					<PaginationItem
						isActive={currentPage === page}
						key={page}
						to={`?page=${page}` as ValueOf<typeof AppRoute>}
					>
						<span>{page}</span>
					</PaginationItem>
				))}
				<PaginationItem
					isDisabled={isLastPage}
					to={
						`?page=${currentPage + ONE_ITEM_COUNT}` as ValueOf<typeof AppRoute>
					}
				>
					<span>Next</span>
				</PaginationItem>
				<PaginationItem
					isDisabled={isLastPage}
					to={`?page=${pagesCount}` as ValueOf<typeof AppRoute>}
				>
					<span>Last</span>
				</PaginationItem>
			</ul>
		</nav>
	);
};

export { Pagination };
