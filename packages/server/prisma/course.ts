import { type APIChapter, type APIPostChapterBody, type Snowflake, WorkerID, snowflake } from "@khsw-learning-platform/shared";
import { type Chapter, type Content, Prisma } from "@prisma/client";
import { prisma } from "./database";
import { DBErrorType, assertExists, assertObj } from "./error";

export const courseExtension = Prisma.defineExtension({
	model: {
		course: {
			async createCourse<Args extends Prisma.CourseDefaultArgs>(
				name: string,
				description: string,
				authorId: Snowflake,
				imageUrl: string,
				skills: string[],
				chapters: APIPostChapterBody[],
				args?: Args,
			) {
				const createdChapters: Chapter[] = [];
				for (const chapter of chapters) {
					const createdContents: Content[] = [];
					for (const content of chapter.contents) {
						createdContents.push(await prisma.content.createContent(content.name, content.type));
					}

					createdChapters.push(
						await prisma.chapter.createChapter(
							chapter.name,
							chapter.order,
							createdContents.flatMap((x) => x.id.toString()),
						),
					);
				}

				const skillsConnect = skills.map((x) => ({ create: { id: snowflake.generate(WorkerID.SKILL), name: x }, where: { name: x } }));
				const course = await prisma.course.create({
					data: {
						id: snowflake.generate(WorkerID.COURSE),
						name: name,
						description: description,
						authorId: BigInt(authorId),
						imageUrl: imageUrl,
						chapters: { connect: createdChapters.map((x) => ({ id: x.id })) },
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
			async getUserCourses<Args extends Prisma.CourseDefaultArgs>(userId: Snowflake, args?: Args) {
				const courses = await prisma.course.findMany({ where: { students: { some: { id: BigInt(userId) } } }, ...args });

				assertObj("getUserCourses", courses, DBErrorType.NULL_COURSE);
				return courses as Prisma.CourseGetPayload<Args>[];
			},
			async deleteById(courseId: Snowflake) {
				try {
					const course = await prisma.course.delete({ where: { id: BigInt(courseId) } });
					assertObj("deleteById", course, DBErrorType.NULL_COURSE);
					return course;
				} catch (e) {
					await assertExists(e, "deleteById", DBErrorType.NULL_COURSE, [courseId]);
				}
			},
			async enrollStudent(courseId: Snowflake, studentId: Snowflake) {
				try {
					const course = await prisma.course.update({
						where: { id: BigInt(courseId) },
						data: { students: { connect: { id: BigInt(studentId) } } },
					});

					assertObj("enrollStudent", course, DBErrorType.NULL_COURSE);
					return course;
				} catch (e) {
					await assertExists(e, "enrollStudent", DBErrorType.NULL_COURSE, [courseId]);
				}
			},
			async disenrollStudent(courseId: Snowflake, studentId: Snowflake) {
				try {
					const course = await prisma.course.update({
						where: { id: BigInt(courseId) },
						data: { students: { disconnect: { id: BigInt(studentId) } } },
					});

					assertObj("disenrollStudent", course, DBErrorType.NULL_COURSE);
					return course;
				} catch (e) {
					await assertExists(e, "disenrollStudent", DBErrorType.NULL_COURSE, [courseId]);
				}
			},
		},
	},
});
