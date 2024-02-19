const getSizeInMb = (amount: number): number => {
	const kilo = 1024;
	return amount * kilo * kilo;
};

export { getSizeInMb };
