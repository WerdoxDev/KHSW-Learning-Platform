import { useApi } from "@/stores/apiStore";
import Monicon from "@monicon/native";
import * as SecureStore from "expo-secure-store";
import { DevSettings, Pressable, Text, TextInput, View } from "react-native";

export default function Home() {
	const api = useApi();

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
			<View className="mt-10">
				<View className="mx-5 rounded-3xl bg-white p-2 pb-0 shadow-2xl">
					<View className="h-48 w-full rounded-2xl bg-slate-600" />
					<Text className="my-5 ml-5 font-bold text-xl">Website Design</Text>
				</View>
			</View>
		</View>
	);
}
