const kilo = 1024;

const getSizeInMb = (amount: number): number => {
	return amount * kilo * kilo;
};

export { getSizeInMb };
