type Friend = {
	fullName: string;
	id: number;
	imageUrl: string;
	status: "friend" | "invited" | "requested" | "unknown";
};

export { type Friend };
