import { type ContentType, type Snowflake, WorkerID, snowflake } from "@khsw-learning-platform/shared";
import { Prisma } from "@prisma/client";
import { prisma } from "./database";
import { DBErrorType, assertExists, assertObj } from "./error";

export const contentExtension = Prisma.defineExtension({
	model: {
		content: {
			async createContent<Args extends Prisma.ContentDefaultArgs>(name: string, type: ContentType, args?: Args) {
				const content = await prisma.content.create({
					data: { id: snowflake.generate(WorkerID.CONTENT), name: name, type: type },
				});

				assertObj("createContent", content, DBErrorType.NULL_CONTENT);
				return content as Prisma.ContentGetPayload<Args>;
			},
		},
	},
});
