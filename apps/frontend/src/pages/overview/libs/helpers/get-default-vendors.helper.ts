import {
	VendorKey,
	type VendorResponseDto,
} from "~/modules/vendors/vendors.js";

const DEFAULT_VENDOR = VendorKey.UDEMY;

const getDefaultVendors = (
	vendors: VendorResponseDto[],
): {
	[k in string]: boolean;
} => {
	return Object.fromEntries(
		vendors.map((vendor) => [vendor.key, vendor.key === DEFAULT_VENDOR]) as [
			string,
			boolean,
		][],
	);
};

export { getDefaultVendors };
