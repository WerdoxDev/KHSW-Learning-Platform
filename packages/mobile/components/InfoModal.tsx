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
	};

	const bodyErrorMap: Record<ErrorKeys, string> = {
		invalid_body: "Please fill all the required fields",
		invalid_credentials: "Die eingegebenen Anmeldeinformationen sind nicht gültig",
		username_exists: "der eingegebene Benutzername existiert schon",
		email_exists: "die eingegebene E-Mail Adresse existiert schon",
		invalid_email: "die eingegebene E-Mail Adresse ist ungültig",
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
