import { type FastifyRequest } from "fastify";

import { ExceptionMessage, HTTPCode } from "~/libs/enums/enums.js";
import { getValueByPath } from "~/libs/helpers/helpers.js";
import { type ExtractPath, type Service } from "~/libs/types/types.js";
import { PermissionError } from "~/modules/permissions/libs/exceptions/exceptions.js";

type CheckIsEqualParameters<DtoType, RequestType extends FastifyRequest> = {
	pathInDtoToCompareId: ExtractPath<DtoType>;
	pathInRequestToCompareId: ExtractPath<RequestType>;
	pathInRequestToDtoId: ExtractPath<RequestType>;
	service: Service<DtoType>;
};

const checkIsEqual =
	<DtoType, RequestType extends FastifyRequest>({
		pathInDtoToCompareId,
		pathInRequestToCompareId,
		pathInRequestToDtoId,
		service,
	}: CheckIsEqualParameters<DtoType, RequestType>) =>
	async (request: FastifyRequest): Promise<void> => {
		const toCompareId = getValueByPath(
			request as RequestType,
			pathInRequestToCompareId,
		) as number;
		const dtoId = getValueByPath(
			request as RequestType,
			pathInRequestToDtoId,
		) as number;

		const dto = await service.find(dtoId);
		const dtoIdToCompare = getValueByPath(dto, pathInDtoToCompareId);

		const isEqual = dtoIdToCompare === toCompareId;

		if (!isEqual) {
			throw new PermissionError({
				message: ExceptionMessage.NO_PERMISSION,
				status: HTTPCode.FORBIDDEN,
			});
		}
	};

export { checkIsEqual };
