import Course from "@/components/Course";
import { useApi } from "@/stores/apiStore";
import { useModals } from "@/stores/modalsStore";
import { coursesOptions, myCoursesOptions } from "@/utils/queries";
import { useQuery } from "@tanstack/react-query";
import { FlatList, Pressable, Text, View } from "react-native";

export default function AdminPanel() {
	const { data, isLoading } = useQuery(coursesOptions());
	const modals = useModals();

	return (
		<View className="h-full bg-gray-200 pt-16">
			<View className="mx-5 flex-row items-center">
				<Text className="text-3xl">Admin Panel</Text>
			</View>
			{isLoading && <Text className="mt-10 w-full text-center font-bold text-xl">Laden...</Text>}
			<View className="shrink">
				<FlatList
					contentContainerClassName="pb-10"
					data={data}
					renderItem={({ item }) => (
						<Course
							id={item.id}
							name={item.name}
							imageUrl={item.imageUrl}
							author={item.author}
							admin
							onDelete={() =>
								modals.setModal("info", {
									isOpen: true,
									title: "Sind Sie sicher?",
									body: (
										<View className="mt-4">
											<Text className="text-center text-lg">
												Wollen Sie <Text className="font-bold">"{item.name}"</Text> wirklich löschen?
											</Text>
											<View className="mt-4 flex w-full flex-row gap-x-2">
												<Pressable
													onPress={() => modals.setModal("info", { isOpen: false })}
													className="w-full shrink rounded-lg bg-gray-700 px-5 py-2.5 active:opacity-50"
												>
													<Text className="text-center text-lg text-white">Nein</Text>
												</Pressable>
												<Pressable className="w-full shrink rounded-lg bg-rose-500 px-5 py-2.5 active:opacity-50">
													<Text className="text-center text-lg text-white">Ja</Text>
												</Pressable>
											</View>
										</View>
									),
								})
							}
						/>
					)}
					keyExtractor={(item) => item.id}
				/>
			</View>
		</View>
	);
}
