import { ContentType, WorkerID, snowflake } from "@khsw-learning-platform/shared";
import { prisma } from "../../prisma/database";

const teacher = await prisma.user.create({
	data: { id: snowflake.generate(WorkerID.AUTH), email: "lehrer@gmail.com", permissions: 3, username: "lehrer", password: "lehrer" },
});

const course = await prisma.course.createCourse("Test Kurse", "Das ist eine Kurse", teacher.id.toString(), "", ["Programmierung"]);

const chapter1 = await prisma.chapter.createChapter("Chapter 1", 0, course.id.toString());
const content1Chapter1 = await prisma.content.createContent("Content 1", ContentType.TEXT, chapter1.id.toString());
const content2Chapter1 = await prisma.content.createContent("Content 2", ContentType.VIDEO, chapter1.id.toString());
const content3Chapter1 = await prisma.content.createContent("Content 3", ContentType.TEXT, chapter1.id.toString());

const chapter2 = await prisma.chapter.createChapter("Chapter 2", 1, course.id.toString());
const content1Chapter2 = await prisma.content.createContent("Content 1", ContentType.VIDEO, chapter2.id.toString());
const content2Chapter2 = await prisma.content.createContent("Content 2", ContentType.TEXT, chapter2.id.toString());
const content3Chapter2 = await prisma.content.createContent("Content 3", ContentType.VIDEO, chapter2.id.toString());

const chapter3 = await prisma.chapter.createChapter("Chapter 3", 2, course.id.toString());
const content1Chapter3 = await prisma.content.createContent("Content 1", ContentType.TEXT, chapter3.id.toString());
const content2Chapter3 = await prisma.content.createContent("Content 2", ContentType.VIDEO, chapter3.id.toString());
const content3Chapter3 = await prisma.content.createContent("Content 3", ContentType.TEXT, chapter3.id.toString());
