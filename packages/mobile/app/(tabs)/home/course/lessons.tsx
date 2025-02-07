import Chapter from "@/components/Chapter";
import { useCourse } from "@/hooks/useCourse";
import { useLocalSearchParams } from "expo-router";
import { FlatList, View } from "react-native";

export default function CourseLessons() {
	const { id } = useLocalSearchParams<{ id: string }>();
	const course = useCourse(id);

	return (
		<View>
			<FlatList
				data={course?.chapters}
				keyExtractor={(item) => item.id}
				contentContainerClassName="gap-y-5 p-5"
				renderItem={({ item }) => <Chapter chapter={item} />}
			/>
		</View>
	);
}
