const KILOBYTE = 1024;

const getSizeInMb = (amount: number): number => {
	return amount * KILOBYTE * KILOBYTE;
};

export { getSizeInMb };
