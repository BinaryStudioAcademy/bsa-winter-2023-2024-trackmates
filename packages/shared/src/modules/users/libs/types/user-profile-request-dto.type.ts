type UserProfileRequestDto = {
	country?: string | undefined;
	fullName: string;
	id: number;
	location?: string | undefined;
	timeZone?: string | undefined;
};

export { type UserProfileRequestDto };
