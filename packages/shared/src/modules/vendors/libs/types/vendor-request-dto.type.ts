import { type ValueOf } from "../../../../libs/types/types.js";
import { type VendorKey } from "../enums/enums.js";

type VendorRequestDto = {
	key: ValueOf<typeof VendorKey>;
	name: string;
	url: string;
};

export { type VendorRequestDto };
