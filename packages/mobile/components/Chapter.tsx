import type { APIChapter, APIContent, Snowflake } from "@khsw-learning-platform/shared";
import Monicon from "@monicon/native";
import clsx from "clsx";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";

export default function Chapter(props: {
	chapter: APIChapter;
	admin?: boolean;
	onContentAdd?: (id: Snowflake) => void;
	onEdit?: (id: Snowflake) => void;
	onDelete?: (id: Snowflake) => void;
	onContentEdit?: (content: APIContent) => void;
	onContentDelete?: (content: APIContent) => void;
}) {
	const [expanded, setExpanded] = useState(false);
	return (
		<View>
			<Pressable
				onPress={() => setExpanded(!expanded)}
				className={clsx("flex-row items-center justify-between gap-x-2 rounded-xl bg-slate-500 px-5", props.admin ? "py-3" : "py-5")}
			>
				<Text className="shrink text-white">{props.chapter.name}</Text>
				<View className="shrink-0 flex-row items-center gap-x-3">
					{props.admin && (
						<>
							<Pressable onPress={() => props.onEdit?.(props.chapter.id)} className="rounded-2xl bg-emerald-100 p-2">
								<Monicon name="mingcute:edit-2-fill" size={20} color="#10b981" />
							</Pressable>
							<Pressable onPress={() => props.onDelete?.(props.chapter.id)} className="rounded-2xl bg-rose-100 p-2">
								<Monicon name="mingcute:delete-2-fill" size={20} color="#f43f5e" />
							</Pressable>
							<Pressable onPress={() => props.onContentAdd?.(props.chapter.id)} className="rounded-2xl bg-emerald-100 p-2">
								<Monicon name="mingcute:add-fill" size={20} color="#10b981" />
							</Pressable>
						</>
					)}
					<Monicon name={expanded ? "mingcute:up-fill" : "mingcute:down-fill"} size={20} color="white" />
				</View>
			</Pressable>
			{expanded && (
				<View className="mt-1 ml-5 gap-y-1">
					{props.chapter.contents.map((content) => (
						<View className="flex-row items-center gap-x-2 rounded-xl bg-slate-600 p-5" key={content.id}>
							<Monicon name={content.type === 1 ? "mingcute:clipboard-fill" : "mingcute:video-fill"} size={20} color="white" />
							<Text className="shrink text-white">{content.name}</Text>
							<View className="ml-auto flex-row items-center gap-x-3">
								{props.admin && (
									<>
										<Pressable onPress={() => props.onContentEdit?.(content)} className="rounded-2xl bg-emerald-100 p-2">
											<Monicon name="mingcute:edit-2-fill" size={20} color="#10b981" />
										</Pressable>
										<Pressable onPress={() => props.onContentDelete?.(content)} className="rounded-2xl bg-rose-100 p-2">
											<Monicon name="mingcute:delete-2-fill" size={20} color="#f43f5e" />
										</Pressable>
									</>
								)}
								<Monicon name="mingcute:play-fill" size={20} color="#4ade80" />
							</View>
						</View>
					))}
				</View>
			)}
		</View>
	);
}
