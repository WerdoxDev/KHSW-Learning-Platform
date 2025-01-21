import { z } from "zod";
import { createCustomError } from "~/utils/errors";
import { prisma } from "~~/prisma/database";
import { DBErrorType, assertError } from "~~/prisma/error";

const schema = z.object({
	username: z.optional(z.string()),
	email: z.optional(z.string()),
	password: z.string(),
});

export default defineEventHandler(async (event) => {
	const body = await useValidatedBody(schema);

	const [error, data] = await catchError(() => prisma.user.findByCredentials(body));

	if (assertError(error, DBErrorType.NULL_USER)) {
		return createCustomError("invalid_credentials");
	}
});
