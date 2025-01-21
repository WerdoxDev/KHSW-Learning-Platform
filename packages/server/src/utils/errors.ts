import { ErrorTypes } from "@khsw-learning-platform/shared";
import type { H3Event } from "h3";

export function createCustomError(code: keyof typeof ErrorTypes | (string & {}), message?: string, field?: string, status = 400) {
	const event = useEvent();
	// event.context.overrideStatus = status;
	setResponseStatus(event, status);
	return { code: code, message: message ?? ErrorTypes[code as keyof typeof ErrorTypes], field, status };
}

export function invalidBody() {
	const event = useEvent();
	setResponseStatus(event, 400);
	return { code: 0, message: "Body is invalid" };
}
