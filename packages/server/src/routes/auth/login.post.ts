import type { APIPostLoginResult } from "@khsw-learning-platform/shared";
import { z } from "zod";
import { createCustomError } from "~/utils/errors";
import { prisma } from "~~/prisma/database";
import { DBErrorType, assertError } from "~~/prisma/error";
import { idFix } from "~~/prisma/utils";

const schema = z.object({
	username: z.optional(z.string()),
	email: z.optional(z.string()),
	password: z.string({ required_error: "Password is required" }),
});

export default defineEventHandler(async (event) => {
	const body = await useValidatedBody(schema);

	const [error, user] = await catchError(async () => idFix(await prisma.user.findByCredentials(body)));

	if (assertError(error, DBErrorType.NULL_USER)) {
		return createCustomError("invalid_credentials");
	}
	if (error) throw error;

	const [accessToken, refreshToken] = await createTokens({ id: user.id });

	const json: APIPostLoginResult = { ...user, accessToken: accessToken, refreshToken: refreshToken };
	setResponseStatus(event, HttpCode.OK);
	return json;
});
