import Chapter from "@/components/Chapter";
import { useCourse } from "@/hooks/useCourse";
import { useApi } from "@/stores/apiStore";
import { useModals } from "@/stores/modalsStore";
import { ContentType, type Snowflake } from "@khsw-learning-platform/shared";
import Monicon from "@monicon/native";
import { Picker } from "@react-native-picker/picker";
import { useMutation } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { ActivityIndicator, FlatList, Pressable, ScrollView, Text, TextInput, View } from "react-native";

export default function EditCourse() {
	const { id } = useLocalSearchParams<{ id: string }>();
	const course = useCourse(id);
	const api = useApi();
	const router = useRouter();
	const modals = useModals();

	const [edited, setEdited] = useState({ ...course });

	const nameInputRef = useRef<TextInput | null>(null);
	const descriptionInputRef = useRef<TextInput | null>(null);

	const [courseName, setCourseName] = useState("");
	const [description, setDescription] = useState("");
	const newCapitalName = useRef("");
	const newCapitalType = useRef("");

	const mutation = useMutation({});

	function deleteChapter(id: Snowflake) {
		console.log("hi");
		modals.setModal("info", { isOpen: false });
		if (!edited.chapters) {
			return;
		}

		setEdited({ ...edited, chapters: edited.chapters.filter((x) => x.id !== id) });
	}

	function deleteContent(id: Snowflake) {
		modals.setModal("info", { isOpen: false });
		if (!edited.chapters) {
			return;
		}

		const chapters = [...edited.chapters];
		const chapter = chapters.find((x) => x.contents.some((x) => x.id === id));

		if (!chapter) {
			return;
		}

		chapter.contents = chapter.contents?.filter((x) => x.id !== id);
		setEdited({ ...edited, chapters: edited.chapters ? [...edited.chapters.filter((x) => x.id !== chapter.id), chapter] : [chapter] });
	}

	useEffect(() => {
		console.log(newCapitalName);
	}, [newCapitalName]);

	function addChapter(id: Snowflake) {
		modals.setModal("info", { isOpen: false });
		if (!edited.chapters) {
			return;
		}

		const chapters = [...edited.chapters];
		const chapter = chapters.find((x) => x.id === id);
		if (!chapter) {
			return;
		}

		const newContent = {
			id: Math.floor(Math.random() * 1000000).toString(),
			name: newCapitalName.current,
			type: newCapitalType.current === "video" ? 0 : 1,
		};

		chapter.contents?.push(newContent);

		setEdited({ ...edited, chapters: edited.chapters ? [...edited.chapters.filter((x) => x.id !== chapter.id), chapter] : [chapter] });
	}

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
					defaultValue={edited.name}
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
					defaultValue={edited.description}
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
					data={edited?.chapters?.toSorted((a, b) => a.order - b.order)}
					keyExtractor={(item) => item.id}
					contentContainerClassName="gap-y-2 mt-1 mb-5"
					renderItem={({ item }) => (
						<Chapter
							chapter={item}
							admin
							onContentAdd={(id) => {
								newCapitalName.current = "";
								newCapitalType.current = "text";

								modals.setModal("info", {
									isOpen: true,
									title: "Neue Lektion",
									type: "none",
									body: (
										<View className="mt-4 w-full">
											<TextInput
												ref={descriptionInputRef}
												submitBehavior="newline"
												returnKeyType="next"
												placeholder="Name"
												className="mt-1 w-full bg-gray-200 p-5"
												defaultValue=""
												// onSubmitEditing={() => passwordInputRef.current?.focus()}
												onChangeText={(text) => {
													newCapitalName.current = text;
												}}
											/>
											<Picker
												onValueChange={(val: string) => {
													newCapitalType.current = val;
												}}
												style={{ backgroundColor: "#e5e7eb", marginTop: 10 }}
											>
												<Picker.Item label="Text" value="text" />
												<Picker.Item label="Video" value="video" />
											</Picker>
											<View className="mt-4 flex w-full flex-row gap-x-2">
												<Pressable
													onPress={() => modals.setModal("info", { isOpen: false })}
													className="w-full shrink rounded-lg bg-gray-700 px-5 py-2.5 active:opacity-50"
												>
													<Text className="text-center text-lg text-white">Abbrechen</Text>
												</Pressable>
												<Pressable
													onPress={() => addChapter(item.id)}
													className="w-full shrink rounded-lg bg-emerald-500 px-5 py-2.5 active:opacity-50"
												>
													<Text className="text-center text-lg text-white">Speichern</Text>
												</Pressable>
											</View>
										</View>
									),
								});
							}}
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
													onPress={() => deleteContent(content.id)}
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
