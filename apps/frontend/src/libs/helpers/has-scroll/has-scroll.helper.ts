const hasScroll = (container: HTMLDivElement | null): boolean | null => {
	return container ? container.scrollHeight > container.clientHeight : null;
};

export { hasScroll };
