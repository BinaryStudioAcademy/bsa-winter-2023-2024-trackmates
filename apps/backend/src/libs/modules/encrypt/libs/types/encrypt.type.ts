type EncryptResult = {
	hash: string;
	salt: string;
};

type Encrypt = {
	compare(data: string, hash: string, salt: string): Promise<boolean>;
	encrypt(data: string): Promise<EncryptResult>;
};

export { type Encrypt };
