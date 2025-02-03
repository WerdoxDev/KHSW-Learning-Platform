import { Prisma, PrismaClient } from "@prisma/client";
import { assertExtension } from "./assert";
import { chapterExtension } from "./chapter";
import { contentExtension } from "./content";
import { courseExtension } from "./course";
import { userExtension } from "./user";

export const prisma = new PrismaClient()
	.$extends({
		model: {
			$allModels: {
				async exists<T>(this: T, where: Prisma.Args<T, "findFirst">["where"]) {
					const context = Prisma.getExtensionContext(this);

					// biome-ignore lint/suspicious/noExplicitAny: <explanation>
					const result = await (context as any).count({ where });
					return result !== 0;
				},
			},
		},
	})
	.$extends(assertExtension)
	.$extends(userExtension)
	.$extends(courseExtension)
	.$extends(chapterExtension)
	.$extends(contentExtension);
