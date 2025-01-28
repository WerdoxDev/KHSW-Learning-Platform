import { useApi } from "@/stores/apiStore";
import { authHeader, makeUrl } from "@/utils/utils";
import Monicon from "@monicon/native";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { fetch } from "expo/fetch";
import { Pressable, Text, View } from "react-native";

export default function Profile() {
	const api = useApi();
	const router = useRouter();
	const mutation = useMutation({
		mutationFn: async () => {
			if (!api.accessToken) return;

			await fetch(makeUrl("/auth/logout"), { method: "POST", body: "", headers: authHeader(api.accessToken) });
			await api.resetTokens();
		},
		onError: (error) => {
			console.error(error);
		},
		onSuccess: () => {
			router.navigate("/login");
		},
	});

	return (
		<View className="h-full bg-gray-200 pt-32 ">
			<View className="items-center justify-center">
				<View className="h-28 w-28 rounded-full bg-rose-500" />
				<Text className="mt-4 text-3xl">{api.user?.username}</Text>
				<Text className="text-gray-500 text-lg">{api.user?.email}</Text>
				<Pressable className="mt-5 rounded-full bg-black px-5 py-2.5 active:bg-black/50">
					<Text className="text-lg text-white">Bearbeiten</Text>
				</Pressable>
			</View>
			<View className="mt-10 gap-y-2 px-5">
				<Text className="ml-5 text-gray-500 text-lg">App</Text>
				<View className="items-center justify-center gap-y-5 rounded-3xl border border-black/10 bg-gray-400/5 p-4">
					<View className="w-full flex-row items-center gap-x-3">
						<View className="rounded-xl bg-gray-100 p-2">
							<Monicon name="mingcute:settings-3-line" size={28} color="#6b7280" />
						</View>
						<Text className="text-xl">Einstellungen</Text>
					</View>
					<View className="h-px w-full bg-black/10" />
					<View className="w-full flex-row items-center gap-x-3">
						<View className="rounded-xl bg-gray-100 p-2">
							<Monicon name="mingcute:settings-3-line" size={28} color="#6b7280" />
						</View>
						<Text className="text-xl">Test</Text>
					</View>
				</View>
				<Text className="ml-5 text-gray-500 text-lg">Konto</Text>
				<View className="items-center justify-center gap-y-5 rounded-3xl border border-black/10 bg-gray-400/5 p-2">
					<Pressable onPress={() => mutation.mutate()} className="w-full flex-row items-center gap-x-3 rounded-2xl p-2 active:bg-rose-300/20">
						<View className="rounded-xl bg-rose-300/50 p-2">
							<Monicon name="mingcute:exit-line" size={28} color="#f43f5e" />
						</View>
						<Text className="text-rose-500 text-xl">Abmelden</Text>
					</Pressable>
				</View>
			</View>
		</View>
	);
}
