import { type HTTPMethod } from "~/libs/modules/http/http.js";
import { type ValidationSchema } from "~/libs/types/types.js";

import { type APIHandler } from "./api-handler.type.js";

type ControllerRouteParameters = {
  path: string;
  method: HTTPMethod;
  handler: APIHandler;
  validation?: {
    body?: ValidationSchema;
  };
};

export { type ControllerRouteParameters };
