import { useAppForm, useCallback } from "~/libs/hooks/hooks.js";
import { type VendorResponseDto } from "~/modules/vendors/vendors.js";

import {
	getDefaultVendors,
	getVendorsFromForm,
} from "../../helpers/helpers.js";
import { VendorBadge } from "../vendor-badge/vendor-badge.js";

type Properties = {
	onVendorsChange: (vendors: string[]) => void;
	vendors: VendorResponseDto[];
};

const VendorsFilterForm: React.FC<Properties> = ({
	onVendorsChange,
	vendors,
}: Properties) => {
	const { control, watch } = useAppForm({
		defaultValues: getDefaultVendors(vendors),
		mode: "onChange",
	});

	const handleChangeVendor = useCallback(() => {
		onVendorsChange(getVendorsFromForm(watch()));
	}, [onVendorsChange, watch]);

	return (
		<>
			<form onChange={handleChangeVendor}>
				{vendors.map((vendor) => (
					<VendorBadge control={control} key={vendor.id} name={vendor.key} />
				))}
			</form>
		</>
	);
};

export { VendorsFilterForm };
