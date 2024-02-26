const KILOBYTE = 1024;

const getSizeInBytes = (amount: number): number => {
	return amount * KILOBYTE * KILOBYTE;
};

export { getSizeInBytes };
