import { useCourse } from "@/hooks/useCourse";
import Monicon from "@monicon/native";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { FlatList, Pressable, ScrollView, Text, View } from "react-native";

export default function CourseOverview() {
	const { id } = useLocalSearchParams<{ id: string }>();
	const course = useCourse(id);
	const [readMore, setReadMore] = useState(false);
	console.log(course);

	return (
		<View className="h-full">
			<ScrollView contentContainerClassName="p-5">
				<Text className="font-semibold text-2xl">{course?.name}</Text>
				<View className="flex-row items-center gap-x-1">
					<Text className="text-gray-500 text-lg">Von</Text>
					<Text className="underline">{course?.author.username}</Text>
					<Monicon name="mingcute:certificate-fill" size={16} color="#06b6d4" />
				</View>
				<View className="mt-2 flex-row items-center gap-x-2">
					{/* <Text className="font-medium">Fähigkeiten:</Text> */}
					{/* <View> */}
					<FlatList
						scrollEnabled={false}
						contentContainerClassName="w-max flex-row gap-x-2"
						data={course?.skills}
						renderItem={({ item }) => (
							<Text className="mb-px rounded-xl border border-rose-500 px-2 py-1 text-gray-700 italic">{item.name}</Text>
						)}
					/>
					{/* </View> */}
				</View>
				<Text className="mt-10 font-semibold text-xl">Beschreibung:</Text>
				<Text className="text-gray-600 text-lg" numberOfLines={readMore ? undefined : 5}>
					{course?.description}
				</Text>
				<Pressable onPress={() => setReadMore(!readMore)} className="flex-row items-center">
					<Monicon name={readMore ? "mingcute:left-small-fill" : "mingcute:right-small-fill"} size={20} color="#2563eb" />
					<Text className="text-blue-600">{readMore ? "Weniger lesen" : "Mehr lesen"}</Text>
				</Pressable>
			</ScrollView>
			{/* <View className="w-full h-10 bg-black" style={{}}></View> */}
			<View className="shrink-0 pb-5">
				<View className="mx-5 mt-auto flex-row rounded-xl bg-blue-500 p-5 shadow-lg">
					<View className="flex-row items-center gap-x-2">
						<Monicon name="mingcute:book-2-fill" size={24} color="white" />
						<Text className="text-white">
							<Text className="font-bold">{course?.chapters.length}</Text> Kapiteln /{" "}
							<Text className="font-bold">{course?.chapters.flatMap((x) => x.contents).length}</Text> Lektionen
						</Text>
					</View>
					<View className="ml-auto flex-row items-center gap-x-2">
						<Monicon name="mingcute:certificate-2-fill" size={24} color="white" />
						<Text className="text-white">Zertifikat</Text>
					</View>
				</View>
				<Pressable className="mx-5 mt-5 rounded-xl bg-rose-500 p-5 active:opacity-50">
					<Text className="text-center text-white">Anmelden!</Text>
				</Pressable>
			</View>
		</View>
	);
}
