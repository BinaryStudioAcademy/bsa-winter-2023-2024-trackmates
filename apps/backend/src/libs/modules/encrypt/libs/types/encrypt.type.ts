type EncryptResult = {
	hash: string;
	salt: string;
};

type Encrypt = {
	compare(data: {
		password: string;
		passwordHash: string;
		salt: string;
	}): Promise<boolean>;
	encrypt(password: string): Promise<EncryptResult>;
};

export { type Encrypt };
