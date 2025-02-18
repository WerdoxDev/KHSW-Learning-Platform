import Chapter from "@/components/Chapter";
import { useCourse } from "@/hooks/useCourse";
import { useApi } from "@/stores/apiStore";
import { useModals } from "@/stores/modalsStore";
import type { Snowflake } from "@khsw-learning-platform/shared";
import Monicon from "@monicon/native";
import { useMutation } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useRef, useState } from "react";
import { ActivityIndicator, FlatList, Pressable, ScrollView, Text, TextInput, View } from "react-native";

export default function EditCourse() {
	const { id } = useLocalSearchParams<{ id: string }>();
	const course = useCourse(id);
	const api = useApi();
	const router = useRouter();
	const modals = useModals();

	const nameInputRef = useRef<TextInput | null>(null);
	const descriptionInputRef = useRef<TextInput | null>(null);

	const [courseName, setCourseName] = useState("");
	const [description, setDescription] = useState("");

	const mutation = useMutation({});

	function deleteChapter(id: Snowflake) {}
	function deleteContent(id: Snowflake) {}

	return (
		<View className="h-full bg-gray-200">
			<Pressable
				className="absolute top-12 left-5 z-10 rounded-2xl bg-white p-1.5 shadow-lg"
				onPress={() => router.navigate("/(tabs)/admin-panel")}
			>
				<Monicon name="mingcute:back-2-line" color="black" size={32} />
			</Pressable>
			<ScrollView contentContainerClassName="p-5 mt-24 pb-24">
				<Text className="ml-2 font-semibold">Kursname:</Text>
				<TextInput
					ref={nameInputRef}
					submitBehavior="submit"
					returnKeyType="next"
					placeholder="Kursname"
					className="mt-1 w-full rounded-xl bg-white p-5"
					defaultValue={course.name}
					// onSubmitEditing={() => passwordInputRef.current?.focus()}
					onChangeText={(text) => setCourseName(text)}
				/>
				<Text className="mt-5 ml-2 font-semibold">Beschreibung:</Text>
				<TextInput
					ref={descriptionInputRef}
					submitBehavior="newline"
					returnKeyType="next"
					placeholder="Beschreibung"
					className="mt-1 w-full rounded-xl bg-white p-5"
					multiline
					defaultValue={course.description}
					// onSubmitEditing={() => passwordInputRef.current?.focus()}
					onChangeText={(text) => setDescription(text)}
				/>
				<View className="mt-5 w-full flex-row items-center">
					<Text className="ml-2 font-semibold">Inhalt:</Text>
					<View className="ml-auto">
						<Monicon name="mingcute:add-circle-fill" size={40} color="#10b981" />
					</View>
				</View>
				<FlatList
					scrollEnabled={false}
					data={course?.chapters}
					keyExtractor={(item) => item.id}
					contentContainerClassName="gap-y-2 mt-1 mb-5"
					renderItem={({ item }) => (
						<Chapter
							chapter={item}
							admin
							onDelete={(id) =>
								modals.setModal("info", {
									isOpen: true,
									title: "Sind Sie sicher?",
									type: "info",
									body: (
										<View className="mt-4">
											<Text className="text-center text-lg">
												Wollen Sie das Kapitel <Text className="font-bold">"{item.name}"</Text> löschen?
											</Text>
											<View className="mt-4 flex w-full flex-row gap-x-2">
												<Pressable
													onPress={() => modals.setModal("info", { isOpen: false })}
													className="w-full shrink rounded-lg bg-gray-700 px-5 py-2.5 active:opacity-50"
												>
													<Text className="text-center text-lg text-white">Nein</Text>
												</Pressable>
												<Pressable
													onPress={() => deleteChapter(id)}
													className="w-full shrink rounded-lg bg-rose-500 px-5 py-2.5 active:opacity-50"
												>
													<Text className="text-center text-lg text-white">Ja</Text>
												</Pressable>
											</View>
										</View>
									),
								})
							}
							onContentDelete={(content) =>
								modals.setModal("info", {
									isOpen: true,
									title: "Sind Sie sicher?",
									type: "info",
									body: (
										<View className="mt-4">
											<Text className="text-center text-lg">
												Wollen Sie die Lektion <Text className="font-bold">"{content.name}"</Text> löschen?
											</Text>
											<View className="mt-4 flex w-full flex-row gap-x-2">
												<Pressable
													onPress={() => modals.setModal("info", { isOpen: false })}
													className="w-full shrink rounded-lg bg-gray-700 px-5 py-2.5 active:opacity-50"
												>
													<Text className="text-center text-lg text-white">Nein</Text>
												</Pressable>
												<Pressable
													onPress={() => deleteChapter(content.id)}
													className="w-full shrink rounded-lg bg-rose-500 px-5 py-2.5 active:opacity-50"
												>
													<Text className="text-center text-lg text-white">Ja</Text>
												</Pressable>
											</View>
										</View>
									),
								})
							}
						/>
					)}
				/>
			</ScrollView>
			{/* <View className="w-full h-10 bg-black" style={{}}></View> */}
			<Pressable
				onPress={() => mutation.mutate()}
				className="mx-5 mb-5 items-center justify-center rounded-xl bg-emerald-500 p-5 active:opacity-50"
			>
				{!mutation.isPending ? (
					<Text className="text-center text-white">Speichern</Text>
				) : (
					<ActivityIndicator className="m-0 h-5 p-0" size="large" color="white" />
				)}
			</Pressable>
		</View>
	);
}
