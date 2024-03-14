import {
	AbstractModel,
	DatabaseTableName,
} from "~/libs/modules/database/database.js";
import { type ValueOf } from "~/libs/types/types.js";

import { type VendorKey } from "./libs/enums/enums.js";

class VendorModel extends AbstractModel {
	public key!: ValueOf<typeof VendorKey>;

	public name!: string;

	public url!: string;

	public static override get tableName(): string {
		return DatabaseTableName.VENDORS;
	}
}

export { VendorModel };
