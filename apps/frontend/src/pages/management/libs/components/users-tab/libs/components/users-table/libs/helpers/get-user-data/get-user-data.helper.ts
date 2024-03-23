import { type UserAuthResponseDto } from "~/modules/users/users.js";

import { type UsersTableRow } from "../../types/types.js";

const getUserData = (users: UserAuthResponseDto[]): UsersTableRow[] => {
	return users.map(({ email, firstName, groups, id, lastName }) => {
		return {
			email,
			firstName,
			groups: groups.map((group) => {
				return group.name;
			}),
			id,
			lastName,
		};
	});
};

export { getUserData };
