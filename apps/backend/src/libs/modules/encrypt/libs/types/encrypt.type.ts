type Encrypt = {
	compare(data: {
		password: string;
		passwordHash: string;
		salt: string;
	}): Promise<boolean>;

	encrypt(password: string): Promise<{
		hash: string;
		salt: string;
	}>;
};

export { type Encrypt };
