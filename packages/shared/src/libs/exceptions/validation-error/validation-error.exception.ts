import zod from "zod";

class ValidationError extends zod.ZodError {}

export { ValidationError };
