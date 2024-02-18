import { useAppForm, useCallback } from "~/libs/hooks/hooks.js";

import { DEFAULT_VENDORS_PAYLOAD } from "../../constants/constants.js";
import { VendorBadge } from "../vendor-badge/vendor-badge.js";

type Properties = {
	onVendorsChange: (vendors: Record<string, boolean>) => void;
};

const VendorsFilterForm: React.FC<Properties> = ({
	onVendorsChange,
}: Properties) => {
	const { control, watch } = useAppForm({
		defaultValues: DEFAULT_VENDORS_PAYLOAD,
		mode: "onChange",
	});

	const handleToggleVendor = useCallback(() => {
		onVendorsChange(watch());
	}, [onVendorsChange, watch]);

	return (
		<>
			<form onChange={handleToggleVendor}>
				<VendorBadge control={control} name="udemy" />
			</form>
		</>
	);
};

export { VendorsFilterForm };
