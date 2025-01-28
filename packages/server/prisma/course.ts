import { type Snowflake, WorkerID, snowflake } from "@khsw-learning-platform/shared";
import { Prisma } from "@prisma/client";
import { prisma } from "./database";

export const courseExtension = Prisma.defineExtension({
	model: {
		course: {
			async createCourse<Args extends Prisma.CourseDefaultArgs>(name: string, authorId: Snowflake, imageUrl: string, args?: Args) {
				const course = await prisma.course.create({
					data: { id: snowflake.generate(WorkerID.COURSE), name: name, authorId: BigInt(authorId), imageUrl: imageUrl },
					...args,
				});

				return course as Prisma.CourseGetPayload<Args>;
			},
			async getAll<Args extends Prisma.CourseDefaultArgs>(args?: Args) {
				const courses = await prisma.course.findMany({ ...args });

				return courses as Prisma.CourseGetPayload<Args>[];
			},
		},
	},
});
