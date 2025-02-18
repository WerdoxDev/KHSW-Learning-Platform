import { z } from "zod";
import { prisma } from "~~/prisma/database";

const paramsSchema = z.object({ courseId: z.string() });

export default defineEventHandler(async (event) => {
	const { payload } = await useVerifiedJwt();
	const { courseId } = await useValidatedParams(paramsSchema);

	await prisma.course.deleteById(courseId);

	return sendNoContent(event, HttpCode.OK);
});
