import { type Snowflake, WorkerID, snowflake } from "@khsw-learning-platform/shared";
import { Prisma } from "@prisma/client";
import { prisma } from "./database";
import { DBErrorType, assertExists, assertObj } from "./error";

export const chapterExtension = Prisma.defineExtension({
	model: {
		chapter: {
			async createChapter<Args extends Prisma.ChapterDefaultArgs>(name: string, order: number, contentIds: Snowflake[], args?: Args) {
				const chapter = await prisma.chapter.create({
					data: {
						id: snowflake.generate(WorkerID.CHAPTER),
						name: name,
						order: order,
						contents: { connect: contentIds.map((x) => ({ id: BigInt(x) })) },
					},
				});

				assertObj("createChapter", chapter, DBErrorType.NULL_CHAPTER);
				return chapter as Prisma.ChapterGetPayload<Args>;
			},
		},
	},
});
