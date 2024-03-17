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
					iconName="navFirst"
					isDisabled={isFirstPage}
					label=""
					to={`?page=${ONE_ITEM_COUNT}` as ValueOf<typeof AppRoute>}
				/>
				<PaginationItem
					iconName="navPrev"
					isDisabled={isFirstPage}
					label=""
					to={
						`?page=${currentPage - ONE_ITEM_COUNT}` as ValueOf<typeof AppRoute>
					}
				/>
				{pages.map((page) => (
					<PaginationItem
						isActive={currentPage === page}
						key={page}
						label={page.toString()}
						to={`?page=${page}` as ValueOf<typeof AppRoute>}
					/>
				))}
				<PaginationItem
					iconName="navNext"
					isDisabled={isLastPage}
					label=""
					to={
						`?page=${currentPage + ONE_ITEM_COUNT}` as ValueOf<typeof AppRoute>
					}
				/>
				<PaginationItem
					iconName="navLast"
					isDisabled={isLastPage}
					label=""
					to={`?page=${pagesCount}` as ValueOf<typeof AppRoute>}
				/>
			</ul>
		</nav>
	);
};

export { Pagination };
