type EncriptResult = {
	hash: string;
	salt: string;
};

type Encript = {
	compare(data: string, hash: string, salt: string): Promise<boolean>;
	encript(data: string): Promise<EncriptResult>;
};

export { type Encript };
