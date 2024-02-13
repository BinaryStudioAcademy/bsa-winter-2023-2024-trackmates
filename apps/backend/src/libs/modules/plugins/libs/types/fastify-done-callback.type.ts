import { type FastifyError } from "fastify";

type FastifyDoneCallback = (error?: FastifyError | undefined) => void;

export { type FastifyDoneCallback };
