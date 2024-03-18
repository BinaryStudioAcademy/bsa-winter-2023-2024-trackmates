import { type FastifyRequest } from "fastify";

import { ExceptionMessage, HTTPCode } from "~/libs/enums/enums.js";
import { type Service } from "~/libs/types/types.js";
import { PermissionError } from "~/modules/permissions/libs/exceptions/exceptions.js";

type CheckIsUserCreatorParameters<T> = {
	getDtoIdFromRequest: (request: FastifyRequest) => number;
	getUserIdFromDto: (dto: T) => number;
	service: Service<T>;
};

const checkIsUserCreator =
	<T>({
		getDtoIdFromRequest,
		getUserIdFromDto,
		service,
	}: CheckIsUserCreatorParameters<T>) =>
	async (request: FastifyRequest): Promise<void> => {
		const { user } = request;

		const id = getDtoIdFromRequest(request);
		const dto = await service.find(id);
		const creatorId = getUserIdFromDto(dto);

		const isCreator = creatorId === user?.id;

		if (!isCreator) {
			throw new PermissionError({
				message: ExceptionMessage.NO_PERMISSION,
				status: HTTPCode.FORBIDDEN,
			});
		}
	};

export { checkIsUserCreator };
