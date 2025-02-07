import type { APIChapter } from "@khsw-learning-platform/shared";
import Monicon from "@monicon/native";
import { useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";

export default function Chapter(props: { chapter: APIChapter }) {
	const [expanded, setExpanded] = useState(false);
	return (
		<View>
			<Pressable onPress={() => setExpanded(!expanded)} className="flex-row items-center justify-between rounded-xl bg-slate-500 p-5">
				<Text className="text-white">{props.chapter.name}</Text>
				<Monicon name={expanded ? "mingcute:up-fill" : "mingcute:down-fill"} size={20} color="white" />
			</Pressable>
			{expanded && (
				<View className="mt-2 ml-5 gap-y-1">
					{props.chapter.contents.map((content) => (
						<View className="flex-row items-center gap-x-2 rounded-xl bg-slate-600 p-5" key={content.id}>
							<Monicon name={content.type === 1 ? "mingcute:clipboard-fill" : "mingcute:video-fill"} size={20} color="white" />
							<Text className="text-white">{content.name}</Text>
							<View className="ml-auto">
								<Monicon name="mingcute:play-fill" size={20} color="#22c55e" />
							</View>
						</View>
					))}
				</View>
			)}
		</View>
	);
}
