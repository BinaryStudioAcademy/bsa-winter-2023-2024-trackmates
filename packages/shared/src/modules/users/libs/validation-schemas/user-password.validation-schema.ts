import { z } from "zod";

const userPassword = z.string().trim();

export { userPassword };
