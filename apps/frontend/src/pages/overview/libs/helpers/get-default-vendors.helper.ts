import { VendorResponseDto } from "~/modules/vendors/vendors.js";

const getDefaultVendors = (vendors: VendorResponseDto[]) => {
	return Object.fromEntries(vendors.map((vendor) => [vendor.key, true]));
};

export { getDefaultVendors };
