const getPagesRange = (start: number, end: number): number[] => {
	return [...Array.from({ length: end - start }).keys()].map(
		(element) => element + start,
	);
};

export { getPagesRange };
