import Monicon from "@monicon/native";
import { Pressable } from "react-native";

export default function OAuthButton(props: { iconName: string }) {
	return (
		<Pressable className="w-full shrink items-center justify-center rounded-2xl border-2 border-white bg-gray-200 py-2 shadow-md">
			<Monicon name={props.iconName} color="black" size={36} />
		</Pressable>
	);
}
