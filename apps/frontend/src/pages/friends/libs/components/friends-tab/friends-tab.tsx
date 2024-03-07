import { Pagination } from "~/libs/components/components.js";
import { type usePagination } from "~/libs/hooks/hooks.js";
import { type UserAuthResponseDto } from "~/modules/users/users.js";

import { FriendList } from "../components.js";

const NO_ITEMS_COUNT = 0;

type Properties = {
	items: UserAuthResponseDto[];
	pagination: ReturnType<typeof usePagination>;
};

const FriendsTab: React.FC<Properties> = ({
	items,
	pagination,
}: Properties) => {
	const { handlePageChange, page, pages, pagesCount } = pagination;
	const hasPages = items.length > NO_ITEMS_COUNT;

	return (
		<>
			<FriendList friends={items} />
			{hasPages && (
				<Pagination
					currentPage={page}
					onPageChange={handlePageChange}
					pages={pages}
					pagesCount={pagesCount}
				/>
			)}
		</>
	);
};

export { FriendsTab };
