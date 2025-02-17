import { useApi } from "@/stores/apiStore";
import Monicon from "@monicon/native";
import { Tabs } from "expo-router";
import { useEffect, useMemo } from "react";

export default function TabLayout() {
	const api = useApi();
	const canAccessAdminPanel = useMemo(
		() => !!((api.user?.permissions ?? 0) & 2) || !!((api.user?.permissions ?? 0) & 3) || !!((api.user?.permissions ?? 0) & 4),
		[api.user],
	);

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
			<Tabs.Screen
				name="admin-panel"
				options={{
					title: "Admin Panel",
					href: canAccessAdminPanel ? "/admin-panel" : null,
					tabBarIcon: (props) => <Monicon name="mingcute:user-edit-fill" size={props.size} color={props.color} />,
				}}
			/>
		</Tabs>
	);
}
