import type { APIPostCourseResult } from "@khsw-learning-platform/shared";
import { z } from "zod";
import { permissions } from "~/utils/permission";
import { HttpCode, useCheckPermission } from "~/utils/route-utils";
import { prisma } from "~~/prisma/database";
import { idFix, selectDefaultCourse } from "~~/prisma/utils";

const schema = z.object({
	name: z.string().nonempty(),
	imageUrl: z.string(),
	description: z.string(),
	skills: z.array(z.string()),
	chapters: z.array(
		z.object({ name: z.string(), order: z.number(), contents: z.array(z.object({ name: z.string(), chapterId: z.string(), type: z.number() })) }),
	),
});

export default defineEventHandler(async (event) => {
	const { payload } = await useVerifiedJwt();
	useCheckPermission(payload, permissions.CREATE_COURSE);

	const body = await useValidatedBody(schema);

	if (await prisma.course.exists({ name: body.name })) {
		return createCustomError("course_name_exists");
	}

	const course: APIPostCourseResult = idFix(
		await prisma.course.createCourse(body.name, body.description, payload.id, body.imageUrl, body.skills, body.chapters, {
			select: selectDefaultCourse,
		}),
	);

	setResponseStatus(event, HttpCode.CREATED);
	return course;
});
