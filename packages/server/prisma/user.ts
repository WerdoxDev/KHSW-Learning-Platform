import type { APIPostLoginBody, Snowflake } from "@khsw-learning-platform/shared";
import { Prisma } from "@prisma/client";
import { prisma } from "./database";
import { DBErrorType, assertId, assertObj } from "./error";
import { selectPrivateUser } from "./utils";

export const userExtension = Prisma.defineExtension({
	model: {
		user: {
         async getById<Args extends Prisma.UserDefaultArgs>(id: Snowflake, args?: Args) {
				assertId("getById", id);
				const user = await prisma.user.findUnique({ where: { id: BigInt(id) }, ...args });

				assertObj("getById", user, DBErrorType.NULL_USER, id);
				return user as Prisma.UserGetPayload<Args>;
			},
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
