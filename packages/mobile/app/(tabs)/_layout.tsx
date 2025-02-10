import Monicon from "@monicon/native";
import { Tabs } from "expo-router";

export default function TabLayout() {
	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: "#f43f5e",
				animation: "shift",
				headerShown: false,
			}}
		>
			<Tabs.Screen
				name="home"
				options={{
					title: "Startseite",
					tabBarIcon: (props) => <Monicon name="mingcute:home-3-fill" size={props.size} color={props.color} />,
				}}
			/>

			<Tabs.Screen
				name="my-courses"
				options={{
					title: "Meine Kurse",
					tabBarIcon: (props) => <Monicon name="mingcute:black-board-2-fill" size={props.size} color={props.color} />,
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					title: "Konto",
					tabBarIcon: (props) => <Monicon name="mingcute:user-2-fill" size={props.size} color={props.color} />,
				}}
			/>
		</Tabs>
	);
}
