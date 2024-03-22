import { type GroupCreateRequestDto } from "~/modules/groups/groups.js";

const DEFAULT_GROUP_CREATE_IN_PAYLOAD: GroupCreateRequestDto = {
	name: "",
	permissions: [],
};

export { DEFAULT_GROUP_CREATE_IN_PAYLOAD };
