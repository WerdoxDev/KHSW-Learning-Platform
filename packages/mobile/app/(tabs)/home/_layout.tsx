import { Stack } from "expo-router";

export default function HomeLayout() {
	return (
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Screen name="index" options={{ title: "Home", animation: "fade" }} />
			<Stack.Screen name="course" options={{ title: "Course", animation: "fade_from_bottom" }} />
		</Stack>
	);
}
