import {
	AbstractModel,
	DatabaseTableName,
} from "~/libs/modules/database/database.js";

class VendorModel extends AbstractModel {
	public key!: string;

	public name!: string;

	public url!: string;

	public static override get tableName(): string {
		return DatabaseTableName.VENDORS;
	}
}

export { VendorModel };
