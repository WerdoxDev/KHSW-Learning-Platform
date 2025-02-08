import { useModals } from "@/stores/modalsStore";
import type { ErrorKeys } from "@khsw-learning-platform/shared";
import Monicon from "@monicon/native";
import { Text } from "react-native";
import BaseModal from "./BaseModal";

export default function InfoModal() {
	const modal = useModals().info;

	const titleErrorMap: Record<ErrorKeys, string> = {
		invalid_credentials: "Ungültige Anmeldedaten",
		invalid_body: "",
		too_small: "Feld ist zu kurz",
		username_exists: "Benutzername existiert schon",
		email_exists: "E-Mail Adresse existiert schon",
		invalid_email: "Ungültige E-Mail Adresse",
		unauthorized: "Nicht autorisiert",
		course_name_exists: "Der Kursname existiert schon",
	};

	const bodyErrorMap: Record<ErrorKeys, string> = {
		invalid_body: "",
		invalid_credentials: "Die eingegebenen Anmeldeinformationen sind nicht gültig",
		username_exists: "Der eingegebene Benutzername existiert schon",
		email_exists: "Die eingegebene E-Mail Adresse existiert schon",
		invalid_email: "Die eingegebene E-Mail Adresse ist ungültig",
		course_name_exists: "Der eingegebene Kursname existiert schon",
		unauthorized: "Sie sind nicht autorisiert, diese Aktion auszuführen",
	};

	function getBodyFieldError() {
		if (modal.title === "too_small") {
			if (modal.body === "username") {
				return "Der Benutzername muss zwischen 4 und 20 Zeichen lang sein.";
			}
			if (modal.body === "password") {
				return "Das Passwort muss mindestens 4 Zeichen lang sein.";
			}
		}

		return;
	}

	return (
		<BaseModal modalKey="info" className="items-center">
			<Monicon name="mingcute:alert-fill" color="#f43f5e" size={64} />
			<Text className="font-bold text-2xl">{titleErrorMap[modal.title as ErrorKeys]}</Text>
			<Text className="mt-4 text-center text-lg">{getBodyFieldError() ?? bodyErrorMap[modal.title as ErrorKeys]}</Text>
		</BaseModal>
	);
}
