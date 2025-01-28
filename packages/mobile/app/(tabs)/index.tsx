import Course from "@/components/Course";
import { useApi } from "@/stores/apiStore";
import { authHeader, makeUrl } from "@/utils/utils";
import type { APIGetCoursesResult } from "@khsw-learning-platform/shared";
import Monicon from "@monicon/native";
import { useQuery } from "@tanstack/react-query";
import * as SecureStore from "expo-secure-store";
import { fetch } from "expo/fetch";
import { DevSettings, FlatList, Pressable, Text, TextInput, View } from "react-native";

export default function Home() {
	const api = useApi();

	const { data, isLoading } = useQuery({
		queryKey: ["courses"],
		queryFn: async () => {
			if (!api.accessToken) return null;

			return (await (await fetch(makeUrl("/courses"), { method: "GET", headers: authHeader(api.accessToken) })).json()) as APIGetCoursesResult;
		},
	});

	async function reset() {
		await SecureStore.deleteItemAsync("accessToken");
		await SecureStore.deleteItemAsync("refreshToken");
		DevSettings.reload();
	}

	return (
		<View className="h-full bg-gray-200 pt-16">
			<View className="mx-5 flex-row items-center">
				<Text className="text-3xl">Willkommen, </Text>
				<Text className="text-3xl text-rose-600">{api.user?.username}</Text>
				<Pressable onPress={reset} className="ml-auto rounded-lg border border-gray-500 px-2 py-1">
					<Text>Test Reset</Text>
				</Pressable>
			</View>
			<View className="mx-10 mt-5">
				<View className="flex-row items-center rounded-3xl border border-gray-400 px-4 py-2">
					<Monicon name="mingcute:search-line" size={32} color="#9ca3af" />
					<TextInput placeholder="Suche" placeholderClassName="#9ca3af" className="ml-2 w-full shrink text-lg leading-7" cursorColor="black" />
				</View>
			</View>
			{isLoading && <Text className="mt-10 w-full text-center font-bold text-xl">Loading...</Text>}
			<FlatList
				data={data}
				renderItem={({ item }) => <Course id={item.id} name={item.name} imageUrl={item.imageUrl} author={item.author} />}
				keyExtractor={(item) => item.id}
			/>
		</View>
	);
}
