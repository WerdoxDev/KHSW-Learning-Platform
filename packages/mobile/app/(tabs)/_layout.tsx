import Monicon from "@monicon/native";
import { Tabs } from "expo-router";

export default function TabLayout() {
	return (
		<Tabs screenOptions={{ tabBarActiveTintColor: "#f43f5e", animation: "shift" }}>
			<Tabs.Screen
				name="index"
				options={{
					title: "Startseite",
					headerShown: false,
					tabBarIcon: (props) => <Monicon name="mingcute:home-3-fill" size={props.size} color={props.color} />,
				}}
			/>

			<Tabs.Screen
				name="profile"
				options={{
					title: "Konto",
					headerShown: false,
					tabBarIcon: (props) => <Monicon name="mingcute:user-2-fill" size={props.size} color={props.color} />,
				}}
			/>
		</Tabs>
	);
}
