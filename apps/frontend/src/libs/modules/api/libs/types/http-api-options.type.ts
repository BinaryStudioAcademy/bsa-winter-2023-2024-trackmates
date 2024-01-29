import { type ContentType } from "~/libs/enums/enums.ts";
import { type HTTPOptions } from "~/libs/modules/http/http.ts";
import { type ValueOf } from "~/libs/types/types.ts";

type HTTPApiOptions = Omit<HTTPOptions, "headers" | "payload"> & {
	hasAuth: boolean;
	contentType: ValueOf<typeof ContentType>;
	payload?: HTTPOptions["payload"];
};

export { type HTTPApiOptions };
