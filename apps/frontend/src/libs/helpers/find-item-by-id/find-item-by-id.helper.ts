const findItemById = <T extends { id: number }>(
	items: T[],
	targetId: number,
): T | null => {
	return (
		items.find((item) => {
			return item.id === targetId;
		}) ?? null
	);
};

export { findItemById };
