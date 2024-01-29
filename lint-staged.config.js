/** @type {Record<string, string>} */
const config = {
	"*": "npm run lint:editor && npm run lint:fs",
	"*.{ts,tsx,json,md,css,html}": "prettier --write",
	"shared/src/**/*.ts": "cd shared && npm run lint:js",
	"backend/src/**/*.ts": "cd backend && npm run lint:js",
	"frontend/src/**/*.css": "cd frontend && npm run lint:css",
	"frontend/src/**/*.{ts,tsx}": "cd frontend && npm run lint:js",
};

export default config;
