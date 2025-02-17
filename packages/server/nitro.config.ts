//https://nitro.unjs.io/config
export default defineNitroConfig({
	srcDir: "src",
	experimental: { asyncContext: true },
	compatibilityDate: "2025-01-20",
	errorHandler: "./src/error-handler.ts",
	routeRules: {
		"/courses/**": { cors: true },
		"/courses": { cors: true },
		"/auth/**": { cors: true },
		"/my-courses": { cors: true },
		"/user/**": { cors: true },
	},
});
