import { type FastifyRequest } from "fastify";

import { ExceptionMessage, HTTPCode } from "~/libs/enums/enums.js";
import { HTTPError } from "~/libs/exceptions/exceptions.js";
import { getValueByPath } from "~/libs/helpers/helpers.js";
import { type ExtractPath, type Service } from "~/libs/types/types.js";
import { PermissionError } from "~/modules/permissions/libs/exceptions/exceptions.js";

type CheckIsEqualParameters<DtoType, RequestType extends FastifyRequest> = {
	pathInDtoToCompareId: ExtractPath<DtoType>;
	pathInRequestToCompareId: ExtractPath<RequestType>;
	pathInRequestToDtoId: ExtractPath<RequestType>;
	service: Service<DtoType>;
};

const checkIdEquality =
	<DtoType, RequestType extends FastifyRequest>({
		pathInDtoToCompareId,
		pathInRequestToCompareId,
		pathInRequestToDtoId,
		service,
	}: CheckIsEqualParameters<DtoType, RequestType>) =>
	async (request: FastifyRequest): Promise<void> => {
		const compareId = getValueByPath(
			request as RequestType,
			pathInRequestToCompareId,
		) as null | number;
		const dtoId = getValueByPath(
			request as RequestType,
			pathInRequestToDtoId,
		) as null | number;

		if (!dtoId || !compareId) {
			throw new HTTPError({
				message: ExceptionMessage.INVALID_REQUEST_PARAMETERS,
				status: HTTPCode.BAD_REQUEST,
			});
		}

		const dto = await service.find(dtoId);
		const compareDtoId = getValueByPath(dto, pathInDtoToCompareId);

		const isEqual = compareDtoId === compareId;

		if (!isEqual) {
			throw new PermissionError({
				message: ExceptionMessage.NO_PERMISSION,
				status: HTTPCode.FORBIDDEN,
			});
		}
	};

export { checkIdEquality };
