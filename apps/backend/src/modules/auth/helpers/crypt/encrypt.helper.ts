import { hash, genSalt } from "bcrypt";

const encrypt = async (data: string): Promise<string> => {
	return hash(data, await genSalt());
};

export { encrypt };
