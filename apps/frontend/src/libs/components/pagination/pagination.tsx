import { type AppRoute, QueryParameterName } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";

import { PaginationItem } from "./libs/components/components.js";
import styles from "./styles.module.css";

type Properties = {
	currentPage: number;
	pages: number[];
	pagesCount: number;
	searchQuery?: null | string;
};

const DEFAULT_PAGE_NUMBER = 1;
const NO_ITEMS_PAGE_COUNT = 0;

const Pagination: React.FC<Properties> = ({
	currentPage,
	pages,
	pagesCount,
	searchQuery,
}: Properties) => {
	const isFirstPage = currentPage === DEFAULT_PAGE_NUMBER;
	const isLastPage =
		currentPage === pagesCount || pagesCount === NO_ITEMS_PAGE_COUNT;

	if (pagesCount === DEFAULT_PAGE_NUMBER) {
		return null;
	}

	const queryString = new URLSearchParams({
		[QueryParameterName.SEARCH]: searchQuery ?? "",
	}).toString();

	const querySuffix = searchQuery ? `&${queryString}` : "";

	return (
		<nav
			aria-label="pagination"
			className={styles["pagination"]}
			role="navigation"
		>
			<ul className={styles["content"]}>
				<PaginationItem
					href={
						`?page=${DEFAULT_PAGE_NUMBER}${querySuffix}` as ValueOf<
							typeof AppRoute
						>
					}
					iconName="navFirst"
					isDisabled={isFirstPage}
					label=""
				/>
				<PaginationItem
					href={
						`?page=${currentPage - DEFAULT_PAGE_NUMBER}${querySuffix}` as ValueOf<
							typeof AppRoute
						>
					}
					iconName="navPrev"
					isDisabled={isFirstPage}
					label=""
				/>
				{pages.map((page) => (
					<PaginationItem
						href={`?page=${page}${querySuffix}` as ValueOf<typeof AppRoute>}
						isActive={currentPage === page}
						isDisabled={false}
						key={page}
						label={page.toString()}
					/>
				))}
				<PaginationItem
					href={
						`?page=${currentPage + DEFAULT_PAGE_NUMBER}${querySuffix}` as ValueOf<
							typeof AppRoute
						>
					}
					iconName="navNext"
					isDisabled={isLastPage}
					label=""
				/>
				<PaginationItem
					href={`?page=${pagesCount}${querySuffix}` as ValueOf<typeof AppRoute>}
					iconName="navLast"
					isDisabled={isLastPage}
					label=""
				/>
			</ul>
		</nav>
	);
};

export { Pagination };
