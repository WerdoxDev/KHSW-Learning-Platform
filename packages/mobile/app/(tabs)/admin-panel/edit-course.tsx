import Chapter from "@/components/Chapter";
import { useCourse } from "@/hooks/useCourse";
import { useApi } from "@/stores/apiStore";
import { useModals } from "@/stores/modalsStore";
import { authHeader, makeUrl } from "@/utils/utils";
import type { APIPatchCourseBody, Snowflake } from "@khsw-learning-platform/shared";
import Monicon from "@monicon/native";
import { Picker } from "@react-native-picker/picker";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import { fetch } from "expo/fetch";
import { useRef, useState } from "react";
import { ActivityIndicator, FlatList, Pressable, ScrollView, Text, TextInput, View } from "react-native";

export default function EditCourse() {
	const { id } = useLocalSearchParams<{ id: string }>();
	const course = useCourse(id);
	const api = useApi();
	const router = useRouter();
	const queryClient = useQueryClient();
	const modals = useModals();

	const [edited, setEdited] = useState({ ...course });

	const nameInputRef = useRef<TextInput | null>(null);
	const descriptionInputRef = useRef<TextInput | null>(null);

	const [courseName, setCourseName] = useState(course.name);
	const [courseDescription, setCourseDescription] = useState(course.description);
	const contentName = useRef("");
	const contentType = useRef("");
	const chapterName = useRef("");

	const mutation = useMutation({
		async mutationFn(data: APIPatchCourseBody) {
			const result = await fetch(makeUrl(`/courses/${course.id}`), {
				method: "PATCH",
				body: JSON.stringify({ name: data.name, description: data.description, chapters: data.chapters }),
				headers: authHeader(api.accessToken ?? ""),
			});

			console.log(await result.json());
		},
		onError(error, variables, context) {
			console.error(error);
		},
		onSuccess(data, variables, context) {
			console.log("OK!", data);
			queryClient.invalidateQueries({ queryKey: ["courses"] });
			router.navigate("/(tabs)/admin-panel");
		},
	});

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

	function editContent(id: Snowflake) {
		modals.setModal("info", { isOpen: false });
		if (!edited.chapters) {
			return;
		}

		const chapters = [...edited.chapters];
		const chapter = chapters.find((x) => x.contents.some((x) => x.id === id));
		if (!chapter) {
			return;
		}

		const content = chapter.contents.find((x) => x.id === id);
		if (!content) {
			return;
		}

		content.name = contentName.current;
		content.type = contentType.current === "video" ? 0 : 1;

		setEdited({ ...edited, chapters: [...edited.chapters.filter((x) => x.id !== chapter.id), chapter] });
	}
	function addContent(id: Snowflake) {
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
			name: contentName.current,
			type: contentType.current === "video" ? 0 : 1,
		};

		chapter.contents?.push(newContent);

		setEdited({ ...edited, chapters: [...edited.chapters.filter((x) => x.id !== chapter.id), chapter] });
	}

	function addChapter() {
		modals.setModal("info", { isOpen: false });
		if (!edited.chapters) {
			return;
		}

		const newChapter = {
			id: Math.floor(Math.random() * 1000000).toString(),
			name: chapterName.current,
			order: edited.chapters.length + 1,
			contents: [],
		};

		setEdited({ ...edited, chapters: [...edited.chapters, newChapter] });
	}

	function editChapter(id: Snowflake) {
		modals.setModal("info", { isOpen: false });
		if (!edited.chapters) {
			return;
		}

		const chapters = [...edited.chapters];
		const chapter = chapters.find((x) => x.id === id);
		if (!chapter) {
			return;
		}

		chapter.name = chapterName.current;

		setEdited({ ...edited, chapters: [...edited.chapters.filter((x) => x.id !== chapter.id), chapter] });
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
					onChangeText={(text) => setCourseDescription(text)}
				/>
				<View className="mt-5 w-full flex-row items-center">
					<Text className="ml-2 font-semibold">Inhalt:</Text>
					<Pressable
						className="ml-auto"
						onPress={() => {
							chapterName.current = "";
							modals.setModal("info", {
								isOpen: true,
								title: "Neues Kapitel",
								type: "none",
								body: (
									<View className="mt-4 w-full">
										<TextInput
											submitBehavior="newline"
											returnKeyType="next"
											placeholder="Name"
											className="mt-1 w-full bg-gray-200 p-5"
											defaultValue={chapterName.current}
											onChangeText={(text) => {
												chapterName.current = text;
											}}
										/>
										<View className="mt-4 flex w-full flex-row gap-x-2">
											<Pressable
												onPress={() => modals.setModal("info", { isOpen: false })}
												className="w-full shrink rounded-lg bg-gray-700 px-5 py-2.5 active:opacity-50"
											>
												<Text className="text-center text-lg text-white">Abbrechen</Text>
											</Pressable>
											<Pressable
												onPress={() => addChapter()}
												className="w-full shrink rounded-lg bg-emerald-500 px-5 py-2.5 active:opacity-50"
											>
												<Text className="text-center text-lg text-white">Speichern</Text>
											</Pressable>
										</View>
									</View>
								),
							});
						}}
					>
						<Monicon name="mingcute:add-circle-fill" size={40} color="#10b981" />
					</Pressable>
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
							onEdit={(id) => {
								chapterName.current = item.name;
								modals.setModal("info", {
									isOpen: true,
									title: "Kapitel bearbeiten",
									type: "none",
									body: (
										<View className="mt-4 w-full">
											<TextInput
												submitBehavior="newline"
												returnKeyType="next"
												placeholder="Name"
												className="mt-1 w-full bg-gray-200 p-5"
												defaultValue={chapterName.current}
												// onSubmitEditing={() => passwordInputRef.current?.focus()}
												onChangeText={(text) => {
													chapterName.current = text;
												}}
											/>
											<View className="mt-4 flex w-full flex-row gap-x-2">
												<Pressable
													onPress={() => modals.setModal("info", { isOpen: false })}
													className="w-full shrink rounded-lg bg-gray-700 px-5 py-2.5 active:opacity-50"
												>
													<Text className="text-center text-lg text-white">Abbrechen</Text>
												</Pressable>
												<Pressable
													onPress={() => editChapter(id)}
													className="w-full shrink rounded-lg bg-emerald-500 px-5 py-2.5 active:opacity-50"
												>
													<Text className="text-center text-lg text-white">Speichern</Text>
												</Pressable>
											</View>
										</View>
									),
								});
							}}
							onContentEdit={(content) => {
								contentName.current = content.name;
								contentType.current = content.type === 0 ? "video" : "text";

								modals.setModal("info", {
									isOpen: true,
									title: "Lektion bearbeiten",
									type: "none",
									body: (
										<View className="mt-4 w-full">
											<TextInput
												submitBehavior="newline"
												returnKeyType="next"
												placeholder="Name"
												className="mt-1 w-full bg-gray-200 p-5"
												defaultValue={contentName.current}
												// onSubmitEditing={() => passwordInputRef.current?.focus()}
												onChangeText={(text) => {
													contentName.current = text;
												}}
											/>
											<Picker
												onValueChange={(val: string) => {
													contentType.current = val;
												}}
												selectedValue={contentType.current}
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
													onPress={() => editContent(content.id)}
													className="w-full shrink rounded-lg bg-emerald-500 px-5 py-2.5 active:opacity-50"
												>
													<Text className="text-center text-lg text-white">Speichern</Text>
												</Pressable>
											</View>
										</View>
									),
								});
							}}
							onContentAdd={(id) => {
								contentName.current = "";
								contentType.current = "text";

								modals.setModal("info", {
									isOpen: true,
									title: "Neue Lektion",
									type: "none",
									body: (
										<View className="mt-4 w-full">
											<TextInput
												submitBehavior="newline"
												returnKeyType="next"
												placeholder="Name"
												className="mt-1 w-full bg-gray-200 p-5"
												defaultValue=""
												// onSubmitEditing={() => passwordInputRef.current?.focus()}
												onChangeText={(text) => {
													contentName.current = text;
												}}
											/>
											<Picker
												onValueChange={(val: string) => {
													contentType.current = val;
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
													onPress={() => addContent(id)}
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
				onPress={() =>
					// biome-ignore lint/style/noNonNullAssertion: <explanation>
					mutation.mutate({ name: courseName!, description: courseDescription!, chapters: edited.chapters! })
				}
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
