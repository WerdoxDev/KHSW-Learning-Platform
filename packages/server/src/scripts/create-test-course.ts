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
	[
		{
			name: "Willkommen in der digitalen Welt",
			order: 0,
			contents: [
				{
					name: "Einführung",
					type: ContentType.TEXT,
				},
				{
					name: "Die digitale Welt verstehen",
					type: ContentType.VIDEO,
				},
			],
		},
		{
			name: "Cybersicherheit für alle",
			order: 1,
			contents: [
				{
					name: "Häufige Gefahren im Internet",
					type: ContentType.TEXT,
				},
				{
					name: "Wie Hacker dich austricksen",
					type: ContentType.VIDEO,
				},
				{
					name: "Sichere Passwörter erstellen",
					type: ContentType.TEXT,
				},
			],
		},
		{
			name: "Schutz der eigenen Daten",
			order: 2,
			contents: [
				{
					name: "Wer sammelt deine Daten",
					type: ContentType.VIDEO,
				},
				{
					name: "Privatsphäre-Einstellungen",
					type: ContentType.TEXT,
				},
				{
					name: "VPN & Anonymität",
					type: ContentType.VIDEO,
				},
			],
		},
		{
			name: "Online-Betrug erkennen & vermeiden",
			order: 3,
			contents: [
				{
					name: "Gefälschte Webseiten erkennen",
					type: ContentType.VIDEO,
				},
				{
					name: "Betrügerische E-Mails erkennen",
					type: ContentType.TEXT,
				},
				{
					name: "Sicher online einkaufen",
					type: ContentType.VIDEO,
				},
			],
		},
		{
			name: "Mehr Produktivität mit digitalen Tools",
			order: 4,
			contents: [
				{
					name: "Nützliche Apps & Programme ",
					type: ContentType.TEXT,
				},
				{
					name: "Weniger Ablenkung online",
					type: ContentType.VIDEO,
				},
				{
					name: "Automatisierung nutzen",
					type: ContentType.TEXT,
				},
			],
		},
		{
			name: "Abschluss",
			order: 5,
			contents: [
				{
					name: "Dein digitaler Sicherheits-Check",
					type: ContentType.VIDEO,
				},
				{
					name: "Fazit & nächste Schritte",
					type: ContentType.TEXT,
				},
			],
		},
	],
);
