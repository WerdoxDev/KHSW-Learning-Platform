import type { APIPostRefreshTokenResult } from "@khsw-learning-platform/shared";
import { z } from "zod";
import { unauthorized } from "~/utils/errors";
import { prisma } from "~~/prisma/database";
import { idFix } from "~~/prisma/utils";

const schema = z.object({ refreshToken: z.string() });

export default defineEventHandler(async (event) => {
	const body = await useValidatedBody(schema);

	const { valid, payload } = await verifyToken(body.refreshToken, REFRESH_TOKEN_SECRET_ENCODED);

	if (!valid || !payload) {
		throw unauthorized();
	}

	const user = idFix(await prisma.user.getById(payload.id, { select: { id: true, permissions: true } }));

	const [accessToken, refreshToken] = await createTokens({ id: user.id, permissions: user.permissions });

	const json: APIPostRefreshTokenResult = { accessToken, refreshToken };
	setResponseStatus(event, HttpCode.OK);
	return json;
});
