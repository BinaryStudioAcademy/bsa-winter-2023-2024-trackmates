function debounce<T extends unknown[]>(
	callback: (...arguments_: T) => void,
	delay: number,
): ((...arguments_: T) => void) & { clear: () => void } {
	let timer: null | number = null;
	const debouncedFunction = (...arguments_: T) => {
		if (timer) {
			clearTimeout(timer);
		}
		timer = Number(
			setTimeout(() => {
				callback(...arguments_);
			}, delay),
		);
	};
	const clear = () => {
		if (timer) {
			clearTimeout(timer);
			timer = null;
		}
	};

	debouncedFunction.clear = clear;

	return debouncedFunction;
}

export { debounce };
