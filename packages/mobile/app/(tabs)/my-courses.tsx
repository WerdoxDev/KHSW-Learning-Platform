import Course from "@/components/Course";
import { useApi } from "@/stores/apiStore";
import { myCoursesOptions } from "@/utils/queries";
import Monicon from "@monicon/native";
import { useQuery } from "@tanstack/react-query";
import { FlatList, Text, TextInput, View } from "react-native";

export default function MyCourses() {
	const api = useApi();

	const { data, isLoading } = useQuery(myCoursesOptions());

	return (
		<View className="h-full bg-gray-200 pt-16">
			<View className="mx-5 flex-row items-center">
				<Text className="text-3xl">Meine Kurse</Text>
			</View>
			{isLoading && <Text className="mt-10 w-full text-center font-bold text-xl">Laden...</Text>}
			<View className="shrink">
				<FlatList
					contentContainerClassName="pb-10"
					data={data}
					renderItem={({ item }) => <Course id={item.id} name={item.name} imageUrl={item.imageUrl} author={item.author} enrolled />}
					keyExtractor={(item) => item.id}
				/>
			</View>
		</View>
	);
}
