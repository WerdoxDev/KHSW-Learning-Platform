import { useApiInitializer } from "@/hooks/useApiInitializer";
import { SplashScreen, useRouter } from "expo-router";
import { useEffect } from "react";
import { Text, View } from "react-native";

export default function Index() {
	const router = useRouter();
	const { initializeWithToken } = useApiInitializer();

	useEffect(() => {
		async function initialize() {
			const result = await initializeWithToken();
			if (result) {
				router.navigate("/(tabs)");
			} else {
				router.navigate("/login");
			}

			await SplashScreen.hideAsync();
		}

		initialize();
	}, []);

	return null;
}
