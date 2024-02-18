import { useAppForm, useCallback, useEffect } from "~/libs/hooks/hooks.js";
import { type VendorResponseDto } from "~/modules/vendors/vendors.js";

import { VendorBadge } from "../vendor-badge/vendor-badge.js";

type Properties = {
	onVendorsChange: (vendors: Record<string, boolean>) => void;
	vendors: VendorResponseDto[];
};

const VendorsFilterForm: React.FC<Properties> = ({
	onVendorsChange,
	vendors,
}: Properties) => {
	const { control, watch } = useAppForm({
		defaultValues: Object.fromEntries(
			vendors.map((vendor) => [vendor.key, true]),
		),
		mode: "onChange",
	});

	const handleToggleVendor = useCallback(() => {
		onVendorsChange(watch());
	}, [onVendorsChange, watch]);

	useEffect(() => {
		handleToggleVendor();
	}, [handleToggleVendor]);

	return (
		<>
			<form onChange={handleToggleVendor}>
				{vendors.map((vendor) => (
					<VendorBadge control={control} key={vendor.id} name={vendor.key} />
				))}
			</form>
		</>
	);
};

export { VendorsFilterForm };
