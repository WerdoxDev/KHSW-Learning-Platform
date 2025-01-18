import { ThemedText } from "@/components/ThemedText";
import { authStyles } from "@/constants/auth-styles";
import { Link } from "expo-router";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Login() {
	return (
		<View style={{ backgroundColor: "#e5e7eb", justifyContent: "center", alignItems: "center" }}>
			<View style={{ justifyContent: "center", alignItems: "center", height: "100%", maxWidth: 300, width: "100%" }}>
				<View style={{ marginBottom: 48 }}>
					<ThemedText style={{ textAlign: "center", marginBottom: 12 }} type="loginTitle">
						Nochmals Hallo!
					</ThemedText>
					<ThemedText type="description" style={{ textAlign: "center" }}>
						Wir freuen uns, Sie auf der KHSW-Lernplattform wiederzusehen!
					</ThemedText>
				</View>
				<View style={{ width: "100%", rowGap: 20, marginBottom: 50 }}>
					<TextInput placeholder="E-Mail Adresse / Benutzername" style={authStyles.input} />
					<TextInput placeholder="Passwort" style={authStyles.input} />
				</View>
				<TouchableOpacity style={authStyles.button} activeOpacity={0.75}>
					<Text style={{ color: "white", textAlign: "center" }}>Anmelden</Text>
				</TouchableOpacity>
				<View style={{ marginTop: 25, flexDirection: "row" }}>
					<Text>Sie sind noch kein Mitglied?</Text>
					<Link style={{ color: "#2563eb" }} href="/(tabs)/register">
						{" "}
						Jetzt registrieren!
					</Link>
				</View>
			</View>
		</View>
	);
}
