import type { APIPublicUser, Snowflake } from "@khsw-learning-platform/shared";
import Monicon from "@monicon/native";
import { useRouter } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";

export default function Course(props: { id: Snowflake; name: string; imageUrl: string; author: APIPublicUser; enrolled?: boolean }) {
	const router = useRouter();

	return (
		<Pressable className="mt-10" onPress={() => router.navigate({ pathname: "/(tabs)/home/course", params: { id: props.id } })}>
			<View className="mx-5 rounded-3xl bg-white p-2 pb-0 shadow-2xl">
				<View className="h-48 w-full overflow-hidden rounded-2xl">
					<Image source={require("../assets/images/course.jpg")} className="h-full w-full" />
				</View>
				<Text className="mt-5 ml-5 font-bold text-xl">{props.name}</Text>
				<View className="mb-5 flex-row items-center gap-x-1">
					<Text className="ml-5 text-gray-500">Von</Text>
					<Text className="underline">{props.author.username}</Text>
					<Monicon name="mingcute:certificate-fill" size={16} color="#06b6d4" />
				</View>
				{props.enrolled && (
					<View className="absolute right-5 bottom-5 flex-row items-center gap-x-1">
						<Text className="text-emerald-500">Angemeldet</Text>
						<Monicon name="mingcute:check-circle-fill" size={16} color="#10b981" />
					</View>
				)}
			</View>
		</Pressable>
	);
}
