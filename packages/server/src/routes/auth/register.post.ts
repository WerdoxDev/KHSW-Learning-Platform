import { constants, WorkerID, snowflake } from "@khsw-learning-platform/shared";
import { z } from "zod";
import { createCustomError } from "~/utils/errors";
import { prisma } from "~~/prisma/database";

const schema = z.object({
	username: z
		.string({ required_error: "Username is required" })
		.min(4, { message: "Username must be atleast 4 characters" })
		.max(20, { message: "Username must be atmost 20 characters" }),
	email: z.string({ required_error: "Email is required" }).nonempty({ message: "Email is required" }),
	password: z.string({ required_error: "Password is required" }).min(1),
});

export default defineEventHandler(async (event) => {
	setResponseStatus(event, 400);
	const body = await useValidatedBody(schema);
	body.username = body.username.toLowerCase();

	if (await prisma.user.exists({ username: body.username })) {
		return createCustomError("username_exists");
	}

	if (!body.email.match(constants.EMAIL_REGEX)) {
		return createCustomError("invalid_email");
	}

	if (await prisma.user.exists({ email: body.email })) {
		return createCustomError("email_exists");
	}

	await prisma.user.create({ data: { id: snowflake.generate(WorkerID.AUTH), email: body.email, username: body.username, password: body.password } });
});
