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
				"TrackMates — keep an eye on your learning progress and track the progress of your friends as you navigate through courses together!",
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
			name: "TrackMates",
			screenshots: [
				{
					form_factor: "wide",
					sizes: "1232x810",
					src: "/assets/screen-desk-first.jpg",
					type: "image/jpg",
				},
				{
					form_factor: "wide",
					sizes: "1232x810",
					src: "/assets/screen-desk-second.jpg",
					type: "image/jpg",
				},
				{
					form_factor: "wide",
					sizes: "1232x810",
					src: "/assets/screen-desk-third.jpg",
					type: "image/jpg",
				},
				{
					sizes: "768x504",
					src: "/assets/screen-desk-fourth.jpg",
					type: "image/jpg",
				},
			],
			short_name: "TrackMates",
			theme_color: "#0b372f",
		},
		outDir: "build",
		registerType: "autoUpdate",
		workbox: {
			navigateFallbackDenylist: [/\/v1\/documentation(\/static\/index\.html)?/],
		},
	});

	return defineConfig({
		build: {
			cssMinify: "lightningcss",
			outDir: "build",
		},
		css: {
			lightningcss: {
				drafts: {
					customMedia: true,
				},
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
