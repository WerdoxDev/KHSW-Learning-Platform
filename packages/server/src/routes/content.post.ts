import type { APIContent, APIPostContentResult } from "@khsw-learning-platform/shared";
import { z } from "zod";
import { prisma } from "~~/prisma/database";
import { idFix, selectDefaultContent } from "~~/prisma/utils";

const schema = z.object({ name: z.string(), chapterId: z.string(), type: z.number() });

export default defineEventHandler(async (event) => {
	const { payload } = await useVerifiedJwt();
	const body = await useValidatedBody(schema);

	const content: APIPostContentResult = idFix(
		await prisma.content.createContent(body.name, body.type, body.chapterId, { select: selectDefaultContent }),
	);

	setResponseStatus(event, HttpCode.CREATED);
	return content;
});
