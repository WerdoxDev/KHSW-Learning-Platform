import type { APIGetCoursesResult } from "@khsw-learning-platform/shared";
import { prisma } from "~~/prisma/database";
import { idFix, selectDefaultCourse } from "~~/prisma/utils";

export default defineEventHandler(async (event) => {
	const { payload } = await useVerifiedJwt();

	const courses: APIGetCoursesResult = idFix(await prisma.course.getAll({ select: selectDefaultCourse }));
	setResponseStatus(event, HttpCode.OK);
	return courses;
});
