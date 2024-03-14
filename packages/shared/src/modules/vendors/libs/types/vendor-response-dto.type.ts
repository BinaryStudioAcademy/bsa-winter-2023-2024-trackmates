import { type ValueOf } from "../../../../libs/types/types.js";
import { type VendorKey } from "../enums/enums.js";

type VendorResponseDto = {
	id: number;
	key: ValueOf<typeof VendorKey>;
	name: string;
	url: string;
};

export { type VendorResponseDto };
