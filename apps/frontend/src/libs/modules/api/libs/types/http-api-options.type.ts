import { type ContentType } from "~/libs/enums/enums.js";
import { type HTTPOptions } from "~/libs/modules/http/http.js";
import { type ValueOf } from "~/libs/types/types.js";

type HTTPApiOptions = Omit<HTTPOptions, "headers" | "payload"> & {
  hasAuth: boolean;
  contentType: ValueOf<typeof ContentType>;
  payload?: HTTPOptions["payload"];
};

export { type HTTPApiOptions };
