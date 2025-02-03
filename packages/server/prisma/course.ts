import { type Snowflake, WorkerID, snowflake } from "@khsw-learning-platform/shared";
import { Prisma } from "@prisma/client";
import { prisma } from "./database";
import { DBErrorType, assertObj } from "./error";

export const courseExtension = Prisma.defineExtension({
	model: {
		course: {
			async createCourse<Args extends Prisma.CourseDefaultArgs>(
				name: string,
				description: string,
				authorId: Snowflake,
				imageUrl: string,
				skills: string[],
				args?: Args,
			) {
				const skillsConnect = skills.map((x) => ({ create: { id: snowflake.generate(WorkerID.SKILL), name: x }, where: { name: x } }));
				const course = await prisma.course.create({
					data: {
						id: snowflake.generate(WorkerID.COURSE),
						name: name,
						description: description,
						authorId: BigInt(authorId),
						imageUrl: imageUrl,
						skills: { connectOrCreate: skillsConnect },
					},
					...args,
				});

				assertObj("createCourse", course, DBErrorType.NULL_COURSE);
				return course as Prisma.CourseGetPayload<Args>;
			},
			async getAll<Args extends Prisma.CourseDefaultArgs>(args?: Args) {
				const courses = await prisma.course.findMany({ ...args });

				assertObj("getAll", courses, DBErrorType.NULL_COURSE);
				return courses as Prisma.CourseGetPayload<Args>[];
			},
		},
	},
});
