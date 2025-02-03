import type { APIPostChapterResult } from "@khsw-learning-platform/shared";
import { z } from "zod";
import { prisma } from "~~/prisma/database";
import { idFix, selectDefaultChapter } from "~~/prisma/utils";

const schema = z.object({ name: z.string(), order: z.number(), courseId: z.string() });

export default defineEventHandler(async (event) => {
	const { payload } = await useVerifiedJwt();
	const body = await useValidatedBody(schema);

	const chapter: APIPostChapterResult = idFix(
		await prisma.chapter.createChapter(body.name, body.order, body.courseId, { select: selectDefaultChapter }),
	);

	setResponseStatus(event, HttpCode.CREATED);
	return chapter;
});
