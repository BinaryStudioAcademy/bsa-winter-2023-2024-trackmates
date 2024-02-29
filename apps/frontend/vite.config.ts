import reactPlugin from "@vitejs/plugin-react";
import browserslist from "browserslist";
import { Features, browserslistToTargets } from "lightningcss";
import { fileURLToPath } from "node:url";
import { type ConfigEnv, defineConfig, loadEnv } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import svgr from "vite-plugin-svgr";

const config = ({ mode }: ConfigEnv): ReturnType<typeof defineConfig> => {
	const {
		VITE_APP_API_ORIGIN_URL,
		VITE_APP_DEVELOPMENT_PORT,
		VITE_APP_PROXY_SERVER_URL,
	} = loadEnv(mode, process.cwd());

	const vitePWA = VitePWA({
		devOptions: {
			enabled: true,
		},
		manifest: {
			description:
				"Trackmates - monitor your progress and the progress of your friends!",
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
					sizes: "1008x717",
					src: "/assets/screen-desk.png",
					type: "image/png",
				},
				{
					sizes: "450x320",
					src: "/assets/screen-tablet.png",
					type: "image/png",
				},
				{
					form_factor: "wide",
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
			cssMinify: "lightningcss",
			outDir: "build",
		},
		css: {
			lightningcss: {
				include: Features.MediaQueries,
				targets: browserslistToTargets(
					browserslist(["last 2 version", "not dead"]),
				),
			},
			transformer: "lightningcss",
		},
		plugins: [reactPlugin(), svgr(), vitePWA],
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
