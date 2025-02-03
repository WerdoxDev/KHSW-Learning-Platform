import Monicon from "@monicon/native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function CourseView() {
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
		</View>
	);
}
