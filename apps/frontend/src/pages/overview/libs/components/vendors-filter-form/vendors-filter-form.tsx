import UdemyLogo from "~/assets/img/svg/udemy-logo.svg";
import { useAppForm, useEffect } from "~/libs/hooks/hooks.js";

import { VendorBadge } from "../vendor-badge/vendor-badge.js";
import { DEFAULT_VENDORS_PAYLOAD } from "./libs/constants/constants.js";

type Properties = {
	onVendorsChange: (vendors: { udemy: boolean }) => void;
};

const VendorsFilterForm: React.FC<Properties> = ({
	onVendorsChange,
}: Properties) => {
	const { control, watch } = useAppForm({
		defaultValues: DEFAULT_VENDORS_PAYLOAD,
		mode: "onChange",
	});

	const vendors = watch();

	useEffect(() => {
		onVendorsChange(vendors);
	}, [vendors, onVendorsChange]);

	return (
		<>
			<form name="vendor-filter">
				<VendorBadge control={control} logo={UdemyLogo} name="udemy" />
			</form>
		</>
	);
};

export { VendorsFilterForm };
