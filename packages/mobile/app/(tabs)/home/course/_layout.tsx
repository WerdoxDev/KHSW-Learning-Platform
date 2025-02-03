import Monicon from "@monicon/native";
import { Tabs, useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, SafeAreaView, Text, View } from "react-native";

export default function TabLayout() {
	const { id } = useLocalSearchParams();
	const router = useRouter();
	return (
		<View className="h-full bg-gray-200 pt-10">
			<View className="h-60">
				<Pressable className="absolute top-5 left-5 z-10" onPress={() => router.navigate("/(tabs)/home")}>
					<Monicon name="mingcute:back-2-line" color="white" size={32} />
				</Pressable>
				<View className="h-full w-full bg-slate-700" />
			</View>
			{/* <SafeAreaView> */}
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
				}}
			>
				<Tabs.Screen
					name="index"
					options={{
						title: "Overview",
						headerShown: false,
						// tabBarIcon: (props) => <Monicon name="mingcute:home-3-fill" size={props.size} color={props.color} />,
					}}
				/>

				<Tabs.Screen
					name="lessons"
					options={{
						title: "Lessons",
						headerShown: false,
						// tabBarIcon: (props) => <Monicon name="mingcute:user-2-fill" size={props.size} color={props.color} />,
					}}
				/>
			</Tabs>
			{/* </SafeAreaView> */}
		</View>
	);
}
