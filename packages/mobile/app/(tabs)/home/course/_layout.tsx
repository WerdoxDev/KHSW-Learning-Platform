import Monicon from "@monicon/native";
import { Tabs, useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, View } from "react-native";

export default function TabLayout() {
	const params = useLocalSearchParams<{ id: string }>();
	const router = useRouter();
	return (
		<View className="h-full bg-gray-200 pt-10">
			<View className="h-60">
				<Pressable className="absolute top-5 left-5 z-10" onPress={() => router.navigate("/(tabs)/home")}>
					<Monicon name="mingcute:back-2-line" color="white" size={32} />
				</Pressable>
				<View className="h-full w-full bg-slate-700" />
			</View>
			<Tabs
				screenOptions={{
					tabBarActiveTintColor: "#f43f5e",
					animation: "shift",
					tabBarPosition: "top",
					tabBarIconStyle: { display: "none" },
					tabBarStyle: {
						paddingTop: 0,
						marginTop: 0,
						marginBottom: 0,
						paddingBottom: 0,
						height: 30,
					},
					tabBarLabelStyle: { fontSize: 15 },
					headerShown: false,
				}}
			>
				<Tabs.Screen
					name="index"
					options={{
						title: "Übersicht",
					}}
				/>

				<Tabs.Screen
					name="lessons"
					options={{
						title: "Lektionen",
					}}
					initialParams={params}
				/>
			</Tabs>
		</View>
	);
}
