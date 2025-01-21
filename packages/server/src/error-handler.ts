export default defineNitroErrorHandler((error, event) => {
	if (error.cause !== null && typeof error.cause === "object") {
		if ("status" in error.cause && typeof error.cause.status === "number") {
			setResponseStatus(event, error.cause.status);
		}
		return send(event, JSON.stringify(error.cause), "application/json");
	}
	// console.log(error);
});
