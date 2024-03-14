import { type VendorResponseDto } from "~/modules/vendors/vendors.js";

import { UDEMY_KEY } from "../constants/constants.js";

const getDefaultVendors = (
	vendors: VendorResponseDto[],
): {
	[k in string]: boolean;
} => {
	return Object.fromEntries(
		vendors.map((vendor) => [vendor.key, vendor.key === UDEMY_KEY]),
	);
};

export { getDefaultVendors };
