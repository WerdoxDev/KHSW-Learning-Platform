import { constants, type APIPostRegisterResult } from "@khsw-learning-platform/shared";
import { z } from "zod";
import { createCustomError } from "~/utils/errors";
import { prisma } from "~~/prisma/database";
import { idFix } from "~~/prisma/utils";

const schema = z.object({
	username: z
		.string({ required_error: "Username is required" })
		.min(4, "Username must be atleast 4 characters")
		.max(20, "Username must be atmost 20 characters"),
	email: z.string({ required_error: "Email is required" }),
	password: z.string({ required_error: "Password is required" }).min(4, "Password must be atleast 4 characters"),
});

export default defineEventHandler(async (event) => {
	const body = await useValidatedBody(schema);

	if (await prisma.user.exists({ username: body.username })) {
		return createCustomError("username_exists");
	}

	if (!body.email.match(constants.EMAIL_REGEX)) {
		return createCustomError("invalid_email");
	}

	if (await prisma.user.exists({ email: body.email })) {
		return createCustomError("email_exists");
	}

	const user = idFix(await prisma.user.createUser(body.username, body.email, body.password));

	const [accessToken, refreshToken] = await createTokens({ id: user.id });

	const json: APIPostRegisterResult = { ...user, accessToken, refreshToken };
	setResponseStatus(event, 201);
	return json;
});
