export const ErrorTypes = {
	invalid_body: "Invalid body",
	invalid_credentials: "Invalid credentials",
	username_exists: "Username exists",
	email_exists: "Email exists",
	invalid_email: "Email is invalid",
   unauthorized: "Unauthorized"
};

export type ErrorKeys = keyof typeof ErrorTypes | (string & {});

export type ErrorObject = { code: ErrorKeys; message?: string; field?: string, status?: number };
