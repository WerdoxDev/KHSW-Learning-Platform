import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import "../global.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import InfoModal from "@/components/InfoModal";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useModals } from "@/stores/modalsStore";
import { Appearance, Platform } from "react-native";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

export default function RootLayout() {
	const colorScheme = useColorScheme();
	const [loaded] = useFonts({
		SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
	});

	useEffect(() => {
		if (loaded) {
			if (Platform.OS !== "web") Appearance.setColorScheme("light");
		}
	}, [loaded]);

	const modals = useModals();

	if (!loaded) {
		return null;
	}

	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider value={colorScheme === "light" ? DefaultTheme : DarkTheme}>
				<Stack screenOptions={{ headerShown: false }}>
					<Stack.Screen name="(auth)/login" options={{ headerShown: false, animation: "slide_from_left", presentation: "modal" }} />
					<Stack.Screen name="(auth)/register" options={{ headerShown: false, animation: "slide_from_right", presentation: "modal" }} />
					{/* <Stack.Screen name="home" options={{ headerShown: false, animation: "slide_from_bottom" }} /> */}
					<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
					{/* <Stack.Screen name="course-view" options={{ headerShown: false, animation: "fade_from_bottom" }} /> */}
					{/* <Stack.Screen name="+not-found" /> */}
				</Stack>
				{modals.info.isOpen && <InfoModal />}
				<StatusBar style="auto" />
			</ThemeProvider>
		</QueryClientProvider>
	);
}
