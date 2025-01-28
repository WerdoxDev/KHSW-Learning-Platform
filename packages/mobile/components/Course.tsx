import type { APIPublicUser, Snowflake } from "@khsw-learning-platform/shared";
import { Text, View } from "react-native";

export default function Course(props: { id: Snowflake; name: string; imageUrl: string; author: APIPublicUser }) {
	return (
		<View className="mt-10">
			<View className="mx-5 rounded-3xl bg-white p-2 pb-0 shadow-2xl">
				<View className="h-48 w-full rounded-2xl bg-slate-600" />
				<Text className="mt-5 ml-5 font-bold text-xl">{props.name}</Text>
				<Text className="mb-5 ml-5 text-gray-500">Von {props.author.username}</Text>
			</View>
		</View>
	);
}
