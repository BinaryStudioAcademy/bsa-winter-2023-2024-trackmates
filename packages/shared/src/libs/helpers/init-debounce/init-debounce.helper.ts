const initDebounce = <T extends unknown[]>(
	callback: (...arguments_: T) => void,
	delay: number,
): ((...arguments_: T) => void) & { clear: () => void } => {
	let timer: null | number = null;

	const debouncedFunction = (...arguments_: T): void => {
		if (timer) {
			clearTimeout(timer);
		}

		timer = Number(
			setTimeout(() => {
				callback(...arguments_);
			}, delay),
		);
	};

	const clear = (): void => {
		if (timer) {
			clearTimeout(timer);
			timer = null;
		}
	};

	debouncedFunction.clear = clear;

	return debouncedFunction;
};

export { initDebounce };
