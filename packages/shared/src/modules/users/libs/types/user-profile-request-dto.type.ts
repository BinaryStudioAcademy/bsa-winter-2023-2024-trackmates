type UserProfileRequestDto = {
	country?: string | undefined;
	firstName: string;
	id: number;
	lastName: string;
	location?: string | undefined;
	timeZone?: string | undefined;
};

export { type UserProfileRequestDto };
