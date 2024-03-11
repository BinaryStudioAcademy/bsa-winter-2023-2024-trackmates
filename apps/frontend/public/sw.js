import { precacheAndRoute } from "workbox-precaching";

precacheAndRoute(self.__WB_MANIFEST);

elf.addEventListener("push", async (e) => {
	const dataObject = await e.data.json();
	const notificationTitle = dataObject.message;
	const notificationOptions = dataObject.options;

	e.waitUntil(
		self.registration.showNotification(notificationTitle, notificationOptions),
	);
});
