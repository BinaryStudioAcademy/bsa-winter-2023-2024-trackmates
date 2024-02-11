import { genSalt, hash } from "bcrypt";

const encrypt = async (data: string): Promise<string> => {
	return await hash(data, await genSalt());
};

export { encrypt };
