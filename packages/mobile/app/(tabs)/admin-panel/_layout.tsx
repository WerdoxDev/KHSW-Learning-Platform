import { Stack } from "expo-router";

export default function AdminLayout() {
	return (
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Screen name="index" options={{ title: "Admin Panel", animation: "fade" }} />
			<Stack.Screen name="edit-course" options={{ title: "Edit Course", animation: "fade_from_bottom" }} />
		</Stack>
	);
}
