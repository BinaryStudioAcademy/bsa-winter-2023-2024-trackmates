import { useCallback, useRef } from "react";

type Properties = {
	isLoading: boolean;
	loadMore: () => void;
};

const useInfiniteScroll = <T extends HTMLElement>({
	isLoading,
	loadMore,
}: Properties): ((node: T | null) => void) => {
	const observer = useRef<IntersectionObserver | null>(null);

	return useCallback(
		(node: T | null) => {
			if (observer.current) {
				observer.current.disconnect();
			}

			observer.current = new IntersectionObserver((entries) => {
				if (isLoading) {
					return;
				}

				const [firstEntry] = entries;

				if (firstEntry?.isIntersecting) {
					loadMore();
				}
			});

			if (node) {
				observer.current.observe(node);
			}
		},
		[isLoading, loadMore],
	);
};

export { useInfiniteScroll };
