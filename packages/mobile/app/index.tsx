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
				router.navigate("/home");
			} else {
				router.navigate("/login");
			}

			await SplashScreen.hideAsync();
		}

		if (!Array.prototype.toSorted) {
			Array.prototype.toSorted = function (compareFn) {
				return [...this].sort(compareFn);
			};
		}

		initialize();
	}, []);

	return null;
}
