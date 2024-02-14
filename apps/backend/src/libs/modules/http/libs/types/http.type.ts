import { HTTPOptions } from "../enums/enums.js";

type Http = {
	load<T>(url: string, options: Partial<HTTPOptions>): Promise<T> | never;
};

export { type Http };
