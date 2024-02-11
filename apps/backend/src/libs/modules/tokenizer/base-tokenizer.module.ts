import { Tokenizer } from "./libs/types/types.js";

class BaseTokenizer implements Tokenizer {
	createToken<T>(data: T): string {
		// TODO implement. This is just stub
		return `token from ${JSON.stringify(data)}`;
	}
}

export { BaseTokenizer };
