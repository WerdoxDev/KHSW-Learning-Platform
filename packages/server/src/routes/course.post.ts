import type { APIPostCourseResult } from "@khsw-learning-platform/shared";
import { z } from "zod";
import { permissions } from "~/utils/permission";
import { HttpCode, useCheckPermission } from "~/utils/route-utils";
import { prisma } from "~~/prisma/database";
import { idFix, selectDefaultCourse } from "~~/prisma/utils";

const schema = z.object({ name: z.string().nonempty(), imageUrl: z.string() });

export default defineEventHandler(async (event) => {
	const { payload } = await useVerifiedJwt();
	useCheckPermission(payload, permissions.CREATE_COURSE);

	const body = await useValidatedBody(schema);

	const course: APIPostCourseResult = idFix(await prisma.course.createCourse(body.name, payload.id, "", { select: selectDefaultCourse }));
	setResponseStatus(event, HttpCode.CREATED);
	return course;
});
