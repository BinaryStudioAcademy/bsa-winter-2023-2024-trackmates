import reactPlugin from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";
import { ConfigEnv, defineConfig, loadEnv } from "vite";
import { VitePWA } from "vite-plugin-pwa";

const config = ({ mode }: ConfigEnv): ReturnType<typeof defineConfig> => {
	const {
		VITE_APP_API_ORIGIN_URL,
		VITE_APP_DEVELOPMENT_PORT,
		VITE_APP_PROXY_SERVER_URL,
	} = loadEnv(mode, process.cwd());

	const vitePWA = VitePWA({
		manifest: {
			description: "Trackmates",
			icons: [
				{
					sizes: "192x192",
					src: "/assets/android-chrome-192x192.png",
					type: "image/png",
				},
				{
					sizes: "512x512",
					src: "/assets/android-chrome-512x512.png",
					type: "image/png",
				},
				{
					sizes: "16x16",
					src: "/assets/favicon-16x16.png",
					type: "image/png",
				},
				{
					sizes: "32x32",
					src: "/assets/favicon-32x32.png",
					type: "image/png",
				},
			],
			name: "Trackmates",
			screenshots: [
				{
					sizes: "320x320",
					src: "/assets/screen-desk.png",
					type: "image/png",
				},
				{
					sizes: "1008x717",
					src: "/assets/screen-mobile.png",
					type: "image/png",
				},
				{
					sizes: "1440x1024",
					src: "/assets/screen-desk-1440-1024.png",
					type: "image/png",
				},
			],
			short_name: "Trackmates",
			theme_color: "#0b372f",
		},
		outDir: "build",
		registerType: "autoUpdate",
	});

	return defineConfig({
		build: {
			outDir: "build",
		},
		plugins: [reactPlugin(), vitePWA],
		resolve: {
			alias: [
				{
					find: "~",
					replacement: fileURLToPath(new URL("src", import.meta.url)),
				},
			],
		},
		server: {
			port: Number(VITE_APP_DEVELOPMENT_PORT),
			proxy: {
				[VITE_APP_API_ORIGIN_URL as string]: {
					changeOrigin: true,
					target: VITE_APP_PROXY_SERVER_URL,
				},
			},
		},
	});
};

export default config;
