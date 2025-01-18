import { ThemedText } from "@/components/ThemedText";
import { authStyles } from "@/constants/auth-styles";
import { Link } from "expo-router";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Register() {
	return (
		<View style={{ backgroundColor: "#e5e7eb", justifyContent: "center", alignItems: "center" }}>
			<View style={{ justifyContent: "center", alignItems: "center", height: "100%", maxWidth: 300, width: "100%" }}>
				<View style={{ marginBottom: 48 }}>
					<ThemedText style={{ textAlign: "center", marginBottom: 12 }} type="loginTitle">
						Hallo!
					</ThemedText>
					<ThemedText type="description" style={{ textAlign: "center" }}>
						Willkomen auf der KHSW-Lernplattform!
					</ThemedText>
				</View>
				<View style={{ width: "100%", rowGap: 20, marginBottom: 50 }}>
					<TextInput placeholder="Benutzername" style={authStyles.input} />
					<TextInput placeholder="E-Mail Adresse" style={authStyles.input} />
					<TextInput placeholder="Passwort" style={authStyles.input} />
				</View>
				<TouchableOpacity style={authStyles.button} activeOpacity={0.75}>
					<Text style={{ color: "white", textAlign: "center" }}>Anmelden</Text>
				</TouchableOpacity>
				<View style={{ marginTop: 25, flexDirection: "row" }}>
					<Text>Sie sind schon Mitglied?</Text>
					<Link style={{ color: "#2563eb" }} href="/(tabs)/login">
						{" "}
						Jetzt anmelden!
					</Link>
				</View>
			</View>
		</View>
	);
}
