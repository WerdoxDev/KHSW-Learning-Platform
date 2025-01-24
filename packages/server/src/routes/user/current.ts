import type { APIGetCurrentUserResult } from "@khsw-learning-platform/shared";
import { prisma } from "~~/prisma/database";
import { idFix, selectPrivateUser } from "~~/prisma/utils";

export default defineEventHandler(async (event) => {
	const { payload } = await useVerifiedJwt();

	const user: APIGetCurrentUserResult = idFix(await prisma.user.getById(payload.id, { select: selectPrivateUser }));

	setResponseStatus(event, HttpCode.OK);
	return user;
});
