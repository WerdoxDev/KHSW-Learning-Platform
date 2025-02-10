import { ContentType, WorkerID, snowflake } from "@khsw-learning-platform/shared";
import { prisma } from "../../prisma/database";

const teacher = await prisma.user.create({
	data: { id: snowflake.generate(WorkerID.AUTH), email: "lehrer@gmail.com", permissions: 3, username: "Lehrer", password: "lehrer" },
});

const course = await prisma.course.createCourse(
	"Digitale Überlebenskunst: Der moderne Tech-Guide",
	"In der heutigen digitalen Welt ist es wichtig, sich sicher und effizient im Internet zu bewegen. Dieser Kurs hilft dir, ein sicherer, kluger und produktiver Nutzer von moderner Technik zu werden. Du lernst, wie du dich vor Gefahren schützt, KI sinnvoll nutzt und deine Online-Daten sicher hältst. Der Kurs ist perfekt für Anfänger und fortgeschrittene Nutzer, die ihre digitalen Fähigkeiten verbessern möchten.",
	teacher.id.toString(),
	"",
	["Cybersicherheit", "Kommunikation", "Produktivität", "Datenschutz", "Verantwortung"],
);

const chapter1 = await prisma.chapter.createChapter("Willkommen in der digitalen Welt", 0, course.id.toString());
const content1Chapter1 = await prisma.content.createContent("Einführung", ContentType.TEXT, chapter1.id.toString());
const content2Chapter1 = await prisma.content.createContent("Die digitale Welt verstehen", ContentType.VIDEO, chapter1.id.toString());

const chapter2 = await prisma.chapter.createChapter("Cybersicherheit für alle", 1, course.id.toString());
const content1Chapter2 = await prisma.content.createContent("Häufige Gefahren im Internet", ContentType.TEXT, chapter2.id.toString());
const content2Chapter2 = await prisma.content.createContent("Wie Hacker dich austricksen", ContentType.VIDEO, chapter2.id.toString());
const content3Chapter2 = await prisma.content.createContent("Sichere Passwörter erstellen", ContentType.TEXT, chapter2.id.toString());

const chapter3 = await prisma.chapter.createChapter("Schutz der eigenen Daten", 2, course.id.toString());
const content1Chapter3 = await prisma.content.createContent("Wer sammelt deine Daten", ContentType.VIDEO, chapter3.id.toString());
const content2Chapter3 = await prisma.content.createContent("Privatsphäre-Einstellungen", ContentType.TEXT, chapter3.id.toString());
const content3Chapter3 = await prisma.content.createContent("VPN & Anonymität", ContentType.VIDEO, chapter3.id.toString());

const chapter4 = await prisma.chapter.createChapter("Online-Betrug erkennen & vermeiden", 3, course.id.toString());
const content1Chapter4 = await prisma.content.createContent("Gefälschte Webseiten erkennen", ContentType.VIDEO, chapter4.id.toString());
const content2Chapter4 = await prisma.content.createContent("Betrügerische E-Mails erkennen", ContentType.TEXT, chapter4.id.toString());
const content3Chapter4 = await prisma.content.createContent("Sicher online einkaufen", ContentType.VIDEO, chapter4.id.toString());

const chapter5 = await prisma.chapter.createChapter("Mehr Produktivität mit digitalen Tools", 4, course.id.toString());
const content1Chapter5 = await prisma.content.createContent("Nützliche Apps & Programme ", ContentType.TEXT, chapter5.id.toString());
const content2Chapter5 = await prisma.content.createContent("Weniger Ablenkung online", ContentType.VIDEO, chapter5.id.toString());
const content3Chapter5 = await prisma.content.createContent("Automatisierung nutzen", ContentType.TEXT, chapter5.id.toString());

const chapter6 = await prisma.chapter.createChapter("Abschluss", 5, course.id.toString());
const content1Chapter6 = await prisma.content.createContent("Dein digitaler Sicherheits-Check", ContentType.VIDEO, chapter6.id.toString());
const content2Chapter6 = await prisma.content.createContent("Fazit & nächste Schritte", ContentType.TEXT, chapter6.id.toString());
