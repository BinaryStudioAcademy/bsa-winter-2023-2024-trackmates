import { useCallback, useRef } from "react";

type Properties = {
	isLoading: boolean;
	onLoadMore: () => void;
};

const useInfiniteScroll = <T extends HTMLElement>({
	isLoading,
	onLoadMore,
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
					onLoadMore();
				}
			});

			if (node) {
				observer.current.observe(node);
			}
		},
		[isLoading, onLoadMore],
	);
};

export { useInfiniteScroll };
