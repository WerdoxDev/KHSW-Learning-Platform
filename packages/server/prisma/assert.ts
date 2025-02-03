import type { Snowflake } from "@khsw-learning-platform/shared";
import { Prisma } from "@prisma/client";
import { prisma } from "./database";
import { DBErrorType, assertCondition, assertId } from "./error";

export const assertExtension = Prisma.defineExtension({
	model: {
		user: {
			async assertUsersExist(methodName: string, userIds: Snowflake[]) {
				assertId(methodName, ...userIds);
				const foundCount = await prisma.user.count({ where: { id: { in: userIds.map((x) => BigInt(x)) } } });
				assertCondition(methodName, foundCount !== userIds.length, DBErrorType.NULL_USER, userIds.join(","));
			},
		},
		course: {
			async assertCourseExists(methodName: string, courseIds: Snowflake[]) {
				assertId(methodName, ...courseIds);
				const foundCount = await prisma.course.count({ where: { id: { in: courseIds.map((x) => BigInt(x)) } } });
				assertCondition(methodName, foundCount !== courseIds.length, DBErrorType.NULL_COURSE, courseIds.join(","));
			},
		},
		chapter: {
			async assertChapterExists(methodName: string, chapterIds: Snowflake[]) {
				assertId(methodName, ...chapterIds);
				const foundCount = await prisma.chapter.count({ where: { id: { in: chapterIds.map((x) => BigInt(x)) } } });
				assertCondition(methodName, foundCount !== chapterIds.length, DBErrorType.NULL_CHAPTER, chapterIds.join(","));
			},
		},
	},
});
