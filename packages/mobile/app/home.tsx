import { useApi } from "@/stores/apiStore";
import * as SecureStore from "expo-secure-store";
import { DevSettings, Pressable, Text, View } from "react-native";

export default function Home() {
	const api = useApi();

	async function reset() {
		await SecureStore.deleteItemAsync("accessToken");
		await SecureStore.deleteItemAsync("refreshToken");
		DevSettings.reload();
	}

	return (
		<View className="h-full items-center justify-center">
			<Text>HOME PAGE!</Text>
			<Pressable onPress={reset}>
				<Text>RESET</Text>
			</Pressable>

			<Text>Hallo {api.user?.username}</Text>
		</View>
	);
}
