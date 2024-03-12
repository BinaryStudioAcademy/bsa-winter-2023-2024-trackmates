const getUnreadDisplayValue = (
	unreadCount: number,
	maximumDisplayCount: number,
): number | string => {
	return unreadCount <= maximumDisplayCount
		? unreadCount
		: `${maximumDisplayCount}+`;
};

export { getUnreadDisplayValue };
