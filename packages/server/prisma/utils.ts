import { Prisma } from "@prisma/client";

export const selectPrivateUser = Prisma.validator<Prisma.UserSelect>()({
	id: true,
	username: true,
	email: true,
	password: true,
	permissions: true,
});

export const selectPublicUser = Prisma.validator<Prisma.UserSelect>()({
	id: true,
	username: true,
});

export const selectDefaultChapter = Prisma.validator<Prisma.ChapterSelect>()({
	id: true,
	name: true,
	order: true,
	contents: { select: { id: true, name: true, type: true } },
});

export const selectDefaultContent = Prisma.validator<Prisma.ContentSelect>()({
	id: true,
	name: true,
	type: true,
});

export const selectDefaultCourse = Prisma.validator<Prisma.CourseSelect>()({
	id: true,
	name: true,
	author: { select: selectPublicUser },
	authorId: false,
	imageUrl: true,
	description: true,
	chapters: { select: { id: true, order: true, name: true, contents: { select: { id: true, name: true, type: true } } } },
	skills: { select: { name: true } },
});

type BigIntToString<T> = T extends bigint
	? string
	: T extends Date
		? Date
		: T extends (infer U)[]
			? BigIntToString<U>[]
			: T extends object
				? { [K in keyof T]: BigIntToString<T[K]> }
				: T;

export function idFix<T>(obj: T): BigIntToString<T> {
	if (Array.isArray(obj)) {
		return obj.map((item) => idFix(item)) as BigIntToString<T>;
	}
	if (obj instanceof Date) {
		return obj as unknown as BigIntToString<T>; // Do not convert Date objects
	}
	if (typeof obj === "object" && obj !== null) {
		const newObj: Record<string, unknown> = {};
		for (const key in obj) {
			if (typeof obj[key] === "bigint") {
				newObj[key] = (obj[key] as unknown as string).toString();
			} else if (typeof obj[key] === "object") {
				newObj[key] = idFix(obj[key]);
			} else {
				newObj[key] = obj[key];
			}
		}
		return newObj as BigIntToString<T>;
	}
	return obj as BigIntToString<T>;
}
