import type { APIGetUserCoursesResult } from "@khsw-learning-platform/shared";
import { prisma } from "~~/prisma/database";
import { idFix, selectDefaultCourse } from "~~/prisma/utils";

export default defineEventHandler(async (event) => {
	const { payload } = await useVerifiedJwt();

	const courses: APIGetUserCoursesResult = idFix(await prisma.course.getUserCourses(payload.id, { select: selectDefaultCourse }));

	setResponseStatus(event, HttpCode.OK);
	return courses;
});
