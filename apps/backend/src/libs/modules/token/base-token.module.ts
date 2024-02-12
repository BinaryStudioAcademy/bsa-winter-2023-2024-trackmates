import { Token } from "./libs/types/types.js";

class BaseToken implements Token {
	create<T>(data: T): string {
		// TODO implement. This is just stub
		return `token from ${JSON.stringify(data)}`;
	}
}

export { BaseToken };
