import { toast } from "react-toastify";

import { type ValueOf } from "~/libs/types/types.js";

import { NotificationType } from "./libs/enums/enums.js";

type Options = {
	type: ValueOf<typeof NotificationType>;
};

const DEFAULT_MESSAGE = "Unexpected error";

class Notification {
	private show(message: string, options: Options): void {
		toast(message, options);
	}
	public error(message = DEFAULT_MESSAGE): void {
		this.show(message, {
			type: NotificationType.ERROR,
		});
	}
	public info(message = DEFAULT_MESSAGE): void {
		this.show(message, {
			type: NotificationType.INFO,
		});
	}
	public success(message = DEFAULT_MESSAGE): void {
		this.show(message, {
			type: NotificationType.SUCCESS,
		});
	}
	public warning(message = DEFAULT_MESSAGE): void {
		this.show(message, {
			type: NotificationType.WARNING,
		});
	}
}

export { Notification };
