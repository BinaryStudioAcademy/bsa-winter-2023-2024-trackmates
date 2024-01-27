import { type HTTPCode } from "~/libs/modules/http/http.js";
import { type ValueOf } from "~/libs/types/value-of.type.js";

import { ApplicationError } from "../application-error/application-error.exception.js";

type Constructor = {
  message: string;
  status: ValueOf<typeof HTTPCode>;
  cause?: unknown;
};

class HTTPError extends ApplicationError {
  public status: ValueOf<typeof HTTPCode>;

  public constructor({ message, cause, status }: Constructor) {
    super({
      message,
      cause,
    });

    this.status = status;
  }
}

export { HTTPError };
