import {
	EmptyPagePlaceholder,
	Pagination,
} from "~/libs/components/components.js";
import { EMPTY_ARRAY_LENGTH } from "~/libs/constants/constants.js";
import { type usePagination } from "~/libs/hooks/hooks.js";
import { type UserAuthResponseDto } from "~/modules/users/users.js";

import { FriendList } from "../components.js";
import styles from "./styles.module.css";

type Properties = {
	emptyPlaceholder: string;
	items: UserAuthResponseDto[];
	pagination: ReturnType<typeof usePagination>;
};

const FriendsTab: React.FC<Properties> = ({
	emptyPlaceholder,
	items,
	pagination,
}: Properties) => {
	const { handlePageChange, page, pages, pagesCount } = pagination;
	const hasPages = items.length > EMPTY_ARRAY_LENGTH;

	if (!hasPages) {
		return <EmptyPagePlaceholder title={emptyPlaceholder} />;
	}

	return (
		<div className={styles["friends-tab"]}>
			<FriendList friends={items} />
			<Pagination
				currentPage={page}
				onPageChange={handlePageChange}
				pages={pages}
				pagesCount={pagesCount}
			/>
		</div>
	);
};

export { FriendsTab };
