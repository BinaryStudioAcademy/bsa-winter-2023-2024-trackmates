import { genSalt, hash } from "bcrypt";
import { type Knex } from "knex";

type User = {
	email: string;
	id: number;
	passwordHash: string;
	passwordSalt: string;
};

type UserDetails = {
	firstName: string;
	id: number;
	lastName: string;
	userId: number;
};

type Group = {
	id: number;
	key: string;
	name: string;
};

type Permission = {
	id: number;
	key: string;
	name: string;
};

const TableName = {
	GROUPS: "groups",
	GROUPS_TO_PERMISSIONS: "groups_to_permissions",
	PERMISSIONS: "permissions",
	USER_DETAILS: "user_details",
	USERS: "users",
	USERS_TO_GROUPS: "users_to_groups",
} as const;

const ColumnName = {
	EMAIL: "email",
	FIRST_NAME: "first_name",
	GROUP_ID: "group_id",
	ID: "id",
	KEY: "key",
	LAST_NAME: "last_name",
	NAME: "name",
	PASSWORD_HASH: "password_hash",
	PASSWORD_SALT: "password_salt",
	PERMISSION_ID: "permission_id",
	USER_ID: "user_id",
} as const;

const AdminCredentials = {
	EMAIL: "uam_admin@trackmates.net",
	FIRST_NAME: "UAM",
	LAST_NAME: "Admin",
	PASSWORD: "trackmates_uam_admin",
} as const;

const AdminGroup = {
	KEY: "admins",
	NAME: "Admins",
} as const;

const SALT_ROUNDS = 10;
const PERMISSION_KEY = "manage-uam";

async function up(knex: Knex): Promise<void> {
	const passwordSalt = await genSalt(SALT_ROUNDS);
	const passwordHash = await hash(AdminCredentials.PASSWORD, passwordSalt);

	const insertedAdmins = await knex(TableName.USERS)
		.insert({
			[ColumnName.EMAIL]: AdminCredentials.EMAIL,
			[ColumnName.PASSWORD_HASH]: passwordHash,
			[ColumnName.PASSWORD_SALT]: passwordSalt,
		})
		.returning("*");

	const [insertedAdmin] = insertedAdmins as User[];
	const { id: adminId } = insertedAdmin as User;

	const hasAdmin = Boolean(adminId);

	if (!hasAdmin) {
		return;
	}

	const insertedAdminsDetails = await knex(TableName.USER_DETAILS)
		.insert({
			[ColumnName.FIRST_NAME]: AdminCredentials.FIRST_NAME,
			[ColumnName.LAST_NAME]: AdminCredentials.LAST_NAME,
			[ColumnName.USER_ID]: adminId,
		})
		.returning("*");

	const [insertedAdminDetails] = insertedAdminsDetails as UserDetails[];
	const { id: adminDetailsId } = insertedAdminDetails as UserDetails;

	const hasAdminDetails = Boolean(adminDetailsId);

	if (!hasAdminDetails) {
		return;
	}

	const insertedGroups = await knex(TableName.GROUPS)
		.insert({
			[ColumnName.KEY]: AdminGroup.KEY,
			[ColumnName.NAME]: AdminGroup.NAME,
		})
		.returning("*");

	const [insertedGroup] = insertedGroups as Group[];
	const { id: groupId } = insertedGroup as Group;

	const hasGroup = Boolean(groupId);

	if (!hasGroup) {
		return;
	}

	const selectedPermissions = await knex(TableName.PERMISSIONS)
		.select("*")
		.where(ColumnName.KEY, PERMISSION_KEY);

	const [selectedPermission] = selectedPermissions as Permission[];
	const { id: permissionId } = selectedPermission as Permission;

	const hasPermission = Boolean(permissionId);

	if (!hasPermission) {
		return;
	}

	await knex(TableName.GROUPS_TO_PERMISSIONS).insert({
		[ColumnName.GROUP_ID]: groupId,
		[ColumnName.PERMISSION_ID]: permissionId,
	});

	await knex(TableName.USERS_TO_GROUPS).insert({
		[ColumnName.GROUP_ID]: groupId,
		[ColumnName.USER_ID]: adminId,
	});
}

async function down(knex: Knex): Promise<void> {
	await knex(TableName.USERS)
		.where(ColumnName.EMAIL, AdminCredentials.EMAIL)
		.delete();
	await knex(TableName.GROUPS).where(ColumnName.KEY, AdminGroup.KEY).delete();
}

export { down, up };
