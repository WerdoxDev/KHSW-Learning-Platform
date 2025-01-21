import type { APIPostLoginBody } from "@khsw-learning-platform/shared";
import { Prisma } from "@prisma/client";
import { prisma } from "./database";
import { DBErrorType, assertObj } from "./error";
import { selectPrivateUser } from "./utils";

export const userExtension = Prisma.defineExtension({
	model: {
		user: {
			async findByCredentials(credentials: APIPostLoginBody) {
				const user = await prisma.user.findFirst({
					where: {
						AND: [
							{ password: credentials.password },
							{
								OR: [{ email: credentials.email }, { username: credentials.username?.toLowerCase() }],
							},
						],
					},
					select: selectPrivateUser,
				});

				assertObj("findByCredentials", user, DBErrorType.NULL_USER);
				return user as NonNullable<typeof user>;
			},
		},
	},
});
