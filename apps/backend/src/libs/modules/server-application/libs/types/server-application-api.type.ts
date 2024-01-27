import { type ServerApplicationRouteParameters } from "./types.js";

type ServerApplicationApi = {
  version: string;
  routes: ServerApplicationRouteParameters[];
  generateDoc(title: string): object;
};

export { type ServerApplicationApi };
