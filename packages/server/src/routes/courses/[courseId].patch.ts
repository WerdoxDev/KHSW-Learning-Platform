import type { APIPatchCourseResult } from "@khsw-learning-platform/shared";
import { z } from "zod";
import { prisma } from "~~/prisma/database";
import { idFix, selectDefaultCourse } from "~~/prisma/utils";

const paramsSchema = z.object({ courseId: z.string() });
const schema = z.object({
	name: z.string().nonempty(),
	description: z.string(),
	chapters: z.array(z.object({ name: z.string(), order: z.number(), contents: z.array(z.object({ name: z.string(), type: z.number() })) })),
});

export default defineEventHandler(async (event) => {
	const { payload } = await useVerifiedJwt();
	const { courseId } = await useValidatedParams(paramsSchema);
	const body = await useValidatedBody(schema);

	console.log(body);

	const course: APIPatchCourseResult = idFix(
		await prisma.course.editById(courseId, body.name, body.description, body.chapters, { select: selectDefaultCourse }),
	);

	setResponseStatus(event, HttpCode.CREATED);
	return course;
});
