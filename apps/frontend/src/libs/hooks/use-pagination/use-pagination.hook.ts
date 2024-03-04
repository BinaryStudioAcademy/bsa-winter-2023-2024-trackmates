import { useState } from "~/libs/hooks/hooks.js";

type UsePaginationReturn = {
	handlePageChange: (page: number) => void;
	page: number;
};

const INIT_PAGE = 1;

const usePagination = (): UsePaginationReturn => {
	const [page, setPage] = useState<number>(INIT_PAGE);

	const handlePageChange = (page: number): void => {
		setPage(page);
	};

	return { handlePageChange, page };
};

export { usePagination };
