import { PaginationValue } from "~/libs/enums/enums.js";
import { useState } from "~/libs/hooks/hooks.js";

type UsePaginationReturn = {
	handlePageChange: (page: number) => void;
	page: number;
};

const usePagination = (): UsePaginationReturn => {
	const [page, setPage] = useState<number>(PaginationValue.DEFAULT_PAGE);

	const handlePageChange = (page: number): void => {
		setPage(page);
	};

	return { handlePageChange, page };
};

export { usePagination };
