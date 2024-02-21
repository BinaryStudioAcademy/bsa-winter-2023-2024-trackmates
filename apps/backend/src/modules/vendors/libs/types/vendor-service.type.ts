type VendorService = {
	getCourseById(id: string): Promise<Record<string, unknown>>;
	getCourses(search: string): Promise<Record<string, unknown>[]>;
};

export { type VendorService };
