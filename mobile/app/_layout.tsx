import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import "../global.css";

import { useColorScheme } from "@/hooks/useColorScheme";
import { Appearance } from "react-native";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const colorScheme = useColorScheme();
	const [loaded] = useFonts({
		SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
	});

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
			Appearance.setColorScheme("light");
		}
	}, [loaded]);

	if (!loaded) {
		return null;
	}

	return (
		<ThemeProvider value={colorScheme === "light" ? DefaultTheme : DarkTheme}>
			<Stack>
				<Stack.Screen name="login" options={{ headerShown: false, animation: "slide_from_left" }} />
				<Stack.Screen name="register" options={{ headerShown: false, animation: "slide_from_right" }} />
				{/* <Stack.Screen name="+not-found" /> */}
			</Stack>
			<StatusBar style="auto" />
		</ThemeProvider>
	);
}
