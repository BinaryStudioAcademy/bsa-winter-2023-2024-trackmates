const findItemById = <T extends { id: number }>(
	items: T[],
	targetId: T["id"],
): T | null => {
	return (
		items.find((item) => {
			return item.id === targetId;
		}) ?? null
	);
};

export { findItemById };
