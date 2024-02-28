const getVendorsFromForm = (formState: { [k: string]: boolean }): string[] => {
	return Object.entries(formState)
		.filter(([, value]) => value)
		.map(([key]) => key);
};

export { getVendorsFromForm };
