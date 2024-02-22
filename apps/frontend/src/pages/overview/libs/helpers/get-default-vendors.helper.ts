import { type VendorResponseDto } from "~/modules/vendors/vendors.js";

const getDefaultVendors = (
	vendors: VendorResponseDto[],
): {
	[k in string]: boolean;
} => {
	return Object.fromEntries(vendors.map((vendor) => [vendor.key, true]));
};

export { getDefaultVendors };
