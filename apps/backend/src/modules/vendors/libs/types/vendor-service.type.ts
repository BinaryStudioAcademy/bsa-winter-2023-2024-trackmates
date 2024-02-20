type SearchParameters = {
	page?: number;
	pageSize?: number;
	search?: string;
};

type VendorService = {
	getCourseById(id: string): Promise<Record<string, unknown>>;
	getCourses(parameters: SearchParameters): Promise<Record<string, unknown>[]>;
};

export { type VendorService };
