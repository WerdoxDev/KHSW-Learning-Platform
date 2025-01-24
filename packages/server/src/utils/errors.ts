import { ErrorTypes, type ErrorObject } from "@khsw-learning-platform/shared";
import type { H3Event } from "h3";

export function createCustomError(code: keyof typeof ErrorTypes | (string & {}), message?: string, field?: string, status = 400) {
	const event = useEvent();
	// event.context.overrideStatus = status;
	setResponseStatus(event, status);
	return { code: code, message: message ?? ErrorTypes[code as keyof typeof ErrorTypes], field, status };
}

export function invalidBody(): ErrorObject {
	const event = useEvent();
	setResponseStatus(event, 400);
	return { code: "invalid_body", message: "Body is invalid", status: 400 };
}

export function unauthorized(): ErrorObject {
   const event = useEvent();
   setResponseStatus(event, 401);
   return {code: "unauthorized", message:"Unauthorized", status: 401};
}
